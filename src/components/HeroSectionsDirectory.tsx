import React from 'react';
import { Layers } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { PagesDirectoryGrid } from './PagesDirectoryGrid';

interface HeroSectionsDirectoryProps {
  onRequestSubscription?: (reason: string) => void;
  onNavigate?: (pageId: string) => void;
  lang?: Language;
}

export const HeroSectionsDirectory: React.FC<HeroSectionsDirectoryProps> = ({
  onRequestSubscription,
  onNavigate,
  lang: propLang,
}) => {
  const context = useLanguage();
  const lang = propLang || context.lang || 'ar';
  const t = translations[lang] || translations.ar;
  const isAr = lang === 'ar';

  const handlePageClick = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <section 
      id="platform-sections-directory" 
      className="relative pb-12 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Dedicated Pages Grid - الأقسام */}
        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-sky-100/90 dark:border-slate-800/90 shadow-md mb-8">
          <PagesDirectoryGrid
            currentPageId="home"
            onNavigate={(id) => handlePageClick(id)}
            isCompact={true}
          />
        </div>

        {/* Live Telemetry Ticker Cards Bar (Our Projects - مشروعاتنا) */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight font-['Cairo']">
              {isAr ? 'مشروعاتنا المرصودة فضائياً' : 'Our Satellite Monitored Projects'}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{isAr ? 'المشاريع المرصودة فضائياً' : 'Monitored Projects'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                24 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{isAr ? 'مشروعاً استراتيجياً' : 'Mega Projects'}</span>
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                {t.statProjectsDesc}
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{isAr ? 'المعدات والآليات المتصلة' : 'Connected Equipment'}</span>
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                1,645 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{isAr ? 'معدة نشطة' : 'Active Units'}</span>
              </div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400 font-bold mt-1">
                {t.statFleetDesc}
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{isAr ? 'الأراضي التي تم دراستها' : 'Studied Land Plots'}</span>
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                4,320 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{isAr ? 'قطعة أرض' : 'Plots'}</span>
              </div>
              <div className="text-[11px] text-teal-600 dark:text-teal-400 font-bold mt-1">
                {t.statPlotsDesc}
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{isAr ? 'امتثال كود البناء SBC' : 'SBC Compliance'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                94.8% <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{isAr ? 'نسبة الامتثال' : 'Compliance'}</span>
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                {t.statSbcDesc}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
