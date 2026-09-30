import React, { useState, useRef } from 'react';
import { 
  Eye, 
  Layers, 
  Sliders, 
  Compass, 
  Camera, 
  ZoomIn, 
  ZoomOut, 
  ShieldCheck, 
  Move,
  Split,
  Blend,
  RefreshCw,
  MapPin,
  FileCheck,
  Columns,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SiteHotspot {
  id: string;
  nameAr: string;
  nameEn: string;
  zoneAr: string;
  zoneEn: string;
  x: number; // % coordinates in project
  y: number; // % coordinates in project
  statusAr: 'مطابق للمخطط' | 'قيد التنفيذ والتمهيد' | 'مكتمل بنسبة 100%';
  statusEn: 'Conforms to Plan' | 'Grading & In Progress' | '100% Completed';
  statusColor: 'emerald' | 'amber' | 'sky';
  detailsAr: string;
  detailsEn: string;
  metrics: {
    plannedArea: string;
    asBuiltStatus: string;
    conformanceRate: string;
  };
}

const siteHotspots: SiteHotspot[] = [
  {
    id: 'hotspot-school',
    nameAr: 'مدرسة تعليم أساسي وملاعب رياضية',
    nameEn: 'Primary Education School & Sports Oval',
    zoneAr: 'المنطقة المركزية - القطاع التعليمي EDU-01',
    zoneEn: 'Central Sector - Educational Zone EDU-01',
    x: 40,
    y: 39,
    statusAr: 'قيد التنفيذ والتمهيد',
    statusEn: 'Grading & In Progress',
    statusColor: 'amber',
    detailsAr: 'اكتمال الهيكل الخرساني والإنشائي للمبنى المدرسي وتسوية المضمار الرياضي الأخضر وفق المخطط التنظيمي المعتمد بدقة ±2 سم.',
    detailsEn: 'Structural concrete topped out and athletic oval leveled in strict conformance with the approved CAD blueprint at ±2cm tolerance.',
    metrics: {
      plannedArea: '12,500 م²',
      asBuiltStatus: 'اكتمال الهيكل الإنشائي 78%',
      conformanceRate: '98.5%'
    }
  },
  {
    id: 'hotspot-club',
    nameAr: 'النادي الاجتماعي والرياضي والمسبح',
    nameEn: 'Social & Sports Club & Pool',
    zoneAr: 'المنطقة المركزية - القطاع الترفيهي CLB-02',
    zoneEn: 'Central Sector - Recreational Zone CLB-02',
    x: 60,
    y: 39,
    statusAr: 'قيد التنفيذ والتمهيد',
    statusEn: 'Grading & In Progress',
    statusColor: 'amber',
    detailsAr: 'تم الانتهاء من حفر وتأسيس حوض السباحة الأولمبي والمنشآت الرياضية ومطابقة مناسيب الصرف السطحي مع المخطط الكاداستري.',
    detailsEn: 'Excavation and subgrade grading of the Olympic pool and clubhouse facilities matching municipal drainage elevations.',
    metrics: {
      plannedArea: '8,400 م²',
      asBuiltStatus: 'حفر وتأسيس المسابح 65%',
      conformanceRate: '97.2%'
    }
  },
  {
    id: 'hotspot-mosque',
    nameAr: 'المسجد الجامع ومصلى العيد',
    nameEn: 'Grand Mosque & Prayer Plaza',
    zoneAr: 'قلب المجاورة - القطاع الديني MSQ-01',
    zoneEn: 'Compound Core - Religious Zone MSQ-01',
    x: 50,
    y: 57,
    statusAr: 'مكتمل بنسبة 100%',
    statusEn: '100% Completed',
    statusColor: 'emerald',
    detailsAr: 'تشييد المسجد بالرخام الأبيض مع تركيب القبة الذهبية والمئذنة وتطابق اتجاه القبلة بنسبة 100% مع حسابات المسح الجيوديسي.',
    detailsEn: 'White marble prayer hall, golden dome, and minaret fully erected with 100% Qibla alignment verified by geodetic GPS survey.',
    metrics: {
      plannedArea: '3,500 م²',
      asBuiltStatus: 'مكتمل بالكامل ومضاء',
      conformanceRate: '100%'
    }
  },
  {
    id: 'hotspot-commercial',
    nameAr: 'المركز التجاري ومول التسوق',
    nameEn: 'Commercial Center & Shopping Mall',
    zoneAr: 'القطاع التجاري الشرقي COM-01',
    zoneEn: 'Eastern Commercial Zone COM-01',
    x: 62,
    y: 56,
    statusAr: 'قيد التنفيذ والتمهيد',
    statusEn: 'Grading & In Progress',
    statusColor: 'amber',
    detailsAr: 'حفر حفرة الأساسات العميقة وتثبيت رافعة برجية وتجهيز شبكة القواعد المشتركة وفق أصول كود البناء السعودي SBC.',
    detailsEn: 'Deep foundation pit excavated with tower crane installed and mat foundation preparations underway per Saudi Building Code.',
    metrics: {
      plannedArea: '6,200 م²',
      asBuiltStatus: 'حفر الأساسات والرافعة 50%',
      conformanceRate: '96.8%'
    }
  },
  {
    id: 'hotspot-north-villas',
    nameAr: 'حلقة الفلل السكنية الشمالية (حدوة الحصان)',
    nameEn: 'North Residential Loop - Villa Clusters',
    zoneAr: 'القوس السكني الشمالي - القطع 106 إلى 113',
    zoneEn: 'Northern Arc Parcels 106 to 113',
    x: 50,
    y: 18,
    statusAr: 'مطابق للمخطط',
    statusEn: 'Conforms to Plan',
    statusColor: 'emerald',
    detailsAr: 'تطابق تام لكتل الفلل والارتدادات النظامية (4م أمامي، 2م جانبي) مع ظهور الأسقف الخرسانية والأسوار المحيطة بالصور الفضائية.',
    detailsEn: 'Full structural conformity of villa setbacks (4m front, 2m sides) with concrete slabs and perimeter fences visible in satellite imagery.',
    metrics: {
      plannedArea: '320,000 م²',
      asBuiltStatus: 'هياكل الفلل منجزة بنسبة 84%',
      conformanceRate: '99.1%'
    }
  },
  {
    id: 'hotspot-ring-road',
    nameAr: 'الطريق الحلقي الدائري والمدخل الرئيسي',
    nameEn: 'Perimeter Ring Road & Main Entry Boulevard',
    zoneAr: 'المحور الدائري بعرض 25م ومدخل الملك سلمان',
    zoneEn: 'Ring Road (25m corridor) & South Entry',
    x: 22,
    y: 65,
    statusAr: 'مكتمل بنسبة 100%',
    statusEn: '100% Completed',
    statusColor: 'emerald',
    detailsAr: 'سفلتة كاملة لطبقة الأسفلت السطحية، والبردورات، والميادين المرورية، وإنارة LED، والربط بالمحور الجنوبي بدقة ±1.2 سم.',
    detailsEn: 'Complete asphalt surface course, curb stones, roundabouts, and street illumination connected to the southern highway corridor.',
    metrics: {
      plannedArea: '4.8 كم طولي',
      asBuiltStatus: 'مسفلت بالكامل وجاهز للحركة',
      conformanceRate: '100%'
    }
  }
];

interface DigitalTwin360SectionProps {
  onRequestSubscription?: (reason: string) => void;
  isSubscriber?: boolean;
}

export const DigitalTwin360Section: React.FC<DigitalTwin360SectionProps> = ({
  onRequestSubscription
}) => {
  const { t, isAr } = useLanguage();

  // Static, built-in images (AutoCAD blueprint & Satellite as-built capture)
  const cadUrl = '/images/cad-blueprint.svg';
  const satelliteUrl = '/images/satellite-aerial.svg';

  // Comparison mode: 'split' (curtain slider) | 'blend' (opacity overlay) | 'sideBySide' (dual view)
  const [compareMode, setCompareMode] = useState<'split' | 'blend' | 'sideBySide'>('split');
  const [splitPct, setSplitPct] = useState<number>(50);
  const [blendOpacity, setBlendOpacity] = useState<number>(0.65);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);

  // Zoom & Pan
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Inspection Hotspots
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('hotspot-mosque');
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const stageContainerRef = useRef<HTMLDivElement>(null);
  const activeHotspot = siteHotspots.find(h => h.id === selectedHotspotId) || siteHotspots[0];

  // Dragging the Split Slider
  const handleSliderMove = (clientX: number) => {
    if (!stageContainerRef.current) return;
    const rect = stageContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSplitPct(pct);
  };

  const handleMouseDownOnSlider = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingSlider(true);
  };

  const handleTouchStartOnSlider = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDraggingSlider(true);
  };

  // Stage Pan Handlers
  const handleStageMouseDown = (e: React.MouseEvent) => {
    if (isDraggingSlider) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleStageMouseMove = (e: React.MouseEvent) => {
    if (isDraggingSlider) {
      handleSliderMove(e.clientX);
    } else if (isPanning) {
      setPanPosition({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleStageMouseUp = () => {
    setIsDraggingSlider(false);
    setIsPanning(false);
  };

  const handleStageTouchMove = (e: React.TouchEvent) => {
    if (isDraggingSlider && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setSplitPct(50);
  };

  return (
    <section 
      id="digital-twin-360" 
      className={`py-8 bg-gradient-to-b from-white via-sky-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 relative transition-colors ${
        isFullscreen ? 'fixed inset-0 z-50 p-4 bg-slate-950 overflow-y-auto' : ''
      }`} 
      dir={isAr ? 'rtl' : 'ltr'}
    >
      
      {/* Background Blueprint Grid Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 relative z-10 ${isFullscreen ? 'max-w-none px-2' : ''}`}>
        
        {/* SECTION HEADER */}
        {!isFullscreen && (
          <div className="text-center max-w-4xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-3 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              <span>{t('قسم مقارنة المخطط الهندسي بالواقع الفعلي', 'Plan vs Reality Comparison Section')}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">CAD vs As-Built 360°</span>
            </div>

            <h2 
              id="cad-vs-reality-heading"
              className="text-2xl sm:text-4xl lg:text-[2.65rem] font-black text-slate-900 dark:text-white tracking-tight leading-[1.25] sm:leading-[1.18] transition-all"
            >
              {t('مقارنة المخطط الهندسي بالواقع الحالي', 'Comparison of CAD Plan vs. Current Reality')}
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              {t(
                'قسم هندسي مخصص للمقارنة والمطابقة المكانية المباشرة بين المخطط التنظيمي والكاداستر (ملف الكاد) وصورة القمر الصناعي عالية الدقة للموقع على الأرض، بدون أي تعديلات أو إدخال صور إضافية.',
                'Dedicated engineering section for direct spatial comparison between the approved CAD master plan and high-resolution satellite imagery, verifying field execution.'
              )}
            </p>
          </div>
        )}

        {/* MAIN COMPARISON VIEWER PANEL */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-xl shadow-sky-500/5 border border-sky-100 dark:border-slate-800 overflow-hidden transition-colors">
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
            
            {/* View Mode Tabs (Split vs Blend vs Side-by-Side) */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setCompareMode('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  compareMode === 'split'
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={t('سلايدر الانقسام الحركي', 'Interactive Split Slider')}
              >
                <Split className="w-3.5 h-3.5" />
                <span>{t('سلايدر الانقسام', 'Split Slider')}</span>
              </button>

              <button
                onClick={() => setCompareMode('blend')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  compareMode === 'blend'
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={t('دمج شفافية المخطط فوق القمر الصناعي', 'Opacity Overlay Blend')}
              >
                <Blend className="w-3.5 h-3.5" />
                <span>{t('دمج الشفافية', 'Opacity Overlay')}</span>
              </button>

              <button
                onClick={() => setCompareMode('sideBySide')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  compareMode === 'sideBySide'
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={t('عرض الصورتين جنباً إلى جنب', 'Side-by-Side Dual View')}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>{t('جنباً إلى جنب', 'Side-by-Side')}</span>
              </button>
            </div>

            {/* Display & Inspection Controls */}
            <div className="flex items-center flex-wrap gap-2">
              
              {/* Hotspots Toggle */}
              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border text-xs cursor-pointer transition-all ${
                  showHotspots
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{showHotspots ? t('نقاط الفحص (ظاهرة)', 'Hotspots: ON') : t('نقاط الفحص (مخفية)', 'Hotspots: OFF')}</span>
              </button>

              {/* Fit Mode Toggle */}
              <button
                onClick={() => setFitMode(fitMode === 'contain' ? 'cover' : 'contain')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs cursor-pointer"
                title={t('التبديل بين العرض الكامل بدون قص وملء الشاشة', 'Toggle Uncropped Contain vs Fill')}
              >
                <Eye className="w-3.5 h-3.5 text-sky-500" />
                <span>{fitMode === 'contain' ? t('تناسب كامل (بدون قص)', 'Fit: Contain') : t('ملء الإطار (Cover)', 'Fit: Cover')}</span>
              </button>

              {/* Zoom & Reset Controls */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button 
                  onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 3.5))}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
                  title={t('تكبير (+)', 'Zoom In')}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
                  title={t('تصغير (-)', 'Zoom Out')}
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleResetView}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-emerald-600 dark:text-emerald-400 cursor-pointer"
                  title={t('إعادة ضبط الموضع والتقريب', 'Reset View')}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-sky-500 cursor-pointer"
                  title={isFullscreen ? t('إنهاء ملء الشاشة', 'Exit Fullscreen') : t('ملء الشاشة', 'Fullscreen')}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>

          </div>

          {/* Opacity slider bar if in Blend mode */}
          {compareMode === 'blend' && (
            <div className="mb-4 p-3 bg-sky-50/70 dark:bg-sky-950/40 rounded-2xl border border-sky-100 dark:border-sky-900/50 flex items-center justify-between gap-4 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Blend className="w-4 h-4 text-sky-500" />
                {t('درجة شفافية صورة المخطط الهندسي (CAD) فوق القمر الصناعي:', 'CAD Blueprint Opacity over Satellite Image:')}
              </span>
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <span className="text-[11px] text-slate-500 font-mono">0%</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={blendOpacity}
                  onChange={(e) => setBlendOpacity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold font-mono">
                  {Math.round(blendOpacity * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* COMPARISON STAGE & AUDIT SIDEBAR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 1. LEFT SIDEBAR: Selected Hotspot & Project Info (4 Cols) */}
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-sky-500" />
                    {t('نقاط المطابقة الميدانية المعتمدة', 'Verified As-Built Audit Points')}
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                    {t('مجاورة النرجس السكنية', 'Al-Narjis Residential')}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  {t('انقر على أي نقطة فحص لمعاينة مواصفات المخطط الهندسي مقابل واقع التنفيذ بالقمر الصناعي.', 'Click any audit point to view CAD specifications vs. actual satellite progress.')}
                </p>

                {/* Hotspot Selector List */}
                <div className="space-y-1.5 mb-3 max-h-[220px] overflow-y-auto no-scrollbar">
                  {siteHotspots.map((hotspot) => {
                    const isSelected = hotspot.id === selectedHotspotId;
                    return (
                      <button
                        key={hotspot.id}
                        onClick={() => setSelectedHotspotId(hotspot.id)}
                        className={`w-full text-start p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white dark:bg-slate-800 border-sky-500 shadow-sm ring-1 ring-sky-400/30'
                            : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold mb-0.5">
                          <span className={isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}>
                            {isAr ? hotspot.nameAr : hotspot.nameEn}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            hotspot.statusColor === 'emerald'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          }`}>
                            {isAr ? hotspot.statusAr : hotspot.statusEn}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {isAr ? hotspot.zoneAr : hotspot.zoneEn}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Hotspot Detailed Dossier */}
              <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 mt-2">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                    {t('تقرير الفحص والمطابقة:', 'Inspection Audit:')}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {t('نسبة المطابقة:', 'Match:')} {activeHotspot.metrics.conformanceRate}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  {isAr ? activeHotspot.detailsAr : activeHotspot.detailsEn}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="text-slate-400 block">{t('المخطط الهندسي CAD', 'CAD Blueprint')}</span>
                    <strong className="text-slate-800 dark:text-slate-100 font-mono text-xs">{activeHotspot.metrics.plannedArea}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="text-slate-400 block">{t('واقع القمر الصناعي', 'Satellite Reality')}</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">{activeHotspot.metrics.asBuiltStatus}</strong>
                  </div>
                </div>

                <button
                  onClick={() => onRequestSubscription && onRequestSubscription(t('تصدير كروكي المطابقة الكاداسترية المعتمد بصيغة DWG / PDF', 'Export certified cadastral conformance dossier in DWG / PDF'))}
                  className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer text-center"
                >
                  {t('تحميل كروكي المطابقة (DWG / PDF)', 'Download Conformance Report')}
                </button>
              </div>

            </div>

            {/* 2. RIGHT STAGE: PURE CAD & SATELLITE COMPARISON STAGE (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col">
              
              {/* Header Indicator */}
              <div className="flex items-center justify-between text-xs mb-2 px-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {compareMode === 'split' 
                      ? t('اسحب المقبض الأوسط لمقارنة المخطط بالواقع:', 'Drag Handle to Compare Plan vs Reality:')
                      : compareMode === 'blend'
                      ? t('صورة المخطط (CAD) مدمجة فوق صورة القمر الصناعي:', 'CAD Image Blended over Satellite:')
                      : t('مقارنة جنباً إلى جنب بين المخطط الهندسي والقمر الصناعي:', 'Side-by-Side CAD vs Satellite:')}
                  </span>
                  {compareMode === 'split' && (
                    <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800 font-mono">
                      CAD {Math.round(splitPct)}% | {t('القمر الصناعي', 'Satellite')} {Math.round(100 - splitPct)}%
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                  <Move className="w-3.5 h-3.5 text-sky-500" />
                  <span>{t('اسحب بالماوس للتحريك • كبّر للتفاصيل', 'Drag to pan • Zoom for details')}</span>
                </div>
              </div>

              {/* INTERACTIVE COMPARISON STAGE */}
              {compareMode !== 'sideBySide' ? (
                /* SINGLE VIEW WITH SPLIT OR BLEND */
                <div
                  ref={stageContainerRef}
                  className="relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden border-2 border-sky-200 dark:border-slate-700 select-none bg-slate-950 cursor-grab active:cursor-grabbing shadow-inner transition-colors"
                  onMouseDown={handleStageMouseDown}
                  onMouseMove={handleStageMouseMove}
                  onMouseUp={handleStageMouseUp}
                  onMouseLeave={handleStageMouseUp}
                  onTouchMove={handleStageTouchMove}
                  onTouchEnd={handleStageMouseUp}
                >
                  
                  {/* TRANSFORM CONTAINER (Synchronized Zoom & Pan) */}
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                      transformOrigin: 'center center',
                      transition: isPanning || isDraggingSlider ? 'none' : 'transform 0.15s ease-out'
                    }}
                  >
                    
                    {/* LAYER 1: SATELLITE AS-BUILT IMAGE (Underneath) */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={satelliteUrl}
                        alt={t('صورة القمر الصناعي والتصوير الجوي الفعلي', 'Satellite Aerial As-Built')}
                        className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} pointer-events-none select-none`}
                        draggable={false}
                      />

                      {/* Satellite Tag */}
                      <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} bg-slate-950/85 text-emerald-400 font-bold text-xs px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg border border-emerald-500/30 flex items-center gap-1.5 z-20`}>
                        <Camera className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t('صورة القمر الصناعي (الواقع الفعلي)', 'Satellite Imagery (Reality)')}</span>
                      </div>
                    </div>

                    {/* LAYER 2: CAD BLUEPRINT IMAGE (Clipped by Slider or Blended) */}
                    <div
                      className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center"
                      style={{
                        clipPath: compareMode === 'split'
                          ? `polygon(0% 0%, ${splitPct}% 0%, ${splitPct}% 100%, 0% 100%)`
                          : 'none',
                        opacity: compareMode === 'blend' ? blendOpacity : 1,
                        mixBlendMode: compareMode === 'blend' ? 'screen' : 'normal'
                      }}
                    >
                      <img
                        src={cadUrl}
                        alt={t('صورة المخطط الهندسي والكاداستر', 'CAD Cadastral Blueprint')}
                        className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} pointer-events-none select-none`}
                        draggable={false}
                      />

                      {/* CAD Blueprint Tag */}
                      <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} bg-slate-950/85 text-sky-400 font-bold text-xs px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg border border-sky-500/30 flex items-center gap-1.5 z-20`}>
                        <Layers className="w-3.5 h-3.5 text-sky-400" />
                        <span>{t('صورة المخطط الهندسي (ملف الكاد CAD)', 'CAD Blueprint (Plan)')}</span>
                      </div>
                    </div>

                    {/* HOTSPOT INSPECTION PINS */}
                    {showHotspots && siteHotspots.map((hotspot) => {
                      const isSelected = hotspot.id === selectedHotspotId;
                      return (
                        <div
                          key={hotspot.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHotspotId(hotspot.id);
                          }}
                          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30 pointer-events-auto"
                        >
                          <div className={`absolute -inset-2.5 rounded-full transition-all ${
                            isSelected ? 'bg-sky-400/50 animate-ping' : 'group-hover:bg-emerald-400/40'
                          }`} />

                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-xl transition-all ${
                            isSelected
                              ? 'bg-gradient-to-br from-sky-400 to-emerald-400 border-white text-slate-950 scale-125'
                              : 'bg-slate-900 border-sky-400 text-sky-300 group-hover:scale-110'
                          }`}>
                            <MapPin className="w-4 h-4" />
                          </div>

                          {/* Tooltip Label */}
                          <div className={`absolute bottom-full mb-1.5 ${isAr ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-lg transition-all ${
                            isSelected
                              ? 'bg-slate-950 text-white border border-sky-400 z-40'
                              : 'bg-slate-900/90 text-slate-300 hidden group-hover:block'
                          }`}>
                            {isAr ? hotspot.nameAr.split('-')[0] : hotspot.nameEn.split('-')[0]}
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  {/* SPLIT SLIDER CURTAIN HANDLE */}
                  {compareMode === 'split' && (
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-40 cursor-ew-resize pointer-events-auto"
                      style={{ left: `${splitPct}%` }}
                      onMouseDown={handleMouseDownOnSlider}
                      onTouchStart={handleTouchStartOnSlider}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white flex items-center justify-center shadow-2xl border-2 border-white cursor-ew-resize hover:scale-110 transition-transform">
                        <Sliders className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Compass HUD */}
                  <div className={`absolute bottom-4 ${isAr ? 'left-4' : 'right-4'} bg-slate-900/85 p-1.5 rounded-xl border border-slate-700 text-sky-400 flex items-center gap-1 text-[11px] font-mono z-20`}>
                    <Compass className="w-4 h-4 animate-spin-slow" />
                    <span>N 24°48'32" E 46°38'15"</span>
                  </div>

                  {/* Datum Info */}
                  <div className={`absolute bottom-4 ${isAr ? 'right-4' : 'left-4'} bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-white text-[10px] z-20 flex items-center gap-1.5`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('نظام إسقاط هندسي معتمد Ain El Abd UTM Zone 37N', 'Datum Reference: UTM Zone 37N')}</span>
                  </div>

                </div>
              ) : (
                /* SIDE-BY-SIDE DUAL VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-[480px] sm:h-[540px]">
                  {/* Left Box: CAD Blueprint */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-sky-400/40 bg-slate-950 flex flex-col">
                    <div className="absolute top-3 right-3 z-10 bg-slate-950/85 text-sky-400 font-bold text-xs px-2.5 py-1 rounded-xl border border-sky-500/30 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      <span>{t('صورة المخطط الهندسي (CAD)', 'CAD Master Plan')}</span>
                    </div>
                    <div className="flex-1 w-full h-full overflow-hidden flex items-center justify-center">
                      <img
                        src={cadUrl}
                        alt="CAD Master Plan"
                        className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'}`}
                      />
                    </div>
                  </div>

                  {/* Right Box: Satellite Reality */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400/40 bg-slate-900 flex flex-col">
                    <div className="absolute top-3 right-3 z-10 bg-slate-950/85 text-emerald-400 font-bold text-xs px-2.5 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>{t('صورة القمر الصناعي (الواقع الفعلي)', 'Satellite As-Built')}</span>
                    </div>
                    <div className="flex-1 w-full h-full overflow-hidden flex items-center justify-center">
                      <img
                        src={satelliteUrl}
                        alt="Satellite Aerial"
                        className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'}`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Quick Status Bar */}
              <div className="flex items-center justify-between pt-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {t('المقارنة مفعلة تلقائياً بين المخطط الهندسي وصورة القمر الصناعي للمجاورة السكنية.', 'Automated GIS comparison active between CAD blueprint and satellite capture.')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {t('التقريب:', 'Zoom:')} {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={handleResetView}
                    className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    {t('إعادة للمركز', 'Reset Pan')}
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* ENGINEERING DISCREPANCY & TELEMETRY CARDS (HUD) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
                <span>{t('مطابقة المخطط مع الواقع', 'CAD vs As-Built Compliance')}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                94.2%
              </div>
              <div className="text-[10px] text-emerald-600/90 dark:text-emerald-400/90 mt-0.5">
                {t('ضمن الحدود المسموحة (Tolerance Pass)', 'Within Allowed Tolerance')}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
                <span>{t('إنجاز شبكة الطرق والأسفلت', 'Road Network Paving')}</span>
                <span className="w-2 h-2 rounded-full bg-sky-500" />
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-sky-600 dark:text-sky-400">
                88.5%
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {t('اكتمال الطريق الحلقي والميدان', 'Ring road & roundabout completed')}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
                <span>{t('تنفيذ المرافق العامة', 'Public Services Progress')}</span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-amber-600 dark:text-amber-400">
                76.0%
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {t('المسجد مكتمل، المدرسة قيد الإنجاز', 'Mosque completed, school under construction')}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
                <span>{t('الانحراف المساحي للأوتاد', 'Geodetic Pin Deviation')}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-slate-900 dark:text-white">
                ±0.04 م
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                {t('مطابق لكود البناء السعودي SBC', 'Conforms to SBC standard')}
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default DigitalTwin360Section;
