import React, { useState } from 'react';
import { 
  Building2, 
  Truck, 
  HardHat, 
  ShieldCheck, 
  Plus, 
  Download, 
  Lock, 
  Sparkles,
  Globe, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw
} from 'lucide-react';
import { constructionProjects } from '../data/sigamData';
import { ConstructionSiteProject, City } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ConstructionSiteManagerProps {
  selectedCity: City | 'الكل';
  isSubscriber: boolean;
  onRequestSubscription: (reasonText: string) => void;
  onConsultEngineering: (topic: string) => void;
}

export const ConstructionSiteManager: React.FC<ConstructionSiteManagerProps> = ({
  selectedCity,
  isSubscriber,
  onRequestSubscription,
  onConsultEngineering,
}) => {
  const { t, isAr } = useLanguage();
  const [selectedSite, setSelectedSite] = useState<ConstructionSiteProject>(constructionProjects[0]);
  const [siteZoom, setSiteZoom] = useState<number>(1);

  // Filter projects by city
  const filteredProjects = constructionProjects.filter(p => {
    if (selectedCity !== 'الكل' && p.city !== selectedCity) return false;
    return true;
  });

  const handleSelectSite = (site: ConstructionSiteProject) => {
    if (!site.isSampleDemo && !isSubscriber) {
      onRequestSubscription(t(
        'هذا الموقع الإنشائي خاص ومحمي بحساب اشتراك الشركة المطورة. يمكنك ترقية حسابك لإدارة وتتبع مواقعك الإنشائية الخاصة وتعداد أسطولك.',
        'This site belongs to a private developer account. Upgrade your license to manage private construction sites and live fleet tracking.'
      ));
      return;
    }
    setSelectedSite(site);
  };

  const handleAddPrivateSite = () => {
    if (!isSubscriber) {
      onRequestSubscription(t(
        'إضافة موقع إنشائي خاص بك وتتبعه بالأقمار الصناعية وحساسات IoT متاح لمشتركي باقات المقاولين والمكاتب الهندسية.',
        'Adding private job-sites with satellite orthomosaic & IoT fleet telematics is available to enterprise subscribers.'
      ));
      return;
    }
    alert(t(
      'فتح نموذج تسجيل مشروع إنشائي جديد وتحديد إحداثيات الموقع وربط مقاولي الباطن.',
      'Opening new project registration dialog, GPS polygon boundary definition, and subcontractor telemetry setup.'
    ));
  };

  const handleDownloadSiteReport = () => {
    if (!isSubscriber) {
      onRequestSubscription(t(
        'تحميل تقرير التفتيش الميداني وحصر المعدات ونسب الإنجاز بصيغة PDF معتمدة متاح للمشتركين فقط.',
        'Field inspection, machinery audit, and milestone progress report (PDF) is available to active subscribers.'
      ));
      return;
    }
    alert(t(
      `جاري تنزيل التقرير الهندسي الشامل لأسطول ومعدات مشروع ${selectedSite.name} بصيغة PDF.`,
      `Downloading comprehensive engineering fleet & milestone audit for project ${selectedSite.name} in PDF format.`
    ));
  };

  const getFleetName = (item: any) => {
    if (isAr) return item.nameAr;
    const enMap: Record<string, string> = {
      tower_cranes: 'Tower Cranes',
      excavators: 'Hydraulic Excavators',
      concrete_pumps: 'Concrete Pumps',
      dump_trucks: 'Heavy Dump Trucks',
      graders: 'Motor Graders',
      mobile_cranes: 'Mobile Cranes',
      bulldozers: 'Bulldozers',
      drilling_rigs: 'Piling / Drilling Rigs'
    };
    return enMap[item.type] || item.nameAr;
  };

  return (
    <section id="equipment-fleet" className="py-12 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900 border border-sky-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden transition-colors">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100/80 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 flex items-center gap-1.5 shadow-xs">
                  <HardHat className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>{t('إدارة التشييد وتعداد الآليات', 'Construction Management & Live Fleet Telematics')}</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                  • {t('مراقبة ميدانية وفضائية على مدار الساعة', '24/7 Field & Orbital Oversight')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {t('إدارة مواقع البناء وأسطول المعدات والآليات الحية', 'Active Job-Site Supervision & Heavy Fleet Machinery Census')}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {t(
                  'رصد حي للمشاريع قيد التنفيذ: متابعة مراحل الإنشاء، مقارنة نسب الإنجاز الفعلي بالمخطط الزمني، وحصر أعداد الرافعات البرجية والحفارات ومضخات الخرسانة في الموقع.',
                  'Live monitoring of construction projects across Saudi Arabia: phase progression tracking, planned vs. actual progress delta, and automated satellite census of tower cranes, excavators, and concrete pumps.'
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAddPrivateSite}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold text-xs transition-all shadow-md shadow-sky-500/20 flex items-center gap-2"
              >
                {!isSubscriber && <Lock className="w-3.5 h-3.5 text-white" />}
                <Plus className="w-4 h-4" />
                <span>{t('إضافة موقع إنشائي خاص بي', 'Register Private Job-Site')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Projects List vs Selected Project Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Project Selector (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-500" />
                <span>{t('المشاريع والمواقع الإنشائية', 'Monitored Construction Sites')}</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                ({filteredProjects.length} {t('موقع', 'sites')})
              </span>
            </div>

            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredProjects.map((project) => {
                const isSelected = selectedSite.id === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => handleSelectSite(project)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 border-sky-400 dark:border-sky-500 shadow-md ring-2 ring-sky-400/20'
                        : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    {!project.isSampleDemo && (
                      <div className={`absolute top-2 ${isAr ? 'left-2' : 'right-2'} flex items-center gap-1 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800`}>
                        <Lock className="w-3 h-3" />
                        <span>{t('مشروع خاص', 'Enterprise')}</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{project.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{project.district} • {project.city}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-lg">
                        {project.actualProgressPct}%
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="bg-slate-100 dark:bg-slate-700/80 px-2 py-1 rounded-lg text-[11px] text-slate-700 dark:text-slate-200 font-medium">
                        {project.currentStage}
                      </span>
                      <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold font-mono">
                        <Truck className="w-3.5 h-3.5" />
                        {project.equipmentSummary.totalUnits} {t('معدة بالموقع', 'machines on site')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Site Detail & Equipment Breakdown (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6 transition-colors">
            
            {/* Selected Site Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded-md border border-sky-200 dark:border-sky-800 font-bold">
                    {selectedSite.projectCode}
                  </span>
                  <span className="text-xs text-slate-300 dark:text-slate-600">|</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{selectedSite.projectType}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {selectedSite.name}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                  <span>{t('المطور:', 'Developer:')} <strong className="text-slate-700 dark:text-slate-200">{selectedSite.developer}</strong></span>
                  <span>•</span>
                  <span>{t('المقاول الرئيسي:', 'Main Contractor:')} <strong className="text-slate-700 dark:text-slate-200">{selectedSite.mainContractor}</strong></span>
                  <span>•</span>
                  <span>{t('الاستشاري:', 'Consultant:')} <strong className="text-slate-700 dark:text-slate-200">{selectedSite.engineeringConsultant}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadSiteReport}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  {!isSubscriber && <Lock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                  <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                  <span>{t('تقرير التفتيش (PDF)', 'Site Inspection (PDF)')}</span>
                </button>
              </div>
            </div>

            {/* Progress & Project Metrics */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t('المرحلة الحالية: ', 'Current Stage: ')}</span>
                  <span className="text-sm font-bold text-sky-700 dark:text-sky-400">{selectedSite.currentStage}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div>
                    {t('الإنجاز الفعلي:', 'Actual:')} <strong className="text-slate-900 dark:text-white text-sm font-bold">{selectedSite.actualProgressPct}%</strong>
                  </div>
                  <div>
                    {t('المخطط الزمني:', 'Planned:')} <strong className="text-slate-500 dark:text-slate-400">{selectedSite.plannedProgressPct}%</strong>
                  </div>
                  <div className={`font-bold ${selectedSite.variancePct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {selectedSite.variancePct >= 0 ? `+${selectedSite.variancePct}% ${t('متقدم', 'Ahead')}` : `${selectedSite.variancePct}% ${t('متأخر', 'Delayed')}`}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedSite.actualProgressPct}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <span>{t('مسطح الموقع: ', 'Site Boundary: ')}</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-mono">{selectedSite.siteAreaM2.toLocaleString()} {t('م²', 'm²')}</strong>
                </div>
                <div>
                  <span>{t('مسطحات البناء: ', 'Built-up Area: ')}</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-mono">{selectedSite.totalBuiltUpAreaM2.toLocaleString()} {t('م²', 'm²')}</strong>
                </div>
                <div>
                  <span>{t('العمالة بالموقع: ', 'Manpower: ')}</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-mono">{selectedSite.workforceCount} {t('كادر', 'staff')}</strong>
                </div>
                <div>
                  <span>{t('مؤشر السلامة المهنية: ', 'Safety Index: ')}</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{selectedSite.safetyScorePct}%</strong>
                </div>
              </div>
            </div>

            {/* SATELLITE & DRONE CONSTRUCTION SITE VIEWER */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 text-white relative overflow-hidden shadow-lg space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-bold text-white">
                    {t('الرصد الفضائي والميداني بالموقع (Satellite & Drone)', 'Satellite & Drone Orthomosaic Monitoring')}
                  </span>
                  {selectedSite.coordinates && (
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                      GPS: {selectedSite.coordinates.lat.toFixed(4)}°N, {selectedSite.coordinates.lng.toFixed(4)}°E
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

              {/* Viewport */}
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center select-none">
                {selectedSite.satelliteImageUrl && (
                  <img
                    src={selectedSite.satelliteImageUrl}
                    alt={`Satellite view of construction project ${selectedSite.name}`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-110 transition-transform duration-500"
                    style={{ transform: `scale(${siteZoom})` }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/40 pointer-events-none" />

                {/* Fleet and Crane Tracking Overlaid on Satellite */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 300">
                  <rect
                    x="100"
                    y="40"
                    width="400"
                    height="220"
                    fill="#38bdf8"
                    fillOpacity="0.1"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />

                    {/* Tower Cranes */}
                    <g transform="translate(180, 100)">
                      <circle r="16" fill="#f59e0b" fillOpacity="0.85" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">TC-1</text>
                      <circle r="45" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    </g>
                    <g transform="translate(360, 130)">
                      <circle r="16" fill="#f59e0b" fillOpacity="0.85" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">TC-2</text>
                      <circle r="50" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    </g>

                    {/* Heavy Fleet Markers */}
                    <g transform="translate(240, 190)">
                      <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="4" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">EX</text>
                    </g>
                    <g transform="translate(420, 200)">
                      <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="4" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">EX</text>
                    </g>
                    <g transform="translate(300, 70)">
                      <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#0284c7" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="4" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">CP</text>
                    </g>

                    <text x="300" y="250" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {t('حيز المشروع ومسارات الآليات المعتمدة', 'Approved Site Boundaries & Fleet Corridors')}
                    </text>
                  </svg>

                <div className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-white text-[11px] flex items-center gap-1.5 z-20`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold text-emerald-300">Satellite Earth Observation</span>
                </div>

                <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-white text-[11px] flex items-center gap-2 z-20`}>
                  <span className="text-slate-300">{t('المساحة:', 'Area:')} {selectedSite.siteAreaM2.toLocaleString()} {t('م²', 'm²')}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-sky-300 font-mono">{selectedSite.equipmentSummary.totalUnits} {t('معدة نشطة', 'active units')}</span>
                </div>

                <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 z-20 text-white`}>
                  <button
                    onClick={() => setSiteZoom(prev => Math.min(prev + 0.25, 2.5))}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
                    title={t('تكبير', 'Zoom In')}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSiteZoom(prev => Math.max(prev - 0.25, 0.8))}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
                    title={t('تصغير', 'Zoom Out')}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSiteZoom(1)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
                    title={t('إعادة ضبط المقياس', 'Reset Scale')}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{t('تحديث فضائي مستمر لنسب التنفيذ ومطابقة تقدم الخرسانة والواجهات بالجدول الزمني للمشروع.', 'Continuous orbital updates verifying concrete pouring & facade completion against baseline schedule.')}</span>
                <span className="text-sky-400 font-bold">{t('دقة الرصد: 30 سم / بكسل', 'Resolution: 30cm / pixel')}</span>
              </div>
            </div>

            {/* Live Machinery Fleet Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-sky-500" />
                    <span>{t('تعداد وحصر أسطول المعدات والآليات بالموقع', 'Machinery Fleet Inventory & Real-Time Census')}</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('إجمالي المعدات المرصودة: ', 'Total Fleet Census: ')}
                    <strong className="text-slate-800 dark:text-slate-200 font-mono">
                      {selectedSite.equipmentSummary.totalUnits} {t('معدة', 'units')}
                    </strong>{' '}
                    ({t(`منها ${selectedSite.equipmentSummary.activeUnits} تعمل حالياً`, `${selectedSite.equipmentSummary.activeUnits} currently active`)})
                  </p>
                </div>

                <button
                  onClick={() => onConsultEngineering(t(
                    `كيف تقيم كفاءة توزيع المعدات في مشروع ${selectedSite.name} حيث يتوفر ${selectedSite.equipmentSummary.totalUnits} معدة لمسطحات مباني ${selectedSite.totalBuiltUpAreaM2} م²؟`,
                    `How do you assess equipment allocation efficiency for project ${selectedSite.name} with ${selectedSite.equipmentSummary.totalUnits} units across ${selectedSite.totalBuiltUpAreaM2} m²?`
                  ))}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>{t('استشارة توزيع المعدات', 'Consult Fleet AI')}</span>
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                </button>
              </div>

              {/* Machinery Fleet Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedSite.equipmentSummary.fleet.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-2 hover:border-sky-300 dark:hover:border-sky-600 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{getFleetName(item)}</span>
                      <span className="text-lg font-black text-sky-600 dark:text-sky-400 font-mono">
                        {item.count} <span className="text-[10px] text-slate-400 font-normal">{t('وحدة', 'units')}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 text-[11px] text-center pt-1 border-t border-slate-200 dark:border-slate-700">
                      <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <div>{t('عاملة', 'Active')}</div>
                        <div className="font-bold font-mono text-xs">{item.activeCount}</div>
                      </div>
                      <div className="p-1 rounded-lg bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        <div>{t('متوقفة', 'Idle')}</div>
                        <div className="font-bold font-mono text-xs">{item.idleCount}</div>
                      </div>
                      <div className="p-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        <div>{t('صيانة', 'Maint.')}</div>
                        <div className="font-bold font-mono text-xs">{item.maintenanceCount}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        {t('شهادة فحص معتمدة', 'Safety Certified')}
                      </span>
                      <span className="font-mono">
                        {t('جاهزية:', 'Ready:')} {Math.round((item.activeCount / item.count) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety & Sensor Monitoring Feed */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-slate-600 dark:text-slate-300">
                  {t('الحساسات الموقعية وكاميرات الرصد الجيومكاني تعمل بحالة طبيعية (تحديث قبل 4 دقائق)', 'Job-site IoT sensors and geospatial cameras streaming nominal telematics (Updated 4 min ago)')}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono">
                <span>{t('تاريخ البدء:', 'Start:')} {selectedSite.startDate}</span>
                <span>•</span>
                <span>{t('التسليم المستهدف:', 'Target:')} {selectedSite.targetCompletionDate}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
