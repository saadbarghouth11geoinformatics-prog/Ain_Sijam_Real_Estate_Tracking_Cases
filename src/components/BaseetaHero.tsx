import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Building2, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  Layers,
  BarChart3,
  Briefcase,
  Bot,
  Calculator,
  Compass
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { saudiDistricts } from '../data/mockRealEstateData';
import { AinSigamLogo } from './AinSigamLogo';

interface BaseetaHeroProps {
  onSearchSelectDistrict?: (districtName: string) => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenAdvisor?: (prompt: string) => void;
}

export const BaseetaHero: React.FC<BaseetaHeroProps> = ({
  onSearchSelectDistrict,
  onNavigateSection,
  onOpenAdvisor,
}) => {
  const { t, isAr } = useLanguage();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter districts for live autocomplete
  const matchedDistricts = saudiDistricts.filter(d => 
    d.name.includes(query) || d.city.includes(query)
  ).slice(0, 5);

  const handleSelectDistrict = (districtName: string) => {
    setQuery(districtName);
    setShowSuggestions(false);
    if (onSearchSelectDistrict) {
      onSearchSelectDistrict(districtName);
    }
    if (onNavigateSection) {
      onNavigateSection('map');
    }
  };

  const quickFeatures = [
    { id: 'map', labelAr: 'الخريطة العقارية', labelEn: 'Real Estate Map', icon: Compass, color: 'from-blue-600 to-sky-500', badgeAr: 'تفاعلية' },
    { id: 'indicators', labelAr: 'مؤشرات الأسعار', labelEn: 'Price Index', icon: BarChart3, color: 'from-blue-700 to-indigo-600', badgeAr: 'مباشر' },
    { id: 'portfolio', labelAr: 'المحفظة العقارية', labelEn: 'Portfolio Tracker', icon: Briefcase, color: 'from-sky-600 to-blue-700', badgeAr: 'أصولك' },
    { id: 'advisor', labelAr: 'المستشار سيجام AI', labelEn: 'Sigam AI Advisor', icon: Bot, color: 'from-blue-800 to-sky-600', badgeAr: 'ذكي' },
    { id: 'calculator', labelAr: 'حاسبة العوائد', labelEn: 'ROI Calculator', icon: Calculator, color: 'from-blue-600 to-cyan-600', badgeAr: 'فورية' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border border-blue-900/60 shadow-2xl p-6 sm:p-10 lg:p-14 text-white">
      {/* High-Definition Riyadh Planning & Skyline Background Image with Object-Fit Cover & Soft Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/drive-banners/drive_banner_01.png"
          alt={t('أفق وتخطيط الأراضي شمال مدينة الرياض', 'Riyadh Land Planning & Skyline')}
          className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/40 to-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50" />
      </div>

      {/* Background Animated Gradient Mesh in Blue & White */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Brand Tagline Badge with Authentic Ain Sigam Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md">
          <AinSigamLogo size="sm" variant="mark-only" />
          <span>{t('منظومة عين سيجام لتخطيط الأراضي والذكاء العقاري بالمملكة', 'Ain Sigam - Spatial & Real Estate Platform in KSA')}</span>
          <span className="text-blue-400/60">•</span>
          <span className="text-white font-mono">{t('دقة ورؤية', 'Vision & Accuracy')}</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
            {t('تخطيط الأراضي والبيانات العقارية...', 'Land Planning & Real Estate Data...')} <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-white bg-clip-text text-transparent">
              {t('برؤية ودقة عين سيجام', 'With Vision & Precision of Ain Sigam')}
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            {t(
              'استكشف صفقات السوق العقاري، أسعار المتر في الأحياء، وفحص وصلاحية الأراضي والتخطيط العمراني بالذكاء الاصطناعي بكل سهولة ووضوح.',
              'Explore market transactions, neighborhood prices per sq. meter, land suitability inspection, and spatial intelligence effortlessly.'
            )}
          </p>
        </div>

        {/* Interactive Search Bar with Live Suggestions */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border-2 border-blue-800/80 focus-within:border-blue-400 rounded-2xl shadow-xl transition-all p-1.5">
            <Search className="w-5 h-5 text-blue-400 mr-3 ml-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t('ابحث بالحي، المدينة، أو رقم المخطط (مثال: النرجس، حطين، الملقا)...', 'Search district, city, or subdivision (e.g. Al Narjis, Hittin, Al Malqa)...')}
              className="w-full bg-transparent text-white text-sm sm:text-base placeholder:text-slate-400 focus:outline-none px-2 py-2"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => {
                if (query.trim() && onSearchSelectDistrict) {
                  onSearchSelectDistrict(query);
                }
                if (onNavigateSection) {
                  onNavigateSection('map');
                }
                setShowSuggestions(false);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/30 shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t('استكشف', 'Explore')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {showSuggestions && query.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-blue-800 rounded-2xl shadow-2xl overflow-hidden z-50 text-right">
              {matchedDistricts.length > 0 ? (
                <div className="p-2 divide-y divide-slate-800">
                  {matchedDistricts.map(district => (
                    <button
                      key={district.id}
                      onClick={() => handleSelectDistrict(district.name)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-950/80 transition-colors text-right cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <div className="text-sm font-bold text-white">{district.name}</div>
                          <div className="text-xs text-slate-400">{district.city} • {district.zoneType}</div>
                        </div>
                      </div>
                      <div className="text-left font-mono">
                        <div className="text-xs font-bold text-blue-300">{district.avgPriceM2Residential.toLocaleString('en-US')} ر.س/م²</div>
                        <div className="text-[10px] text-slate-400">عائد {district.rentalYieldPct}%</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  {t('لم نجد حي بهذا الاسم، اضغط "استكشف" للبحث في الخريطة الشاملة', 'No district found with this name. Click Explore to search on map.')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Product Tabs / Feature Cards Bar (Blue & White Theme) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4">
          {quickFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => {
                  if (onNavigateSection) {
                    onNavigateSection(feat.id);
                  }
                }}
                className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/60 hover:border-blue-400/60 transition-all hover:scale-105 hover:shadow-xl text-center space-y-2 cursor-pointer backdrop-blur-sm"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${feat.color} text-white shadow-md shadow-blue-500/20 group-hover:rotate-6 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {isAr ? feat.labelAr : feat.labelEn}
                  </div>
                  <span className="text-[10px] text-blue-300 font-mono">
                    {feat.badgeAr}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Market Counter Ticker (Blue & White) */}
        <div className="pt-4 border-t border-blue-900/60 flex flex-wrap items-center justify-around gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span className="text-slate-300">{t('صفقات اليوم الموثقة:', 'Today\'s Deals:')}</span>
            <strong className="text-white font-mono text-sm">1,420+ {t('صفقة', 'deals')}</strong>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300">{t('حجم التداولات:', 'Volume:')}</span>
            <strong className="text-sky-300 font-mono text-sm">486 {t('مليون ر.س', 'M SAR')}</strong>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span className="text-slate-300">{t('مصادر البيانات:', 'Data Sources:')}</span>
            <strong className="text-white font-medium">{t('وزارة العدل • السجل العقاري • إيجار', 'MOJ • Registry • Ejar')}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};
