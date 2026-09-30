import React from 'react';
import { 
  X, 
  CheckCircle2, 
  HardHat, 
  PauseCircle, 
  MapPin, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Layers,
  Activity,
  ArrowUpRight,
  Compass,
  Wrench,
  Users
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ConstructionSiteItem } from '../data/constructionSitesData';
import { ProjectPhaseDonutChart, calculateProjectPhases, ProjectPhase } from './ProjectPhaseDonutChart';
import { ProjectCoverImage } from './ProjectCoverImage';

export type ProjectModalItem = ConstructionSiteItem;

interface ProjectPhaseModalProps {
  project: ProjectModalItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMap?: (projectId?: string) => void;
}

const phaseDescriptions: Record<string, { descAr: string; descEn: string; criteriaAr: string; criteriaEn: string }> = {
  'phase-1': {
    descAr: 'أعمال تسوية طبقات التربة، الحفر العميق، سند جوانب الحفر، ونزح المياه الجوفية.',
    descEn: 'Site grading, deep excavation, shoring works, and dewatering systems.',
    criteriaAr: 'فحوصات جسات التربة واعتمادات الهيئة المساحية',
    criteriaEn: 'Soil boreholes and geodetic approvals'
  },
  'phase-2': {
    descAr: 'تنفيذ الخوازيق الخرسانية المسلحة، صب اللبشة والأساسات العميقة، والعزل المائي المزدوج.',
    descEn: 'Piling works, reinforced raft foundations, and dual-layer waterproofing.',
    criteriaAr: 'اختبارات إجهاد كسر مكعبات الخرسانة (28 يوماً)',
    criteriaEn: 'Concrete cube compressive strength testing'
  },
  'phase-3': {
    descAr: 'رفع الأعمدة الخرسانية، صب الأسقف والكمرات، الكور الخرساني المركزي، والهياكل المعدنية.',
    descEn: 'Erection of columns, suspended slabs, central core, and structural steel.',
    criteriaAr: 'مطابقة الكود السعودي للمباني المقاومة للزلازل والرياح',
    criteriaEn: 'Saudi Building Code seismic and wind compliance'
  },
  'phase-4': {
    descAr: 'تمديد الأنظمة الكهروميكانيكية، التكييف، مكافحة الحريق، تركيب الواجهات الذكية والأكساء.',
    descEn: 'MEP rough-ins, HVAC chillers, fire suppression, and architectural smart facades.',
    criteriaAr: 'اعتمادات الدفاع المدني والمواصفات السعودية SASO',
    criteriaEn: 'Civil Defense & SASO material certifications'
  },
  'phase-5': {
    descAr: 'التشغيل التجريبي للأنظمة، شهادات إتمام البناء، إطلاق التيار الدائم، والتسليم الابتدائي.',
    descEn: 'Integrated systems testing, occupancy permits, permanent power, and handover.',
    criteriaAr: 'فحص الجودة الشامل وشهادة إشغال أمانة المنطقة',
    criteriaEn: 'Comprehensive QA audit and Municipality occupancy certificate'
  }
};

