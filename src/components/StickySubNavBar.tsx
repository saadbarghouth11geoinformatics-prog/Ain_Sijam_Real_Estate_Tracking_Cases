import React, { useRef, useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Layers, 
  CheckCircle2, 
  X, 
  ArrowRight,
  ArrowLeft,
  Compass
} from 'lucide-react';
import { Language } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { PAGES_DATA, PageInfo } from '../data/pagesData';

interface StickySubNavBarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  lang?: Language;
  viewMode?: 'pages' | 'continuous';
  onToggleViewMode?: () => void;
}

export const StickySubNavBar: React.FC<StickySubNavBarProps> = ({
  activeSection,
  onNavigate,
  viewMode = 'pages',
  onToggleViewMode,
}) => {
  const { t, isAr } = useLanguage();
  const [isGridDrawerOpen, setIsGridDrawerOpen] = useState<boolean>(false);

  // Normalize activeSection
  const normalizedActiveId = activeSection === 'hero' ? 'home' : activeSection;
  
  // Find current index and page
  const currentIndex = PAGES_DATA.findIndex(p => p.id === normalizedActiveId);
  const activePage = currentIndex >= 0 ? PAGES_DATA[currentIndex] : PAGES_DATA[0];
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  // Previous and Next pages
  const prevPage = safeIndex > 0 ? PAGES_DATA[safeIndex - 1] : PAGES_DATA[PAGES_DATA.length - 1];
  const nextPage = safeIndex < PAGES_DATA.length - 1 ? PAGES_DATA[safeIndex + 1] : PAGES_DATA[0];

  const handleSelectPage = (id: string) => {
    setIsGridDrawerOpen(false);
    onNavigate(id);
  };

  return (
    <div 
      className="sticky top-16 z-30 w-full bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-blue-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 transition-colors"
      dir={isAr ? 'rtl' : 'ltr'}
      id="paseetah-sub-bar"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3">
        
        {/* Left: Current Page Label & Quick Directory Opener */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => setIsGridDrawerOpen(!isGridDrawerOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 hover:border-blue-400 text-blue-900 dark:text-blue-300 font-bold shadow-2xs hover:bg-blue-50/50 transition-all cursor-pointer shrink-0"
            title={t('عرض دليل جميع الصفحات (10 أقسام)', 'Show All Pages Directory')}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline text-[11px]">{t('دليل الأقسام', 'Sections')}</span>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1 rounded font-mono">
              {safeIndex + 1}/{PAGES_DATA.length}
            </span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>

          {/* Current Page Title */}
          <div className="flex items-center gap-1.5 truncate text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            <span className="text-slate-400 hidden md:inline">{t('القسم الحالي:', 'Current:')}</span>
            <span className="font-bold text-blue-600 dark:text-blue-400 truncate">
              {isAr ? activePage.labelAr : activePage.labelEn}
            </span>
          </div>
        </div>

        {/* Right: Quick Next/Previous Stepper & View Mode Switcher */}
        <div className="flex items-center gap-1.5 shrink-0">
          
          {/* Previous Page Stepper */}
          <button
            onClick={() => handleSelectPage(prevPage.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 hover:border-blue-300 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all cursor-pointer shadow-2xs text-[11px]"
            title={`${t('السابق:', 'Previous:')} ${isAr ? prevPage.labelAr : prevPage.labelEn}`}
          >
            {isAr ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{t('السابق', 'Prev')}</span>
          </button>

          {/* Next Page Stepper */}
          <button
            onClick={() => handleSelectPage(nextPage.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all cursor-pointer shadow-2xs text-[11px]"
            title={`${t('التالي:', 'Next:')} ${isAr ? nextPage.labelAr : nextPage.labelEn}`}
          >
            <span className="hidden md:inline">{t('التالي', 'Next')}</span>
            {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {/* View Mode Toggle (Pages vs Continuous Flow) */}
          {onToggleViewMode && (
            <button
              onClick={onToggleViewMode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 hover:border-blue-300 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all cursor-pointer shadow-2xs text-[11px]"
              title={viewMode === 'pages' ? t('التحويل لعرض صفحة واحدة متصلة', 'Switch to Continuous View') : t('التحويل لعرض صفحات مستقلة', 'Switch to Dedicated Pages')}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">
                {viewMode === 'pages' ? t('صفحات مستقلة', 'Pages Mode') : t('تقرير متصل', 'Continuous')}
              </span>
            </button>
          )}

        </div>

      </div>

      {/* Quick Jump Drawer for All Pages */}
      {isGridDrawerOpen && (
        <div className="bg-white/98 dark:bg-slate-900/98 border-t border-blue-100 dark:border-slate-800 shadow-xl p-4 sm:p-5 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-blue-50 dark:border-slate-800">
              <span className="font-bold text-xs text-blue-950 dark:text-white">
                {t('الانتقال السريع لأي قسم من أقسام المنصة:', 'Quick jump to any platform section:')}
              </span>
              <button
                onClick={() => setIsGridDrawerOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {PAGES_DATA.map((p, idx) => {
                const Icon = p.icon;
                const isActive = normalizedActiveId === p.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPage(p.id)}
                    className={`p-2.5 rounded-xl border text-start flex items-center gap-2 transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800/80 hover:bg-blue-50/50 border-blue-100 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-slate-700 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                        {isAr ? p.labelAr : p.labelEn}
                      </div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {isAr ? p.shortLabelAr : p.shortLabelEn}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
