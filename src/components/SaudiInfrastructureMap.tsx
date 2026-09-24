import React, { useState } from 'react';
import {
  Zap,
  Droplets,
  Layers,
  Train,
  Wifi,
  ShieldAlert,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MapPin,
  CheckCircle2,
  Info,
  SlidersHorizontal,
  Navigation,
  Eye,
  Building2,
  Crosshair,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { DistrictInfrastructure } from '../types';
import { districtInfrastructuresData } from '../data/infrastructureData';

export interface UtilityElementDetail {
  id: string;
  type: 'electricity' | 'water' | 'sewage' | 'metro' | 'fiber' | 'storm';
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  specs: {
    labelAr: string;
    labelEn: string;
    value: string;
  }[];
  operatorAr: string;
  operatorEn: string;
  statusAr: string;
  statusEn: string;
  depthMeters?: number;
  capacity?: string;
  coordinates: string;
}

interface SaudiInfrastructureMapProps {
  selectedDistrict: DistrictInfrastructure;
  onSelectDistrict: (district: DistrictInfrastructure) => void;
  onConsultAI: (query: string) => void;
}

export const SaudiInfrastructureMap: React.FC<SaudiInfrastructureMapProps> = ({
  selectedDistrict,
  onSelectDistrict,
  onConsultAI,
}) => {
  const { t, isAr } = useLanguage();

  // Active overlay layers
  const [layers, setLayers] = useState({
    electricity: true,
    water: true,
    sewage: true,
    metro: true,
    fiber: false,
    storm: false,
    parcels: true,
  });

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedElement, setSelectedElement] = useState<UtilityElementDetail | null>({
    id: 'sec-substation-1',
    type: 'electricity',
    nameAr: 'محطة تحويل رئيسية 132/33 ك.ف - شمال النرجس',
    nameEn: 'Primary 132/33 kV Substation - North Al-Narjis',
    categoryAr: 'محطة كهرباء رئيسية مغذية',
    categoryEn: 'Primary Electrical Feeding Substation',
    operatorAr: 'الشركة السعودية للكهرباء (SEC)',
    operatorEn: 'Saudi Electricity Company (SEC)',
    statusAr: 'تشغيل كامل 100% ومربوطة بالشبكة الوطنية',
    statusEn: '100% Operational & Linked to National Grid',
    capacity: '120,000 KVA',
    depthMeters: 0,
    coordinates: '24°50\'44"N 46°41\'15"E',
    specs: [
      { labelAr: 'الجهد التشغيلي', labelEn: 'Operating Voltage', value: '132,000 V / 33,000 V' },
      { labelAr: 'سعة المحولات', labelEn: 'Transformer Capacity', value: '3 × 40 MVA' },
      { labelAr: 'سنة التدشين', labelEn: 'Commission Year', value: '2022' },
      { labelAr: 'نطاق الخدمة', labelEn: 'Service Coverage', value: 'حي النرجس والمخططات المجاورة' },
    ],
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Saudi focal area options
  const saudiDistricts = districtInfrastructuresData.filter(d => 
    ['النرجس', 'الملقا', 'حطين', 'الياسمين', 'الشاطئ', 'الفيصلية'].includes(d.districtName)
  );

  // Coordinate display based on current district
  const getDistrictGPS = (districtName: string) => {
    switch (districtName) {
      case 'النرجس': return { lat: '24°51\'12"N', lng: '46°41\'45"E', road: 'محور طريق الملك سلمان وطريق عثمان بن عفان' };
      case 'الملقا': return { lat: '24°48\'20"N', lng: '46°36\'15"E', road: 'محور طريق الملك فهد وطريق أنس بن مالك' };
      case 'حطين': return { lat: '24°46\'50"N', lng: '46°35\'40"E', road: 'محور بوليفارد الرياض وطريق الأمير تركي الأول' };
      case 'الياسمين': return { lat: '24°49\'30"N', lng: '46°39\'20"E', road: 'محور طريق الثمامة وطريق أبو بكر الصديق' };
      case 'الشاطئ': return { lat: '21°35\'18"N', lng: '39°06\'42"E', road: 'محور طريق الكورنيش الشمالي - جدة' };
      case 'الفيصلية': return { lat: '26°24\'10"N', lng: '50°05\'30"E', road: 'محور طريق الملك فهد - الدمام' };
      default: return { lat: '24°51\'12"N', lng: '46°41\'45"E', road: 'شمال الرياض - المملكة العربية السعودية' };
    }
  };

  const currentGPS = getDistrictGPS(selectedDistrict.districtName);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t('خريطة البنية التحتية الميدانية في المملكة', 'Saudi Infrastructure & Utility Networks Map')}</span>
            </span>
            <span className="text-slate-400 text-xs font-mono hidden sm:inline">
              🇸🇦 {selectedDistrict.city} - {t(`حي ${selectedDistrict.districtName}`, `${selectedDistrict.districtName} District`)}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
            <span>{t(`خريطة مسارات ومرافق شبكات حي ${selectedDistrict.districtName}`, `Utility Networks Map: ${selectedDistrict.districtName} District`)}</span>
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            {t(
              `رصد مباشر لخطوط الكهرباء الأرضية (SEC)، شبكة المياه (NWC)، أنابيب الصرف، مسار قطار الرياض ومحطاته، وقنوات السيول.`,
              `Direct spatial overlay of SEC power lines, NWC potable water, sewage gravity mains, Riyadh Metro corridor, and flood drainage.`
            )}
          </p>
        </div>

        {/* District Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 overflow-x-auto max-w-full">
          <span className="text-[10px] text-slate-400 px-2 font-bold whitespace-nowrap">
            {t('اختر المنطقة:', 'Select Area:')}
          </span>
          {saudiDistricts.map((d) => {
            const isCurrent = selectedDistrict.districtId === d.districtId;
            return (
              <button
                key={d.districtId}
                onClick={() => onSelectDistrict(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {t(`حي ${d.districtName} (${d.city})`, `${d.districtName} (${d.city})`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Layer Toggles & Fixed Earth Basemap Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/90 p-3 rounded-2xl border border-slate-800/90">
        
        {/* Layer Switches */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 text-xs font-bold px-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('طبقات الشبكات:', 'Network Layers:')}</span>
          </span>

          {/* Electricity */}
          <button
            onClick={() => toggleLayer('electricity')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              layers.electricity
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-xs'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('الكهرباء (SEC)', 'SEC Power')}</span>
          </button>

          {/* Water */}
          <button
            onClick={() => toggleLayer('water')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              layers.water
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 shadow-xs'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('المياه (NWC)', 'NWC Water')}</span>
          </button>

          {/* Sewage */}
          <button
            onClick={() => toggleLayer('sewage')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              layers.sewage
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/60 shadow-xs'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('الصرف الصحي', 'Sewage')}</span>
          </button>

          {/* Metro */}
          <button
            onClick={() => toggleLayer('metro')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              layers.metro
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/60 shadow-xs'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('قطار الرياض', 'Riyadh Metro')}</span>
          </button>

          {/* Fiber */}
          <button
            onClick={() => toggleLayer('fiber')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              layers.fiber
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-xs'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 text-purple-400" />
            <span>{t('الألياف والاتصالات', 'FTTH Telecom')}</span>
          </button>

          {/* Storm Drain */}
          <button
            onClick={() => toggleLayer('storm')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              layers.storm
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 shadow-xs'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>{t('تصريف السيول', 'Storm Drainage')}</span>
          </button>

          {/* Parcels Outline */}
          <button
            onClick={() => toggleLayer('parcels')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              layers.parcels
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-xs'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('قطع الأراضي', 'Cadastre Parcels')}</span>
          </button>
        </div>

        {/* Single Fixed Satellite Earth Basemap Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('صورة فضائية للأرض (خلفية ثابتة)', 'Fixed Satellite Earth Basemap')}</span>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
              className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title={t('تكبير', 'Zoom In')}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title={t('تصغير', 'Zoom Out')}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title={t('إعادة ضبط', 'Reset')}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* MAP STAGE CONTAINER */}
      <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 select-none shadow-inner flex items-center justify-center">
        
        {/* Fixed Satellite Earth Basemap Image (Saudi Arabia Desert / Urban Satellite Backdrop) */}
        <img
          src="https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1600&auto=format&fit=crop&q=85"
          alt="Saudi Arabia Satellite Earth Basemap"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-115 pointer-events-none transition-transform duration-500"
          style={{ transform: `scale(${zoomLevel})` }}
        />

        {/* Subtle grid and dark gradient vignette */}
        <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

        {/* SVG INTERACTIVE NETWORKS OVERLAY */}
        <svg
          className="absolute inset-0 w-full h-full z-10 transition-transform duration-500"
          viewBox="0 0 1000 600"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Glow filters for electric & metro lines */}
            <filter id="infraGlowGold" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="infraGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="infraGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. STREET ARTERIALS (Saudi District Structure: King Salman / Othman / Anas Bin Malik) */}
          <g id="street-corridors">
            {/* East-West King Salman Arterial Road */}
            <rect x="0" y="270" width="1000" height="50" fill="#1e2430" stroke="#334155" strokeWidth="2" opacity="0.9" />
            <line x1="0" y1="295" x2="1000" y2="295" stroke="#facc15" strokeWidth="2" strokeDasharray="14 10" opacity="0.8" />
            <text x="50" y="260" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="Cairo, sans-serif">
              {t('طريق الملك سلمان بن عبدالعزيز (محور شرياني رئيسي 80م)', 'King Salman bin Abdulaziz Road (80m Arterial Corridor)')}
            </text>

            {/* North-South Othman Bin Affan Road */}
            <rect x="520" y="0" width="46" height="600" fill="#1e2430" stroke="#334155" strokeWidth="2" opacity="0.9" />
            <line x1="543" y1="0" x2="543" y2="600" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="12 12" opacity="0.7" />
            <text x="575" y="40" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="Cairo, sans-serif">
              {t('طريق عثمان بن عفان (60م)', 'Othman Bin Affan Road (60m)')}
            </text>

            {/* Local Secondary Streets */}
            <rect x="0" y="110" width="1000" height="24" fill="#181e29" stroke="#2a3344" strokeWidth="1" opacity="0.85" />
            <rect x="0" y="440" width="1000" height="24" fill="#181e29" stroke="#2a3344" strokeWidth="1" opacity="0.85" />
            <rect x="180" y="0" width="22" height="600" fill="#181e29" stroke="#2a3344" strokeWidth="1" opacity="0.85" />
            <rect x="820" y="0" width="22" height="600" fill="#181e29" stroke="#2a3344" strokeWidth="1" opacity="0.85" />
          </g>

          {/* 2. CADASTRAL PARCEL GRID (Plots in District) */}
          {layers.parcels && (
            <g id="district-parcels" opacity="0.45">
              {/* Block 1 (Top Left) */}
              {Array.from({ length: 12 }).map((_, i) => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                return (
                  <rect
                    key={`b1-${i}`}
                    x={25 + col * 35}
                    y={25 + row * 24}
                    width="30"
                    height="20"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />
                );
              })}
              {/* Block 2 (Top Right) */}
              {Array.from({ length: 15 }).map((_, i) => {
                const col = i % 5;
                const row = Math.floor(i / 5);
                return (
                  <rect
                    key={`b2-${i}`}
                    x={580 + col * 44}
                    y={25 + row * 24}
                    width="38"
                    height="20"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />
                );
              })}
              {/* Block 3 (Bottom Left) */}
              {Array.from({ length: 16 }).map((_, i) => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                return (
                  <rect
                    key={`b3-${i}`}
                    x={25 + col * 35}
                    y={340 + row * 24}
                    width="30"
                    height="20"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />
                );
              })}
              {/* Block 4 (Bottom Right) */}
              {Array.from({ length: 20 }).map((_, i) => {
                const col = i % 5;
                const row = Math.floor(i / 5);
                return (
                  <rect
                    key={`b4-${i}`}
                    x={580 + col * 44}
                    y={340 + row * 24}
                    width="38"
                    height="20"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />
                );
              })}
            </g>
          )}

          {/* 3. STORM DRAINAGE & WADI CHANNELS LAYER (Rose / Red) */}
          {layers.storm && (
            <g id="storm-drain-layer">
              <path
                d="M 0,490 Q 300,530 600,490 T 1000,510"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="7"
                strokeOpacity="0.85"
              />
              <path
                d="M 545,600 L 545,490"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="5"
                strokeOpacity="0.85"
                strokeDasharray="8 4"
              />
              <circle
                cx="545"
                cy="490"
                r="10"
                fill="#f43f5e"
                stroke="#ffffff"
                strokeWidth="2"
                className="cursor-pointer hover:scale-125 transition-transform"
                onClick={() => setSelectedElement({
                  id: 'storm-box-culvert',
                  type: 'storm',
                  nameAr: 'قناة تصريف مياه أمطار صندوقية - وادي السلي/حنيفة',
                  nameEn: 'Engineered Stormwater Box Culvert System',
                  categoryAr: 'منشأة هيدروليكية لدرء السيول',
                  categoryEn: 'Hydraulic Flood Runoff Facility',
                  operatorAr: 'أمانة منطقة الرياض / وزارة البيئة',
                  operatorEn: 'Riyadh Municipality / MEWA',
                  statusAr: 'آمن ونشط لاستيعاب تدفق 100 عام هيدرولوجي',
                  statusEn: 'Certified Safe for 100-Year Storm Runoff',
                  capacity: '45 م³/ثانية',
                  depthMeters: 4.5,
                  coordinates: '24°50\'25"N 46°41\'30"E',
                  specs: [
                    { labelAr: 'أبعاد العبّارة', labelEn: 'Culvert Dimensions', value: '3.0م × 2.5م خرسانة مسلحة' },
                    { labelAr: 'المصب النهائي', labelEn: 'Outfall', value: 'حوض تهدئة وادي السلي' },
                    { labelAr: 'حساسات التدفق', labelEn: 'Telemetry Sensors', value: 'رصد إلكتروني للمنسوب 24/7' },
                  ]
                })}
              />
              <text x="700" y="480" fill="#fda4af" fontSize="10" fontWeight="bold">
                {t('مجرى تصريف السيول والأمطار المعتمد', 'Certified Engineered Stormwater Canal')}
              </text>
            </g>
          )}

          {/* 4. SANITARY SEWAGE SYSTEM (Teal) */}
          {layers.sewage && (
            <g id="sewage-network-layer">
              {/* Gravity Trunk Sewer along local street */}
              <path
                d="M 10,430 L 520,430 L 520,600"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="4"
                strokeDasharray="6 3"
              />
              <path
                d="M 565,430 L 990,430"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="4"
                strokeDasharray="6 3"
              />
              {/* Manhole nodes */}
              {[100, 250, 400, 700, 850].map((x, idx) => (
                <circle
                  key={`mh-${idx}`}
                  cx={x}
                  cy={430}
                  r="5"
                  fill="#0d9488"
                  stroke="#ccfbf1"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setSelectedElement({
                    id: `sewage-mh-${idx}`,
                    type: 'sewage',
                    nameAr: `غرفة تفتيش صرف صحي رئيسية رقم MH-${idx + 101}`,
                    nameEn: `Sanitary Sewer Inspection Manhole MH-${idx + 101}`,
                    categoryAr: 'شبكة انحدار صرف صحي عميق',
                    categoryEn: 'Gravity Sewer Trunk Manhole',
                    operatorAr: 'شركة المياه الوطنية (NWC)',
                    operatorEn: 'National Water Company (NWC)',
                    statusAr: 'مربوطة بنظام الجمع والتدفق الآلي',
                    statusEn: 'Connected to Automated Collector',
                    capacity: 'قطر 600 ملم GRP',
                    depthMeters: 3.8,
                    coordinates: '24°50\'38"N 46°41\'22"E',
                    specs: [
                      { labelAr: 'عمق الغرفة', labelEn: 'Manhole Depth', value: '3.8 أمتار' },
                      { labelAr: 'مادة الأنبوب', labelEn: 'Pipe Material', value: 'ألياف زجاجية مقواة (GRP)' },
                      { labelAr: 'محطة المعالجة', labelEn: 'Treatment Facility', value: selectedDistrict.sewage.treatmentZone },
                    ]
                  })}
                />
              ))}
              <text x="120" y="420" fill="#5eead4" fontSize="10" fontWeight="bold">
                {t('خط انحدار الصرف الصحي الرئيسي (عمق 3.8م)', 'Gravity Trunk Sewer Line (3.8m Depth)')}
              </text>
            </g>
          )}

          {/* 5. POTABLE WATER NETWORK (Sky Blue) */}
          {layers.water && (
            <g id="potable-water-layer">
              {/* Primary Trunk Line along Othman Bin Affan Road */}
              <path
                d="M 530,0 L 530,600"
                fill="none"
                stroke="#0284c7"
                strokeWidth="5"
                strokeOpacity="0.9"
              />
              {/* Branch loops across King Salman */}
              <path
                d="M 0,285 L 520,285"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
              />
              <path
                d="M 565,285 L 1000,285"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
              />
              {/* Pressure Valve PRV Station */}
              <g
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setSelectedElement({
                  id: 'nwc-prv-valve',
                  type: 'water',
                  nameAr: 'محطة تخفيض الضغط ومحبس العزل الرئيسي PRV-04',
                  nameEn: 'Pressure Reducing Valve (PRV-04) & Isolation Station',
                  categoryAr: 'محطة تنظيم ضغوط شبكة المياه',
                  categoryEn: 'Water Pressure Regulation Station',
                  operatorAr: 'شركة المياه الوطنية (NWC)',
                  operatorEn: 'National Water Company (NWC)',
                  statusAr: 'ضغط مستقر 3.8 بار مع تدفق مستمر 24/7',
                  statusEn: 'Stable 3.8 Bar with 24/7 Continuous Flow',
                  capacity: 'قطر 500 ملم حديد دكتايل',
                  depthMeters: 1.8,
                  coordinates: '24°50\'55"N 46°41\'48"E',
                  specs: [
                    { labelAr: 'الضغط التشغيلي', labelEn: 'Operating Pressure', value: '3.8 بار منتظم' },
                    { labelAr: 'مصدر المياه', labelEn: 'Water Source', value: selectedDistrict.water.waterSource },
                    { labelAr: 'مادة الأنبوب', labelEn: 'Pipe Material', value: 'حديد مطيلي عالي الضغط (Ductile Iron)' },
                    { labelAr: 'التحكم عن بُعد', labelEn: 'SCADA Telemetry', value: 'موصول بنظام سكادا الوطني للمياه' },
                  ]
                })}
              >
                <rect x="522" y="278" width="16" height="16" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" rx="3" />
                <circle cx="530" cy="286" r="4" fill="#38bdf8" />
              </g>

              {/* District Storage Reservoir Tank */}
              <g
                transform="translate(860, 60)"
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setSelectedElement({
                  id: 'nwc-reservoir',
                  type: 'water',
                  nameAr: 'خزان المياه الاستراتيجي التشغيلي لقطاع النرجس',
                  nameEn: 'Operational Strategic Water Reservoir',
                  categoryAr: 'خزان مياه خرساني علوي واستراتيجي',
                  categoryEn: 'Elevated & Ground Strategic Reservoir',
                  operatorAr: 'شركة المياه الوطنية (NWC)',
                  operatorEn: 'National Water Company (NWC)',
                  statusAr: 'ممتلئ بنسبة 94% وجاهز للطوارئ',
                  statusEn: '94% Storage Capacity - Emergency Ready',
                  capacity: '50,000 م³',
                  coordinates: '24°51\'20"N 46°42\'10"E',
                  specs: [
                    { labelAr: 'سعة التخزين', labelEn: 'Storage Capacity', value: '50,000 متر مكعب' },
                    { labelAr: 'الضغط الهيدروليكي', labelEn: 'Hydraulic Head', value: '45 متراً' },
                    { labelAr: 'التغذية', labelEn: 'Feeder', value: 'خط أنابيب التحلية المباشر' },
                  ]
                })}
              >
                <circle cx="25" cy="25" r="24" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="25" cy="25" r="14" fill="#0284c7" stroke="#bae6fd" strokeWidth="1" strokeDasharray="3 2" />
                <text x="25" y="28" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">NWC</text>
              </g>
              <text x="820" y="125" fill="#7dd3fc" fontSize="10" fontWeight="bold">
                {t('خزان المياه الاستراتيجي (50,000 م³)', 'Strategic Water Reservoir')}
              </text>
            </g>
          )}

          {/* 6. HIGH-VOLTAGE ELECTRICAL GRID (Amber / Gold) */}
          {layers.electricity && (
            <g id="electricity-grid-layer">
              {/* 132kV Underground Feeder Cable */}
              <path
                d="M 0,305 L 1000,305"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4.5"
                filter="url(#infraGlowGold)"
              />
              <path
                d="M 555,0 L 555,600"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.5"
                strokeDasharray="10 5"
              />

              {/* Substation 132/33kV Icon */}
              <g
                transform="translate(340, 240)"
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setSelectedElement({
                  id: 'sec-substation-1',
                  type: 'electricity',
                  nameAr: 'محطة تحويل رئيسية 132/33 ك.ف - شمال النرجس',
                  nameEn: 'Primary 132/33 kV Substation - North Al-Narjis',
                  categoryAr: 'محطة كهرباء رئيسية مغذية',
                  categoryEn: 'Primary Electrical Feeding Substation',
                  operatorAr: 'الشركة السعودية للكهرباء (SEC)',
                  operatorEn: 'Saudi Electricity Company (SEC)',
                  statusAr: 'تشغيل كامل 100% ومربوطة بالشبكة الوطنية',
                  statusEn: '100% Operational & Linked to National Grid',
                  capacity: `${selectedDistrict.electricity.substationCapacityKVA.toLocaleString()} KVA`,
                  depthMeters: 0,
                  coordinates: '24°50\'44"N 46°41\'15"E',
                  specs: [
                    { labelAr: 'الجهد التشغيلي', labelEn: 'Operating Voltage', value: '132,000 V / 33,000 V' },
                    { labelAr: 'سعة المحولات', labelEn: 'Transformer Capacity', value: '3 × 40 MVA' },
                    { labelAr: 'سنة التدشين', labelEn: 'Commission Year', value: '2022' },
                    { labelAr: 'نطاق الخدمة', labelEn: 'Service Coverage', value: 'حي النرجس والمخططات المجاورة' },
                  ],
                })}
              >
                <rect x="0" y="0" width="34" height="26" fill="#78350f" stroke="#fbbf24" strokeWidth="2" rx="4" />
                <path d="M 17,4 L 10,14 L 18,14 L 15,22 L 24,11 L 17,11 Z" fill="#fbbf24" />
              </g>
              <text x="310" y="232" fill="#fde047" fontSize="10" fontWeight="bold">
                {t('محطة تحويل رئيسية SEC (132/33 ك.ف)', 'Primary Substation (132/33 kV)')}
              </text>

              {/* Secondary Distribution Ring Main Units (RMU) */}
              {[120, 240, 680, 840].map((rx, i) => (
                <g
                  key={`rmu-${i}`}
                  transform={`translate(${rx}, 100)`}
                  className="cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setSelectedElement({
                    id: `sec-rmu-${i}`,
                    type: 'electricity',
                    nameAr: `كابينة توزيع كهربائي مغذية للمباني RMU-${i + 1}`,
                    nameEn: `Ring Main Unit (RMU-${i + 1}) Compact Substation`,
                    categoryAr: 'كابينة توزيع جهد منخفض للمنازل',
                    categoryEn: 'Low-Voltage Neighborhood Distribution Cabinet',
                    operatorAr: 'الشركة السعودية للكهرباء (SEC)',
                    operatorEn: 'Saudi Electricity Company (SEC)',
                    statusAr: 'محملة بنسبة 55% - متاح طلب عدادات فورية',
                    statusEn: '55% Load Factor - Immediate Meters Available',
                    capacity: '1,500 KVA',
                    coordinates: '24°51\'05"N 46°41\'20"E',
                    specs: [
                      { labelAr: 'الجهد المنخفض', labelEn: 'Low Voltage', value: '230/400 V (كود البناء الجديد)' },
                      { labelAr: 'العدادات المغذاة', labelEn: 'Connected Meters', value: '48 عداد ذكي' },
                      { labelAr: 'نسبة التحميل', labelEn: 'Load Factor', value: '55% (فائقة الاستقرار)' },
                    ]
                  })}
                >
                  <rect x="0" y="0" width="14" height="12" fill="#b45309" stroke="#fef08a" strokeWidth="1" rx="2" />
                  <circle cx="7" cy="6" r="2.5" fill="#fde047" />
                </g>
              ))}
            </g>
          )}

          {/* 7. RIYADH METRO VIADUCT & STATIONS (Blue / Yellow Line) */}
          {layers.metro && (
            <g id="metro-network-layer">
              {/* Elevated Viaduct Track Corridor (North-South on Othman / Yellow Line L4) */}
              <path
                d="M 545,0 L 545,600"
                fill="none"
                stroke="#eab308"
                strokeWidth="8"
                strokeDasharray="16 4"
                filter="url(#infraGlowBlue)"
              />
              {/* Track center rails */}
              <line x1="542" y1="0" x2="542" y2="600" stroke="#ffffff" strokeWidth="1" strokeDasharray="8 6" opacity="0.8" />
              <line x1="548" y1="0" x2="548" y2="600" stroke="#ffffff" strokeWidth="1" strokeDasharray="8 6" opacity="0.8" />

              {/* Metro Station 1: King Salman Intersection Station */}
              <g
                transform="translate(520, 265)"
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedElement({
                  id: 'metro-narjis-station',
                  type: 'metro',
                  nameAr: 'محطة النرجس - تقاطع طريق الملك سلمان (قطار الرياض L4)',
                  nameEn: 'Al-Narjis Interchange Station (Riyadh Metro L4)',
                  categoryAr: 'محطة نقل ركاب علوية ذكية',
                  categoryEn: 'Elevated Rapid Transit Metro Station',
                  operatorAr: 'الهيئة الملكية لمدينة الرياض (RCRC)',
                  operatorEn: 'Royal Commission for Riyadh City (RCRC)',
                  statusAr: 'تشغيل تجاري كامل مع مواقف Park & Ride وحافلات الرياض',
                  statusEn: 'Fully Operational with Park & Ride & Feeder Bus',
                  capacity: '14,000 راكب / ساعة',
                  coordinates: '24°50\'52"N 46°41\'42"E',
                  specs: [
                    { labelAr: 'المسار', labelEn: 'Metro Line', value: 'المسار الأصفر (L4) - محور المطار و KAFD' },
                    { labelAr: 'مواقف السيارات', labelEn: 'Park & Ride Spaces', value: '600 موقف مجهز بشواحن EV' },
                    { labelAr: 'زمن التقاطر', labelEn: 'Headway Interval', value: '3.5 دقيقة في أوقات الذروة' },
                    { labelAr: 'ربط الحافلات', labelEn: 'Bus Feeder', value: '3 مسارات حافلات تغذية سريعة' },
                  ]
                })}
              >
                {/* 400m and 800m Pedestrian Catchment Buffer Rings */}
                <circle cx="25" cy="25" r="90" fill="#3b82f6" fillOpacity="0.08" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4 3" />
                <circle cx="25" cy="25" r="160" fill="#3b82f6" fillOpacity="0.04" stroke="#3b82f6" strokeWidth="1" strokeDasharray="6 4" />
                
                {/* Station Box */}
                <rect x="0" y="5" width="50" height="40" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2.5" rx="8" />
                <rect x="6" y="11" width="38" height="12" fill="#3b82f6" rx="2" />
                <text x="25" y="20" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">METRO</text>
                <circle cx="14" cy="33" r="4" fill="#fbbf24" />
                <circle cx="36" cy="33" r="4" fill="#fbbf24" />
              </g>

              {/* Station Label & Catchment Notes */}
              <text x="470" y="255" fill="#93c5fd" fontSize="11" fontWeight="black" textAnchor="end">
                {t('محطة قطار الرياض (طريق الملك سلمان)', 'Riyadh Metro Station (King Salman Interchange)')}
              </text>
              <text x="420" y="380" fill="#60a5fa" fontSize="9" opacity="0.8" textAnchor="middle">
                {t('نطاق المشي 400 متر (5 دقائق)', '400m Walking Catchment (5 min)')}
              </text>
            </g>
          )}

          {/* 8. FTTH FIBER OPTICS & 5G TELECOM LAYER (Purple) */}
          {layers.fiber && (
            <g id="fiber-telecom-layer">
              <path
                d="M 0,122 L 1000,122"
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
                strokeDasharray="8 4"
              />
              <path
                d="M 190,0 L 190,600"
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
                strokeDasharray="8 4"
              />
              {/* 5G Smart Pole Tower */}
              <g
                transform="translate(180, 260)"
                className="cursor-pointer hover:scale-125 transition-transform"
                onClick={() => setSelectedElement({
                  id: 'telecom-5g-tower',
                  type: 'fiber',
                  nameAr: 'برج اتصالات ذكي وشبكة ألياف ضوئية FTTH مدمجة',
                  nameEn: '5G Smart Pole & Gigabit FTTH Fiber Hub',
                  categoryAr: 'بنية اتصالات متقدمة وإنترنت عريض النطاق',
                  categoryEn: 'Broadband Telecommunications Infrastructure',
                  operatorAr: 'stc / موبايلي / زين',
                  operatorEn: 'stc / Mobily / Zain Multi-tenant',
                  statusAr: 'تغطية 5G Advanced كاملة وسرعات تصل إلى 1 غيغابت',
                  statusEn: 'Full 5G Advanced & Gigabit Fiber Ready',
                  capacity: '10 Gbps Backbone',
                  coordinates: '24°50\'50"N 46°41\'05"E',
                  specs: [
                    { labelAr: 'سرعة الألياف', labelEn: 'FTTH Speed', value: 'حتى 1000 ميغابت/ثانية' },
                    { labelAr: 'ترددات 5G', labelEn: '5G Bands', value: 'Sub-6GHz + mmWave' },
                    { labelAr: 'الخدمات الذكية', labelEn: 'Smart City Features', value: 'كاميرات مراقبة وحساسات إنارة' },
                  ]
                })}
              >
                <circle cx="10" cy="10" r="16" fill="#7e22ce" fillOpacity="0.25" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
                <rect x="8" y="2" width="4" height="20" fill="#a855f7" rx="1" />
                <circle cx="10" cy="4" r="5" fill="#d8b4fe" />
              </g>
              <text x="215" y="265" fill="#e9d5ff" fontSize="10" fontWeight="bold">
                {t('مسار الألياف الضوئية STC/Mobily FTTH', 'FTTH Fiber Optic Corridor')}
              </text>
            </g>
          )}

        </svg>

        {/* Floating Top Left Telemetry HUD */}
        <div className={`absolute top-3.5 ${isAr ? 'right-3.5' : 'left-3.5'} bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/80 text-white text-xs z-20 space-y-1 shadow-lg`}>
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">
              {selectedDistrict.city} • {t(`حي ${selectedDistrict.districtName}`, `${selectedDistrict.districtName} District`)}
            </span>
          </div>
          <div className="text-[11px] font-mono text-emerald-300">
            {currentGPS.lat}, {currentGPS.lng}
          </div>
          <div className="text-[10px] text-slate-400 max-w-[200px] truncate">
            {currentGPS.road}
          </div>
        </div>

        {/* Floating Top Right District Readiness Score Badge */}
        <div className={`absolute top-3.5 ${isAr ? 'left-3.5' : 'right-3.5'} bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 text-white text-xs z-20 flex items-center gap-2.5 shadow-lg`}>
          <div>
            <span className="text-[10px] text-slate-400 block">{t('مؤشر الجاهزية', 'Readiness Index')}</span>
            <span className="text-base font-black text-emerald-400 font-mono">{selectedDistrict.readinessScore}%</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
        </div>

        {/* Bottom Legend Overlay */}
        <div className="absolute bottom-3 inset-x-3 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-white text-[11px] z-20 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400 font-bold">{t('دليل الألوان:', 'Color Legend:')}</span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-amber-400 inline-block"></span>
              <span>{t('كهرباء 132/33 ك.ف', '132/33 kV Power')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-sky-400 inline-block"></span>
              <span>{t('مياه صالحة للشرب', 'Potable Water')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-teal-400 inline-block"></span>
              <span>{t('صرف صحي', 'Sewage')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-yellow-400 inline-block"></span>
              <span>{t('مسار قطار الرياض', 'Riyadh Metro Line')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-rose-400 inline-block"></span>
              <span>{t('قنوات السيول والأمطار', 'Storm Runoff')}</span>
            </span>
          </div>

          <div className="text-[10px] text-slate-400">
            {t('انقر على أي محطة أو مسار لعرض بطاقة المواصفات الهندسية الفورية', 'Click any node or conduit to inspect certified engineering specs')}
          </div>
        </div>
      </div>

      {/* SELECTED UTILITY ELEMENT INSPECTOR CARD */}
      {selectedElement && (
        <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-emerald-500/40 shadow-xl space-y-4 transition-all">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                selectedElement.type === 'electricity' ? 'bg-amber-600' :
                selectedElement.type === 'water' ? 'bg-sky-600' :
                selectedElement.type === 'sewage' ? 'bg-teal-600' :
                selectedElement.type === 'metro' ? 'bg-blue-600' :
                selectedElement.type === 'fiber' ? 'bg-purple-600' : 'bg-rose-600'
              }`}>
                {selectedElement.type === 'electricity' && <Zap className="w-5 h-5" />}
                {selectedElement.type === 'water' && <Droplets className="w-5 h-5" />}
                {selectedElement.type === 'sewage' && <Layers className="w-5 h-5" />}
                {selectedElement.type === 'metro' && <Train className="w-5 h-5" />}
                {selectedElement.type === 'fiber' && <Wifi className="w-5 h-5" />}
                {selectedElement.type === 'storm' && <ShieldAlert className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    {isAr ? selectedElement.categoryAr : selectedElement.categoryEn}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{selectedElement.coordinates}</span>
                </div>
                <h4 className="text-base font-black text-white mt-0.5">
                  {isAr ? selectedElement.nameAr : selectedElement.nameEn}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onConsultAI(t(
                  `أريد تحليلاً هندسياً دقيقاً حول: "${selectedElement.nameAr}" في حي ${selectedDistrict.districtName} بمدينة ${selectedDistrict.city} وتأثيره على تراخيص البناء والارتدادات وإمكانية الربط المباشر.`,
                  `Provide detailed engineering analysis on "${selectedElement.nameEn}" in ${selectedDistrict.districtName} (${selectedDistrict.city}) regarding building permits, setbacks, and direct hookup viability.`
                ))}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>{t('استشر المستشار الهندسي حول هذا المرفق', 'Consult AI On This Utility')}</span>
              </button>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1">{t('الجهة المشغلة', 'Operator')}</span>
              <strong className="text-xs text-white block truncate">
                {isAr ? selectedElement.operatorAr : selectedElement.operatorEn}
              </strong>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1">{t('الحالة التشغيلية', 'Operational Status')}</span>
              <strong className="text-xs text-emerald-400 block truncate">
                {isAr ? selectedElement.statusAr : selectedElement.statusEn}
              </strong>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1">{t('السعة أو القطر', 'Capacity / Diameter')}</span>
              <strong className="text-xs text-amber-300 font-mono block">
                {selectedElement.capacity || 'N/A'}
              </strong>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1">{t('العمق تحت الأرض', 'Underground Depth')}</span>
              <strong className="text-xs text-sky-300 font-mono block">
                {selectedElement.depthMeters !== undefined ? `${selectedElement.depthMeters} ${t('متر', 'm')}` : t('سطحي / علوي', 'Surface / Above ground')}
              </strong>
            </div>
          </div>

          {/* Additional Specific Specs */}
          {selectedElement.specs && selectedElement.specs.length > 0 && (
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 flex flex-wrap items-center gap-4 text-xs">
              <span className="text-slate-400 font-bold text-[11px] flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('مواصفات إضافية معتمدة:', 'Certified Technical Specs:')}</span>
              </span>
              {selectedElement.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-slate-400">{isAr ? spec.labelAr : spec.labelEn}:</span>
                  <span className="text-white font-semibold">{spec.value}</span>
                  {i < selectedElement.specs.length - 1 && <span className="text-slate-700">|</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
