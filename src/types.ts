export type PropertyType = 
  | 'residential_land' // قطعة أرض سكنية
  | 'commercial_land'  // قطعة أرض تجارية
  | 'apartment'        // شقة سكنية
  | 'villa'            // فيلا
  | 'commercial_building' // عمارة تجارية/سكنية
  | 'retail_store'     // معرض/محل تجاري
  | 'agricultural_land'; // أرض زراعية

export type City = 'الرياض' | 'جدة' | 'الدمام' | 'مكة المكرمة' | 'المدينة المنورة' | 'الخبر' | 'نيوم';

export interface RealEstateDeal {
  id: string;
  dealNumber: string;
  date: string;
  time: string;
  city: City;
  district: string;
  propertyType: PropertyType;
  propertyTypeName: string;
  areaM2: number;
  pricePerM2: number;
  totalPrice: number;
  subdivisionCode: string; // رقم المخطط
  parcelNumber: string; // رقم القطعة
  source: 'وزارة العدل' | 'السجل العقاري';
  usage: 'سكني' | 'تجاري' | 'زراعي';
}

export interface DistrictInfo {
  id: string;
  name: string;
  city: City;
  avgPriceM2Residential: number;
  avgPriceM2Commercial: number;
  yearlyChangePct: number; // e.g. +14.5%
  dealsCountMonth: number;
  avgRentApartmentYearly: number; // 3 rooms
  avgRentVillaYearly: number;
  rentalYieldPct: number; // e.g. 7.4%
  demandLevel: 'مرتفع جداً' | 'مرتفع' | 'متوسط' | 'مستقر';
  zoneType: 'سكني راقٍ' | 'سكني واعد' | 'تجاري وإداري' | 'متعدد الاستخدام';
  nearbyProjects: string[];
  coordinates: { x: number; y: number }; // Relative map coordinate 0-100
}

export interface RentalData {
  district: string;
  city: City;
  studioRent: number;
  oneBedRent: number;
  twoBedRent: number;
  threeBedRent: number;
  villaRent: number;
  officeM2Rent: number;
  netYieldPct: number;
  occupancyRatePct: number;
}

