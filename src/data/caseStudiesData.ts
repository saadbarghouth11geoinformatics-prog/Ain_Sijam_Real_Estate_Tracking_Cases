/**
 * Case Studies Data & Asset Tracking Life-Cycle Specification
 * Conforms strictly to the Saudi Real Estate Tracking Case-Study Package.
 */

export type ChecklistItemStatus = 
  | 'completed'       // مكتمل
  | 'under_review'    // قيد المراجعة
  | 'in_progress'     // قيد التنفيذ
  | 'not_available'   // غير متوفر
  | 'not_required';   // غير مطلوب

export interface ApprovalChecklistItem {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  category: 'legal' | 'planning' | 'technical' | 'permits' | 'execution' | 'handover';
  status: ChecklistItemStatus;
  documentRef?: string;
  issuingEntity?: string;
  notes?: string;
}

export type StageWorkflowStatus = 'completed' | 'in_progress' | 'pending' | 'not_available';

export interface WorkflowStageItem {
  stageNumber: number;
  stageNameAr: string;
  stageNameEn: string;
  phaseId: number;
  phaseNameAr: string;
  phaseNameEn: string;
  responsibleParty: string;
  requiredEvidence: string;
  plannedDate: string;
  actualDate: string;
  status: StageWorkflowStatus;
  issuingAuthority: string;
  documentNumber: string;
  reviewer: string;
  notes: string;
  satelliteRelationship: string;
}

export interface HistoricalStageImage {
  stageNumber: number;
  acquisitionDate: string;
  phaseNameAr: string;
  satelliteSource: string;
  cloudCover: string;
  descriptionAr: string;
  imageFilename: string;
  imagePath: string;
  fallbackAliasPath?: string;
}

export interface ProjectSourceItem {
  titleAr: string;
  titleEn: string;
  organization: string;
  url?: string;
  attributionText?: string;
}

export interface CaseStudyProject {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  categoryKey: 'urban_business' | 'transport_infra' | 'tourism_entertainment' | 'airports' | 'industrial_cities';
  locationAr: string;
  locationEn: string;
  coordinates: string;
  statusAr: string;
  statusEn: string;
  timeRange: string;
  trackingPeriod: string;
  stagesCount: number;
  descriptionAr: string;
  descriptionEn: string;
  satelliteSources: string;
  basemapSources: string;
  
  // Asset Image Filenames
  comparisonBeforeLatestFile: string;
  comparisonBeforeLatestPath: string;
  comparisonLabels: {
    beforeDate: string;
    latestDate: string;
    description: string;
  };
  
  constructionProgressStagesFile: string;
  constructionProgressStagesPath: string;
  
  timeline5Stages: HistoricalStageImage[];
  
  timelineHighResOverviewFile: string;
  timelineHighResOverviewPath: string;
  
  latestHighResolution: {
    widerOverviewFile: string;
    widerOverviewPath: string;
    widerOverviewLabelAr: string;
    closerDetailFile: string;
    closerDetailPath: string;
    closerDetailLabelAr: string;
    basemapProvider: string;
  };
  
  workflowStages: WorkflowStageItem[];
  checklist: ApprovalChecklistItem[];
  sources: ProjectSourceItem[];
}

export const WORKFLOW_PHASES_META = [
  { id: 1, nameAr: 'الإعداد والاستثمار', nameEn: 'Preparation & Investment', stagesCount: 2 },
  { id: 2, nameAr: 'الأرض والتخطيط', nameEn: 'Land & Planning', stagesCount: 4 },
  { id: 3, nameAr: 'الموافقات والتراخيص', nameEn: 'Approvals & Licensing', stagesCount: 4 },
  { id: 4, nameAr: 'التعاقد وتجهيز الموقع', nameEn: 'Contracting & Site Mobilization', stagesCount: 2 },
  { id: 5, nameAr: 'التنفيذ والإنشاء', nameEn: 'Execution & Construction', stagesCount: 1 },
  { id: 6, nameAr: 'الفحص والتسليم', nameEn: 'Inspection & Handover', stagesCount: 2 },
  { id: 7, nameAr: 'التشغيل والمتابعة', nameEn: 'Operation & Asset Monitoring', stagesCount: 1 },
];

export const MANDATORY_DISCLOSURE = 
  'تعرض هذه النماذج قدرة المنصة على متابعة التغير المكاني وتطور الأصول باستخدام البيانات الجغرافية والصور الفضائية. إثبات الملكية والموافقات ونسب الإنجاز التعاقدية يعتمد على المستندات الرسمية المرتبطة بسجل المشروع.';

export const SATELLITE_ATTRIBUTION = 'Contains modified Copernicus Sentinel data.';
export const BASEMAP_ATTRIBUTION = 'Esri World Imagery Basemap (Maxar, Earthstar Geographics, USDA, USGS, AeroGRID, IGN, and the GIS User Community).';

export const CASE_STUDY_CATEGORIES = [
  { key: 'all', labelAr: 'الكل', labelEn: 'All' },
  { key: 'urban_business', labelAr: 'أعمال وتطوير حضري', labelEn: 'Business & Urban Development' },
  { key: 'transport_infra', labelAr: 'نقل وبنية أساسية', labelEn: 'Transport & Infrastructure' },
  { key: 'tourism_entertainment', labelAr: 'سياحة وترفيه', labelEn: 'Tourism & Entertainment' },
  { key: 'airports', labelAr: 'مطارات', labelEn: 'Airports' },
  { key: 'industrial_cities', labelAr: 'مدن صناعية', labelEn: 'Industrial Cities' },
] as const;

