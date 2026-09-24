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
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { DetailedProjectItem } from './ProjectStatistics';
import { ProjectPhaseDonutChart, calculateProjectPhases, ProjectPhase } from './ProjectPhaseDonutChart';

interface ProjectPhaseModalProps {
  project: DetailedProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMap?: () => void;
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
  const isUnderConst = project.status === 'under_construction';
  const isComp = project.status === 'completed';
  const isPaused = project.status === 'paused';

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
                {project.city} • {isAr ? project.categoryAr : project.categoryEn}
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
              {isAr ? project.nameAr : project.nameEn}
            </h3>

            <p className="text-xs text-blue-200/90 flex items-center gap-2">
              <span>{t('المقاول الرئيسي:', 'Contractor:')} <strong className="text-white">{project.contractor}</strong></span>
              <span>•</span>
              <span>{t('القيمة:', 'Value:')} <strong className="text-white font-mono">{project.estimatedValueSar}</strong></span>
            </p>
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
          
          {/* Top Section: Recharts Donut Chart + Macro Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800">
            {/* Recharts Donut Chart */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-sm">
                <ProjectPhaseDonutChart
                  progressPct={project.progressPct}
                  status={project.status}
                  size={190}
                  innerRadius={55}
                  outerRadius={78}
                  showCenterText={true}
                  centerSublabel={isAr ? 'الإنجاز الكلي' : 'Total Progress'}
                />
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
                {t('مخطط دونات تفاعلي (Recharts) لنسبة إنجاز المراحل', 'Interactive Recharts Donut of Phase Progress')}
              </span>
            </div>

            {/* Quick Metrics & Highlights */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-sm font-bold text-blue-950 dark:text-white">
                  {t('الموقف التنفيذي للمشروع بالمملكة', 'Execution Status & Milestones')}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800">
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">{t('نسبة الإنجاز الفعلية:', 'Actual Progress:')}</span>
                  <strong className="text-base font-black font-mono text-blue-600 dark:text-blue-400">{project.progressPct}%</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800">
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">{t('المساحة الإجمالية:', 'Total Area:')}</span>
                  <strong className="text-xs font-bold text-slate-800 dark:text-slate-200">{project.areaFormatted}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800">
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">{t('تاريخ بدء التنفيذ:', 'Start Date:')}</span>
                  <strong className="text-xs font-mono text-slate-800 dark:text-slate-200">{project.startDate}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800">
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">{t('التسليم المستهدف:', 'Target Handover:')}</span>
                  <strong className="text-xs font-mono text-slate-800 dark:text-slate-200">{project.expectedCompletion}</strong>
                </div>
              </div>

              {project.pauseReasonAr && isPaused && (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                  <PauseCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">{t('سبب التوقف المؤقت:', 'Pause Reason:')}</strong>
                    <span>{project.pauseReasonAr}</span>
                  </div>
                </div>
              )}

              {project.notesAr && (
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-blue-100 dark:border-slate-800">
                  {project.notesAr}
                </p>
              )}
            </div>
          </div>

          {/* Detailed 5-Phases Breakdown List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-blue-950 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>{t('تفاصيل تقدم المراحل الإنشائية الخمس:', '5 Construction Phases Progress:')}</span>
              </h4>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('أوزان معتمدة هندسياً (إجمالي 100%)', 'Engineering standard weights (Total 100%)')}
              </span>
            </div>

            <div className="space-y-2.5">
              {phases.map((phase, idx) => {
                const info = phaseDescriptions[phase.id];
                const isCompleted = phase.status === 'completed';
                const isInProgress = phase.status === 'in_progress';

                return (
                  <div
                    key={phase.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isInProgress
                        ? 'bg-blue-50/60 dark:bg-slate-950 border-blue-400 dark:border-blue-600 shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-50/40 dark:bg-slate-950/60 border-emerald-200 dark:border-slate-800'
                        : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-6 h-6 rounded-lg text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                          style={{ backgroundColor: phase.color }}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {isAr ? phase.nameAr : phase.nameEn}
                          </h5>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {t('الوزن النسبي من المشروع:', 'Phase Weight:')} <strong className="font-mono">{phase.weightPct}%</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : isInProgress
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 animate-pulse'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {isCompleted ? t('✓ مكتملة 100%', 'Completed 100%') : isInProgress ? t('⚡ جارية ميدانياً', 'In Progress') : t('⌛ بانتظار المرحلة', 'Pending')}
                        </span>

                        <div className="text-right sm:text-left min-w-[65px]">
                          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                            {phase.progressPct}%
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            (+{phase.contributedPct}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar for this Phase */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${phase.progressPct}%`,
                          backgroundColor: phase.color
                        }}
                      />
                    </div>

                    {/* Technical Scope Description */}
                    {info && (
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                        <span>{isAr ? info.descAr : info.descEn}</span>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                          {isAr ? info.criteriaAr : info.criteriaEn}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-blue-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('محدث فضائياً وفق منصة بلدي وكود البناء السعودي SBC', 'Updated via Balady & Saudi Building Code')}</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToMap && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToMap();
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>{t('عرض الموقع بالأقمار الصناعية', 'Inspect on Map')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              {t('إغلاق', 'Close')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
