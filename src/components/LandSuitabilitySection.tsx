import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Lock, 
  Download, 
  FileCode, 
  Search, 
  Building2, 
  Ruler, 
  Droplets, 
  Mountain, 
  ArrowUpRight,
  Maximize2,
  ShieldCheck,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { sampleLandParcels } from '../data/sigamData';
import { LandParcelSuitability, City } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface LandSuitabilitySectionProps {
  selectedCity: City | 'الكل';
  isSubscriber: boolean;
  onRequestSubscription: (reasonText: string) => void;
  onConsultEngineering: (topic: string) => void;
}

export const LandSuitabilitySection: React.FC<LandSuitabilitySectionProps> = ({
  selectedCity,
  isSubscriber,
  onRequestSubscription,
  onConsultEngineering,
}) => {
  const { t, isAr } = useLanguage();
  const [selectedPlot, setSelectedPlot] = useState<LandParcelSuitability>(sampleLandParcels[0]);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'ready' | 'conditional' | 'restricted'>('all');
  const [parcelZoom, setParcelZoom] = useState<number>(1);

  // Filter plots by city and status
  const filteredPlots = sampleLandParcels.filter(plot => {
    if (selectedCity !== 'الكل' && plot.city !== selectedCity) return false;
    if (activeFilter === 'ready') return plot.suitabilityStatus === 'صالحة للبناء فوراً';
    if (activeFilter === 'conditional') return plot.suitabilityStatus === 'صالحة مع اشتراطات معالجة تربة';
    if (activeFilter === 'restricted') return plot.suitabilityStatus === 'غير صالحة - منطقة مجرى سيل أو قيود تنظيمية';
    return true;
  });

  const handlePlotSelect = (plot: LandParcelSuitability) => {
    if (!plot.isSampleDemo && !isSubscriber) {
      onRequestSubscription(t('هذه القطعة ضمن المخططات الخاصة المحددة. للاطلاع على فحص الجسات الدقيق والإحداثيات يرجى الاشتراك في إحدى باقات عين سيجام.', 'This parcel belongs to a private subdivision. To review borehole logs, subscribe to Ayn Sigam.'));
      return;
    }
    setSelectedPlot(plot);
  };

  const handleCustomSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearchQuery.trim()) return;

    if (!isSubscriber) {
      onRequestSubscription(t(`طلب استعلام عن القطعة الخاصة / الصك [${customSearchQuery}]. فحص القطع الخاصة بالأقمار الصناعية وكود البناء متاح لمشتركي الباقات والمكاتب الهندسية.`, `Deed query [${customSearchQuery}] requested. Satellite parcel audit is available for subscribed firms.`));
      return;
    }
    alert(t(`تم العثور على الصك [${customSearchQuery}] في قاعدة بيانات عين سيجام الهندسية وتم استخراج مناسيب الموقع.`, `Deed [${customSearchQuery}] verified in Ayn Sigam cadastre database.`));
  };

  const handleDownloadPDF = () => {
    if (!isSubscriber) {
      onRequestSubscription(t('تحميل التقرير الجيوتقني وتقرير فحص التربة المعتمد (PDF) متاح لمشتركي الباقات والشركات الهندسية فقط.', 'Geotechnical borehole engineering report (PDF) is available to subscribed firms.'));
      return;
    }
    alert(t(`جاري تنزيل تقرير فحص التربة وصلاحية البناء المعتمد للقطعة ${selectedPlot.parcelNumber} بصيغة PDF عالية الدقة.`, `Downloading certified geotechnical soil audit for Parcel ${selectedPlot.parcelNumber} in PDF format.`));
  };

  const handleExportCAD = () => {
    if (!isSubscriber) {
      onRequestSubscription(t('تصدير المخططات الهندسية بصيغة CAD (DWG/DXF) والطبقات المتجهة متاح لمشتركي عين سيجام فقط.', 'Exporting CAD (DWG/DXF) & vector layers is reserved for subscribers.'));
      return;
    }
    alert(t(`جاري تصدير ملف الأوتوكاد CAD (DWG) والارتدادات للقطعة ${selectedPlot.parcelNumber}.`, `Exporting AutoCAD CAD (DWG) setbacks layer for Parcel ${selectedPlot.parcelNumber}.`));
  };

  const getStatusBadge = (status: LandParcelSuitability['suitabilityStatus']) => {
    if (status === 'صالحة للبناء فوراً') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{t('صالحة للبناء فوراً', 'Ready for Construction')}</span>
        </span>
      );
    }
    if (status === 'صالحة مع اشتراطات معالجة تربة') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
          <AlertTriangle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>{t('صالحة باشتراطات معالجة', 'Soil Remediation Required')}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
        <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        <span>{t('غير صالحة (موانع/سيول)', 'Restricted (Floodway/Utility)')}</span>
      </span>
    );
  };

  return (
    <section id="soil-suitability" className="py-12 bg-slate-50/70 dark:bg-slate-950 relative overflow-hidden transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden transition-colors">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('الفحص الهندسي والجيوتقني', 'Geotechnical & Cadastral Audit')}</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                  • {t('معايير كود البناء السعودي (SBC)', 'Saudi Building Code (SBC) Standards')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {t('فحص صلاحية الأراضي والاشتراطات الإنشائية', 'Land Suitability & Engineering Audit')}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {t(
                  'فحص فوري للقطع: الأبعاد الصافية، نسبة البناء (BCR)، قدرة تحمل التربة، وعمق المياه الجوفية.',
                  'Instant parcel audit: net dimensions, Building Coverage Ratio (BCR), soil bearing capacity, and groundwater table depth.'
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onConsultEngineering(t(`ما هي معايير فحص صلاحية الأراضي للقطعة ${selectedPlot.parcelNumber} بحي ${selectedPlot.district}؟`, `What are the geotechnical suitability criteria for parcel ${selectedPlot.parcelNumber} in ${selectedPlot.district}?`))}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-sky-200 dark:border-slate-700 text-xs font-bold shadow-xs transition-all flex items-center gap-2"
              >
                <span>{t('استشارة هندسية للقطعة', 'Consult Engineering AI')}</span>
                <ArrowUpRight className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </button>
            </div>
          </div>

          {/* Custom Private Search Bar */}
          <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800">
            <form onSubmit={handleCustomSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className={`w-4 h-4 text-slate-400 absolute ${isAr ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 pointer-events-none`} />
                <input
                  type="text"
                  value={customSearchQuery}
                  onChange={(e) => setCustomSearchQuery(e.target.value)}
                  placeholder={t('أدخل رقم صك ملكية، أو رقم قطعة خاصة، أو إحداثيات GPS (مثال: 24.8512, 46.6811)...', 'Enter deed number, parcel ID, or GPS coordinates (e.g. 24.8512, 46.6811)...')}
                  className={`w-full bg-white dark:bg-slate-800 border border-sky-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs rounded-xl ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder:text-slate-400 shadow-xs`}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold text-xs transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 shrink-0"
              >
                {!isSubscriber && <Lock className="w-3.5 h-3.5 text-white" />}
                <span>{t('فحص قطعة أرض خاصة', 'Inspect Custom Parcel')}</span>
              </button>
            </form>
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 px-1 gap-2">
              <span>{t('* الأراضي المعروضة أدناه هي نماذج استرشادية مفتوحة. فحص القطع الخاصة يتطلب اشتراكاً نشطاً.', '* The parcels below are public audit demos. Auditing private deeds requires an active license.')}</span>
              {!isSubscriber && (
                <span className="text-sky-700 dark:text-sky-300 font-bold flex items-center gap-1 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800">
                  <Lock className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                  {t('حساب تجريبي (مفعل لعرض النماذج فقط)', 'Demo Access (Sample plots unlocked)')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Parcels Browser (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-500" />
                <span>{t('قطع الأراضي المتاحة للمعاينة', 'Available Audit Parcels')}</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                ({filteredPlots.length} {t('قطعة', 'plots')})
              </span>
            </div>

            {/* Quick Filters */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-2xl text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`py-1.5 rounded-xl transition-all ${activeFilter === 'all' ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-xs' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                {t('الكل', 'All')}
              </button>
              <button
                onClick={() => setActiveFilter('ready')}
                className={`py-1.5 rounded-xl transition-all ${activeFilter === 'ready' ? 'bg-emerald-500 text-white shadow-xs' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                {t('صالحة', 'Ready')}
              </button>
              <button
                onClick={() => setActiveFilter('conditional')}
                className={`py-1.5 rounded-xl transition-all ${activeFilter === 'conditional' ? 'bg-sky-500 text-white shadow-xs' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                {t('معالجة', 'Condition')}
              </button>
              <button
                onClick={() => setActiveFilter('restricted')}
                className={`py-1.5 rounded-xl transition-all ${activeFilter === 'restricted' ? 'bg-rose-500 text-white shadow-xs' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                {t('موانع', 'Restricted')}
              </button>
            </div>

            {/* Parcels Cards */}
            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredPlots.map((plot) => {
                const isSelected = selectedPlot.id === plot.id;
                return (
                  <div
                    key={plot.id}
                    onClick={() => handlePlotSelect(plot)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 border-sky-400 dark:border-sky-500 shadow-md ring-2 ring-sky-400/20'
                        : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    {!plot.isSampleDemo && (
                      <div className={`absolute top-2 ${isAr ? 'left-2' : 'right-2'} flex items-center gap-1 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800`}>
                        <Lock className="w-3 h-3" />
                        <span>{t('خاص للمشتركين', 'Pro')}</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {t(`قطعة رقم ${plot.parcelNumber}`, `Parcel #${plot.parcelNumber}`)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{plot.district} • {plot.city}</div>
                      </div>
                      {plot.isSampleDemo && (
                        <div className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400">
                          {plot.areaM2.toLocaleString()} {t('م²', 'm²')}
                        </div>
                      )}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div>{getStatusBadge(plot.suitabilityStatus)}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {t('درجة الجاهزية:', 'Readiness:')}{' '}
                        <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{plot.suitabilityScore}/100</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Plot Engineering Card (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6 transition-colors">
            
            {/* Header of the Selected Plot */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded-md border border-sky-200 dark:border-sky-800 font-bold">
                    {selectedPlot.subdivisionCode}
                  </span>
                  <span className="text-xs text-slate-300 dark:text-slate-600">|</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{selectedPlot.permittedUsage}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {t(
                    `تفاصيل القطعة ${selectedPlot.parcelNumber} - حي ${selectedPlot.district} (${selectedPlot.city})`,
                    `Parcel #${selectedPlot.parcelNumber} Specifications - ${selectedPlot.district} (${selectedPlot.city})`
                  )}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPDF}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                  title={t('تحميل تقرير الجسات', 'Download Borehole Report')}
                >
                  {!isSubscriber && <Lock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                  <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                  <span>{t('تقرير الجسات (PDF)', 'Borehole Log (PDF)')}</span>
                </button>

                <button
                  onClick={handleExportCAD}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                  title={t('تصدير أوتوكاد', 'Export AutoCAD')}
                >
                  {!isSubscriber && <Lock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                  <FileCode className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                  <span>{t('مخطط CAD (DWG)', 'CAD Layout (DWG)')}</span>
                </button>
              </div>
            </div>

            {/* GOOGLE EARTH SATELLITE PARCEL & CADASTRE VIEWER */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 text-white relative overflow-hidden shadow-lg space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-bold text-white">
                    {t('رصد القمر الصناعي ومطابقة الكروكي المساحي', 'Satellite Basemap & Cadastre Alignment')}
                  </span>
                  {selectedPlot.coordinates && (
                    <span className="text-[10px] text-sky-400 font-mono bg-sky-950/80 border border-sky-800 px-2 py-0.5 rounded">
                      GPS: {selectedPlot.coordinates.lat.toFixed(4)}°N, {selectedPlot.coordinates.lng.toFixed(4)}°E
                    </span>
                  )}
                </div>

                {/* Single Fixed Satellite Earth Basemap Indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('صورة فضائية للأرض (خلفية ثابتة)', 'Fixed Satellite Earth Basemap')}</span>
                </div>
              </div>

              {/* Satellite Canvas Viewport */}
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center select-none">
                {selectedPlot.satelliteImageUrl && (
                  <img
                    src={selectedPlot.satelliteImageUrl}
                    alt={`Satellite imagery for parcel ${selectedPlot.parcelNumber}`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-110 transition-transform duration-500"
                    style={{ transform: `scale(${parcelZoom})` }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                {/* Cadastral Boundary & Setback Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 320">
                    <defs>
                      <pattern id="setbackHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="10" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
                      </pattern>
                    </defs>

                    {/* Street */}
                    <rect x="0" y="270" width="600" height="50" fill="#1e293b" fillOpacity="0.85" stroke="#334155" strokeWidth="1" />
                    <line x1="0" y1="295" x2="600" y2="295" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="12 8" opacity="0.6" />
                    <text x="300" y="300" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {t(`شارع عرض ${selectedPlot.streetWidthM} متر (الواجهة الرئيسية)`, `${selectedPlot.streetWidthM}m Right-of-Way (Main Street)`)}
                    </text>

                    {/* Property Boundary */}
                    <rect
                      x="140"
                      y="50"
                      width="320"
                      height="220"
                      fill="#10b981"
                      fillOpacity="0.12"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />

                    {/* Permitted Building Envelope */}
                    <rect
                      x="180"
                      y="85"
                      width="240"
                      height="150"
                      fill="url(#setbackHatch)"
                      stroke="#38bdf8"
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                    />

                    {/* Setbacks */}
                    <text x="300" y="255" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {t(`ارتداد أمامي ${selectedPlot.setbacks.front}م`, `Front Setback ${selectedPlot.setbacks.front}m`)}
                    </text>
                    <text x="300" y="75" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {t(`ارتداد خلفي ${selectedPlot.setbacks.back}م`, `Rear Setback ${selectedPlot.setbacks.back}m`)}
                    </text>
                    <text x="155" y="160" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 155 160)">
                      {t(`جانبي ${selectedPlot.setbacks.side1}م`, `Side ${selectedPlot.setbacks.side1}m`)}
                    </text>
                    <text x="445" y="160" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(90 445 160)">
                      {t(`جانبي ${selectedPlot.setbacks.side2}م`, `Side ${selectedPlot.setbacks.side2}m`)}
                    </text>

                    {/* Center Parcel Badge */}
                    <g transform="translate(300, 160)">
                      <rect x="-80" y="-22" width="160" height="44" rx="8" fill="#0f172a" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1.2" />
                      <text x="0" y="-4" fill="#38bdf8" fontSize="12" fontWeight="900" textAnchor="middle">
                        {t(`قطعة رقم ${selectedPlot.parcelNumber}`, `Parcel #${selectedPlot.parcelNumber}`)}
                      </text>
                      <text x="0" y="14" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {t(`المساحة: ${selectedPlot.areaM2.toLocaleString()} م²`, `Area: ${selectedPlot.areaM2.toLocaleString()} m²`)}
                      </text>
                    </g>
                  </svg>

                <div className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-white text-[11px] flex items-center gap-1.5 z-20`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold text-emerald-300">Satellite Cadastre Layer</span>
                </div>

                <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-white text-[11px] flex items-center gap-2 z-20`}>
                  <span className="text-slate-300">{t('الواجهة:', 'Front:')} {selectedPlot.frontageM}m</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300">{t('العمق:', 'Depth:')} {selectedPlot.depthM}m</span>
                </div>

                <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 z-20 text-white`}>
                  <button
                    onClick={() => setParcelZoom(prev => Math.min(prev + 0.25, 2.5))}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
                    title={t('تكبير', 'Zoom In')}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setParcelZoom(prev => Math.max(prev - 0.25, 0.8))}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
                    title={t('تصغير', 'Zoom Out')}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setParcelZoom(1)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
                    title={t('إعادة ضبط المقياس', 'Reset Scale')}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{t('تظهر الخريطة حدود الملكية (اللون الأخضر) مع حيز البناء النظامي والارتدادات طبقاً لكود البناء السعودي SBC.', 'Displays cadastral boundary (green) with legal building envelope and setbacks conforming to SBC.')}</span>
                <span className="text-emerald-400 font-bold">{t('مطابقة الإحداثيات: 100% معتمدة', 'GPS Cadastre Match: 100% Verified')}</span>
              </div>
            </div>

            {/* Core Metrics Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>{t('المسطح الإجمالي', 'Total Plot Area')}</span>
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {selectedPlot.areaM2.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t('م²', 'm²')}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {selectedPlot.frontageM}m × {selectedPlot.depthM}m
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t('نسبة البناء المسموحة', 'Building Ratio (BCR)')}</span>
                </div>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {selectedPlot.maxBuildingRatioPct}% <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">(BCR)</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {t('مسطح الدور الأرضي:', 'Ground footprint:')} {Math.round(selectedPlot.areaM2 * (selectedPlot.maxBuildingRatioPct / 100))} {t('م²', 'm²')}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <Compass className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>{t('تحمل التربة (الجسات)', 'Soil Bearing (Borehole)')}</span>
                </div>
                <div className="text-xl font-black text-sky-700 dark:text-sky-400 font-mono">
                  {selectedPlot.bearingCapacityKgCm2} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t('كجم/سم²', 'kg/cm²')}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                  {selectedPlot.soilType}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t('منسوب المياه الجوفية', 'Groundwater Depth')}</span>
                </div>
                <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  {selectedPlot.groundwaterDepthM} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t('متر عمق', 'm depth')}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {selectedPlot.groundwaterDepthM < 3 ? t('سطحية (تتطلب نزح)', 'Shallow (Dewatering required)') : t('آمنة وعميقة', 'Deep & Safe')}
                </div>
              </div>
            </div>

            {/* Setbacks & Building Code Section */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>{t('الارتدادات النظامية المعتمدة (كود البناء والاشتراطات البلدية)', 'Statutory Building Setbacks (SBC & Municipal Rules)')}</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-center shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400 mb-0.5">{t('الارتداد الأمامي (الشارع)', 'Front Setback')}</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{selectedPlot.setbacks.front} {t('متر', 'm')}</div>
                  <div className="text-[10px] text-slate-400">{t(`شارع عرض ${selectedPlot.streetWidthM}م`, `${selectedPlot.streetWidthM}m street`)}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-center shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400 mb-0.5">{t('الارتداد الخلفي', 'Rear Setback')}</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{selectedPlot.setbacks.back} {t('متر', 'm')}</div>
                  <div className="text-[10px] text-slate-400">{t('منور وتهوية نظامية', 'Ventilation easement')}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-center shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400 mb-0.5">{t('الارتداد الجانبي 1', 'Side Setback 1')}</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{selectedPlot.setbacks.side1} {t('متر', 'm')}</div>
                  <div className="text-[10px] text-slate-400">{t('جار جانبي', 'Neighbor lot')}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-center shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400 mb-0.5">{t('الارتداد الجانبي 2', 'Side Setback 2')}</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{selectedPlot.setbacks.side2} {t('متر', 'm')}</div>
                  <div className="text-[10px] text-slate-400">{t('جار جانبي', 'Neighbor lot')}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <span>{t('الارتفاع وعدد الأدوار المرخصة: ', 'Permitted Building Height: ')}</span>
                  <span className="font-bold text-sky-700 dark:text-sky-400">{selectedPlot.allowedFloors}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t('متوافق مع اشتراطات منصة بلدي وكود SBC', 'Compliant with Balady & SBC')}</span>
                </div>
              </div>
            </div>

            {/* Geological & Hazards Assessment */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Mountain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('تقرير الصلاحية الجيولوجية ومخاطر السيول وموانع البناء', 'Geological Hazard, Floodway & Easement Report')}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400 mb-1">{t('تقييم مخاطر السيول وتصريف الأمطار:', 'Floodway & Stormwater Risk:')}</div>
                  <div className={`font-bold flex items-center gap-1.5 ${
                    selectedPlot.floodRisk.includes('عالي') ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {selectedPlot.floodRisk.includes('عالي') ? (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                    <span>{selectedPlot.floodRisk}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {t('المنسوب عن سطح البحر:', 'Elevation Above Sea Level:')} {selectedPlot.elevationAboveSeaM}{t('م', 'm')} • {t('نسبة الانحدار:', 'Slope:')} {selectedPlot.slopePct}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div className="text-slate-500 dark:text-slate-400 mb-1">{t('الموانع التنظيمية وحرمات الخدمات:', 'Easements & Regulatory Restrictions:')}</div>
                  <div className="space-y-1">
                    {selectedPlot.regulatoryObstacles.map((obs, i) => (
                      <div key={i} className="text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                        <span className="text-sky-500 shrink-0">•</span>
                        <span>{obs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action for custom plots */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-emerald-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border border-sky-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t('هل تمتلك أرضاً خاصة وترغب في فحص صلاحيتها وارتداداتها؟', 'Do you own a private plot and wish to inspect its soil and setbacks?')}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('اربط رقم الصك أو حمّل المخطط الهندسي واحصل على تقرير فوري معتمد', 'Link your title deed number or upload CAD drawings for instant certified audit')}
                </p>
              </div>

              <button
                onClick={() => onRequestSubscription(t('فحص قطعة أرض خاصة بالصك أو المخطط الهندسي متاح لمشتركي باقات عين سيجام.', 'Private parcel audit by title deed is reserved for Ayn Sigam subscribers.'))}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold text-xs transition-all shadow-md shadow-sky-500/20 flex items-center gap-2 shrink-0"
              >
                <Lock className="w-3.5 h-3.5 text-white" />
                <span>{t('ترقية الحساب لفحص صكك الخاص', 'Upgrade Account to Audit Deed')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