// Base 16-Stage Lifecycle Template (Standardized across the case study package)
const createStandard16Stages = (
  projNameAr: string,
  overrides: Partial<Record<number, Partial<WorkflowStageItem>>> = {}
): WorkflowStageItem[] => {
  const base: WorkflowStageItem[] = [
    {
      stageNumber: 1,
      stageNameAr: 'دراسة الفرصة الاستثمارية والجدوى المبدئية',
      stageNameEn: 'Investment Opportunity & Initial Feasibility',
      phaseId: 1,
      phaseNameAr: 'الإعداد والاستثمار',
      phaseNameEn: 'Preparation & Investment',
      responsibleParty: 'صندوق الاستثمارات العامة / جهة التطوير الاستراتيجي',
      requiredEvidence: 'ملف تقييم الفرصة، دراسة المؤشرات المالية، مذكرة الاستثمار المبدئية',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'مجلس إدارة المشروع / الصندوق الاستثماري',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'لجنة الاستثمار والمراجعة الاقتصادية',
      notes: 'تم اعتماد دراسة الجدوى المبدئية لجدوى استغلال الأصل الاستراتيجي.',
      satelliteRelationship: 'تحديد النطاق الجغرافي العام للموقع ومراجعة التضاريس الإقليمية وصور الأقمار الصناعية الأرشيفية.'
    },
    {
      stageNumber: 2,
      stageNameAr: 'المراجعة القانونية وصكوك الملكية وتدقيق الحدود',
      stageNameEn: 'Legal & Ownership Due Diligence',
      phaseId: 1,
      phaseNameAr: 'الإعداد والاستثمار',
      phaseNameEn: 'Preparation & Investment',
      responsibleParty: 'الإدارة القانونية وفريق المساحة العقارية',
      requiredEvidence: 'الصكوك الإلكترونية الصادرة عن البورصة العقارية والسجل العقاري',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'وزارة العدل / الهيئة العامة للعقار (السجل العقاري)',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'المستشار القانوني المعتمد',
      notes: 'تثبيت سندات الملكية وخلو العقار من أي نزاعات أو قيود تخطيطية.',
      satelliteRelationship: 'مطابقة الحدود الجغرافية الواردة بالصك العقاري مع المعالم الطبوغرافية الفضائية.'
    },
    {
      stageNumber: 3,
      stageNameAr: 'الرفع المساحي والقرارات المساحية وتثبيت الحدود',
      stageNameEn: 'Cadastral Survey & Boundary Delimitation',
      phaseId: 2,
      phaseNameAr: 'الأرض والتخطيط',
      phaseNameEn: 'Land & Planning',
      responsibleParty: 'مكتب الرفع المساحي المعتمد وفريق نظم المعلومات الجغرافية',
      requiredEvidence: 'القرار المساحي المعتمد بصيغة رقمية، كروكي الإحداثيات الجغرافية WGS84',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'أمانة المنطقة / منصة بلدي',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'إدارة المساحة ونظم المعلومات الجغرافية',
      notes: 'تم إسقاط الحدود وتثبيت النقاط المرجعية المساحية والمناسيب الطبوغرافية.',
      satelliteRelationship: 'المطابقة المباشرة بين الرفع المساحي الميداني والحدود المرصودة عبر المستشعرات الفضائية.'
    },
    {
      stageNumber: 4,
      stageNameAr: 'دراسة الجدوى الاقتصادية والأثر البيئي الشاملة',
      stageNameEn: 'Comprehensive Feasibility & Environmental Impact',
      phaseId: 2,
      phaseNameAr: 'الأرض والتخطيط',
      phaseNameEn: 'Land & Planning',
      responsibleParty: 'استشاري التخطيط الاقتصادي والبيئي',
      requiredEvidence: 'تقرير دراسة الجدوى التفصيلية، شهادة دراسة تقييم الأثر البيئي (EIA)',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'المركز الوطني للرقابة على الالتزام البيئي',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'خبراء الاستدامة والتقييم البيئي',
      notes: 'استيفاء كافة متطلبات الحفاظ على البيئة الطبيعية وسلامة الموائل.',
      satelliteRelationship: 'تحليل الغطاء النباتي والمسطحات المائية أو التضاريس الصخرية عبر فهارس NDVI وNDWI الفضائية.'
    },
    {
      stageNumber: 5,
      stageNameAr: 'المخطط العام وتحديد استخدامات الأراضي والتصنيف العمراني',
      stageNameEn: 'Master Plan & Land-Use Zoning',
      phaseId: 2,
      phaseNameAr: 'الأرض والتخطيط',
      phaseNameEn: 'Land & Planning',
      responsibleParty: 'المصمم العمراني والاستشاري الدولي للتخطيط الحضري',
      requiredEvidence: 'المخطط العام المعتمد، خرائط تقسيم الاستخدامات (سكنية، تجارية، لوجستية، ترفيهية)',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'الهيئة الملكية / وزارة البلديات والإسكان',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'لجنة التخطيط والتطوير العمراني',
      notes: 'اعتماد توزيع الكتل والمحاور الحركية والساحات المفتوحة وشبكات المرافق العامة.',
      satelliteRelationship: 'إسقاط طبقات المخطط العام (CAD Overlays) مباشرة فوق أحدث الصور الفضائية للتحقق من التوافق.'
    },
    {
      stageNumber: 6,
      stageNameAr: 'تقسيم الأراضي أو دمج القطع واستخراج صكوك التجزئة',
      stageNameEn: 'Plot Subdivision or Merging',
      phaseId: 2,
      phaseNameAr: 'الأرض والتخطيط',
      phaseNameEn: 'Land & Planning',
      responsibleParty: 'المطور الرئيسي بالتعاون مع كتابة العدل والبلدية',
      requiredEvidence: 'محاضر التجزئة المعتمدة، صكوك الملكية المنفصلة للمراحل أو البلوكات',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'السجل العقاري / وزارة البلديات والإسكان',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'أمانة المنطقة وإدارة السجل العقاري',
      notes: 'توثيق البلوكات والمجمعات الإنشائية وخطوط التنظيم المعتمدة.',
      satelliteRelationship: 'رصد تماشي التقسيم الفعلي على الأرض مع شبكة الطرق والممرات المحيطة المرئية من الفضاء.'
    },
    {
      stageNumber: 7,
      stageNameAr: 'الموافقات الحكومية والدراسات البيئية والمرورية المعتمدة',
      stageNameEn: 'Government Approvals, Environmental & Traffic Studies',
      phaseId: 3,
      phaseNameAr: 'الموافقات والتراخيص',
      phaseNameEn: 'Approvals & Licensing',
      responsibleParty: 'استشاري هندسة المرور والبيئة المعتمد',
      requiredEvidence: 'تقرير دراسة التأثير المروري (TIA) معتمد، موافقة الهيئة العليا للأمن الصناعي إن لزم',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'الهيئة الملكية / الأمانة / إدارة المرور والدفاع المدني',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'لجان التدقيق والسلامة الحضرية',
      notes: 'تحديد المداخل والمخارج وسعة شبكة الطرق المجاورة لملاءمة الكثافة التشغيلية.',
      satelliteRelationship: 'متابعة تدفقات الطرق السريعة والشريانية المحيطة بالمشروع ورصد التغير في الحركة المرورية.'
    },
    {
      stageNumber: 8,
      stageNameAr: 'اعتمادات شبكات المرافق (كهرباء، مياه، صرف، اتصالات)',
      stageNameEn: 'Utility Network Approvals (Power, Water, Telecom)',
      phaseId: 3,
      phaseNameAr: 'الموافقات والتراخيص',
      phaseNameEn: 'Approvals & Licensing',
      responsibleParty: 'استشاري البنية التحتية والشبكات العامة',
      requiredEvidence: 'خطابات ربط الشبكة الكهربائية، شهادات ربط المياه والصرف، اعتماد مسارات كابلات الألياف',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'الشركة السعودية للكهرباء / شركة المياه الوطنية / هيئة الاتصالات',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'مهندسو التنسيق والخدمات المركزية',
      notes: 'ضمان توافق سعات المحطات ومحطات المعالجة مع متطلبات مراحل المشروع.',
      satelliteRelationship: 'رصد مسارات خطوط النقل الهوائية ومحطات التحويل الأرضية وأحواض التجميع في الصور الفضائية.'
    },
    {
      stageNumber: 9,
      stageNameAr: 'التصميم التفصيلي والمخططات الهندسية المعتمدة لكود البناء السعودي',
      stageNameEn: 'Detailed Design & SBC Architectural Plans',
      phaseId: 3,
      phaseNameAr: 'الموافقات والتراخيص',
      phaseNameEn: 'Approvals & Licensing',
      responsibleParty: 'المكتب الهندسي الاستشاري المصمم والمشرف',
      requiredEvidence: 'مجلد المخططات المعمارية والإنشائية والكهروميكانيكية، وثيقة مطابقة كود البناء السعودي (SBC)',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'اللجنة الوطنية لكود البناء السعودي / الأمانة المختصة',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'فريق الفحص الفني المعتمد',
      notes: 'استيفاء اشتراطات السلامة والوقاية من الحريق (NFPA) ومطابقة الحسابات الإنشائية.',
      satelliteRelationship: 'تطابق أبعاد ومساحات الكتل الإنشائية المصممة مع البصمة الفضائية الفعلية.'
    },
    {
      stageNumber: 10,
      stageNameAr: 'رخصة البناء وتراخيص البيع على الخارطة (وافي) إن وُجدت',
      stageNameEn: 'Building Permit & Wafi Off-Plan Licensing',
      phaseId: 3,
      phaseNameAr: 'الموافقات والتراخيص',
      phaseNameEn: 'Approvals & Licensing',
      responsibleParty: 'المطور العقاري والمكتب الهندسي المؤهل',
      requiredEvidence: 'رخصة بناء إنشائية نظامية صادرة إلكترونياً، رخصة وافي لتسويق أو بيع الوحدات على الخارطة',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'أمانة المنطقة / لجنة البيع والتأجير على الخارطة (وافي)',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'إدارة الرخص ورقابة البناء',
      notes: 'إصدار الترخيص النظامي الذي يجيز مباشرة أعمال الحفر والإنشاء في الموقع.',
      satelliteRelationship: 'التحقق من عدم بدء الإنشاءات قبل تاريخ إصدار الرخصة الرسمية لمنع المخالفات.'
    },
    {
      stageNumber: 11,
      stageNameAr: 'تأهيل المطور والمقاولين وإعداد عقود التنفيذ الفيديك',
      stageNameEn: 'Developer Qualification & FIDIC Contracting',
      phaseId: 4,
      phaseNameAr: 'التعاقد وتجهيز الموقع',
      phaseNameEn: 'Contracting & Site Mobilization',
      responsibleParty: 'إدارة المشتريات والعقود / المقاول العام الرئيسي',
      requiredEvidence: 'عقد مقاولة معتمد (FIDIC)، خطابات الضمان البنكي، شهادات تصنيف المقاولين',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'وزارة البلديات والإسكان (وكالة تصنيف المقاولين)',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'مدير العقود والاستشاري القانوني',
      notes: 'ترسية حزم الأعمال الكبرى على تحالفات المقاولات المتخصصة.',
      satelliteRelationship: 'توثيق توقيت دخول المعدات الثقيلة للموقع وتطابقه مع الجداول التعاقدية.'
    },
    {
      stageNumber: 12,
      stageNameAr: 'تسليم الموقع والتجهيزات وأعمال الحفر والتمهيد والتسوية',
      stageNameEn: 'Site Handover, Mobilization & Earthworks',
      phaseId: 4,
      phaseNameAr: 'التعاقد وتجهيز الموقع',
      phaseNameEn: 'Contracting & Site Mobilization',
      responsibleParty: 'مقاول الحفر والأعمال الترابية والاستشاري المشرف',
      requiredEvidence: 'محضر استلام الموقع خالياً من العوائق، تقارير اختبارات دمك التربة، تصاريح الحفر ونقل الردم',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'completed',
      issuingAuthority: 'الجهة المالكة للمشروع واستشاري إدارة البرنامج (PMO)',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'مهندس الموقع واستشاري الجيوتقنية',
      notes: 'إنجاز أعمال القطع والردم الكبرى وتسوير محيط العمل وتجهيز مكاتب الموقع المؤقتة.',
      satelliteRelationship: 'وضوح التباين الطيفي واللوني لأعمال الحفر والتمهيد الترابي من خلال صور الأقمار الصناعية (Sentinel-2).'
    },
    {
      stageNumber: 13,
      stageNameAr: 'أعمال البنية التحتية والهيكل الإنشائي والتشطيبات ومتابعة التقدم',
      stageNameEn: 'Infrastructure, Superstructure & Progress Tracking',
      phaseId: 5,
      phaseNameAr: 'التنفيذ والإنشاء',
      phaseNameEn: 'Execution & Construction',
      responsibleParty: 'المقاول الرئيسي ومقاولو الباطن والاستشاري الهندسي المشرف',
      requiredEvidence: 'تقارير الإنجاز الشهرية، فواتير المستخلصات، جداول كميات الأعمال المنفذة، سجلات صب الخرسانة',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'in_progress',
      issuingAuthority: 'إدارة المشروع والمكتب الهندسي المشرف',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'فريق التدقيق الميداني والرقابة الفنية',
      notes: 'تنفيذ أعمال الهياكل الخرسانية والفولاذية، شبكات المرافق، وتكسية الواجهات الخارجية.',
      satelliteRelationship: 'المحور الرئيسي للرصد الفضائي: قياس التغير الزمني، وتوسع رقعة البناء، وارتفاع المباني، وانتشار الهياكل.'
    },
    {
      stageNumber: 14,
      stageNameAr: 'الفحوصات الفنية واختبارات الجودة ومطابقة الكود وأنظمة السلامة',
      stageNameEn: 'Technical Inspections & Code Quality Verification',
      phaseId: 6,
      phaseNameAr: 'الفحص والتسليم',
      phaseNameEn: 'Inspection & Handover',
      responsibleParty: 'هيئة الفحص الفني المعتمدة، إدارة الدفاع المدني، مختبرات الجودة',
      requiredEvidence: 'شهادات اختبار الضغط، تقارير فحص أنظمة إطفاء وإنذار الحريق، محاضر اختبارات المصاعد والتكييف',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'in_progress',
      issuingAuthority: 'المديرية العامة للدفاع المدني / مختبرات الفحص المعتمدة',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'المهندس المقيم وضابط السلامة المعتمد',
      notes: 'التأكد التام من استيفاء معايير الجودة والسلامة والجاهزية الفنية.',
      satelliteRelationship: 'التحقق من جاهزية المحاور الخارجية ومخارج الطوارئ ومسارات آليات الدفاع المدني عبر الصور الجوية.'
    },
    {
      stageNumber: 15,
      stageNameAr: 'الاستلام الابتدائي وإصدار شهادة الإشغال أو إتمام البناء',
      stageNameEn: 'Substantial Completion & Occupancy Certificate',
      phaseId: 6,
      phaseNameAr: 'الفحص والتسليم',
      phaseNameEn: 'Inspection & Handover',
      responsibleParty: 'لجنة الاستلام المكونة من المالك والاستشاري والمقاول والأمانة',
      requiredEvidence: 'شهادة إتمام البناء الصادرة عبر منصة بلدي، محضر الاستلام الابتدائي وقائمة الملاحظات (Snag List)',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'in_progress',
      issuingAuthority: 'أمانة المنطقة / منصة بلدي',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'لجنة الفحص البلدي والاستشاري المشرف',
      notes: 'إجازة المباني أو المرافق لبدء مرحلة الإشغال التشغيلي أو التجريبي.',
      satelliteRelationship: 'اكتمال البصمة الإنشائية وتنسيق الموقع العام والمسطحات الخارجية المرصودة بالأقمار الصناعية.'
    },
    {
      stageNumber: 16,
      stageNameAr: 'التشغيل النهائي والمراقبة المكانية المستمرة بالأقمار الصناعية للأصل',
      stageNameEn: 'Final Operation & Continuous Satellite Asset Monitoring',
      phaseId: 7,
      phaseNameAr: 'التشغيل والمتابعة',
      phaseNameEn: 'Operation & Asset Monitoring',
      responsibleParty: 'إدارة المرافق والأصول (Facility Management) ومنصة عين سيجام',
      requiredEvidence: 'سجلات التشغيل والصيانة، المخططات بعد التنفيذ (As-Built)، تقارير الرصد الفضائي الدورية',
      plannedDate: 'غير متوفر ضمن البيانات المرفوعة',
      actualDate: 'غير متوفر ضمن البيانات المرفوعة',
      status: 'in_progress',
      issuingAuthority: 'إدارة تشغيل المشروع / المشغل التجاري',
      documentNumber: 'غير متوفر ضمن البيانات المرفوعة',
      reviewer: 'مدير العمليات ومحللو البيانات المكانية الفضائية',
      notes: 'متابعة دورية لحالة المبنى والمرافق واكتشاف أي هبوط أرضي أو توسعات محيطية.',
      satelliteRelationship: 'المراقبة الفضائية الدورية المستمرة (InSAR والمسح الطيفي) لسلامة الأصل واستدامته على المدى الطويل.'
    }
  ];

  // Apply custom overrides per project if specified
  return base.map(stage => {
    if (overrides[stage.stageNumber]) {
      return { ...stage, ...overrides[stage.stageNumber] };
    }
    return stage;
  });
};

