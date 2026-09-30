import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Satellite, 
  Eye, 
  MapPin, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Compass, 
  Layers, 
  Database, 
  Cpu, 
  ArrowRight, 
  ArrowLeft,
  Search,
  ExternalLink,
  ChevronDown,
  Globe2,
  Users,
  Target,
  Zap,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AinSigamLogo } from './AinSigamLogo';

interface AboutAinSigamPageProps {
  onNavigate: (pageId: string) => void;
}

export const AboutAinSigamPage: React.FC<AboutAinSigamPageProps> = ({ onNavigate }) => {
  const { isAr, t } = useLanguage();

  // Interactive Pillar Selection (Emblem Anatomy)
  const [activePillar, setActivePillar] = useState<'eye' | 'pin' | 'towers'>('eye');

  // Interactive Tech Capability Tab
  const [activeTechTab, setActiveTechTab] = useState<number>(0);

  // Interactive Region Inspector
  const [selectedRegion, setSelectedRegion] = useState<string>('riyadh');

  // FAQ Search and Expand
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Emblem Pillars Data
  const emblemPillars = {
    eye: {
      titleAr: 'العين الاستشعارية الفضائية (The Spatial Eye)',
      titleEn: 'The Spatial Observation Eye',
      color: 'from-blue-600 to-sky-500',
      textColor: 'text-blue-500 dark:text-blue-400',
      bgLight: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-500/30',
      badgeAr: 'رصد جوي وفضائي',
      badgeEn: 'Earth Observation',
      descriptionAr: 'ترمز العين إلى الرؤية الاستشرافية ورصد حركة الأراضي والمشاريع من الفضاء عبر الأقمار الصناعية والتصوير الجوي عالي الدقة (LIDAR). تكشف تفاصيل التضاريس، الانحدارات، وتغيرات استخدامات الأراضي لحظة بلحظة.',
      descriptionEn: 'The eye represents high-altitude satellite intelligence, spatial monitoring, and LiDAR aerial capture, tracking topographic slopes and land-use shifts in real-time.',
      stats: [
        { labelAr: 'دقة الاستشعار', labelEn: 'Resolution', value: '0.05m' },
        { labelAr: 'تحديث أسبوعي', labelEn: 'Pass Frequency', value: '4x' },
        { labelAr: 'تغطية المملكة', labelEn: 'Coverage', value: '100%' }
      ]
    },
    pin: {
      titleAr: 'دبوس الموقع الجغرافي (Geospatial Anchor)',
      titleEn: 'Geospatial Anchor Pin',
      color: 'from-emerald-600 to-teal-500',
      textColor: 'text-emerald-500 dark:text-emerald-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-500/30',
      badgeAr: 'دقة الإحداثيات المكانية',
      badgeEn: 'Centimeter Accuracy',
      descriptionAr: 'يجسد الدبوس الأخضر الزمردي التثبيت المكاني الصارم وربط الصكوك العقارية بإحداثياتها الدقيقة في الشبكة الجيوديسية الوطنية للمملكة (KSA-GRF). يمنع التداخلات والازدواجيات ويضمن سلامة الحدود الفنية.',
      descriptionEn: 'The emerald pin embodies rigorous spatial ground-truthing, binding title deeds directly to the National Geodetic Reference Frame to prevent boundary disputes.',
      stats: [
        { labelAr: 'دقة المطابقة المكانية', labelEn: 'Positional Precision', value: '±1cm' },
        { labelAr: 'صكوك موثقة بالكامل', labelEn: 'Audited Deeds', value: '4.2M+' },
        { labelAr: 'فحص التداخلات', labelEn: 'Clash Avoidance', value: '99.9%' }
      ]
    },
    towers: {
      titleAr: 'أبراج التنمية العمرانية الثلاثية (Triple Skyline)',
      titleEn: 'Triple Urban Development Skyline',
      color: 'from-amber-600 to-yellow-500',
      textColor: 'text-amber-500 dark:text-amber-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-500/30',
      badgeAr: 'التخطيط والمعمار والجدوى',
      badgeEn: 'Planning & Feasibility',
      descriptionAr: 'تمثل الأبراج الثلاثة المتدرجة (الزمردي، الكحلي، والذهبي) التكامل بين كود البناء السعودي (SBC)، الجدوى المالية والاستثمارية، والاستدامة البيئية والمعمارية لمستقبل المدن الذكية في رؤية 2030.',
      descriptionEn: 'The triple towers represent the harmonious convergence of the Saudi Building Code (SBC), financial yield intelligence, and architectural sustainability under Vision 2030.',
      stats: [
        { labelAr: 'توافق كود البناء SBC', labelEn: 'SBC Compliance', value: '100%' },
        { labelAr: 'مشاريع كبرى مرصودة', labelEn: 'Mega Projects', value: '24+' },
        { labelAr: 'مؤشرات أحياء فورية', labelEn: 'Districts Index', value: '1,400+' }
      ]
    }
  };

  // Tech Capabilities
  const techCapabilities = [
    {
      icon: Satellite,
      titleAr: 'الاستشعار عن بعد والأقمار الصناعية',
      titleEn: 'Earth Observation & Satellites',
      descAr: 'دمج بث الأقمار الصناعية متعددة الأطياف لمراقبة مراحل البناء، كشف التعديات، وحساب نسب الإنجاز التلقائي مع المقارنات الزمنية (Time-Lapse).',
      descEn: 'Multispectral satellite fusion tracking construction milestones, ground disturbance, and automatic AI progress estimation.',
      tagAr: 'دقة 30 سم فضائية',
      tagEn: '30cm Space Resolution',
      metrics: [
        { label: isAr ? 'أقمار مدارية متصلة' : 'Connected Satellites', val: '12' },
        { label: isAr ? 'تحديث السحب والطقس' : 'Atmospheric Filtering', val: 'AI Clean' },
        { label: isAr ? 'أرشيف زمني تراكمي' : 'Historical Archive', val: '10 سنوات' }
      ]
    },
    {
      icon: Layers,
      titleAr: 'الذكاء الجيوتقني وفحص طبقات التربة',
      titleEn: 'Geotechnical & Soil Intelligence',
      descAr: 'قاعدة بيانات رقمية متكاملة لجسات التربة، مستويات المياه الجوفية، قوة التحمل المسموح بها، ومطابقتها التلقائية مع اشتراطات الكود السعودي SBC 303.',
      descEn: 'Digital borehole log integration, water table tracking, soil bearing capacity calculations, and automated SBC 303 compliance.',
      tagAr: 'كود SBC 303/304',
      tagEn: 'SBC 303/304 Standards',
      metrics: [
        { label: isAr ? 'جسات مخبرية مفحوصة' : 'Lab Boreholes', val: '45,000+' },
        { label: isAr ? 'حساب هبوط التربة' : 'Settlement Check', val: 'لحظي' },
        { label: isAr ? 'مخرجات تقرير جاهزة' : 'Instant PDF Report', val: '100% معتمدة' }
      ]
    },
    {
      icon: Compass,
      titleAr: 'التوأمة الرقمية ومطابقة كاد (CAD vs Reality)',
      titleEn: 'Digital Twin & CAD vs Reality',
      descAr: 'أداة فحص مطابقة المخطط المساحي الهندسي مع الواقع الفعلي عبر شريط تمرير تفاعلي، لكشف أي انزياحات في الارتدادات أو حدود القطع والشوارع.',
      descEn: 'Side-by-side interactive curtain comparing cadastral CAD blueprints directly with rectified satellite layers.',
      tagAr: 'كشف الانحرافات المكانية',
      tagEn: 'Deviation Detection',
      metrics: [
        { label: isAr ? 'دقة خطوط التنظيم' : 'Boundary Align', val: '±2 cm' },
        { label: isAr ? 'فحص الارتدادات' : 'Setback Validation', val: 'آلي فورياً' },
        { label: isAr ? 'صيغ مدعومة' : 'Supported Formats', val: 'DXF, SHP, GeoJSON' }
      ]
    },
    {
      icon: Cpu,
      titleAr: 'مستشار كود البناء البلدي بالذكاء الاصطناعي',
      titleEn: 'AI Municipal & SBC Regulatory Advisor',
      descAr: 'محرك ذكاء اصطناعي مدرب على كافة مجلدات كود البناء السعودي ولوائح البلديات وأمانات المناطق، يمنحك استشارات فورية وموثقة مع المواد النظامية.',
      descEn: 'Specialized LLM engine trained on all Saudi Building Code volumes and municipal zoning bylaws with direct clause citations.',
      tagAr: 'استشارات قانونية وهندسية',
      tagEn: 'Engineering Advisory',
      metrics: [
        { label: isAr ? 'مجلدات كود مفهرسة' : 'Indexed Volumes', val: '18 مجلد' },
        { label: isAr ? 'أمانات مغطاة' : 'Municipalities Covered', val: '17 أمانة' },
        { label: isAr ? 'زمن الاستجابة' : 'Response Latency', val: '< 1.5 ثانية' }
      ]
    }
  ];

  // Region Stats
  const regionData: Record<string, {
    nameAr: string;
    nameEn: string;
    dealsCount: string;
    parcels: string;
    megaProjects: string;
    avgGrowth: string;
    activeFeeds: string;
  }> = {
    riyadh: {
      nameAr: 'منطقة الرياض العاصمة',
      nameEn: 'Riyadh Capital Region',
      dealsCount: '1,850,000+',
      parcels: '620,000 قطار وأرض',
      megaProjects: 'كافد، حديقة الملك سلمان، المسار الرياضي، المربع الجديد',
      avgGrowth: '+18.4% سنوي',
      activeFeeds: 'تحديث يومي فضائي'
    },
    makkah: {
      nameAr: 'منطقة مكة المكرمة وجدة',
      nameEn: 'Makkah & Jeddah Region',
      dealsCount: '1,120,000+',
      parcels: '410,000 قطعة معتمدة',
      megaProjects: 'وجهة مسار، وسط جدة، مروج جدة، بوابة مكة',
      avgGrowth: '+14.2% سنوي',
      activeFeeds: 'تحديث كل 48 ساعة'
    },
    eastern: {
      nameAr: 'المنطقة الشرقية (الخبر، الدمام، الظهران)',
      nameEn: 'Eastern Province Hub',
      dealsCount: '780,000+',
      parcels: '290,000 قطعة مخطط',
      megaProjects: 'مدينة أرامكو الذكية، الواجهة البحرية، أجدان ووك',
      avgGrowth: '+11.8% سنوي',
      activeFeeds: 'تحديث أسبوعي مستمر'
    },
    neom: {
      nameAr: 'نيوم وتبوك والبحر الأحمر',
      nameEn: 'NEOM & Red Sea Projects',
      dealsCount: '240,000+',
      parcels: '150,000 موقع استثماري',
      megaProjects: 'ذا لاين، أوكساجون، تروجينا، وجهة البحر الأحمر، أمالا',
      avgGrowth: '+26.7% مؤشر طلب',
      activeFeeds: 'تغطية أقمار خاصة 24/7'
    }
  };

  // Strategic Timeline
  const timelineMilestones = [
    {
      year: '2022',
      titleAr: 'تأسيس نواة الذكاء المكاني',
      titleEn: 'Foundation of Spatial Engine',
      descAr: 'إطلاق الخوارزمية الأولى لربط الصكوك العقارية بالإحداثيات الجغرافية وسجلات وزارة العدل السعودية.',
      descEn: 'Launch of initial spatial algorithm indexing title deeds to national geodetic coordinates and MOJ registries.'
    },
    {
      year: '2023',
      titleAr: 'دمج أقمار الرصد وتصوير الدرون',
      titleEn: 'Satellite & Drone Ingestion',
      descAr: 'تكامل البث الفضائي عالي الدقة وتطوير نموذج مقارنة المخططات الهندسية CAD مع الواقع الميداني.',
      descEn: 'High-res satellite feeds integration and CAD vs reality interactive boundary alignment engine.'
    },
    {
      year: '2024',
      titleAr: 'منظومة الجسات وفحص كود SBC',
      titleEn: 'Geotechnical & SBC Engine',
      descAr: 'إدخال قاعدة بيانات الفحص الجيوتقني للتربة وربطها التلقائي بمجلدات كود البناء السعودي.',
      descEn: 'Borehole log database integration directly tied to Saudi Building Code SBC 303/304 soil parameters.'
    },
    {
      year: '2025 - 2026',
      titleAr: 'المنصة الوطنية المتكاملة «عين سيجام»',
      titleEn: 'Enterprise Launch of Ain Sijam',
      descAr: 'اكتمال تغطية 1,400+ حي في المملكة مع إطلاق التوأمة الرقمية ومستشار الذكاء الاصطناعي المؤسسي.',
      descEn: 'Nationwide coverage across 1,400+ Saudi districts with 360 digital twins and municipal AI advisor.'
    }
  ];

  // FAQ Items
  const faqItems = [
    {
      qAr: 'ما هي المصادر المعتمدة التي تعتمد عليها منصة عين سيجام؟',
      qEn: 'What verified data sources does Ain Sijam rely upon?',
      aAr: 'تعتمد المنصة على تكامل مباشر مع البيانات الرسمية المعلنة من وزارة العدل السعودية (MOJ)، الهيئة العامة للعقار (REGA)، السجل العقاري الوطني، منصة بلدي، واشتراطات اللجنة الوطنية لكود البناء السعودي (SBC)، مدمجة مع صور الأقمار الصناعية العالمية المرخصة.',
      aEn: 'The platform integrates official feeds from the Ministry of Justice, REGA, National Real Estate Registry, Balady, and SBC regulations, enriched with commercial satellite imagery.'
    },
    {
      qAr: 'ما هو الفرق بين «عين سيجام» والمواقع العقارية التقليدية؟',
      qEn: 'How does Ain Sijam differ from standard listing platforms?',
      aAr: 'المواقع التقليدية تعرض إعلانات وسطاء. أما «عين سيجام» فهي منظومة هندسية ومكانية تفحص صلب الأرض: سلامة التربة، تضاريس الموقع، مخاطر السيول، خطوط التنظيم والارتدادات، الصفقات الفعلية المنفذة في الصكوك، ومطابقة الواقع مع المخطط المعتمد.',
      aEn: 'Traditional portals list broker ads. Ain Sijam audits physical ground truth: soil bearing, flood topography, regulatory setbacks, verified deed executions, and CAD plan alignment.'
    },
    {
      qAr: 'هل يمكن للمكاتب الهندسية وشركات المقاولات الربط عبر API؟',
      qEn: 'Can engineering offices and developers integrate via API?',
      aAr: 'نعم، توفر عين سيجام واجهات برمجة تطبيقات (Enterprise Spatial API) تتيح تصدير تقارير فحص الأراضي الفورية، طبقات GeoJSON/CAD، وتحليلات الأسعار مباشرة إلى أنظمة الـ ERP الخاصة بالمؤسسات.',
      aEn: 'Yes, Ain Sijam provides Enterprise Spatial APIs for instant PDF audit generation, GeoJSON/CAD boundary layers, and automated valuation exports to internal ERPs.'
    },
    {
      qAr: 'كيف تضمن المنصة دقة قياسات المخطط والارتدادات؟',
      qEn: 'How does the platform ensure millimeter boundary precision?',
      aAr: 'يتم استخدام الإسناد الجغرافي المعاير طبقاً للنظام الجيوديسي الوطني السعودي (KSA-GRF) وتصحيح الصور الجوية ببيانات الارتفاعات الرقمية (DEM) للوصول إلى دقة تقل عن سنتيمترين في مطابقة الحدود المساحية.',
      aEn: 'We employ geodetic rectification under the Saudi National Reference Frame (KSA-GRF) and digital elevation models, achieving sub-2cm boundary precision.'
    }
  ];

  const filteredFaqs = faqItems.filter(f => 
    f.qAr.toLowerCase().includes(faqSearch.toLowerCase()) || 
    f.aAr.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.qEn.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="w-full space-y-12 pb-16" dir={isAr ? 'rtl' : 'ltr'}>

      {/* 1. HERO SPOTLIGHT: Cinematic Brand Showcase */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 text-white p-8 sm:p-12 lg:p-16 shadow-2xl group">
        {/* Real Saudi Land Planning & North Riyadh Skyline Background Image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/images_webp/01-riyadh-skyline-north.webp"
            alt={isAr ? 'أفق وتخطيط الأراضي شمال مدينة الرياض ومستقبل التوسع العمراني' : 'North Riyadh Skyline & Strategic Land Planning'}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-slate-950/85" />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Official Emblem Top Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 backdrop-blur-md shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-slate-200">
              {isAr ? 'منظومة سعودية رائدة للذكاء المكاني وتخطيط الأراضي' : 'Saudi National Spatial & Land Intelligence Platform'}
            </span>
          </div>

          {/* Large Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-['Cairo']">
            {isAr ? (
              <>
                عينٌ ترصد الواقع.. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                  ودقةٌ تصنع مستقبل المدن السعودية
                </span>
              </>
            ) : (
              <>
                An Eye That Observes Reality.. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                  Precision Shaping Saudi Cities of Tomorrow
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {isAr 
              ? 'تأسست «عين سيجام» لتكون المنظومة الوطنية المرجعية التي تدمج بيانات وزارة العدل والهيئة العامة للعقار مع الاستشعار الفضائي وكود البناء السعودي (SBC) لتحويل كل متر مربع في المملكة إلى قرار استثماري وهندسي موثوق.'
              : 'Ain Sijam unites Ministry of Justice transactions, REGA registries, satellite earth observation, and the Saudi Building Code into a singular high-precision spatial intelligence ecosystem.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">4.2M+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{isAr ? 'صفقة عقارية موثقة' : 'Verified Deeds'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">1,400+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{isAr ? 'حي سعودي مغطى' : 'Districts Covered'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">0.05m</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{isAr ? 'دقة الرصد والليدار' : 'LiDAR Accuracy'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{isAr ? 'مطابقة كود SBC' : 'SBC Compliance'}</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE EMBLEM ANATOMY (ركائز الهوية الثلاثية) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'فلسفة وهندسة الهوية' : 'BRAND PHILOSOPHY & EMBLEM'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Cairo']">
            {isAr ? 'تشريح شعار «عين سيجام»: الركائز الهندسية الثلاث' : 'The Ain Sijam Emblem Anatomy: 3 Engineering Pillars'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isAr 
              ? 'انقر على أي جزء من أجزاء الشعار لاستكشاف دلالته العلمية والهندسية وكيف ينعكس في خدمات المنصة الميدانية.'
              : 'Click on any emblem component to explore its scientific rationale and field applications.'}
          </p>
        </div>

        {/* Interactive Pillar Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Tab 1: The Eye */}
          <button
            onClick={() => setActivePillar('eye')}
            className={`p-6 rounded-2xl border text-start transition-all cursor-pointer relative overflow-hidden ${
              activePillar === 'eye'
                ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 shadow-lg ring-2 ring-blue-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                #0A3254 الكحلي الداكن
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isAr ? '1. العين الفضائية الاستشرافية' : '1. Satellite Observation Eye'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {isAr ? 'المحيط الخارجي للشعار: يجسد رصد الفضاء والتصوير الجوي الشامل لحركة الأراضي.' : 'Outer eye contour: Represents orbital surveillance and comprehensive land monitoring.'}
            </p>
          </button>

          {/* Tab 2: The Pin */}
          <button
            onClick={() => setActivePillar('pin')}
            className={`p-6 rounded-2xl border text-start transition-all cursor-pointer relative overflow-hidden ${
              activePillar === 'pin'
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-lg ring-2 ring-emerald-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#036853] text-white flex items-center justify-center font-bold shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                #036853 الأخضر الزمردي
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isAr ? '2. دبوس الإحداثيات المكانية' : '2. Geospatial Anchor Pin'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {isAr ? 'مركز الشعار: التثبيت الجيوديسي للقطع والصكوك بدقة السنتيمتر ومنع التداخلات.' : 'Center pin: High-precision geodetic parcel anchoring and boundary clash avoidance.'}
            </p>
          </button>

          {/* Tab 3: The Towers */}
          <button
            onClick={() => setActivePillar('towers')}
            className={`p-6 rounded-2xl border text-start transition-all cursor-pointer relative overflow-hidden ${
              activePillar === 'towers'
                ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 shadow-lg ring-2 ring-amber-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-600 text-white flex items-center justify-center font-bold shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                #BFA16F الذهبي المعماري
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isAr ? '3. أبراج التنمية والتخطيط' : '3. Urban Planning Skyline'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {isAr ? 'الأبراج الثلاثية بالداخل: مطابقة الكود السعودي SBC، الجدوى المالية، والمدن المستدامة.' : 'Inner triple towers: SBC code compliance, investment yields, and sustainable urban future.'}
            </p>
          </button>

        </div>

        {/* Selected Pillar Detailed Showcase Box */}
        {(() => {
          const current = emblemPillars[activePillar];
          return (
            <div className={`p-6 sm:p-8 rounded-3xl border ${current.border} ${current.bgLight} transition-all space-y-6 shadow-sm`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className={`text-xs font-bold uppercase tracking-wider ${current.textColor}`}>
                    {isAr ? current.badgeAr : current.badgeEn}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Cairo']">
                    {isAr ? current.titleAr : current.titleEn}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <AinSigamLogo size="sm" variant="mark-only" />
                  <span className="text-xs font-bold text-slate-500 font-mono">AIN SIJAM SYSTEM</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed max-w-4xl">
                {isAr ? current.descriptionAr : current.descriptionEn}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {current.stats.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {isAr ? s.labelAr : s.labelEn}
                    </div>
                    <div className={`text-xl font-black font-mono mt-1 ${current.textColor}`}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

      </section>

      {/* 3. CORE TECHNICAL CAPABILITIES (القدرات التقنية المتقدمة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" />
              <span>{isAr ? 'الترسانة الهندسية' : 'ENGINEERING ARSENAL'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Cairo']">
              {isAr ? 'قدرات المنظومة: من استكشاف الأرض إلى ترخيص البناء' : 'System Capabilities: From Raw Soil to Municipal Permits'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('map')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isAr ? 'استعراض الخريطة الحية' : 'Explore Live Map'}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
          {techCapabilities.map((tech, idx) => {
            const Icon = tech.icon;
            const isActive = activeTechTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTechTab(idx)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  isActive 
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20' 
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isAr ? tech.titleAr : tech.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tech Card */}
        {(() => {
          const tech = techCapabilities[activeTechTab];
          const Icon = tech.icon;
          return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {isAr ? tech.titleAr : tech.titleEn}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                      {isAr ? tech.tagAr : tech.tagEn}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    {isAr ? 'محرك نشط 100%' : '100% Active Engine'}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                {isAr ? tech.descAr : tech.descEn}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {tech.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                    <div className="text-xs text-slate-500 dark:text-slate-400">{m.label}</div>
                    <div className="text-lg font-black text-slate-900 dark:text-white font-mono mt-1">{m.val}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

      </section>

      {/* 4. INTERACTIVE KINGDOM COVERAGE (تغطية مناطق المملكة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            <Globe2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'الانتشار الجغرافي الوطني' : 'NATIONAL SPATIAL FOOTPRINT'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Cairo']">
            {isAr ? 'تغطية شبكة عين سيجام في كافة أقاليم ومناطق المملكة' : 'Ain Sijam Spatial Network Across Saudi Regions'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isAr 
              ? 'اختر المنطقة للاطلاع على إحصائيات الصفقات المرصودة، قطع الأراضي، والمشاريع الاستراتيجية المتصلة بالأقمار الصناعية.'
              : 'Select a region to review monitored transactions, land plots, and connected satellite passes.'}
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Object.keys(regionData).map((key) => {
            const reg = regionData[key];
            const isSel = selectedRegion === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSel
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isAr ? reg.nameAr : reg.nameEn}
              </button>
            );
          })}
        </div>

        {/* Region Card Inspector */}
        {(() => {
          const reg = regionData[selectedRegion];
          return (
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                    {isAr ? 'بيانات رصد معتمدة' : 'CERTIFIED REGIONAL FEED'}
                  </span>
                  <h3 className="text-2xl font-black font-['Cairo'] mt-0.5">
                    {isAr ? reg.nameAr : reg.nameEn}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    {reg.activeFeeds}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-xs text-slate-400 font-medium">{isAr ? 'الصفقات الموثقة' : 'Verified Deeds'}</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">{reg.dealsCount}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-xs text-slate-400 font-medium">{isAr ? 'القطع والمخططات' : 'Zoned Parcels'}</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">{reg.parcels}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-xs text-slate-400 font-medium">{isAr ? 'متوسط حركة الأسعار' : 'Average Growth'}</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{reg.avgGrowth}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-xs text-slate-400 font-medium">{isAr ? 'المشاريع الكبرى المتصلة' : 'Connected Megaprojects'}</div>
                  <div className="text-xs text-sky-300 font-bold mt-1 line-clamp-2">{reg.megaProjects}</div>
                </div>
              </div>
            </div>
          );
        })()}

      </section>

      {/* 5. STRATEGIC TIMELINE (رحلة التطوير) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isAr ? 'مسيرة الريادة والابتكار' : 'STRATEGIC TIMELINE'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Cairo']">
            {isAr ? 'رحلة عين سيجام نحو تمكين مستقبل العقار والبنية التحتية' : 'The Ain Sijam Journey: Engineering the Spatial Future'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {timelineMilestones.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden space-y-3"
            >
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {item.year}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? item.titleAr : item.titleEn}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isAr ? item.descAr : item.descEn}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* 6. OFFICIAL ACCREDITATIONS & DATA SOURCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'الامتثال والاعتمادات الوطنية' : 'OFFICIAL COMPLIANCE & SOURCES'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Cairo']">
              {isAr ? 'تكامل مع أعلى المعايير والجهات الحكومية في المملكة' : 'Integrated with Premier Saudi Authorities & Standards'}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {[
              { name: isAr ? 'وزارة العدل (البورصة العقارية)' : 'Ministry of Justice (MOJ)' },
              { name: isAr ? 'الهيئة العامة للعقار (REGA)' : 'Real Estate General Authority' },
              { name: isAr ? 'السجل العقاري الوطني' : 'National Real Estate Registry' },
              { name: isAr ? 'اللجنة الوطنية لكود البناء (SBC)' : 'Saudi Building Code (SBC)' },
              { name: isAr ? 'منصة بلدي وأمانات المناطق' : 'Balady Municipal Portals' }
            ].map((auth, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-center shadow-xs">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {auth.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE FAQ ACCORDION (الأسئلة الشائعة) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Cairo']">
            {isAr ? 'الأسئلة الأكثر شيوعاً عن منظومة عين سيجام' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {isAr ? 'إجابات مباشرة وشفافة حول مصادر البيانات، حقوق الملكية، ودقة التحليلات المكانية.' : 'Direct answers regarding data feeds, spatial accuracy, and security.'}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute top-3.5 right-4 text-slate-400 rtl:right-4 ltr:left-4" />
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder={isAr ? 'ابحث في الأسئلة الشائعة (مثال: دقة، مصادر، كود البناء، API)...' : 'Search FAQs...'}
            className="w-full py-3 px-11 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 shadow-xs"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isExp = expandedFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setExpandedFaq(isExp ? null : idx)}
                  className="w-full p-4 sm:p-5 text-start font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{isAr ? faq.qAr : faq.qEn}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isExp ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isExp && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {isAr ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* 8. BOTTOM CTA (دعوة للتواصل والتجربة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black font-['Cairo']">
            {isAr ? 'جاهز للاستفادة من أحدث منظومة ذكاء مكاني في المملكة؟' : 'Ready to Experience Kingdom Spatial Intelligence?'}
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            {isAr 
              ? 'تواصل مع مستشارينا الهندسيين، أو احجز جلسة عرض حي لنظام عين سيجام لشركتك أو مكتبك الهندسي فورياً.'
              : 'Connect with our spatial advisors or schedule a direct enterprise live walkthrough.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              {isAr ? 'تواصل مع فريق عين سيجام' : 'Contact Ain Sijam Team'}
            </button>
            <button
              onClick={() => onNavigate('advisor')}
              className="px-6 py-3 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white border border-blue-400/40 font-bold text-sm transition-colors cursor-pointer"
            >
              {isAr ? 'استشارة الذكاء الاصطناعي لكود SBC' : 'Consult SBC AI Advisor'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutAinSigamPage;
