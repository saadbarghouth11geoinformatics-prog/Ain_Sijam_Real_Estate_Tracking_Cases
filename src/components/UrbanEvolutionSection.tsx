import React, { useState } from 'react';
import { 
  History, 
  TrendingUp, 
  Layers, 
  Lock, 
  Download, 
  Building2, 
  Truck, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { urbanEvolutionTimeline } from '../data/sigamData';
import { City } from '../types';
import { GoogleEarthEvolutionMap } from './GoogleEarthEvolutionMap';
import { useLanguage } from '../i18n/LanguageContext';

interface UrbanEvolutionSectionProps {
  selectedCity: City | 'الكل';
  isSubscriber: boolean;
  onRequestSubscription: (reasonText: string) => void;
  onConsultEngineering: (topic: string) => void;
}

export const UrbanEvolutionSection: React.FC<UrbanEvolutionSectionProps> = ({
  selectedCity,
  isSubscriber,
  onRequestSubscription,
  onConsultEngineering,
}) => {
  const { t, isAr } = useLanguage();
  // Default to current month (September 2026 - index 8)
  const [currentIndex, setCurrentIndex] = useState<number>(8);

  const currentPeriod = urbanEvolutionTimeline[currentIndex] || urbanEvolutionTimeline[0];

  const handleDownloadHistoricalData = () => {
    if (!isSubscriber) {
      onRequestSubscription(t('تنزيل بيانات التطور العمراني الفضائي وصور الأقمار الصناعية عالية الدقة متاح لمشتركي عين سيجام فقط.', 'Historical satellite imagery and urban evolution data export is available to Ayn Sigam subscribers only.'));
      return;
    }
    alert(t(`جاري تنزيل حزمة بيانات التطور العمراني لحي النرجس لشهر ${currentPeriod.month} ${currentPeriod.year} بصيغة GeoTIFF & Orthomosaic.`, `Downloading Al-Narjis satellite evolution dataset package for ${currentPeriod.month} ${currentPeriod.year} in GeoTIFF & Orthomosaic formats.`));
  };

  return (
    <section id="evolution" className="py-12 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900 border border-sky-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden transition-colors">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100/80 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 flex items-center gap-1.5 shadow-xs">
                  <History className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>{t('الرصد الزمني الفضائي للأقمار الصناعية', 'Satellite Temporal Monitoring')}</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                  • {t('مقارنة شهور سنة 2026 (يناير - ديسمبر)', 'Month-by-Month Monitoring for Year 2026 (Jan - Dec)')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {t('مقارنة التطور العمراني لشهور سنة 2026', '2026 Monthly Urban Evolution & Construction Analytics')}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {t(
                  'تتبع زمني شهري دقيق لتحولات البناء والتشييد خلال عام 2026: نسب الزيادة الشهرية في مسطحات البناء، وتعداد المباني المكتملة وقيد الصب، ومعدل تواجد الآليات الثقيلة في كل شهر.',
                  'Precision monthly satellite time-lapse tracking construction progress across 2026: month-over-month built-up expansion, completed buildings vs active sites, and fleet activity index.'
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDownloadHistoricalData}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center gap-2"
              >
                {!isSubscriber && <Lock className="w-3.5 h-3.5 text-white" />}
                <Download className="w-4 h-4" />
                <span>{t('تصدير تقرير شهور 2026 (GeoTIFF)', 'Export 2026 Monthly Report (GeoTIFF)')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Time Machine Scrubber */}
        <div className="bg-slate-50/80 dark:bg-slate-900/80 border border-sky-100 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6 transition-colors">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                {t('شريط المحطة الزمنية المختارة', 'Selected Timeline Station')}
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {currentPeriod.month} {currentPeriod.year}
                </h3>
                <span className="text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-bold shadow-xs">
                  {currentPeriod.phaseTitle}
                </span>
              </div>
            </div>

            {/* Quick Date Stepper Buttons for 2026 Months */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              {urbanEvolutionTimeline.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentIndex === idx
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.month}
                </button>
              ))}
            </div>
          </div>

          {/* Continuous Range Slider for 2026 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span>{t('يناير 2026 (انطلاق الربع الأول)', 'January 2026 (Q1 Kickoff)')}</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold">
                {t('اسحب المؤشر للانتقال بين شهور سنة 2026', 'Drag scrubber to advance through 2026 months')}
              </span>
              <span>{t('ديسمبر 2026 (نهاية السنة والاكتمال)', 'December 2026 (Year-end Completion)')}</span>
            </div>
            <input
              type="range"
              min={0}
              max={urbanEvolutionTimeline.length - 1}
              step={1}
              value={currentIndex}
              onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Interactive Google Earth Satellite Map */}
          <div className="pt-1">
            <GoogleEarthEvolutionMap
              periods={urbanEvolutionTimeline}
              currentIndex={currentIndex}
              onSelectPeriodIndex={(action: any) => {
                if (typeof action === 'function') {
                  setCurrentIndex((prev) => action(prev));
                } else {
                  setCurrentIndex(action);
                }
              }}
              onConsultEngineering={onConsultEngineering}
            />
          </div>

          {/* Live Metrics for the Selected Period */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                <span>{t('نسبة البناء بالمخطط', 'Built-up Area Ratio')}</span>
                <Building2 className="w-4 h-4 text-sky-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {currentPeriod.builtUpRatioPct}%
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-bold">
                <TrendingUp className="w-3 h-3" />
                <span>{t(`نمو +${currentPeriod.expansionDeltaPct}% سنوياً`, `+${currentPeriod.expansionDeltaPct}% YoY Growth`)}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                <span>{t('إجمالي المسطحات المبنية', 'Total Built Footprint')}</span>
                <Layers className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {currentPeriod.builtUpAreaKm2} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t('كم²', 'km²')}</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {t('من أصل 26 كم² إجمالي نطاق المنطقة', 'Out of 26 km² total district boundary')}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                <span>{t('متوسط المعدات في الموقع', 'Average Fleet On-Site')}</span>
                <Truck className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400 font-mono">
                {currentPeriod.equipmentOnSiteAvg} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t('معدة', 'units')}</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {t('رافعات، حفارات، ومضخات خرسانة', 'Cranes, excavators, and concrete pumps')}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                <span>{t('الأراضي الفضاء المتبقية', 'Remaining Vacant Plots')}</span>
                <MapPin className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {currentPeriod.vacantParcelsCount.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t('قطعة', 'plots')}</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {t(
                  `مكتمل: ${currentPeriod.developedParcelsCount} • قيد البناء: ${currentPeriod.underConstructionCount}`,
                  `Completed: ${currentPeriod.developedParcelsCount} • Under Construction: ${currentPeriod.underConstructionCount}`
                )}
              </div>
            </div>

          </div>

          {/* Milestone Events for the Selected Period */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {t(
                `أبرز المحطات الموثقة في ${currentPeriod.month} ${currentPeriod.year}:`,
                `Key Documented Milestones in ${currentPeriod.month} ${currentPeriod.year}:`
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {currentPeriod.keyMilestones.map((m, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