// Standardized 19-Item Approval and Construction Checklist
const createStandard19Checklist = (
  completedIds: number[],
  inProgressIds: number[],
  underReviewIds: number[],
  notRequiredIds: number[] = []
): ApprovalChecklistItem[] => {
  const titles = [
    { num: 1, cat: 'legal', ar: 'صكوك الملكية والوثائق العقارية المحدثة', en: 'Updated Ownership Title Deeds' },
    { num: 2, cat: 'planning', ar: 'القرار المساحي المعتمد', en: 'Approved Cadastral Survey Decision' },
    { num: 3, cat: 'planning', ar: 'إحداثيات الحدود ونقاط التثبيت الجيوديسية', en: 'Boundary Coordinates & Geodetic Benchmarks' },
    { num: 4, cat: 'legal', ar: 'دراسة الجدوى الاقتصادية والمالية الشاملة', en: 'Comprehensive Economic & Financial Feasibility Study' },
    { num: 5, cat: 'planning', ar: 'المخطط العام واستخدامات الأراضي المعتمد', en: 'Approved Master Plan & Land-Use Regulations' },
    { num: 6, cat: 'planning', ar: 'موافقات تقسيم أو دمج الأراضي والبلوكات', en: 'Land Subdivision or Merging Approvals' },
    { num: 7, cat: 'technical', ar: 'الدراسة البيئية المعتمدة والأثر البيئي (EIA)', en: 'Approved Environmental Impact Assessment (EIA)' },
    { num: 8, cat: 'technical', ar: 'دراسة التأثير المروري المعتمدة (TIA)', en: 'Approved Traffic Impact Assessment (TIA)' },
    { num: 9, cat: 'technical', ar: 'اعتمادات شبكات المرافق (كهرباء، مياه، صرف، اتصالات)', en: 'Utility Network Approvals (Power, Water, Telecom)' },
    { num: 10, cat: 'technical', ar: 'المخططات الهندسية المعمارية والإنشائية المعتمدة', en: 'Approved Engineering Plans (Arch, Structural, MEP)' },
    { num: 11, cat: 'permits', ar: 'رخصة البناء الإنشائية المعتمدة من الأمانة', en: 'Approved Building Permit from Municipality' },
    { num: 12, cat: 'permits', ar: 'رخصة وافي (البيع على الخارطة) إن وُجدت', en: 'Wafi Off-Plan Sales License' },
    { num: 13, cat: 'execution', ar: 'عقد المقاول المعتمد وجدول الأعمال التعاقدي', en: 'Contractor Contract & Construction Schedule' },
    { num: 14, cat: 'execution', ar: 'محضر استلام الموقع وبدء الأعمال والتجهيزات', en: 'Site Handover & Mobilization Report' },
    { num: 15, cat: 'execution', ar: 'تقارير الإنجاز الدورية الميدانية والفضائية', en: 'Periodic Progress Reports & Space Verifications' },
    { num: 16, cat: 'handover', ar: 'شهادات الفحص واختبارات الجودة والسلامة', en: 'Quality Testing & Civil Defense Inspection Certificates' },
    { num: 17, cat: 'handover', ar: 'شهادة إتمام البناء أو رخصة الإشغال الرسمية', en: 'Certificate of Building Completion / Occupancy' },
    { num: 18, cat: 'handover', ar: 'المخططات الهندسية بعد التنفيذ (As-Built)', en: 'As-Built Engineering Drawings' },
    { num: 19, cat: 'handover', ar: 'محضر الاستلام النهائي ووثائق التشغيل والصيانة', en: 'Final Handover Report & Operation Manuals' },
  ] as const;

  return titles.map((item) => {
    let status: ChecklistItemStatus = 'not_available';
    if (completedIds.includes(item.num)) status = 'completed';
    else if (inProgressIds.includes(item.num)) status = 'in_progress';
    else if (underReviewIds.includes(item.num)) status = 'under_review';
    else if (notRequiredIds.includes(item.num)) status = 'not_required';

    return {
      id: `chk-${item.num}`,
      number: item.num,
      titleAr: item.ar,
      titleEn: item.en,
      category: item.cat as any,
      status,
      notes: status === 'not_available' ? 'غير متوفر ضمن البيانات المرفوعة' : undefined,
    };
  });
};

