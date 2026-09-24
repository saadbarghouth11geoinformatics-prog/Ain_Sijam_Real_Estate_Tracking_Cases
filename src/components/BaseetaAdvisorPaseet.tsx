import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  FileCheck, 
  ShieldCheck,
  Building,
  RefreshCw,
  User
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  tags?: string[];
}

interface BaseetaAdvisorPaseetProps {
  initialPrompt?: string;
}

export const BaseetaAdvisorPaseet: React.FC<BaseetaAdvisorPaseetProps> = ({
  initialPrompt = ''
}) => {
  const { t, isAr } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'أهلاً بك! أنا مستشارك العقاري والهندسي الذكي "عين سيجام AI". اسألني عن أسعار المتر في أي حي، فحص صلاحية الأراضي للبناء، دراسات الجدوى الإيجارية، أو التخطيط العمراني بالمملكة.',
      time: 'الآن',
      tags: ['أسعار المتر', 'صلاحية الأراضي', 'العائد الإيجاري', 'كود البناء']
    }
  ]);
  const [inputVal, setInputVal] = useState(initialPrompt);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'كم متوسط سعر المتر السكني في حي النرجس بالرياض؟',
    'ما هي أفضل أحياء جدة من حيث العائد الإيجاري؟',
    'هل الاستثمار في شقق الملقا أفضل أم حطين؟',
    'ما هي اشتراطات كود البناء السعودي SBC للارتدادات؟'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: 'الآن'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // AI simulated response
    setTimeout(() => {
      let botResponse = 'بناءً على صفقات وزارة العدل والسجل العقاري المفرغة خلال آخر 30 يوماً:\n';

      if (text.includes('النرجس')) {
        botResponse += '• متوسط سعر المتر السكني في حي النرجس يبلغ 5,400 ر.س/م² بنمو سنوي 14.2%.\n• العائد الإيجاري للشقق السكنية يقارب 8.5%، ويعد الحي من أكثر الأحياء طلباً شمال الرياض بفضل اكتمال البنية التحتية وقربه من محطات المترو والجامعات.';
      } else if (text.includes('جدة')) {
        botResponse += '• أعلى أحياء جدة في العائد الإيجاري حالياً هي: حي الشاطئ (7.8%)، وحي السلامة (8.2%)، والروضة (7.5%).\n• يتركز الطلب الأعلى على الشقق المكونة من غرفتين وصالة بنظام التأجير السنوي والشهري المفروش.';
      } else if (text.includes('الملقا') || text.includes('حطين')) {
        botResponse += '• الملقا vs حطين: حي حطين يمتلك متوسط سعر متر أعلى (8,600 ر.س مقابل 7,850 ر.س بالملقا).\n• عائد التأجير في الملقا أعلى بنسبة طفيفة (7.1% مقابل 6.4% في حطين) نظراً للطلب المتزايد على الشقق الفاخرة بجوار مجمع الدوائر المالية.';
      } else if (text.includes('كود') || text.includes('ارتداد') || text.includes('SBC')) {
        botResponse += '• طبقاً لكود البناء السعودي (SBC) واللوائح البلدية، الارتداد الأمامي القياسي للفلل السكنية هو 1/5 من عرض الشارع (بحد أدنى 3 أمتار)، والارتدادات الجانبية والخلفية لا تقل عن 2 متر، مع السماح بنسبة بناء دور أرضي تصل إلى 60-65% من مساحة الأرض.';
      } else {
        botResponse += `• بيانات الاستفسار عن "${text}": سجلت مؤشرات المنطقة معدل نمو إيجابي 11.5% خلال الربع الحالي، مع استقرار في متوسط أسعار الصفقات الرسمية.\n• يُنصح دائماً بفحص رقم المخطط ونوع استخدام الأرض (سكني/تجاري) قبل إبرام أي عقد شراء.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          time: 'الآن',
          tags: ['موثق', 'وزارة العدل', 'كود SBC']
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section id="advisor" className="space-y-6">
      {/* 1. Header (Blue & White) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Bot className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white">
              {t('المستشار العقاري والهندسي «عين سيجام AI»', 'Ain Sigam AI Spatial Advisor')}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 font-bold">
              {t('ذكاء اصطناعي عقاري', 'Real Estate AI')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            {t(
              'اطرح أي سؤال عقاري واستلم إجابات فورية مبنية على البيانات والصفقات الحية وكود البناء السعودي.',
              'Ask any real estate question and get instant answers grounded in live market deals and SBC building codes.'
            )}
          </p>
        </div>
      </div>

      {/* 2. Chat Container (Blue & White) */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        
        {/* Messages Scroll Area */}
        <div className="space-y-4 max-h-[420px] overflow-y-auto p-2 no-scrollbar">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-blue-50/60 dark:bg-slate-950/80 text-slate-900 dark:text-slate-100 border border-blue-100 dark:border-slate-800'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.tags && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2 border-t border-blue-100 dark:border-slate-800/80">
                    {msg.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700 font-mono font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 p-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>{t('«عين سيجام AI» يحلل صفقات السوق ويجهز الإجابة...', 'Ain Sigam AI is analyzing market deals and preparing the response...')}</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Chips */}
        <div className="pt-2 border-t border-blue-100 dark:border-slate-800">
          <div className="text-[11px] text-slate-400 mb-2">أسئلة مقترحة وسريعة:</div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs px-3 py-1.5 rounded-xl border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-blue-700 dark:text-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-colors text-right cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="relative flex items-center pt-2">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك العقاري هنا (مثال: قارن بين أحياء شمال الرياض، حساب ارتداد الأرض)..."
            className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm rounded-2xl px-4 py-3 pl-12 border border-blue-200 dark:border-slate-700 focus:outline-none focus:border-blue-600"
          />
          <button
            onClick={() => handleSend()}
            className="absolute left-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-all shadow-md shadow-blue-600/25 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
