import React, { useState, useMemo } from 'react';
import { 
  Table, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { sampleLiveDeals } from '../data/mockRealEstateData';
import { RealEstateDeal, City } from '../types';

export const BaseetaDealsTable: React.FC = () => {
  const { t, isAr } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('الكل');
  const [selectedUsage, setSelectedUsage] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeal, setSelectedDeal] = useState<RealEstateDeal | null>(null);

  // Filtered deals
  const filteredDeals = useMemo(() => {
    return sampleLiveDeals.filter(deal => {
      const matchCity = selectedCity === 'الكل' || deal.city === selectedCity;
      const matchUsage = selectedUsage === 'الكل' || deal.usage === selectedUsage;
      const matchSearch = searchQuery.trim() === '' || 
        deal.district.includes(searchQuery) ||
        deal.dealNumber.includes(searchQuery) ||
        deal.propertyTypeName.includes(searchQuery) ||
        deal.subdivisionCode.includes(searchQuery);

      return matchCity && matchUsage && matchSearch;
    });
  }, [selectedCity, selectedUsage, searchQuery]);

  const handleExportCSV = () => {
    const headers = "رقم الصفقة,التاريخ,المدينة,الحي,نوع العقار,المساحة م²,سعر المتر ر.س,القيمة الإجمالية ر.س,المصدر\n";
    const rows = filteredDeals.map(d => 
      `"${d.dealNumber}","${d.date}","${d.city}","${d.district}","${d.propertyTypeName}",${d.areaM2},${d.pricePerM2},${d.totalPrice},"${d.source}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `paseetah_deals_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="deals" className="space-y-6">
      {/* 1. Header & Market Data Spotlight (Blue & White with 04-riyadh-kafd-kingdom-tower.webp) */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Table className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white">
                {t('الجداول العقارية والصفقات الرسمية بالمملكة', 'Saudi Real Estate Market Deals & Official Registry')}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 font-bold">
                {t('السجل العقاري • وزارة العدل', 'RE Registry • MOJ')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {t(
                'سجل فوري ومحدث لحظة بلحظة لكافة الصفقات العقارية المنفذة والمفرغة رسمياً، مع تتبع بيانات البيع والإيجار وأسعار المتر المربع عبر مدن المملكة وصناديق الريت العقارية.',
                'Instant, real-time log of all officially executed real estate sales, lease transactions, and sqm market data across Saudi cities and REIT benchmarks.'
              )}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{t('تصدير البيانات (CSV)', 'Export CSV')}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden border border-blue-100 dark:border-slate-800 shadow-sm aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 group">
              <img
                src="/images_webp/04-riyadh-kafd-kingdom-tower.webp"
                alt={t('أفق مدينة الرياض وبرج المملكة ومركز الملك عبدالله المالي', 'Riyadh Skyline, Kingdom Tower & KAFD')}
                loading="lazy"
                width="640"
                height="480"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                style={{ objectPosition: 'center 35%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 start-2.5 end-2.5 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-[11px] text-white flex items-center justify-between pointer-events-none">
                <span className="font-semibold">{t('حركة السوق العقاري بالعاصمة', 'Capital Real Estate Market Flow')}</span>
                <span className="font-mono text-sky-300 text-[10px]">{t('صفقات حية', 'Live Deals')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* City */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-xs rounded-xl px-3 py-2 border border-blue-100 dark:border-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="الكل">كافة المدن</option>
            <option value="الرياض">الرياض</option>
            <option value="جدة">جدة</option>
            <option value="الدمام">الدمام</option>
            <option value="الخبر">الخبر</option>
            <option value="مكة المكرمة">مكة المكرمة</option>
          </select>

          {/* Usage */}
          <select
            value={selectedUsage}
            onChange={(e) => setSelectedUsage(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-xs rounded-xl px-3 py-2 border border-blue-100 dark:border-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="الكل">كافة الاستخدامات</option>
            <option value="سكني">سكني</option>
            <option value="تجاري">تجاري</option>
            <option value="زراعي">زراعي</option>
          </select>

          <span className="text-xs text-blue-700 dark:text-blue-400 font-mono font-bold">
            {filteredDeals.length} صفقة معروضة
          </span>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالحي، رقم الصفقة أو المخطط..."
            className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl pr-9 pl-3 py-2 border border-blue-100 dark:border-slate-800 focus:outline-none focus:border-blue-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 3. Interactive Data Table (Blue & White) */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-blue-50/60 dark:bg-slate-950/80 border-b border-blue-100 dark:border-slate-800 text-blue-900 dark:text-slate-300 font-bold">
                <th className="p-4">رقم الصفقة</th>
                <th className="p-4">التاريخ والوقت</th>
                <th className="p-4">المدينة والحي</th>
                <th className="p-4">نوع العقار</th>
                <th className="p-4">المساحة</th>
                <th className="p-4">سعر المتر</th>
                <th className="p-4">القيمة الإجمالية</th>
                <th className="p-4">المصدر الموثق</th>
                <th className="p-4 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 dark:divide-slate-800/60 font-medium">
              {filteredDeals.map((deal) => (
                <tr 
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className="hover:bg-blue-50/40 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <td className="p-4 font-mono text-blue-600 dark:text-blue-400 font-bold">
                    #{deal.dealNumber}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 font-mono">
                    <div>{deal.date}</div>
                    <div className="text-[10px] text-slate-400">{deal.time}</div>
                  </td>
                  <td className="p-4 text-slate-900 dark:text-white">
                    <div className="font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>{deal.district}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{deal.city} • مخطط {deal.subdivisionCode}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      deal.usage === 'سكني' 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        : 'bg-sky-50 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                    }`}>
                      {deal.propertyTypeName}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-700 dark:text-slate-300">
                    {deal.areaM2.toLocaleString('en-US')} م²
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {deal.pricePerM2.toLocaleString('en-US')} <span className="text-[10px] font-sans text-slate-400">ر.س</span>
                  </td>
                  <td className="p-4 font-mono font-black text-blue-600 dark:text-blue-400">
                    {deal.totalPrice.toLocaleString('en-US')} <span className="text-[10px] font-sans text-slate-400">ر.س</span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      <span>{deal.source}</span>
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDeal(deal);
                      }}
                      className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-slate-800 group-hover:bg-blue-600 text-blue-600 dark:text-blue-300 group-hover:text-white text-[11px] font-bold transition-all cursor-pointer"
                    >
                      تفاصيل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-10 text-xs text-slate-400">
            لا توجد صفقات تطابق معايير البحث الحالية.
          </div>
        )}
      </div>

      {/* 4. Deal Detail Modal (Blue & White) */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setSelectedDeal(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-700 dark:hover:text-white text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-700 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-900/50 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-700">
                صفقة موثقة #{selectedDeal.dealNumber}
              </span>
              <h3 className="text-xl font-bold text-blue-950 dark:text-white pt-1">
                {selectedDeal.propertyTypeName} في حي {selectedDeal.district}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedDeal.city} • مخطط {selectedDeal.subdivisionCode} • قطعة رقم {selectedDeal.parcelNumber}
              </p>
            </div>

            <div className="bg-blue-50/50 dark:bg-slate-950/80 p-4 rounded-2xl border border-blue-100 dark:border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">القيمة الإجمالية:</span>
                <strong className="text-blue-600 dark:text-blue-400 text-base font-mono">{selectedDeal.totalPrice.toLocaleString('en-US')} ر.س</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">سعر المتر المربع:</span>
                <span className="text-blue-950 dark:text-white font-bold font-mono">{selectedDeal.pricePerM2.toLocaleString('en-US')} ر.س / م²</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">المساحة الإجمالية:</span>
                <span className="text-slate-800 dark:text-white font-mono">{selectedDeal.areaM2.toLocaleString('en-US')} م²</span>
              </div>
              <div className="flex items-center justify-between border-t border-blue-100 dark:border-slate-800/80 pt-2">
                <span className="text-slate-500 dark:text-slate-400">تاريخ الإفراغ:</span>
                <span className="text-slate-600 dark:text-slate-300 font-mono">{selectedDeal.date} ({selectedDeal.time})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">جهة التوثيق:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{selectedDeal.source}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedDeal(null)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
