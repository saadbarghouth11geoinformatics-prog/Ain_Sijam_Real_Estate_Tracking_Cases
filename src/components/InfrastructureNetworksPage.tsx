import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Droplets, 
  Flame, 
  Radio, 
  Layers, 
  ArrowLeft, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  Crosshair, 
  Sliders, 
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// Direct local imports from the newly isolated folder: src/assets/infrastructure-networks-new/
import network09 from '@/assets/infrastructure-networks-new/network-09.png';
import field01 from '@/assets/infrastructure-networks-field/01-gnss-field-survey.png';
import field02 from '@/assets/infrastructure-networks-field/02-water-valve-field-inspection.png';
import field03 from '@/assets/infrastructure-networks-field/03-gpr-underground-utility-scan.png';
import field04 from '@/assets/infrastructure-networks-field/04-wastewater-manhole-inspection.png';
import field05 from '@/assets/infrastructure-networks-field/05-quality-control-field-inspection.png';
import field06 from '@/assets/infrastructure-networks-field/06-electrical-network-documentation.png';
import field07 from '@/assets/infrastructure-networks-field/07-utility-network-gis-map.png';
import field08 from '@/assets/infrastructure-networks-field/08-network-asset-inventory-dashboard.png';
import field09 from '@/assets/infrastructure-networks-field/09-land-parcel-utility-conflict-context.jpg';
import field10 from '@/assets/infrastructure-networks-field/10-utility-conflict-engineering-plan.png';
import field11 from '@/assets/infrastructure-networks-field/11-urban-utility-network-masterplan.png';
import field12 from '@/assets/infrastructure-networks-field/27-field-utility-verification-team.jpg';
import field13 from '@/assets/infrastructure-networks-field/28-wastewater-manhole-inspection.jpg';
import field14 from '@/assets/infrastructure-networks-field/29-gas-network-map-dashboard.jpg';
import field15 from '@/assets/infrastructure-networks-field/30-wastewater-asset-field-check.jpg';
import field16 from '@/assets/infrastructure-networks-field/31-gnss-network-survey-team.jpg';
import field17 from '@/assets/infrastructure-networks-field/32-water-valve-chamber-inspection.jpg';
import field18 from '@/assets/infrastructure-networks-field/33-field-mapping-and-asset-review.jpg';
import field19 from '@/assets/infrastructure-networks-field/34-infrastructure-asset-coordination.jpg';
import field20 from '@/assets/infrastructure-networks-field/35-gnss-site-survey.jpg';
import irrigationNetworkMap from '@/assets/irrigation-network/irrigation-network-map.png';
import irrigationValvesDashboard from '@/assets/irrigation-network/irrigation-valves-dashboard.png';

interface InfrastructureNetworksPageProps {
  onNavigate: (pageId: string) => void;
}

