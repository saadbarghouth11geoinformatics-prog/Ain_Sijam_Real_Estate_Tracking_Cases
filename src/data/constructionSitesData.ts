export interface ConstructionSitePhoto {
  url: string;
  titleAr: string;
  titleEn: string;
  phaseAr: string;
  phaseEn: string;
}

export interface ConstructionSiteItem {
  id: string;
  objectId: number;
  name: string;
  nameEn: string;
  code: string;
  region: 'الوسطى' | 'الشمالية' | 'الغربية' | 'الشرقية' | 'الجنوبية';
  city: string;
  coordinates: { x: number; y: number }; // Relative map % (0-100)
  realGps: { lat: number; lng: number }; // Exact ESRI WKID 4326 coordinates
  category: 'أبراج وأعمال خرسانية' | 'بنية تحتية وأنفاق' | 'مدن سياحية ذكية' | 'مجمعات لوجستية';
  progressPct: number;
  plannedPct: number;
  areaKm2: number;
  activeMachinery: number;
  activeWorkers: number;
  cameras360Count: number;
  dronesFlying: number;
  temperatureC: number;
  windSpeedKmh: number;
  craneSafetyStatus: 'آمن للعمل' | 'تحذير رياح خفيفة' | 'توقف مؤقت للرافعات';
  status: 'نشط على مدار الساعة' | 'أعمال نهارية' | 'مرحلة التسليم';
  previewImage: string;
  satelliteImage: string;
  constructionPhotos: ConstructionSitePhoto[];
  droneFlightRoute: { x: number; y: number }[];
  description: string;
  descriptionEn: string;
}

