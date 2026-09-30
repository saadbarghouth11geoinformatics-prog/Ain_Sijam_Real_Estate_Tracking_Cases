import React from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroTitleBannerProps {
  lang?: Language;
}

export const HeroTitleBanner: React.FC<HeroTitleBannerProps> = ({
  lang: propLang,
}) => {
  const context = useLanguage();
  const lang = propLang || context.lang || 'ar';
  const t = translations[lang] || translations.ar;
  const isAr = lang === 'ar';

  return (
    <section 
      id="hero-title-banner"
      className="relative pt-6 sm:pt-10 pb-4 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* High-Tech Glowing Orbs & Tech Grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-sky-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* 1. Main Brand Headline: عين سيجام (Animated Gradient & Glowing Eyes Visual) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/20 border border-emerald-500/30 shadow-md shadow-emerald-500/10 animate-subtle-float">
            <Eye className="w-7 h-7 sm:w-11 sm:h-11 text-emerald-500 dark:text-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight font-['Cairo'] leading-none">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-400 to-sky-500 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 bg-clip-text text-transparent animate-gradient-shift drop-shadow-xs">
              {t.heroTitleName || (isAr ? 'عين سيجام' : 'SIGAM Eye')}
            </span>
          </h1>

          <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-teal-500/15 to-sky-500/20 border border-sky-500/30 shadow-md shadow-sky-500/10 animate-subtle-float">
            <Sparkles className="w-7 h-7 sm:w-11 sm:h-11 text-sky-500 dark:text-sky-400 animate-pulse" />
          </div>
        </div>

        {/* 2. Subtitle: راقب أراضيك ومواقع البناء بدقة (Colorful, NOT black, with smooth motion) */}
        <div className="animate-subtle-float">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['Cairo'] mt-1 sm:mt-2">
            <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-500 dark:from-teal-300 dark:via-emerald-300 dark:to-cyan-300 bg-clip-text text-transparent animate-gradient-shift">
              {t.heroHeadlineMain}
            </span>
          </h2>
        </div>

      </div>
    </section>
  );
};
