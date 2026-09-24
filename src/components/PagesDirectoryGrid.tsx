import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Compass,
  Briefcase,
  ChevronDown,
  Info,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Satellite,
  BarChart3,
  HardHat,
  Zap,
  Crown,
  PhoneCall,
  MapPin,
  TrendingUp,
  Scale
} from 'lucide-react';
import { PAGES_DATA, PageInfo } from '../data/pagesData';
import { useLanguage } from '../i18n/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedCounter } from './AnimatedCounter';

interface PagesDirectoryGridProps {
  currentPageId: string;
  onNavigate: (pageId: string) => void;
  isCompact?: boolean;
  id?: string;
  featuredActionLabel?: string;
  onFeaturedAction?: () => void;
}

export const PagesDirectoryGrid: React.FC<PagesDirectoryGridProps> = ({
  currentPageId,
  onNavigate,
  isCompact = false,
  id = 'indicators',
  featuredActionLabel,
  onFeaturedAction,
}) => {
  const { t, isAr } = useLanguage();
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  const toggleExpand = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDescriptions(prev => ({
      ...prev,
      [pageId]: !prev[pageId]
    }));
  };

  // Helper to retrieve PageInfo by ID safely
  const getPage = (pageId: string): PageInfo | undefined => {
    return PAGES_DATA.find(p => p.id === pageId);
  };

  // 1. Featured Page: سابقة الأعمال ومتابعة الأصول العقارية
  const featuredPage = getPage('case-studies') || PAGES_DATA[1];
  const isFeaturedActive = currentPageId === 'case-studies';

  // 2. Monitoring & Projects (Split Editorial Section)
  const liveMapPage = getPage('live-projects-map');
  const evolutionPage = getPage('evolution');
  const projectsStatsPage = getPage('projects');
  const equipmentFleetPage = getPage('equipment-fleet');

  // 3. Land & Planning (Image-backed tile + compact rows)
  const digitalTwinPage = getPage('digital-twin-360');
  const soilPage = getPage('soil-suitability');
  const infrastructurePage = getPage('infrastructure');
  const advisorPage = getPage('advisor');

  // 4. Market & Investment (Cinematic category banner)
  const mapPage = getPage('map');
  const dealsPage = getPage('deals');
  const portfolioPage = getPage('portfolio');
  const pricingPage = getPage('pricing');

  // 5. Analytics & Decision Tools (Architectural Image Tile + Compact rows)
  const indicatorsPage = getPage('indicators');
  const calculatorPage = getPage('calculator');
  const comparePage = getPage('compare');

  // 6. Platform & Corporate Support (Horizon Strip)
  const homePage = getPage('home');
  const aboutPage = getPage('about');
  const contactPage = getPage('contact');

  return (
    <section 
      id={id} 
      className="w-full scroll-mt-36 sm:scroll-mt-44 pt-8 pb-12 focus:outline-none"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* 1. SECTION HEADING WITH PROPER OFFSET, SPACING & RTL HIERARCHY */}
      <div className="mb-10 text-right">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{t('منظومة الاستكشاف الشاملة لعين سيجام', 'Ain Sijam Unified Exploration System')}</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span className="text-slate-500 dark:text-slate-400">
            {t('18 قسماً تخصصياً مدعومة بالبيانات الجغرافية', '18 Specialized Geospatial Modules')}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-snug font-['Cairo']">
          {t('دليل أقسام المنصة والمراقبة الجوية', 'Platform Modules & Aerial Monitoring Directory')}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed font-['Cairo']">
          {t(
            'تصفح أقسام المنصة المصنفة حسب مهام المراقبة الفضائية، فحص الأراضي، المؤشرات السوقية، والحلول الاستشارية المعتمدة.',
            'Explore modules categorized by satellite surveillance, land suitability audits, market indices, and certified advisory tools.'
          )}
        </p>
      </div>

      <div className="space-y-12">
        
        {/* PATTERN 1: FEATURED SECTION (سابقة الأعمال ومتابعة الأصول العقارية) */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="relative overflow-hidden rounded-3xl border-2 border-blue-500/40 dark:border-blue-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white shadow-2xl">
            
            {/* Visual Header / Background Containment */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Text & Data Column (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 text-right z-10">
                <div className="space-y-4">
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-['Cairo'] text-xs">
                      <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t('القسم الرئيسي المميز', 'Featured Primary Module')}</span>
                    </span>

                    {isFeaturedActive && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-['Cairo'] text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{t('أنت تتصفح هذا القسم حالياً', 'Currently Active Page')}</span>
                      </span>
                    )}

                    <span className="text-slate-400">·</span>
                    <span className="text-slate-300 font-mono text-[11px]">Sentinel-2 & Esri World Imagery</span>
                  </div>

                  {/* Section Title */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight font-['Cairo']">
                      {isAr ? featuredPage.titleAr : featuredPage.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-200/90 mt-1.5 font-semibold leading-relaxed font-['Cairo']">
                      {isAr ? featuredPage.subtitleAr : featuredPage.subtitleEn}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-['Cairo']">
                    {isAr ? featuredPage.descriptionAr : featuredPage.descriptionEn}
                  </p>

                  {/* Project Numbers Strip with Animated Numbers */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 rounded-2xl p-3 text-right group/num">
                      <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold mb-1">
                        <Building2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover/num:scale-110" />
                        <span>{t('المشروعات', 'Projects')}</span>
                      </div>
                      <div className="text-lg font-black text-white flex items-baseline gap-1">
                        <AnimatedCounter value={6} durationMs={600} />
                        <span className="text-xs font-normal text-slate-300">{t('مشروعات كبرى', 'Projects')}</span>
                      </div>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 rounded-2xl p-3 text-right group/num">
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
                        <Calendar className="w-3.5 h-3.5 transition-transform duration-300 group-hover/num:scale-110" />
                        <span>{t('اللقطات الزمنية', 'Time-Lapse')}</span>
                      </div>
                      <div className="text-lg font-black text-white flex items-baseline gap-1">
                        <AnimatedCounter value={30} durationMs={700} />
                        <span className="text-xs font-normal text-slate-300">{t('لقطة فضائية', 'Captures')}</span>
                      </div>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 rounded-2xl p-3 text-right group/num">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                        <Layers className="w-3.5 h-3.5 transition-transform duration-300 group-hover/num:scale-110" />
                        <span>{t('دورة الأصل', 'Lifecycle')}</span>
                      </div>
                      <div className="text-lg font-black text-white flex items-baseline gap-1">
                        <AnimatedCounter value={16} durationMs={800} />
                        <span className="text-xs font-normal text-slate-300">{t('مرحلة متسلسلة', 'Stages')}</span>
                      </div>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 rounded-2xl p-3 text-right group/num">
                      <div className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold mb-1">
                        <Satellite className="w-3.5 h-3.5 transition-transform duration-300 group-hover/num:scale-110" />
                        <span>{t('المصدر الفضائي', 'Sensors')}</span>
                      </div>
                      <div className="text-lg font-black text-white">ESA & Esri</div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      if (onFeaturedAction) {
                        onFeaturedAction();
                      } else {
                        onNavigate('case-studies');
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <span>{featuredActionLabel || t('استكشاف سابقة الأعمال والمشروعات', 'Explore Case Studies')}</span>
                    {isAr ? (
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>

                  {isFeaturedActive && (
                    <span className="text-xs text-blue-300 font-semibold">
                      {t('أنت داخل سابقة الأعمال حالياً', 'You are currently inside Case Studies')}
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Satellite Comparison Image Column (5 cols) */}
              <div className="lg:col-span-5 relative bg-slate-950 p-4 sm:p-6 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-r border-slate-800">
                <div className="w-full relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner group">
                  <img 
                    src="/assets/case-studies/01_kafd_riyadh/comparison_clear_before_latest.jpg"
                    alt="مقارنة الأقمار الصناعية لمركز الملك عبدالله المالي كافد"
                    className="w-full h-56 sm:h-72 lg:h-80 object-contain bg-slate-950 transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-3 text-right">
                    <div className="text-[11px] text-slate-300 font-semibold">
                      {t('توثيق فضائي متزامن: قبل وبعد التطوير (KAFD)', 'Satellite Change Detection: Before & Latest (KAFD)')}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* PATTERN 2: SPLIT EDITORIAL SECTION (المراقبة الفضائية والمشاريع) */}
        <ScrollReveal direction="up" delayMs={75}>
          <div className="space-y-4">
            {/* Category Title */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2.5 text-right">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-['Cairo'] tracking-tight">
                  {t('المراقبة الفضائية والمشاريع الوطنية', 'Satellite Monitoring & National Projects')}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {t('4 خدمات متخصصة', '4 Specialized Services')}
              </span>
            </div>

            {/* Two-Column Balanced Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Visual Side: Large Construction Timeline Image (5 cols) */}
              <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 relative flex flex-col justify-between group shadow-sm">
                <div className="p-4 sm:p-5 z-10 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent text-right">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1">
                    <Satellite className="w-3.5 h-3.5" />
                    <span>{t('رصد وتوثيق مراحل التنفيذ الميداني', 'Field Construction Timeline Audit')}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-white font-['Cairo']">
                    {t('مستودع قطار الرياض الغربي - 3 مراحل متسلسلة', 'Riyadh Metro West Depot - 3 Sequential Stages')}
                  </h4>
                </div>

                <div className="px-4 py-2 flex-1 flex items-center justify-center">
                  <img 
                    src="/assets/case-studies/02_riyadh_metro_west_depot/construction_progress_3_clear_stages.jpg"
                    alt="رصد مراحل البناء والإنشاء بالأقمار الصناعية"
                    className="w-full max-h-64 object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-right text-xs text-slate-300">
                  <span className="text-[11px] text-slate-400">
                    {t('رصد فضائي متزامن بدقة عالية لمراحل التشييد من الحفر إلى اكتمال المرافق.', 'High-res monitoring from excavation to facility commissioning.')}
                  </span>
                </div>
              </div>

              {/* Text & Service Links Side (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-3 text-right">
                
                {/* Lead Service: خريطة المشاريع الكبرى (Highlighted card) */}
                {liveMapPage && (() => {
                  const isCurrent = currentPageId === liveMapPage.id;
                  const isExpanded = !!expandedDescriptions[liveMapPage.id];
                  return (
                    <div 
                      onClick={() => onNavigate(liveMapPage.id)}
                      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                          : 'bg-white dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Compass className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-slate-900 dark:text-white font-['Cairo']">
                                {isAr ? liveMapPage.titleAr : liveMapPage.titleEn}
                              </h4>
                              {isCurrent && (
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                                  {t('الحالي', 'Active')}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1 font-['Cairo']">
                              {isAr ? liveMapPage.subtitleAr : liveMapPage.subtitleEn}
                            </p>
                          </div>
                        </div>

                        <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </div>
                      </div>

                      {/* Progressive Disclosure */}
                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                        <p className={isExpanded ? '' : 'line-clamp-2'}>
                          {isAr ? liveMapPage.descriptionAr : liveMapPage.descriptionEn}
                        </p>
                        <button
                          onClick={(e) => toggleExpand(liveMapPage.id, e)}
                          className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? t('إخفاء التفاصيل', 'Less') : t('المزيد من التفاصيل', 'Details')}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Secondary Compact Service Rows */}
                {[evolutionPage, projectsStatsPage, equipmentFleetPage].filter(Boolean).map((page) => {
                  if (!page) return null;
                  const PageIcon = page.icon;
                  const isCurrent = currentPageId === page.id;
                  const isExpanded = !!expandedDescriptions[page.id];

                  return (
                    <div
                      key={page.id}
                      onClick={() => onNavigate(page.id)}
                      className={`group p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                          : 'bg-white dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors'
                          }`}>
                            <PageIcon className="w-4 h-4" />
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate font-['Cairo']">
                              {isAr ? page.labelAr : page.labelEn}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-['Cairo']">
                              {isAr ? page.subtitleAr : page.subtitleEn}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            onClick={(e) => toggleExpand(page.id, e)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title={isExpanded ? t('إخفاء', 'Collapse') : t('عرض', 'Expand')}
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} />
                          </button>
                          <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors text-slate-400">
                            {isAr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded text */}
                      {isExpanded && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-['Cairo'] animate-in fade-in duration-200">
                          <p>{isAr ? page.descriptionAr : page.descriptionEn}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* PATTERN 3: IMAGE-BACKED NAVIGATION TILE (الأراضي والتخطيط الهندسي) */}
        <ScrollReveal direction="up" delayMs={100}>
          <div className="space-y-4">
            {/* Category Title */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2.5 text-right">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-['Cairo'] tracking-tight">
                  {t('الأراضي والتخطيط وفحص التربة', 'Land Suitability, Zoning & Geotechnical')}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {t('4 خدمات متكاملة', '4 Integrated Services')}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Image-Backed Navigation Tile: digital-twin-360 (5 cols) */}
              {digitalTwinPage && (() => {
                const isCurrent = currentPageId === digitalTwinPage.id;
                const isExpanded = !!expandedDescriptions[digitalTwinPage.id];
                return (
                  <div
                    onClick={() => onNavigate(digitalTwinPage.id)}
                    className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-slate-700/80 shadow-lg min-h-[300px] flex flex-col justify-between p-6 sm:p-7 text-right cursor-pointer group"
                  >
                    {/* Background Urban District Photography */}
                    <img 
                      src="/images_webp/07-kafd-urban-district.webp"
                      alt="مقارنة المخطط التنظيمي بالأقمار الصناعية"
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Restrained Navy Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/30" />

                    {/* Top Content */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/25 text-sky-200 border border-sky-400/30 font-bold">
                          <Layers className="w-3.5 h-3.5" />
                          <span>CAD vs Reality</span>
                        </span>
                        {isCurrent && (
                          <span className="text-[11px] font-bold text-white bg-blue-600 px-2.5 py-0.5 rounded-full shadow-xs">
                            {t('الصفحة الحالية', 'Current')}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] tracking-tight">
                        {isAr ? digitalTwinPage.titleAr : digitalTwinPage.titleEn}
                      </h4>
                      <p className="text-xs sm:text-sm text-sky-200 font-semibold leading-relaxed font-['Cairo']">
                        {isAr ? digitalTwinPage.subtitleAr : digitalTwinPage.subtitleEn}
                      </p>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-white">
                      <span>{t('دخول فحص ومقارنة المخطط التنظيمي', 'Open CAD vs Reality Inspector')}</span>
                      <div className="w-8 h-8 rounded-xl bg-white/20 group-hover:bg-blue-600 group-hover:scale-105 flex items-center justify-center transition-all text-white">
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Compact Rows for Soil, Infrastructure & Advisor (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-3 text-right">
                {[soilPage, infrastructurePage, advisorPage].filter(Boolean).map((page) => {
                  if (!page) return null;
                  const PageIcon = page.icon;
                  const isCurrent = currentPageId === page.id;
                  const isExpanded = !!expandedDescriptions[page.id];

                  return (
                    <div
                      key={page.id}
                      onClick={() => onNavigate(page.id)}
                      className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500 shadow-xs ring-1 ring-emerald-500/20'
                          : 'bg-white dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors'
                          }`}>
                            <PageIcon className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate font-['Cairo']">
                              {isAr ? page.labelAr : page.labelEn}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-['Cairo']">
                              {isAr ? page.subtitleAr : page.subtitleEn}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            onClick={(e) => toggleExpand(page.id, e)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title={isExpanded ? t('إخفاء', 'Collapse') : t('عرض', 'Expand')}
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
                          </button>
                          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors text-slate-400">
                            {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>

                      {/* Progressive Disclosure */}
                      {isExpanded && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-['Cairo'] animate-in fade-in duration-200">
                          <p>{isAr ? page.descriptionAr : page.descriptionEn}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* PATTERN 4: CINEMATIC CATEGORY BANNER (السوق والاستثمار العقاري والصفقات) */}
        <ScrollReveal direction="up" delayMs={125}>
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 shadow-xl bg-slate-950 text-white">
            {/* Wide Panoramic Riyadh Skyline Background */}
            <img 
              src="/images_webp/03-riyadh-skyline-wide.webp"
              alt="بانوراما أفق مدينة الرياض والاستثمار العقاري"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-30 filter blur-[0.3px] scale-102"
              loading="lazy"
            />
            {/* Restrained Navy Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/75" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-6 text-right">
              {/* Banner Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{t('منظومة السوق والصفقات الرسمية والمحفظة', 'Real Estate Market & Official Deeds Ecosystem')}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] tracking-tight">
                    {t('السوق والاستثمار العقاري والصفقات المعتمدة', 'Real Estate Market, Official Deals & Enterprise Plans')}
                  </h3>
                </div>
                <div className="text-xs text-slate-300 max-w-md">
                  {t(
                    'تصفح الصفقات الحية، إدارة الأصول السكنية والتجارية، والاشتراك في باقات التراخيص المهنية المعتمدة.',
                    'Browse live market transactions, manage portfolios, and subscribe to official enterprise licenses.'
                  )}
                </div>
              </div>

              {/* 4 Related Navigation Actions / Tiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Map Page */}
                {mapPage && (
                  <div
                    onClick={() => onNavigate(mapPage.id)}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-blue-400 backdrop-blur-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                          <Compass className="w-5 h-5" />
                        </div>
                        {currentPageId === mapPage.id && (
                          <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">
                            {t('الحالي', 'Active')}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white font-['Cairo'] group-hover:text-blue-300 transition-colors">
                        {isAr ? mapPage.labelAr : mapPage.labelEn}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 font-['Cairo'] line-clamp-2">
                        {isAr ? mapPage.subtitleAr : mapPage.subtitleEn}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-300 font-bold">
                      <span>{t('تصفح الخريطة', 'Open Map')}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                )}

                {/* 2. Deals Page */}
                {dealsPage && (
                  <div
                    onClick={() => onNavigate(dealsPage.id)}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-emerald-400 backdrop-blur-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                          <Layers className="w-5 h-5" />
                        </div>
                        {currentPageId === dealsPage.id && (
                          <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">
                            {t('الحالي', 'Active')}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white font-['Cairo'] group-hover:text-emerald-300 transition-colors">
                        {isAr ? dealsPage.labelAr : dealsPage.labelEn}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 font-['Cairo'] line-clamp-2">
                        {isAr ? dealsPage.subtitleAr : dealsPage.subtitleEn}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300 font-bold">
                      <span>{t('سجل الصفقات', 'Deals Ledger')}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                )}

                {/* 3. Portfolio Page */}
                {portfolioPage && (
                  <div
                    onClick={() => onNavigate(portfolioPage.id)}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-sky-400 backdrop-blur-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
                          <Crown className="w-5 h-5" />
                        </div>
                        {currentPageId === portfolioPage.id && (
                          <span className="text-[10px] bg-sky-500 text-white px-2 py-0.5 rounded-full font-bold">
                            {t('الحالي', 'Active')}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white font-['Cairo'] group-hover:text-sky-300 transition-colors">
                        {isAr ? portfolioPage.labelAr : portfolioPage.labelEn}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 font-['Cairo'] line-clamp-2">
                        {isAr ? portfolioPage.subtitleAr : portfolioPage.subtitleEn}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-sky-300 font-bold">
                      <span>{t('إدارة المحفظة', 'Portfolio')}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                )}

                {/* 4. Pricing / Plans Page (Highlighted in Gold) */}
                {pricingPage && (
                  <div
                    onClick={() => onNavigate(pricingPage.id)}
                    className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/25 via-amber-600/20 to-orange-500/20 hover:from-amber-500/35 hover:to-orange-500/30 border-2 border-amber-400/60 shadow-lg shadow-amber-500/10 backdrop-blur-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 px-2 py-0.5 rounded-full">
                          {t('تراخيص معتمدة', 'Official')}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-amber-200 font-['Cairo'] group-hover:text-white transition-colors">
                        {isAr ? pricingPage.labelAr : pricingPage.labelEn}
                      </h4>
                      <p className="text-[11px] text-amber-100/80 mt-1 font-['Cairo'] line-clamp-2">
                        {isAr ? pricingPage.subtitleAr : pricingPage.subtitleEn}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-amber-400/30 flex items-center justify-between text-[11px] text-amber-300 font-extrabold">
                      <span>{t('عرض الباقات والأسعار', 'View Plans')}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* PATTERN 5: ARCHITECTURAL IMAGE TILE + COMPACT TOOLS (أدوات التحليل والتقييم) */}
        <ScrollReveal direction="up" delayMs={150}>
          <div className="space-y-4">
            {/* Category Title */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2.5 text-right">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-['Cairo'] tracking-tight">
                  {t('أدوات التحليل والتقييم العقاري المتقدم', 'Real Estate Analytics & Evaluation Tools')}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {t('3 أدوات تفاعلية', '3 Interactive Tools')}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Image-Backed Navigation Tile: Price Indicators (5 cols) with KAFD Towers */}
              {indicatorsPage && (() => {
                const isCurrent = currentPageId === indicatorsPage.id;
                return (
                  <div
                    onClick={() => onNavigate(indicatorsPage.id)}
                    className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-slate-700/80 shadow-lg min-h-[260px] flex flex-col justify-between p-6 sm:p-7 text-right cursor-pointer group"
                  >
                    {/* Background KAFD Architecture Photography */}
                    <img 
                      src="/images_webp/06-kafd-towers.webp"
                      alt="مؤشرات الأسعار والرسوم البيانية لكافد والرياض"
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Restrained Navy Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/35" />

                    {/* Top Content */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/25 text-blue-200 border border-blue-400/30 font-bold">
                          <BarChart3 className="w-3.5 h-3.5" />
                          <span>{t('مؤشرات الأسعار اللحظية', 'Live Price Index')}</span>
                        </span>
                        {isCurrent && (
                          <span className="text-[11px] font-bold text-white bg-blue-600 px-2.5 py-0.5 rounded-full shadow-xs">
                            {t('الصفحة الحالية', 'Current')}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] tracking-tight">
                        {isAr ? indicatorsPage.titleAr : indicatorsPage.titleEn}
                      </h4>
                      <p className="text-xs sm:text-sm text-blue-200 font-semibold leading-relaxed font-['Cairo']">
                        {isAr ? indicatorsPage.subtitleAr : indicatorsPage.subtitleEn}
                      </p>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-white">
                      <span>{t('فتح لوحة المؤشرات الرسمية', 'Open Official Index Dashboard')}</span>
                      <div className="w-8 h-8 rounded-xl bg-white/20 group-hover:bg-blue-600 group-hover:scale-105 flex items-center justify-center transition-all text-white">
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Compact Rows for Calculator & District Comparator (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-4 text-right">
                {[calculatorPage, comparePage].filter(Boolean).map((page) => {
                  if (!page) return null;
                  const PageIcon = page.icon;
                  const isCurrent = currentPageId === page.id;
                  const isExpanded = !!expandedDescriptions[page.id];

                  return (
                    <div
                      key={page.id}
                      onClick={() => onNavigate(page.id)}
                      className={`group p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-500 shadow-xs ring-1 ring-indigo-500/20'
                          : 'bg-white dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors'
                          }`}>
                            <PageIcon className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate font-['Cairo']">
                              {isAr ? page.labelAr : page.labelEn}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-['Cairo']">
                              {isAr ? page.subtitleAr : page.subtitleEn}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            onClick={(e) => toggleExpand(page.id, e)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title={isExpanded ? t('إخفاء', 'Collapse') : t('عرض', 'Expand')}
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180 text-indigo-600' : ''}`} />
                          </button>
                          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors text-slate-400">
                            {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>

                      {/* Progressive Disclosure */}
                      {isExpanded && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-['Cairo'] animate-in fade-in duration-200">
                          <p>{isAr ? page.descriptionAr : page.descriptionEn}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* PATTERN 6: EDITORIAL HORIZON STRIP (المنصة والدعم المؤسسي) */}
        <ScrollReveal direction="up" delayMs={175}>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-xs">
            {/* Subtle North Skyline Header Strip */}
            <div className="relative h-28 overflow-hidden bg-slate-900">
              <img 
                src="/images_webp/01-riyadh-skyline-north.webp"
                alt="أفق شمال العاصمة الرياض"
                className="w-full h-full object-cover object-center opacity-40 filter blur-[0.3px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 right-6 left-6 flex items-center justify-between text-xs text-slate-900 dark:text-white font-black font-['Cairo']">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{t('المنظومة المؤسسية وخدمة العملاء', 'Corporate Platform & Enterprise Advisory')}</span>
                </span>
                <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                  {t('المقر الرئيسي: الرياض · المملكة العربية السعودية', 'Headquarters: Riyadh · Saudi Arabia')}
                </span>
              </div>
            </div>

            {/* 3 Clean Compact Service Columns */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
              {[homePage, aboutPage, contactPage].filter(Boolean).map((page) => {
                if (!page) return null;
                const PageIcon = page.icon;
                const isCurrent = currentPageId === page.id;

                return (
                  <div
                    key={page.id}
                    onClick={() => onNavigate(page.id)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-700 text-blue-600 shadow-2xs'
                      }`}>
                        <PageIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate font-['Cairo']">
                          {isAr ? page.labelAr : page.labelEn}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-['Cairo']">
                          {isAr ? page.subtitleAr : page.subtitleEn}
                        </p>
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 text-slate-400 flex items-center justify-center shrink-0">
                      {isAr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
