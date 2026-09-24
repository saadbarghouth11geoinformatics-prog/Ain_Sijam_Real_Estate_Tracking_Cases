import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Building2, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Trash2,
  PieChart,
  Home,
  Clock
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface PortfolioProperty {
  id: string;
  title: string;
  type: 'فيلا سكنية' | 'شقة فاخرة' | 'عمارة تجارية' | 'أرض استثمارية';
  city: string;
  district: string;
  areaM2: number;
  purchasePrice: number;
  currentValue: number;
  annualRent: number;
  status: 'مؤجر بنجاح' | 'قيد الإنشاء' | 'معروض للإيجار' | 'شاغر';
  imageUrl: string;
  purchaseDate: string;
}

const initialProperties: PortfolioProperty[] = [
  {
    id: 'port-1',
    title: 'فيلا مودرن في حي حطين',
    type: 'فيلا سكنية',
    city: 'الرياض',
    district: 'حطين',
    areaM2: 450,
    purchasePrice: 3800000,
    currentValue: 4650000,
    annualRent: 260000,
    status: 'مؤجر بنجاح',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80',
    purchaseDate: '2023-04'
  },
  {
    id: 'port-2',
    title: 'شقة سكنية استثمارية في النرجس',
    type: 'شقة فاخرة',
    city: 'الرياض',
    district: 'النرجس',
    areaM2: 185,
    purchasePrice: 920000,
    currentValue: 1240000,
    annualRent: 85000,
    status: 'مؤجر بنجاح',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    purchaseDate: '2022-11'
  },
  {
    id: 'port-3',
    title: 'أرض تجارية على طريق الملك عبدالعزيز',
    type: 'أرض استثمارية',
    city: 'الرياض',
    district: 'الياسمين',
    areaM2: 900,
    purchasePrice: 5400000,
    currentValue: 7200000,
    annualRent: 0,
    status: 'قيد الإنشاء',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    purchaseDate: '2021-08'
  },
  {
    id: 'port-4',
    title: 'شقة بإطلالة بحرية في حي الشاطئ',
    type: 'شقة فاخرة',
    city: 'جدة',
    district: 'الشاطئ',
    areaM2: 220,
    purchasePrice: 1750000,
    currentValue: 2150000,
    annualRent: 145000,
    status: 'مؤجر بنجاح',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    purchaseDate: '2023-01'
  }
];

