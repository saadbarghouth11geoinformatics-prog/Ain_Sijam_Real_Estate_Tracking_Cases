import React from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  ArrowRight, 
  ArrowLeft, 
  Grid, 
  Layers, 
  MapPin, 
  Sparkles,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { PageInfo, PAGES_DATA } from '../data/pagesData';
import { useLanguage } from '../i18n/LanguageContext';
import { City } from '../types';
import { RegionFilterDropdown } from './RegionFilterDropdown';

interface PageHeaderBannerProps {
  currentPage: PageInfo;
  onNavigate: (pageId: string) => void;
  selectedCity?: City | 'الكل';
  onSelectCity?: (city: City | 'الكل') => void;
  viewMode?: 'pages' | 'continuous';
  onToggleViewMode?: () => void;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({
  currentPage,
  onNavigate,
  selectedCity = 'الرياض',
  onSelectCity,
  viewMode = 'pages',
  onToggleViewMode,
}) => {
  const { t, isAr } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const currentIndex = PAGES_DATA.findIndex(p => p.id === currentPage.id);
  const prevPage = currentIndex > 0 ? PAGES_DATA[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGES_DATA.length - 1 ? PAGES_DATA[currentIndex + 1] : null;

  const Icon = currentPage.icon;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const heroImageSrc = currentPage.heroImage || '/images/drive-banners/drive_banner_01.png';

  return (
    <div 
      className="w-full relative overflow-hidden text-white border-b border-blue-900/60 py-7 px-4 sm:px-6 transition-all"
      dir={isAr ? 'rtl' : 'ltr'}
      id="page-header-banner"
    >
      {/* Real High-Resolution Architectural & Land Planning Background Image - Crystal Clear */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={heroImageSrc}
          alt={isAr ? currentPage.titleAr : currentPage.titleEn}
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-700"
          style={{ objectPosition: 'center 35%' }}
        />
        {/* Subtle Dark Gradient Overlay: Keeps the architectural image clear while providing high contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-4">
        
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-1.5 text-slate-400 font-medium" aria-label="Breadcrumb">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors group cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>{t('الرئيسية', 'Home')}</span>
            </button>

            {isAr ? (
              <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            )}

            <span className="text-blue-400 font-mono font-bold bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-800/80">
              {isAr ? currentPage.categoryAr : currentPage.categoryEn}
            </span>

            {isAr ? (
              <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            )}

            <span className="text-white font-bold">
              {isAr ? currentPage.labelAr : currentPage.labelEn}
            </span>
          </nav>

          {/* Right Header Controls: Region Filter, Page Index, Next/Prev, Share & Mode */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Filter by Region Name ("اسم المنطقة") */}
            {onSelectCity && (
              <div className="hidden sm:block">
                <RegionFilterDropdown
                  selectedCity={selectedCity}
                  onSelectCity={onSelectCity}
                />
              </div>
            )}

            {/* Page Index Badge */}
            <div className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300 text-[11px] font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              <span>
                {t(`صفحة ${currentPage.order} من ${PAGES_DATA.length}`, `Page ${currentPage.order} of ${PAGES_DATA.length}`)}
              </span>
            </div>

            {/* Prev Page Button */}
            {prevPage && (
              <button
                onClick={() => onNavigate(prevPage.id)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                title={isAr ? `الانتقال إلى: ${prevPage.labelAr}` : `Go to: ${prevPage.labelEn}`}
              >
                {isAr ? <ChevronRight className="w-3.5 h-3.5 text-sky-400" /> : <ChevronLeft className="w-3.5 h-3.5 text-sky-400" />}
                <span className="hidden sm:inline">{isAr ? prevPage.shortLabelAr : prevPage.shortLabelEn}</span>
              </button>
            )}

            {/* Next Page Button */}
            {nextPage && (
              <button
                onClick={() => onNavigate(nextPage.id)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                title={isAr ? `الانتقال إلى: ${nextPage.labelAr}` : `Go to: ${nextPage.labelEn}`}
              >
                <span className="hidden sm:inline">{isAr ? nextPage.shortLabelAr : nextPage.shortLabelEn}</span>
                {isAr ? <ChevronLeft className="w-3.5 h-3.5 text-blue-400" /> : <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
              </button>
            )}

            {/* Share / Copy Link Button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title={t('نسخ رابط الصفحة المباشر', 'Copy Direct Page Link')}
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {/* Continuous View Toggle if handler provided */}
            {onToggleViewMode && (
              <button
                onClick={onToggleViewMode}
                className="px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-700 text-blue-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                title={t('عرض كافة الأقسام في تقرير متصل', 'View all sections in one continuous report')}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">
                  {viewMode === 'pages' 
                    ? t('عرض التقرير المتصل', 'Continuous View') 
                    : t('عرض الصفحة المستقلة', 'Dedicated Page')}
                </span>
              </button>
            )}

          </div>

        </div>

        {/* Main Banner Heading */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
          <div className="space-y-1.5 max-w-4xl">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 shrink-0">
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white font-['Cairo'] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {isAr ? currentPage.titleAr : currentPage.titleEn}
              </h1>
              {currentPage.badgeAr && (
                <span className="bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {isAr ? currentPage.badgeAr : currentPage.badgeEn}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] font-medium">
              {isAr ? currentPage.descriptionAr : currentPage.descriptionEn}
            </p>

            <div className="text-[11px] font-mono text-sky-300 flex items-center gap-2 pt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              <span className="text-slate-300">{isAr ? 'بيانات الرصد:' : 'DATA FEED:'}</span>
              <span>{isAr ? currentPage.subtitleAr : currentPage.subtitleEn}</span>
            </div>
          </div>

          {/* Quick Return to Home Button */}
          <button
            onClick={() => onNavigate('home')}
            className="shrink-0 px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {isAr ? <ArrowRight className="w-4 h-4 text-blue-400" /> : <ArrowLeft className="w-4 h-4 text-blue-400" />}
            <span>{t('العودة للوحة الرئيسية', 'Back to Main Dashboard')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
