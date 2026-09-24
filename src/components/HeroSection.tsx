import React from 'react';
import { Language, translations } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { PagesDirectoryGrid } from './PagesDirectoryGrid';

interface HeroSectionProps {
  onRequestSubscription?: (reason: string) => void;
  onNavigate?: (pageId: string) => void;
  lang?: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestSubscription,
  onNavigate,
  lang: propLang,
}) => {
  const context = useLanguage();
  const lang = propLang || context.lang || 'ar';
  const t = translations[lang] || translations.ar;

  const handlePageClick = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <section 
      id="hero" 
      className="relative pt-8 pb-14 overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-emerald-50/25 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background High-Tech Grid & Geometric Glowing Orbs */}
      <div className="absolute inset-0 tech-grid-pattern opacity-60 dark:opacity-20 pointer-events-none" />
      <div className="absolute top-12 right-1/4 w-[500px] h-[500px] bg-sky-200/35 dark:bg-sky-900/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-emerald-200/35 dark:bg-emerald-900/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Hero Typography & Call-To-Actions */}
        <div className="text-center max-w-5xl mx-auto mb-10 pt-2">
          {/* High-Tech Satellite & Aerial Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 dark:from-emerald-500/20 dark:via-teal-500/20 dark:to-sky-500/20 border border-emerald-500/30 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.heroBadgeText}</span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="text-sky-700 dark:text-sky-300 font-mono">{t.heroYear}</span>
          </div>

          {/* Main Headline - Big & Thematically Colored */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.18] sm:leading-[1.14]">
            <span className="text-slate-900 dark:text-white block mb-2 sm:mb-3">
              {t.heroHeadlineMain}
            </span>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 bg-clip-text text-transparent block">
              {t.heroHeadlineHighlight}
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mt-4 leading-relaxed font-medium">
            {t.heroDescription}
          </p>
        </div>

        {/* Dedicated Pages Grid - Placed where the yellow buttons were */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-sm mb-8">
          <PagesDirectoryGrid
            currentPageId="home"
            onNavigate={(id) => handlePageClick(id)}
            isCompact={true}
          />
        </div>

        {/* Live Telemetry Ticker Cards Bar (Our Projects) - Placed below the blue pages grid */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {lang === 'ar' ? 'مشروعاتنا' : 'Our Projects'}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{lang === 'ar' ? 'المشاريع المرصودة فضائياً' : 'Satellite Monitored Projects'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                24 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'مشروعاً استراتيجياً' : 'Mega Projects'}</span>
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                {t.statProjectsDesc}
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{lang === 'ar' ? 'المعدات والآليات المتصلة' : 'Connected Equipment'}</span>
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                1,645 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'معدة نشطة' : 'Active Units'}</span>
              </div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400 font-bold mt-1">
                {t.statFleetDesc}
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{lang === 'ar' ? 'الأراضي التي تم دراستها' : 'Studied Land Plots'}</span>
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                4,320 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'قطعة أرض' : 'Plots'}</span>
              </div>
              <div className="text-[11px] text-teal-600 dark:text-teal-400 font-bold mt-1">
                {t.statPlotsDesc}
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{lang === 'ar' ? 'امتثال كود البناء SBC' : 'SBC Code Compliance'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                94.8% <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'نسبة الامتثال' : 'Compliance'}</span>
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