export const BaseetaPortfolio: React.FC = () => {
  const { t, isAr } = useLanguage();
  const [properties, setProperties] = useState<PortfolioProperty[]>(initialProperties);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PortfolioProperty['type']>('فيلا سكنية');
  const [city, setCity] = useState('الرياض');
  const [district, setDistrict] = useState('');
  const [areaM2, setAreaM2] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [annualRent, setAnnualRent] = useState('');

  // Calculations
  const totalValue = properties.reduce((acc, p) => acc + p.currentValue, 0);
  const totalPurchase = properties.reduce((acc, p) => acc + p.purchasePrice, 0);
  const totalAnnualRent = properties.reduce((acc, p) => acc + p.annualRent, 0);
  const totalCapitalGain = totalValue - totalPurchase;
  const capitalGainPct = totalPurchase > 0 ? ((totalCapitalGain / totalPurchase) * 100).toFixed(1) : '0';
  const averageRentalYield = totalValue > 0 ? ((totalAnnualRent / totalValue) * 100).toFixed(1) : '0';

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !district || !areaM2 || !currentValue) return;

    const newProp: PortfolioProperty = {
      id: `port-${Date.now()}`,
      title,
      type,
      city,
      district,
      areaM2: Number(areaM2) || 200,
      purchasePrice: Number(purchasePrice) || Number(currentValue),
      currentValue: Number(currentValue) || 1000000,
      annualRent: Number(annualRent) || 0,
      status: Number(annualRent) > 0 ? 'مؤجر بنجاح' : 'معروض للإيجار',
      imageUrl: type === 'فيلا سكنية'
        ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
        : type === 'شقة فاخرة'
        ? 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      purchaseDate: new Date().toISOString().slice(0, 7)
    };

    setProperties([newProp, ...properties]);
    setIsAddModalOpen(false);

    // Reset Form
    setTitle('');
    setDistrict('');
    setAreaM2('');
    setPurchasePrice('');
    setCurrentValue('');
    setAnnualRent('');
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  return (
    <section id="portfolio" className="space-y-6">
      {/* 1. Header with Add Button & Architectural Asset Detail (08-kafd-city-detail.webp) */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Briefcase className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white">
                {t('المحفظة العقارية الذكية للمستثمرين والمطورين', 'Smart Real Estate Portfolio for Investors & Developers')}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 font-bold">
                {t('إدارة وتقييم فوري', 'Instant Valuation')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {t(
                'أداة ذكية وميسرة لإضافة أصولك العقارية، متابعة نمو أسعارها السوقية، وحساب العوائد الإيجارية الصافية بدقة وسهولة، مع مواكبة حركة التطوير العمراني في كبرى المدن السعودية.',
                'An intelligent, streamlined tool to track your real estate assets, monitor market capital growth, and compute net rental yields with ease while keeping pace with Saudi urban development.'
              )}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t('أضف عقاراً جديداً للمحفظة', 'Add Property to Portfolio')}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden border border-blue-100 dark:border-slate-800 shadow-sm aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 group">
              <img
                src="/images_webp/08-kafd-city-detail.webp"
                alt={t('تفاصيل معمارية حديثة ومشاريع التطوير العقاري في الرياض', 'Modern Architectural Details & Real Estate Assets in Riyadh')}
                loading="lazy"
                width="640"
                height="480"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                style={{ objectPosition: 'center 40%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 start-2.5 end-2.5 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-[11px] text-white flex items-center justify-between pointer-events-none">
                <span className="font-semibold">{t('الأصول والواجهات الحديثة', 'Urban Architecture Assets')}</span>
                <span className="font-mono text-sky-300 text-[10px]">{t('متابعة العائد', 'Yield Tracker')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Portfolio Key Metrics Summary Cards (Blue & White) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Portfolio Value */}
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('إجمالي قيمة المحفظة', 'Total Portfolio Value')}</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-950 dark:text-white font-mono">
            {totalValue.toLocaleString('en-US')} <span className="text-xs font-sans text-slate-400">ر.س</span>
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{capitalGainPct}% {t('نمو رأسمالي تراكمي', 'Capital Appreciation')}</span>
          </div>
        </div>

        {/* Metric 2: Annual Rental Income */}
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('الدخل الإيجاري السنوي', 'Annual Rental Income')}</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-950 dark:text-white font-mono">
            {totalAnnualRent.toLocaleString('en-US')} <span className="text-xs font-sans text-slate-400">ر.س</span>
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{Math.round(totalAnnualRent / 12).toLocaleString('en-US')} {t('ر.س شهرياً', 'SAR/month')}</span>
          </div>
        </div>

        {/* Metric 3: Average Yield % */}
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('متوسط عائد الإيجار', 'Average Rental Yield')}</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
            {averageRentalYield}%
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {t('أعلى من متوسط السوق العقاري (6.5%)', 'Outperforming market avg (6.5%)')}
          </div>
        </div>

        {/* Metric 4: Asset Count & Occupancy */}
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('عدد الأصول ونسبة الإشغال', 'Assets & Occupancy')}</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
              <Home className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-950 dark:text-white font-mono">
            {properties.length} <span className="text-xs font-sans text-slate-400">{t('عقارات', 'assets')}</span>
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>92% {t('نسبة عقود إيجار سارية', 'Active tenancy contracts')}</span>
          </div>
        </div>
      </div>

      {/* 3. Properties Cards Grid (Blue & White) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {properties.map(property => {
          const gain = property.currentValue - property.purchasePrice;
          const gainPct = ((gain / property.purchasePrice) * 100).toFixed(1);
          const yieldPct = property.currentValue > 0 ? ((property.annualRent / property.currentValue) * 100).toFixed(1) : '0';

          return (
            <div
              key={property.id}
              className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-300 dark:hover:border-slate-700 transition-all hover:shadow-lg flex flex-col justify-between group"
            >
              {/* Image & Status Badge */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={property.imageUrl} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
                  {property.status}
                </span>

                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/90 text-blue-900 shadow-sm">
                  {property.type}
                </span>

                <div className="absolute bottom-2 right-3 left-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-300" />
                    <span className="font-bold">{property.district}، {property.city}</span>
                  </div>
                  <span className="font-mono text-slate-200">{property.areaM2} م²</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                    {property.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>تاريخ الشراء: {property.purchaseDate}</span>
                  </div>
                </div>

                {/* Values Table */}
                <div className="bg-blue-50/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-blue-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">القيمة السوقية:</span>
                    <strong className="text-blue-950 dark:text-white font-mono">{property.currentValue.toLocaleString('en-US')} ر.س</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">سعر الشراء:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-mono">{property.purchasePrice.toLocaleString('en-US')} ر.س</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-blue-100 dark:border-slate-800/80 pt-1">
                    <span className="text-slate-500 dark:text-slate-400">الربح الرأسمالي:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono">+{gain.toLocaleString('en-US')} ر.س (+{gainPct}%)</span>
                  </div>
                  {property.annualRent > 0 && (
                    <div className="flex items-center justify-between border-t border-blue-100 dark:border-slate-800/80 pt-1">
                      <span className="text-slate-500 dark:text-slate-400">الإيجار السنوي:</span>
                      <span className="text-blue-700 dark:text-blue-300 font-bold font-mono">{property.annualRent.toLocaleString('en-US')} ر.س ({yieldPct}%)</span>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="flex items-center justify-between pt-1">
                  <button 
                    onClick={() => handleDeleteProperty(property.id)}
                    className="text-xs text-rose-500/80 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                    title="حذف من المحفظة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف</span>
                  </button>

                  <span className="text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-0.5 font-medium">
                    <span>محدّث تلقائياً</span>
                    <Sparkles className="w-3 h-3 text-blue-500" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Add Property Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-blue-950 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>إضافة عقار جديد إلى محفظتك</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                أدخل تفاصيل عقارك ليتم إدراجه ومتابعته وتقييمه تلقائياً بأحدث أسعار المتر.
              </p>
            </div>

            <form onSubmit={handleAddProperty} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">اسم العقار أو الوصف</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="مثال: شقة استثمارية برج رافال"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">نوع العقار</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                  >
                    <option value="فيلا سكنية">فيلا سكنية</option>
                    <option value="شقة فاخرة">شقة فاخرة</option>
                    <option value="عمارة تجارية">عمارة تجارية</option>
                    <option value="أرض استثمارية">أرض استثمارية</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">المدينة</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="الخبر">الخبر</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">الحي</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    placeholder="مثال: النرجس"
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">المساحة (م²)</label>
                  <input
                    type="number"
                    required
                    value={areaM2}
                    onChange={e => setAreaM2(e.target.value)}
                    placeholder="مثال: 350"
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">سعر الشراء (ر.س)</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={e => setPurchasePrice(e.target.value)}
                    placeholder="1,200,000"
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">القيمة الحالية (ر.س)</label>
                  <input
                    type="number"
                    required
                    value={currentValue}
                    onChange={e => setCurrentValue(e.target.value)}
                    placeholder="1,500,000"
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">الإيجار السنوي المتوقع إن وجد (ر.س)</label>
                <input
                  type="number"
                  value={annualRent}
                  onChange={e => setAnnualRent(e.target.value)}
                  placeholder="مثال: 75,000"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-blue-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 cursor-pointer"
                >
                  حفظ العقار بالمحفظة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