export const InfrastructureNetworksPage: React.FC<InfrastructureNetworksPageProps> = ({ onNavigate }) => {
  const { isAr } = useLanguage();

  // Fullscreen / Zoom Lightbox State
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; subtitle?: string } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  // These dashboard references are deliberately used only in existing viewers.
  const dashboardViews = [
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 134604.png')}`, label: isAr ? 'مسار بنفسجي مع لوحة خصائص جانبية' : 'Purple alignment with property panel' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 134828.png')}`, label: isAr ? 'خريطة قطع وطبقات باللون البرتقالي' : 'Orange parcel and layer map' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 134939.png')}`, label: isAr ? 'مضلعات أصول ملوّنة مع مؤشرات جانبية' : 'Coloured asset polygons with side metrics' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 134904.png')}`, label: isAr ? 'تغطية خضراء ضمن نطاق الخريطة' : 'Green coverage within map extent' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 135033.png')}`, label: isAr ? 'نطاقات مقارنة باللونين الأحمر والأزرق' : 'Comparative red and blue coverage map' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 135051.png')}`, label: isAr ? 'نطاق مكاني وخيارات طبقات' : 'Spatial extent with layer controls' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 135132.png')}`, label: isAr ? 'نطاق تشغيل أخضر مع لوحة مؤشرات' : 'Green operational extent with metrics panel' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 134757.png')}`, label: isAr ? 'نطاق زمني للتنفيذ مع مجال مكاني' : 'Execution timeline with spatial scope' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 134914.png')}`, label: isAr ? 'طبقات قطع ضمن نطاق موحّد' : 'Parcel layers in a unified extent' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 134946.png')}`, label: isAr ? 'مؤشرات أصول ضمن خريطة تشغيلية' : 'Asset metrics in an operational map' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 135114.png')}`, label: isAr ? 'لوحة متابعة نطاقات وطبقات' : 'Coverage and layer monitoring board' },
    { src: `/images/infrastructure-network/${encodeURIComponent('Screenshot 2026-09-29 134712.png')}`, label: isAr ? 'عرض مسار وطبقات تشغيلية' : 'Alignment and operational layers view' },
  ];
  // =========================================================================
  // 1. HERO SECTION (network-04 as main, network-03 and network-02 as previews)
  // =========================================================================
  // Transparent Hero Background Scenes (Matching Case Studies & Methodology pages)
  const HERO_BACKGROUNDS = [
    {
      id: '07-planning',
      labelAr: 'المخطط والممرات الخضراء',
      labelEn: 'Land Planning Corridor',
      src: '/assets/methodology/07-generated-land-planning-green-corridor.png',
      tagAr: '07 • تخطيط الأرض والبيئة الحضرية',
      tagEn: '07 • Land Planning & Urban Corridor',
    },
    {
      id: '02-roadworks',
      labelAr: 'تجهيز الموقع والمسارات',
      labelEn: 'Site Preparation & Roads',
      src: '/assets/methodology/02-roadworks-site-preparation.jpg',
      tagAr: '02 • تهيئة الموقع والمسارات',
      tagEn: '02 • Site Prep & Corridors',
    },
    {
      id: 'skyline-wide',
      labelAr: 'أفق الرياض وتكامل الأصول',
      labelEn: 'Capital Skyline & Urban Assets',
      src: '/images_webp/03-riyadh-skyline-wide.webp',
      tagAr: 'أفق العاصمة • شبكات البنية التحتية',
      tagEn: 'Capital Skyline • Utility Networks',
    },
    {
      id: '05-advanced',
      labelAr: 'الرصد الفضائي المتقدم',
      labelEn: 'Advanced Satellite Audit',
      src: '/assets/methodology/05-advanced-construction-satellite.jpg',
      tagAr: '05 • تقدم الكتل العمرانية بالأقمار',
      tagEn: '05 • Advanced Satellite Audit',
    },
    {
      id: 'kafd-urban',
      labelAr: 'النسيج الحضري ومسارات المرافق',
      labelEn: 'Urban Fabric & Utility Corridors',
      src: '/images_webp/07-kafd-urban-district.webp',
      tagAr: 'المنطقة الحضرية • تكامل المسارات',
      tagEn: 'Urban District • Integrated Alignments',
    },
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState<number>(0);
  const [isHeroLoaded, setIsHeroLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsHeroLoaded(true);
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [activeHeroThumb, setActiveHeroThumb] = useState<number>(0);
  const heroThumbnails = [
    {
      src: field07,
      label: isAr ? 'لوحة المراقبة الفضائية المركزية' : 'Central Spatial Monitoring',
      desc: isAr ? 'رؤية موحدة لطبقات وشبكات المشروع' : 'Unified multi-layer network overview'
    },
    {
      src: field11,
      label: isAr ? 'سياق شبكات البنية الحضرية' : 'Urban Infrastructure Context',
      desc: isAr ? 'تحليل مسارات الخدمة مع الطرق والقطع' : 'Service alignments against road corridors'
    },
    {
      src: field08,
      label: isAr ? 'فهرس العناصر الجغرافية' : 'Spatial Index & Features',
      desc: isAr ? 'رصد وتصنيف الأصول التشغيلية' : 'Operational asset inventory and classification'
    }
  ];

  // =========================================================================
  // 2. INTERACTIVE NETWORK EXPLORER (Exact Required Mapping)
  // =========================================================================
  const [activeNetworkTab, setActiveNetworkTab] = useState<number>(0);
  const networkTabs = [
    {
      id: 'water',
      label: isAr ? 'مياه الشرب' : 'Potable Water',
      icon: Droplets,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
      accentColor: '#2563eb',
      src: network09,
      supportingImage: undefined,
      supportingLabel: undefined,
      mainTitle: isAr ? 'شبكة وخطوط تغذية مياه الشرب' : 'Potable Water Distribution Matrix',
      explanation: isAr 
        ? 'قراءة مكانية موحدة لمسارات الأنابيب الرئيسية والمحابس مع ربط مناسيب الضخ واستمرارية الإمداد.' 
        : 'Unified spatial view of main pipelines and isolation valves linked to pressure levels and continuous flow.',
    },
    {
      id: 'wastewater',
      label: isAr ? 'الصرف الصحي' : 'Wastewater',
      icon: Layers,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800',
      accentColor: '#9333ea',
      src: field04,
      supportingImage: field13,
      supportingLabel: isAr ? 'فهرس عناصر الصرف وغرف التفتيش' : 'Sewer Assets & Manholes Index',
      mainTitle: isAr ? 'مسارات الانحدار ومطابقة غرف التفتيش' : 'Gravity Sewer Lines & Manhole Diagnostics',
      explanation: isAr 
        ? 'معاينة غرف التفتيش وخطوط الانحدار وتوثيق حالة الأصول تحت السطحية مع ربط المناسيب بدقة جغرافية.' 
        : 'Inspecting manholes, gravity lines, and subsurface asset status with precise geographic correlation.',
    },
    {
      id: 'electricity',
      label: isAr ? 'الكهرباء' : 'Power Grid',
      icon: Zap,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
      accentColor: '#d97706',
      src: field06,
      supportingImage: field05,
      supportingLabel: isAr ? 'شبكة التوزيع والمحولات الفرعية' : 'Substation & Distribution Grid',
      mainTitle: isAr ? 'لوحة تحكم وتوزيع شبكة الكهرباء' : 'Electrical Distribution Grid Dashboard',
      explanation: isAr 
        ? 'تتبع محطات وأكشاك الكهرباء وموزعات الجهد ومسارات كابلات الجهد العالي والمتوسط والمنخفض وأعمدة الإنارة.' 
        : 'Tracking substations, kiosks, distribution pillars, high/medium/low voltage cables, and lighting poles.',
    },
    {
      id: 'telecom',
      label: isAr ? 'الاتصالات' : 'Telecommunications',
      icon: Radio,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
      accentColor: '#059669',
      src: field03,
      supportingImage: field07,
      supportingLabel: isAr ? 'غرف السحب ومسارات الألياف' : 'Fiber Nodes & Ducts',
      mainTitle: isAr ? 'مسارات الألياف الضوئية وغرف السحب الرقمية' : 'Fiber Optic Routes & Handhole Nodes',
      explanation: isAr 
        ? 'رصد مسارات الألياف الضوئية وغرف السحب وتوثيق التمديدات باستخدام أجهزة الجمع الميدانية وتحديث السجل.' 
        : 'Logging fiber ducts, pull chambers, and network nodes using mobile GIS field units into a single ledger.',
    },
    {
      id: 'gas',
      label: isAr ? 'الغاز' : 'Gas Network',
      icon: Flame,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800',
      accentColor: '#dc2626',
      src: field14,
      supportingImage: field14,
      supportingLabel: isAr ? 'سياق شبكة الغاز الميداني' : 'Field Gas Network Overview',
      mainTitle: isAr ? 'لوحة تحكم مسارات خطوط الغاز ونقاط العزل' : 'Gas Pipeline Network & Isolation Controls',
      explanation: isAr 
        ? 'قراءة مسارات خطوط الغاز ونقاط التحكم ومحابس العزل وغرف الغاز وتغذية المنازل لضمان السلامة وتفادي التعارضات.' 
        : 'Reading gas pipeline corridors, pressure regulating stations, isolation valves, and service taps for risk prevention.',
    },
    {
      id: 'irrigation',
      label: isAr ? 'مياه الري' : 'Irrigation',
      icon: Droplets,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800',
      accentColor: '#0d9488',
      src: irrigationNetworkMap,
      supportingImage: irrigationValvesDashboard,
      supportingLabel: isAr ? 'لوحة توزيع المحابس السطحية' : 'Surface Valve Distribution Dashboard',
      mainTitle: isAr ? 'شبكات الري وتوزيع المحابس السطحية' : 'Irrigation Mains & Flow Control Telemetry',
      explanation: isAr 
        ? 'فحص محابس وشبكات الري السطحية والمدفونة ومطابقتها للمساحات الخضراء وممرات المشاة دون إعاقة الخدمات.' 
        : 'Auditing buried and surface irrigation lines, solenoid valves, and green corridor links to ensure clean flow.',
    }
  ];

  // =========================================================================
  // 3. WORKFLOW STEPS: “من الميدان إلى القرار” (Exact Mapping)
  // =========================================================================
  const [activeStoryStep, setActiveStoryStep] = useState<number>(0);
  const storySteps: Array<{
    id: string;
    title: string;
    text: string;
    src: string;
    caption: string;
    badge: string;
    callout: string;
    dashboard?: { src: string; label: string };
  }> = [
    {
      id: '01',
      title: isAr ? 'المسح والرفع الميداني' : 'Field Survey & Geodetic Data',
      text: isAr ? 'تسجيل الموقع ورفع عناصر الشبكة وربطها بالسياق الجغرافي للموقع.' : 'Logging locations and capturing network elements into spatial context.',
      src: field01,
      caption: isAr ? 'عرض موحد للطبقات' : 'Unified Layer View',
      badge: isAr ? 'الرصد الأولي' : 'Initial Capture',
      callout: isAr ? 'نقطة رصد إحداثيات الأصل' : 'Geodetic Survey Anchor',
      dashboard: dashboardViews[7]
    },
    {
      id: '02',
      title: isAr ? 'توثيق الأصول والعناصر' : 'Asset & Fixture Documentation',
      text: isAr ? 'ربط الصور والعناصر الميدانية بسجل واضح يسهّل الرجوع إليها ومراجعتها.' : 'Correlating site elements and attributes into an accessible digital asset registry.',
      src: field02,
      caption: isAr ? 'مراجعة عناصر الشبكة' : 'Network Asset Review',
      badge: isAr ? 'الفهرسة الرقمية' : 'Digital Index',
      callout: isAr ? 'سجل تصنيف طبقات الشبكة' : 'Classified Layer Registry'
    },
    {
      id: '03',
      title: isAr ? 'الفحص والتحقق والجودة' : 'Inspection, QA/QC & Validation',
      text: isAr ? 'مراجعة غرف التفتيش والمحابس والعناصر الظاهرة وربطها بأدلة الفحص.' : 'Reviewing chambers, valves, and fixtures with digital verification tags.',
      src: field05,
      caption: isAr ? 'تحليل تشغيلي مرئي' : 'Operational Visual Analysis',
      badge: isAr ? 'تدقيق الجودة' : 'Quality Audit',
      callout: isAr ? 'مراجعة معايير السلامة والتشغيل' : 'Operational Clearance Verified',
      dashboard: dashboardViews[8]
    },
    {
      id: '04',
      title: isAr ? 'ربط الأصول بالخرائط والطبقات' : 'GIS Mapping & Spatial Integration',
      text: isAr ? 'ربط الأعمال الميدانية بطبقات GIS لتكوين صورة أوضح عن مسارات الشبكات.' : 'Linking field findings with GIS layers for a clear picture of utility alignments.',
      src: field07,
      caption: isAr ? 'قراءة مكانية متكاملة' : 'Integrated Spatial Mapping',
      badge: isAr ? 'الربط المكاني' : 'Spatial Corroboration',
      callout: isAr ? 'تقاطع المسار والربط بالبنية التحتية' : 'Corridor Interconnection Node',
      dashboard: dashboardViews[9]
    },
    {
      id: '05',
      title: isAr ? 'تحليل التعارضات ورفع الجاهزية' : 'Conflict Analysis & Technical Readiness',
      text: isAr ? 'تجميع المخططات والسياق المكاني والأدلة الفنية لدعم التنسيق واتخاذ القرار.' : 'Assembling engineering layers and spatial evidence to support coordination and decisions.',
      src: field10,
      caption: isAr ? 'قراءة مكانية متكاملة' : 'Integrated Spatial Mapping',
      badge: isAr ? 'مخرج القرار' : 'Decision Readiness',
      callout: isAr ? 'خريطة جاهزية الموقع والممرات' : 'Site Readiness Overview',
      dashboard: dashboardViews[10]
    }
  ];

  // =========================================================================
  // 4. MAIN DASHBOARD VIEWER (All 17 Images Across 5 Tabs)
  // =========================================================================
  const [activeViewerTab, setActiveViewerTab] = useState<number>(0);
  const [activeViewerImage, setActiveViewerImage] = useState<string>(field08);
  const [activeViewerCaption, setActiveViewerCaption] = useState<string>(isAr ? 'عرض موحد للطبقات' : 'Unified Layer View');
  const [dashboardZoom, setDashboardZoom] = useState<number>(1);

  const viewerTabs = [
    {
      id: 'overview',
      label: isAr ? 'نظرة عامة' : 'Overview',
      caption: isAr ? 'عرض موحد للطبقات' : 'Unified Layer View',
      main: field08,
      thumbnails: [
        { ...dashboardViews[3] },
        { src: field07, label: isAr ? 'فهرس العناصر الجغرافية' : 'Spatial Feature Index' },
        { src: field09, label: isAr ? 'سياق شبكات البنية الحضرية' : 'Urban Corridor Extent' },
        { src: field11, label: isAr ? 'لوحة المراقبة الفضائية' : 'Central Spatial View' }
      ]
    },
    {
      id: 'network-layers',
      label: isAr ? 'طبقات الشبكات' : 'Network Layers',
      caption: isAr ? 'عرض موحد للطبقات' : 'Unified Layer View',
      main: field07,
      thumbnails: [
        { ...dashboardViews[4] },
        { src: field06, label: isAr ? 'شبكة التوزيع والمحولات' : 'Power Distribution' },
        { src: field03, label: isAr ? 'طبقات التمديد الأرضي' : 'Underground Ducts' },
        { src: field10, label: isAr ? 'تحليل حرم المسارات' : 'Buffer Reserves' }
      ]
    },
    {
      id: 'asset-analysis',
      label: isAr ? 'تحليل الأصول' : 'Asset Analysis',
      caption: isAr ? 'مراجعة عناصر الشبكة' : 'Network Asset Review',
      main: field08,
      thumbnails: [
        { ...dashboardViews[11] },
        { src: field02, label: isAr ? 'تحليل حالة الأصول' : 'Asset Condition' },
        { src: field04, label: isAr ? 'أعماق المسارات الميدانية' : 'Depth & Elevation' },
        { src: field14, label: isAr ? 'سجل توزيع الأصول' : 'Asset Registry' }
      ]
    },
    {
      id: 'spatial-context',
      label: isAr ? 'السياق المكاني' : 'Spatial Context',
      caption: isAr ? 'قراءة مكانية متكاملة' : 'Integrated Spatial Mapping',
      main: field11,
      thumbnails: [
        { ...dashboardViews[5] },
        { src: field09, label: isAr ? 'معاينة الموقع الميداني' : 'Field Site Overview' },
        { src: field10, label: isAr ? 'سياق التطور التراكمي' : 'Cumulative Evolution' },
        { src: field07, label: isAr ? 'سياق الأقمار الصناعية' : 'Satellite Spatial Context' }
      ]
    },
    {
      id: 'executive-view',
      label: isAr ? 'العرض التنفيذي' : 'Executive View',
      caption: isAr ? 'تحليل تشغيلي مرئي' : 'Operational Visual Analysis',
      main: field19,
      thumbnails: [
        { ...dashboardViews[6] },
        { src: field11, label: isAr ? 'اللوحة المركزية الكبرى' : 'Master Dashboard' },
        { src: field08, label: isAr ? 'مؤشرات التوزيع الشبكي' : 'Grid Indicators' },
        { src: field19, label: isAr ? 'الرؤية النهائية الشاملة' : 'Final Network View' }
      ]
    }
  ];

  // Large editorial boards: these are intentionally presented as full, readable
  // operational views instead of a dense image gallery.
  const evidenceBoards = [
    {
      src: field08,
      kicker: isAr ? 'فهرسة الأصول' : 'Asset Inventory',
      title: isAr ? 'سجل مرئي يربط كل عنصر بموقعه وطبقته' : 'A visual ledger that connects every asset to its location and layer',
      text: isAr ? 'تجميع طبقات الشبكات والعناصر الميدانية في واجهة واحدة تساعد الفريق على المراجعة السريعة قبل أي زيارة أو قرار فني.' : 'Network layers and field assets are brought into one reviewable view before any site visit or technical decision.'
    },
    {
      src: field07,
      kicker: isAr ? 'فحص المسارات' : 'Corridor Review',
      title: isAr ? 'قراءة واضحة للممرات والتقاطعات والخدمات المحيطة' : 'A clear reading of corridors, crossings, and adjacent utilities',
      text: isAr ? 'تُعرض المسارات ضمن سياقها المكاني لتسهيل التنسيق بين فرق التصميم والتنفيذ والتشغيل.' : 'Utility alignments are viewed in their spatial context to support design, delivery, and operations coordination.'
    },
    {
      src: field10,
      kicker: isAr ? 'جاهزية الموقع' : 'Site Readiness',
      title: isAr ? 'تحويل الأدلة الميدانية إلى مراجعة قابلة للتنفيذ' : 'Turning field evidence into an actionable review',
      text: isAr ? 'من خلال العرض الموحد يمكن متابعة العناصر الموثقة ومراجعة حالتها وملاحظاتها الفنية بصورة أكثر مباشرة.' : 'The unified view makes documented assets, their condition, and their technical notes easier to review.'
    },
    {
      src: field11,
      kicker: isAr ? 'الرؤية التنفيذية' : 'Executive Perspective',
      title: isAr ? 'ملخص مكاني واضح يدعم فرق المشروع والإدارة' : 'A clear spatial summary for project teams and management',
      text: isAr ? 'تنتقل البيانات من الطبقات التفصيلية إلى رؤية مختصرة يمكن الرجوع منها إلى الأصل والموقع والدليل المرتبط به.' : 'Detailed layers become an executive view that remains traceable back to the asset, location, and supporting evidence.'
    }
  ];

  const fieldEvidence = [
    { src: field01, phase: isAr ? '1. الرفع الميداني' : '1. Field Survey', title: isAr ? 'تثبيت الإحداثيات ونقطة بداية التوثيق' : 'Establish coordinates and the documentation baseline' },
    { src: field20, phase: isAr ? '1. الرفع الميداني' : '1. Field Survey', title: isAr ? 'مراجعة فريق المسح ومسارات التغطية' : 'Review survey team coverage and routes' },
    { src: field03, phase: isAr ? '2. كشف الخدمات' : '2. Utility Detection', title: isAr ? 'فحص الخدمات تحت السطح قبل التنفيذ' : 'Detect subsurface utilities before works begin' },
    { src: field02, phase: isAr ? '3. توثيق الأصل' : '3. Asset Documentation', title: isAr ? 'توثيق المحابس والعناصر التشغيلية' : 'Document valves and operational assets' },
    { src: field04, phase: isAr ? '3. توثيق الأصل' : '3. Asset Documentation', title: isAr ? 'فحص غرف التفتيش ومسارات الصرف' : 'Inspect manholes and sewer alignments' },
    { src: field06, phase: isAr ? '3. توثيق الأصل' : '3. Asset Documentation', title: isAr ? 'تسجيل عناصر الكهرباء ومسارات الكابلات' : 'Register power assets and cable corridors' },
    { src: field17, phase: isAr ? '4. التحقق الموقعي' : '4. Site Verification', title: isAr ? 'فحص غرفة المحبس وربطها بالسجل' : 'Verify valve chamber and link it to the register' },
    { src: field13, phase: isAr ? '4. التحقق الموقعي' : '4. Site Verification', title: isAr ? 'مراجعة حالة عناصر الصرف في الموقع' : 'Review on-site wastewater asset condition' },
    { src: field15, phase: isAr ? '4. التحقق الموقعي' : '4. Site Verification', title: isAr ? 'تأكيد حالة الأصل ودليل الفحص' : 'Confirm asset status and inspection evidence' },
    { src: field05, phase: isAr ? '5. ضبط الجودة' : '5. Quality Control', title: isAr ? 'تدقيق الأدلة الفنية قبل الاعتماد' : 'Audit technical evidence before approval' },
    { src: field12, phase: isAr ? '5. ضبط الجودة' : '5. Quality Control', title: isAr ? 'مراجعة ميدانية مشتركة للأصول' : 'Joint field review of documented assets' },
    { src: field18, phase: isAr ? '6. الربط المكاني' : '6. Spatial Integration', title: isAr ? 'تحويل الملاحظات إلى طبقات قابلة للمراجعة' : 'Convert field observations into reviewable layers' },
    { src: field07, phase: isAr ? '6. الربط المكاني' : '6. Spatial Integration', title: isAr ? 'عرض المسارات ضمن خريطة شبكات موحدة' : 'Visualize alignments on a unified utility map' },
    { src: field08, phase: isAr ? '7. سجل الأصول' : '7. Asset Ledger', title: isAr ? 'مؤشرات سجل الأصول وبياناتها' : 'Asset ledger indicators and records' },
    { src: field14, phase: isAr ? '7. سجل الأصول' : '7. Asset Ledger', title: isAr ? 'تتبع طبقات شبكة الغاز ونقاط التحكم' : 'Track gas layers and control points' },
    { src: field09, phase: isAr ? '8. فحص التعارضات' : '8. Conflict Review', title: isAr ? 'قراءة علاقة القطع بممرات الخدمات' : 'Read parcels against utility corridors' },
    { src: field10, phase: isAr ? '8. فحص التعارضات' : '8. Conflict Review', title: isAr ? 'مراجعة التعارضات على المخطط الهندسي' : 'Review conflicts on the engineering plan' },
    { src: field11, phase: isAr ? '9. القرار الفني' : '9. Technical Decision', title: isAr ? 'دمج المخطط العام مع مسارات الشبكات' : 'Combine masterplan context with utility alignments' },
    { src: field19, phase: isAr ? '9. القرار الفني' : '9. Technical Decision', title: isAr ? 'تنسيق الأدلة بين الفرق والتخصصات' : 'Coordinate evidence across teams and disciplines' },
    { src: field16, phase: isAr ? '10. التحديث المستمر' : '10. Continuous Update', title: isAr ? 'استمرار التحديث الميداني للإحداثيات' : 'Maintain ongoing field-coordinate updates' }
  ];
  const [activeFieldEvidence, setActiveFieldEvidence] = useState(0);

  // Sync viewer image on tab change
  useEffect(() => {
    const cur = viewerTabs[activeViewerTab];
    setActiveViewerImage(cur.main);
    setActiveViewerCaption(cur.caption);
    setDashboardZoom(1);
  }, [activeViewerTab]);

  // =========================================================================
  // 5. PLANNING & COMPARISON SLIDER (corridor context vs engineering plans)
  // =========================================================================
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [comparisonTarget, setComparisonTarget] = useState<'plan1' | 'plan2'>('plan1');
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const comparisonContainerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (clientX: number) => {
    if (!comparisonContainerRef.current) return;
    const rect = comparisonContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(isAr ? 100 - percent : percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-['Cairo'] pb-20 overflow-x-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* ========================================================================= */}
      {/* SECTION A — HERO: “EVERY NETWORK IS VISIBLE”                              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white min-h-[580px] flex flex-col justify-center pt-6 pb-14 lg:pt-10 lg:pb-18">
        
        {/* Crystal-Clear Background Images with smooth automatic crossfade transition (Matching other pages) */}
        {HERO_BACKGROUNDS.map((bg, idx) => (
          <div
            key={bg.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentBgIndex && isHeroLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url('${bg.src}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}

        {/* Gentle ambient gradient (only 25-50% opacity) so the clear background image shines through vividly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isAr
              ? 'linear-gradient(to left, rgba(7, 14, 30, 0.50) 0%, rgba(7, 14, 30, 0.20) 50%, rgba(7, 14, 30, 0.40) 100%)'
              : 'linear-gradient(to right, rgba(7, 14, 30, 0.50) 0%, rgba(7, 14, 30, 0.20) 50%, rgba(7, 14, 30, 0.40) 100%)',
          }}
        />
        {/* Soft edge blend for smooth integration with navbar and section below */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(7, 14, 30, 0.50) 0%, transparent 15%, transparent 80%, rgba(7, 14, 30, 0.80) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Top Bar: Scene Indicator & Auto-Rotating Tabs (Matching Methodology & Our Work pages) */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'مشهد الرصد الميداني والفضائي:' : 'Observation Scene:'}</span>
              <span className="rounded-md bg-slate-950/70 px-2.5 py-0.5 font-mono text-[11px] text-sky-200 border border-sky-500/40 backdrop-blur-md shadow-xs">
                {isAr ? HERO_BACKGROUNDS[currentBgIndex].tagAr : HERO_BACKGROUNDS[currentBgIndex].tagEn}
              </span>
            </div>

            {/* Interactive Rotating Scene Tabs (Click to switch or auto-rotates every 6s) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-300 text-[11px] font-medium hidden sm:inline">
                {isAr ? 'المشاهد الدوارة:' : 'Rotating Scenes:'}
              </span>
              {HERO_BACKGROUNDS.map((bg, idx) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setCurrentBgIndex(idx)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                    currentBgIndex === idx
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-500/30 font-bold border border-sky-300'
                      : 'bg-slate-950/50 text-slate-300 hover:bg-slate-900/80 hover:text-white border border-white/15 backdrop-blur-sm'
                  }`}
                  title={isAr ? bg.labelAr : bg.labelEn}
                >
                  {isAr ? bg.labelAr : bg.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column: Hero Text with glassmorphic backdrop */}
            <div className="lg:col-span-5 text-start">
              <div className="rounded-3xl border border-white/20 bg-slate-950/45 p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
                
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/80 px-3.5 py-1.5 text-xs font-semibold text-sky-300 shadow-xs backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>{isAr ? 'عين سيجام | ذكاء شبكات البنية التحتية' : 'Ain Sijam | Infrastructure Networks Intelligence'}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight">
                  {isAr ? 'كل شبكة واضحة. كل أصل قابل للتتبع.' : 'Every network is visible. Every asset is traceable.'}
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                  {isAr 
                    ? 'من المسح الميداني وتوثيق الأصول إلى قراءة طبقات المياه والكهرباء والصرف والاتصالات، تجمع عين سيجام الأدلة التشغيلية في رؤية مكانية واحدة تدعم القرار.'
                    : 'From field surveys and asset logging to reading water, power, sewer, and telecom layers, Ain Sijam brings operational evidence into one decision-grade spatial view.'}
                </p>

                {/* Connecting Accent Line */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-sky-400 to-transparent" />
                  <span className="text-xs font-semibold text-sky-300 flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5" />
                    {isAr ? 'رؤية مكانية دقيقة للشبكات' : 'Precision Network Spatial View'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => scrollToSection('network-explorer')}
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <span>{isAr ? 'استكشف طبقات الشبكات' : 'Explore Network Layers'}</span>
                    <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isAr ? '' : 'rotate-180 group-hover:translate-x-1'}`} />
                  </button>

                  <button
                    onClick={() => scrollToSection('field-to-decision')}
                    className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-white/20 shadow-xs transition-all cursor-pointer flex items-center gap-2 backdrop-blur-sm"
                  >
                    <Eye className="w-4 h-4 text-sky-400" />
                    <span>{isAr ? 'شاهد رحلة التوثيق' : 'See Documentation Journey'}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Left Column: Hero Main Visual (network-04) + Previews (network-03, network-02) */}
            <div className="lg:col-span-7">
              <div className="relative bg-slate-950/70 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden group backdrop-blur-md">
                
                {/* Header Bar */}
                <div className="bg-slate-950/80 px-4 py-2.5 border-b border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="text-xs font-semibold text-slate-200 mr-2">
                      {heroThumbnails[activeHeroThumb].label}
                    </span>
                  </div>
                  <button
                    onClick={() => setLightboxImage({
                      src: heroThumbnails[activeHeroThumb].src,
                      title: heroThumbnails[activeHeroThumb].label,
                      subtitle: heroThumbnails[activeHeroThumb].desc
                    })}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isAr ? 'تكبير وعرض كامل' : 'Expand full view'}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Hero Main Visual: Large and readable with object-fit: contain */}
                <div 
                  className="relative aspect-16/10 sm:aspect-16/9 bg-slate-950 cursor-pointer overflow-hidden p-1 sm:p-2"
                  onClick={() => setLightboxImage({
                    src: heroThumbnails[activeHeroThumb].src,
                    title: heroThumbnails[activeHeroThumb].label,
                    subtitle: heroThumbnails[activeHeroThumb].desc
                  })}
                >
                  <img
                    src={heroThumbnails[activeHeroThumb].src}
                    alt={heroThumbnails[activeHeroThumb].label}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-[1.01]"
                    loading="eager"
                  />
                  <div className="absolute bottom-3 start-3 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/15 text-sky-200 text-xs font-medium">
                    {heroThumbnails[activeHeroThumb].desc}
                  </div>
                </div>

                {/* Selectable Previews Below Main Visual */}
                <div className="p-3 sm:p-4 bg-slate-950/85 border-t border-white/15">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {heroThumbnails.map((thumb, idx) => {
                      const isActive = activeHeroThumb === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveHeroThumb(idx)}
                          className={`flex flex-col sm:flex-row items-center gap-2 p-1.5 sm:p-2 rounded-xl text-start transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-sky-950/70 border-sky-400 shadow-md ring-1 ring-sky-400/40'
                              : 'bg-slate-900/60 border-white/15 hover:border-white/30 text-slate-300'
                          }`}
                        >
                          <img
                            src={thumb.src}
                            alt={thumb.label}
                            className="w-12 h-8 sm:w-16 sm:h-10 object-contain rounded-lg shrink-0 border border-white/15 bg-slate-950"
                            loading="eager"
                          />
                          <div className="min-w-0 hidden sm:block">
                            <div className={`text-xs font-bold truncate ${isActive ? 'text-sky-300' : 'text-slate-200'}`}>
                              {thumb.label}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {thumb.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION B — INTERACTIVE NETWORK EXPLORER (Exact Required Mapping)          */}
      {/* ========================================================================= */}
      <section id="network-explorer" className="hidden" aria-hidden="true">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>{isAr ? 'طبقات المرافق والخدمات' : 'Utility Networks Explorer'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'منصة واحدة لرؤية شبكات الموقع' : 'A Single Platform to Visualize Site Networks'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {isAr 
                ? 'انتقل بين طبقات المرافق لفهم الأصول الميدانية وعلاقتها بالموقع والطرق والقطع والخدمات المحيطة.'
                : 'Navigate through utility layers to grasp physical field assets, road corridors, parcel boundaries, and adjacent services.'}
            </p>
          </div>

          {/* Six Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-3 mb-8 no-scrollbar">
            {networkTabs.map((tab, idx) => {
              const isActive = activeNetworkTab === idx;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveNetworkTab(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Network Showcase Container */}
          <div className="bg-slate-50/70 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 transition-all duration-300">
            {(() => {
              const current = networkTabs[activeNetworkTab];
              return (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Header & Concise Explanation */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.accentColor }} />
                        <span>{current.label}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                        {current.mainTitle}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
                        {current.explanation}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400 font-medium">
                      {isAr ? 'لوحة تدقيق وتحليل تشغيلي' : 'Operational Audit View'}
                    </div>
                  </div>

                  {/* Main Visual Display (object-fit: contain) */}
                  <div className="w-full">
                    <div 
                      className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md group cursor-pointer p-2 sm:p-3"
                      onClick={() => setLightboxImage({
                        src: current.src,
                        title: current.mainTitle,
                        subtitle: current.explanation
                      })}
                    >
                      <img
                        src={current.src}
                        alt={current.mainTitle}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                        loading="lazy"
                      />
                      <div className="absolute top-3 end-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white hover:bg-blue-600 transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      <div className="absolute bottom-3 start-3 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
                        {isAr ? 'اللوحة الرئيسية لشبكة' : 'Main Dashboard for'} {current.label}
                      </div>
                    </div>
                  </div>

                  {current.supportingImage && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center rounded-2xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/60 dark:bg-teal-950/20 p-3 sm:p-4">
                      <div className="lg:col-span-4 text-start">
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300">
                          <Droplets className="w-4 h-4" />
                          {isAr ? 'دليل تشغيلي لشبكة الري' : 'Irrigation Operational Evidence'}
                        </div>
                        <h4 className="mt-2 text-base sm:text-lg font-black text-slate-900 dark:text-white">{current.supportingLabel}</h4>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {isAr ? 'عرض منفصل لحالة القطاعات وأطوال الخطوط والمحـابس، يُراجع بجانب خريطة الشبكة دون خلطه مع أي خدمة أخرى.' : 'A dedicated view of sectors, line lengths, and valves, reviewed beside the irrigation map without mixing it with other services.'}
                        </p>
                        <button onClick={() => setLightboxImage({ src: current.supportingImage!, title: current.supportingLabel!, subtitle: current.mainTitle })} className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer">
                          <Maximize2 className="w-4 h-4" />
                          {isAr ? 'فتح لوحة المحابس' : 'Open valve dashboard'}
                        </button>
                      </div>
                      <button onClick={() => setLightboxImage({ src: current.supportingImage!, title: current.supportingLabel!, subtitle: current.mainTitle })} className="lg:col-span-8 block relative aspect-16/9 rounded-xl overflow-hidden bg-slate-950 p-1.5 border border-teal-200 dark:border-teal-900 cursor-zoom-in">
                        <img src={current.supportingImage} alt={current.supportingLabel} className="w-full h-full object-contain" loading="lazy" />
                      </button>
                    </div>
                  )}

                  {/* Horizontal Line Diagram (Clean SVG, NO fake numbers) */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3 h-3 text-blue-500" />
                      <span>{isAr ? 'تدرج مسار الأصل: نقطة التغذية ← خط النقل ← صمام التحكم ← نقطة التوزيع' : 'Asset Chain: Intake ← Transmission ← Control Valve ← Distribution Node'}</span>
                    </div>
                    
                    <div className="w-full bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800">
                      <svg viewBox="0 0 800 36" className="w-full h-7 overflow-visible" preserveAspectRatio="none">
                        <line x1="20" y1="18" x2="780" y2="18" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="4 4" className="dark:stroke-slate-700" />
                        <line x1="20" y1="18" x2="600" y2="18" stroke={current.accentColor} strokeWidth="3" />
                        
                        <circle cx="40" cy="18" r="6" fill={current.accentColor} />
                        <circle cx="240" cy="18" r="5" fill={current.accentColor} />
                        <circle cx="460" cy="18" r="5" fill={current.accentColor} />
                        <circle cx="680" cy="18" r="5" fill="#94a3b8" />
                      </svg>
                      
                      <div className="grid grid-cols-4 text-center text-[10px] text-slate-500 dark:text-slate-400 pt-1 font-semibold">
                        <div>{isAr ? 'المصدر / المحطة' : 'Intake'}</div>
                        <div>{isAr ? 'خط النقل الرئيسي' : 'Conduit'}</div>
                        <div>{isAr ? 'غرفة التحكم والعزل' : 'Chamber'}</div>
                        <div>{isAr ? 'التوزيع الفرعي' : 'Terminal'}</div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C — “من الميدان إلى القرار” (network-05, 06, 09, 11, 15)           */}
      {/* ========================================================================= */}
      <section id="field-to-decision" className="w-full py-16 md:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'الرحلة التشغيلية المتكاملة' : 'Field-To-Decision Lifecycle'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'من الميدان إلى القرار' : 'From Field to Decision'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {isAr 
                ? 'تتبع رحلة الأصل من أول رصده ميدانياً حتى ظهوره ضمن سياقه المكاني والفني.'
                : 'Follow the asset journey from its initial in-situ detection to its full spatial and technical context.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Steps Controller Column */}
            <div className="lg:col-span-5 space-y-3">
              {storySteps.map((step, idx) => {
                const isActive = activeStoryStep === idx;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStoryStep(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                        : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {step.badge}
                          </span>
                        </div>
                        <h4 className={`text-base sm:text-lg font-black transition-colors ${
                          isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {step.id}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Large Screenshot Display (One Large Screenshot Per Step) */}
            <div className="lg:col-span-7 lg:sticky lg:top-24">
              {(() => {
                const currentStep = storySteps[activeStoryStep];
                return (
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xl space-y-4">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold">
                          {currentStep.title}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {currentStep.caption}
                        </span>
                      </div>
                      <button
                        onClick={() => setLightboxImage({
                          src: currentStep.src,
                          title: currentStep.title,
                          subtitle: currentStep.caption
                        })}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                        title={isAr ? 'عرض مكبّر' : 'Expand'}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Screenshot Frame (object-fit: contain, sharp and readable) */}
                    <div 
                      className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer group p-1 sm:p-2"
                      onClick={() => setLightboxImage({
                        src: currentStep.src,
                        title: currentStep.title,
                        subtitle: currentStep.caption
                      })}
                    >
                      <img
                        src={currentStep.src}
                        alt={currentStep.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                        loading="lazy"
                      />

                      {/* Clean Callout Label */}
                      <div className="absolute bottom-3 end-3 px-3 py-1.5 rounded-lg bg-blue-900/90 backdrop-blur-md border border-blue-400/60 text-white text-xs font-bold shadow-lg">
                        {currentStep.callout}
                      </div>
                    </div>

                    {currentStep.dashboard && (
                      <button
                        type="button"
                        onClick={() => setLightboxImage({ src: currentStep.dashboard!.src, title: currentStep.dashboard!.label, subtitle: currentStep.title })}
                        className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 text-start transition-colors hover:border-blue-400 dark:border-slate-700 dark:bg-slate-950"
                      >
                        <img src={currentStep.dashboard.src} alt={currentStep.dashboard.label} className="h-12 w-20 shrink-0 rounded-lg border border-slate-200 bg-slate-950 object-contain dark:border-slate-700" loading="lazy" />
                        <span className="min-w-0">
                          <span className="block text-[10px] font-bold text-blue-600 dark:text-blue-400">{isAr ? 'سياق لوحة المقارنة' : 'Dashboard comparison context'}</span>
                          <span className="block truncate text-xs font-bold text-slate-700 dark:text-slate-200">{currentStep.dashboard.label}</span>
                        </span>
                        <Maximize2 className="ms-auto h-4 w-4 shrink-0 text-slate-400" />
                      </button>
                    )}

                    <div className="text-xs text-slate-400 font-semibold text-start">
                      {isAr ? 'المرحلة' : 'Step'} {activeStoryStep + 1} {isAr ? 'من' : 'of'} 5 — {currentStep.caption}
                    </div>

                  </div>
                );
              })()}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D — COMPLETE FIELD EVIDENCE LIFECYCLE                             */}
      {/* ========================================================================= */}
      <section id="field-evidence" className="w-full py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
              <Crosshair className="w-3.5 h-3.5" />
              <span>{isAr ? 'سجل الأدلة الميدانية الكامل' : 'Complete Field Evidence Register'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'كل مرحلة لها صورة ودليل وسياق واضح' : 'Every stage has an image, evidence, and a clear context'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {isAr ? 'من أول الرفع المساحي وحتى القرار الفني والتحديث المستمر، اختر أي مرحلة لعرض صورتها بدقة كبيرة وربطها بسياق العمل.' : 'From the first survey to technical decisions and continuous updates, select any phase to inspect its image in full detail and see its role in the workflow.'}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="xl:col-span-7 xl:sticky xl:top-24">
              <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950">
                <div className="flex items-center justify-between gap-3 bg-slate-900 px-4 sm:px-6 py-3 text-white border-b border-slate-800">
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs text-blue-300 font-bold truncate">{fieldEvidence[activeFieldEvidence].phase}</p>
                    <h3 className="text-sm sm:text-base font-black truncate">{fieldEvidence[activeFieldEvidence].title}</h3>
                  </div>
                  <button onClick={() => setLightboxImage({ src: fieldEvidence[activeFieldEvidence].src, title: fieldEvidence[activeFieldEvidence].title, subtitle: fieldEvidence[activeFieldEvidence].phase })} className="shrink-0 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer" title={isAr ? 'تكبير الصورة' : 'Expand image'}>
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={() => setLightboxImage({ src: fieldEvidence[activeFieldEvidence].src, title: fieldEvidence[activeFieldEvidence].title, subtitle: fieldEvidence[activeFieldEvidence].phase })} className="block w-full aspect-16/10 sm:aspect-16/9 p-2 sm:p-3 cursor-zoom-in">
                  <img src={fieldEvidence[activeFieldEvidence].src} alt={fieldEvidence[activeFieldEvidence].title} className="w-full h-full object-contain" loading="lazy" />
                </button>
                <div className="px-4 sm:px-6 py-3 bg-slate-900/95 text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {isAr ? 'دليل تشغيلي موثق ضمن رحلة تتبع الأصل' : 'Documented operational evidence within the asset-tracking journey'}
                </div>
              </div>
            </div>

            <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3 max-h-[760px] xl:overflow-y-auto xl:pe-2">
              {fieldEvidence.map((item, index) => {
                const active = activeFieldEvidence === index;
                return (
                  <button key={`${item.title}-${index}`} onClick={() => setActiveFieldEvidence(index)} className={`group flex items-center gap-3 p-2.5 rounded-2xl text-start border transition-all cursor-pointer ${active ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 shadow-sm' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300'}`}>
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-slate-200 dark:border-slate-700 p-0.5">
                      <img src={item.src} alt="" className="w-full h-full object-contain" loading="lazy" />
                      <span className="absolute top-1 start-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center">{index + 1}</span>
                    </div>
                    <span className="min-w-0">
                      <span className={`block text-[11px] font-bold ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>{item.phase}</span>
                      <span className="block text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 leading-snug mt-0.5">{item.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D — MAIN DASHBOARD VIEWER (All 17 Images in Tabs)                 */}
      {/* ========================================================================= */}
      <section id="evidence-viewer" className="w-full py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>{isAr ? 'عارض لوحات التحكم المركزية' : 'Master Dashboard Viewer'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'الأدلة الرقمية في واجهة واحدة' : 'Digital Evidence in a Single Interface'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {isAr 
                ? 'تتحول صور الموقع والمخططات والطبقات الجغرافية إلى تجربة مرئية سهلة المراجعة والبحث.'
                : 'Site imagery, engineering drawings, and GIS layers transform into a clear, reviewable spatial experience.'}
            </p>
          </div>

          {/* Viewer 5 Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-3 mb-6 no-scrollbar">
            {viewerTabs.map((vTab, idx) => {
              const isActive = activeViewerTab === idx;
              return (
                <button
                  key={vTab.id}
                  onClick={() => setActiveViewerTab(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
                  }`}
                >
                  {vTab.label}
                </button>
              );
            })}
          </div>

          {/* Large Dashboard Editorial Frame (Largest & Strongest Visual Part) */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
              
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-slate-200">
                  {activeViewerCaption}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 hidden sm:inline">
                  {viewerTabs[activeViewerTab].label}
                </span>
              </div>

              {/* Controls: Zoom, Reset, Fullscreen */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDashboardZoom(prev => Math.min(prev + 0.25, 2.5))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={isAr ? 'تكبير' : 'Zoom In'}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDashboardZoom(prev => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={isAr ? 'تصغير' : 'Zoom Out'}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDashboardZoom(1)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-mono px-2"
                  title={isAr ? 'إعادة ضبط' : 'Reset Zoom'}
                >
                  {Math.round(dashboardZoom * 100)}%
                </button>
                <button
                  onClick={() => setLightboxImage({
                    src: activeViewerImage,
                    title: activeViewerCaption,
                    subtitle: viewerTabs[activeViewerTab].label
                  })}
                  className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                  title={isAr ? 'عرض بكامل الشاشة' : 'Fullscreen'}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Central Display: Large and Readable with object-fit: contain */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-slate-950 flex items-center justify-center overflow-hidden p-2 sm:p-4">
              <img
                src={activeViewerImage}
                alt={activeViewerCaption}
                className="w-full h-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${dashboardZoom})` }}
                loading="lazy"
              />
            </div>

            {/* Selectable Thumbnails Bar (Clicking updates main display) */}
            <div className="bg-slate-950/90 p-3 sm:p-4 border-t border-slate-800">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                {viewerTabs[activeViewerTab].thumbnails.map((tItem, tIdx) => {
                  const isCur = activeViewerImage === tItem.src;
                  return (
                    <button
                      key={tIdx}
                      onClick={() => {
                        setActiveViewerImage(tItem.src);
                        setActiveViewerCaption(tItem.label);
                      }}
                      className={`flex items-center gap-2 p-1.5 rounded-xl border shrink-0 transition-all cursor-pointer ${
                        isCur 
                          ? 'bg-blue-900/60 border-blue-500 shadow-sm' 
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={tItem.src}
                        alt={tItem.label}
                        className="w-14 h-9 sm:w-16 sm:h-10 object-contain rounded-lg shrink-0 border border-slate-700 bg-slate-950"
                        loading="lazy"
                      />
                      <span className={`text-xs font-semibold px-1 ${isCur ? 'text-blue-300' : 'text-slate-400'}`}>
                        {tItem.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E — OPERATIONAL EVIDENCE BOARDS                                   */}
      {/* ========================================================================= */}
      <section id="operational-boards" className="w-full py-16 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
              <Eye className="w-3.5 h-3.5" />
              <span>{isAr ? 'لوحات تشغيل قابلة للمراجعة' : 'Reviewable Operational Boards'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'شاهد الصورة كاملة قبل الدخول في التفاصيل' : 'See the complete picture before going into the details'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {isAr ? 'كل لوحة تعرض سياقاً مختلفاً من العمل التشغيلي. اضغط على أي لوحة لقراءتها بدقة كاملة.' : 'Each board presents a different operational context. Select any board to inspect it in full detail.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {evidenceBoards.map((board, index) => (
              <article key={board.kicker} className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <button
                  onClick={() => setLightboxImage({ src: board.src, title: board.title, subtitle: board.kicker })}
                  className="relative block w-full aspect-16/10 bg-slate-950 overflow-hidden p-2 text-start cursor-pointer"
                  aria-label={isAr ? `تكبير ${board.kicker}` : `Expand ${board.kicker}`}
                >
                  <img src={board.src} alt={board.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.015]" loading="lazy" />
                  <span className="absolute top-4 end-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/85 border border-slate-700 text-white text-xs font-bold shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                    {isAr ? 'عرض مكبّر' : 'Expand'}
                  </span>
                  <span className="absolute bottom-4 start-4 px-3 py-1.5 rounded-lg bg-blue-600/95 text-white text-xs font-bold shadow-lg">
                    {String(index + 1).padStart(2, '0')} — {board.kicker}
                  </span>
                </button>
                <div className="p-5 sm:p-6 text-start">
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">{board.kicker}</p>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">{board.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{board.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E — PLANNING AND TECHNICAL STUDIES (network-03 vs network-08)     */}
      {/* ========================================================================= */}
      <section id="technical-studies" className="w-full py-16 md:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column: Text */}
            <div className="lg:col-span-5 text-start space-y-5">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
                <Crosshair className="w-3.5 h-3.5" />
                <span>{isAr ? 'الدراسات والمراجعات الفنية' : 'Engineering Studies & Alignment'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                {isAr ? 'من المخطط إلى المراجعة الفنية' : 'From Masterplan to Engineering Review'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {isAr 
                  ? 'تساعد الرؤية المكانية المتكاملة على قراءة علاقة القطع والممرات والخدمات والبنية التحتية ضمن سياق واحد.'
                  : 'An integrated spatial vision helps read parcel boundaries, road reserves, right-of-ways, and utility networks in a coherent unified context.'}
              </p>

              {/* Selector */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {isAr ? 'اختر طبقة التحليل المقارن:' : 'Select Comparison Overlay:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setComparisonTarget('plan1')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      comparisonTarget === 'plan1'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isAr ? 'تحليل حرم المسارات' : 'Buffer Reserves'}
                  </button>

                  <button
                    onClick={() => setComparisonTarget('plan2')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      comparisonTarget === 'plan2'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isAr ? 'تقاطعات الخدمات' : 'Utility Crossings'}
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                  <span>{isAr ? 'سياق شبكات البنية' : 'Corridor Context'}</span>
                  <span>{sliderPosition}%</span>
                  <span>{isAr ? 'التحليل المكاني' : 'Spatial Analysis'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

            </div>

            {/* Left Column: Visual Comparison Slider */}
            <div className="lg:col-span-7">
              <div 
                ref={comparisonContainerRef}
                onMouseMove={(e) => isDraggingSlider && handleSliderMove(e.clientX)}
                onMouseDown={() => setIsDraggingSlider(true)}
                onMouseUp={() => setIsDraggingSlider(false)}
                onTouchMove={handleTouchMove}
                className="relative aspect-16/10 rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl select-none p-1"
              >
                
                {/* Background Image: field corridor context */}
                <img
                  src={field09}
                  alt={isAr ? 'سياق شبكات البنية' : 'Corridor Context'}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  loading="lazy"
                />

                {/* Overlaid Image: engineering plan or utility map */}
                <div 
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{
                    clipPath: isAr 
                      ? `inset(0 ${100 - sliderPosition}% 0 0)`
                      : `inset(0 0 0 ${sliderPosition}%)`
                  }}
                >
                  <img
                    src={comparisonTarget === 'plan1' ? field10 : field07}
                    alt={isAr ? 'التحليل المكاني' : 'Spatial Analysis'}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Divider Line */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize flex items-center justify-center z-20"
                  style={{ [isAr ? 'right' : 'left']: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 end-3 px-3 py-1.5 rounded-lg bg-slate-900/80 text-white text-xs font-bold pointer-events-none z-10">
                  {isAr ? 'عرض موحد للطبقات' : 'Unified Layer View'}
                </div>
                <div className="absolute bottom-3 start-3 px-3 py-1.5 rounded-lg bg-blue-900/80 text-white text-xs font-bold pointer-events-none z-10">
                  {isAr ? 'قراءة مكانية متكاملة' : 'Integrated Spatial Mapping'}
                </div>

              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {dashboardViews.slice(0, 3).map((view) => (
                  <button key={view.src} type="button" onClick={() => setLightboxImage({ src: view.src, title: view.label, subtitle: isAr ? 'سياق مقارنة للمسارات' : 'Route comparison context' })} className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2 text-start shadow-xs transition-all hover:border-blue-400 dark:border-slate-700 dark:bg-slate-800">
                    <img src={view.src} alt={view.label} className="h-10 w-14 shrink-0 rounded-lg border border-slate-200 bg-slate-950 object-contain dark:border-slate-700" loading="lazy" />
                    <span className="min-w-0 truncate text-xs font-bold text-slate-700 group-hover:text-blue-600 dark:text-slate-200">{view.label}</span>
                  </button>
                ))}
              </div>

              {/* Three Supporting Items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                
                <div 
                  onClick={() => setLightboxImage({
                    src: field03,
                    title: isAr ? 'طبقات التمديد الأرضي' : 'Underground Ducts',
                    subtitle: isAr ? 'عرض موحد للطبقات' : 'Unified Layer View'
                  })}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all cursor-pointer shadow-xs group"
                >
                  <img
                    src={field03}
                    alt="Ducts"
                    className="w-12 h-10 object-contain rounded-lg shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-950"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 truncate">
                      {isAr ? 'عرض موحد للطبقات' : 'Unified Layer View'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {isAr ? 'طبقات التمديد' : 'Underground Ducts'}
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setLightboxImage({
                    src: field07,
                    title: isAr ? 'تحليل أعماق المسارات' : 'Depth & Elevation Analysis',
                    subtitle: isAr ? 'تحليل تشغيلي مرئي' : 'Operational Visual Analysis'
                  })}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all cursor-pointer shadow-xs group"
                >
                  <img
                    src={field07}
                    alt="Depth"
                    className="w-12 h-10 object-contain rounded-lg shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-950"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 truncate">
                      {isAr ? 'تحليل تشغيلي مرئي' : 'Operational Visual Analysis'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {isAr ? 'أعماق المسارات' : 'Corridor Depths'}
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setLightboxImage({
                    src: field10,
                    title: isAr ? 'سياق التطور التراكمي' : 'Cumulative Progress Context',
                    subtitle: isAr ? 'قراءة مكانية متكاملة' : 'Integrated Spatial Mapping'
                  })}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all cursor-pointer shadow-xs group"
                >
                  <img
                    src={field10}
                    alt="Cumulative"
                    className="w-12 h-10 object-contain rounded-lg shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-950"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 truncate">
                      {isAr ? 'قراءة مكانية متكاملة' : 'Integrated Spatial Mapping'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {isAr ? 'التطور التراكمي' : 'Cumulative Progress'}
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F — OPERATIONAL WORKFLOW STRIP                                    */}
      {/* ========================================================================= */}
      <section className="w-full py-16 md:py-20 bg-white dark:bg-slate-950 border-b border-slate-150 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'سير عمل واضح للفرق الفنية' : 'Clear Operational Workflow for Technical Teams'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {isAr 
                ? 'رفع ميداني ← توثيق الأصل ← فحص الجودة ← ربط GIS ← مراجعة التعارضات ← مخرج فني'
                : 'Field Survey → Asset Log → QA/QC Audit → GIS Link → Conflict Check → Technical Output'}
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 dark:from-slate-800 dark:via-blue-600 dark:to-slate-800 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
              {storySteps.concat([
                {
                  id: '06',
                  title: isAr ? 'المخرج الفني والجاهزية' : 'Technical Dossier',
                  text: isAr ? 'تقارير الجاهزية التشغيلية للمشروع.' : 'Operational project dossier.',
                  src: field19,
                  caption: isAr ? 'تحليل تشغيلي مرئي' : 'Operational Analysis',
                  badge: isAr ? 'مخرج نهائي' : 'Final Output',
                  callout: isAr ? 'الجاهزية التامة' : 'Ready'
                }
              ]).map((node, nIdx) => (
                <div
                  key={node.id}
                  onClick={() => scrollToSection(nIdx < 5 ? 'field-to-decision' : 'evidence-viewer')}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 text-center hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center"
                >
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden mb-3 border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform bg-slate-950 p-0.5">
                    <img
                      src={node.src}
                      alt={node.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute top-1 start-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {nIdx + 1}
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {node.caption}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H — FINAL CLOSING SECTION (network-17 main, network-16 preview)   */}
      {/* ========================================================================= */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-12 shadow-xl overflow-hidden relative">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Closing Text */}
              <div className="lg:col-span-7 space-y-4 text-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'رؤية أوضح قبل أي قرار' : 'Clarity Before Any Decision'}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                  {isAr ? 'اجمع الأدلة. افهم الموقع. تحرك بثقة.' : 'Gather Evidence. Understand the Site. Move with Confidence.'}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  {isAr 
                    ? 'تساعد عين سيجام فرق التطوير والتشغيل على تحويل صور الموقع والطبقات والمخططات إلى رؤية أوضح وأكثر قابلية للمراجعة.'
                    : 'Ain Sijam empowers development and operational teams to turn site photos, GIS layers, and masterplans into an auditable spatial perspective.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={() => onNavigate('home')}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md cursor-pointer transition-colors"
                  >
                    {isAr ? 'استكشف المنصة' : 'Explore Platform'}
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
                  >
                    {isAr ? 'تواصل معنا' : 'Contact Us'}
                  </button>
                </div>
              </div>

              {/* Main Visual: network-17 with Small Supporting Preview network-16 */}
              <div className="lg:col-span-5 relative">
                <div 
                  className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md cursor-pointer group p-1 sm:p-2"
                  onClick={() => setLightboxImage({
                    src: field19,
                    title: isAr ? 'تحليل تشغيلي مرئي' : 'Operational Visual Analysis',
                    subtitle: isAr ? 'عين سيجام | شبكات البنية التحتية' : 'Ain Sijam'
                  })}
                >
                  <img
                    src={field19}
                    alt={isAr ? 'تحليل تشغيلي مرئي' : 'Operational Analysis'}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 start-2 px-2.5 py-1 rounded bg-slate-900/80 text-white text-[11px] font-semibold">
                    {isAr ? 'تحليل تشغيلي مرئي' : 'Operational Visual Analysis'}
                  </div>
                </div>

                {/* Small Supporting Preview: network-16 */}
                <div 
                  className="absolute -bottom-4 -end-4 w-40 sm:w-48 aspect-16/10 rounded-xl overflow-hidden bg-slate-950 border-2 border-white dark:border-slate-800 shadow-xl cursor-pointer hover:scale-105 transition-transform hidden sm:block p-1"
                  onClick={() => setLightboxImage({
                    src: field07,
                    title: isAr ? 'قراءة مكانية متكاملة' : 'Integrated Spatial Mapping',
                    subtitle: isAr ? 'سياق التطور التراكمي' : 'Cumulative Progress Context'
                  })}
                >
                  <img
                    src={field07}
                    alt="Satellite Context"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1 start-1 px-1.5 py-0.5 rounded bg-slate-900/90 text-white text-[9px] font-semibold">
                    {isAr ? 'قراءة مكانية متكاملة' : 'Spatial Context'}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LIGHTBOX / FULLSCREEN IMAGE VIEWER MODAL                                  */}
      {/* ========================================================================= */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <div className="flex items-center justify-between text-white pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {lightboxImage.title}
              </h3>
              {lightboxImage.subtitle && (
                <p className="text-xs text-slate-400">
                  {lightboxImage.subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLightboxZoom(prev => Math.min(prev + 0.25, 3))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isAr ? 'تكبير' : 'Zoom In'}
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <button
                onClick={() => setLightboxZoom(prev => Math.max(prev - 0.25, 0.5))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isAr ? 'تصغير' : 'Zoom Out'}
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              <button
                onClick={() => setLightboxZoom(1)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isAr ? 'إعادة ضبط' : 'Reset'}
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setLightboxImage(null);
                  setLightboxZoom(1);
                }}
                className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer ms-2"
                title={isAr ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-auto p-2 sm:p-4">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[85vh] max-w-[92vw] object-contain transition-transform duration-200 select-none"
              style={{ transform: `scale(${lightboxZoom})` }}
            />
          </div>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-800">
            {isAr ? 'عين سيجام — منصة ذكاء شبكات البنية التحتية وتوثيق الأصول' : 'Ain Sijam — Infrastructure Networks Intelligence Platform'}
          </div>
        </div>
      )}

    </div>
  );
};
