import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client if key is available
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "منصة عين سيجام للرصد الجيومكاني وإدارة الإنشاءات" });
});

// Sigam Engineering & Land Survey Advisory endpoint (NO AI mentions)
const handleSigamConsult = async (req: express.Request, res: express.Response) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const systemInstruction = `أنت "المستشار الهندسي والجيومكاني المعتمد لمنصة عين سيجام" (Ayn Sigam) في المملكة العربية السعودية.
أنت استشاري هندسي ومساحي وخبير في علوم الجيوتقنية، كود البناء السعودي (SBC)، تخطيط الأراضي، إدارة مشاريع التشييد ومواقع البناء، وتتبع التطور العمراني بالأقمار الصناعية.

قواعد صارمة:
1. يمنع منعاً باتاً ذكر مصطلح "AI" أو "ذكاء اصطناعي" أو "نموذج لغوي" في أي جملة نهائياً. تحدث كاستشاري هندسي وفريق خبراء عين سيجام الجيومكاني.
2. تخصص في:
   - فحص صلاحية الأراضي للبناء (الجسات، قدرة تحمل التربة kg/cm²، منسوب المياه الجوفية، أخطار مجاري السيول والأودية، قيود الارتفاع وحرمات الطرق).
   - مساحات الأراضي، الارتدادات النظامية، نسب البناء المسموحة (FAR / Building Coverage Ratio) وعدد الأدوار حسب تصنيف البلديات.
   - إدارة مواقع البناء: حساب وتوزيع أعداد المعدات الثقيلة المطلوبة (الرافعات البرجية، الحفارات، مضخات الخرسانة، المداحل)، مؤشرات الأمان، ونسب الإنجاز الفعلي مقابل المخطط.
   - التطور العمراني: مقارنة نسب التوسع العمراني بين السنين والشهور، تناقص الأراضي البيضاء، واكتمال البنية التحتية.
3. التحدث بأسلوب هندسي دقيق، راقٍ وموثوق بالأرقام والوحدات المعتمدة (م²، كجم/سم²، متر طولي، نسب مئوية).`;

    if (ai) {
      try {
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.text }],
            });
          }
        }
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: contents.length === 1 ? message : contents,
          config: {
            systemInstruction,
            temperature: 0.6,
          },
        });

        const replyText = response.text || "تمت مراجعة الطلب بواسطة فريق عين سيجام الهندسي، يرجى إعادة إرسال التفاصيل.";
        res.json({ reply: replyText });
        return;
      } catch (geminiError: any) {
        console.error("Gemini API error, falling back to Sigam expert engineering engine:", geminiError);
      }
    }

    // High quality domain-specific fallback simulation for civil & geotechnical queries
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes("تربة") || lower.includes("جسات") || lower.includes("صالح") || lower.includes("مياه")) {
      reply = `أهلاً بك في **المستشار الهندسي لمنصة عين سيجام**. إليك تقرير المعايير الجيوتقنية وصلاحية الأراضي للبناء:

1. **فحص قدرة تحمل التربة (Bearing Capacity):**
   - **التربة الصخرية الجيرية (شمال الرياض وحطين والنرجس):** قدرة تحمل تتراوح بين **3.2 إلى 4.5 كجم/سم²**، وهي ممتازة للبناء المباشر بقواعد شريطية أو منفصلة دون إحلال.
   - **التربة الطينية الساحلية (أبحر وجدة):** قدرة تحمل **1.5 إلى 2.0 كجم/سم²**، تتطلب عادة طبقة إحلال من الصبيز المدكوك بسماكة 1.0 - 1.5م واشتراط عزل مائي محكم للأساسات.

2. **منسوب المياه الجوفية والنزح (Dewatering):**
   - إذا كان منسوب المياه أقل من 3 أمتار من السطح، يلزم عمل نظام نزح مياه جوفية أثناء الحفر وصب القبو، مع استخدام أسمنت مقاوم للكبريتات (Type V).

3. **موانع البناء النظامية:**
   - حرم الأودية ومخرات السيول المعتمدة من أمانات المناطق (يمنع البناء فيها منعاً باتاً).
   - حرم خطوط أبراج الضغط الفائق الكهربائية (ارتداد 25 إلى 40 متراً حسب جهد الخط).`;
    } else if (lower.includes("معدات") || lower.includes("موقع") || lower.includes("رافعة") || lower.includes("حفار")) {
      reply = `مرحباً بك! معايير تقدير وإدارة **أسطول المعدات الثقيلة بمواقع البناء** عبر عين سيجام:

1. **الرافعات البرجية (Tower Cranes):**
   - للمباني السكنية العادية حتى 4 أدوار: يُكتفى بكرين هيدروليكي متنقل عند صب الأسقف.
   - للأبراج والمجمعات بمساحة تزيد عن **5,000 م²** وأكثر من 6 أدوار: تتطلب رافعة برجية واحدة لكل **40-50 متراً من نصف قطر التغطية** (Jib Radius)، لضمان تغطية كامل مسطح الصب والمواد.

2. **أطقم الحفر والردم (Earthmoving Fleet):**
   - للأراضي الصخرية بمساحة 1,000 م² حتى عمق قبو 4 أمتار: تحتاج إلى عدد **2 حفار ثقيل مزود بدقاق هيدروليكي** + عدد **1 بلدوزر تسوية** + أسطول **4 إلى 6 شاحنات نقل (تريلات)** لتفريغ الركام يومياً.

3. **محطات ضخ الخرسانة:**
   - مضخة خرسانة مركزية بقدرة صب **90 - 120 م³/ساعة** متزامنة مع 8 إلى 12 خلاطة دوارة لتفادي حدوث فواصل صب باردة (Cold Joints).`;
    } else if (lower.includes("ارتداد") || lower.includes("نسبة") || lower.includes("بناء") || lower.includes("مساحة")) {
      reply = `أهلاً بك! اشتراطات كود البناء السعودي وأنظمة البناء المعتمدة:

- **نسبة البناء السكنية للفلل (BCR):**
  - الحد الأقصى للبناء في الدور الأرضي: **60%** من مساحة الأرض الإجمالية.
  - الملحق العلوي: يسمح بنسبة **50%** من مساحة الدور الأول بموجب التحديثات البلدية.
- **الارتدادات النظامية (Setbacks):**
  - الشارع الرئيسي (الارتداد الأمامي): خُمس عرض الشارع بحد أدنى **3 أمتار** للشوارع السكنية (أو 4م للشوارع التجارية).
  - الارتداد الخلفي والجانبي: **2 متر** كحد أدنى لحفظ الخصوصية وتهوية المنور.
- **معامل مسطحات البناء (FAR):**
  - في المناطق التجارية والمكتبية يتراوح بين **2.4 إلى 4.5**، مما يتيح التوسع الرأسي وإنشاء مواقف سيارات سفلية (قبو).`;
    } else {
      reply = `مرحباً بك في **مركز الاستشارات الهندسية والجيومكانية لمنصة عين سيجام**! 🏗️

نحن جاهزون لمساعدتك في كافة التحليلات المساحية والإنشائية:
- 📐 فحص صلاحية الأراضي للبناء، فحص التربة والجسات ومنسوب المياه الجوفية.
- 🚜 تقدير وإدارة أعداد المعدات الثقيلة المطلوبة في الموقع وتوزيع الآليات.
- 📈 قياس نسب التوسع والتطور العمراني بين السنين والشهور بدقة المسح الفضائي.
- 📏 حساب الارتدادات ونسب البناء (FAR) المعتمدة وفق كود البناء واللوائح البلدية.
- 🔒 التحقق من الصكوك وموانع البناء ومجاري السيول وخطوط الخدمات.

تفضل بكتابة استفسارك الهندسي أو حدد رقم القطعة والموقع للبدء بالتحليل!`;
    }

    res.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/sigam-consult:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.post("/api/sigam-consult", handleSigamConsult);
app.post("/api/paseet-ai", handleSigamConsult); // alias for backward compatibility

// Serve static assets from public directory
app.use("/assets", express.static(path.join(process.cwd(), "public", "assets")));
app.use("/images_webp", express.static(path.join(process.cwd(), "public", "images_webp")));
app.use(express.static(path.join(process.cwd(), "public")));

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(process.cwd(), "dist"))
      ? path.join(process.cwd(), "dist")
      : process.cwd();
    app.use("/assets", express.static(path.join(process.cwd(), "public", "assets")));
    app.use("/images_webp", express.static(path.join(process.cwd(), "public", "images_webp")));
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
