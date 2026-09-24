import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  Send, 
  User, 
  RotateCcw, 
  Building2, 
  Layers, 
  Truck, 
  Ruler, 
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ChatMessage, City } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface SigamEngineeringAdvisorProps {
  selectedCity: City | 'الكل';
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const SigamEngineeringAdvisor: React.FC<SigamEngineeringAdvisorProps> = ({
  selectedCity,
  initialQuery,
  onClearInitialQuery,
}) => {
  const { t, isAr } = useLanguage();

  const getInitialMessage = (): ChatMessage => ({
    id: 'welcome-sigam',
    role: 'assistant',
    text: t(
      `مرحباً بك في **مركز الاستشارات الهندسية والجيومكانية لمنصة عين سيجام**! 🏗️📐

فريقنا الاستشاري المتخصص في علوم الجيوتقنية، التخطيط العمراني، وكود البناء السعودي (SBC) جاهز لمساعدتك في:
- **فحص صلاحية الأراضي للبناء:** فحص الجسات، قدرة تحمل التربة (كجم/سم²)، المياه الجوفية، وموانع البناء ومجاري السيول.
- **إدارة مواقع البناء وأسطول الآليات:** تقدير وتوزيع الرافعات البرجية، الحفارات، مضخات الخرسانة، ومتابعة نسب الإنجاز.
- **أنظمة البناء والارتدادات:** نسب البناء المسموحة (BCR)، معامل مسطحات البناء (FAR)، اشتراطات بلدي.
- **التطور العمراني:** مقارنة نسب التوسع السنوية والشهرية وتناقص الأراضي البيضاء.

تفضل بكتابة سؤالك أو اختر أحد المواضيع السريعة أدناه:`,
      `Welcome to the **Ayn Sigam Construction & Satellite Engineering Advisory Center**! 🏗️📐

Our expert geotechnical, urban planning, and Saudi Building Code (SBC) consultants are ready to assist with:
- **Soil & Land Suitability:** Borehole analysis, soil bearing capacity (kg/cm²), water table depth, hydrological flood paths, and right-of-way buffers.
- **Site Operations & Fleet:** Tower crane positioning, excavator planning, concrete pump logistics, and milestone progress validation.
- **Zoning & Municipal Regulations:** Building Coverage Ratio (BCR), Floor Area Ratio (FAR), setback mandates, and Balady code compliance.
- **Urban Growth Dynamics:** Annual and monthly satellite expansion analysis, white land depletion telemetry.

Type your engineering question below or select a prompt to begin:`
    ),
    timestamp: isAr ? 'الآن' : 'Now',
  });

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message when language toggles if conversation hasn't started
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome-sigam') {
      setMessages([getInitialMessage()]);
    }
  }, [isAr]);

  const quickPrompts = [
    {
      label: t('شروط صلاحية التربة للبناء دون إحلال', 'Soil Bearing Standards for Direct Footings'),
      prompt: t(
        'ما هي مواصفات فحص الجسات وقدرة تحمل التربة (Bearing Capacity) الصالحة للبناء المباشر للفلل السكنية دون الحاجة لإحلال تربة أو خوازيق؟',
        'What are the borehole geotechnical criteria and soil bearing capacity standards required for direct shallow footings without soil replacement or piling?'
      ),
      icon: Layers,
    },
    {
      label: t('تقدير الرافعات البرجية بالموقع', 'Tower Crane Fleet Estimation'),
      prompt: t(
        'كيف يتم حساب عدد الرافعات البرجية (Tower Cranes) المطلوبة لمشروع أبراج مكتبية بمسطحات بناء 80,000 م²؟',
        'How do site engineers calculate the optimal number and jib radius of tower cranes for an 80,000 m² commercial tower complex?'
      ),
      icon: Truck,
    },
    {
      label: t('نسب البناء والارتدادات السكنية', 'Building Ratios & Setbacks (SBC)'),
      prompt: t(
        'ما هي النسبة المئوية القصوى للبناء في الدور الأرضي والملحق العلوي والارتدادات النظامية لكود البناء السعودي؟',
        'What are the maximum ground floor footprint ratio (BCR), upper annex regulations, and minimum setback distances according to the Saudi Building Code?'
      ),
      icon: Ruler,
    },
    {
      label: t('تحديد مخرات السيول وموانع البناء', 'Hydrological Floodways & Right-of-Way'),
      prompt: t(
        'كيف يمكن للمطور التأكد من عدم وقوع قطعة الأرض داخل حيز مجرى سيل أو حرم أبراج كهرباء ضغط عالي؟',
        'How can a real estate developer verify that a plot does not intersect hydrological wadi floodways or high-voltage overhead power corridors?'
      ),
      icon: ShieldCheck,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
      if (onClearInitialQuery) {
        onClearInitialQuery();
      }
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/sigam-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, city: selectedCity }),
      });

      if (!response.ok) {
        throw new Error('Connection failed');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply || t('تمت مراجعة الاستفسار من قبل فريق عين سيجام الهندسي.', 'Inquiry reviewed by Ayn Sigam Engineering Directorate.'),
        timestamp: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: t(
          `تم استلام استفسارك الهندسي بخصوص: "${queryText}".\n\nوفقاً لمعايير كود البناء السعودي (SBC) ونظام الرصد الجيومكاني لعين سيجام، فإن المعاينة الدقيقة تتطلب مطابقة رقم القطعة مع شبكة مناسيب مخرات السيول وأحدث تقارير الجسات المخبرية المعتمدة.`,
          `Your engineering inquiry regarding "${queryText}" has been logged.\n\nUnder Saudi Building Code (SBC) provisions and Ayn Sigam satellite telemetry, precise determination requires cadastral parcel cross-referencing against hydrological runoff models and certified soil borehole stratigraphy.`
        ),
        timestamp: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: t(
          'تم بدء جلسة استشارية جديدة. تفضل بطرح أي استفسار هندسي، جيوتقني، أو إنشائي.',
          'New advisory session initiated. Feel free to ask any civil engineering, geotechnical, or spatial query.'
        ),
        timestamp: isAr ? 'الآن' : 'Now',
      },
    ]);
  };

  return (
    <section id="advisor" className="py-14 bg-slate-50/60 dark:bg-slate-950 relative transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {t('المستشار الهندسي والتحليل الفضائي لعين سيجام', 'Ayn Sigam Satellite & Engineering AI Advisor')}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {t('استشارات معتمدة', 'Certified SBC AI')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t(
                  'تحليل التربة، نسب ومسطحات البناء، كود الارتدادات، وتوزيع المعدات الإنشائية',
                  'Geotechnical soil analysis, building coverage ratios, setback regulations, and site equipment allocation'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('جلسة استشارة جديدة', 'Reset Consultation')}</span>
          </button>
        </div>

        {/* Quick Topics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {quickPrompts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                disabled={isLoading}
                className={`p-3 rounded-2xl bg-white dark:bg-slate-900 hover:bg-sky-50/60 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-all flex items-start gap-2.5 group shadow-xs disabled:opacity-50 ${
                  isAr ? 'text-right' : 'text-left'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-sky-50 dark:bg-slate-800 group-hover:bg-sky-500 group-hover:text-white text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                    {item.prompt}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chat Stream Window */}
        <div className="bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm min-h-[420px] max-h-[560px] flex flex-col justify-between transition-colors">
          
          <div className="overflow-y-auto space-y-4 pr-1 flex-1 mb-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-xs ${
                      isUser
                        ? 'bg-slate-800 dark:bg-slate-700 text-white'
                        : 'bg-gradient-to-br from-sky-500 to-emerald-500 text-white font-bold'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/10'
                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div
                      className={`text-[10px] mt-2 font-mono ${
                        isUser ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                      } ${isAr ? 'text-left' : 'text-right'}`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white flex items-center justify-center font-bold text-xs animate-pulse">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl p-3.5 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                  <span>{t('جاري تحليل استفسارك الهندسي ومراجعة معايير كود البناء SBC...', 'Analyzing engineering query against Saudi Building Code (SBC) matrices...')}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(
                'اكتب استفسارك الهندسي (عن التربة، الارتدادات، نسب البناء، أو معدات الموقع)...',
                'Ask an engineering question (soil bearing, setbacks, BCR/FAR, or machinery fleet)...'
              )}
              disabled={isLoading}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm rounded-2xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>{t('إرسال', 'Send')}</span>
              <Send className={`w-4 h-4 ${!isAr ? 'rotate-180' : ''}`} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
