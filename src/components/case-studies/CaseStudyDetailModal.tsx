import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  ExternalLink, 
  Building2, 
  Satellite, 
  Compass, 
  ZoomIn, 
  Maximize2,
  ListChecks,
  History,
  Workflow
} from 'lucide-react';
import { 
  CaseStudyProject, 
  WORKFLOW_PHASES_META, 
  SATELLITE_ATTRIBUTION, 
  BASEMAP_ATTRIBUTION, 
  ChecklistItemStatus,
  StageWorkflowStatus
} from '../../data/caseStudiesData';
import { ImageViewerWithZoom } from './ImageViewerWithZoom';

interface CaseStudyDetailModalProps {
  project: CaseStudyProject | null;
  onClose: () => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  // Active stage index for the 5-stage interactive slider
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [showHighResOverview, setShowHighResOverview] = useState(false);

  // Active tab within the detail modal for smooth navigation
  const [activeTab, setActiveTab] = useState<'visuals' | 'workflow' | 'checklist' | 'sources'>('visuals');

  const currentStage = project.timeline5Stages[activeStageIndex];

  const handleNextStage = () => {
    setActiveStageIndex((prev) => (prev + 1) % project.timeline5Stages.length);
  };

  const handlePrevStage = () => {
    setActiveStageIndex((prev) => (prev - 1 + project.timeline5Stages.length) % project.timeline5Stages.length);
  };

