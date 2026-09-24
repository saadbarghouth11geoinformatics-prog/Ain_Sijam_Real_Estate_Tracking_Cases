import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  BarChart3, 
  Table, 
  Calculator, 
  Briefcase, 
  Bot, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Clock,
  Building2,
  DollarSign,
  Users,
  Compass,
  LineChart,
  HardHat
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { City } from '../types';
import { saudiDistricts } from '../data/mockRealEstateData';
import { AinSigamLogo } from './AinSigamLogo';
import { ScrollReveal } from './ScrollReveal';
import { VisualBannersShowcase } from './VisualBannersShowcase';

interface BaseetaCleanHomeProps {
  onNavigate: (sectionId: string) => void;
  onSearchSelectDistrict: (district: string) => void;
  onOpenAdvisor?: (prompt: string) => void;
  selectedCity?: City | 'الكل';
  isSubscriber?: boolean;
  onOpenSubscriptionModal?: () => void;
}

export const BaseetaCleanHome: React.FC<BaseetaCleanHomeProps> = ({
  onNavigate,
  onSearchSelectDistrict,
  onOpenAdvisor,
  isSubscriber = false,
  onOpenSubscriptionModal,
}) => {
  const { t, isAr } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Quick suggestions for search
  const popularDistricts = [
    { nameAr: 'حي النرجس', nameEn: 'Al Narjis', city: 'الرياض' },
    { nameAr: 'حي حطين', nameEn: 'Hittin', city: 'الرياض' },
    { nameAr: 'حي الملقا', nameEn: 'Al Malqa', city: 'الرياض' },
    { nameAr: 'حي الشاطئ', nameEn: 'Al Shate\'a', city: 'جدة' },
    { nameAr: 'حي السلامة', nameEn: 'Al Salama', city: 'جدة' },
  ];

  const handleSearchSubmit = (district: string) => {
    setSearchQuery(district);
    setShowSuggestions(false);
    onSearchSelectDistrict(district);
  };

  // Sample compact deals (clean examples without overwhelming)
  const sampleDeals = [
    {
      id: 'D-101',
      districtAr: 'حي النرجس',
      districtEn: 'Al Narjis',
      city: 'الرياض',
      typeAr: 'أرض سكنية',
      typeEn: 'Residential Land',
      area: 450,
      totalPrice: 2475000,
      pricePerMeter: 5500,
      timeAr: 'قبل 15 دقيقة',
      timeEn: '15m ago',
    },
    {
      id: 'D-102',
      districtAr: 'حي حطين',
      districtEn: 'Hittin',
      city: 'الرياض',
      typeAr: 'فيلا مستقلة',
      typeEn: 'Standalone Villa',
      area: 390,
      totalPrice: 3822000,
      pricePerMeter: 9800,
      timeAr: 'قبل ساعة',
      timeEn: '1h ago',
    },
    {
      id: 'D-103',
      districtAr: 'حي الشاطئ',
      districtEn: 'Al Shate\'a',
      city: 'جدة',
      typeAr: 'شقة فاخرة',
      typeEn: 'Luxury Apartment',
      area: 210,
      totalPrice: 1575000,
      pricePerMeter: 7500,
      timeAr: 'قبل ساعتين',
      timeEn: '2h ago',
    },
  ];

  // Core services list (clean cards methodology like Paseetah)
  const services = [
    {
      id: 'map',
      titleAr: 'الخريطة العقارية التفاعلية',
      titleEn: 'Interactive Real Estate Map',
      descAr: 'استكشاف مكاني دقيق لكافة الصفقات وقطع الأراضي والمخططات التنظيمية.',
      descEn: 'Spatial discovery of land parcels, zoned subdivisions, and verified deals.',
      icon: MapPin,
      tagAr: 'خريطة تفاعلية',
      tagEn: 'Interactive',
      metricAr: 'دقة رصد فضائي 0.05م',
      metricEn: '0.05m Spatial Precision'
    },
    {
      id: 'indicators',
      titleAr: 'مؤشر الأسعار والمتر المربع',
      titleEn: 'Price Index & Sqm Analysis',
      descAr: 'تتبع متوسط سعر المتر الفعلي وحركة العرض والطلب الموثقة رسمياً.',
      descEn: 'Track average price per sqm and real-time transaction trends.',
      icon: BarChart3,
      tagAr: 'مؤشرات لحظية',
      tagEn: 'Live Trends',
      metricAr: '1,400+ حي مغطى بالكامل',
      metricEn: '1,400+ Districts Covered'
    },
    {
      id: 'deals',
      titleAr: 'سجل الصفقات العقارية',
      titleEn: 'Official MOJ Deals Feed',
      descAr: 'صفقات يومية مباشرة من وزارة العدل والسجل العقاري مع إمكانية الفلترة.',
      descEn: 'Daily transactions directly from the Ministry of Justice and Land Registry.',
      icon: Table,
      tagAr: 'بيانات موثقة',
      tagEn: 'Verified Data',
      metricAr: '4.2M+ صفقة موثقة بالصكوك',
      metricEn: '4.2M+ Verified Title Deeds'
    },
    {
      id: 'calculator',
      titleAr: 'حاسبة العوائد والتمويل',
      titleEn: 'ROI & Yield Calculator',
      descAr: 'حساب العائد الإيجاري الصافي والأقساط التمويلية بضغطة زر واحدة.',
      descEn: 'Estimate net rental yields and monthly financing payments with ease.',
      icon: Calculator,
      tagAr: 'تقييم فوري',
      tagEn: 'Instant Valuation',
      metricAr: 'حساب العائد الإيجاري ومعدل Cap Rate',
      metricEn: 'Net Cap Rate & Yield Formulas'
    },
  ];

  // Target audience segmentation for institutional & private clients
  const [selectedAudience, setSelectedAudience] = useState<'investors' | 'developers' | 'brokers' | 'analysts'>('investors');

  const audienceSegments = [
    {
      id: 'investors',
      icon: TrendingUp,
      titleAr: 'المستثمرون والصناديق العقارية',
      titleEn: 'Real Estate Investors & Funds',
      badgeAr: 'عوائد استثمارية وتدقيق الصفقات',
      badgeEn: 'ROI & Deed Due Diligence',
      summaryAr: 'تمكين المستثمرين من قراءة السوق الحقيقية قبل الشراء، وتقييم العوائد ومقارنة نمو الأحياء بالاعتماد على صفقات الصكوك الموثقة رسمياً.',
      summaryEn: 'Empowering institutional and private investors with verified market benchmarks, rental yields, and neighborhood growth trajectories.',
      pointsAr: [
        'تحليل تاريخي ومستقبلي لمتوسط سعر المتر في أكثر من 1,400 حي سعودي.',
        'حساب دقيق لصافي العائد الإيجاري ومعدل الرسملة (Cap Rate) وفترات الاسترداد.',
        'تدقيق سجل الصفقات الحقيقية المفرغة بوزارة العدل لكشف حركة السيولة الفعلية.'
      ],
      pointsEn: [
        'Historical and predictive price/sqm across 1,400+ Saudi districts.',
        'Precise net rental yield, Cap Rate, and payback period calculation.',
        'Direct Ministry of Justice deed registry audits tracking verified liquidity.'
      ],
      ctaTextAr: 'انتقل لحاسبة العوائد والتقييم',
      ctaTextEn: 'Launch Valuation & ROI Calculator',
      ctaAction: 'calculator'
    },
    {
      id: 'developers',
      icon: HardHat,
      titleAr: 'المطورون وشركات المقاولات',
      titleEn: 'Developers & Construction Firms',
      badgeAr: 'مطابقة CAD وهندسة التربة',
      badgeEn: 'CAD Alignment & Soil Engineering',
      summaryAr: 'أدوات جيوتقنية وهندسية متكاملة لربط مخططات الكاد بالواقع الميداني، والتأكد من مطابقة اشتراطات كود البناء السعودي SBC وسلامة التربة.',
      summaryEn: 'Geotechnical and spatial workflows comparing CAD blueprints to satellite reality while verifying SBC building codes and soil strata.',
      pointsAr: [
        'مطابقة المخططات الهندسية (CAD vs Reality) بالأقمار الصناعية لكشف انزياحات الارتدادات بدقة ±1.8 سم.',
        'فحص طبوغرافي لطبقات التربة وقوة التحمل ومناسيب المياه الجوفية وفق كود SBC 303.',
        'متابعة دورية لمراحل صب الخرسانة ونسب إنجاز المشاريع الكبرى بالصور الفضائية.'
      ],
      pointsEn: [
        'CAD vs Reality satellite overlay detecting boundary shifts & regulatory setback clashes within ±1.8cm.',
        'Soil bearing capacity and water table checks aligned with Saudi Building Code SBC 303.',
        'Satellite-based milestone verification tracking concrete pouring and completion rates.'
      ],
      ctaTextAr: 'استكشف التوأمة الرقمية ومطابقة CAD',
      ctaTextEn: 'Explore Digital Twin & CAD',
      ctaAction: 'digital-twin-360'
    },
    {
      id: 'brokers',
      icon: Users,
      titleAr: 'الوسطاء والمسوقون المعتمدون',
      titleEn: 'Certified Brokers & Real Estate Agents',
      badgeAr: 'تسعير موثوق وتأهيل العملاء',
      badgeEn: 'Certified Pricing & Client Reports',
      summaryAr: 'بناء الثقة مع العملاء ببيانات حقيقية موثقة؛ استخراج تقارير فحص مكانية سريعة، ومقارنة فورية لأسعار الأحياء تزيد سرعة إتمام الصفقات.',
      summaryEn: 'Build immediate client trust with verified transaction data, rapid neighborhood comparisons, and certified spatial valuation summaries.',
      pointsAr: [
        'تزويد المشترين والبائعين بأسعار السوق الواقعية الموثقة في السجلات الرسمية.',
        'إصدار تقارير فحص مكانية وتقييم جغرافي فوري معتمد لكل قطعة أرض أو عقار.',
        'مقارنة فورية للأحياء المتجاورة لمساعدة العميل على اتخاذ قرار الشراء بثقة.'
      ],
      pointsEn: [
        'Empower buyers and sellers with verified real-world transaction price benchmarks.',
        'Generate instant geospatial appraisal summaries for any parcel or building.',
        'Instant district comparisons giving clients complete confidence in purchasing.'
      ],
      ctaTextAr: 'قارن بين الأحياء فورياً',
      ctaTextEn: 'Compare Districts Now',
      ctaAction: 'district-comparator'
    },
    {
      id: 'analysts',
      icon: LineChart,
      titleAr: 'المحللون الماليون والباحثون',
      titleEn: 'Financial Analysts & Market Researchers',
      badgeAr: 'سلاسل زمنية وتصدير البيانات',
      badgeEn: 'Time-Series & Big Data Exports',
      summaryAr: 'بيانات أولية وسلاسل زمنية جاهزة للتصدير والنمذجة المالية، مع مؤشرات تتبع سرعة دوران العقار والسيولة في السوق السعودي.',
      summaryEn: 'Clean time-series datasets ready for econometric modeling, liquidity velocity analytics, and structured data exports.',
      pointsAr: [
        'تصدير قواعد بيانات الصفقات بصيغ CSV و Excel للتحليل الكمي والنمذجة المالية.',
        'مؤشرات حجم التداول والسيولة وتقلبات الأسعار الفصلية عبر مناطق المملكة.',
        'محرك استشارات ذكي مدرب على اللوائح البلدية واشتراطات الكود السعودي.'
      ],
      pointsEn: [
        'Export structured transaction datasets to CSV & Excel for econometric modeling.',
        'Track transaction velocity, liquidity indices, and quarterly price volatility.',
        'Domain-specialized AI engine grounded in municipal regulations and SBC codes.'
      ],
      ctaTextAr: 'استعراض وتصدير الصفقات',
      ctaTextEn: 'Browse & Export Deals',
      ctaAction: 'deals'
    }
  ];

  return (
    <div className="w-full" dir={isAr ? 'rtl' : 'ltr'}>
      <style>{`
        @keyframes ainHeroImageIn { from { opacity: .72; transform: scale(1.025); } to { opacity: 1; transform: scale(1); } }
        @keyframes ainHeroReveal { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .ain-hero-image { animation: ainHeroImageIn 650ms cubic-bezier(.16,1,.3,1) both; object-position: center 48%; }
        .ain-hero-reveal { animation: ainHeroReveal 550ms cubic-bezier(.16,1,.3,1) both; }
        @media (max-width: 639px) { .ain-hero-image { object-position: 63% 52%; } }
        @media (prefers-reduced-motion: reduce) { .ain-hero-image, .ain-hero-reveal { animation: none !important; } }
      `}</style>
      
      {/* 1. HERO SECTION: a full-bleed Riyadh geospatial command center */}
      <section className="relative isolate min-h-[690px] w-full overflow-hidden bg-slate-950 text-center sm:min-h-[calc(100vh-6.5rem)]">
          {/* The Riyadh panorama remains visible beneath deliberately light, directional overlays. */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/images_webp/03-riyadh-skyline-wide.webp"
              alt={t('بانوراما الأفق العمراني الواسع لمدينة الرياض وتخطيط الأراضي', 'Wide Panoramic Skyline of Riyadh & Strategic Land Planning')}
              className="ain-hero-image h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/35" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,26,54,0.68)_0%,rgba(8,26,54,0.35)_43%,rgba(8,26,54,0.08)_72%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#061327]/90 via-[#081b37]/45 to-transparent" />

            {/* Floating Glassmorphic Telemetry Overlay (Top Corners) */}
            <div className="absolute top-6 start-6 hidden items-center gap-2 border border-white/15 bg-slate-950/45 px-3 py-1.5 text-[11px] font-mono text-emerald-300 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>KSA-GRF: FIXED</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">24.7136° N, 46.6753° E</span>
            </div>

            <div className="absolute top-6 end-6 hidden items-center gap-2 border border-white/15 bg-slate-950/45 px-3 py-1.5 text-[11px] font-mono text-sky-200 sm:flex">
              <span>ORBITAL RES: 0.05m</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-400">SBC 303 VALID</span>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-[690px] max-w-5xl flex-col items-center justify-center px-5 pb-10 pt-24 sm:min-h-[calc(100vh-6.5rem)] sm:px-8 sm:pb-12 sm:pt-28">
          {/* Content Container */}
          <div className="w-full space-y-5 sm:space-y-6">
            {/* Brand Tagline Badge */}
            <div className="ain-hero-reveal inline-flex items-center gap-2 border border-sky-300/35 bg-[#0a2348]/65 px-4 py-2 text-xs font-bold text-sky-100 backdrop-blur-sm sm:text-sm" style={{ animationDelay: '80ms' }}>
              <AinSigamLogo size="sm" variant="mark-only" />
              <span>{t('منظومة عين سيجام لتخطيط الأراضي والذكاء العقاري المعتمد بالمملكة', 'Ain Sigam - Certified Spatial & Real Estate Platform in KSA')}</span>
            </div>

            {/* Main Title & Subtitle with Strong Contrast & Readability */}
            <div className="ain-hero-reveal mx-auto max-w-3xl space-y-3" style={{ animationDelay: '160ms' }}>
              <h1 className="font-['Cairo'] text-3xl font-black leading-[1.32] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-[3.6rem]">
                {t('تخطيط الأراضي والبيانات العقارية...', 'Land Planning & Real Estate Data...')} <br className="hidden sm:inline" />
                <span className="font-black text-sky-300">
                  {t('بدقة ورؤية عين سيجام', 'With Precision & Vision of Ain Sigam')}
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-sm font-semibold leading-7 text-slate-100 drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)] sm:text-base lg:text-lg">
                {t(
                  'استكشف صفقات السوق العقاري، أسعار المتر في الأحياء، وفحص صلاحية الأراضي والتخطيط العمراني المعتمد بدون تعقيد.',
                  'Explore market transactions, price per sq. meter, and certified land suitability & master planning indicators.'
                )}
              </p>
            </div>

            {/* Search Bar - Crisp Floating Container */}
            <div className="ain-hero-reveal relative mx-auto max-w-xl pt-1" style={{ animationDelay: '240ms' }}>
              <div className="relative flex items-center border border-white/80 bg-white/95 p-1.5 shadow-xl transition-colors focus-within:border-sky-400 dark:border-slate-600 dark:bg-slate-900/95">
                <Search className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-3 ml-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder={t('ابحث بالحي أو المدينة (مثال: حي النرجس، الملقا، الشاطئ)...', 'Search district or city (e.g. Al Narjis, Al Malqa)...')}
                  className="w-full bg-transparent text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none px-2 py-1.5 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 text-xs px-2 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={() => handleSearchSubmit(searchQuery || 'حي النرجس')}
                  className="shrink-0 bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-blue-500 sm:text-sm"
                >
                  {t('بحث', 'Search')}
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full z-30 mt-2 w-full border border-slate-200 bg-white/98 p-2 text-start shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/98">
                  <div className="text-[10px] font-bold text-slate-400 px-3 py-1 mb-1">
                    {t('أحياء مقترحة للبحث السريع:', 'Popular suggested districts:')}
                  </div>
                  <div className="space-y-1">
                    {popularDistricts.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => handleSearchSubmit(d.nameAr)}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-start"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-semibold">{isAr ? d.nameAr : d.nameEn}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{d.city}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Click Tags below search with high-contrast pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs">
                <span className="text-white font-bold text-[11px] drop-shadow-md">{t('أحياء شائعة:', 'Trending:')}</span>
                {popularDistricts.slice(0, 4).map((d, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearchSubmit(d.nameAr)}
                    className="border border-white/20 bg-slate-900/75 px-2.5 py-1 text-[11px] font-medium text-white transition-colors hover:bg-blue-600"
                  >
                    {isAr ? d.nameAr : d.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear & Prominent Primary Calls to Action */}
            <div className="ain-hero-reveal flex flex-col items-stretch justify-center gap-3 pt-1 sm:flex-row sm:items-center" style={{ animationDelay: '320ms' }}>
              <button
                onClick={() => onNavigate('map')}
                className="flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-950/30 transition-colors hover:bg-blue-500 sm:text-sm"
              >
                <MapPin className="w-4 h-4 text-sky-200" />
                <span>{t('استكشف الخريطة العقارية المباشرة', 'Explore Live Spatial Map')}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center justify-center gap-2 border border-white/25 bg-slate-950/60 px-6 py-3 text-xs font-bold text-white shadow-lg backdrop-blur-sm transition-colors hover:border-sky-300 hover:bg-slate-950/80 sm:text-sm"
              >
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>{t('حاسبة التقييم والعوائد', 'Valuation & ROI Calculator')}</span>
              </button>
            </div>

            {/* 3 Key Stats Pills with clear glass backdrop and bright text */}
            <div className="ain-hero-reveal mx-auto grid max-w-2xl grid-cols-3 gap-2 pt-2 sm:gap-4" style={{ animationDelay: '400ms' }}>
              <div className="border-t border-white/35 bg-slate-950/45 p-3 text-center backdrop-blur-sm sm:p-4">
                <div className="text-base sm:text-2xl font-black text-white font-mono">4.2M+</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">{t('صفقة موثقة', 'Verified Deals')}</div>
              </div>
              <div className="border-t border-white/35 bg-slate-950/45 p-3 text-center backdrop-blur-sm sm:p-4">
                <div className="text-base sm:text-2xl font-black text-white font-mono">1,400+</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">{t('حي بالمملكة', 'Districts in KSA')}</div>
              </div>
              <div className="border-t border-white/35 bg-slate-950/45 p-3 text-center backdrop-blur-sm sm:p-4">
                <div className="text-base sm:text-2xl font-black text-sky-400 font-mono">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">{t('بيانات معتمدة', 'Official Sources')}</div>
              </div>
            </div>
          </div>
          </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16">
      {/* 2. CORE SERVICES SECTION: High-Definition Background Container with Crisp Overlay & Transparent White Text */}
      <ScrollReveal direction="up" delayMs={50}>
        <section className="relative overflow-hidden rounded-3xl border border-slate-700/60 shadow-2xl p-6 sm:p-10 group">
          {/* Background Container using drive_banner_03 with object-cover */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src="/images/drive-banners/drive_banner_03.png"
              alt={t('استقراء الأفق المعماري والأسعار', 'Skyline & Architectural Index')}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              style={{ objectPosition: 'center 45%' }}
            />
            {/* Soft overlay ensuring high contrast and pristine legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/80 to-slate-950/90 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold shadow-xs backdrop-blur-md mb-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('حلول مكانية متقدمة', 'Advanced Spatial Solutions')}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white font-['Cairo'] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {t('خدمات وحلول عين سيجام', 'Ain Sigam Core Solutions')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl mx-auto font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                {t('أدوات تحليل أراضي وعقار مباشرة وسهلة الاستخدام لكل مستثمر ومطور', 'Intuitive land & real estate analytics for every investor and developer')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="card-interactive-lift group/card p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900/95 backdrop-blur-md border border-white/15 hover:border-sky-400 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between h-full focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigate(item.id);
                      }
                    }}
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center group-hover/card:bg-sky-500 group-hover/card:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-white group-hover/card:text-sky-300 transition-colors">
                          {isAr ? item.titleAr : item.titleEn}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1 font-normal">
                          {isAr ? item.descAr : item.descEn}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2 border-t border-white/10 mt-3">
                      <div className="text-[11px] font-mono text-emerald-400 opacity-90 group-hover/card:opacity-100 transition-opacity">
                        {isAr ? item.metricAr : item.metricEn}
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-sky-300 group-hover/card:text-sky-200">
                        <span>{t('استكشف الآن', 'Explore')}</span>
                        {isAr ? <ArrowLeft className="w-4 h-4 group-hover/card:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover/card:translate-x-1 transition-transform" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 2.5 INTERACTIVE AUDIENCE USE CASES (Investors, Developers, Brokers, Analysts) */}
      <ScrollReveal direction="up" delayMs={75}>
        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 text-xs font-bold mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>{t('حلول مصممة لمجتمع الأعمال العقاري', 'Tailored for Real Estate Professionals')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Cairo']">
                {t('كيف تخدم «عين سيجام» متطلبات دورك؟', 'How Ain Sigam Empowers Your Exact Role')}
              </h2>
            </div>

            {/* Audience Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 self-start sm:self-auto">
              {audienceSegments.map((segment) => {
                const isSelected = selectedAudience === segment.id;
                const Icon = segment.icon;
                return (
                  <button
                    key={segment.id}
                    onClick={() => setSelectedAudience(segment.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{isAr ? (segment.id === 'investors' ? 'المستثمرون' : segment.id === 'developers' ? 'المطورون' : segment.id === 'brokers' ? 'الوسطاء' : 'المحللون') : segment.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Audience Content Showcase */}
          {(() => {
            const currentSeg = audienceSegments.find(s => s.id === selectedAudience) || audienceSegments[0];
            const SegIcon = currentSeg.icon;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="lg:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">
                      {isAr ? currentSeg.badgeAr : currentSeg.badgeEn}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-['Cairo']">
                      {isAr ? currentSeg.titleAr : currentSeg.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {isAr ? currentSeg.summaryAr : currentSeg.summaryEn}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                    {(isAr ? currentSeg.pointsAr : currentSeg.pointsEn).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate(currentSeg.ctaAction)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>{isAr ? currentSeg.ctaTextAr : currentSeg.ctaTextEn}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-sky-300 flex items-center justify-center">
                    <SegIcon className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {isAr ? 'بيانات معتمدة ومحدثة لحظياً' : 'Real-time Certified Datasets'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {isAr ? 'متصلة مباشرة بوزارة العدل والهيئة العامة للعقار' : 'Direct MOJ & REGA Integrations'}
                    </div>
                  </div>
                  <div className="w-full pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    SBC & REGA VERIFIED
                  </div>
                </div>
              </div>
            );
          })()}
        </section>
      </ScrollReveal>

      {/* 3. VISUAL BANNERS SHOWCASE: High-definition Google Drive images with scroll fade-in & transparent captions */}
      <VisualBannersShowcase onNavigate={onNavigate} />

      {/* 4. RECENT DEALS PREVIEW: Background Container with drive_banner_04, Soft Overlay & Glass Cards */}
      <ScrollReveal direction="up" delayMs={100}>
        <section className="relative overflow-hidden rounded-3xl border border-slate-700/60 p-6 sm:p-8 shadow-2xl group space-y-6">
          {/* Background Container using drive_banner_04 with object-cover */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src="/images/drive-banners/drive_banner_04.png"
              alt={t('المواقع الإنشائية وأسطول المعدات الحية', 'Construction Sites & Machinery Fleet')}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              style={{ objectPosition: 'center 40%' }}
            />
            {/* Soft overlay ensuring high contrast and pristine legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/80 to-slate-950/85 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-['Cairo'] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {t('عينة من أحدث صفقات اليوم', 'Sample Verified Deals Today')}
                  </h2>
                </div>
                <p className="text-xs text-slate-200/90 mt-0.5 font-medium">
                  {t('بيانات موثقة من وزارة العدل والسجل العقاري مع إحصائيات سعر المتر', 'Live recorded transactions from the Ministry of Justice')}
                </p>
              </div>

              <button
                onClick={() => onNavigate('deals')}
                className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-white font-bold text-xs transition-colors cursor-pointer shadow-lg backdrop-blur-md flex items-center gap-1.5"
              >
                <span>{t('عرض كافة الصفقات', 'View All Deals')}</span>
                {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* 3 Simple, Clear Deal Cards in Frosted Glass */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {sampleDeals.map((deal) => (
                <div 
                  key={deal.id}
                  onClick={() => onNavigate('deals')}
                  className="p-4 rounded-2xl bg-slate-950/75 hover:bg-slate-950/90 backdrop-blur-md border border-white/15 hover:border-sky-400 transition-all cursor-pointer space-y-3 shadow-xl group/deal"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white group-hover/deal:text-sky-300 transition-colors">
                      {isAr ? deal.districtAr : deal.districtEn}
                    </span>
                    <span className="text-[10px] text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-400" />
                      {isAr ? deal.timeAr : deal.timeEn}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>{isAr ? deal.typeAr : deal.typeEn}</span>
                    <span className="font-mono text-slate-200 font-semibold">{deal.area} م²</span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400">{t('سعر المتر', 'Price/sqm')}</div>
                      <div className="text-sm font-bold text-sky-400 font-mono">
                        {deal.pricePerMeter.toLocaleString()} {t('ر.س', 'SAR')}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="text-[10px] text-slate-400">{t('إجمالي الصفقة', 'Total Price')}</div>
                      <div className="text-xs font-bold text-white font-mono">
                        {(deal.totalPrice / 1000000).toFixed(2)} {t('مليون', 'M')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. AI ADVISOR & ANALYTICAL INSIGHTS: Background Container with drive_banner_02, Soft Overlay & Transparent White Text */}
      <ScrollReveal direction="up" delayMs={100}>
        <section className="relative overflow-hidden rounded-3xl border border-slate-700/60 p-6 sm:p-8 shadow-2xl group">
          {/* Background Container using drive_banner_02 with object-cover */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src="/images/drive-banners/drive_banner_02.png"
              alt={t('مخططات هندسية وتوأمة رقمية لكاد', 'Engineering Blueprints & CAD Digital Twin')}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              style={{ objectPosition: 'center 35%' }}
            />
            {/* Soft overlay ensuring high contrast and pristine legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/80 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/90 text-white flex items-center justify-center font-black shrink-0 shadow-lg shadow-blue-500/25 border border-white/20 backdrop-blur-md">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-xl text-white font-['Cairo'] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {t('تحويل البيانات العقارية إلى قرارات ذكية مع مستشار سيجام AI', 'Converting Real Estate Data into Actionable Intelligence with Sigam AI')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 mt-0.5 leading-relaxed font-medium">
                    {t('تحليل فوري لجدوى الشراء، متوسط أسعار المتر، ومقارنة الأحياء بدقة استناداً لصفقات السوق الموثقة', 'Instant feasibility analysis, price per sqm valuation, and district comparisons based on verified transactions')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => onOpenAdvisor ? onOpenAdvisor('ما هو متوسط سعر المتر السكني في حي النرجس؟') : onNavigate('advisor')}
                  className="px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-xs font-semibold text-white transition-colors cursor-pointer shadow-md backdrop-blur-md"
                >
                  {t('«ما هو متوسط المتر في النرجس؟»', '«Price in Al Narjis?»')}
                </button>
                <button
                  onClick={() => onOpenAdvisor ? onOpenAdvisor('كيف أقارن بين الاستثمار في الملقا وحطين؟') : onNavigate('advisor')}
                  className="px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-xs font-semibold text-white transition-colors cursor-pointer shadow-md backdrop-blur-md"
                >
                  {t('«مقارنة الملقا وحطين»', '«Compare Malqa & Hittin»')}
                </button>
                <button
                  onClick={() => onNavigate('advisor')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {t('ابدأ الاستشارة الذكية', 'Start AI Advisor')}
                </button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 group/thumb">
                <img
                  src="/images/drive-banners/drive_banner_02.png"
                  alt={t('مخططات هندسية وتوأمة رقمية لكاد', 'Engineering Blueprints & CAD Digital Twin')}
                  loading="lazy"
                  width="640"
                  height="480"
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700"
                  style={{ objectPosition: 'center 40%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
                
                {/* Transparent Glassmorphic Explanatory Overlay Caption */}
                <div className="absolute bottom-2.5 start-2.5 end-2.5 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white font-['Cairo']">{t('التوأمة الرقمية ومطابقة كاد', 'CAD Digital Twin & Blueprints')}</span>
                    <span className="font-mono text-emerald-400 text-[10px] bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">{t('مطابقة ±1.8cm', '±1.8cm Align')}</span>
                  </div>
                  <div className="text-[10px] text-slate-300 line-clamp-1">
                    {t('فحص تلقائي للارتدادات واشتراطات كود البناء SBC', 'Automated setback and Saudi Building Code SBC audit')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 6. PRICING TEASER: Background Container with drive_banner_01, Soft Overlay & Glass Cards */}
      <ScrollReveal direction="up" delayMs={100}>
        <section className="relative overflow-hidden rounded-3xl border border-slate-700/60 p-6 sm:p-10 shadow-2xl group space-y-6">
          {/* Background Container using drive_banner_01 with object-cover */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src="/images/drive-banners/drive_banner_01.png"
              alt={t('أفق وتخطيط الأراضي شمال مدينة الرياض', 'Riyadh Land Planning & Skyline')}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              style={{ objectPosition: 'center 60%' }}
            />
            {/* Soft overlay ensuring high contrast and pristine legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-slate-950/90 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-3xl font-black text-white font-['Cairo'] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {t('باقات مرنة تناسب احتياجك', 'Simple, Flexible Pricing')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl mx-auto font-medium">
                {t('ابدأ مجاناً الآن وقم بالترقية عند حاجتك لميزات متقدمة', 'Start free today and upgrade as your portfolio grows')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-start">
              
              {/* Free Tier */}
              <div className="p-6 rounded-2xl bg-slate-950/80 hover:bg-slate-950/90 backdrop-blur-md border border-white/15 space-y-4 shadow-xl transition-all">
                <div>
                  <div className="text-xs font-bold text-slate-300">{t('الباقة الأساسية', 'Starter')}</div>
                  <div className="text-xl font-black text-white mt-1">{t('مجاناً دائماً', 'Free Forever')}</div>
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>{t('استعراض الصفقات الحديثة والخريطة', 'Browse recent deals & live map')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>{t('حاسبة العوائد والتمويل الأساسية', 'Basic ROI & yield calculator')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>{t('مؤشرات أسعار الأحياء الرئيسية', 'Primary neighborhood price indices')}</span>
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('map')}
                  className="w-full py-2.5 rounded-xl border border-white/20 hover:border-sky-400 bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  {t('ابدأ الاستخدام مجاناً', 'Start Free')}
                </button>
              </div>

              {/* Pro Investor Tier */}
              <div className="p-6 rounded-2xl bg-slate-950/85 hover:bg-slate-950/95 backdrop-blur-xl border-2 border-sky-400 space-y-4 relative shadow-2xl transition-all">
                <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[10px] font-bold shadow-md">
                  {t('الأكثر طلباً', 'Most Popular')}
                </span>
                <div>
                  <div className="text-xs font-bold text-sky-300">{t('باقة المستثمر المحترف', 'Investor Pro')}</div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white font-mono">199</span>
                    <span className="text-xs text-slate-300 font-bold">{t('ر.س / شهر', 'SAR / mo')}</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>{t('تصدير بيانات وإكسل لكافة الصفقات', 'Export data & full deals database')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>{t('إدارة وتتبع محفظة عقارية غير محدودة', 'Unlimited portfolio holdings')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>{t('مستشار الذكاء الاصطناعي بلا قيود', 'Unlimited AI advisor consultations')}</span>
                  </li>
                </ul>
                <button
                  onClick={() => onOpenSubscriptionModal ? onOpenSubscriptionModal() : onNavigate('pricing')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  {isSubscriber ? t('أنت مشترك بالفعل', 'Active Member') : t('ترقية الحساب الآن', 'Upgrade to Pro')}
                </button>
              </div>

            </div>
          </div>
        </section>
      </ScrollReveal>

      </div>
    </div>
  );
};

export default BaseetaCleanHome;
