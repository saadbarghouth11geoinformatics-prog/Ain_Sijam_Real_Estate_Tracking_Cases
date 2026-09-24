export type Language = 'ar' | 'en';
export type ThemeMode = 'light' | 'dark';

export interface Translations {
  appName: string;
  appShortName: string;
  appTagline: string;
  appDescription: string;
  
  // Navigation tabs
  navHome: string;
  navProjectsMap: string;
  navProjectsMapBadge: string;
  navDigitalTwin: string;
  navDigitalTwinBadge: string;
  navEvolution: string;
  navSoilSuitability: string;
  navSoilSuitabilityBadge: string;
  navEquipmentFleet: string;
  navCadastre: string;
  navInfrastructure: string;
  navAdvisor: string;
  navPricing: string;
  
  // Controls & Action Bar
  searchPlaceholder: string;
  allCities: string;
  regionName: string;
  regionFilter: string;
  subscribeBtn: string;
  subscribedBadge: string;
  darkMode: string;
  lightMode: string;
  langSwitch: string;
  currentActiveLabel: string;
  
  // Hero section - Concise & Professional
  heroBadgeText: string;
  heroYear: string;
  heroTitleName: string;
  heroHeadlineMain: string;
  heroHeadlineHighlight: string;
  heroDescription: string;
  heroBtnExplore: string;
  heroBtnTwin: string;
  heroBtnSoil: string;
  jumpToSection: string;
  
  // Live Telemetry Stats
  statProjectsCount: string;
  statProjectsDesc: string;
  statFleetCount: string;
  statFleetDesc: string;
  statPlotsCount: string;
  statPlotsDesc: string;
  statSbcCode: string;
  statSbcDesc: string;
  
  // Satellite & Aerial Imagery terms (Replaced GIS & RS)
  satelliteAnalysisTitle: string;
  aerialImageryBadge: string;
  satelliteOrthophoto: string;
  elevationModel: string;
  parcelBoundaries: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: 'عين سيجام | تحليل صور الأقمار الصناعية والمراقبة الجوية',
    appShortName: 'عين سيجام',
    appTagline: 'تحليل صور الأقمار الصناعية • التصوير الجوي • مراقبة مواقع البناء',
    appDescription: 'منصة ذكية معتمدة على تحليل صور الأقمار الصناعية والتصوير الجوي لمتابعة الأراضي، التشييد، والأسطول الميداني بدقة واحترافية.',
    
    navHome: 'الرئيسية',
    navProjectsMap: 'خريطة المشاريع',
    navProjectsMapBadge: 'مباشر',
    navDigitalTwin: 'التوأم الرقمي',
    navDigitalTwinBadge: 'BIM',
    navEvolution: 'مقارنة الأقمار الصناعية',
    navSoilSuitability: 'فحص الأراضي والتربة',
    navSoilSuitabilityBadge: 'جسات',
    navEquipmentFleet: 'أسطول المعدات',
    navCadastre: 'المخططات التنظيمية',
    navInfrastructure: 'شبكات البنية التحتية',
    navAdvisor: 'المستشار الهندسي الذكي',
    navPricing: 'باقات الاشتراك',
    
    searchPlaceholder: 'ابحث برقم الصك، الحي، أو المشروع...',
    allCities: 'الكل',
    regionName: 'اسم المنطقة',
    regionFilter: 'فلتر اسم المنطقة',
    subscribeBtn: 'ترقية الحساب',
    subscribedBadge: 'حساب استشاري معتمد',
    darkMode: 'الوضع الليلي',
    lightMode: 'الوضع النهاري',
    langSwitch: 'English',
    currentActiveLabel: 'القسم الحالي:',
    
    heroBadgeText: 'تحليل صور الأقمار الصناعية والتصوير الجوي',
    heroYear: '2026',
    heroTitleName: 'عين سيجام',
    heroHeadlineMain: 'راقب أراضيك ومواقع البناء بدقة',
    heroHeadlineHighlight: 'بتحليل صور الأقمار الصناعية والتصوير الجوي المباشر',
    heroDescription: 'منظومة موحدة لمتابعة المشاريع عبر الأقمار الصناعية، فحص صلاحية التربة والجسات، ومراقبة أسطول المعدات ومعدلات الإنجاز أولاً بأول.',
    heroBtnExplore: 'خريطة المشاريع المباشرة',
    heroBtnTwin: 'التوأم الرقمي والمطابقة',
    heroBtnSoil: 'فحص الأراضي والجسات',
    jumpToSection: 'الأقسام المباشرة:',
    