export const ProjectPhaseModal: React.FC<ProjectPhaseModalProps> = ({
  project,
  isOpen,
  onClose,
  onNavigateToMap
}) => {
  const { t, isAr } = useLanguage();

  if (!isOpen || !project) return null;

  const phases = calculateProjectPhases(project.progressPct);
  const isComp = project.statusType === 'completed' || project.progressPct === 100;
  const isPaused = project.statusType === 'paused';
  const isUnderConst = !isComp && !isPaused;

  const projectName = project.name;
  const projectCat = project.category;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      dir={isAr ? 'rtl' : 'ltr'}
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 transition-all text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold bg-white/15 px-2.5 py-0.5 rounded-lg border border-white/20 text-blue-100">
                {project.code}
              </span>
              <span className="text-xs font-semibold text-blue-200">
                {project.city} • {projectCat}
              </span>
              {isUnderConst && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/25 text-blue-200 border border-blue-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  {t('تحت الإنشاء', 'Under Construction')}
                </span>
              )}
              {isComp && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/25 text-emerald-200 border border-emerald-400/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {t('مكتمل', 'Completed')}
                </span>
              )}
              {isPaused && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-500/30 text-slate-200 border border-slate-400/30">
                  <PauseCircle className="w-3 h-3 text-slate-300" />
                  {t('متوقف مؤقتاً', 'Paused')}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              {isAr ? projectName : (project.nameEn || projectName)}
            </h3>

            <div className="text-xs text-blue-200/90 flex items-center gap-3 flex-wrap">
              {project.contractor && (
                <span>{t('المقاول الرئيسي:', 'Contractor:')} <strong className="text-white">{project.contractor}</strong></span>
              )}
              {project.estimatedValueSar && (
                <>
                  <span>•</span>
                  <span>{t('القيمة:', 'Value:')} <strong className="text-white font-mono">{project.estimatedValueSar}</strong></span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            title={t('إغلاق', 'Close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Cover Image & Basic Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-5">
              <ProjectCoverImage
                src={project.previewImage}
                alt={projectName}
                aspectRatioClass="aspect-16/9"
                className="shadow-sm border border-slate-200 dark:border-slate-800"
              />
            </div>
            <div className="md:col-span-7 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">{t('المدينة والمنطقة:', 'City & Region:')}</span>
                  <strong className="text-slate-800 dark:text-slate-200">{project.city} ({project.region})</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">{t('المساحة الإجمالية:', 'Site Area:')}</span>
                  <strong className="text-slate-800 dark:text-slate-200">{project.areaFormatted || `${project.areaKm2} كم²`}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-blue-600" />
                    <span>{t('المعدات النشطة:', 'Equipment:')}</span>
                  </span>
                  <strong className="text-blue-600 dark:text-blue-400 font-mono text-sm">{project.activeMachinery} معدة</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] flex items-center gap-1">
                    <Users className="w-3 h-3 text-blue-600" />
                    <span>{t('الكوادر الميدانية:', 'Workforce:')}</span>
                  </span>
                  <strong className="text-slate-800 dark:text-slate-200 font-mono text-sm">{project.activeWorkers} كادر</strong>
                </div>
              </div>

              {project.sourceVerification && (
                <div className="text-[11px] text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 p-2 rounded-xl border border-blue-200 dark:border-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{t('المصدر المعتمد:', 'Verified Source:')} <strong>{project.sourceVerification}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Section: Recharts Donut Chart + Macro Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800">
            {/* Recharts Donut Chart */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-sm">
                <ProjectPhaseDonutChart
                  progressPct={project.progressPct}
                  status={project.statusType || 'under_construction'}
                  size={180}
                  innerRadius={52}
                  outerRadius={75}
                  showCenterText={true}
                  centerSublabel={isAr ? 'الإنجاز الكلي' : 'Total Progress'}
                />
              </div>
            </div>

            {/* Description & Targets */}
            <div className="md:col-span-7 space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t('وصف المشروع وأعمال الرصد:', 'Project Scope & Monitoring:')}</span>
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {isAr ? project.description : (project.descriptionEn || project.description)}
                </p>
              </div>

              {project.monitoringPeriod && (
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>فترة الرصد المعتمدة: <strong className="text-slate-800 dark:text-slate-200 font-mono">{project.monitoringPeriod}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Section: 5 Detailed Execution Phases */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{t('تفصيل المراحل الإنشائية الخمس المعتمدة', '5 Certified Construction Milestones')}</span>
            </h4>

            <div className="space-y-2.5">
              {phases.map((ph, idx) => {
                const isPhaseCompleted = ph.progressPct === 100;
                const isPhaseCurrent = ph.progressPct > 0 && ph.progressPct < 100;
                const info = phaseDescriptions[ph.id] || {
                  descAr: 'أعمال هندسية ومطابقة ميدانية دورية.',
                  descEn: 'Engineering works & milestone audits.',
                  criteriaAr: 'شهادات الفحص الفني المعتمدة',
                  criteriaEn: 'Technical compliance approval'
                };

                return (
                  <div 
                    key={ph.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isPhaseCurrent 
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 shadow-sm'
                        : isPhaseCompleted
                          ? 'bg-slate-50/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                          : 'bg-white dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold font-mono flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {isAr ? ph.nameAr : ph.nameEn}
                        </span>
                        {isPhaseCurrent && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">
                            {t('المرحلة الحالية', 'In Progress')}
                          </span>
                        )}
                        {isPhaseCompleted && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                            {t('مكتملة', 'Completed')}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                        {ph.progressPct}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isPhaseCompleted ? 'bg-emerald-500' : isPhaseCurrent ? 'bg-blue-600' : 'bg-slate-400'
                        }`}
                        style={{ width: `${ph.progressPct}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mb-1.5">
                      {isAr ? info.descAr : info.descEn}
                    </p>

                    <div className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{t('معيار الاعتماد:', 'Audit Criteria:')} {isAr ? info.criteriaAr : info.criteriaEn}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{project.realGps.lat.toFixed(4)}°N, {project.realGps.lng.toFixed(4)}°E</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToMap && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToMap(project.id);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t('الانتقال لموقع المشروع على الخريطة', 'Fly to Site on Map')}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              {t('إغلاق', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
