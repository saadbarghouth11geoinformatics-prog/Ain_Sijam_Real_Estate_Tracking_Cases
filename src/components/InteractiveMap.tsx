import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Layers, 
  Building, 
  Building2,
  Coins, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Zap, 
  Droplets, 
  Wifi, 
  Train, 
  ChevronLeft, 
  Eye
} from 'lucide-react';
import { DistrictInfo, City, BuildingParcel } from '../types';
import { sampleDistrictBuildings } from '../data/infrastructureData';
import { useLanguage } from '../i18n/LanguageContext';

interface InteractiveMapProps {
  districts: DistrictInfo[];
  selectedCity: City | 'الكل';
  onConsultDistrictWithAI: (districtName: string) => void;
  onOpenCalculatorForDistrict: (district: DistrictInfo) => void;
  onSelectCity?: (city: City) => void;
  onNavigateToInfrastructure?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  districts,
  selectedCity,
  onConsultDistrictWithAI,
  onOpenCalculatorForDistrict,
  onSelectCity,
  onNavigateToInfrastructure,
}) => {
  const { t, isAr } = useLanguage();
  const [mapMode, setMapMode] = useState<'saudi' | 'districts' | 'cadastre'>('districts');
  
  const [activeLayer, setActiveLayer] = useState<'residential' | 'commercial' | 'yield' | 'deals'>('residential');
  
  const [infraOverlays, setInfraOverlays] = useState<{
    electricity: boolean;
    water: boolean;
    metro: boolean;
    fiber: boolean;
    stormDrain: boolean;
  }>({
    electricity: false,
    water: false,
    metro: true,
    fiber: false,
    stormDrain: false,
  });

  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo | null>(districts[0]);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingParcel | null>(sampleDistrictBuildings[0]);
  const [filterSearch, setFilterSearch] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const filteredDistricts = districts.filter((d) => {
    const matchesCity = selectedCity === 'الكل' || d.city === selectedCity;
    const matchesSearch = d.name.includes(filterSearch) || d.city.includes(filterSearch);
    return matchesCity && matchesSearch;
  });

  const toggleInfra = (key: keyof typeof infraOverlays) => {
    setInfraOverlays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getDistrictColor = (d: DistrictInfo) => {
    if (activeLayer === 'residential') {
      if (d.avgPriceM2Residential >= 7000) return 'bg-rose-500 border-rose-600 text-white';
      if (d.avgPriceM2Residential >= 5000) return 'bg-emerald-600 border-emerald-700 text-white';
      if (d.avgPriceM2Residential >= 3500) return 'bg-teal-500 border-teal-600 text-white';
      return 'bg-blue-500 border-blue-600 text-white';
    }
    if (activeLayer === 'commercial') {
      if (d.avgPriceM2Commercial >= 15000) return 'bg-purple-600 border-purple-700 text-white';
      if (d.avgPriceM2Commercial >= 10000) return 'bg-indigo-500 border-indigo-600 text-white';
      return 'bg-amber-500 border-amber-600 text-white';
    }
    if (activeLayer === 'yield') {
      if (d.rentalYieldPct >= 7.5) return 'bg-emerald-600 border-emerald-700 text-white';
      if (d.rentalYieldPct >= 6.8) return 'bg-teal-500 border-teal-600 text-white';
      return 'bg-slate-600 border-slate-700 text-white';
    }
    if (d.dealsCountMonth >= 120) return 'bg-amber-500 border-amber-600 text-white';
    return 'bg-emerald-600 border-emerald-700 text-white';
  };

  const getLayerValueLabel = (d: DistrictInfo) => {
    if (activeLayer === 'residential') return `${d.avgPriceM2Residential.toLocaleString()} ${t('ر.س/م²', 'SAR/m²')}`;
    if (activeLayer === 'commercial') return `${d.avgPriceM2Commercial.toLocaleString()} ${t('ر.س/م²', 'SAR/m²')}`;
    if (activeLayer === 'yield') return `${d.rentalYieldPct}% ${t('عائد', 'Yield')}`;
    return `${d.dealsCountMonth} ${t('صفقة', 'Deals')}`;
  };

  const getBuildingBadgeColor = (type: BuildingParcel['type']) => {
    switch (type) {
      case 'villa':
        return 'bg-emerald-900/90 border-emerald-500 text-emerald-200';
      case 'apartment':
        return 'bg-blue-900/90 border-blue-500 text-blue-200';
      case 'commercial':
        return 'bg-amber-900/90 border-amber-500 text-amber-200';
      case 'tower':
        return 'bg-purple-900/90 border-purple-500 text-purple-200';
      case 'mosque':
        return 'bg-teal-900/90 border-teal-500 text-teal-200';
      case 'park':
        return 'bg-green-950/90 border-green-500 text-green-300';
      case 'vacant':
        return 'bg-slate-800/90 border-dashed border-slate-500 text-slate-300';
      default:
        return 'bg-slate-800 border-slate-600 text-slate-200';
    }
  };

  return (
    <section id="map-cadastre" className="py-12 bg-slate-50/50 dark:bg-slate-950/50 transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        
        {/* Map Mode Control Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 transition-colors">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setMapMode('saudi')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                mapMode === 'saudi'
                  ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              id="map-mode-saudi-btn"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('خريطة السعودية والمناطق', 'Saudi Regions Radar')}</span>
            </button>

            <button
              onClick={() => setMapMode('districts')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                mapMode === 'districts'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              id="map-mode-districts-btn"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t('تقسيم الأحياء', 'Districts')}</span>
            </button>

            <button
              onClick={() => setMapMode('cadastre')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                mapMode === 'cadastre'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              id="map-mode-cadastre-btn"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('مخطط المباني والقطع', 'Cadastre & Parcels')}</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] px-1 rounded font-black">2.5D</span>
            </button>
          </div>

          {/* Metric Layers Switcher */}
          {mapMode === 'districts' && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => setActiveLayer('residential')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  activeLayer === 'residential' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t('المتر السكني', 'Residential / m²')}
              </button>
              <button
                onClick={() => setActiveLayer('commercial')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  activeLayer === 'commercial' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t('المتر التجاري', 'Commercial / m²')}
              </button>
              <button
                onClick={() => setActiveLayer('yield')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  activeLayer === 'yield' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t('العائد الإيجاري', 'Rental Yield')}
              </button>
              <button
                onClick={() => setActiveLayer('deals')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  activeLayer === 'deals' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t('حجم الصفقات', 'Deals Count')}
              </button>
            </div>
          )}

          {/* Infrastructure Layer Toggles */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px] hidden xl:inline">
              {t('طبقات البنية التحتية:', 'Infra Overlays:')}
            </span>
            
            <button
              onClick={() => toggleInfra('metro')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1 ${
                infraOverlays.metro
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Train className="w-3 h-3" />
              <span>{t('المترو', 'Metro')}</span>
            </button>

            <button
              onClick={() => toggleInfra('electricity')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1 ${
                infraOverlays.electricity
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>{t('الكهرباء', 'Power')}</span>
            </button>

            <button
              onClick={() => toggleInfra('water')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1 ${
                infraOverlays.water
                  ? 'bg-sky-500 text-white border-sky-500 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Droplets className="w-3 h-3" />
              <span>{t('المياه', 'Water')}</span>
            </button>

            <button
              onClick={() => toggleInfra('fiber')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1 ${
                infraOverlays.fiber
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Wifi className="w-3 h-3" />
              <span>{t('الألياف', 'Fiber')}</span>
            </button>

            {onNavigateToInfrastructure && (
              <button
                onClick={onNavigateToInfrastructure}
                className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                <span>{t('مركز البنية التحتية', 'Infra Hub')}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Main Map Viewport & Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Visual Map Canvas (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 text-white relative overflow-hidden min-h-[560px] flex flex-col justify-between shadow-xl">
            
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#059669 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                backgroundPosition: '0 0, 14px 14px'
              }}
            />

            {/* Top Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">
                  {mapMode === 'saudi' && t('خريطة المملكة العربية السعودية والمناطق الإدارية', 'Kingdom of Saudi Arabia Regional Radar')}
                  {mapMode === 'districts' && (isAr ? `خريطة تقسيم أحياء: ${selectedCity === 'الكل' ? 'مدن المملكة' : selectedCity}` : `Districts Subdivision: ${selectedCity === 'الكل' ? 'All Cities' : selectedCity}`)}
                  {mapMode === 'cadastre' && (isAr ? `المخطط التنظيمي للأبنية والقطع: حي ${selectedDistrict?.name || 'النرجس'}` : `Cadastral Parcels Plan: ${selectedDistrict?.name || 'Al Narjis'}`)}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {mapMode === 'saudi' && t('(5 مناطق رئيسية)', '(5 Macro Regions)')}
                  {mapMode === 'districts' && `(${filteredDistricts.length} ${t('حي معتمد', 'Districts')})`}
                  {mapMode === 'cadastre' && `(${sampleDistrictBuildings.length} ${t('مبنى وقطعة مرخصة', 'Parcels')})`}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {/* Single Fixed Satellite Earth Basemap Indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('صورة فضائية للأرض (خلفية ثابتة)', 'Fixed Satellite Earth Basemap')}</span>
                </div>

                {mapMode !== 'districts' && (
                  <button
                    onClick={() => setMapMode('districts')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1"
                  >
                    <ChevronLeft className={`w-3.5 h-3.5 ${!isAr ? 'rotate-180' : ''}`} />
                    <span>{t('العودة للأحياء', 'Back to Districts')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* VIEW 1: SAUDI ARABIA COUNTRY MAP VIEW */}
            {mapMode === 'saudi' && (
              <div className="relative z-10 my-4 flex-1 min-h-[420px] w-full flex flex-col items-center justify-center p-2 overflow-hidden rounded-2xl">
                {/* Fixed Satellite Earth Basemap for Saudi Arabia */}
                <img
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1600&auto=format&fit=crop&q=85"
                  alt="Saudi Arabia Satellite Earth Basemap"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-85 contrast-120 pointer-events-none rounded-2xl"
                />
                <div className="relative w-full max-w-[620px] h-[380px]">
                  <div className={`absolute ${isAr ? 'right-2' : 'left-2'} top-8 text-sky-400/60 text-xs font-bold tracking-widest pointer-events-none`}>
                    {t('الخليج العربي 🌊', 'Arabian Gulf 🌊')}
                  </div>
                  <div className={`absolute ${isAr ? 'left-2' : 'right-2'} bottom-12 text-sky-400/60 text-xs font-bold tracking-widest pointer-events-none`}>
                    {t('البحر الأحمر 🌊', 'Red Sea 🌊')}
                  </div>

                  <svg viewBox="0 0 400 360" className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    <path
                      d="M 50,70 L 120,40 L 220,30 L 270,75 L 340,110 L 350,160 L 310,210 L 330,260 L 290,300 L 210,330 L 150,330 L 130,290 L 100,240 L 70,160 Z"
                      fill="#0f172a"
                      stroke="#1e293b"
                      strokeWidth="2"
                    />

                    {/* Central Region (Riyadh) */}
                    <polygon
                      points="160,110 240,95 270,170 240,240 170,220 140,150"
                      className="cursor-pointer transition-all duration-300"
                      fill={hoveredRegion === 'central-riyadh' ? '#047857' : '#065f46'}
                      fillOpacity="0.45"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      onMouseEnter={() => setHoveredRegion('central-riyadh')}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => {
                        if (onSelectCity) onSelectCity('الرياض');
                        setMapMode('districts');
                      }}
                    />

                    {/* Western Region */}
                    <polygon
                      points="80,140 140,140 160,230 120,270 90,240 70,170"
                      className="cursor-pointer transition-all duration-300"
                      fill={hoveredRegion === 'western-makkah' ? '#0284c7' : '#0369a1'}
                      fillOpacity="0.45"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      onMouseEnter={() => setHoveredRegion('western-makkah')}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => {
                        if (onSelectCity) onSelectCity('جدة');
                        setMapMode('districts');
                      }}
                    />

                    {/* Eastern Region */}
                    <polygon
                      points="245,85 320,110 335,190 275,210 240,150"
                      className="cursor-pointer transition-all duration-300"
                      fill={hoveredRegion === 'eastern-sharqiyah' ? '#7c3aed' : '#6d28d9'}
                      fillOpacity="0.45"
                      stroke="#a78bfa"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      onMouseEnter={() => setHoveredRegion('eastern-sharqiyah')}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => {
                        if (onSelectCity) onSelectCity('الدمام');
                        setMapMode('districts');
                      }}
                    />

                    {/* Northern Region */}
                    <polygon
                      points="70,75 140,45 220,35 240,85 150,105 100,120"
                      className="cursor-pointer transition-all duration-300"
                      fill="#334155"
                      fillOpacity="0.4"
                      stroke="#64748b"
                      strokeWidth="1"
                    />

                    {/* Southern Region */}
                    <polygon
                      points="125,275 175,230 230,245 200,320 145,320"
                      className="cursor-pointer transition-all duration-300"
                      fill="#334155"
                      fillOpacity="0.4"
                      stroke="#64748b"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* City Nodes */}
                  <button
                    onClick={() => {
                      if (onSelectCity) onSelectCity('الرياض');
                      setMapMode('districts');
                    }}
                    className="absolute top-[42%] left-[53%] -translate-x-1/2 -translate-y-1/2 group z-30"
                  >
                    <div className="relative flex flex-col items-center">
                      <span className="flex h-4 w-4 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-lg"></span>
                      </span>
                      <div className="mt-1 bg-slate-900/90 text-white border border-emerald-500/80 px-2 py-0.5 rounded text-xs font-black shadow-lg group-hover:scale-110 transition-transform">
                        {t('الرياض (العاصمة)', 'Riyadh (Capital)')}
                      </div>
                      <span className="text-[10px] text-emerald-300 font-mono bg-black/60 px-1 rounded mt-0.5">
                        4,280 {t('صفقة', 'deals')} • 94% {t('بنية', 'infra')}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectCity) onSelectCity('جدة');
                      setMapMode('districts');
                    }}
                    className="absolute top-[52%] left-[28%] -translate-x-1/2 -translate-y-1/2 group z-30"
                  >
                    <div className="relative flex flex-col items-center">
                      <span className="flex h-3.5 w-3.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border-2 border-white shadow-lg"></span>
                      </span>
                      <div className="mt-1 bg-slate-900/90 text-white border border-sky-500/80 px-2 py-0.5 rounded text-xs font-black shadow-lg group-hover:scale-110 transition-transform">
                        {t('جدة ومكة المكرمة', 'Jeddah & Makkah')}
                      </div>
                      <span className="text-[10px] text-sky-300 font-mono bg-black/60 px-1 rounded mt-0.5">
                        3,120 {t('صفقة', 'deals')} • 92% {t('بنية', 'infra')}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectCity) onSelectCity('الخبر');
                      setMapMode('districts');
                    }}
                    className="absolute top-[34%] left-[72%] -translate-x-1/2 -translate-y-1/2 group z-30"
                  >
                    <div className="relative flex flex-col items-center">
                      <span className="flex h-3.5 w-3.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500 border-2 border-white shadow-lg"></span>
                      </span>
                      <div className="mt-1 bg-slate-900/90 text-white border border-purple-500/80 px-2 py-0.5 rounded text-xs font-black shadow-lg group-hover:scale-110 transition-transform">
                        {t('الدمام والخبر', 'Dammam & Khobar')}
                      </div>
                      <span className="text-[10px] text-purple-300 font-mono bg-black/60 px-1 rounded mt-0.5">
                        2,450 {t('صفقة', 'deals')} • 93% {t('بنية', 'infra')}
                      </span>
                    </div>
                  </button>
                </div>

                <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-300">
                    {t('انقر على أي منطقة أو مدينة للدخول المباشر إلى تقسيم الأحياء التفصيلي والمباني.', 'Click on any city or regional polygon to zoom directly into municipal cadastral parcels.')}
                  </span>
                  <button
                    onClick={() => setMapMode('districts')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all"
                  >
                    <span>{t('استعراض الأحياء', 'Explore Districts')}</span>
                    <ChevronLeft className={`w-4 h-4 ${!isAr ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 2: DISTRICTS SUBDIVISION VIEW */}
            {mapMode === 'districts' && (
              <div className="relative z-10 my-4 flex-1 min-h-[380px] w-full border border-slate-800/60 rounded-xl bg-slate-950/60 p-4 relative flex items-center justify-center overflow-hidden">
                {/* Fixed Satellite Earth Basemap in Background */}
                <img
                  src="https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1600&auto=format&fit=crop&q=85"
                  alt="Satellite Earth Basemap"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-45 filter brightness-85 contrast-120 pointer-events-none rounded-xl"
                />
                
                <div className="absolute inset-4 border border-emerald-500/10 rounded-2xl pointer-events-none flex flex-col items-center justify-center">
                  <span className="text-slate-800 text-6xl sm:text-7xl font-black uppercase tracking-widest select-none opacity-20">
                    {selectedCity === 'الكل' ? 'SAUDI ARABIA' : selectedCity}
                  </span>
                  <span className="text-slate-800 text-xs tracking-wider opacity-40 mt-1">
                    MUNICIPAL DISTRICT SUBDIVISION GRID
                  </span>
                </div>

                {infraOverlays.metro && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
                    <line x1="42%" y1="10%" x2="44%" y2="90%" stroke="#2563eb" strokeWidth="4" strokeDasharray="8 4" />
                    <line x1="20%" y1="70%" x2="80%" y2="20%" stroke="#eab308" strokeWidth="3.5" />
                    <line x1="50%" y1="15%" x2="85%" y2="60%" stroke="#06b6d4" strokeWidth="3" strokeDasharray="4 2" />
                  </svg>
                )}

                {infraOverlays.electricity && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60">
                    <path d="M 10,40 Q 150,120 350,80 T 550,200" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 3" />
                    <circle cx="200" cy="110" r="6" fill="#f59e0b" />
                    <circle cx="380" cy="90" r="6" fill="#f59e0b" />
                  </svg>
                )}

                {infraOverlays.water && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60">
                    <path d="M 20,250 Q 200,200 400,260 T 600,230" fill="none" stroke="#0ea5e9" strokeWidth="3" />
                    <circle cx="280" cy="210" r="5" fill="#0ea5e9" />
                  </svg>
                )}

                <div className="w-full h-full relative min-h-[360px]">
                  {filteredDistricts.map((district) => {
                    const isSelected = selectedDistrict?.id === district.id;
                    const nodeColor = getDistrictColor(district);
                    const valueLabel = getLayerValueLabel(district);

                    return (
                      <button
                        key={district.id}
                        onClick={() => setSelectedDistrict(district)}
                        style={{
                          left: `${district.coordinates.x}%`,
                          top: `${district.coordinates.y}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all transform duration-200 z-20 ${
                          isSelected ? 'scale-115 z-30' : 'hover:scale-105'
                        }`}
                      >
                        <div className="relative flex flex-col items-center">
                          {isSelected && (
                            <div className="absolute -inset-2 bg-emerald-400/40 rounded-xl blur-xs animate-pulse"></div>
                          )}
                          
                          <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold shadow-md flex items-center gap-1.5 ${nodeColor} ${
                            isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950' : ''
                          }`}>
                            <span className="font-sans">{district.name}</span>
                            <span className="text-[10px] opacity-90 font-mono bg-black/30 px-1 py-0.2 rounded">
                              {valueLabel}
                            </span>
                          </div>

                          <div className={`w-1.5 h-1.5 rotate-45 -mt-0.5 ${nodeColor.split(' ')[0]}`}></div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} z-30`}>
                  <button
                    onClick={() => setMapMode('cadastre')}
                    className="bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transition-all"
                    id="zoom-to-cadastre-btn"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t(`عرض مخطط مباني حي ${selectedDistrict?.name || 'النرجس'}`, `Inspect Cadastre for ${selectedDistrict?.name || 'Al Narjis'}`)}</span>
                  </button>
                </div>

              </div>
            )}

            {/* VIEW 3: CADASTRE & DETAILED BUILDINGS VIEW */}
            {mapMode === 'cadastre' && (
              <div className="relative z-10 my-4 flex-1 min-h-[400px] w-full border border-slate-800/80 rounded-xl bg-slate-950 p-4 relative flex flex-col justify-between overflow-hidden">
                
                <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400">{t('مخطط 2450 / ق المعتمد:', 'Cadastre Plan 2450/Q:')}</span>
                    <span className="text-slate-300">{t(`حي ${selectedDistrict?.name || 'النرجس'} • بلوك 12`, `${selectedDistrict?.name || 'Al Narjis'} • Block 12`)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 inline-block"></span>
                      <span>{t('فلل', 'Villas')}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block"></span>
                      <span>{t('عماير شقق', 'Apartments')}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-amber-600 inline-block"></span>
                      <span>{t('تجاري', 'Commercial')}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-slate-600 inline-block"></span>
                      <span>{t('فضاء', 'Vacant')}</span>
                    </span>
                  </div>
                </div>

                <div className="relative flex-1 min-h-[340px] w-full my-3 border border-slate-800/60 rounded-xl bg-slate-900/40 p-2 overflow-auto relative">
                  {/* Fixed Satellite Earth Basemap in Background */}
                  <img
                    src="https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1600&auto=format&fit=crop&q=85"
                    alt="Satellite Basemap for District Cadastre"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-65 filter brightness-95 contrast-125 pointer-events-none"
                  />
                  
                  <div className="absolute top-[28%] left-0 right-0 h-4 bg-slate-800/80 border-y border-slate-700 flex items-center justify-center pointer-events-none">
                    <span className="text-[9px] text-slate-500 font-mono tracking-widest">{t('شارع عرض 20م - معتمد', 'Approved 20m Street')}</span>
                  </div>
                  <div className="absolute top-[56%] left-0 right-0 h-5 bg-slate-800/90 border-y border-slate-700 flex items-center justify-center pointer-events-none">
                    <span className="text-[9px] text-emerald-400/80 font-mono tracking-widest">{t('طريق شرياني تجاري 36م (محور رئيسي)', 'Commercial Arterial 36m')}</span>
                  </div>
                  <div className="absolute left-[54%] top-0 bottom-0 w-3.5 bg-slate-800/80 border-x border-slate-700 pointer-events-none"></div>

                  {sampleDistrictBuildings.map((bldg) => {
                    const isSelected = selectedBuilding?.id === bldg.id;
                    const badgeClasses = getBuildingBadgeColor(bldg.type);

                    return (
                      <button
                        key={bldg.id}
                        onClick={() => setSelectedBuilding(bldg)}
                        style={{
                          left: `${bldg.gridX}%`,
                          top: `${bldg.gridY}%`,
                          width: `${bldg.gridW}%`,
                          height: `${bldg.gridH}%`,
                        }}
                        className={`absolute rounded-lg border-2 p-1.5 flex flex-col justify-between text-right transition-all duration-200 z-20 group ${badgeClasses} ${
                          isSelected 
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-105 shadow-xl z-30' 
                            : 'hover:scale-102 hover:brightness-110'
                        }`}
                        id={`building-${bldg.id}`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-black font-mono tracking-tight line-clamp-1">
                            {bldg.parcelNumber}
                          </span>
                          {bldg.floors > 0 && (
                            <span className="text-[9px] bg-black/40 px-1 rounded font-mono font-bold">
                              {bldg.floors} {t('أدوار', 'F')}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 my-0.5">
                          <Building className="w-3 h-3 opacity-80" />
                          <span className="text-[9px] truncate font-bold">{bldg.typeName.split(' ')[0]}</span>
                        </div>

                        <div className="flex items-center justify-between w-full text-[8px] font-mono opacity-90 border-t border-white/10 pt-0.5">
                          <span>{bldg.areaM2} {t('م²', 'm²')}</span>
                          <span className="truncate">{bldg.status}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{t('انقر على أي مبنى أو قطعة فضاء لمعاينة الصك، رخصة البناء، التقييم، وتوصيلات المرافق.', 'Click any building or parcel to review deed, permit, valuation, and utility status.')}</span>
                  <button
                    onClick={() => setMapMode('districts')}
                    className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{t('العودة لخريطة الأحياء', 'Return to Districts Map')}</span>
                    <ChevronLeft className={`w-3 h-3 ${!isAr ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Status Ticker */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{t('تحديث فوري لأسعار الصفقات ومؤشرات النماء بالربط مع البورصة العقارية', 'Real-time sync with Real Estate General Authority (REGA) and Ministry of Justice')}</span>
              </div>
              <div className="text-slate-500 font-mono text-[11px]">
                EPSG:32637 • WGS84 Datum
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Detail Drawer (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {mapMode === 'cadastre' && selectedBuilding ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between h-full space-y-4 transition-colors">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                      {selectedBuilding.parcelNumber}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {selectedBuilding.areaM2} {t('م²', 'm²')}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    <span>{selectedBuilding.typeName}</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t(`حي ${selectedDistrict?.name || 'النرجس'} • الحالة: `, `${selectedDistrict?.name || 'Al Narjis'} • Status: `)}
                    <strong className="text-slate-800 dark:text-slate-200">{selectedBuilding.status}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('القيمة التقديرية', 'Est. Value')}</span>
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {selectedBuilding.estimatedPrice > 0 ? `${(selectedBuilding.estimatedPrice / 1000000).toFixed(2)}M` : t('مرفق خيري', 'Civic')}
                    </span>
                    <span className="text-[10px] text-slate-400 mr-1">{t('ر.س', 'SAR')}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('سعر المتر التقديري', 'Rate / m²')}</span>
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {selectedBuilding.pricePerM2 > 0 ? selectedBuilding.pricePerM2.toLocaleString() : '-'}
                    </span>
                    <span className="text-[10px] text-slate-400 mr-1">{t('ر.س/م²', 'SAR/m²')}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('عدد الأدوار', 'Floors')}</span>
                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                      {selectedBuilding.floors > 0 ? `${selectedBuilding.floors} ${t('أدوار', 'Floors')}` : t('أرض فضاء', 'Vacant Plot')}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('نسبة الإشغال', 'Occupancy')}</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {selectedBuilding.occupancyRate !== undefined ? `${selectedBuilding.occupancyRate}%` : t('كامل', '100%')}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/50 rounded-xl p-3 space-y-2">
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">
                    {t('جاهزية توصيلات البنية التحتية للعقار:', 'Property Infrastructure Readiness:')}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('كهرباء (SEC):', 'Power (SEC):')} <strong>{t('موصول', 'Connected')}</strong></span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('مياه (NWC):', 'Water (NWC):')} <strong>{t('موصول', 'Connected')}</strong></span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('صرف صحي:', 'Sewage:')} <strong>{t('موصول', 'Connected')}</strong></span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('ألياف فايبر:', 'Fiber FTTH:')} <strong>{t('موصول', 'Connected')}</strong></span>
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <button
                    onClick={() => onConsultDistrictWithAI(t(
                      `أريد تحليلاً تفصيلياً لعقار ${selectedBuilding.typeName} ${selectedBuilding.parcelNumber} بمسطح ${selectedBuilding.areaM2}م² في حي ${selectedDistrict?.name}، ما هي عوائده وإمكانات التطوير وصلاحية البناء؟`,
                      `Provide detailed geospatial and economic engineering audit for parcel ${selectedBuilding.parcelNumber} (${selectedBuilding.areaM2} m²) in ${selectedDistrict?.name}.`
                    ))}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>{t('طلب استشارة هندسية للقطعة', 'Request Parcel Engineering AI Audit')}</span>
                  </button>

                  {selectedDistrict && (
                    <button
                      onClick={() => onOpenCalculatorForDistrict(selectedDistrict)}
                      className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <Coins className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t('حساب التقييم في الحاسبة', 'Open in Valuation Calculator')}</span>
                    </button>
                  )}
                </div>
              </div>
            ) : selectedDistrict ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between h-full space-y-4 transition-colors">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800">
                      {selectedDistrict.city} • {selectedDistrict.zoneType}
                    </span>
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {selectedDistrict.yearlyChangePct}%+ {t('سنوياً', 'YoY')}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    {t(`حي ${selectedDistrict.name}`, `${selectedDistrict.name} District`)}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('بيانات معتمدة من صفقات البورصة العقارية وعقود شبكة إيجار', 'Verified REGA transactions & Ejar commercial tenancy records')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('المتر السكني', 'Residential / m²')}</span>
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {selectedDistrict.avgPriceM2Residential.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 mr-1">{t('ر.س/م²', 'SAR/m²')}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('المتر التجاري', 'Commercial / m²')}</span>
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {selectedDistrict.avgPriceM2Commercial.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 mr-1">{t('ر.س/م²', 'SAR/m²')}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('إيجار شقة (3 غرف)', '3BR Flat Rent')}</span>
                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                      {selectedDistrict.avgRentApartmentYearly.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 mr-1">{t('ر.س/سنة', 'SAR/yr')}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl p-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('العائد الإيجاري المتوقع', 'Rental Yield')}</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {selectedDistrict.rentalYieldPct}%
                    </span>
                    <span className="text-[10px] text-emerald-600 mr-1">({t('صافي', 'Net')})</span>
                  </div>
                </div>

                <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/50 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">{t('حجم الصفقات الشهرية:', 'Monthly Deals:')}</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">{selectedDistrict.dealsCountMonth} {t('صفقة', 'deals')}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">{t('مستوى الطلب والسيولة:', 'Liquidity Index:')}</span>
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">{selectedDistrict.demandLevel}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">{t('متوسط إيجار الفلل:', 'Avg Villa Rent:')}</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">{selectedDistrict.avgRentVillaYearly.toLocaleString()} {t('ر.س', 'SAR')}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    {t('أبرز المشاريع والمحاور الحيوية المجاورة:', 'Adjacent Hubs & Corridors:')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDistrict.nearbyProjects.map((proj, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700"
                      >
                        • {proj}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <button
                    onClick={() => setMapMode('cadastre')}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <Building2 className="w-4 h-4 text-amber-300" />
                    <span>{t(`معاينة مباني وقطع حي ${selectedDistrict.name}`, `View Cadastre for ${selectedDistrict.name}`)}</span>
                  </button>

                  <button
                    onClick={() => onConsultDistrictWithAI(selectedDistrict.name)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>{t(`استشارة المستشار الهندسي لحي ${selectedDistrict.name}`, `Consult Sigam AI for ${selectedDistrict.name}`)}</span>
                  </button>

                  <button
                    onClick={() => onOpenCalculatorForDistrict(selectedDistrict)}
                    className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <Coins className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t('حساب القيمة العادلة والعائد للحي', 'Compute Fair Valuation & Cap Rate')}</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                {t('اختر حياً من الخريطة لعرض مؤشراته التفصيلية', 'Select a district from the radar map to view details')}
              </div>
            )}

            {/* Quick Filter Search for Districts */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-xs transition-colors">
              <div className="relative">
                <Search className={`w-3.5 h-3.5 text-slate-400 absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
                <input
                  type="text"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  placeholder={t('ابحث عن حي محدد...', 'Search for a district...')}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs rounded-lg ${isAr ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-1.5 focus:outline-hidden focus:ring-1 focus:ring-emerald-500`}
                />
              </div>
              <div className="flex flex-wrap gap-1 mt-2 max-h-24 overflow-y-auto">
                {filteredDistricts.slice(0, 8).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDistrict(d);
                      if (mapMode === 'saudi') setMapMode('districts');
                    }}
                    className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                      selectedDistrict?.id === d.id
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