export interface MarketSummary {
  dailyVolumeSAR: number;
  dailyDealsCount: number;
  avgPriceM2Residential: number;
  avgPriceM2Commercial: number;
  ejarContractsToday: number;
  confidenceIndex: number;
  changeVolumePct: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ValuationResult {
  estimatedTotal: number;
  estimatedPricePerM2: number;
  rangeLow: number;
  rangeHigh: number;
  netYield: number;
  rettTax: number; // 5% ضريبة التصرفات
  brokerageFee: number; // 2.5% السعي
  totalAcquisitionCost: number;
  estimatedAnnualRent: number;
}

export interface BuildingParcel {
  id: string;
  parcelNumber: string;
  districtId: string;
  subdivision: string;
  type: 'villa' | 'apartment' | 'commercial' | 'tower' | 'mosque' | 'park' | 'vacant';
  typeName: string;
  floors: number;
  areaM2: number;
  status: 'قائم ومأهول' | 'تحت الإنشاء' | 'أرض فضاء مرخصة' | 'مرفق عام';
  estimatedPrice: number;
  pricePerM2: number;
  occupancyRate?: number;
  infrastructure: {
    electricity: boolean;
    water: boolean;
    sewage: boolean;
    fiber: boolean;
    stormDrain: boolean;
  };
  gridX: number; // grid position inside district cadastre
  gridY: number;
  gridW: number;
  gridH: number;
}

export interface DistrictInfrastructure {
  districtId: string;
  districtName: string;
  city: City;
  readinessScore: number; // 0 - 100
  electricity: {
    coveragePct: number;
    provider: string;
    substationCapacityKVA: number;
    status: string;
  };
  water: {
    coveragePct: number;
    provider: string;
    networkStatus: string;
    waterSource: string;
  };
  sewage: {
    coveragePct: number;
    networkStatus: string;
    treatmentZone: string;
  };
  telecom: {
    fiberCoveragePct: number;
    fiveGCoveragePct: number;
    avgSpeedMbps: number;
    providers: string[];
  };
  metroTransit: {
    nearestStation: string;
    lineName: string;
    lineColor: string;
    distanceMeters: number;
    status: string;
  };
  stormDrainage: {
    coveragePct: number;
    riskRating: 'منخفض جداً' | 'منخفض' | 'متوسط';
    channelStatus: string;
  };
  pavementLighting: {
    lightingCoveragePct: number;
    asphaltStatus: 'ممتاز' | 'جيد جداً' | 'جاري التطوير';
  };
  smartUtilities: {
    evChargingStations: number;
    smartMetersPct: number;
  };
}

export interface MetroLineInfo {
  id: string;
  name: string;
  color: string;
  colorClass: string;
  code: string;
  lengthKm: number;
  stationsCount: number;
  keyStations: string[];
  operationalStatus: string;
}

// ==================== عين سيجام: الأنواع والبيانات الهندسية ====================

export type SoilType = 
  | 'تربة صخرية جيرية متماسكة'
  | 'تربة رملية حصوية مدكوكة'
  | 'تربة طينية متمددة (تحتاج إحلال)'
  | 'ردم عشوائي غير هندسي (غير صالحة)'
  | 'تربة سبخة ملحية';

export type SuitabilityRating = 
  | 'صالحة للبناء فوراً'
  | 'صالحة مع اشتراطات معالجة تربة'
  | 'غير صالحة - منطقة مجرى سيل أو قيود تنظيمية';

export interface LandParcelSuitability {
  id: string;
  parcelNumber: string;
  subdivisionCode: string;
  district: string;
  city: City;
  areaM2: number;
  frontageM: number;
  depthM: number;
  streetWidthM: number;
  permittedUsage: 'سكني فلل' | 'سكني عمائر' | 'تجاري إداري' | 'متعدد الاستخدام' | 'لوجستي ومستودعات';
  maxBuildingRatioPct: number; // e.g. 60%
  allowedFloors: string; // e.g. "دوران ونصف (أرضي + أول + ملحق)"
  setbacks: {
    front: number;
    back: number;
    side1: number;
    side2: number;
  };
  suitabilityStatus: SuitabilityRating;
  suitabilityScore: number; // 0 - 100
  soilType: SoilType;
  bearingCapacityKgCm2: number; // قدرة تحمل التربة كجم/سم2
  groundwaterDepthM: number; // عمق المياه الجوفية بالمتر
  floodRisk: 'آمن تماماً' | 'منخفض جداً' | 'متوسط (يتطلب تصريف خاص)' | 'عالي - حيز وادي مائي';
  elevationAboveSeaM: number; // المنسوب عن سطح البحر
  slopePct: number; // انحدار الأرض %
  infrastructureReady: boolean;
  regulatoryObstacles: string[]; // e.g. ['لا توجد موانع', 'حرم كهرباء ضغط عالي 25م']
  isSampleDemo: boolean; // true = visible to everyone, false = requires subscription
  satelliteImageUrl?: string; // High-resolution Google Earth / satellite imagery URL
  coordinates?: { lat: number; lng: number };
}

export interface UrbanEvolutionPeriod {
  id: string;
  year: number;
  month: string;
  dateKey: string; // "2021-01", "2023-06", etc.
  district: string;
  city: City;
  builtUpRatioPct: number; // نسبة البناء في المخطط %
  builtUpAreaKm2: number; // المسطحات المبنية كم²
  expansionDeltaPct: number; // نسبة الزيادة عن العام السابق %
  totalParcelsCount: number;
  developedParcelsCount: number;
  underConstructionCount: number;
  vacantParcelsCount: number;
  equipmentOnSiteAvg: number; // متوسط عدد المعدات العاملة
  satelliteImageLabel: string;
  phaseTitle: string;
  keyMilestones: string[];
}

export interface SiteEquipmentFleet {
  type: string;
  nameAr: string;
  count: number;
  activeCount: number;
  idleCount: number;
  maintenanceCount: number;
  safetyCertified: boolean;
}

export interface ConstructionSiteProject {
  id: string;
  name: string;
  projectCode: string;
  city: City;
  district: string;
  developer: string;
  mainContractor: string;
  engineeringConsultant: string;
  projectType: 'برج مكتبي وأبراج فندقية' | 'مجمع سكني مغلق' | 'مركز لوجستي وتخزين' | 'مستشفى ومجمع طبي' | 'أبراج سكنية تمليك';
  siteAreaM2: number;
  totalBuiltUpAreaM2: number;
  currentStage: 'حفر ونزح مياه وجسات' | 'أعمال خوازيق وتأسيسات' | 'هيكل خرساني وعظم' | 'واجهات وأعمال كهروميكانيكية' | 'تشطيبات نهائية وتسليم';
  actualProgressPct: number;
  plannedProgressPct: number;
  variancePct: number; // +2% or -4%
  workforceCount: number;
  startDate: string;
  targetCompletionDate: string;
  safetyScorePct: number;
  isSampleDemo: boolean; // true for public preview, false for private site subscription
  satelliteImageUrl?: string;
  coordinates?: { lat: number; lng: number };
  equipmentSummary: {
    totalUnits: number;
    activeUnits: number;
    fleet: SiteEquipmentFleet[];
  };
}

export interface SubscriptionPlan {
  id: string;
  nameAr: string;
  nameEn: string;
  tagline: string;
  badge?: string;
  monthlyPriceSAR: number;
  annualPriceSAR: number;
  features: string[];
  highlight: boolean;
  limits: {
    privatePlotsSearches: string;
    customSitesTracked: string;
    cadGisExport: boolean;
    soilReportDownload: boolean;
    droneSurveyAccess: boolean;
    dailySatelliteRefresh: boolean;
  };
}

