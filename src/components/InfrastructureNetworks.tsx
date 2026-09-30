import React, { useState } from 'react';
import { 
  Zap, 
  Droplets, 
  Wifi, 
  Train, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Calculator, 
  Info, 
  Layers, 
  Activity, 
  SlidersHorizontal,
  TrendingUp,
  Radio,
  Map,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { DistrictInfrastructure, City } from '../types';
import { districtInfrastructuresData, riyadhMetroLines } from '../data/infrastructureData';
import { useLanguage } from '../i18n/LanguageContext';
import { SaudiInfrastructureMap } from './SaudiInfrastructureMap';
import infraDashboardImg from '../assets/images/regenerated_image_1789635255516.png';

interface InfrastructureNetworksProps {
  selectedCity: City | 'الكل';
  onConsultAI: (prompt: string) => void;
  onOpenMapForDistrict?: (districtName: string) => void;
}

export const InfrastructureNetworks: React.FC<InfrastructureNetworksProps> = ({
  selectedCity,
  onConsultAI,
}) => {
  const { t, isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState<'map' | 'matrix' | 'metro' | 'calculator' | 'standards'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUtilityFilter, setSelectedUtilityFilter] = useState<'all' | 'electricity' | 'water' | 'sewage' | 'fiber' | 'metro'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfrastructure>(districtInfrastructuresData[0]);
  const [selectedMetroLine, setSelectedMetroLine] = useState(riyadhMetroLines[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sigam_infra_custom_img');
    } catch {
      return null;
    }
  });

  // Calculator State
  const [calcPropertyType, setCalcPropertyType] = useState<'villa' | 'building' | 'commercial'>('villa');
  const [calcBuiltAreaM2, setCalcBuiltAreaM2] = useState<number>(450);
  const [calcElectricBreakerAmp, setCalcElectricBreakerAmp] = useState<number>(100);
  const [calcWaterMeterSize, setCalcWaterMeterSize] = useState<number>(25);

  // Filtered districts
  const filteredDistricts = districtInfrastructuresData.filter((d) => {
    const matchesCity = selectedCity === 'الكل' || d.city === selectedCity;
    const matchesSearch = d.districtName.includes(searchQuery) || d.city.includes(searchQuery);
    return matchesCity && matchesSearch;
  });

  const calculateConnectionFees = () => {
    let secElectricityFee = 0;
    if (calcElectricBreakerAmp <= 60) secElectricityFee = 6800;
    else if (calcElectricBreakerAmp <= 100) secElectricityFee = 14500;
    else if (calcElectricBreakerAmp <= 160) secElectricityFee = 27800;
    else if (calcElectricBreakerAmp <= 250) secElectricityFee = 46000;
    else secElectricityFee = 78000;

    let nwcWaterFee = 0;
    if (calcWaterMeterSize <= 20) nwcWaterFee = 3200;
    else if (calcWaterMeterSize <= 25) nwcWaterFee = 5400;
    else if (calcWaterMeterSize <= 40) nwcWaterFee = 9800;
    else nwcWaterFee = 16500;

    let sewageFee = 0;
    if (calcPropertyType === 'villa') sewageFee = 4200;
    else if (calcPropertyType === 'building') sewageFee = 11500;
    else sewageFee = 18000;

    const telecomFee = 600;
    const baladyFee = 1250;
    const total = secElectricityFee + nwcWaterFee + sewageFee + telecomFee + baladyFee;

    return {
      secElectricityFee,
      nwcWaterFee,
      sewageFee,
      telecomFee,
      baladyFee,
      total,
    };
  };

  const connectionFees = calculateConnectionFees();

  return (
    <section id="infrastructure" className="py-12 bg-white dark:bg-slate-950 transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Top Banner & Overview */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-md relative overflow-hidden">
          <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-1/4 -top-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('منظومة شبكات البنية التحتية والمرافق الذكية', 'Infrastructure Networks & Smart Utilities Matrix')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t('جاهزية البنية التحتية والشبكات الخدمية في مدن المملكة', 'Infrastructure Readiness & Service Networks Across Saudi Cities')}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {t(
                  'استكشف تغطية شبكات الكهرباء (SEC)، والمياه والصرف الصحي (NWC)، والألياف الضوئية، وشبكة قطار الرياض، وتصريف مياه الأمطار ودرء مخاطر السيول وفق بيانات المخططات المعتمدة.',
                  'Explore operational grid coverage for SEC power, NWC potable water & sewage, FTTH fiber optics, Riyadh Metro lines, and hydrological stormwater drainage networks based on verified cadastral plans.'
                )}
              </p>
            </div>

            {/* Quick Engineering Advisor Trigger Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onConsultAI(t(
                  'ما هي أفضل أحياء الرياض من حيث اكتمال شبكات البنية التحتية والمترو والصرف الصحي وصلاحية البناء الفوري؟',
                  'What are the top Riyadh districts regarding full infrastructure readiness, metro access, sewage coverage, and immediate construction viability?'
                ))}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 transition-all"
                id="engineering-infra-consult-btn"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{t('استشر المستشار الهندسي لعين سيجام', 'Consult Ayn Sigam Engineering AI')}</span>
              </button>
            </div>
          </div>

          {/* 5 Key National Infrastructure Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-700/60">
            <div className="bg-slate-800/60 backdrop-blur-xs p-3 rounded-xl border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('شبكة الكهرباء (SEC)', 'Power Grid (SEC)')}</span>
              </div>
              <div className="text-lg font-black text-white font-mono">99.8%</div>
              <div className="text-[10px] text-emerald-400 font-medium">{t('موثوقية فائقة وشبكات أرضية', 'Underground high-voltage')}</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xs p-3 rounded-xl border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('المياه والتحلية (NWC)', 'Water Network (NWC)')}</span>
              </div>
              <div className="text-lg font-black text-white font-mono">94.2%</div>
              <div className="text-[10px] text-sky-300 font-medium">{t('تدفق مستمر 24/7 عبر الخزانات', '24/7 strategic reservoirs')}</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xs p-3 rounded-xl border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Wifi className="w-3.5 h-3.5 text-purple-400" />
                <span>{t('الألياف والجيل الخامس', 'FTTH & 5G Telecom')}</span>
              </div>
              <div className="text-lg font-black text-white font-mono">98.5%</div>
              <div className="text-[10px] text-purple-300 font-medium">{t('FTTH فائق السرعة + 5G Advanced', 'Ultra-fast gigabit FTTH')}</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xs p-3 rounded-xl border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Train className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('مترو وحافلات الرياض', 'Riyadh Metro')}</span>
              </div>
              <div className="text-lg font-black text-white font-mono">176 {t('كم', 'km')}</div>
              <div className="text-[10px] text-emerald-300 font-medium">{t('6 مسارات و 85 محطة تشغيلية', '6 lines & 85 stations')}</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xs p-3 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
                <span>{t('درء السيول وتصريف الأمطار', 'Hydrological Flood Safety')}</span>
              </div>
              <div className="text-lg font-black text-white font-mono">92.0%</div>
              <div className="text-[10px] text-teal-300 font-medium">{t('قنوات هيدروليكية وبحيرات تهدئة', 'Engineered runoff canals')}</div>
            </div>
          </div>
        </div>

        {/* Navigation Sub-Tabs for Infrastructure */}
        <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2 transition-colors">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'map'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>{t('خريطة شبكات المرافق في المملكة', 'Saudi Utilities Network Map')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{t('مؤشر جاهزية الأحياء (IRI)', 'District Readiness (IRI)')}</span>
            </button>

            <button
              onClick={() => setActiveTab('metro')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'metro'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Train className="w-3.5 h-3.5" />
              <span>{t('شبكة قطار الرياض والمحاور', 'Riyadh Metro Network')}</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t('حاسبة رسوم إيصال الخدمات', 'Utility Connection Calculator')}</span>
            </button>

            <button
              onClick={() => setActiveTab('standards')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'standards'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>{t('الجهات والاشتراطات الفنية', 'Technical Regulations & Regulators')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline">
              {t('المدينة المختارة:', 'Selected City:')} <strong className="text-slate-800 dark:text-slate-200">{selectedCity}</strong>
            </span>
          </div>
        </div>

        {/* TAB 0: SAUDI INFRASTRUCTURE UTILITY NETWORKS MAP */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            {/* 1. خريطة مسارات شبكات البنية التحتية التفاعلية */}
            <SaudiInfrastructureMap
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              onConsultAI={onConsultAI}
            />

            {/* 2. الصورة كما هي تماماً تحت خريطة مسارات الشبكات بدون أي تعديل */}
            <div className="w-full">
              <img
                src={infraDashboardImg}
                alt="مخطط شبكات البنية التحتية"
                className="w-full h-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* TAB 1: DISTRICT INFRASTRUCTURE READINESS MATRIX */}
        {activeTab === 'matrix' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Districts List & Filters (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('تصفية الأحياء والشبكات', 'Filter Districts & Utilities')}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {filteredDistricts.length} {t('حي متوفر', 'available')}
                  </span>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className={`w-3.5 h-3.5 text-slate-400 absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('ابحث باسم الحي أو المدينة...', 'Search district or city...')}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs rounded-lg ${isAr ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 focus:outline-hidden focus:ring-1 focus:ring-emerald-500`}
                  />
                </div>

                {/* Quick Utility Category Filters */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    onClick={() => setSelectedUtilityFilter('all')}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all ${
                      selectedUtilityFilter === 'all'
                        ? 'bg-slate-900 dark:bg-slate-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t('الكل', 'All')}
                  </button>
                  <button
                    onClick={() => setSelectedUtilityFilter('electricity')}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                      selectedUtilityFilter === 'electricity'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Zap className="w-3 h-3" />
                    <span>{t('كهرباء', 'Power')}</span>
                  </button>
                  <button
                    onClick={() => setSelectedUtilityFilter('water')}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                      selectedUtilityFilter === 'water'
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Droplets className="w-3 h-3" />
                    <span>{t('مياه', 'Water')}</span>
                  </button>
                  <button
                    onClick={() => setSelectedUtilityFilter('sewage')}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                      selectedUtilityFilter === 'sewage'
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>{t('صرف صحي', 'Sewage')}</span>
                  </button>
                  <button
                    onClick={() => setSelectedUtilityFilter('fiber')}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                      selectedUtilityFilter === 'fiber'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Wifi className="w-3 h-3" />
                    <span>{t('ألياف', 'Fiber')}</span>
                  </button>
                  <button
                    onClick={() => setSelectedUtilityFilter('metro')}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                      selectedUtilityFilter === 'metro'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Train className="w-3 h-3" />
                    <span>{t('مترو', 'Metro')}</span>
                  </button>
                </div>
              </div>

              {/* Districts List Items */}
              <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                {filteredDistricts.map((d) => {
                  const isSelected = selectedDistrict.districtId === d.districtId;
                  return (
                    <div
                      key={d.districtId}
                      onClick={() => setSelectedDistrict(d)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-sm ring-1 ring-emerald-400'
                          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            d.readinessScore >= 90 
                              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' 
                              : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                          }`}>
                            {d.readinessScore}%
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{t(`حي ${d.districtName}`, `${d.districtName} District`)}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{d.city}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] font-mono">
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                            ⚡ {d.electricity.coveragePct}%
                          </span>
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                            💧 {d.water.coveragePct}%
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Train className="w-3 h-3 text-blue-500" />
                          <span className="truncate max-w-[190px]">{d.metroTransit.nearestStation}</span>
                        </span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                          {d.metroTransit.distanceMeters} {t('م', 'm')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* District Detailed Engineering Sheet (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-5 transition-colors">
                
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                        {selectedDistrict.city}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {t('مؤشر الجاهزية الشامل (IRI)', 'Integrated Readiness Index (IRI)')}
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                      <span>{t(`تقرير البنية التحتية لحي ${selectedDistrict.districtName}`, `Infrastructure Audit: ${selectedDistrict.districtName} District`)}</span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-2">
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium block">{t('درجة الجاهزية', 'Readiness Score')}</span>
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                        {selectedDistrict.readinessScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Utility Networks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Electricity */}
                  <div className="p-3.5 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>{t('الشبكة الكهربائية', 'Electrical Grid (SEC)')}</span>
                      </span>
                      <span className="text-xs font-mono font-black text-amber-800 dark:text-amber-300">
                        {t(`تغطية ${selectedDistrict.electricity.coveragePct}%`, `${selectedDistrict.electricity.coveragePct}% Coverage`)}
                      </span>
                    </div>
                    <div className="w-full bg-amber-100 dark:bg-amber-900/40 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all" 
                        style={{ width: `${selectedDistrict.electricity.coveragePct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedDistrict.electricity.status}
                    </p>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-amber-100/80 dark:border-amber-900/30 flex items-center justify-between">
                      <span>{t('المشغل:', 'Provider:')} {selectedDistrict.electricity.provider}</span>
                      <span>{t('سعة التحويل:', 'Substation:')} {selectedDistrict.electricity.substationCapacityKVA.toLocaleString()} KVA</span>
                    </div>
                  </div>

                  {/* Water */}
                  <div className="p-3.5 rounded-xl border border-sky-200/70 dark:border-sky-900/50 bg-sky-50/30 dark:bg-sky-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span>{t('شبكة المياه الصالحة للشرب', 'Potable Water (NWC)')}</span>
                      </span>
                      <span className="text-xs font-mono font-black text-sky-800 dark:text-sky-300">
                        {t(`تغطية ${selectedDistrict.water.coveragePct}%`, `${selectedDistrict.water.coveragePct}% Coverage`)}
                      </span>
                    </div>
                    <div className="w-full bg-sky-100 dark:bg-sky-900/40 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-sky-500 h-full rounded-full transition-all" 
                        style={{ width: `${selectedDistrict.water.coveragePct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedDistrict.water.networkStatus}
                    </p>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-sky-100/80 dark:border-sky-900/30 flex items-center justify-between">
                      <span>{t('المصدر:', 'Source:')} {selectedDistrict.water.waterSource}</span>
                      <span>{t('المشغل:', 'Operator:')} {selectedDistrict.water.provider}</span>
                    </div>
                  </div>

                  {/* Sewage */}
                  <div className="p-3.5 rounded-xl border border-teal-200/70 dark:border-teal-900/50 bg-teal-50/30 dark:bg-teal-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>{t('شبكة الصرف الصحي البيئية', 'Sanitary Sewage')}</span>
                      </span>
                      <span className="text-xs font-mono font-black text-teal-800 dark:text-teal-300">
                        {t(`تغطية ${selectedDistrict.sewage.coveragePct}%`, `${selectedDistrict.sewage.coveragePct}% Coverage`)}
                      </span>
                    </div>
                    <div className="w-full bg-teal-100 dark:bg-teal-900/40 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-teal-600 h-full rounded-full transition-all" 
                        style={{ width: `${selectedDistrict.sewage.coveragePct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedDistrict.sewage.networkStatus}
                    </p>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-teal-100/80 dark:border-teal-900/30">
                      <span>{t('محطة المعالجة:', 'Treatment Facility:')} {selectedDistrict.sewage.treatmentZone}</span>
                    </div>
                  </div>

                  {/* Fiber */}
                  <div className="p-3.5 rounded-xl border border-purple-200/70 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                        <Wifi className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>{t('الألياف الضوئية والـ 5G', 'Fiber FTTH & 5G')}</span>
                      </span>
                      <span className="text-xs font-mono font-black text-purple-800 dark:text-purple-300">
                        {t(`تغطية ${selectedDistrict.telecom.fiberCoveragePct}%`, `${selectedDistrict.telecom.fiberCoveragePct}% Coverage`)}
                      </span>
                    </div>
                    <div className="w-full bg-purple-100 dark:bg-purple-900/40 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full rounded-full transition-all" 
                        style={{ width: `${selectedDistrict.telecom.fiberCoveragePct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t('متوسط سرعات الإنترنت الفعلي:', 'Actual Speed Avg:')} <strong className="text-slate-900 dark:text-white">{selectedDistrict.telecom.avgSpeedMbps} {t('ميغابت/ث', 'Mbps')}</strong>
                    </p>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-purple-100/80 dark:border-purple-900/30 flex items-center justify-between">
                      <span>{t('المزودون:', 'ISPs:')} {selectedDistrict.telecom.providers.join(', ')}</span>
                      <span>5G: {selectedDistrict.telecom.fiveGCoveragePct}%</span>
                    </div>
                  </div>
                </div>

                {/* Metro & Storm Drain */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                        <Train className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{t('محطة المترو والنقل العام الأقرب', 'Nearest Metro Transit Station')}</span>
                      </span>
                      <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded">
                        {selectedDistrict.metroTransit.distanceMeters} {t('متر', 'm')}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedDistrict.metroTransit.nearestStation}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      {t('المسار:', 'Line:')} <strong className="text-slate-800 dark:text-slate-200">{selectedDistrict.metroTransit.lineName}</strong>
                    </div>
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                      ✓ {selectedDistrict.metroTransit.status}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{t('تصريف مياه الأمطار ودرء السيول', 'Storm Drainage & Flood Safety')}</span>
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded">
                        {t(`مخاطر ${selectedDistrict.stormDrainage.riskRating}`, `${selectedDistrict.stormDrainage.riskRating} Risk`)}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedDistrict.stormDrainage.channelStatus}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-emerald-100 dark:border-emerald-900/40">
                      <span>{t('نسبة تغطية القنوات:', 'Canal Coverage:')} {selectedDistrict.stormDrainage.coveragePct}%</span>
                      <span>{t('سفلتة وإنارة:', 'Pavement & Lights:')} {selectedDistrict.pavementLighting.lightingCoveragePct}%</span>
                    </div>
                  </div>
                </div>

                {/* Smart City Features */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      {t('العدادات الذكية:', 'Smart Meters:')} <strong>{selectedDistrict.smartUtilities.smartMetersPct}%</strong>
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span>
                      {t('محطات شحن السيارات (EV):', 'EV Chargers:')} <strong>{selectedDistrict.smartUtilities.evChargingStations} {t('محطة', 'stations')}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('map')}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>{t('عرض مسارات الشبكات على الخريطة', 'View Networks on Map')}</span>
                    </button>

                    <button
                      onClick={() => onConsultAI(t(
                        `حلل لي بالتفصيل أثر البنية التحتية ومحطات المترو في حي ${selectedDistrict.districtName} بمدينة ${selectedDistrict.city} على صلاحية البناء وأسعار الأراضي والتطوير الإنشائي.`,
                        `Provide comprehensive engineering analysis on how infrastructure and metro lines in ${selectedDistrict.districtName} (${selectedDistrict.city}) affect land valuation and construction viability.`
                      ))}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      <span>{t('استشارة المستشار الهندسي لعين سيجام', 'Consult Ayn Sigam AI')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RIYADH METRO LINES EXPLORER */}
        {activeTab === 'metro' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Train className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>{t('شبكة قطار الرياض (Riyadh Metro System)', 'Riyadh Metro Public Transit System')}</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {t('شريان النقل الأضخم في الشرق الأوسط، يربط أهم محاور التنمية الاقتصادية والتجارية والسكنية', 'The premier transit artery connecting primary economic, administrative, and residential hubs')}
                  </p>
                </div>

                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  176 {t('كم', 'km')} • 85 {t('محطة', 'stations')} • 100% {t('جاهزية', 'Operational')}
                </span>
              </div>

              {/* Metro Lines Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
                {riyadhMetroLines.map((line) => {
                  const isSelected = selectedMetroLine.id === line.id;
                  return (
                    <button
                      key={line.id}
                      onClick={() => setSelectedMetroLine(line)}
                      className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                        isAr ? 'text-right' : 'text-left'
                      } ${
                        isSelected
                          ? 'border-slate-800 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: line.color }}
                        />
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {line.code}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-black line-clamp-1">{line.name.split('(')[0]}</div>
                        <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                          {line.lengthKm} {t('كم', 'km')} • {line.stationsCount} {t('محطة', 'stations')}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Metro Line Deep Detail Card */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4 mt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm"
                      style={{ backgroundColor: selectedMetroLine.color }}
                    >
                      {selectedMetroLine.code}
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">{selectedMetroLine.name}</h4>
                      <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{selectedMetroLine.operationalStatus}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-center">
                      <span className="text-slate-400 block text-[10px]">{t('طول المسار', 'Track Length')}</span>
                      <strong className="text-slate-900 dark:text-white text-sm">{selectedMetroLine.lengthKm} {t('كم', 'km')}</strong>
                    </div>
                    <div className="text-center">
                      <span className="text-slate-400 block text-[10px]">{t('عدد المحطات', 'Stations')}</span>
                      <strong className="text-slate-900 dark:text-white text-sm">{selectedMetroLine.stationsCount} {t('محطة', 'stations')}</strong>
                    </div>
                  </div>
                </div>

                {/* Key Stations */}
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">{t('أبرز المحطات على المسار:', 'Key Stations on Line:')}</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedMetroLine.keyStations.map((station, i) => (
                      <div 
                        key={i}
                        className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-xs"
                      >
                        <span 
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: selectedMetroLine.color }}
                        />
                        <span className="font-semibold">{station}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Notice */}
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3.5 flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200">
                  <TrendingUp className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="font-bold block">{t('الأثر الهندسي والتطويري لمحطات المترو:', 'Engineering & Spatial Development Impact:')}</strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      {t(
                        'تشير تحليلات وبيانات عين سيجام إلى أن العقارات والأراضي الواقعة ضمن دائرة 800 متر من محطات هذا المسار تشهد ارتفاعاً في معدلات تراخيص البناء وسرعة اكتمال المرافق الإنشائية، ومعدلات إشغال قياسية تصل إلى 96%.',
                        'Ayn Sigam satellite telemetry verifies that plots within an 800-meter transit catchment exhibit higher building permit approvals, accelerated utility hookups, and benchmark 96% occupancy rates.'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UTILITY CONNECTION FEES CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {t('حاسبة تكاليف إيصال الخدمات والمرافق', 'Utility Connection Cost Estimator')}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t(
                  'حساب تقديري لرسوم إطلاق التيار الكهربائي، وعدادات المياه، وربط شبكة الصرف الصحي، ورخص التنسيق وفق لوائح الهيئة السعودية لتنظيم الكهرباء والمياه.',
                  'Parametric calculation for SEC electrical energization, NWC water meters, sewage grid linkage, and Balady municipal coordination based on current regulations.'
                )}
              </p>

              {/* Property Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('نوع العقار', 'Property Archetype')}</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCalcPropertyType('villa')}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      calcPropertyType === 'villa'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t('فيلا سكنية', 'Villa')}
                  </button>
                  <button
                    onClick={() => setCalcPropertyType('building')}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      calcPropertyType === 'building'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t('عمارة شقق', 'Apartments')}
                  </button>
                  <button
                    onClick={() => setCalcPropertyType('commercial')}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      calcPropertyType === 'commercial'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t('مجمع تجاري', 'Commercial')}
                  </button>
                </div>
              </div>

              {/* Built Area */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{t('إجمالي المسطحات المبنية', 'Built-up Area (BUA)')}</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{calcBuiltAreaM2} {t('م²', 'm²')}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="3000"
                  step="50"
                  value={calcBuiltAreaM2}
                  onChange={(e) => setCalcBuiltAreaM2(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Electric Breaker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('سعة القاطع الكهربائي المطلوب (أمبير)', 'Requested Circuit Breaker (Amperes)')}</label>
                <select
                  value={calcElectricBreakerAmp}
                  onChange={(e) => setCalcElectricBreakerAmp(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-lg p-2 font-mono font-bold text-slate-800 dark:text-white"
                >
                  <option value={60}>{t('60 أمبير (سكن صغير أو ملحق)', '60A (Small Annex / Unit)')}</option>
                  <option value={100}>{t('100 أمبير (فيلا سكنية قياسية)', '100A (Standard Residential Villa)')}</option>
                  <option value={160}>{t('160 أمبير (فيلا كبيرة مع مصعد وتكييف مركزي)', '160A (Large Villa + HVAC + Elevator)')}</option>
                  <option value={250}>{t('250 أمبير (عمارة شقق سكنية 4-6 شقق)', '250A (Multi-family Building 4-6 units)')}</option>
                  <option value={400}>{t('400 أمبير (مجمع تجاري أو عمارة ضخمة)', '400A (Commercial Plaza / High Density)')}</option>
                </select>
              </div>

              {/* Water Meter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('قطر عداد المياه (شركة المياه الوطنية)', 'NWC Water Meter Diameter')}</label>
                <select
                  value={calcWaterMeterSize}
                  onChange={(e) => setCalcWaterMeterSize(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-lg p-2 font-mono font-bold text-slate-800 dark:text-white"
                >
                  <option value={20}>{t('20 ملم (3/4 بوصة - استخدام سكني عادي)', '20 mm (3/4" - Standard Residential)')}</option>
                  <option value={25}>{t('25 ملم (1 بوصة - فيلا سكنية كبيرة أو دوبلكس)', '25 mm (1" - Large Villa / Duplex)')}</option>
                  <option value={40}>{t('40 ملم (1.5 بوصة - عمارة شقق)', '40 mm (1.5" - Apartment Building)')}</option>
                  <option value={50}>{t('50 ملم (2 بوصة - تجاري أو مجمع سكني)', '50 mm (2" - Commercial / Compound)')}</option>
                </select>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  {t('بيان التكاليف ورسوم الربط التقديرية', 'Estimated Utility Connection Fees')}
                </h4>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded font-mono">
                  {t('لوائح 2026 الرسمية', 'Official 2026 Tariffs')}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{t('رسوم إيصال التيار الكهربائي (SEC)', 'SEC Electrical Energization Fee')}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{t(`سعة قاطع ${calcElectricBreakerAmp} أمبير`, `${calcElectricBreakerAmp}A Breaker Tier`)}</span>
                    </div>
                  </div>
                  <div className="text-sm font-black text-slate-900 dark:text-white font-mono">
                    {connectionFees.secElectricityFee.toLocaleString()} {t('ر.س', 'SAR')}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/40">
                  <div className="flex items-center gap-2.5">
                    <Droplets className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{t('رسوم عداد وتوصيلة المياه (NWC)', 'NWC Potable Water Meter Hookup')}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{t(`قطر عداد ${calcWaterMeterSize} ملم`, `${calcWaterMeterSize} mm Meter Gauge`)}</span>
                    </div>
                  </div>
                  <div className="text-sm font-black text-slate-900 dark:text-white font-mono">
                    {connectionFees.nwcWaterFee.toLocaleString()} {t('ر.س', 'SAR')}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{t('رسوم ربط شبكة الصرف الصحي', 'Sanitary Sewage Grid Tie-in')}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{t('الربط على الخط التجميعي الرئيسي', 'Main trunk collector tie-in')}</span>
                    </div>
                  </div>
                  <div className="text-sm font-black text-slate-900 dark:text-white font-mono">
                    {connectionFees.sewageFee.toLocaleString()} {t('ر.س', 'SAR')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{t('توصيل الألياف FTTH:', 'FTTH Fiber:')}</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">{connectionFees.telecomFee.toLocaleString()} {t('ر.س', 'SAR')}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{t('رخصة حفر وتنسيق (بلدي):', 'Balady Excavation Permit:')}</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">{connectionFees.baladyFee.toLocaleString()} {t('ر.س', 'SAR')}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 block">{t('إجمالي رسوم إيصال وتوصيل الخدمات', 'Total Utility Connection & Energization Fees')}</span>
                  <span className="text-[10px] text-emerald-400">{t('شاملة ضريبة القيمة المضافة ورسوم الفحص الفني', 'Includes VAT and municipal technical inspection')}</span>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {connectionFees.total.toLocaleString()} {t('ر.س', 'SAR')}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('هذه القيم استرشادية معتمدة على جداول المقابل المالي الرسمية؛ قد تختلف بحسب مسافة الردود أو محطة التحويل.', 'Estimates are derived from official municipal tariffs; actual costs may vary depending on setback distances and substation proximity.')}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: OFFICIAL STANDARDS & ENTITIES */}
        {activeTab === 'standards' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {t('الجهات والاشتراطات الفنية المعتمدة للبنية التحتية', 'Authoritative Regulatory Standards & Oversight Entities')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>{t('الشركة السعودية للكهرباء (SEC)', 'Saudi Electricity Company (SEC)')}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(
                    'تختص بإصدار رخص إطلاق التيار، وتوفير محطات التغذية الفرعية، وفحص عوازل المبنى، والالتزام بكود البناء السعودي لكفاءة الطاقة.',
                    'Authorized entity for power energization, distribution substations, thermal insulation compliance, and Saudi Building Code (SBC 601) electrical energy efficiency.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  <span>{t('شركة المياه الوطنية (NWC)', 'National Water Company (NWC)')}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(
                    'مسؤولة عن توصيلات شبكات المياه المحلاة، والعدادات الذكية، وربط شبكات الصرف الصحي، وفحص ميول التوصيلة المنزلية.',
                    'Manages desalinated water networks, ultrasonic AMR meters, centralized sewage hookups, and municipal sanitary gradient verification.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Train className="w-4 h-4 text-blue-500" />
                  <span>{t('الهيئة الملكية لمدينة الرياض (RCRC)', 'Royal Commission for Riyadh City (RCRC)')}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(
                    'المسؤولة عن تشغيل وإدارة مشروع الملك عبدالعزيز للنقل العام (قطار الرياض وحافلات الرياض) والمخطط الاستراتيجي الشامل للعاصمة.',
                    'Responsible for King Abdulaziz Public Transport Project (Riyadh Metro & Bus), transit-oriented development (TOD), and the master spatial plan.'
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