export const constructionSitesList: ConstructionSiteItem[] = [
  {
    id: 'site-obj-1',
    objectId: 1,
    name: 'موقع شمال الرياض - توسعة مطار الملك سلمان الدولي',
    nameEn: 'North Riyadh - King Salman Int\'l Airport Expansion',
    code: 'SIGAM-SITE-01',
    region: 'الوسطى',
    city: 'الرياض',
    coordinates: { x: 57.3, y: 46.3 },
    realGps: { lat: 24.987541548000024, lng: 46.791674141000044 },
    category: 'بنية تحتية وأنفاق',
    progressPct: 44.5,
    plannedPct: 42.0,
    areaKm2: 57.0,
    activeMachinery: 410,
    activeWorkers: 5400,
    cameras360Count: 96,
    dronesFlying: 5,
    temperatureC: 31,
    windSpeedKmh: 15,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'المهندسون يشرفون على أعمال المدارج والمخططات',
        titleEn: 'Field engineers inspecting runway blueprints & layout',
        phaseAr: 'الإشراف الهندسي الميداني',
        phaseEn: 'Field Engineering & QA'
      },
      {
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'معدات الرصف والتسوية لمدارج صالات المطار الجديدة',
        titleEn: 'Heavy pavers & earthmovers on tarmac foundation',
        phaseAr: 'أعمال الرصف والتسوية',
        phaseEn: 'Tarmac Paving & Earthworks'
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'حفارات التسوية الترابية وأساسات الصالات الشمالية',
        titleEn: 'Civil excavation rigs & foundation grading',
        phaseAr: 'الحفر والتجهيز الإنشائي',
        phaseEn: 'Excavation & Subgrade'
      }
    ],
    droneFlightRoute: [
      { x: 55, y: 44 },
      { x: 59, y: 44 },
      { x: 60, y: 48 },
      { x: 55, y: 44 }
    ],
    description: 'مشروع توسعة المدارج وصالات السفر الشمالية الجديدة مع رصد دوري لطبقات الأساس والرصف الخرساني.',
    descriptionEn: 'Northern runway expansion and high-capacity passenger concourses with continuous geodetic base monitoring.'
  },
  {
    id: 'site-obj-2',
    objectId: 2,
    name: 'نيوم - مجمع تروجينا الجبلي وذا لاين',
    nameEn: 'NEOM - Trojena Mountain & The Line',
    code: 'SIGAM-SITE-02',
    region: 'الشمالية',
    city: 'نيوم',
    coordinates: { x: 20.0, y: 28.0 },
    realGps: { lat: 28.352559110000072, lng: 36.488931885000056 },
    category: 'مدن سياحية ذكية',
    progressPct: 41.2,
    plannedPct: 39.5,
    areaKm2: 48.0,
    activeMachinery: 530,
    activeWorkers: 6700,
    cameras360Count: 138,
    dronesFlying: 6,
    temperatureC: 22,
    windSpeedKmh: 17,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'حفريات الصخور الجبلية وشاحنات النقل الثقيل لتروجينا',
        titleEn: 'Mountain quarry excavations & heavy dump trucks',
        phaseAr: 'الحفريات الصخرية الكبرى',
        phaseEn: 'Mega Rock Excavation'
      },
      {
        url: 'https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال حفر وتثبيت المنحدرات وسدود البحيرة الجبلية',
        titleEn: 'Slope anchors and dam foundation drilling',
        phaseAr: 'تثبيت المنحدرات والسدود',
        phaseEn: 'Slope Anchors & Dam Works'
      },
      {
        url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال الحفر والتسوية لمسار ذا لاين والبنية التحتية',
        titleEn: 'The Line civil corridor deep earthworks',
        phaseAr: 'تسوية الممر الإنشائي',
        phaseEn: 'Corridor Grading'
      }
    ],
    droneFlightRoute: [
      { x: 18, y: 26 },
      { x: 23, y: 27 },
      { x: 22, y: 31 },
      { x: 18, y: 26 }
    ],
    description: 'أعمال الحفر الجبلي وسدود البحيرة الاصطناعية وقرية التزلج في تروجينا مع مراقبة استقرار المنحدرات.',
    descriptionEn: 'Mountain excavations, freshwater lake dam construction, and the Trojena ski village with slope stability radar.'
  },
  {
    id: 'site-obj-3',
    objectId: 3,
    name: 'شمال جدة - واجهة أبحر الحضرية وبرج جدة',
    nameEn: 'North Jeddah - Obhur Waterfront & Jeddah Tower',
    code: 'SIGAM-SITE-03',
    region: 'الغربية',
    city: 'جدة',
    coordinates: { x: 33.5, y: 63.4 },
    realGps: { lat: 21.835654351000073, lng: 39.022437830000058 },
    category: 'أبراج وأعمال خرسانية',
    progressPct: 53.0,
    plannedPct: 50.0,
    areaKm2: 12.5,
    activeMachinery: 290,
    activeWorkers: 3900,
    cameras360Count: 78,
    dronesFlying: 4,
    temperatureC: 32,
    windSpeedKmh: 18,
    craneSafetyStatus: 'تحذير رياح خفيفة',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال الرافعات البرجية الشاهقة وهيكل البرج العملاق',
        titleEn: 'High-altitude tower cranes and superstructure framing',
        phaseAr: 'الهيكل الخرساني والرافعات',
        phaseEn: 'Superstructure & Cranes'
      },
      {
        url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'منظومة الرافعات البرجية الثقيلة في موقع البرج',
        titleEn: 'Heavy tower crane battery on high-rise core',
        phaseAr: 'نظام الرافعات المتسلقة',
        phaseEn: 'Climbing Crane Systems'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'صب الجدران الخرسانية المسلحة والشدات المعدنية',
        titleEn: 'Reinforced concrete shear walls and formwork',
        phaseAr: 'الصب الخرساني والشدات',
        phaseEn: 'Concrete Pouring & Formwork'
      }
    ],
    droneFlightRoute: [
      { x: 32, y: 62 },
      { x: 35, y: 62 },
      { x: 35, y: 65 },
      { x: 32, y: 62 }
    ],
    description: 'أعمال الأبراج الخرسانية الشاهقة والمارينا البحرية مع قياس تمايل الهيكل ورصد أمان الرافعات البرجية.',
    descriptionEn: 'Super-tall concrete core construction, marina berths, and wind shear sensors on heavy tower cranes.'
  },
  {
    id: 'site-obj-4',
    objectId: 4,
    name: 'مجمع وادي عسفان اللوجستي والصناعي',
    nameEn: 'Wadi Asfan Logistics & Industrial Park',
    code: 'SIGAM-SITE-04',
    region: 'الغربية',
    city: 'جدة',
    coordinates: { x: 34.5, y: 62.9 },
    realGps: { lat: 21.916366337000056, lng: 39.310292318000052 },
    category: 'مجمعات لوجستية',
    progressPct: 67.4,
    plannedPct: 65.0,
    areaKm2: 18.0,
    activeMachinery: 210,
    activeWorkers: 2400,
    cameras360Count: 54,
    dronesFlying: 3,
    temperatureC: 33,
    windSpeedKmh: 13,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تركيب الهياكل الفولاذية والجمالونات للمستودعات الكبرى',
        titleEn: 'Steel truss & portal frame warehouse erection',
        phaseAr: 'الهياكل الفولاذية والجمالونات',
        phaseEn: 'Steel Structure Erection'
      },
      {
        url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تثبيت الألواح العازلة والتكسيات الخارجية للمستودعات',
        titleEn: 'Insulated sandwich panels & roofing cladding',
        phaseAr: 'تكسيات الساندوتش بانل',
        phaseEn: 'Roofing & Enclosures'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'صب الأرضيات الخرسانية المسلحة المقاومة للأحمال العالية',
        titleEn: 'Heavy-duty industrial slab concrete laser screeding',
        phaseAr: 'صب الأرضيات الصناعية',
        phaseEn: 'Industrial Slabs'
      }
    ],
    droneFlightRoute: [
      { x: 33, y: 61 },
      { x: 36, y: 62 },
      { x: 36, y: 64 },
      { x: 33, y: 61 }
    ],
    description: 'تجهيز المستودعات المبردة ومناطق التوزيع اللوجستي المربوطة بالطريق الدائري السريع لمدينة جدة.',
    descriptionEn: 'Cold-chain warehousing and supply chain hub connected to the Jeddah northern orbital arterial corridor.'
  },
  {
    id: 'site-obj-5',
    objectId: 5,
    name: 'الدوادمي - محطة الطاقة النظيفة والتطوير الحضري',
    nameEn: 'Al-Duwadimi Clean Energy & Urban Hub',
    code: 'SIGAM-SITE-05',
    region: 'الوسطى',
    city: 'الدوادمي',
    coordinates: { x: 48.7, y: 48.9 },
    realGps: { lat: 24.506946988000038, lng: 44.42272347100004 },
    category: 'بنية تحتية وأنفاق',
    progressPct: 37.0,
    plannedPct: 35.5,
    areaKm2: 24.0,
    activeMachinery: 180,
    activeWorkers: 1650,
    cameras360Count: 42,
    dronesFlying: 2,
    temperatureC: 34,
    windSpeedKmh: 14,
    craneSafetyStatus: 'آمن للعمل',
    status: 'أعمال نهارية',
    previewImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تثبيت صفوف الألواح الكهروضوئية وهياكل التتبع الشمسي',
        titleEn: 'Solar tracker foundations & PV module arrays',
        phaseAr: 'تركيب مصفوفات الطاقة الشمسية',
        phaseEn: 'Solar Array Installation'
      },
      {
        url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال تمديد الكابلات الأرضية وخنادق الربط الكهربائي',
        titleEn: 'Medium-voltage trenching & underground cabling',
        phaseAr: 'التمديدات الكهربائية الأرضية',
        phaseEn: 'Electrical Trenching'
      },
      {
        url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'محطة المحولات الرئيسية وأبراج الربط بالشبكة الوطنية',
        titleEn: 'Main step-up substation & grid interconnection pylons',
        phaseAr: 'محطة التحويل والربط',
        phaseEn: 'Substation Interconnection'
      }
    ],
    droneFlightRoute: [
      { x: 47, y: 47 },
      { x: 50, y: 48 },
      { x: 50, y: 50 },
      { x: 47, y: 47 }
    ],
    description: 'أعمال تأسيس حقول الألواح الكهروضوئية ومحطات التحويل الكهربائي الفائق لخدمة محافظات وسط المملكة.',
    descriptionEn: 'Solar photovoltaic farm foundations and ultra-high voltage substations supporting Central Province infrastructure.'
  },
  {
    id: 'site-obj-6',
    objectId: 6,
    name: 'حائل - مجمع الإنشاءات والتطوير الحضري الغربي',
    nameEn: 'West Hail Urban & Construction Complex',
    code: 'SIGAM-SITE-06',
    region: 'الشمالية',
    city: 'حائل',
    coordinates: { x: 39.0, y: 32.7 },
    realGps: { lat: 27.480223393000074, lng: 41.75630744700004 },
    category: 'أبراج وأعمال خرسانية',
    progressPct: 58.2,
    plannedPct: 57.0,
    areaKm2: 14.2,
    activeMachinery: 195,
    activeWorkers: 2100,
    cameras360Count: 46,
    dronesFlying: 3,
    temperatureC: 27,
    windSpeedKmh: 12,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'الهيكل الخرساني والشدات المعدنية للمجمع السكني والتجاري',
        titleEn: 'Reinforced concrete frame & modern scaffolding',
        phaseAr: 'الأعمال الإنشائية والخرسانة',
        phaseEn: 'Structural Concrete'
      },
      {
        url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال تشييد واجهات المباني والكتل المعمارية بحائل',
        titleEn: 'Contemporary facade framing & concrete core',
        phaseAr: 'الهيكل المعماري والواجهات',
        phaseEn: 'Superstructure & Facade'
      },
      {
        url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'صب الأسقف والأعمدة بالخرسانة الجاهزة ومضخات الصب',
        titleEn: 'Concrete pump truck casting slabs and columns',
        phaseAr: 'صب الأسقف الخرسانية',
        phaseEn: 'Slab Pumping'
      }
    ],
    droneFlightRoute: [
      { x: 38, y: 31 },
      { x: 40, y: 32 },
      { x: 40, y: 34 },
      { x: 38, y: 31 }
    ],
    description: 'أعمال الهياكل الخرسانية والمجمعات السكنية الحديثة في القطاع الغربي من مدينة حائل.',
    descriptionEn: 'Concrete superstructure work and contemporary residential communities in West Hail development sector.'
  },
  {
    id: 'site-obj-7',
    objectId: 7,
    name: 'حائل - مركز الأعمال والخدمات اللوجستية',
    nameEn: 'Hail Business & Logistics Center',
    code: 'SIGAM-SITE-07',
    region: 'الشمالية',
    city: 'حائل',
    coordinates: { x: 40.2, y: 31.8 },
    realGps: { lat: 27.509178431000066, lng: 41.773176190000072 },
    category: 'مجمعات لوجستية',
    progressPct: 62.0,
    plannedPct: 60.0,
    areaKm2: 11.0,
    activeMachinery: 145,
    activeWorkers: 1800,
    cameras360Count: 38,
    dronesFlying: 2,
    temperatureC: 28,
    windSpeedKmh: 11,
    craneSafetyStatus: 'آمن للعمل',
    status: 'أعمال نهارية',
    previewImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تجهيز سكك تفريغ الشحن والرافعات الجسرية للمركز اللوجستي',
        titleEn: 'Freight rail spurs and heavy gantry crane runways',
        phaseAr: 'مسارات الشحن بالقطارات',
        phaseEn: 'Railway Intermodal Depot'
      },
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تركيب صالات التوزيع الجمركي ومستودعات التخزين',
        titleEn: 'Distribution warehouse structural steel installation',
        phaseAr: 'مستودعات التوزيع المركزي',
        phaseEn: 'Central Logistics Warehouses'
      },
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'رصف ساحات المناولة الثقيلة وشبكات الصرف التحتية',
        titleEn: 'Pavement grading and underground drainage networks',
        phaseAr: 'رصف وتجهيز الساحات',
        phaseEn: 'Yard Paving & Utilities'
      }
    ],
    droneFlightRoute: [
      { x: 39, y: 31 },
      { x: 41, y: 31 },
      { x: 41, y: 33 },
      { x: 39, y: 31 }
    ],
    description: 'تطوير ساحات الشحن والمستودعات المركزية المرتبطة بشبكة قطار سار للشحن في منطقة حائل.',
    descriptionEn: 'Central freight depots and cargo logistics terminal connected to SAR railway corridor in Hail.'
  },
  {
    id: 'site-obj-8',
    objectId: 8,
    name: 'حائل - مشروع المرافق الذكية والبنية التحتية',
    nameEn: 'East Hail Smart Infrastructure Project',
    code: 'SIGAM-SITE-08',
    region: 'الشمالية',
    city: 'حائل',
    coordinates: { x: 41.2, y: 33.6 },
    realGps: { lat: 27.469228960000066, lng: 41.801215221000064 },
    category: 'بنية تحتية وأنفاق',
    progressPct: 71.5,
    plannedPct: 70.0,
    areaKm2: 9.8,
    activeMachinery: 120,
    activeWorkers: 1350,
    cameras360Count: 32,
    dronesFlying: 2,
    temperatureC: 27,
    windSpeedKmh: 12,
    craneSafetyStatus: 'آمن للعمل',
    status: 'مرحلة التسليم',
    previewImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تمديد أنابيب تصريف السيول الضخمة وغرف التفتيش',
        titleEn: 'Large diameter storm drainage conduit installation',
        phaseAr: 'شبكات تصريف السيول',
        phaseEn: 'Stormwater Culverts'
      },
      {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تمديدات الألياف البصرية وغرف التحكم الذكية للمرافق',
        titleEn: 'Fiber optic duct banks and smart utility chambers',
        phaseAr: 'شبكات الألياف والتحكم الذكي',
        phaseEn: 'Smart Grid & Fiber Ducts'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'محطة تنقية ومعالجة المياه المتقدمة بشرق حائل',
        titleEn: 'Advanced water treatment concrete tanks',
        phaseAr: 'خزانات ومحطات المعالجة',
        phaseEn: 'Water Treatment Tanks'
      }
    ],
    droneFlightRoute: [
      { x: 40, y: 32 },
      { x: 42, y: 33 },
      { x: 42, y: 35 },
      { x: 40, y: 32 }
    ],
    description: 'شبكات تصريف السيول وتمديدات الألياف البصرية ومحطات تنقية المياه المركزية بشرق حائل.',
    descriptionEn: 'Stormwater drainage tunnels, fiber optic backbone, and water reclamation plants in East Hail.'
  },
  {
    id: 'site-obj-9',
    objectId: 9,
    name: 'ينبع الصناعية - مجمع الصناعات التحويلية',
    nameEn: 'Yanbu Industrial - Downstream Petrochemical Hub',
    code: 'SIGAM-SITE-09',
    region: 'الغربية',
    city: 'ينبع',
    coordinates: { x: 27.5, y: 51.0 },
    realGps: { lat: 24.111822909000068, lng: 38.002005128000064 },
    category: 'مجمعات لوجستية',
    progressPct: 79.0,
    plannedPct: 78.0,
    areaKm2: 36.0,
    activeMachinery: 320,
    activeWorkers: 4100,
    cameras360Count: 84,
    dronesFlying: 4,
    temperatureC: 30,
    windSpeedKmh: 16,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تركيب مسارات الأنابيب الضخمة وهياكل مجمع البتروكيماويات',
        titleEn: 'Petrochemical pipe racks & modular refinery units',
        phaseAr: 'الهياكل الميكانيكية والأنابيب',
        phaseEn: 'Pipe Racks & Mechanical'
      },
      {
        url: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أبراج التقطير ومعدات الهيدروجين الأخضر بينبع',
        titleEn: 'Distillation columns & green hydrogen converters',
        phaseAr: 'أبراج التقطير الصناعية',
        phaseEn: 'Process Towers'
      },
      {
        url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال اللحام المتخصص وتركيب خطوط الضغط العالي',
        titleEn: 'High-pressure certified welding & pipe assembly',
        phaseAr: 'اللحام والاختبار الهيدروستاتيكي',
        phaseEn: 'Welding & Testing'
      }
    ],
    droneFlightRoute: [
      { x: 26, y: 50 },
      { x: 29, y: 50 },
      { x: 29, y: 53 },
      { x: 26, y: 50 }
    ],
    description: 'أعمال التوسعة الصناعية الكبرى وخزانات التخزين ومحطات الطاقة الهيدروجينية والميثانول بينبع الصناعية.',
    descriptionEn: 'Industrial expansion, storage facilities, and green hydrogen-methanol processing plants in Yanbu Industrial.'
  },
  {
    id: 'site-obj-10',
    objectId: 10,
    name: 'ينبع البحر - مشروع تطوير الواجهة الساحلية',
    nameEn: 'Yanbu Al-Bahr Coastal Development',
    code: 'SIGAM-SITE-10',
    region: 'الغربية',
    city: 'ينبع',
    coordinates: { x: 28.5, y: 51.3 },
    realGps: { lat: 24.066249857000059, lng: 38.141661903000056 },
    category: 'مدن سياحية ذكية',
    progressPct: 64.0,
    plannedPct: 62.5,
    areaKm2: 15.0,
    activeMachinery: 175,
    activeWorkers: 2200,
    cameras360Count: 48,
    dronesFlying: 3,
    temperatureC: 29,
    windSpeedKmh: 14,
    craneSafetyStatus: 'آمن للعمل',
    status: 'أعمال نهارية',
    previewImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال كواسر الأمواج ورصف الصخور البحرية لكورنيش ينبع',
        titleEn: 'Coastal breakwater rock armor & revetment placement',
        phaseAr: 'كواسر الأمواج البحرية',
        phaseEn: 'Marine Breakwaters'
      },
      {
        url: 'https://images.unsplash.com/photo-1519074069444-1ba4eae16731?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'دق الخوازيق البحرية وأرصفة مارينا اليخوت السياحية',
        titleEn: 'Marine pile driving & luxury yacht marina pontoons',
        phaseAr: 'خوازيق المارينا والأرصفة',
        phaseEn: 'Marina Pile Driving'
      },
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'رصف الممشى البحري وتشييد الجسور الخشبية والخرسانية',
        titleEn: 'Promenade civil paving & coastal pedestrian bridges',
        phaseAr: 'الممشى الساحلي والجسور',
        phaseEn: 'Promenade Paving'
      }
    ],
    droneFlightRoute: [
      { x: 27, y: 50 },
      { x: 30, y: 51 },
      { x: 29, y: 53 },
      { x: 27, y: 50 }
    ],
    description: 'تطوير الكورنيش السياحي والمرافئ البحرية والفنادق التراثية على شاطئ البحر الأحمر بينبع البحر.',
    descriptionEn: 'Corniche promenade, luxury marina berths, and heritage boutique resorts along the Red Sea in Yanbu Al-Bahr.'
  },
  {
    id: 'site-obj-11',
    objectId: 11,
    name: 'الطائف الجديد - واحة التقنية والمشروعات السياحية',
    nameEn: 'New Taif - Technology Oasis & Tourism Hub',
    code: 'SIGAM-SITE-11',
    region: 'الغربية',
    city: 'الطائف',
    coordinates: { x: 38.5, y: 66.2 },
    realGps: { lat: 21.314756193000051, lng: 40.408601239000063 },
    category: 'مدن سياحية ذكية',
    progressPct: 48.0,
    plannedPct: 46.5,
    areaKm2: 28.5,
    activeMachinery: 230,
    activeWorkers: 2800,
    cameras360Count: 62,
    dronesFlying: 3,
    temperatureC: 24,
    windSpeedKmh: 13,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'شق الطرق الجبلية وبناء الجسور العلوية لواحة التقنية',
        titleEn: 'Mountain highway overpass cuts & viaduct casting',
        phaseAr: 'الجسور والطرق الجبلية',
        phaseEn: 'Mountain Roads & Viaducts'
      },
      {
        url: 'https://images.unsplash.com/photo-1516216628859-9bcceabb84ca?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال التسوية الميدانية بمحيط مطار الطائف الدولي الجديد',
        titleEn: 'Site grading around New Taif Airport concourse',
        phaseAr: 'التسوية والردم الإنشائي',
        phaseEn: 'Grading & Earthworks'
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'الهياكل الخرسانية لمباني مراكز الابتكار والجامعة الذكية',
        titleEn: 'Reinforced concrete research campus superstructure',
        phaseAr: 'مباني مراكز الابتكار',
        phaseEn: 'Innovation Campus Frame'
      }
    ],
    droneFlightRoute: [
      { x: 37, y: 65 },
      { x: 40, y: 65 },
      { x: 40, y: 68 },
      { x: 37, y: 65 }
    ],
    description: 'أعمال الطرق الدائرية وتطوير واحة التقنية ومطار الطائف الدولي الجديد والضواحي السكنية.',
    descriptionEn: 'Arterial ring roads, tech oasis research parks, New Taif International Airport, and masterplanned suburbs.'
  },
  {
    id: 'site-obj-12',
    objectId: 12,
    name: 'الرياض - مشروع المربع الجديد وبرج المكعب',
    nameEn: 'Riyadh - New Murabba & The Mukaab Icon',
    code: 'SIGAM-SITE-12',
    region: 'الوسطى',
    city: 'الرياض',
    coordinates: { x: 57.0, y: 47.0 },
    realGps: { lat: 24.850521529000048, lng: 46.720054621000031 },
    category: 'أبراج وأعمال خرسانية',
    progressPct: 38.5,
    plannedPct: 37.0,
    areaKm2: 19.0,
    activeMachinery: 340,
    activeWorkers: 4200,
    cameras360Count: 86,
    dronesFlying: 4,
    temperatureC: 32,
    windSpeedKmh: 14,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'حفريات الأساسات العميقة وجدران الدعم لبرج المكعب',
        titleEn: 'World record deep foundation pit & retaining walls',
        phaseAr: 'حفريات الأساسات العميقة',
        phaseEn: 'Mega Foundation Pit'
      },
      {
        url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'مجموعة الرافعات البرجية المتطورة على محيط المربع الجديد',
        titleEn: 'Tower crane grid erecting foundation core pillars',
        phaseAr: 'منظومة الرافعات البرجية',
        phaseEn: 'Tower Crane Grid'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'فحص المهندسين لشبكات حديد التسليح العملاقة واللبشة',
        titleEn: 'Engineering inspection on massive rebar mat foundation',
        phaseAr: 'تسليح اللبشة الخرسانية',
        phaseEn: 'Raft Foundation Rebar'
      }
    ],
    droneFlightRoute: [
      { x: 55, y: 45 },
      { x: 59, y: 46 },
      { x: 58, y: 49 },
      { x: 55, y: 45 }
    ],
    description: 'أضخم داون تاون حديث في العالم بنطاق 19 كم² يتميز ببرج المكعب الأيقوني برصد ثلاثي الأبعاد وتوأم رقمي.',
    descriptionEn: 'World\'s largest modern downtown featuring the iconic Mukaab cube tower with continuous LiDAR 3D reality capture.'
  },
  {
    id: 'site-obj-13',
    objectId: 13,
    name: 'ثادق وحريملاء - مجمع التطوير البيئي والزراعي',
    nameEn: 'Thadiq & Huraymila Environmental Complex',
    code: 'SIGAM-SITE-13',
    region: 'الوسطى',
    city: 'ثادق',
    coordinates: { x: 54.7, y: 45.5 },
    realGps: { lat: 25.129140542000073, lng: 46.078684731000067 },
    category: 'بنية تحتية وأنفاق',
    progressPct: 52.0,
    plannedPct: 50.0,
    areaKm2: 21.0,
    activeMachinery: 140,
    activeWorkers: 1550,
    cameras360Count: 36,
    dronesFlying: 2,
    temperatureC: 30,
    windSpeedKmh: 13,
    craneSafetyStatus: 'آمن للعمل',
    status: 'أعمال نهارية',
    previewImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'حفارات التسوية وقنوات تصريف مياه الأمطار بوادي ثادق',
        titleEn: 'Valley canal excavations & retention earthworks',
        phaseAr: 'القنوات المائية والحواجز',
        phaseEn: 'Water Retention Canals'
      },
      {
        url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال إنشاء السدود الترابية والركامية لحصاد مياه السيول',
        titleEn: 'Check dam rockfill & compaction works',
        phaseAr: 'السدود الركامية',
        phaseEn: 'Rockfill Check Dams'
      },
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تمديد أنابيب الري المعالج وتأهيل الغطاء النباتي',
        titleEn: 'Irrigation conduit laying & soil replenishment',
        phaseAr: 'شبكات الري البيئي',
        phaseEn: 'Irrigation Infrastructure'
      }
    ],
    droneFlightRoute: [
      { x: 53, y: 44 },
      { x: 56, y: 45 },
      { x: 56, y: 47 },
      { x: 53, y: 44 }
    ],
    description: 'أعمال السدود والحواجز المائية ومشروعات مبادرة السعودية الخضراء وإعادة تأهيل الغطاء النباتي.',
    descriptionEn: 'Water conservation dams, Saudi Green Initiative afforestation zones, and aquifer replenishment infrastructure.'
  },
  {
    id: 'site-obj-14',
    objectId: 14,
    name: 'واحة سدير للصناعة وتمديدات البنية التحتية',
    nameEn: 'Sudair Industrial & Infrastructure Corridor',
    code: 'SIGAM-SITE-14',
    region: 'الوسطى',
    city: 'سدير',
    coordinates: { x: 55.4, y: 45.7 },
    realGps: { lat: 25.090737349000051, lng: 46.259634160000076 },
    category: 'مجمعات لوجستية',
    progressPct: 69.3,
    plannedPct: 68.0,
    areaKm2: 32.0,
    activeMachinery: 220,
    activeWorkers: 2750,
    cameras360Count: 52,
    dronesFlying: 3,
    temperatureC: 31,
    windSpeedKmh: 12,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تجهيز المجمعات الدوائية ومصانع التقنية بسدير',
        titleEn: 'Pharma plant cleanroom steel frame construction',
        phaseAr: 'مجمعات التصنيع الدوائي',
        phaseEn: 'Pharma Cleanroom Frames'
      },
      {
        url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تركيب الهياكل الفولاذية للورش ومستودعات التخزين',
        titleEn: 'Structural steel erection and overhead crane beams',
        phaseAr: 'الهياكل الفولاذية للمصانع',
        phaseEn: 'Factory Steel Erection'
      },
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'توصيل شبكات المياه المعالجة والكهرباء بالمجمع الصناعي',
        titleEn: 'Industrial water and heavy power distribution lines',
        phaseAr: 'شبكات التغذية الصناعية',
        phaseEn: 'Utility Grids'
      }
    ],
    droneFlightRoute: [
      { x: 54, y: 44 },
      { x: 57, y: 45 },
      { x: 57, y: 47 },
      { x: 54, y: 44 }
    ],
    description: 'تجهيز المجمعات الدوائية والصناعات الغذائية وربط خطوط الكهرباء الفائقة ومحطات الصرف الصناعي.',
    descriptionEn: 'Pharmaceutical manufacturing parks, food processing facilities, and dedicated industrial water treatment grids.'
  },
  {
    id: 'site-obj-15',
    objectId: 15,
    name: 'جنوب شرق الرياض - المجمع اللوجستي والميناء الجاف',
    nameEn: 'SE Riyadh Logistics Hub & Inland Port',
    code: 'SIGAM-SITE-15',
    region: 'الوسطى',
    city: 'الرياض',
    coordinates: { x: 57.7, y: 48.7 },
    realGps: { lat: 24.53227974400005, lng: 46.914393935000078 },
    category: 'مجمعات لوجستية',
    progressPct: 74.0,
    plannedPct: 72.5,
    areaKm2: 26.0,
    activeMachinery: 280,
    activeWorkers: 3200,
    cameras360Count: 68,
    dronesFlying: 3,
    temperatureC: 33,
    windSpeedKmh: 14,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'رصف ساحات تفريغ الحاويات بالخرسانة المدحولة المقاومة',
        titleEn: 'Roller-compacted concrete intermodal yard paving',
        phaseAr: 'رصف ساحات الحاويات',
        phaseEn: 'Container Yard RCC Paving'
      },
      {
        url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تركيب مسارات رافعات الميناء الجاف وسكك قطار الشحن',
        titleEn: 'Rail-mounted gantry crane runway construction',
        phaseAr: 'سكك الرافعات الجسرية',
        phaseEn: 'Gantry Rail Tracks'
      },
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'بناء المستودعات المبردة ومستودعات التخزين اللوجستي',
        titleEn: 'Cold-storage high-cube warehouse steel structure',
        phaseAr: 'المستودعات اللوجستية المبردة',
        phaseEn: 'Cold Storage Warehouses'
      }
    ],
    droneFlightRoute: [
      { x: 56, y: 47 },
      { x: 59, y: 48 },
      { x: 59, y: 50 },
      { x: 56, y: 47 }
    ],
    description: 'توسعة ساحات تفريغ الحاويات ومستودعات التوزيع الكبرى على تقاطع طريق الخرج والدائري الجنوبي.',
    descriptionEn: 'Intermodal container yards, bonded distribution depots at the junction of Al-Kharj Highway & South Ring.'
  },
  {
    id: 'site-obj-16',
    objectId: 16,
    name: 'الخرج - مدينة الصناعات الغذائية والمرافق',
    nameEn: 'Al-Kharj Agri-Food & Industrial Complex',
    code: 'SIGAM-SITE-16',
    region: 'الوسطى',
    city: 'الخرج',
    coordinates: { x: 59.4, y: 50.7 },
    realGps: { lat: 24.162320184000066, lng: 47.37065941000003 },
    category: 'مجمعات لوجستية',
    progressPct: 61.0,
    plannedPct: 60.0,
    areaKm2: 38.0,
    activeMachinery: 205,
    activeWorkers: 2450,
    cameras360Count: 50,
    dronesFlying: 3,
    temperatureC: 34,
    windSpeedKmh: 13,
    craneSafetyStatus: 'آمن للعمل',
    status: 'أعمال نهارية',
    previewImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تشييد صوامع الغلال ومصانع تعبئة الأغذية الحديثة بالخرج',
        titleEn: 'Grain silo structural assembly & packaging lines',
        phaseAr: 'صوامع الغلال والمصانع',
        phaseEn: 'Grain Silos & Plants'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تركيب خطوط الإنتاج الميكانيكية ووحدات التبريد المركزية',
        titleEn: 'Industrial processing refrigeration plant installation',
        phaseAr: 'وحدات التبريد المركزية',
        phaseEn: 'Refrigeration Utilities'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'صب الأرضيات الخرسانية الصحية المعالجة بمواصفات عالمية',
        titleEn: 'Hygienic industrial floor slab finishing',
        phaseAr: 'الأرضيات الخرسانية المعالجة',
        phaseEn: 'Hygienic Slab Finishing'
      }
    ],
    droneFlightRoute: [
      { x: 58, y: 49 },
      { x: 61, y: 50 },
      { x: 61, y: 52 },
      { x: 58, y: 49 }
    ],
    description: 'أعمال إنشاء مصانع الألبان والأغذية الحديثة والمستودعات المركزية لتأمين سلاسل الإمداد بالمملكة.',
    descriptionEn: 'Modern dairy and agricultural food production complexes and national strategic food security facilities in Al-Kharj.'
  },
  {
    id: 'site-obj-17',
    objectId: 17,
    name: 'الدلم - محطة التوزيع والبنية التحتية للطاقة',
    nameEn: 'Al-Delam Energy & Utilities Station',
    code: 'SIGAM-SITE-17',
    region: 'الوسطى',
    city: 'الخرج',
    coordinates: { x: 58.4, y: 51.8 },
    realGps: { lat: 23.962058488000025, lng: 47.116781601000071 },
    category: 'بنية تحتية وأنفاق',
    progressPct: 56.4,
    plannedPct: 55.0,
    areaKm2: 17.5,
    activeMachinery: 160,
    activeWorkers: 1850,
    cameras360Count: 40,
    dronesFlying: 2,
    temperatureC: 35,
    windSpeedKmh: 15,
    craneSafetyStatus: 'آمن للعمل',
    status: 'أعمال نهارية',
    previewImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تثبيت أبراج الضغط الفائق 380 ك.ف وقواعد المحولات الكبرى',
        titleEn: '380kV high-voltage pylons and power transformer yards',
        phaseAr: 'محطة التحويل الكهربائي الفائق',
        phaseEn: '380kV Substation Yard'
      },
      {
        url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'بناء غرف القواطع المعزولة بالغاز (GIS) والمبنى الإداري',
        titleEn: 'Gas-insulated switchgear building civil works',
        phaseAr: 'مبنى القواطع والتحكم',
        phaseEn: 'GIS Switchgear Buildings'
      },
      {
        url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'شد كابلات التغذية الكهربائية وربط شبكات التوزيع الإقليمية',
        titleEn: 'Transmission line stringing and conductor tensioning',
        phaseAr: 'شد كابلات الضغط العالي',
        phaseEn: 'Conductor Stringing'
      }
    ],
    droneFlightRoute: [
      { x: 57, y: 50 },
      { x: 60, y: 51 },
      { x: 59, y: 53 },
      { x: 57, y: 50 }
    ],
    description: 'مشروع محطة التحويل المركزية وتمديدات أبراج الضغط العالي وخطوط التغذية المائية بمحافظة الدلم.',
    descriptionEn: 'Bulk power transmission substation, high-voltage pylons, and strategic regional potable water conduits in Al-Delam.'
  },
  {
    id: 'site-obj-18',
    objectId: 18,
    name: 'أبها وخميس مشيط - مشروع قمم السودة السياحي',
    nameEn: 'Abha & Khamis - Soudah Peaks Tourism Hub',
    code: 'SIGAM-SITE-18',
    region: 'الجنوبية',
    city: 'أبها',
    coordinates: { x: 44.5, y: 82.3 },
    realGps: { lat: 18.340598312000054, lng: 42.662830206000081 },
    category: 'مدن سياحية ذكية',
    progressPct: 35.8,
    plannedPct: 34.0,
    areaKm2: 29.0,
    activeMachinery: 260,
    activeWorkers: 3100,
    cameras360Count: 72,
    dronesFlying: 4,
    temperatureC: 19,
    windSpeedKmh: 16,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'حفر وتثبيت قواعد أعمدة التلفريك والمنحدرات الجبلية بالسودة',
        titleEn: 'Cliffside cable car pylon anchor drilling on Soudah Peaks',
        phaseAr: 'حفر وتثبيت محطات التلفريك',
        phaseEn: 'Cable-Car Pylon Drilling'
      },
      {
        url: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'بناء الجسور المعلقة وجدران التثبيت للطرق الجبلية الوعرة',
        titleEn: 'Mountain retaining walls and panoramic roadway decks',
        phaseAr: 'الجسور المعلقة والجدران الاستنادية',
        phaseEn: 'Mountain Retaining Walls'
      },
      {
        url: 'https://images.unsplash.com/photo-1516216628859-9bcceabb84ca?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تشييد الشاليهات البيئية الفاخرة المندمجة مع طبيعة عسير',
        titleEn: 'Eco-lodge structural framing integrated into landscape',
        phaseAr: 'المنتجعات البيئية الجبلية',
        phaseEn: 'Eco-Lodge Foundations'
      }
    ],
    droneFlightRoute: [
      { x: 43, y: 81 },
      { x: 46, y: 81 },
      { x: 46, y: 84 },
      { x: 43, y: 81 }
    ],
    description: 'أعمال تشييد المنتجعات الجبلية الفاخرة ومحطات التلفريك وأبراج المراقبة البانورامية في قمم السودة وعسير.',
    descriptionEn: 'Luxury eco-lodges, aerial cable-car systems, and mountain visitor pavilions at Soudah Peaks and Asir summits.'
  },
  {
    id: 'site-obj-19',
    objectId: 19,
    name: 'القنفذة - مشروع الميناء الساحلي والربط اللوجستي',
    nameEn: 'Al-Qunfudhah Coastal Port & Logistics',
    code: 'SIGAM-SITE-19',
    region: 'الجنوبية',
    city: 'القنفذة',
    coordinates: { x: 38.0, y: 78.0 },
    realGps: { lat: 19.131447284000046, lng: 41.073877032000041 },
    category: 'بنية تحتية وأنفاق',
    progressPct: 42.5,
    plannedPct: 41.0,
    areaKm2: 16.8,
    activeMachinery: 190,
    activeWorkers: 2150,
    cameras360Count: 44,
    dronesFlying: 3,
    temperatureC: 28,
    windSpeedKmh: 15,
    craneSafetyStatus: 'آمن للعمل',
    status: 'أعمال نهارية',
    previewImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تشييد كواسر الأمواج الضخمة ووضع الكتل الخرسانية الحامية',
        titleEn: 'Breakwater concrete armor block placement via heavy cranes',
        phaseAr: 'كواسر الأمواج وأرصفة السفن',
        phaseEn: 'Breakwater Armor Placement'
      },
      {
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'رصف ساحات تفريغ الحاويات ومدارج مطار القنفذة الإقليمي',
        titleEn: 'Harbor quay paving & regional runway earthmoving',
        phaseAr: 'رصف ساحات الميناء والمطار',
        phaseEn: 'Quay & Runway Paving'
      },
      {
        url: 'https://images.unsplash.com/photo-1519074069444-1ba4eae16731?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'دق خوازيق الأرصفة البحرية ومحطات رسو سفن الشحن',
        titleEn: 'Marine pile driving and berthing terminal construction',
        phaseAr: 'خوازيق الرسو البحري',
        phaseEn: 'Berthing Terminal Piles'
      }
    ],
    droneFlightRoute: [
      { x: 37, y: 77 },
      { x: 40, y: 77 },
      { x: 39, y: 80 },
      { x: 37, y: 77 }
    ],
    description: 'أعمال الميناء البحري وكواسر الأمواج ومطار القنفذة الإقليمي لدعم السياحة والربط التجاري الساحلي.',
    descriptionEn: 'Breakwater marine construction, coastal shipping berths, and regional airport terminals at Al-Qunfudhah.'
  },
  {
    id: 'site-obj-20',
    objectId: 20,
    name: 'غرب المدينة المنورة - مشروعات الضيافة والإسكان',
    nameEn: 'West Madinah Hospitality & Housing Projects',
    code: 'SIGAM-SITE-20',
    region: 'الغربية',
    city: 'المدينة المنورة',
    coordinates: { x: 33.5, y: 49.6 },
    realGps: { lat: 24.368061843000078, lng: 39.466565193000065 },
    category: 'أبراج وأعمال خرسانية',
    progressPct: 65.0,
    plannedPct: 63.5,
    areaKm2: 13.5,
    activeMachinery: 240,
    activeWorkers: 3100,
    cameras360Count: 64,
    dronesFlying: 3,
    temperatureC: 29,
    windSpeedKmh: 12,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال الهياكل الخرسانية لأبراج الضيافة والفنادق بغرب المدينة',
        titleEn: 'Hospitality high-rise tower concrete core and scaffolding',
        phaseAr: 'الهياكل الخرسانية لأبراج الضيافة',
        phaseEn: 'Hospitality Tower Frames'
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'صب الجدران الاستنادية والأسقف للمجمعات السكنية لزوار الحرم',
        titleEn: 'Reinforced concrete framing for residential pilgrim blocks',
        phaseAr: 'الصب الخرساني للأدوار المتكررة',
        phaseEn: 'Repetitive Slab Casting'
      },
      {
        url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال التشطيبات الخارجية وتركيب الواجهات المعمارية التراثية',
        titleEn: 'Islamic heritage architectural facade installation',
        phaseAr: 'الواجهات والتشطيبات الخارجية',
        phaseEn: 'Architectural Facade Installation'
      }
    ],
    droneFlightRoute: [
      { x: 32, y: 48 },
      { x: 35, y: 49 },
      { x: 35, y: 51 },
      { x: 32, y: 48 }
    ],
    description: 'تطوير الضواحي السكنية الموجهة لخدمة زوار المسجد النبوي الشريف ومحاور الطرق السريعة المؤدية للميقات.',
    descriptionEn: 'Pilgrim hospitality towers and residential communities along the western access corridors to the Prophet’s Mosque.'
  },
  {
    id: 'site-obj-21',
    objectId: 21,
    name: 'المدينة المنورة - مدينة المعرفة ومحطة الحرمين',
    nameEn: 'Knowledge Economic City & Haramain Station',
    code: 'SIGAM-SITE-21',
    region: 'الغربية',
    city: 'المدينة المنورة',
    coordinates: { x: 35.0, y: 48.6 },
    realGps: { lat: 24.557446077000066, lng: 39.759283847000063 },
    category: 'مدن سياحية ذكية',
    progressPct: 59.8,
    plannedPct: 58.0,
    areaKm2: 22.0,
    activeMachinery: 295,
    activeWorkers: 3800,
    cameras360Count: 76,
    dronesFlying: 4,
    temperatureC: 30,
    windSpeedKmh: 13,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تطوير مجمع العلياء التجاري الذكي والأبراج المكتبية متعددة الاستخدامات',
        titleEn: 'Al-Alya smart mixed-use commercial tower construction',
        phaseAr: 'أبراج مدينة المعرفة الحديثة',
        phaseEn: 'Commercial Tower Superstructure'
      },
      {
        url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال الأسقف الخرسانية والأنفاق المحيطة بمحطة قطار الحرمين',
        titleEn: 'Transit concourse concrete vaults & pedestrian tunnels',
        phaseAr: 'أنفاق وممرات محطة الحرمين',
        phaseEn: 'Transit Concourse Vaults'
      },
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'التنسيق الهندسي ومتابعة مطابقة BIM للمشروع',
        titleEn: 'BIM coordination & field verification on site',
        phaseAr: 'المطابقة الهندسية الرقمية',
        phaseEn: 'BIM Field Verification'
      }
    ],
    droneFlightRoute: [
      { x: 34, y: 47 },
      { x: 37, y: 48 },
      { x: 36, y: 50 },
      { x: 34, y: 47 }
    ],
    description: 'مشروع مجمع العلياء ومول المعرفة وممشى الزوار المحيط بمحطة قطار الحرمين السريع بالمدينة المنورة.',
    descriptionEn: 'Al-Alya mixed-use development, regional tech hub, and transit-oriented development around Haramain High-Speed Station.'
  },
  {
    id: 'site-obj-22',
    objectId: 22,
    name: 'المدينة المنورة - مجمع المشروعات التنموية الشمالية',
    nameEn: 'North Madinah Integrated Development Zone',
    code: 'SIGAM-SITE-22',
    region: 'الغربية',
    city: 'المدينة المنورة',
    coordinates: { x: 35.8, y: 47.4 },
    realGps: { lat: 24.579461612000046, lng: 39.755006439000056 },
    category: 'أبراج وأعمال خرسانية',
    progressPct: 47.2,
    plannedPct: 45.0,
    areaKm2: 18.2,
    activeMachinery: 185,
    activeWorkers: 2300,
    cameras360Count: 50,
    dronesFlying: 3,
    temperatureC: 29,
    windSpeedKmh: 11,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال البنية التحتية والمراكز الطبية التخصصية شمال الدائري الثالث',
        titleEn: 'Medical center infrastructure & foundation trenches',
        phaseAr: 'أساسات المراكز الطبية والتعليمية',
        phaseEn: 'Civic Foundation Works'
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تشييد المباني الخرسانية والأجنحة السكنية الذكية',
        titleEn: 'Reinforced concrete framing for educational campus',
        phaseAr: 'الهياكل الإنشائية للحرم الجامعي',
        phaseEn: 'Educational Campus Frames'
      },
      {
        url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال تركيب ممرات المشاة والحدائق العامة المحيطة بالمجمع',
        titleEn: 'Urban green spine civil landscaping & pedestrian plazas',
        phaseAr: 'الساحات والممرات الحضرية',
        phaseEn: 'Urban Plazas & Walkways'
      }
    ],
    droneFlightRoute: [
      { x: 35, y: 46 },
      { x: 38, y: 47 },
      { x: 37, y: 49 },
      { x: 35, y: 46 }
    ],
    description: 'مشروعات المراكز الصحية والتعليمية والضواحي السكنية الذكية شمال الدائري الثالث بالمدينة.',
    descriptionEn: 'Specialized medical centers, university campuses, and smart residential clusters along North 3rd Ring corridor.'
  },
  {
    id: 'site-obj-23',
    objectId: 23,
    name: 'الحناكية - محطة الطاقة الشمسية وتغذية الشبكة',
    nameEn: 'Al-Hanakiyah Giga Solar Power Plant',
    code: 'SIGAM-SITE-23',
    region: 'الغربية',
    city: 'المدينة المنورة',
    coordinates: { x: 38.2, y: 46.7 },
    realGps: { lat: 24.901326844000039, lng: 40.499882092000064 },
    category: 'بنية تحتية وأنفاق',
    progressPct: 76.5,
    plannedPct: 75.0,
    areaKm2: 30.0,
    activeMachinery: 210,
    activeWorkers: 2600,
    cameras360Count: 56,
    dronesFlying: 3,
    temperatureC: 32,
    windSpeedKmh: 13,
    craneSafetyStatus: 'آمن للعمل',
    status: 'مرحلة التسليم',
    previewImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تثبيت الألواح الشمسية العملاقة بقدرة 1.5 جيجاوات بالحناكية',
        titleEn: '1.5 GW utility-scale solar tracker assembly in desert terrain',
        phaseAr: 'تركيب مصفوفات الألواح الشمسية',
        phaseEn: '1.5 GW Solar Array Assembly'
      },
      {
        url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تمديد كابلات التيار المستمر ومحطات العواكس المركزية',
        titleEn: 'DC string cabling and central solar inverter enclosures',
        phaseAr: 'العواكس وتمديدات التيار',
        phaseEn: 'Central Inverter Stations'
      },
      {
        url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'محطة الربط بالجهد الفائق ومفاتيح التوصيل بالشبكة الموحدة',
        titleEn: 'Ultra-high voltage interconnection yard and step-up grid',
        phaseAr: 'محطة التحويل والربط بالشبكة',
        phaseEn: 'Grid Substation Interconnect'
      }
    ],
    droneFlightRoute: [
      { x: 37, y: 45 },
      { x: 40, y: 46 },
      { x: 39, y: 48 },
      { x: 37, y: 45 }
    ],
    description: 'أضخم محطة لإنتاج الطاقة الشمسية بقدرة 1.5 جيجاوات وربطها بالشبكة الكهربائية الموحدة.',
    descriptionEn: '1.5 GW utility-scale photovoltaic solar park connected to the national high-voltage interconnected power grid.'
  },
  {
    id: 'site-obj-24',
    objectId: 24,
    name: 'نيوم - أوكساجون المدينة الصناعية المتقدمة والميناء',
    nameEn: 'NEOM - Oxagon Advanced Industrial City & Port',
    code: 'SIGAM-SITE-24',
    region: 'الشمالية',
    city: 'نيوم',
    coordinates: { x: 18.5, y: 33.3 },
    realGps: { lat: 27.377425928000036, lng: 35.664806361000046 },
    category: 'مجمعات لوجستية',
    progressPct: 45.0,
    plannedPct: 43.5,
    areaKm2: 44.0,
    activeMachinery: 480,
    activeWorkers: 6200,
    cameras360Count: 110,
    dronesFlying: 5,
    temperatureC: 25,
    windSpeedKmh: 16,
    craneSafetyStatus: 'آمن للعمل',
    status: 'نشط على مدار الساعة',
    previewImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&auto=format&fit=crop&q=85',
    satelliteImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=85',
    constructionPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تثبيت أرصفة الميناء الصناعي المتطور والرافعات الشاطئية العملاقة بأوكساجون',
        titleEn: 'Quay wall caissons and automated STS gantry crane installation at Oxagon',
        phaseAr: 'أرصفة الميناء الصناعي ورافعات الشحن',
        phaseEn: 'Automated Port Terminal'
      },
      {
        url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'أعمال كراكات الردم البحري والحوض المائي العائم بالبحر الأحمر',
        titleEn: 'Maritime dredging and floating city basin foundation works',
        phaseAr: 'الردم البحري والحوض المائي',
        phaseEn: 'Marine Dredging & Basins'
      },
      {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1000&auto=format&fit=crop&q=85',
        titleAr: 'تشييد مصانع الهيدروجين الأخضر والتصنيع المتقدم الخالي من الانبعاثات',
        titleEn: 'Green hydrogen electrolyzer plants & modular clean tech factories',
        phaseAr: 'مصانع الهيدروجين والتصنيع النظيف',
        phaseEn: 'Clean Energy & Fab Units'
      }
    ],
    droneFlightRoute: [
      { x: 17, y: 32 },
      { x: 20, y: 33 },
      { x: 20, y: 35 },
      { x: 17, y: 32 }
    ],
    description: 'أعمال ردم وأرصفة ميناء أوكساجون المتطور، ومصانع الطاقة النظيفة وتقنيات التصنيع المتقدمة بالبحر الأحمر.',
    descriptionEn: 'Port basin marine dredging, next-generation automated container terminal, and clean energy industrial zones at Oxagon.'
  }
];