  // Keyboard navigation support: Escape to close, arrows to cycle stages
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && activeTab === 'visuals') {
        handlePrevStage();
      } else if (e.key === 'ArrowLeft' && activeTab === 'visuals') {
        handleNextStage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, project.timeline5Stages.length]);

  const getStatusBadge = (status: ChecklistItemStatus) => {
    switch (status) {
      case 'completed':
        return {
          label: 'مكتمل',
          className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
        };
      case 'in_progress':
        return {
          label: 'قيد التنفيذ',
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800'
        };
      case 'under_review':
        return {
          label: 'قيد المراجعة',
          className: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800'
        };
      case 'not_required':
        return {
          label: 'غير مطلوب',
          className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700'
        };
      case 'not_available':
      default:
        return {
          label: 'غير متوفر',
          className: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-900'
        };
    }
  };

  const getWorkflowStatusBadge = (status: StageWorkflowStatus) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">مكتمل</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">قيد التنفيذ</span>;
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">مجدول</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">غير متوفر</span>;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex items-center justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold text-xs">
                {project.categoryAr}
              </span>
              <span className="text-xs text-slate-500 font-mono" dir="ltr">
                {project.timeRange}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {project.nameAr}
            </h2>
            {project.nameEn && (
              <p className="text-xs font-mono text-slate-500" dir="ltr">
                {project.nameEn}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              title="إغلاق"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-100/70 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('visuals')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'visuals'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>الرصد الفضائي والمقارنات</span>
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'workflow'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>مراحل دورة حياة الأصل (16 مرحلة)</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span>قائمة تدقيق الموافقات والتراخيص (19 وثيقة)</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'sources'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>المصادر والبيانات التوثيقية</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">

          {/* TAB 1: VISUALS (Before/Latest, 3-Stage Progress, 5-Stage Timeline, High-Res Gallery) */}
          {activeTab === 'visuals' && (
            <div className="space-y-10">
              
              {/* 1. Project Overview Strip */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold">الموقع الجغرافي:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {project.locationAr}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400" dir="ltr">
                      {project.coordinates}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold">فترة الرصد الزمني:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      {project.trackingPeriod}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold">الحالة الموثقة:</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {project.statusAr}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold">مصادر الصور الفضائية:</span>
                    <p className="font-medium text-slate-700 dark:text-slate-300 text-[11px] leading-tight">
                      {project.satelliteSources}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.descriptionAr}
                </div>
              </div>

              {/* 2. Main Large Before-and-Latest Comparison */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Satellite className="w-5 h-5 text-blue-600" />
                      <span>المقارنة المباشرة: قبل البدء مقابل أحدث رصد فضائي</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      مقارنة كاملة بدون اقتطاع للبيانات التوضيحية أو التسميات
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2.5 py-1 rounded-lg">
                    رصد زمني فوتوغرافي
                  </span>
                </div>

                {/* Main Comparison Board with Dark Neutral Background & Contain rule */}
                <div className="bg-slate-950 p-2 sm:p-4 rounded-3xl border border-slate-800 shadow-xl">
                  <ImageViewerWithZoom
                    src={project.comparisonBeforeLatestPath}
                    fallbackSrc={project.timelineHighResOverviewPath}
                    alt={`${project.nameAr} - مقارنة قبل البدء وأحدث رصد`}
                    caption={project.comparisonLabels.description}
                    aspectRatioClass="aspect-16/9"
                    badgeLabel="مقارنة زمنية رئيسية"
                  />
                </div>
              </div>

              {/* 3. Construction Progress (3 Clear Stages) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-emerald-600" />
                      <span>مراحل تطور المشروع</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      لوحة المراحل الثلاث الرئيسية الموثقة للتطور الإنشائي والتنفيذي
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                    3 مراحل رئيسية
                  </span>
                </div>

                <div className="bg-slate-950 p-2 sm:p-4 rounded-3xl border border-slate-800 shadow-xl">
                  <ImageViewerWithZoom
                    src={project.constructionProgressStagesPath}
                    fallbackSrc={project.timelineHighResOverviewPath}
                    alt={`${project.nameAr} - مراحل تطور المشروع`}
                    caption="استعراض لثلاث مراحل إجرائية وإنشائية رئيسية تبرز تطور الأعمال الميدانية والبنية التحتية"
                    aspectRatioClass="aspect-16/9"
                    badgeLabel="لوحة المراحل الثلاث"
                  />
                </div>
              </div>

              {/* 4. Five-Stage Historical Timeline Slider */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <History className="w-5 h-5 text-amber-500" />
                      <span>المسار الزمني التاريخي (5 لقطات فضائية)</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      تنقل تفاعلي بين اللقطات الزمنية الخمس بدون تكدس
                    </p>
                  </div>

                  {/* Stage Stepper Tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 self-start">
                    {project.timeline5Stages.map((stage, idx) => (
                      <button
                        key={stage.stageNumber}
                        onClick={() => setActiveStageIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeStageIndex === idx
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        المرحلة {stage.stageNumber}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dominant Timeline Image Display */}
                {currentStage && (
                  <div className="bg-slate-950 p-2 sm:p-4 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                    <div className="relative">
                      <ImageViewerWithZoom
                        src={currentStage.imagePath}
                        fallbackSrc={currentStage.fallbackAliasPath}
                        alt={`${project.nameAr} - ${currentStage.phaseNameAr}`}
                        filename={currentStage.imageFilename}
                        badgeLabel={`المرحلة ${currentStage.stageNumber} من 5`}
                        aspectRatioClass="aspect-16/9"
                      />

                      {/* Previous / Next Controls on Image */}
                      <button
                        onClick={handlePrevStage}
                        className="absolute top-1/2 right-3 -translate-y-1/2 p-2.5 rounded-2xl bg-slate-900/90 hover:bg-blue-600 text-white border border-slate-700 shadow-lg transition-colors cursor-pointer"
                        title="المرحلة السابقة"
                        aria-label="السابق"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <button
                        onClick={handleNextStage}
                        className="absolute top-1/2 left-3 -translate-y-1/2 p-2.5 rounded-2xl bg-slate-900/90 hover:bg-blue-600 text-white border border-slate-700 shadow-lg transition-colors cursor-pointer"
                        title="المرحلة التالية"
                        aria-label="التالي"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Stage Metadata Strip */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 text-white grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-slate-400 font-semibold">تاريخ الالتقاط الفضائي:</span>
                        <p className="font-bold text-amber-300 font-mono" dir="ltr">
                          {currentStage.acquisitionDate}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-semibold">المستشعر والقمر الصناعي:</span>
                        <p className="font-bold text-blue-300">
                          {currentStage.satelliteSource}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-semibold">نسبة الغطاء السحابي:</span>
                        <p className="font-bold text-emerald-300 font-mono" dir="ltr">
                          {currentStage.cloudCover}
                        </p>
                      </div>

                      <div className="sm:col-span-3 pt-2 border-t border-slate-800 text-xs text-slate-300">
                        <span className="font-bold text-white ml-2">{currentStage.phaseNameAr}:</span>
                        <span>{currentStage.descriptionAr}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle High Resolution Overview Board */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowHighResOverview(!showHighResOverview)}
                    className="py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>
                      {showHighResOverview 
                        ? 'إخفاء لوحة المراحل الخمس المجمعة بدقة فائقة' 
                        : 'عرض لوحة المراحل الخمس المجمعة بدقة فائقة (High Resolution Overview)'}
                    </span>
                  </button>

                  {showHighResOverview && (
                    <div className="mt-3 bg-slate-950 p-2 sm:p-4 rounded-3xl border border-slate-800 shadow-xl animate-in fade-in">
                      <ImageViewerWithZoom
                        src={project.timelineHighResOverviewPath}
                        alt={`${project.nameAr} - لوحة المراحل الخمس كاملة`}
                        filename={project.timelineHighResOverviewFile}
                        caption="لوحة المراحل الخمس بدقة مكانية كاملة موثقة"
                        aspectRatioClass="aspect-16/9"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 5. High-Resolution Basemap Gallery (Wider Overview & Closer Detail) */}
              <div className="space-y-4">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    <span>معرض الصور الفضائية عالية الدقة (High-Resolution Basemap)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    أحدث صور الأساس الجغرافي المتاحة من مصادر Esri World Imagery Basemap (بدون تلفيق لتاريخ غير مذكور)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Wider Site Overview */}
                  <div className="bg-slate-950 p-3 rounded-3xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-200 px-2 flex items-center justify-between">
                      <span>1. نظرة شاملة على الموقع (Wider Site Overview)</span>
                      <span className="text-[10px] text-blue-400 font-semibold bg-blue-950/60 px-2 py-0.5 rounded">
                        Esri World Imagery
                      </span>
                    </div>
                    <ImageViewerWithZoom
                      src={project.latestHighResolution.widerOverviewPath}
                      alt={`${project.nameAr} - نظرة شاملة`}
                      caption={project.latestHighResolution.widerOverviewLabelAr}
                      aspectRatioClass="aspect-4/3"
                      badgeLabel="نظرة شاملة"
                    />
                  </div>

                  {/* Closer Site Detail */}
                  <div className="bg-slate-950 p-3 rounded-3xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-200 px-2 flex items-center justify-between">
                      <span>2. تفاصيل دقيقة مقربة (Closer Site Detail)</span>
                      <span className="text-[10px] text-blue-400 font-semibold bg-blue-950/60 px-2 py-0.5 rounded">
                        Esri World Imagery
                      </span>
                    </div>
                    <ImageViewerWithZoom
                      src={project.latestHighResolution.closerDetailPath}
                      alt={`${project.nameAr} - تفاصيل مقربة`}
                      caption={project.latestHighResolution.closerDetailLabelAr}
                      aspectRatioClass="aspect-4/3"
                      badgeLabel="تفاصيل مقربة"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-indigo-900 dark:text-indigo-300 text-xs flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    ملاحظة توثيقية: تُعرض صور الأساس الجغرافي بأقصى دقة تفصيلية ممكنة استناداً لطبقة Esri World Imagery المعتمدة دون اختلاق تواريخ غير مثبتة في البيانات الأصلية.
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 16-STAGE ASSET LIFECYCLE WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="space-y-8">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-blue-600" />
                  <span>مراحل دورة حياة الأصل العقاري والتتبع الفضائي (16 مرحلة)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  سلسلة إجراءات متكاملة تغطي كافة مراحل المشروع من دراسة الفرصة والاستثمار حتى التشغيل والمراقبة المستمرة بالأقمار الصناعية
                </p>
              </div>

              {/* Grouped by 7 Phases */}
              <div className="space-y-8">
                {WORKFLOW_PHASES_META.map((phase) => {
                  const phaseStages = project.workflowStages.filter(s => s.phaseId === phase.id);
                  if (phaseStages.length === 0) return null;

                  return (
                    <div key={phase.id} className="space-y-4">
                      {/* Phase Header Banner */}
                      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-r-4 border-blue-600 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                            {phase.id}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {phase.nameAr}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono hidden sm:inline" dir="ltr">
                            ({phase.nameEn})
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-500">
                          {phaseStages.length} مراحل
                        </span>
                      </div>

                      {/* Phase Stages Timeline Cards */}
                      <div className="space-y-3 pr-4 border-r-2 border-slate-200 dark:border-slate-800">
                        {phaseStages.map((stage) => (
                          <div 
                            key={stage.stageNumber}
                            className="relative p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
                          >
                            {/* Connector dot */}
                            <div className="absolute -right-[23px] top-6 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900" />

                            {/* Stage Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
                                  {stage.stageNumber}
                                </span>
                                <div>
                                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                                    {stage.stageNameAr}
                                  </h5>
                                  <span className="text-[11px] font-mono text-slate-400" dir="ltr">
                                    {stage.stageNameEn}
                                  </span>
                                </div>
                              </div>
                              <div className="shrink-0">
                                {getWorkflowStatusBadge(stage.status)}
                              </div>
                            </div>

                            {/* Stage Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                              <div>
                                <span className="text-slate-400 font-medium block">الجهة المسؤولة:</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                  {stage.responsibleParty}
                                </span>
                              </div>

                              <div>
                                <span className="text-slate-400 font-medium block">جهة الإصدار / الاعتماد:</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                  {stage.issuingAuthority}
                                </span>
                              </div>

                              <div>
                                <span className="text-slate-400 font-medium block">رقم الوثيقة / القيد:</span>
                                <span className="font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                                  {stage.documentNumber}
                                </span>
                              </div>

                              <div>
                                <span className="text-slate-400 font-medium block">التاريخ المخطط:</span>
                                <span className="font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                                  {stage.plannedDate}
                                </span>
                              </div>

                              <div>
                                <span className="text-slate-400 font-medium block">التاريخ الفعلي:</span>
                                <span className="font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                                  {stage.actualDate}
                                </span>
                              </div>

                              <div>
                                <span className="text-slate-400 font-medium block">جهة المراجعة والتدقيق:</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                  {stage.reviewer}
                                </span>
                              </div>
                            </div>

                            {/* Evidence & Satellite Monitoring Role */}
                            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                              <div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">المستندات والأدلة المطلوبة: </span>
                                <span className="text-slate-600 dark:text-slate-400">{stage.requiredEvidence}</span>
                              </div>

                              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-blue-950 dark:text-blue-200">
                                <span className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5 mb-1">
                                  <Satellite className="w-3.5 h-3.5" />
                                  <span>علاقة المرحلة بالمراقبة الفضائية والاستشعار عن بعد:</span>
                                </span>
                                <p className="text-[11px] leading-relaxed">
                                  {stage.satelliteRelationship}
                                </p>
                              </div>

                              {stage.notes && (
                                <div className="text-[11px] text-slate-500 italic">
                                  <span>ملاحظة: </span>{stage.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: APPROVAL AND CONSTRUCTION CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-emerald-600" />
                  <span>قائمة تدقيق الموافقات والتراخيص الإنشائية (19 وثيقة رسمية)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  توثيق دقيق لحالة صكوك الملكية والقرارات المساحية والدراسات البيئية وتراخيص البناء
                </p>
              </div>

              {/* Legend Strip */}
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-600 dark:text-slate-300">دليل الحالات:</span>
                <span className="px-2 py-0.5 rounded-lg border font-semibold bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300">
                  مكتمل
                </span>
                <span className="px-2 py-0.5 rounded-lg border font-semibold bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300">
                  قيد التنفيذ
                </span>
                <span className="px-2 py-0.5 rounded-lg border font-semibold bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300">
                  قيد المراجعة
                </span>
                <span className="px-2 py-0.5 rounded-lg border font-semibold bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300">
                  غير مطلوب
                </span>
                <span className="px-2 py-0.5 rounded-lg border font-semibold bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300">
                  غير متوفر
                </span>
              </div>

              {/* Checklist Table Grid */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                {project.checklist.map((item) => {
                  const badge = getStatusBadge(item.status);
                  return (
                    <div 
                      key={item.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {item.number}
                        </span>
                        <div className="space-y-0.5">
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                            {item.titleAr}
                          </h5>
                          <p className="text-[11px] font-mono text-slate-400" dir="ltr">
                            {item.titleEn}
                          </p>
                          {item.notes && item.status === 'not_available' && (
                            <p className="text-[11px] text-rose-500 font-medium">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-start sm:self-center pr-9 sm:pr-0">
                        <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${badge.className}`}>
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: SOURCES & ATTRIBUTIONS */}
          {activeTab === 'sources' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>المصادر والبيانات التوثيقية المعتمدة</span>
                </h3>
                <p className="text-xs text-slate-500">
                  توثيق حقوق وكالات الفضاء والجهات الرسمية المشرفة على المشروع
                </p>
              </div>

              {/* Mandatory Satellite & Basemap Attributions */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 space-y-1.5">
                  <div className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                    <Satellite className="w-4 h-4 text-blue-600" />
                    <span>إسناد صور الأقمار الصناعية (Satellite Attribution):</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-200" dir="ltr">
                    {SATELLITE_ATTRIBUTION}
                  </p>
                  <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80">
                    تم استخراج ومعالجة بيانات الاستشعار الفضائي متعددة الأطياف من أقمار Sentinel-2 التابعة لبرنامج كوبرنيكوس الأوروبي (ESA).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 space-y-1.5">
                  <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-600" />
                    <span>إسناد خرائط الأساس عالية الدقة (High-Resolution Basemap Attribution):</span>
                  </div>
                  <p className="text-xs font-mono text-indigo-700 dark:text-indigo-200" dir="ltr">
                    {BASEMAP_ATTRIBUTION}
                  </p>
                  <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80">
                    حقوق الصور الفضائية عالية الدقة محفوظة لموفري طبقة Esri World Imagery (Maxar Technologies ومجتمع نظم المعلومات الجغرافية).
                  </p>
                </div>
              </div>

              {/* Project Specific References */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  المراجع والجهات المصدرة للمشروع:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.sources.map((src, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1 text-xs"
                    >
                      <h5 className="font-bold text-slate-900 dark:text-white">
                        {src.titleAr}
                      </h5>
                      <p className="text-slate-500 font-mono text-[11px]" dir="ltr">
                        {src.titleEn}
                      </p>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold pt-1">
                        الجهة: {src.organization}
                      </p>
                      {src.attributionText && (
                        <p className="text-[10px] font-mono text-slate-400" dir="ltr">
                          {src.attributionText}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-600 dark:text-blue-400">{project.categoryAr}</span>
            <span>•</span>
            <span>نظام عين سيجام لمتابعة الأصول العقارية</span>
          </div>

          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
