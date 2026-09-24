import React, { useState } from 'react';
import { 
  GitCompare, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Building2, 
  CheckCircle2, 
  ArrowLeftRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { saudiDistricts } from '../data/mockRealEstateData';

export const BaseetaDistrictComparator: React.FC = () => {
  const { t, isAr } = useLanguage();

  const [district1Id, setDistrict1Id] = useState<string>('riyadh-narjis');
  const [district2Id, setDistrict2Id] = useState<string>('riyadh-hittin');

  const d1 = saudiDistricts.find(d => d.id === district1Id) || saudiDistricts[0];
  const d2 = saudiDistricts.find(d => d.id === district2Id) || saudiDistricts[1];

  return (
    <section id="compare" className="space-y-6">
      {/* 1. Header & District Visual Spotlight (Background Container with 07-kafd-urban-district.webp, object-cover, soft overlay & white text) */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 p-6 sm:p-8 shadow-2xl group">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/images_webp/07-kafd-urban-district.webp"
            alt={t('الحي الحضري والتخطيط العمراني المتكامل بكافد', 'Integrated Urban District & Master Planning at KAFD')}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-sky-300 border border-blue-400/30 backdrop-blur-md">
                <GitCompare className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {t('مقارنة الأحياء والفرص العمرانية جنباً إلى جنب', 'Smart Side-by-Side District Comparator')}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-400/40 font-bold backdrop-blur-md">
                {t('مقارنة فورية', 'Instant Comparison')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200/90 max-w-2xl leading-relaxed font-medium">
              {t(
                'قارن بين أي حيين بالمملكة في متوسط سعر المتر السكني والتجاري، نسب النمو السنوية، العائد الإيجاري، وتكامل الخدمات والمرافق الحضرية لتقييم فرص التطوير العمراني بدقة.',
                'Compare any two Saudi districts across residential & commercial price/sqm, annual growth, rental yields, urban infrastructure layers, and development opportunities.'
              )}
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  setDistrict1Id(district2Id);
                  setDistrict2Id(district1Id);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/20 bg-slate-900/80 text-xs font-bold text-white hover:text-sky-300 hover:border-sky-400 transition-all cursor-pointer backdrop-blur-md shadow-md active:scale-95"
              >
                <ArrowLeftRight className="w-4 h-4 text-sky-400" />
                <span>{t('تبديل الموقعين للتحليل المقارن', 'Swap Districts')}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-sky-300 font-['Cairo']">{t('مؤشرات المقارنة المكانية', 'Spatial Indicators')}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">MOJ VERIFIED</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-300">{t('فارق السعر التقديري', 'Price Delta')}</span>
                  <span className="font-mono font-bold text-white">
                    {Math.abs(d1.avgPriceM2Residential - d2.avgPriceM2Residential).toLocaleString()} {t('ر.س/م²', 'SAR/m²')}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-300">{t('جاهزية البنية التحتية', 'Infra Readiness')}</span>
                  <span className="font-mono font-bold text-sky-300">96.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">{t('اشتراطات الكود', 'SBC Code')}</span>
                  <span className="text-emerald-400 font-bold">{t('معتمد SBC 303', 'SBC 303 Valid')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. District Selection Cards (Blue & White) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* District 1 Selector Card (Royal Blue) */}
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-400 dark:border-blue-600/60 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              الحي الأول (أ)
            </span>
            <span className="text-xs text-slate-400 font-mono">{d1.city}</span>
          </div>

          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">اختر الحي للمقارنة:</label>
            <select
              value={district1Id}
              onChange={e => setDistrict1Id(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-sm sm:text-base rounded-2xl px-4 py-3 border border-blue-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              {saudiDistricts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.city}) - {d.zoneType}
                </option>
              ))}
            </select>
          </div>

          {/* Metric Details */}
          <div className="space-y-3 pt-2">
            <div className="bg-blue-50/50 dark:bg-slate-950 p-4 rounded-2xl border border-blue-100 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">سعر المتر السكني</span>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {d1.avgPriceM2Residential.toLocaleString('en-US')} <span className="text-xs font-sans text-slate-400">ر.س / م²</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-blue-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block">سعر المتر التجاري</span>
                <strong className="text-slate-900 dark:text-white font-mono text-sm">{d1.avgPriceM2Commercial.toLocaleString('en-US')} ر.س</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-blue-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block">النمو السنوي</span>
                <strong className="text-blue-600 dark:text-blue-400 font-mono text-sm">+{d1.yearlyChangePct}%</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-blue-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block">العائد الإيجاري</span>
                <strong className="text-blue-800 dark:text-blue-300 font-mono text-sm">{d1.rentalYieldPct}%</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-blue-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block">مستوى الطلب</span>
                <strong className="text-blue-600 dark:text-blue-400 text-sm">{d1.demandLevel}</strong>
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              أبرز المعالم القريبة: <span className="text-slate-800 dark:text-slate-200 font-medium">{d1.nearbyProjects.join('، ')}</span>
            </div>
          </div>
        </div>

        {/* District 2 Selector Card (Sky Blue) */}
        <div className="bg-white dark:bg-slate-900 border-2 border-sky-400 dark:border-sky-600/60 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/40 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800">
              الحي الثاني (ب)
            </span>
            <span className="text-xs text-slate-400 font-mono">{d2.city}</span>
          </div>

          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">اختر الحي للمقارنة:</label>
            <select
              value={district2Id}
              onChange={e => setDistrict2Id(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-sm sm:text-base rounded-2xl px-4 py-3 border border-sky-200 dark:border-slate-700 focus:outline-none focus:border-sky-600 cursor-pointer"
            >
              {saudiDistricts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.city}) - {d.zoneType}
                </option>
              ))}
            </select>
          </div>

          {/* Metric Details */}
          <div className="space-y-3 pt-2">
            <div className="bg-sky-50/50 dark:bg-slate-950 p-4 rounded-2xl border border-sky-100 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">سعر المتر السكني</span>
              <div className="text-2xl font-black text-sky-600 dark:text-sky-400 font-mono">
                {d2.avgPriceM2Residential.toLocaleString('en-US')} <span className="text-xs font-sans text-slate-400">ر.س / م²</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-sky-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block">سعر المتر التجاري</span>
                <strong className="text-slate-900 dark:text-white font-mono text-sm">{d2.avgPriceM2Commercial.toLocaleString('en-US')} ر.س</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-sky-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block">النمو السنوي</span>
                <strong className="text-sky-600 dark:text-sky-400 font-mono text-sm">+{d2.yearlyChangePct}%</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-sky-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block">العائد الإيجاري</span>
                <strong className="text-sky-800 dark:text-sky-300 font-mono text-sm">{d2.rentalYieldPct}%</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-sky-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block">مستوى الطلب</span>
                <strong className="text-sky-600 dark:text-sky-400 text-sm">{d2.demandLevel}</strong>
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              أبرز المعالم القريبة: <span className="text-slate-800 dark:text-slate-200 font-medium">{d2.nearbyProjects.join('، ')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Summary Verdict Bar (Blue & White) */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-blue-950 dark:text-white flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>ملخص الفروقات الاستثمارية</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-blue-50/50 dark:bg-slate-950 p-3 rounded-2xl border border-blue-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 block mb-1">فارق سعر المتر السكني</span>
            <div className="font-mono font-bold text-blue-950 dark:text-white text-sm">
              {Math.abs(d1.avgPriceM2Residential - d2.avgPriceM2Residential).toLocaleString('en-US')} ر.س
            </div>
            <div className="text-[11px] text-blue-600 mt-1">
              {d1.avgPriceM2Residential > d2.avgPriceM2Residential ? `أعلى في ${d1.name}` : `أعلى في ${d2.name}`}
            </div>
          </div>

          <div className="bg-blue-50/50 dark:bg-slate-950 p-3 rounded-2xl border border-blue-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 block mb-1">الأعلى في العائد الإيجاري</span>
            <div className="font-mono font-bold text-blue-950 dark:text-white text-sm">
              {d1.rentalYieldPct > d2.rentalYieldPct ? `${d1.name} (${d1.rentalYieldPct}%)` : `${d2.name} (${d2.rentalYieldPct}%)`}
            </div>
            <div className="text-[11px] text-blue-600 mt-1">
              فارق {Math.abs(d1.rentalYieldPct - d2.rentalYieldPct).toFixed(1)}% في العائد
            </div>
          </div>

          <div className="bg-blue-50/50 dark:bg-slate-950 p-3 rounded-2xl border border-blue-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 block mb-1">الأعلى في النمو السنوي</span>
            <div className="font-mono font-bold text-blue-950 dark:text-white text-sm">
              {d1.yearlyChangePct > d2.yearlyChangePct ? `${d1.name} (+${d1.yearlyChangePct}%)` : `${d2.name} (+${d2.yearlyChangePct}%)`}
            </div>
            <div className="text-[11px] text-blue-600 mt-1">
              نمو رأسمالي أسرع
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
