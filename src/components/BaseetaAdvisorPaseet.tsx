import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  MapPin,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  Building,
  RefreshCw,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ArrowLeft,
  Info,
  Layers,
  Ruler,
  Wrench,
  ExternalLink,
  Activity,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  processAdvisorQuery,
  AdvisorResponse,
  findMentionedDistricts
} from '../services/advisorEngine';
import { DistrictInfo } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  rawText: string;
  advisorData?: AdvisorResponse;
  timestamp: string;
  liked?: boolean | null;
}

interface BaseetaAdvisorPaseetProps {
  initialPrompt?: string;
  onNavigate?: (pageId: string) => void;
  selectedCity?: string;
}

export const BaseetaAdvisorPaseet: React.FC<BaseetaAdvisorPaseetProps> = ({
  initialPrompt = '',
  onNavigate,
  selectedCity = 'الرياض'
}) => {
  const { t, isAr } = useLanguage();

  // Initial welcome message from the advisor
  const initialBotResponse: AdvisorResponse = processAdvisorQuery('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      rawText: initialBotResponse.summary,
      advisorData: initialBotResponse,
      timestamp: isAr ? 'الآن' : 'Just now'
    }
  ]);

  const [inputVal, setInputVal] = useState<string>(initialPrompt);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeContextDistrict, setActiveContextDistrict] = useState<DistrictInfo | undefined>(
    initialBotResponse.detectedDistrict
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  // Handle incoming initialPrompt
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== '') {
      setInputVal(initialPrompt);
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Prompt suggestions by category
  const promptCategories = [
    {
      id: 'all',
      labelAr: 'الكل',
      labelEn: 'All Topics'
    },
    {
      id: 'market',
      labelAr: 'الأسعار والسوق',
      labelEn: 'Market & Prices'
    },
    {
      id: 'feasibility',
      labelAr: 'جدوى وتطوير الأراضي',
      labelEn: 'Land Feasibility'
    },
    {
      id: 'comparison',
      labelAr: 'مقارنة الأحياء',
      labelEn: 'District Comparison'
    },
    {
      id: 'engineering',
      labelAr: 'كود البناء والتربة',
      labelEn: 'SBC & Geotechnical'
    },
    {
      id: 'monitoring',
      labelAr: 'متابعة المشاريع',
      labelEn: 'Project Tracking'
    }
  ];

  const suggestedPrompts = [
    {
      cat: 'market',
      textAr: 'كم سعر المتر في حي النرجس؟',
      textEn: 'What is the average price per m² in Al-Narjis district?'
    },
    {
      cat: 'feasibility',
      textAr: 'لو معايا أرض في شمال الرياض، إيه أفضل استخدام لها؟',
      textEn: 'What is the highest and best use for land in North Riyadh?'
    },
    {
      cat: 'comparison',
      textAr: 'عايز أقارن الاستثمار بين الملقا وحي حطين.',
      textEn: 'Compare investment potential between Al-Malqa and Hittin.'
    },
    {
      cat: 'feasibility',
      textAr: 'هل الأرض دي مناسبة لبناء شقق سكنية؟',
      textEn: 'Is this land plot suitable for building residential apartments?'
    },
    {
      cat: 'market',
      textAr: 'ما هو أفضل حي للاستثمار الإيجاري في الرياض؟',
      textEn: 'What is the best district for rental investment in Riyadh?'
    },
    {
      cat: 'engineering',
      textAr: 'هل أحتاج دراسة تربة وجسات قبل البدء في المشروع؟',
      textEn: 'Do I need a soil and geotechnical study before starting construction?'
    },
    {
      cat: 'engineering',
      textAr: 'ما هي اشتراطات كود البناء السعودي SBC للارتدادات ونسب البناء؟',
      textEn: 'What are the Saudi Building Code (SBC) setback requirements and BCR?'
    },
    {
      cat: 'monitoring',
      textAr: 'عندي مشروع تحت الإنشاء، إيه البيانات اللي أتابعها أسبوعياً؟',
      textEn: 'What weekly metrics should I track for a project under construction?'
    },
    {
      cat: 'feasibility',
      textAr: 'قارن بين البيع والإيجار في المنطقة دي.',
      textEn: 'Compare selling vs long-term renting in this zone.'
    }
  ];

  const filteredPrompts = activeCategoryFilter === 'all'
    ? suggestedPrompts
    : suggestedPrompts.filter(p => p.cat === activeCategoryFilter);

  // Send query logic
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isProcessing) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      rawText: query,
      timestamp: isAr ? 'الآن' : 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsProcessing(true);

    // Let user see typing animation & processing status line
    setTimeout(async () => {
      try {
        // First, generate structured response through our deep domain engine
        const advisorResult = processAdvisorQuery(query);

        // Update active context district if detected
        if (advisorResult.detectedDistrict) {
          setActiveContextDistrict(advisorResult.detectedDistrict);
        } else {
          const mentioned = findMentionedDistricts(query);
          if (mentioned.length > 0) {
            setActiveContextDistrict(mentioned[0]);
          }
        }

        const botMessageId = `bot-${Date.now()}`;
        const botMsg: ChatMessage = {
          id: botMessageId,
          sender: 'bot',
          rawText: advisorResult.summary,
          advisorData: advisorResult,
          timestamp: isAr ? 'الآن' : 'Just now'
        };

        setMessages(prev => [...prev, botMsg]);
      } catch (err) {
        console.error('Advisor processing error:', err);
        // Fallback response safely
        const fallbackResult = processAdvisorQuery('');
        setMessages(prev => [
          ...prev,
          {
            id: `bot-err-${Date.now()}`,
            sender: 'bot',
            rawText: fallbackResult.summary,
            advisorData: fallbackResult,
            timestamp: isAr ? 'الآن' : 'Just now'
          }
        ]);
      } finally {
        setIsProcessing(false);
      }
    }, 600);
  };

  // Copy text to clipboard
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Like / Dislike feedback
  const handleFeedback = (id: string, isLike: boolean) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === id) {
          return {
            ...msg,
            liked: msg.liked === isLike ? null : isLike
          };
        }
        return msg;
      })
    );
  };

  // Regenerate last response
  const handleRegenerate = (userQueryText?: string) => {
    const lastUserQuery = userQueryText || [...messages].reverse().find(m => m.sender === 'user')?.rawText;
    if (lastUserQuery) {
      handleSendMessage(lastUserQuery);
    }
  };

  // Clear / New Conversation
  const handleNewConversation = () => {
    const freshWelcome = processAdvisorQuery('');
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'bot',
        rawText: freshWelcome.summary,
        advisorData: freshWelcome,
        timestamp: isAr ? 'الآن' : 'Just now'
      }
    ]);
    setActiveContextDistrict(freshWelcome.detectedDistrict);
    setInputVal('');
  };

  // Trigger internal navigation
  const handleActionClick = (targetPage: string) => {
    if (onNavigate) {
      onNavigate(targetPage);
    } else {
      window.location.hash = targetPage;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Header Bar: White & Ain Sijam Blue Identity */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
            <Bot className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white">
                {t('المستشار العقاري والهندسي «عين سيجام AI»', 'Ain Sigam AI Spatial Advisor')}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {t('استشاري مباشر وموثق', 'Live Verified Advisory')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {t(
                'مستشارك المعتمد لتحليل أسعار صفقات وزارة العدل، فحص صلاحية الأراضي للبناء، متطلبات كود البناء السعودي (SBC)، وتتبع مراحل التشييد الميدانية بالأرقام.',
                'Your certified advisor for MoJ deal pricing, land feasibility, Saudi Building Code (SBC) compliance, and construction milestone tracking with verified data.'
              )}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleNewConversation}
            className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={t('بدء محادثة جديدة', 'Start New Conversation')}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t('محادثة جديدة', 'New Session')}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Workspace: Desktop 2-column or Mobile 1-column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Conversation Column */}
        <div className={`space-y-4 ${activeContextDistrict ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          {/* Chat Messages Log */}
          <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm min-h-[500px] flex flex-col justify-between">
            <div className="space-y-6 overflow-y-auto max-h-[640px] pr-1 pl-1">
              {messages.map((msg, index) => {
                const isUser = msg.sender === 'user';
                const adv = msg.advisorData;
                const isEnMsg = adv?.language === 'en';

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 transition-opacity duration-300 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Bot Avatar */}
                    {!isUser && (
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20 mt-1">
                        <Bot className="w-5 h-5" />
                      </div>
                    )}

                    {/* Message Bubble Container */}
                    <div
                      className={`max-w-[92%] sm:max-w-[85%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed transition-all shadow-sm ${
                        isUser
                          ? 'bg-blue-600 text-white shadow-blue-600/15 rounded-tr-sm ml-auto'
                          : 'bg-blue-50/70 dark:bg-slate-950/80 text-slate-900 dark:text-slate-100 border border-blue-100 dark:border-slate-800 rounded-tl-sm'
                      }`}
                      dir={isEnMsg ? 'ltr' : undefined}
                    >
                      {/* USER MESSAGE */}
                      {isUser && (
                        <div className="font-medium whitespace-pre-wrap text-sm leading-relaxed">
                          {msg.rawText}
                        </div>
                      )}

                      {/* AI ADVISOR RESPONSE (STRUCTURED & GENTLY SCANNABLE) */}
                      {!isUser && adv && (
                        <div className="space-y-4">
                          {/* Top Meta Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 pb-2.5 border-b border-blue-200/60 dark:border-slate-800">
                            {adv.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700 shadow-2xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* 1. Direct Answer / Summary */}
                          <div className="text-slate-900 dark:text-slate-100 font-medium text-sm sm:text-base leading-relaxed">
                            <span className="font-bold text-blue-900 dark:text-blue-300">
                              {adv.language === 'en' ? 'Direct Assessment: ' : 'الخلاصة التقديرية: '}
                            </span>
                            {adv.summary}
                          </div>

                          {/* 2. Key Supporting Factors */}
                          {adv.keyFactors && adv.keyFactors.length > 0 && (
                            <div className="space-y-1.5 bg-white/70 dark:bg-slate-900/60 p-3 rounded-2xl border border-blue-100 dark:border-slate-800/80">
                              <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                                <Activity className="w-3.5 h-3.5 text-blue-600" />
                                {adv.language === 'en' ? 'Key Grounded Factors' : 'ما يدعم القرار والتحليل'}
                              </div>
                              <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                {adv.keyFactors.map((fac, fIdx) => (
                                  <li key={fIdx} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1 shrink-0 font-bold">•</span>
                                    <span>{fac}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* 3. Platform Data Indicators (KPI summary) */}
                          {adv.platformIndicators && (
                            <div className="space-y-2">
                              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-blue-800 dark:text-blue-300 font-bold">
                                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                                  {adv.language === 'en' ? 'Verified Platform Indicators' : 'المؤشرات الرقمية المتاحة من بيانات المنصة'}
                                </span>
                                {adv.platformIndicators.districtName && (
                                  <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
                                    {adv.platformIndicators.districtName}
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {adv.platformIndicators.metrics.map((m, mIdx) => (
                                  <div
                                    key={mIdx}
                                    className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-blue-100 dark:border-slate-800 shadow-2xs"
                                  >
                                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{m.label}</div>
                                    <div className="text-xs sm:text-sm font-black text-blue-950 dark:text-white mt-0.5">
                                      {m.value}
                                    </div>
                                    {m.subValue && (
                                      <div className="text-[9px] text-blue-600 font-semibold">{m.subValue}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="text-[10px] text-slate-400 italic">
                                {adv.platformIndicators.sourceNote}
                              </div>
                            </div>
                          )}

                          {/* 4. Comparison Table (When 2 districts or buy vs rent are compared) */}
                          {adv.comparisonData && (
                            <div className="space-y-2 overflow-x-auto">
                              <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-blue-600" />
                                {adv.language === 'en' ? 'Side-by-Side Comparison Matrix' : 'جدول المقارنة التحليلية بالأرقام المعتمدة'}
                              </div>
                              <div className="border border-blue-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                                <table className="w-full text-xs text-right">
                                  <thead className="bg-blue-50/80 dark:bg-slate-800/80 text-blue-950 dark:text-blue-200 border-b border-blue-100 dark:border-slate-800">
                                    <tr>
                                      <th className="p-2.5 font-bold">{adv.language === 'en' ? 'Factor' : 'عنصر المقارنة'}</th>
                                      <th className="p-2.5 font-bold text-center text-blue-700 dark:text-blue-300">{adv.comparisonData.titleA}</th>
                                      <th className="p-2.5 font-bold text-center text-indigo-700 dark:text-indigo-300">{adv.comparisonData.titleB}</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-blue-50 dark:divide-slate-800">
                                    {adv.comparisonData.rows.map((row, rIdx) => (
                                      <tr key={rIdx} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/40">
                                        <td className="p-2.5 font-medium text-slate-700 dark:text-slate-300">{row.factor}</td>
                                        <td className="p-2.5 text-center font-bold text-blue-950 dark:text-white">
                                          {row.itemA}
                                        </td>
                                        <td className="p-2.5 text-center font-bold text-blue-950 dark:text-white">
                                          {row.itemB}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* 5. 10-Stage Project Monitoring Workflow (for Construction Tracking questions) */}
                          {adv.workflowData && (
                            <div className="space-y-2.5 pt-1">
                              <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                                {adv.workflowData.title}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {adv.workflowData.steps.map(step => (
                                  <div
                                    key={step.stepNumber}
                                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 flex items-start gap-2.5"
                                  >
                                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                      {step.stepNumber}
                                    </div>
                                    <div className="space-y-0.5">
                                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span>{step.title}</span>
                                        {step.keyMetric && (
                                          <span className="text-[9px] px-1.5 py-0.2 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded font-mono">
                                            {step.keyMetric}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                        {step.description}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 6. Engineering & Permitting Checklist */}
                          {adv.engineeringChecklist && (
                            <div className="space-y-2 bg-white/80 dark:bg-slate-900/80 p-3 rounded-2xl border border-blue-100 dark:border-slate-800">
                              <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                                {adv.engineeringChecklist.title}
                              </div>
                              <div className="space-y-1.5">
                                {adv.engineeringChecklist.items.map((it, itIdx) => (
                                  <div
                                    key={itIdx}
                                    className="flex items-start justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800 text-xs"
                                  >
                                    <div className="flex items-center gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                      <span className="text-slate-800 dark:text-slate-200">{it.task}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-medium">
                                        {it.authority}
                                      </span>
                                      {it.mandatory && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-bold">
                                          {adv.language === 'en' ? 'Mandatory' : 'إلزامي'}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 7. Verification Warning / Items to Check Officially */}
                          {adv.verificationItems && adv.verificationItems.length > 0 && (
                            <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs space-y-1">
                              <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                {adv.language === 'en' ? 'Mandatory Official Verification' : 'يلزم التحقق منه رسمياً قبل التنفيذ'}
                              </div>
                              <ul className="space-y-0.5 text-amber-950/80 dark:text-amber-200/80">
                                {adv.verificationItems.map((ver, vIdx) => (
                                  <li key={vIdx} className="flex items-start gap-1.5">
                                    <span className="text-amber-600">•</span>
                                    <span>{ver}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* 8. Clarification Questions (Smart follow-up) */}
                          {adv.clarificationQuestions && adv.clarificationQuestions.length > 0 && (
                            <div className="p-3 rounded-2xl bg-sky-50/80 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/40 text-xs space-y-1.5">
                              <div className="font-bold text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
                                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                                {adv.language === 'en' ? 'To give you more precise recommendations, could you clarify:' : 'لتقديم دراسة أدق، هل يمكنك توضيح:'}
                              </div>
                              <div className="space-y-1 text-sky-950 dark:text-sky-200">
                                {adv.clarificationQuestions.map((q, qIdx) => (
                                  <div key={qIdx} className="flex items-start gap-1.5">
                                    <span className="text-sky-600 font-bold">؟</span>
                                    <span>{q}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 9. Next Action Advice & Context Action Buttons (Max 2) */}
                          <div className="pt-2 border-t border-blue-200/60 dark:border-slate-800 space-y-2.5">
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              <span className="font-bold text-blue-900 dark:text-blue-300">
                                {adv.language === 'en' ? 'Recommended Next Action: ' : 'الخطوة التالية الموصى بها: '}
                              </span>
                              {adv.nextActionAdvice}
                            </div>

                            {/* Max 2 Context Buttons */}
                            {adv.suggestedActions && adv.suggestedActions.length > 0 && (
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {adv.suggestedActions.slice(0, 2).map(act => (
                                  <button
                                    key={act.id}
                                    onClick={() => handleActionClick(act.targetPage)}
                                    className="text-xs px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
                                  >
                                    <span>{act.label}</span>
                                    {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 10. Message Utilities: Copy, Regenerate, Feedback */}
                          <div className="flex items-center justify-between pt-2 border-t border-blue-100 dark:border-slate-800 text-[11px] text-slate-400">
                            <div className="flex items-center gap-3">
                              {/* Copy button */}
                              <button
                                onClick={() => handleCopy(msg.id, `${adv.summary}\n\n${adv.nextActionAdvice}`)}
                                className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
                                title="نسخ الإجابة"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-600 font-semibold">{t('تم النسخ', 'Copied')}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>{t('نسخ', 'Copy')}</span>
                                  </>
                                )}
                              </button>

                              {/* Regenerate button */}
                              <button
                                onClick={() => handleRegenerate()}
                                className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
                                title="إعادة التحليل"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>{t('إعادة التحليل', 'Regenerate')}</span>
                              </button>
                            </div>

                            {/* Feedback buttons */}
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400">{t('هل كانت الإجابة مفيدة؟', 'Was this helpful?')}</span>
                              <button
                                onClick={() => handleFeedback(msg.id, true)}
                                className={`p-1 rounded-md transition-colors cursor-pointer ${
                                  msg.liked === true ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/40' : 'hover:text-slate-600'
                                }`}
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleFeedback(msg.id, false)}
                                className={`p-1 rounded-md transition-colors cursor-pointer ${
                                  msg.liked === false ? 'text-red-500 bg-red-50 dark:bg-red-900/40' : 'hover:text-slate-600'
                                }`}
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* User Avatar */}
                    {isUser && (
                      <div className="w-9 h-9 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Processing status line & typing indicator */}
              {isProcessing && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/60 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800 text-xs text-blue-700 dark:text-blue-300 w-fit">
                  <div className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {t('يقوم عين سيجام بتحليل سؤالك ومطابقة بيانات السوق وكود البناء…', 'Ain Sigam is analyzing your question against market data and SBC codes…')}
                    </span>
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Suggestions Section */}
            <div className="mt-4 pt-3 border-t border-blue-100 dark:border-slate-800 space-y-2">
              {/* Category tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-[11px] font-bold text-slate-400 shrink-0 ml-1">
                  {t('اقتراحات:', 'Suggestions:')}
                </span>
                {promptCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryFilter(cat.id)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg transition-all shrink-0 font-medium cursor-pointer ${
                      activeCategoryFilter === cat.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    {isAr ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Dynamic suggestion chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {filteredPrompts.slice(0, 4).map((pr, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(isAr ? pr.textAr : pr.textEn)}
                    className="text-xs px-3 py-1.5 rounded-xl border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-400 transition-colors shrink-0 text-right cursor-pointer"
                  >
                    {isAr ? pr.textAr : pr.textEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="relative flex items-center pt-3 mt-2 border-t border-blue-100 dark:border-slate-800">
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={t(
                  'اكتب سؤالك العقاري أو الهندسي هنا… مثل: هل الأرض مناسبة للتطوير السكني؟',
                  'Type your real estate or engineering question here… e.g., Is this land suitable for residential development?'
                )}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm rounded-2xl px-4 py-3.5 pl-12 border border-blue-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 resize-none transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputVal.trim() || isProcessing}
                className="absolute left-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white p-2.5 rounded-xl transition-all shadow-md shadow-blue-600/25 cursor-pointer"
                title={t('إرسال السؤال', 'Send question')}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Discreet Trust & Transparency Note */}
          <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400 bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              {t(
                'تُقدَّم النتائج كدعم لاتخاذ القرار، ويجب التحقق من المتطلبات التنظيمية والتراخيص من الجهات الرسمية قبل التنفيذ.',
                'Results are provided as decision support. Regulatory requirements and permits must be officially verified with authorities before execution.'
              )}
            </span>
          </div>
        </div>

        {/* Contextual Side Panel (Desktop only, conditional when a district is relevant) */}
        {activeContextDistrict && (
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
              {/* Context Header */}
              <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{t('بيانات النطاق المرصود', 'Context Scope')}</div>
                    <div className="text-sm font-black text-blue-950 dark:text-white">
                      {isAr ? `حي ${activeContextDistrict.name}` : `${activeContextDistrict.name} District`}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 font-bold">
                  {activeContextDistrict.city}
                </span>
              </div>

              {/* District Quick Indicators */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500">{t('متوسط المتر السكني', 'Avg Residential / m²')}</div>
                  <div className="text-xs sm:text-sm font-black text-blue-950 dark:text-white">
                    {activeContextDistrict.avgPriceM2Residential.toLocaleString()} {t('ر.س', 'SAR')}
                  </div>
                  <div className="text-[9px] text-emerald-600 font-bold mt-0.5">
                    +{activeContextDistrict.yearlyChangePct}% {t('سنوياً', 'YoY')}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500">{t('العائد الإيجاري الإجمالي', 'Gross Rental Yield')}</div>
                  <div className="text-xs sm:text-sm font-black text-blue-950 dark:text-white">
                    {activeContextDistrict.rentalYieldPct}%
                  </div>
                  <div className="text-[9px] text-blue-600 font-semibold mt-0.5">
                    {activeContextDistrict.demandLevel}
                  </div>
                </div>
              </div>

              {/* Zone Type & Nearby Projects */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{t('تصنيف المنطقة:', 'Zone Classification:')}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activeContextDistrict.zoneType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{t('الصفقات الشهرية:', 'Monthly Deals:')}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activeContextDistrict.dealsCountMonth} {t('صفقة', 'deals')}</span>
                </div>
              </div>

              {activeContextDistrict.nearbyProjects && activeContextDistrict.nearbyProjects.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-blue-50 dark:border-slate-800 text-xs">
                  <div className="text-[10px] font-bold text-slate-400">{t('أبرز المعالم والمشاريع المجاورة:', 'Key Nearby Mega-Projects:')}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeContextDistrict.nearbyProjects.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Side Panel Actions */}
              <div className="space-y-2 pt-2 border-t border-blue-100 dark:border-slate-800">
                <button
                  onClick={() => handleActionClick('map')}
                  className="w-full text-xs font-bold py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-blue-600/20"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t('عرض الحي على الخريطة التفاعلية', 'View District on Live Map')}</span>
                </button>

                <button
                  onClick={() => handleActionClick('compare')}
                  className="w-full text-xs font-semibold py-2 px-3 rounded-xl border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('مقارنة هذا الحي مع أحياء أخرى', 'Compare with Other Districts')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
