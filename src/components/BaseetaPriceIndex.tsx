import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  Activity, 
  Layers, 
  Filter,
  DollarSign,
  Building,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { saudiDistricts } from '../data/mockRealEstateData';

export const BaseetaPriceIndex: React.FC = () => {
  const { t, isAr } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<'الرياض' | 'جدة' | 'الدمام' | 'مكة المكرمة'>('الرياض');
  const [propertyCategory, setPropertyCategory] = useState<'residential' | 'commercial'>('residential');
  const [activeQuarterIndex, setActiveQuarterIndex] = useState<number>(5); // Default to latest

  // Filter districts based on city
  const cityDistricts = saudiDistricts.filter(d => d.city === selectedCity);

  // Quarterly price history mock for the selected city
  const priceHistory = {
    'الرياض': [
      { quarter: 'Q1 2024', resPrice: 4200, comPrice: 7800, volumeM: 380 },
      { quarter: 'Q2 2024', resPrice: 4450, comPrice: 8100, volumeM: 410 },
      { quarter: 'Q3 2024', resPrice: 4680, comPrice: 8500, volumeM: 445 },
      { quarter: 'Q4 2024', resPrice: 4950, comPrice: 8900, volumeM: 480 },
      { quarter: 'Q1 2025', resPrice: 5200, comPrice: 9400, volumeM: 520 },
      { quarter: 'Q2 2025', resPrice: 5580, comPrice: 10100, volumeM: 575 },
    ],
    'جدة': [
      { quarter: 'Q1 2024', resPrice: 3800, comPrice: 6900, volumeM: 260 },
      { quarter: 'Q2 2024', resPrice: 3950, comPrice: 7100, volumeM: 280 },
      { quarter: 'Q3 2024', resPrice: 4120, comPrice: 7350, volumeM: 300 },
      { quarter: 'Q4 2024', resPrice: 4300, comPrice: 7600, volumeM: 315 },
      { quarter: 'Q1 2025', resPrice: 4480, comPrice: 7900, volumeM: 340 },
      { quarter: 'Q2 2025', resPrice: 4720, comPrice: 8300, volumeM: 370 },
    ],
    'الدمام': [
      { quarter: 'Q1 2024', resPrice: 3100, comPrice: 5800, volumeM: 190 },
      { quarter: 'Q2 2024', resPrice: 3250, comPrice: 6000, volumeM: 210 },
      { quarter: 'Q3 2024', resPrice: 3380, comPrice: 6150, volumeM: 220 },
      { quarter: 'Q4 2024', resPrice: 3500, comPrice: 6350, volumeM: 240 },
      { quarter: 'Q1 2025', resPrice: 3680, comPrice: 6600, volumeM: 265 },
      { quarter: 'Q2 2025', resPrice: 3850, comPrice: 6900, volumeM: 290 },
    ],
    'مكة المكرمة': [
      { quarter: 'Q1 2024', resPrice: 3900, comPrice: 8500, volumeM: 210 },
      { quarter: 'Q2 2024', resPrice: 4050, comPrice: 8800, volumeM: 230 },
      { quarter: 'Q3 2024', resPrice: 4200, comPrice: 9100, volumeM: 245 },
      { quarter: 'Q4 2024', resPrice: 4380, comPrice: 9500, volumeM: 270 },
      { quarter: 'Q1 2025', resPrice: 4590, comPrice: 9900, volumeM: 295 },
      { quarter: 'Q2 2025', resPrice: 4850, comPrice: 10400, volumeM: 320 },
    ]
  }[selectedCity];

  const currentQuarterData = priceHistory[activeQuarterIndex];
  const maxPrice = Math.max(...priceHistory.map(h => propertyCategory === 'residential' ? h.resPrice : h.comPrice));
  const minPrice = Math.min(...priceHistory.map(h => propertyCategory === 'residential' ? h.resPrice : h.comPrice));

  return (
    <section id="indicators" className="space-y-6">
      {/* 1. Header with City & Category Switchers & 02-riyadh-skyline-city.webp */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white">
                {t('مؤشر الأسعار والمؤشرات العقارية', 'Price Index & Market Indicators')}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 font-bold">
                {t('بيانات وزارة العدل', 'MOJ Verified')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {t(
                'تتبع حركة أسعار المتر المربع وتغيرات التداولات الربعية للأراضي والعقارات السكنية والتجارية عبر المدن السعودية.',
                'Track price per square meter movements and quarterly transaction volume trends for residential and commercial real estate.'
              )}
            </p>

            {/* City and Category Selector */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Cities */}
              <div className="flex items-center bg-blue-50/60 dark:bg-slate-950 p-1 rounded-xl border border-blue-100 dark:border-slate-800">
                {(['الرياض', 'جدة', 'الدمام', 'مكة المكرمة'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCity(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCity === c
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Category */}
              <div className="flex items-center bg-blue-50/60 dark:bg-slate-950 p-1 rounded-xl border border-blue-100 dark:border-slate-800">
                <button
                  onClick={() => setPropertyCategory('residential')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    propertyCategory === 'residential'
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  سكني
                </button>
                <button
                  onClick={() => setPropertyCategory('commercial')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    propertyCategory === 'commercial'
                      ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  تجاري
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden border border-blue-100 dark:border-slate-800 shadow-sm aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 group">
              <img
                src="/images_webp/02-riyadh-skyline-city.webp"
                alt={t('أفق مدينة الرياض ومؤشرات الأسعار والنمو العمراني', 'Riyadh City Skyline & Market Indicators')}
                loading="lazy"
                width="640"
                height="480"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                style={{ objectPosition: 'center 40%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 start-2.5 end-2.5 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-[11px] text-white flex items-center justify-between pointer-events-none">
                <span className="font-semibold">{t('أفق العاصمة • متوسط المتر', 'Capital Skyline • Price/m²')}</span>
                <span className="font-mono text-sky-300 text-[10px]">{t('مؤشر ربعي', 'Quarterly')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive SVG Price Evolution Chart (Blue & White) */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 dark:border-slate-800 pb-4">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              متوسط سعر المتر الحالي في {selectedCity} ({propertyCategory === 'residential' ? 'السكني' : 'التجاري'})
            </div>
            <div className="text-3xl font-black text-blue-950 dark:text-white font-mono flex items-baseline gap-2 mt-0.5">
              <span>
                {propertyCategory === 'residential'
                  ? currentQuarterData.resPrice.toLocaleString('en-US')
                  : currentQuarterData.comPrice.toLocaleString('en-US')}
              </span>
              <span className="text-sm font-sans text-slate-400">ر.س / م²</span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center font-mono">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                +14.8% سنوياً
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span>الربع المختار:</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-slate-950 border border-blue-200 dark:border-slate-800">
              {currentQuarterData.quarter}
            </span>
          </div>
        </div>

        {/* Interactive Chart Container */}
        <div className="relative h-64 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2">
          {priceHistory.map((item, idx) => {
            const currentVal = propertyCategory === 'residential' ? item.resPrice : item.comPrice;
            const heightPct = Math.round(((currentVal - minPrice * 0.85) / (maxPrice * 1.05 - minPrice * 0.85)) * 100);
            const isSelected = activeQuarterIndex === idx;

            return (
              <div 
                key={item.quarter}
                onClick={() => setActiveQuarterIndex(idx)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Value on Hover / Selected */}
                <div className={`text-[11px] font-mono font-bold transition-all mb-2 ${
                  isSelected ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-slate-400 group-hover:text-blue-600'
                }`}>
                  {currentVal.toLocaleString('en-US')}
                </div>

                {/* Animated Bar in Blue Gradient */}
                <div className="w-full max-w-[50px] bg-slate-100 dark:bg-slate-950 rounded-t-xl overflow-hidden flex flex-col justify-end p-1 border border-blue-100 dark:border-slate-800 group-hover:border-blue-300 transition-colors">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isSelected 
                        ? 'bg-gradient-to-t from-blue-700 via-blue-600 to-sky-400 shadow-md shadow-blue-500/30'
                        : 'bg-blue-300/60 dark:bg-slate-700 group-hover:bg-blue-400'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>

                {/* Label */}
                <div className={`text-xs font-mono mt-3 transition-colors ${
                  isSelected ? 'text-blue-950 dark:text-white font-bold' : 'text-slate-500 group-hover:text-blue-600'
                }`}>
                  {item.quarter}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-blue-100 dark:border-slate-800">
          <span>* انقر فوق أي عمود ربع سنوي لاستعراض مؤشراته الخاصة وحجم تداولاته</span>
          <span className="font-mono text-blue-900 dark:text-slate-300 font-bold">حجم التداولات: {currentQuarterData.volumeM} مليون ر.س</span>
        </div>
      </div>

      {/* 3. Top Neighborhoods Leaderboard (Blue & White) */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>أداء الأحياء الأكثر طلباً وتداولاً في {selectedCity}</span>
          </h3>
          <span className="text-xs text-slate-400">تحديث أسبوعي</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-blue-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-semibold">الحي</th>
                <th className="pb-3 font-semibold">التصنيف</th>
                <th className="pb-3 font-semibold">متوسط سعر المتر (سكني)</th>
                <th className="pb-3 font-semibold">متوسط سعر المتر (تجاري)</th>
                <th className="pb-3 font-semibold">النمو السنوي</th>
                <th className="pb-3 font-semibold">العائد الإيجاري</th>
                <th className="pb-3 font-semibold">مستوى الطلب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 dark:divide-slate-800/60 font-medium">
              {cityDistricts.map(dist => (
                <tr key={dist.id} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 text-blue-950 dark:text-white font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{dist.name}</span>
                  </td>
                  <td className="py-3.5 text-slate-600 dark:text-slate-300">{dist.zoneType}</td>
                  <td className="py-3.5 font-mono text-blue-600 font-bold">{dist.avgPriceM2Residential.toLocaleString('en-US')} ر.س</td>
                  <td className="py-3.5 font-mono text-sky-700 dark:text-sky-400 font-bold">{dist.avgPriceM2Commercial.toLocaleString('en-US')} ر.س</td>
                  <td className="py-3.5 font-mono text-blue-600">+{dist.yearlyChangePct}%</td>
                  <td className="py-3.5 font-mono text-blue-800 dark:text-blue-300 font-bold">{dist.rentalYieldPct}%</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {dist.demandLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