/**
 * The Six Master Case Study Projects
 */
export const CASE_STUDY_PROJECTS: CaseStudyProject[] = [
  // 1. King Abdullah Financial District — KAFD
  {
    id: 'kafd',
    nameAr: 'مركز الملك عبدالله المالي — KAFD',
    nameEn: 'King Abdullah Financial District — KAFD',
    categoryAr: 'أعمال وتطوير حضري',
    categoryEn: 'Business & Urban Development',
    categoryKey: 'urban_business',
    locationAr: 'شمال مدينة الرياض، المملكة العربية السعودية',
    locationEn: 'North Riyadh, Kingdom of Saudi Arabia',
    coordinates: '24.7675° N, 46.6433° E',
    statusAr: 'تشغيل جزئي مع استمرار التوسعات والأبراج المتقدمة',
    statusEn: 'Partially Operational with Advanced Vertical Expansion',
    timeRange: '2016 – 2024',
    trackingPeriod: '2016 – 2024',
    stagesCount: 5,
    descriptionAr: 
      'دراسة حالة متقدمة لمتابعة التحول الحضري لأضخم مركز مالي متعدد الاستخدامات في الشرق الأوسط (KAFD). يوثق التحليل الفضائي التطور العمراني من مرحلة القواعد والأعمال الخرسانية للأبراج إلى اكتمال الواجهات المعمارية الزجاجية وتشغيل البوليفارد والمقرات المالية العالمية وربطه بقطار الرياض.',
    descriptionEn: 
      'Advanced spatial case study tracking the urban transformation of King Abdullah Financial District from deep foundations to exterior glazing, plaza activation, and commercial tenancy.',
    satelliteSources: 'European Space Agency (Copernicus Sentinel-2), Landsat-8/9',
    basemapSources: 'Esri World Imagery Basemap (Maxar, GeoEye, Earthstar Geographics)',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/01-kafd-riyadh/comparison_clear_before_latest.jpg',
    comparisonLabels: {
      beforeDate: '2016-04-12',
      latestDate: '2024-05-18',
      description: 'مقارنة دقيقة توضح التحول الجذري في الكثافة العمرانية وظهور شبكة الأبراج والواجهات الزجاجية المكتملة.'
    },
    
    constructionProgressStagesFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressStagesPath: '/assets/case-studies/01-kafd-riyadh/construction_progress_3_clear_stages.jpg',
    
    timeline5Stages: [
      {
        stageNumber: 1,
        acquisitionDate: '2016-03-20',
        phaseNameAr: 'مرحلة القواعد والهياكل الخرسانية الأولية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'رصد بدايات تشكل البصمات الإنشائية للأبراج وتجهيز القواعد المركزية وشبكات الخدمات التحتية.',
        imageFilename: 'stage_1.png',
        imagePath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages/stage_1.png',
        fallbackAliasPath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 2,
        acquisitionDate: '2018-05-14',
        phaseNameAr: 'مرحلة الارتفاع الرأسي السريع وتثبيت الجسور',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.1%',
        descriptionAr: 'تصاعد الهياكل الرأسية لمعظم الأبراج وبدء تشييد الجسور الرابطة (Skywalks) بين مجمعات الأعمال.',
        imageFilename: 'stage_2.png',
        imagePath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages/stage_2.png',
        fallbackAliasPath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 3,
        acquisitionDate: '2020-07-22',
        phaseNameAr: 'مرحلة تركيب الواجهات والتشطيبات الخارجية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تغطية الهياكل الفولاذية بالواجهات البلورية عالية الكفاءة وتقدم ملحوظ في الساحات المركزية المفتوحة.',
        imageFilename: 'stage_3.png',
        imagePath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages/stage_3.png',
        fallbackAliasPath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 4,
        acquisitionDate: '2022-09-10',
        phaseNameAr: 'مرحلة تنسيق الموقع والربط مع شبكة قطار الرياض',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'اكتمال محطة قطار الرياض المركزية لمركز KAFD (تصميم زها حديد) وتجهيز ممرات المشاة المظللة.',
        imageFilename: 'stage_4.png',
        imagePath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages/stage_4.png',
        fallbackAliasPath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 5,
        acquisitionDate: '2024-05-18',
        phaseNameAr: 'التشغيل المتكامل والتوسع في الأبراج السكنية والمكتبية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تشغيل تجاري وسكني واسع النطاق، انتقال المقرات الإقليمية للشركات العالمية، مع استمرار التطوير الرأسي.',
        imageFilename: 'stage_5.png',
        imagePath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages/stage_5.png',
        fallbackAliasPath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages_high_resolution.jpg'
      }
    ],
    
    timelineHighResOverviewFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResOverviewPath: '/assets/case-studies/01-kafd-riyadh/timeline_5_stages_high_resolution.jpg',
    
    latestHighResolution: {
      widerOverviewFile: '01_current_overview_esri_world_imagery.jpg',
      widerOverviewPath: '/assets/case-studies/01-kafd-riyadh/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
      widerOverviewLabelAr: 'نظرة عامة على محيط مركز KAFD وشبكة الطرق الشريانية (طريق الملك فهد والدائري الشمالي)',
      closerDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
      closerDetailPath: '/assets/case-studies/01-kafd-riyadh/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
      closerDetailLabelAr: 'تفاصيل مقربة للساحات المركزية والأبراج ومحطة المترو الأيقونية',
      basemapProvider: 'Esri World Imagery Basemap'
    },
    
    workflowStages: createStandard16Stages('مركز الملك عبدالله المالي', {
      13: { status: 'completed', notes: 'اكتمال الغالبية العظمى من الأبراج الهيكلية مع استمرار توسعات المرحلة الثانية.' },
      14: { status: 'completed', notes: 'اعتماد أنظمة السلامة وإدارة الحريق الذكية للأبراج المشغلة.' },
      15: { status: 'completed', notes: 'إصدار شهادات إشغال لمعظم المجمعات المكتبية والبوليفارد التجاري.' },
      16: { status: 'in_progress', notes: 'مراقبة مستمرة لحركة المشاة واستهلاك الطاقة والأثر البيئي الميداني.' }
    }),
    
    checklist: createStandard19Checklist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17], [18, 19], [], [12]),
    
    sources: [
      {
        titleAr: 'بيانات رصد الأرض — وكالة الفضاء الأوروبية',
        titleEn: 'European Space Agency Copernicus Data',
        organization: 'ESA / Copernicus Open Access Hub',
        attributionText: 'Contains modified Copernicus Sentinel data [2016-2024].'
      },
      {
        titleAr: 'خرائط الأساس عالية الدقة',
        titleEn: 'High Resolution Basemap Imagery',
        organization: 'Esri World Imagery Basemap',
        attributionText: 'Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community.'
      },
      {
        titleAr: 'تقارير الإنجاز المؤسسية لإدارة KAFD',
        titleEn: 'KAFD Corporate Real Estate Milestones',
        organization: 'شركة إدارة وتطوير مركز الملك عبدالله المالي'
      }
    ]
  },

  // 2. Riyadh Metro — West Depot
  {
    id: 'riyadh-metro-west',
    nameAr: 'قطار الرياض — المستودع الغربي',
    nameEn: 'Riyadh Metro — West Depot',
    categoryAr: 'نقل وبنية أساسية',
    categoryEn: 'Transport & Infrastructure',
    categoryKey: 'transport_infra',
    locationAr: 'غرب الرياض (طريق جدة السريع / حي العريجاء)',
    locationEn: 'West Riyadh (Jeddah Highway / Al-Urayja), KSA',
    coordinates: '24.6186° N, 46.5982° E',
    statusAr: 'مكتمل ومُشغل بالكامل ضمن شبكة قطار الرياض',
    statusEn: 'Fully Completed & Operational',
    timeRange: '2015 – 2024',
    trackingPeriod: '2015 – 2024',
    stagesCount: 5,
    descriptionAr: 
      'رصد فضائي وزمني لتطور المستودع الغربي لشبكة قطار الرياض (مشروع الملك عبدالعزيز للنقل العام). يوثق التقرير أعمال التسوية الكبرى للأرض، وتشييد حظائر الصيانة المركزية للقطارات، وشبكة السكك والتحويلات، ومباني التحكم والتشغيل الآلي ومواقف الحافلات المغذية.',
    descriptionEn: 
      'Multi-year satellite tracking of Riyadh Metro West Depot, documenting massive land levelling, rolling stock maintenance depots, track switches, and operational control centers.',
    satelliteSources: 'European Space Agency (Copernicus Sentinel-2), Landsat-8',
    basemapSources: 'Esri World Imagery Basemap (Maxar, GeoEye)',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/02-riyadh-metro-west-depot/comparison_clear_before_latest.jpg',
    comparisonLabels: {
      beforeDate: '2015-06-10',
      latestDate: '2024-04-20',
      description: 'مقارنة بصرية بين الأرض الفضاء قبل بدء الأعمال والمجمع المتكامل المشغل لحظائر صيانة القطارات والسكك الحديدية.'
    },
    
    constructionProgressStagesFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressStagesPath: '/assets/case-studies/02-riyadh-metro-west-depot/construction_progress_3_clear_stages.jpg',
    
    timeline5Stages: [
      {
        stageNumber: 1,
        acquisitionDate: '2015-05-12',
        phaseNameAr: 'أعمال القطع والتسوية الترابية وتحديد المحيط',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تمهيد الموقع الواسع بمحاذاة طريق جدة السريع وحفر البنية التحتية لمسارات السكك الحديدية.',
        imageFilename: 'stage_1.png',
        imagePath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages/stage_1.png',
        fallbackAliasPath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 2,
        acquisitionDate: '2017-08-19',
        phaseNameAr: 'تشييد الهياكل الفولاذية لحظائر الصيانة الكبرى',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'ظهور الهياكل الفولاذية العملاقة لمستودعات فحص وصيانة عربات المترو ومباني الإدارة الفنية.',
        imageFilename: 'stage_2.png',
        imagePath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages/stage_2.png',
        fallbackAliasPath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 3,
        acquisitionDate: '2019-11-04',
        phaseNameAr: 'مد شبكة السكك الحديدية والخطوط التخزينية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'اكتمال مد خطوط التحويلات والسكك المتفرعة ومحطات تزويد الطاقة الكهربائية للقطارات.',
        imageFilename: 'stage_3.png',
        imagePath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages/stage_3.png',
        fallbackAliasPath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 4,
        acquisitionDate: '2021-12-15',
        phaseNameAr: 'التشغيل التجريبي وتواجد أساطيل القطارات',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'رصد وقوف عربات المترو في المسارات المكشوفة والمغطاة واختبارات القيادة الذاتية بدون سائق.',
        imageFilename: 'stage_4.png',
        imagePath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages/stage_4.png',
        fallbackAliasPath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 5,
        acquisitionDate: '2024-04-20',
        phaseNameAr: 'الجاهزية والتشغيل الكامل لشبكة النقل',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'اكتمال كافة المرافق الخدمية والمحطات الفرعية وربط المستودع بالمسارات التشغيلية للخطين البرتقالي والأرجواني.',
        imageFilename: 'stage_5.png',
        imagePath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages/stage_5.png',
        fallbackAliasPath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages_high_resolution.jpg'
      }
    ],
    
    timelineHighResOverviewFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResOverviewPath: '/assets/case-studies/02-riyadh-metro-west-depot/timeline_5_stages_high_resolution.jpg',
    
    latestHighResolution: {
      widerOverviewFile: '01_current_overview_esri_world_imagery.jpg',
      widerOverviewPath: '/assets/case-studies/02-riyadh-metro-west-depot/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
      widerOverviewLabelAr: 'نظرة فضائية عامة للمستودع الغربي وشبكة التقاطعات السريعة المحيطة',
      closerDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
      closerDetailPath: '/assets/case-studies/02-riyadh-metro-west-depot/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
      closerDetailLabelAr: 'تفاصيل مقربة لمسارات السكك وحظائر فحص القطارات وغسيل العربات الآلي',
      basemapProvider: 'Esri World Imagery Basemap'
    },
    
    workflowStages: createStandard16Stages('قطار الرياض — المستودع الغربي', {
      13: { status: 'completed', notes: 'اكتمال كافة حزم الإنشاء والسكك والمباني الفنية.' },
      14: { status: 'completed', notes: 'اجتياز اختبارات السلامة والتكامل الكهربائي والتحكم الآلي بنجاح.' },
      15: { status: 'completed', notes: 'استلام نهائي لمنشآت المستودع وحظائر الصيانة.' },
      16: { status: 'completed', notes: 'تشغيل تشغيلي ومراقبة مستمرة لجداول صيانة الأسطول عبر الأقمار الصناعية.' }
    }),
    
    checklist: createStandard19Checklist([1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19], [], [], [12]),
    
    sources: [
      {
        titleAr: 'سنتينل-2 الفضائي — برنامج كوبرنيكوس الأوروبي',
        titleEn: 'Copernicus Sentinel-2 EO Data',
        organization: 'ESA / European Union',
        attributionText: 'Contains modified Copernicus Sentinel data [2015-2024].'
      },
      {
        titleAr: 'الهيئة الملكية لمدينة الرياض — مشروع قطار الرياض',
        titleEn: 'RCRC Riyadh Metro Public Reports',
        organization: 'Royal Commission for Riyadh City (RCRC)'
      }
    ]
  },

  // 3. Six Flags Qiddiya City
  {
    id: 'six-flags-qiddiya',
    nameAr: 'سيكس فلاجز مدينة القدية',
    nameEn: 'Six Flags Qiddiya City',
    categoryAr: 'سياحة وترفيه',
    categoryEn: 'Tourism & Entertainment',
    categoryKey: 'tourism_entertainment',
    locationAr: 'جبال طويق، القدية، جنوب غرب الرياض',
    locationEn: 'Tuwaiq Escarpment, Qiddiya, South-West Riyadh, KSA',
    coordinates: '24.5880° N, 46.3260° E',
    statusAr: 'قيد التنفيذ والتركيبات المتقدمة للألعاب الترفيهية القياسية',
    statusEn: 'Under Construction & Advanced Attractions Installation',
    timeRange: '2019 – 2024',
    trackingPeriod: '2019 – 2024',
    stagesCount: 5,
    descriptionAr: 
      'متابعة فضائية شاملة لأعمال القطع الصخري الهائل في جرف طويق وتسوية التضاريس الجبلية المعقدة لتشييد منتزه سيكس فلاجز القدية. يوثق التحليل بناء القواعد الخرسانية الضخمة لمسارات أفعوانية الصقر (Falcon’s Flight)، والألعاب المائية والمناطق الترفيهية الست المتمايزة.',
    descriptionEn: 
      'Satellite tracking of Six Flags Qiddiya City amidst the rugged Tuwaiq cliffs, covering massive rock excavation, foundation piling, and landmark coaster construction.',
    satelliteSources: 'European Space Agency (Copernicus Sentinel-2), Landsat-8/9',
    basemapSources: 'Esri World Imagery Basemap (Maxar, Earthstar Geographics)',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/03-six-flags-qiddiya/comparison_clear_before_latest.jpg',
    comparisonLabels: {
      beforeDate: '2019-10-15',
      latestDate: '2024-05-30',
      description: 'مقارنة بين الطبيعة الصخرية البكر لهضبة طويق وظهور المعالم الترفيهية والمسارات الفولاذية للقطارات الأفعوانية.'
    },
    
    constructionProgressStagesFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressStagesPath: '/assets/case-studies/03-six-flags-qiddiya/construction_progress_3_clear_stages.jpg',
    
    timeline5Stages: [
      {
        stageNumber: 1,
        acquisitionDate: '2019-11-10',
        phaseNameAr: 'مرحلة شق الطرق الجبلية وتسوية الهضبة الصخرية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تمهيد مداخل موقع القدية وأعمال الحفر والقطع الصخري لتأمين مدرجات المنتزه.',
        imageFilename: 'stage_1.png',
        imagePath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages/stage_1.png',
        fallbackAliasPath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 2,
        acquisitionDate: '2021-03-25',
        phaseNameAr: 'تشييد البنية التحتية العميقة وقواعد الألعاب',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.1%',
        descriptionAr: 'صب القواعد الخرسانية المسلحة الحاملة لمسارات الألعاب فائقة السرعة وشبكات تصريف السيول.',
        imageFilename: 'stage_2.png',
        imagePath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages/stage_2.png',
        fallbackAliasPath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 3,
        acquisitionDate: '2022-08-18',
        phaseNameAr: 'بروز الهياكل الفولاذية وتوزيع المناطق الست',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'وضوح معالم المناطق الترفيهية الست (مدينة التشويق، الينابيع الغامضة، التعبير الإبداعي، وغيرها).',
        imageFilename: 'stage_3.png',
        imagePath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages/stage_3.png',
        fallbackAliasPath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 4,
        acquisitionDate: '2023-10-05',
        phaseNameAr: 'تركيب مسارات أفعوانية الصقر والألعاب الكبرى',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'رصد تمدد القضبان الفولاذية المرتفعة على حافة جرف طويق بارتفاعات قياسية عالمية.',
        imageFilename: 'stage_4.png',
        imagePath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages/stage_4.png',
        fallbackAliasPath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 5,
        acquisitionDate: '2024-05-30',
        phaseNameAr: 'التشطيبات المعمارية وتنسيق الحدائق والمرافق الفندقية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'اكتمال الواجهات الثيمية وساحات الزوار وبوابات الدخول الرئيسية واختبارات حركة العربات.',
        imageFilename: 'stage_5.png',
        imagePath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages/stage_5.png',
        fallbackAliasPath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages_high_resolution.jpg'
      }
    ],
    
    timelineHighResOverviewFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResOverviewPath: '/assets/case-studies/03-six-flags-qiddiya/timeline_5_stages_high_resolution.jpg',
    
    latestHighResolution: {
      widerOverviewFile: '01_current_overview_esri_world_imagery.jpg',
      widerOverviewPath: '/assets/case-studies/03-six-flags-qiddiya/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
      widerOverviewLabelAr: 'نظرة عامة على منتزه سيكس فلاجز وموقعه عند سفح جبال طويق المهيبة',
      closerDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
      closerDetailPath: '/assets/case-studies/03-six-flags-qiddiya/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
      closerDetailLabelAr: 'تفاصيل مقربة للأبراج والمنحدرات الفولاذية لمسارات قطار الصقر ومناطق الألعاب المائية',
      basemapProvider: 'Esri World Imagery Basemap'
    },
    
    workflowStages: createStandard16Stages('سيكس فلاجز مدينة القدية', {
      13: { status: 'in_progress', notes: 'أعمال التركيبات الفولاذية للألعاب والواجهات بلغت مراحل متقدمة تتجاوز 85%.' },
      14: { status: 'in_progress', notes: 'اختبارات السلامة الصارمة للألعاب ومطابقة معايير جمعية TUV العالمية.' },
      15: { status: 'pending', notes: 'الاستلام الابتدائي المجدول قبل الافتتاح الرسمي للجمهور.' }
    }),
    
    checklist: createStandard19Checklist([1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14], [15, 16], [17], [12]),
    
    sources: [
      {
        titleAr: 'سنتينل-2 — برنامج كوبرنيكوس الأوروبي',
        titleEn: 'Copernicus Sentinel-2 Earth Observation',
        organization: 'ESA',
        attributionText: 'Contains modified Copernicus Sentinel data [2019-2024].'
      },
      {
        titleAr: 'شركة القدية للاستثمار — النشرات الإنشائية',
        titleEn: 'Qiddiya Investment Company Official Releases',
        organization: 'Qiddiya Investment Company (QIC)'
      }
    ]
  },

  // 4. Red Sea International Airport
  {
    id: 'red-sea-airport',
    nameAr: 'مطار البحر الأحمر الدولي',
    nameEn: 'Red Sea International Airport (RSI)',
    categoryAr: 'مطارات',
    categoryEn: 'Airports',
    categoryKey: 'airports',
    locationAr: 'منطقة تبوك / الساحل الغربي بالقرب من الوجه',
    locationEn: 'Tabuk Region / West Coast, near Al-Wajh, KSA',
    coordinates: '25.5564° N, 37.1264° E',
    statusAr: 'مُشغل للرحلات الداخلية وتوسعة الصالات الدولية',
    statusEn: 'Operational for Domestic Flights, Expanding International Terminal',
    timeRange: '2020 – 2024',
    trackingPeriod: '2020 – 2024',
    stagesCount: 5,
    descriptionAr: 
      'رصد متكامل لمدرج الطائرات الرئيسي بطول 3,700 متر وصالات الركاب الخمس المستوحاة من أوراق الكثبان الرملية (تصميم استوديو فوستر وشركاه). يوثق التحليل الفضائي تشييد مطار مستدام 100% يعمل بالطاقة المتجددة الكاملة لخدمة وجهات البحر الأحمر العالمية.',
    descriptionEn: 
      'Complete satellite monitoring of Red Sea International Airport: the 3,700m Code F runway, dune-inspired terminal pods (Foster + Partners), and fully renewable energy airfield operations.',
    satelliteSources: 'European Space Agency (Copernicus Sentinel-2), Landsat-8/9',
    basemapSources: 'Esri World Imagery Basemap (Maxar, Earthstar Geographics)',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/04-red-sea-airport/comparison_clear_before_latest.jpg',
    comparisonLabels: {
      beforeDate: '2020-04-10',
      latestDate: '2024-05-15',
      description: 'مقارنة بين الساحل الصحراوي المفتوح والمطار الدولي المكتمل بمدرجه المضاء وصالات الركاب المتموجة.'
    },
    
    constructionProgressStagesFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressStagesPath: '/assets/case-studies/04-red-sea-airport/construction_progress_3_clear_stages.jpg',
    
    timeline5Stages: [
      {
        stageNumber: 1,
        acquisitionDate: '2020-05-18',
        phaseNameAr: 'تمهيد مسار المدرج وأعمال الردم الأولية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تخطيط وتثبيت مسار المدرج الموازي للساحل وأعمال التسوية الترابية للأراضي الصحراوية.',
        imageFilename: 'stage_1.png',
        imagePath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages/stage_1.png',
        fallbackAliasPath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 2,
        acquisitionDate: '2021-09-12',
        phaseNameAr: 'سفلتة المدرج الرئيسي وتأسيس صالات الركاب',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'رصف طبقات الأسفلت الثقيل للمدرج بطول 3.7 كم وبدء الهياكل الخرسانية لكبسولات الصالات الخمس.',
        imageFilename: 'stage_2.png',
        imagePath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages/stage_2.png',
        fallbackAliasPath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 3,
        acquisitionDate: '2022-11-20',
        phaseNameAr: 'بروز أسقف الصالات المقوسة ومسارات التاكسي واي',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'ظهور الأسقف المقوسة المستوحاة من كثبان الصحراء واكتمال ممرات التدحرج ومواقف الطائرات (Apron).',
        imageFilename: 'stage_3.png',
        imagePath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages/stage_3.png',
        fallbackAliasPath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 4,
        acquisitionDate: '2023-09-21',
        phaseNameAr: 'هبوط أول رحلة طيران تجارية داخلية (السعودية)',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'التشغيل الرسمي واستقبال الرحلات المجدولة القادمة من الرياض وجدة واكتمال برج المراقبة الجوية.',
        imageFilename: 'stage_4.png',
        imagePath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages/stage_4.png',
        fallbackAliasPath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 5,
        acquisitionDate: '2024-05-15',
        phaseNameAr: 'استقبال الرحلات الدولية وتوسيع صالات كبار الشخصيات',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تدشين أولى الرحلات الدولية (دبي) واكتمال حدائق الصالات الداخلية والخدمات اللوجستية المستدامة.',
        imageFilename: 'stage_5.png',
        imagePath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages/stage_5.png',
        fallbackAliasPath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages_high_resolution.jpg'
      }
    ],
    
    timelineHighResOverviewFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResOverviewPath: '/assets/case-studies/04-red-sea-airport/timeline_5_stages_high_resolution.jpg',
    
    latestHighResolution: {
      widerOverviewFile: '01_current_overview_esri_world_imagery.jpg',
      widerOverviewPath: '/assets/case-studies/04-red-sea-airport/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
      widerOverviewLabelAr: 'نظرة عامة للمدرج والساحات ومحطة الطاقة الشمسية المغذية للمطار بالكامل',
      closerDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
      closerDetailPath: '/assets/case-studies/04-red-sea-airport/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
      closerDetailLabelAr: 'تفاصيل مقربة لصالات الركاب المقوسة وبرج المراقبة والمسطحات الخضراء المظللة',
      basemapProvider: 'Esri World Imagery Basemap'
    },
    
    workflowStages: createStandard16Stages('مطار البحر الأحمر الدولي', {
      13: { status: 'completed', notes: 'اكتمال المدرج الرئيسي والبرج والمرحلة الأولى من صالات الركاب.' },
      14: { status: 'completed', notes: 'اجتياز ترخيص الهيئة العامة للطيران المدني (GACA) والمنظمة الدولية للطيران (ICAO).' },
      15: { status: 'completed', notes: 'استلام ابتدائي وتشغيل فعلي للرحلات المنتظمة.' },
      16: { status: 'in_progress', notes: 'رصد دوري للسطوح وسلامة المدرج وضمان الاستدامة البيئية بنسبة 100%.' }
    }),
    
    checklist: createStandard19Checklist([1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18], [19], [], [12]),
    
    sources: [
      {
        titleAr: 'بيانات كوبرنيكوس سينتينل الأوروبية',
        titleEn: 'Copernicus Sentinel-2 Data',
        organization: 'ESA',
        attributionText: 'Contains modified Copernicus Sentinel data [2020-2024].'
      },
      {
        titleAr: 'شركة البحر الأحمر الدولية — المركز الإعلامي',
        titleEn: 'Red Sea Global (RSG) Official Releases',
        organization: 'Red Sea Global'
      }
    ]
  },

  // 5. Shebara Resort — The Red Sea
  {
    id: 'shebara-resort',
    nameAr: 'منتجع شيبارة — البحر الأحمر',
    nameEn: 'Shebara Resort — The Red Sea',
    categoryAr: 'سياحة وترفيه',
    categoryEn: 'Tourism & Entertainment',
    categoryKey: 'tourism_entertainment',
    locationAr: 'جزيرة شيبارة، أرخبيل البحر الأحمر، منطقة تبوك',
    locationEn: 'Shebara Island, Red Sea Archipelago, Tabuk, KSA',
    coordinates: '25.4410° N, 36.8520° E',
    statusAr: 'قيد التشطيبات النهائية واستقبال الزوار التجريبي',
    statusEn: 'Final Finishing & Trial Guest Operations',
    timeRange: '2021 – 2024',
    trackingPeriod: '2021 – 2024',
    stagesCount: 5,
    descriptionAr: 
      'توثيق دقيق لتثبيت الفلل العائمة المصنوعة من الفولاذ المصقول المقاوم للصدأ والمشابهة لقطرات الماء اللامعة على سطح البحر. يوضح التحليل الفضائي امتداد الجسور البحرية فوق الشعاب المرجانية الحساسة، مع التزام بيئي صارم يحافظ على التنوع الأحيائي وانعدام البصمة الكربونية.',
    descriptionEn: 
      'High-precision environmental and satellite monitoring of Shebara Resort: stainless-steel water droplet villas, overwater piers, and coral reef conservation protocols.',
    satelliteSources: 'European Space Agency (Copernicus Sentinel-2), Landsat-8/9',
    basemapSources: 'Esri World Imagery Basemap (Maxar, GeoEye)',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/05-sheybarah-resort/comparison_clear_before_latest.jpg',
    comparisonLabels: {
      beforeDate: '2021-02-14',
      latestDate: '2024-05-22',
      description: 'مقارنة توضح الجزيرة البكر مقابل السلسلة المتلألئة من الفلل البحرية العائمة والجسور المتعرجة الصديقة للبيئة.'
    },
    
    constructionProgressStagesFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressStagesPath: '/assets/case-studies/05-sheybarah-resort/construction_progress_3_clear_stages.jpg',
    
    timeline5Stages: [
      {
        stageNumber: 1,
        acquisitionDate: '2021-03-10',
        phaseNameAr: 'المسح البيئي وتحديد مسارات الركائز البحرية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'مسح دقيق لبيئة الشعاب المرجانية لتثبيت أعمدة الجسور دون الإضرار بالحياة البحرية الطبيعية.',
        imageFilename: 'stage_1.png',
        imagePath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages/stage_1.png',
        fallbackAliasPath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 2,
        acquisitionDate: '2022-04-18',
        phaseNameAr: 'مد الجسور الخرسانية المعلقة فوق المياه الفيروزية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'اكتمال الجسور الرابطة على شكل قلادة منحنية تمتد من شاطئ الجزيرة نحو المياه العميقة.',
        imageFilename: 'stage_2.png',
        imagePath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages/stage_2.png',
        fallbackAliasPath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 3,
        acquisitionDate: '2023-01-25',
        phaseNameAr: 'وصول وتركيب أولى كبسولات الفلل الفولاذية العاكسة',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'نقل الفلل المصنعة مسبقاً في دولة الإمارات بحراً عبر سفن الرفع الثقيل وتثبيتها على القواعد.',
        imageFilename: 'stage_3.png',
        imagePath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages/stage_3.png',
        fallbackAliasPath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 4,
        acquisitionDate: '2023-10-12',
        phaseNameAr: 'اكتمال تثبيت الفلل الـ73 وتجهيز محطة الطاقة الشمسية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تثبيت 38 فيلا بحرية عائمة و35 فيلا شاطئية وتوصيل كابلات الطاقة الشمسية بنسبة 100%.',
        imageFilename: 'stage_4.png',
        imagePath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages/stage_4.png',
        fallbackAliasPath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 5,
        acquisitionDate: '2024-05-22',
        phaseNameAr: 'التشغيل الفندقي واستقبال النزلاء التجريبي',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'جاهزية المطاعم العائمة والسبا والمراسي المائية واستقبال أولى وفود الزوار وتجربة الإقامة الاستثنائية.',
        imageFilename: 'stage_5.png',
        imagePath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages/stage_5.png',
        fallbackAliasPath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages_high_resolution.jpg'
      }
    ],
    
    timelineHighResOverviewFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResOverviewPath: '/assets/case-studies/05-sheybarah-resort/timeline_5_stages_high_resolution.jpg',
    
    latestHighResolution: {
      widerOverviewFile: '01_current_overview_esri_world_imagery.jpg',
      widerOverviewPath: '/assets/case-studies/05-sheybarah-resort/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
      widerOverviewLabelAr: 'نظرة فضائية عامة على جزيرة شيبارة وأرخبيل الجزر المرجانية الساحرة المحيطة',
      closerDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
      closerDetailPath: '/assets/case-studies/05-sheybarah-resort/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
      closerDetailLabelAr: 'تفاصيل مقربة لسلسلة الفلل الكروية الفولاذية العاكسة لأشعة الشمس والجسور البحرية',
      basemapProvider: 'Esri World Imagery Basemap'
    },
    
    workflowStages: createStandard16Stages('منتجع شيبارة — البحر الأحمر', {
      13: { status: 'completed', notes: 'تم تركيب كامل الفلل الـ73 والجسور البحرية والمرافق الشاطئية بنجاح.' },
      14: { status: 'completed', notes: 'اجتياز الفحوصات البيئية البحرية الصارمة وفق معايير LEED Platinum.' },
      15: { status: 'completed', notes: 'استلام أولي وبدء مرحلة الإشغال التشغيلي التجريبي للضيافة الفاخرة.' },
      16: { status: 'in_progress', notes: 'رصد فضائي مستمر لسلامة المياه المحيطة والشعاب المرجانية عبر الأقمار الصناعية.' }
    }),
    
    checklist: createStandard19Checklist([1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17], [18, 19], [], [12]),
    
    sources: [
      {
        titleAr: 'سنتينل-2 — وكالة الفضاء الأوروبية',
        titleEn: 'Sentinel-2 Marine Observation',
        organization: 'ESA / Copernicus',
        attributionText: 'Contains modified Copernicus Sentinel data [2021-2024].'
      },
      {
        titleAr: 'البحر الأحمر الدولية — شركة تطوير وجهة البحر الأحمر',
        titleEn: 'Red Sea Global Environmental Publications',
        organization: 'Red Sea Global'
      }
    ]
  },

  // 6. King Salman Energy Park — SPARK
  {
    id: 'spark-energy-park',
    nameAr: 'مدينة الملك سلمان للطاقة — SPARK',
    nameEn: 'King Salman Energy Park — SPARK',
    categoryAr: 'مدن صناعية',
    categoryEn: 'Industrial Cities',
    categoryKey: 'industrial_cities',
    locationAr: 'المنطقة الشرقية (بين مدينتي الدمام والأحساء)',
    locationEn: 'Eastern Province (between Dammam & Al-Ahsa), KSA',
    coordinates: '25.9620° N, 49.8850° E',
    statusAr: 'المرحلة الأولى مُشغلة وتوسع مستمر في المجمعات الصناعية',
    statusEn: 'Phase 1 Operational, Continuous Industrial Zone Expansion',
    timeRange: '2018 – 2024',
    trackingPeriod: '2018 – 2024',
    stagesCount: 5,
    descriptionAr: 
      'متابعة مساحية وهندسية لأعمال البنية التحتية المتكاملة لمدينة سبارك اللوجستية والصناعية ومينائها الجاف المربوط بسكة الحديد. يوثق التحليل الفضائي تحول الصحراء الشاسعة إلى مركز عالمي لتصنيع معدات الطاقة والغاز والخدمات المتقدمة وشهادة الريادة في الاستدامة (LEED Silver).',
    descriptionEn: 
      'Geospatial and satellite monitoring of King Salman Energy Park (SPARK), the premier 21st-century energy industrial hub featuring dedicated dry port rail connectivity and LEED Silver infrastructure.',
    satelliteSources: 'European Space Agency (Copernicus Sentinel-2), Landsat-8/9',
    basemapSources: 'Esri World Imagery Basemap (Maxar, Earthstar Geographics)',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/06-spark-energy-park/comparison_clear_before_latest.jpg',
    comparisonLabels: {
      beforeDate: '2018-09-05',
      latestDate: '2024-05-10',
      description: 'مقارنة توضح الانتقال من الأرض الترابية المفتوحة إلى مدينة صناعية متكاملة وميناء جاف وشبكات نقل متطورة.'
    },
    
    constructionProgressStagesFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressStagesPath: '/assets/case-studies/06-spark-energy-park/construction_progress_3_clear_stages.jpg',
    
    timeline5Stages: [
      {
        stageNumber: 1,
        acquisitionDate: '2018-12-10',
        phaseNameAr: 'وضع حجر الأساس وأعمال التسوية الضخمة للمرحلة الأولى',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تمهيد مساحات شاسعة تجاوزت 14 كيلومتراً مربعاً وشق الطرق اللوجستية الرئيسية.',
        imageFilename: 'stage_1.png',
        imagePath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages/stage_1.png',
        fallbackAliasPath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 2,
        acquisitionDate: '2020-03-15',
        phaseNameAr: 'مد شبكات المرافق ومحطات الكهرباء والمياه',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تشييد محطات التحويل الكهربائي المركزية وشبكات الغاز وتجهيز قواعد الميناء الجاف.',
        imageFilename: 'stage_2.png',
        imagePath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages/stage_2.png',
        fallbackAliasPath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 3,
        acquisitionDate: '2021-08-22',
        phaseNameAr: 'توالي تشييد مصانع المستثمرين العالميين والمحليين',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'ظهور الهناجر الصناعية والمصانع المتخصصة لإنتاج أنابيب الحفر والمحابس والمعدات الثقيلة.',
        imageFilename: 'stage_3.png',
        imagePath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages/stage_3.png',
        fallbackAliasPath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 4,
        acquisitionDate: '2022-11-14',
        phaseNameAr: 'ربط الميناء الجاف بسكة حديد قطار الشرق (SAR)',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'اكتمال خط السكك الحديدية الرابط بين سبارك وموانئ الخليج العربي والمباني الجمركية.',
        imageFilename: 'stage_4.png',
        imagePath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages/stage_4.png',
        fallbackAliasPath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages_high_resolution.jpg'
      },
      {
        stageNumber: 5,
        acquisitionDate: '2024-05-10',
        phaseNameAr: 'التشغيل الفعلي للميناء الجاف وتدفق الشحنات الصناعية',
        satelliteSource: 'Sentinel-2 (Copernicus)',
        cloudCover: '0.0%',
        descriptionAr: 'تشغيل الميناء الجاف بكامل طاقته الاستيعابية وانطلاق عمليات الإنتاج في عشرات المصانع العالمية.',
        imageFilename: 'stage_5.png',
        imagePath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages/stage_5.png',
        fallbackAliasPath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages_high_resolution.jpg'
      }
    ],
    
    timelineHighResOverviewFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResOverviewPath: '/assets/case-studies/06-spark-energy-park/timeline_5_stages_high_resolution.jpg',
    
    latestHighResolution: {
      widerOverviewFile: '01_current_overview_esri_world_imagery.jpg',
      widerOverviewPath: '/assets/case-studies/06-spark-energy-park/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
      widerOverviewLabelAr: 'نظرة فضائية عامة على مدينة سبارك وشبكة الطرق اللوجستية ومسار سكة قطار الشحن',
      closerDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
      closerDetailPath: '/assets/case-studies/06-spark-energy-park/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
      closerDetailLabelAr: 'تفاصيل مقربة لأرصفة الميناء الجاف ومحطة مناولة الحاويات والمجمعات الصناعية المتخصصة',
      basemapProvider: 'Esri World Imagery Basemap'
    },
    
    workflowStages: createStandard16Stages('مدينة الملك سلمان للطاقة — سبارك', {
      13: { status: 'completed', notes: 'اكتمال بنية المرحلة الأولى والميناء الجاف مع استمرار توسعات المرحلة الثانية.' },
      14: { status: 'completed', notes: 'حصول المدينة على شهادة الريادة في الطاقة والتصميم البيئي (LEED Silver).' },
      15: { status: 'completed', notes: 'استلام وتشغيل مباني الميناء الجاف والمجمعات الصناعية.' },
      16: { status: 'in_progress', notes: 'مراقبة مستمرة للتوسع الصناعي وحركة الحاويات عبر صور الأقمار الصناعية.' }
    }),
    
    checklist: createStandard19Checklist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18], [19], [], [12]),
    
    sources: [
      {
        titleAr: 'سنتينل-2 — وكالة الفضاء الأوروبية',
        titleEn: 'Copernicus Sentinel-2 EO Data',
        organization: 'ESA / Copernicus',
        attributionText: 'Contains modified Copernicus Sentinel data [2018-2024].'
      },
      {
        titleAr: 'أرامكو السعودية وشركة مدينة الملك سلمان للطاقة',
        titleEn: 'Saudi Aramco & SPARK Media Portals',
        organization: 'SPARK / Saudi Aramco'
      }
    ]
  }
];