    statProjectsCount: '24 مشروعاً استراتيجياً',
    statProjectsDesc: 'متابعة فضائية وجوية مستمرة',
    statFleetCount: '1,645 معدة وآلية نشطة',
    statFleetDesc: 'تتبع حركة وتشغيل المعدات',
    statPlotsCount: '4,320 قطعة مفحوصة',
    statPlotsDesc: 'تقارير الجسات وصلاحية البناء',
    statSbcCode: '94.8% نسبة الامتثال',
    statSbcDesc: 'مطابقة اشتراطات كود البناء',
    
    satelliteAnalysisTitle: 'تحليل صور الأقمار الصناعية',
    aerialImageryBadge: 'تصوير جوي وفضائي فائق الدقة',
    satelliteOrthophoto: 'صورة فضائية عالية الوضوح',
    elevationModel: 'خريطة الارتفاعات والمناسيب',
    parcelBoundaries: 'حدود قطع الأراضي والمخططات',
  },
  
  en: {
    appName: 'SIGAM Eye | Satellite Imagery & Aerial Site Monitoring',
    appShortName: 'SIGAM Eye',
    appTagline: 'Satellite Imagery Analysis • Aerial Photography • Construction Monitoring',
    appDescription: 'Smart platform powered by satellite imagery analysis and aerial photography to monitor land parcels, construction sites, and equipment fleets with maximum clarity.',
    
    navHome: 'Home',
    navProjectsMap: 'Projects Map',
    navProjectsMapBadge: 'Live',
    navDigitalTwin: 'Digital Twin',
    navDigitalTwinBadge: 'BIM',
    navEvolution: 'Satellite Evolution',
    navSoilSuitability: 'Land & Soil Testing',
    navSoilSuitabilityBadge: 'Boreholes',
    navEquipmentFleet: 'Equipment Fleet',
    navCadastre: 'Master Plans',
    navInfrastructure: 'Infrastructure',
    navAdvisor: 'Engineering AI Advisor',
    navPricing: 'Subscription Plans',
    
    searchPlaceholder: 'Search deed, plot ID, or project...',
    allCities: 'All',
    regionName: 'Region Name',
    regionFilter: 'Region Name Filter',
    subscribeBtn: 'Upgrade Account',
    subscribedBadge: 'Verified Consultant Tier',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    langSwitch: 'العربية',
    currentActiveLabel: 'Current Section:',
    
    heroBadgeText: 'Satellite Imagery & Aerial Intelligence',
    heroYear: '2026',
    heroTitleName: 'SIGAM Eye',
    heroHeadlineMain: 'Monitor Your Lands & Construction Sites with Precision',
    heroHeadlineHighlight: 'with High-Resolution Satellite & Aerial Analysis',
    heroDescription: 'Unified platform for real-time project tracking via satellite imagery, geotechnical borehole verification, and automated equipment fleet monitoring.',
    heroBtnExplore: 'Explore Live Projects Map',
    heroBtnTwin: 'Inspect Digital Twin',
    heroBtnSoil: 'Check Land & Boreholes',
    jumpToSection: 'Direct Sections:',
    
    statProjectsCount: '24 Strategic Projects',
    statProjectsDesc: 'Continuous satellite & aerial coverage',
    statFleetCount: '1,645 Active Machines',
    statFleetDesc: 'Real-time telemetry and runtime tracking',
    statPlotsCount: '4,320 Audited Plots',
    statPlotsDesc: 'Borehole dossiers & soil bearing clearance',
    statSbcCode: '94.8% Compliance Rate',
    statSbcDesc: 'Verified against Saudi Building Code',
    
    satelliteAnalysisTitle: 'Satellite Imagery Analysis',
    aerialImageryBadge: 'High-Res Aerial & Satellite View',
    satelliteOrthophoto: 'High-Resolution Satellite Orthomosaic',
    elevationModel: 'Digital Elevation & Contours',
    parcelBoundaries: 'Parcel Boundaries & Cadastre',
  }
};
