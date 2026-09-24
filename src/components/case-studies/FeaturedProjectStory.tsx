import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Layers, 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  Satellite, 
  CheckCircle2, 
  Clock,
  Compass,
  Maximize2
} from 'lucide-react';
import { CaseStudyProject } from '../../data/caseStudiesData';
import { ImageViewerWithZoom } from './ImageViewerWithZoom';
import { ProjectTimelineStory } from './ProjectTimelineStory';
import { AnimatedCounter } from '../AnimatedCounter';
import { useLanguage } from '../../i18n/LanguageContext';

interface FeaturedProjectStoryProps {
  project: CaseStudyProject;
  onSelectProject: (project: CaseStudyProject) => void;
}

export const FeaturedProjectStory: React.FC<FeaturedProjectStoryProps> = ({
  project,
  onSelectProject,
}) => {
  const { t, isAr } = useLanguage();
  const [activeView, setActiveView] = useState<'comparison' | 'timeline' | 'construction'>('comparison');

  return (
    <article className="relative overflow-hidden rounded-3xl border-2 border-blue-500/50 dark:border-blue-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl transition-all duration-300 hover:border-blue-500/70" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Top Banner Strip */}
      <div className="p-6 sm:p-8 border-b border-slate-800/90 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Project Header Info */}
        <div className="space-y-3 max-w-3xl text-right">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('دراسة الحالة المميزة للمشروعات الكبرى', 'Featured Mega Project Case Study')}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{project.statusAr}</span>
            </span>

            <span className="text-slate-500">·</span>
            <div className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{project.trackingPeriod}</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight font-['Cairo']">
            {project.nameAr}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{project.locationAr}</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 text-amber-300 font-mono" dir="ltr">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{project.timeRange}</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 text-sky-300">
              <Satellite className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Sentinel-2 & Esri High-Resolution</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-['Cairo'] pt-1">
            {project.descriptionAr}
          </p>
        </div>

        {/* Action Button: عرض رحلة المشروع */}
        <div className="shrink-0 flex flex-col gap-2 justify-center">
          <button
            onClick={() => onSelectProject(project)}
            className="px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          >
            <span>{t('عرض رحلة المشروع وتفاصيل الـ 16 مرحلة', 'Explore Complete 16-Stage Journey')}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            )}
          </button>
          <span className="text-[11px] text-center text-slate-400 font-['Cairo']">
            {t('توثيق شامل بالمخططات والمستندات الرسمية', 'Comprehensive documentation with official charts')}
          </span>
        </div>

      </div>

      {/* Key Tracking Indicators Strip with Animated Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-slate-950/70 border-b border-slate-800/90 text-right">
        <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 rounded-2xl p-3 sm:p-4 group">
          <div className="text-xs font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
            <span>{t('الأبراج الشاهقة', 'Towers & High-Rises')}</span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-white flex items-baseline gap-1.5">
            <AnimatedCounter value={69} durationMs={700} />
            <span className="text-xs font-normal text-slate-300">{t('برجاً مكتبياً وسكنياً', 'Towers')}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{t('ناطحات سحاب ذكية متصلة', 'Smart connected skyscrapers')}</div>
        </div>

        <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 rounded-2xl p-3 sm:p-4 group">
          <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
            <span>{t('المساحة التأجيرية', 'Leasable Area')}</span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-white flex items-baseline gap-1.5">
            <AnimatedCounter value={1.6} decimals={1} durationMs={800} />
            <span className="text-xs font-normal text-slate-300">{t('مليون م²', 'M sq.m')}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{t('مسطحات تجارية ومالية', 'Financial & commercial')}</div>
        </div>

        <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 rounded-2xl p-3 sm:p-4 group">
          <div className="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
            <span>{t('نسبة اكتمال الهيكل', 'Structural Completion')}</span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-white flex items-baseline gap-1">
            <AnimatedCounter value={100} durationMs={900} suffix="%" />
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{t('تشغيل تجاري وسكني واسع', 'Commercial operations')}</div>
        </div>

        <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 rounded-2xl p-3 sm:p-4 group">
          <div className="text-xs font-semibold text-sky-400 mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
            <span>{t('شبكة النقل والمترو', 'Metro & Transit')}</span>
          </div>
          <div className="text-base sm:text-lg font-black text-white mt-0.5">{t('محطة زها حديد', 'Zaha Hadid Hub')}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{t('ربط محوري مع قطار الرياض', 'Direct Metro linkage')}</div>
        </div>
      </div>

      {/* Visual Modes Navigation Switcher */}
      <div className="p-4 sm:p-6 bg-slate-900/50">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">{t('طريقة العرض البصري:', 'Visual View Mode:')}</span>
            <div className="inline-flex p-1 rounded-2xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setActiveView('comparison')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
                  activeView === 'comparison'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {t('المقارنة الفضائية قبل وبعد', 'Before & Latest Comparison')}
              </button>

              <button
                onClick={() => setActiveView('timeline')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
                  activeView === 'timeline'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {t('الخط الزمني (5 مراحل متسلسلة)', '5-Stage Timeline')}
              </button>

              <button
                onClick={() => setActiveView('construction')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
                  activeView === 'construction'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {t('التطور الإنشائي (3 مراحل)', 'Construction Progress (3 Stages)')}
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('دقة استشعار متزامنة من برنامج كوبرنيكوس', 'Synchronized Copernicus Remote Sensing')}</span>
          </div>
        </div>

        {/* View 1: Wide Before-and-After Satellite Comparison */}
        {activeView === 'comparison' && (
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#0a1128] p-3 sm:p-4 group/zoom animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{t('قبل التطوير (خط الأساس 2016-03)', 'Before Development (Baseline 2016-03)')}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{t('الوضع المحدث الحالي (2024-05)', 'Latest Current Status (2024-05)')}</span>
              </span>
            </div>

            <div className="relative w-full aspect-16/9 sm:aspect-21/9 bg-[#0a1128] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover/zoom:scale-[1.02]">
                <ImageViewerWithZoom
                  src={project.comparisonBeforeLatestPath}
                  fallbackSrc={project.timelineHighResOverviewPath}
                  alt="مقارنة فضائية قبل وبعد لمركز الملك عبدالله المالي كافد"
                  badgeLabel="رصد الأقمار الصناعية (Sentinel-2)"
                  aspectRatioClass="aspect-16/9 sm:aspect-21/9"
                  objectFit="contain"
                  className="w-full h-full border-0 bg-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* View 2: Interactive 5-Stage Timeline */}
        {activeView === 'timeline' && (
          <div className="animate-fadeIn">
            <ProjectTimelineStory
              stages={project.timeline5Stages}
              projectName={project.nameAr}
            />
          </div>
        )}

        {/* View 3: 3-Stage Construction Progress */}
        {activeView === 'construction' && (
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#0a1128] p-3 sm:p-4 group/zoom animate-fadeIn">
            <div className="text-xs text-slate-300 font-semibold mb-2 px-1 text-right">
              <span>{t('مراحل التشييد الإنشائي المتسلسل: الحفر والتأسيس → تصاعد الهياكل → اكتمال الواجهات والتشطيب', 'Sequential Construction: Excavation → Superstructure → Facades & Finishing')}</span>
            </div>

            <div className="relative w-full aspect-16/9 sm:aspect-21/9 bg-[#0a1128] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover/zoom:scale-[1.02]">
                <ImageViewerWithZoom
                  src={project.constructionProgressStagesPath}
                  fallbackSrc={project.timelineHighResOverviewPath}
                  alt="مراحل التشييد الإنشائي لمركز كافد"
                  badgeLabel="3 مراحل إنجاز إنشائي"
                  aspectRatioClass="aspect-16/9 sm:aspect-21/9"
                  objectFit="contain"
                  className="w-full h-full border-0 bg-transparent"
                />
              </div>
            </div>
          </div>
        )}

      </div>

    </article>
  );
};
