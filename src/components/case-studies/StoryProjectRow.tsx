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
import { ScrollReveal } from '../ScrollReveal';
import { useLanguage } from '../../i18n/LanguageContext';

interface StoryProjectRowProps {
  project: CaseStudyProject;
  index: number;
  onSelectProject: (project: CaseStudyProject) => void;
}

export const StoryProjectRow: React.FC<StoryProjectRowProps> = ({
  project,
  index,
  onSelectProject,
}) => {
  const { t, isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState<'timeline' | 'comparison' | 'construction'>('timeline');

  // Alternating composition: Even = Info first, Visual second. Odd = Visual first, Info second.
  const isVisualFirst = index % 2 === 1;

  // Custom verified indicators per project based on official records
  const getProjectCustomMetrics = () => {
    switch (project.id) {
      case 'riyadh-metro-west-depot':
        return [
          { label: t('مساحة المستودع', 'Depot Area'), val: '50 ' + t('هكتاراً', 'ha') },
          { label: t('المسار المخدوم', 'Serving Line'), val: t('المسار البرتقالي (Orange)', 'Orange Line') },
          { label: t('مسارات الاختبار', 'Test Tracks'), val: '4 ' + t('مسارات تشغيل', 'tracks') },
          { label: t('حالة الأصل', 'Asset Status'), val: t('تشغيل رسمي', 'Operational') },
        ];
      case 'six-flags-qiddiya':
        return [
          { label: t('مساحة المتنزه', 'Park Area'), val: '32 ' + t('هكتاراً', 'ha') },
          { label: t('الألعاب والمعالم', 'Attractions'), val: '28 ' + t('لعبة مميزة', 'rides') },
          { label: t('أطول قطار ملاهي', 'Falcon Flight'), val: t('قطار الصقر الأيقوني', 'Falcon Flight') },
          { label: t('حالة الأصل', 'Asset Status'), val: t('مرحلة التجهيز والافتتاح', 'Commissioning') },
        ];
      case 'red-sea-airport':
        return [
          { label: t('طول المدرج', 'Runway Length'), val: '3,700 ' + t('متر', 'm') },
          { label: t('صالات الركاب', 'Terminal Pods'), val: '5 ' + t('أجنحة بتصميم فوستر', 'Foster pods') },
          { label: t('نوع الرحلات', 'Flights'), val: t('دولية ومحلية', 'International & Domestic') },
          { label: t('حالة الأصل', 'Asset Status'), val: t('تشغيل معتمد', 'Certified') },
        ];
      case 'sheybarah-resort':
        return [
          { label: t('الفلل العائمة', 'Overwater Villas'), val: '73 ' + t('فيلا فولاذية عاكسة', 'orb villas') },
          { label: t('المحيط البيئي', 'Ecosystem'), val: t('شعاب مرجانية عذراء', 'Protected reefs') },
          { label: t('مصدر الطاقة', 'Energy Source'), val: '100% ' + t('طاقة شمسية', 'Solar powered') },
          { label: t('حالة الأصل', 'Asset Status'), val: t('افتتاح رسمي', 'Open') },
        ];
      case 'spark-energy-park':
        return [
          { label: t('المساحة الإجمالية', 'Total Area'), val: '50 ' + t('كم²', 'sq.km') },
          { label: t('المركز اللوجستي', 'Logistics Hub'), val: t('ميناء جاف متكامل', 'Dry Port') },
          { label: t('الربط السككي', 'Rail Linkage'), val: t('شبكة قطار سار', 'SAR Network') },
          { label: t('حالة الأصل', 'Asset Status'), val: t('تشغيل المرحلة الأولى', 'Phase 1 Active') },
        ];
      default:
        return [
          { label: t('المراحل الموثقة', 'Tracked Stages'), val: '5 ' + t('مراحل زمنية', 'stages') },
          { label: t('مصدر الرصد', 'Sensor'), val: 'Sentinel-2' },
          { label: t('الجهة المالكة', 'Entity'), val: t('حكومية / استثمارية', 'Official') },
          { label: t('حالة الأصل', 'Asset Status'), val: project.statusAr },
        ];
    }
  };

  const metrics = getProjectCustomMetrics();

  // Information Column Component
  const InfoColumn = (
    <div className="flex-1 flex flex-col justify-between space-y-6 text-right p-6 sm:p-8 lg:p-10">
      <div className="space-y-4">
        
        {/* Top Meta Line */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
              {t('مشروع', 'Project')} 0{index + 1}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-900">
              {project.categoryAr}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{project.trackingPeriod}</span>
          </div>
        </div>

        {/* Project Title & Location */}
        <div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white font-['Cairo'] tracking-tight leading-tight">
            {project.nameAr}
          </h3>
          {project.nameEn && (
            <p className="text-xs font-medium text-slate-400 font-mono mt-1" dir="ltr">
              {project.nameEn}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{project.locationAr}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-slate-500 dark:text-slate-400 font-mono" dir="ltr">{project.timeRange}</span>
          </div>
        </div>

        {/* Status Strip */}
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs transition-colors duration-300">
          <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-0.5">
            {t('الحالة الميدانية المعتمدة:', 'Verified Field Status:')}
          </div>
          <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{project.statusAr}</span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-['Cairo']">
          {project.descriptionAr}
        </p>

        {/* Specific Key Indicators */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {metrics.map((m, mIdx) => (
            <div key={mIdx} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2.5 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
              <div className="text-[10px] text-slate-400 font-semibold">{m.label}</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">{m.val}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Action Button: عرض رحلة المشروع */}
      <div className="pt-2">
        <button
          onClick={() => onSelectProject(project)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-blue-600 active:scale-95 dark:bg-slate-800 dark:hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
        >
          <span>{t('عرض رحلة المشروع وتفاصيل الأصل (16 مرحلة)', 'View Project Journey & Asset Lifecycle')}</span>
          {isAr ? (
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
          ) : (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          )}
        </button>
      </div>
    </div>
  );

  // Visual Interactive Column Component
  const VisualColumn = (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-slate-900/60 dark:bg-slate-950/80">
      
      {/* Visual Mode Selector Tabs */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="inline-flex p-1 rounded-xl bg-slate-800/80 border border-slate-700/60">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
              activeTab === 'timeline'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('الخط الزمني (5 مراحل)', '5-Stage Timeline')}
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
              activeTab === 'comparison'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('المقارنة الفضائية قبل وبعد', 'Before & Latest')}
          </button>

          <button
            onClick={() => setActiveTab('construction')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
              activeTab === 'construction'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('المراحل الإنشائية', 'Construction')}
          </button>
        </div>

        <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">
          Sentinel-2
        </span>
      </div>

      {/* Mode 1: 5-Stage Timeline */}
      {activeTab === 'timeline' && (
        <ProjectTimelineStory
          stages={project.timeline5Stages}
          projectName={project.nameAr}
        />
      )}

      {/* Mode 2: Before-and-After Comparison */}
      {activeTab === 'comparison' && (
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0a1128] p-3 text-right group/zoom">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{t('قبل التطوير', 'Before')} ({project.comparisonLabels.beforeDate})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{t('الوضع المحدث', 'Latest')} ({project.comparisonLabels.latestDate})</span>
            </span>
          </div>

          <div className="relative w-full aspect-16/10 bg-[#0a1128] rounded-xl overflow-hidden flex items-center justify-center">
            <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover/zoom:scale-[1.025]">
              <ImageViewerWithZoom
                src={project.comparisonBeforeLatestPath}
                fallbackSrc={project.timelineHighResOverviewPath}
                alt={`مقارنة فضائية قبل وبعد لمشروع ${project.nameAr}`}
                badgeLabel="رصد الأقمار الصناعية (Sentinel-2)"
                aspectRatioClass="aspect-16/10"
                objectFit="contain"
                className="w-full h-full border-0 bg-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Construction Progress */}
      {activeTab === 'construction' && (
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0a1128] p-3 text-right group/zoom">
          <div className="text-xs text-slate-300 font-semibold mb-2 px-1">
            <span>{t('رصد تطور البناء والتشييد الميداني بالأقمار الصناعية', 'Field Construction Progress Audit')}</span>
          </div>

          <div className="relative w-full aspect-16/10 bg-[#0a1128] rounded-xl overflow-hidden flex items-center justify-center">
            <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover/zoom:scale-[1.025]">
              <ImageViewerWithZoom
                src={project.constructionProgressStagesPath}
                fallbackSrc={project.timelineHighResOverviewPath}
                alt={`مراحل التشييد الإنشائي لمشروع ${project.nameAr}`}
                badgeLabel="3 مراحل إنجاز إنشائي"
                aspectRatioClass="aspect-16/10"
                objectFit="contain"
                className="w-full h-full border-0 bg-transparent"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );

  return (
    <ScrollReveal direction="up" delayMs={50}>
      <article className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Alternating RTL order */}
          {isVisualFirst ? (
            <>
              {VisualColumn}
              {InfoColumn}
            </>
          ) : (
            <>
              {InfoColumn}
              {VisualColumn}
            </>
          )}
        </div>
      </article>
    </ScrollReveal>
  );
};
