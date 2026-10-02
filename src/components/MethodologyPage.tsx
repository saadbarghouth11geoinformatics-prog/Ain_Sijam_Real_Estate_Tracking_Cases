/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Layers,
  Compass,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Sliders,
  Sparkles,
  MapPin,
  Calendar,
  X,
  Activity,
  BarChart3,
  FileCheck,
  Search,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MethodologyPageProps {
  onNavigate: (targetId: string) => void;
}

const shouldPreserveFullFrame = (src: string) =>
  /(?:satellite|map|plan|dashboard|gis|report|drawing|masterplan|conflict)/i.test(src);

// This is deliberately a workflow comparison, not a fabricated before/after claim.
// The field capture and its GIS review are two connected records in the same survey process.
const SURVEY_WORKFLOW_COMPARISON = {
  fieldImage: '/images/infrastructure-network/01-gnss-field-survey.png',
  mapImage: '/images/infrastructure-network/07-utility-network-gis-map.png',
  fieldLabelAr: 'المسح الميداني GNSS',
  fieldLabelEn: 'GNSS Field Survey',
  mapLabelAr: 'ربط الرفع بخريطة الشبكات',
  mapLabelEn: 'Network GIS Review',
  explanationAr: 'نفس مسار العمل: توثيق النقاط في الموقع ثم مراجعتها وربطها بطبقات الشبكات في خريطة GIS.',
  explanationEn: 'One workflow: capture surveyed points on site, then validate and connect them to network layers in GIS.',
} as const;

// ----------------------------------------------------------------------
// DATA TYPES & CONSTANTS
// ----------------------------------------------------------------------

interface StageInfo {
  id: number;
  titleAr: string;
  titleEn: string;
  dominantImage: string;
  explanationAr: string;
  explanationEn: string;
  whatWeKnowAr: string[];
  whatWeKnowEn: string[];
  stripImages: {
    src: string;
    captionAr: string;
    captionEn: string;
    type: 'evidence' | 'supporting';
  }[];
}

interface EvidenceStage {
  id: string;
  labelAr: string;
  labelEn: string;
  image: string;
  timeframeAr: string;
  timeframeEn: string;
  annotations: {
    id: string;
    labelAr: string;
    labelEn: string;
    x: number; // percentage
    y: number; // percentage
    cropBox: { x: number; y: number; zoom: number };
    descAr: string;
    descEn: string;
  }[];
}

interface IntelligenceDimension {
  id: string;
  titleAr: string;
  titleEn: string;
  image: string;
  relatedImage: string;
  explanationAr: string;
  explanationEn: string;
  indicatorAr: string;
  indicatorEn: string;
  whyItMattersAr: string;
  whyItMattersEn: string;
}

interface CinemaSlide {
  id: number;
  labelAr: string;
  labelEn: string;
  subLabelAr: string;
  subLabelEn: string;
  image: string;
  descAr: string;
  descEn: string;
}

type WorkGalleryCategory = 'aerial' | 'execution' | 'equipment';

interface WorkGalleryItem {
  src: string;
  category: WorkGalleryCategory;
  captionAr: string;
  captionEn: string;
  preserveDetail?: boolean;
}

const WORK_GALLERY_ITEMS: WorkGalleryItem[] = [
  ['01-site-preparation-satellite.jpg','aerial','خط أساس جغرافي للموقع قبل البدء','Geospatial baseline before mobilisation',true],
  ['02-roadworks-site-preparation.jpg','execution','تهيئة مسار الحركة وأعمال التسوية','Access corridor preparation and grading'],
  ['03-construction-progress-aerial.jpg','aerial','رصد تقدّم الأعمال من منظور جوي','Aerial progress verification'],
  ['04-equipment-and-cranes-aerial.jpg','equipment','توزيع المعدات والرافعات في الموقع','Plant and crane deployment'],
  ['05-advanced-construction-satellite.jpg','aerial','قراءة مراحل التطوير العمراني المتقدمة','Advanced development footprint review',true],
  ['06-generated-saudi-construction-equipment.png','equipment','مرجع بصري لمنظومة المعدات الثقيلة','Heavy equipment reference overview'],
  ['07-generated-land-planning-green-corridor.png','aerial','تصور تخطيطي للممرات واستخدامات الأرض','Land-use and corridor planning study',true],
  ['08-unsplash-aerial-materials.jpg','execution','توثيق ساحات المواد والخدمات اللوجستية','Materials yard and logistics audit'],
  ['09-real-road-roller-and-excavator.jpg','equipment','دمك طبقات الطريق وتجهيز التربة','Road-base compaction operations'],
  ['10-real-heavy-equipment-overview.jpg','equipment','انتشار الأسطول في نطاق الأعمال','Heavy fleet deployment overview'],
  ['11-real-excavators-roadworks.jpg','equipment','حفر وتجهيز قطاع البنية التحتية','Excavation and corridor preparation'],
  ['12-real-site-preparation-machinery.jpg','equipment','جاهزية معدات التجهيز الميداني','Site preparation plant readiness'],
  ['13-real-road-construction.jpg','execution','تشكيل محاور الحركة داخل المشروع','Internal road construction sequence'],
  ['14-real-completed-residential-green-space.jpg','execution','نموذج للأصل العمراني المكتمل','Completed urban asset benchmark'],
  ['15-real-urban-construction-progress.jpg','execution','قياس الاندماج مع النسيج الحضري','Urban integration progress review'],
  ['16-real-concrete-tower-under-construction.jpg','execution','صعود الهيكل الخرساني الرأسي','Vertical concrete frame progress'],
  ['17-real-high-rise-construction-crane.jpg','equipment','تشغيل الرافعات للأعمال الشاهقة','High-rise crane operations'],
  ['18-real-tower-crane-building-progress.jpg','execution','تقدم الواجهة والهيكل في الموقع','Structure and envelope progression'],
  ['19-real-construction-site-road-access.jpg','execution','التحقق من مداخل ومخارج الموقع','Site access verification'],
  ['20-real-urban-construction-and-traffic.jpg','execution','تأثير التنفيذ على الحركة المحيطة','Construction interface with traffic'],
  ['21-real-crane-structure-progress.jpg','equipment','تزامن الرافعة مع مراحل الهيكل','Crane-supported structural sequence'],
  ['22-real-highway-and-construction-site.jpg','aerial','صلة المشروع بشبكة الطرق الإقليمية','Regional highway connectivity'],
  ['23-real-rural-site-monitoring.jpg','aerial','توثيق المحيط والموقع المفتوح','Open-site perimeter observation'],
  ['24-real-building-and-tower-crane.jpg','equipment','متابعة أعمال الرفع بجوار المبنى','Building-adjacent lifting activity'],
  ['25-real-crane-and-concrete-structure.jpg','execution','فحص مراحل التنفيذ الخرساني','Concrete works inspection'],
].map(([filename, category, captionAr, captionEn, preserveDetail]) => ({
  src: `/images/work/${filename}`,
  category: category as WorkGalleryCategory,
  captionAr: captionAr as string,
  captionEn: captionEn as string,
  preserveDetail: Boolean(preserveDetail),
}));

// ----------------------------------------------------------------------
// 1. SEVEN STAGES DATA
// ----------------------------------------------------------------------
const SEVEN_STAGES: StageInfo[] = [
  {
    id: 1,
    titleAr: 'الأصل والأرض',
    titleEn: 'Land & Asset Foundation',
    dominantImage: '/images/infrastructure-network/27-field-utility-verification-team.jpg',
    explanationAr: 'تحديد إحداثيات ومساحة الأرض، وتوثيق خط الأساس الطبوغرافي والحدود النظامية للأصل قبل بدء أي نشاط.',
    explanationEn: 'Establishing exact spatial boundaries, topographic baseline, and legal zoning before any field activity begins.',
    whatWeKnowAr: [
      'المساحة الإجمالية الدقيقة ومطابقة إحداثيات الصك',
      'طبوغرافية الموقع والمناسيب ومسارات السيول الطبيعية',
      'حالة الأراضي المجاورة وشبكات النقل المتاخمة',
    ],
    whatWeKnowEn: [
      'Exact parcel area and geospatial deed verification',
      'Topographic elevations, slope grading, and runoff paths',
      'Adjacent land status and proximate transit corridors',
    ],
    stripImages: [
      {
        src: '/images/infrastructure-network/35-gnss-site-survey.jpg',
        captionAr: 'إعداد جهاز GNSS قبل الرفع الميداني',
        captionEn: 'GNSS setup before field capture',
        type: 'supporting',
      },
      {
        src: '/images/infrastructure-network/31-gnss-network-survey-team.jpg',
        captionAr: 'فريق الرفع وتثبيت نقاط الرصد',
        captionEn: 'Survey team establishing control points',
        type: 'supporting',
      },
      {
        src: '/images/infrastructure-network/33-field-mapping-and-asset-review.jpg',
        captionAr: 'مراجعة الأصول المسجلة بعد الرفع',
        captionEn: 'Recorded asset review after field capture',
        type: 'supporting',
      },
    ],
  },
  {
    id: 2,
    titleAr: 'التخطيط والموافقات',
    titleEn: 'Planning & Approvals',
    dominantImage: '/assets/methodology/07-generated-land-planning-green-corridor.png',
    explanationAr: 'مطابقة المخطط الهندسي مع الاشتراطات البلدية وكود البناء السعودي واعتماد خطة استخدامات الأراضي.',
    explanationEn: 'Aligning engineering designs with municipal regulations, Saudi Building Code (SBC), and land use permits.',
    whatWeKnowAr: [
      'معامل مسطحات البناء (FAR) والارتدادات النظامية المعتمدة',
      'توزيع الكتل المعمارية والممرات الخضراء وشبكات المشاة',
      'نقاط ربط شبكات المرافق العامة والمحاور الخدمية',
    ],
    whatWeKnowEn: [
      'Building Coverage Ratio (FAR) and statutory setbacks',
      'Massing footprint distribution and green buffer networks',
      'Utility connection points and service ingress corridors',
    ],
    stripImages: [
      {
        src: '/assets/methodology/13-real-road-construction.jpg',
        captionAr: 'تخطيط شبكة الطرق والمحاور التنظيمية',
        captionEn: 'Road alignment and site circulation',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/22-real-highway-and-construction-site.jpg',
        captionAr: 'الربط المباشر مع الشرايين الحيوية',
        captionEn: 'Arterial highway connectivity and access',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/14-real-completed-residential-green-space.jpg',
        captionAr: 'المعايير المعتمدة للمساحات الحضرية المستهدفة',
        captionEn: 'Targeted urban open-space standards',
        type: 'supporting',
      },
    ],
  },
  {
    id: 3,
    titleAr: 'المقاول وتجهيز الموقع',
    titleEn: 'Contractor Mobilization',
    dominantImage: '/assets/methodology/02-roadworks-site-preparation.jpg',
    explanationAr: 'رصد دخول المقاولين، وتجهيز السياج الأمني، وتسوية الأرض وفتح المسارات اللوجستية لنقل التربة.',
    explanationEn: 'Tracking site mobilization, security fencing, leveling earthworks, and heavy hauling routes.',
    whatWeKnowAr: [
      'تاريخ الاستلام الميداني وبدء حركة الآليات الثقيلة',
      'حجم أعمال الردم والحفر والتهيئة الأولية للتربة',
      'تأمين ممرات الشاحنات ومناطق تشوين المواد والمكاتب',
    ],
    whatWeKnowEn: [
      'Contractor site handover date and fleet arrival',
      'Cut and fill earthwork volume tracking',
      'Secured haul routes and material staging yards',
    ],
    stripImages: [
      {
        src: '/assets/methodology/09-real-road-roller-and-excavator.jpg',
        captionAr: 'معدات دمك وتسوية التربة الأساسية',
        captionEn: 'Soil compaction rollers and excavators',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/11-real-excavators-roadworks.jpg',
        captionAr: 'أعمال الحفر وتجهيز قطاعات الطرق',
        captionEn: 'Trenching and corridor grading fleet',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/12-real-site-preparation-machinery.jpg',
        captionAr: 'اصطفاف معدات التمهيد والتهيئة الإنشائية',
        captionEn: 'Site preparation machinery fleet',
        type: 'supporting',
      },
    ],
  },
  {
    id: 4,
    titleAr: 'المعدات والإنشاء',
    titleEn: 'Equipment & Structural Works',
    dominantImage: '/assets/methodology/04-equipment-and-cranes-aerial.jpg',
    explanationAr: 'تتبع كثافة أسطول الرافعات والحفارات، وتوثيق صب القواعد والأعمدة وتصاعد الهيكل الخرساني.',
    explanationEn: 'Monitoring crane density and fleet activity, tracking substructure pours and vertical structural progress.',
    whatWeKnowAr: [
      'أعداد الرافعات البرجية ومواقع تموضعها النشطة بالموقع',
      'معدل تدفق شاحنات الخرسانة وتتابع صب القواعد الإنشائية',
      'وتيرة صعود الطوابق ومؤشرات السلامة الميدانية الموثقة',
    ],
    whatWeKnowEn: [
      'Tower crane census and operational positioning zones',
      'Concrete pour cadence and foundation progress',
      'Floor cycle velocity and visible safety compliance',
    ],
    stripImages: [
      {
        src: '/assets/methodology/06-generated-saudi-construction-equipment.png',
        captionAr: 'منظومة الآليات والمعدات الثقيلة المتخصصة',
        captionEn: 'Heavy specialized equipment ecosystem',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/10-real-heavy-equipment-overview.jpg',
        captionAr: 'نظرة شاملة لانتشار الآليات بمحيط الأعمال',
        captionEn: 'Overview of heavy machinery deployment',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/16-real-concrete-tower-under-construction.jpg',
        captionAr: 'تصاعد الهيكل الخرساني والأبراج',
        captionEn: 'Vertical concrete tower framing',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/17-real-high-rise-construction-crane.jpg',
        captionAr: 'الرافعات البرجية للأعمال الشاهقة',
        captionEn: 'Tower cranes for high-rise execution',
        type: 'supporting',
      },
    ],
  },
  {
    id: 5,
    titleAr: 'الرصد والتحقق',
    titleEn: 'Verification & Progress Tracking',
    dominantImage: '/assets/methodology/03-construction-progress-aerial.jpg',
    explanationAr: 'مقارنة الإنجاز الميداني الفعلي بالجدول الزمني المخطط، والتحقق المستقل عبر الأقمار الصناعية والتصوير الجوي.',
    explanationEn: 'Cross-verifying physical site progress against planned milestones via independent satellite and aerial audits.',
    whatWeKnowAr: [
      'فروقات الإنجاز الفعلي مقابل المخطط بدقة مكانية',
      'رصد مناطق التباطؤ أو التوقف غير المبرر بالأدلة المرئية',
      'توثيق مرئي تاريخي غير قابل للتعديل لكل مرحلة مشروع',
    ],
    whatWeKnowEn: [
      'Spatial delta between scheduled vs. built progress',
      'Early detection of bottleneck or standstill sectors',
      'Tamper-evident temporal photographic audit trail',
    ],
    stripImages: [
      {
        src: '/assets/methodology/01-site-preparation-satellite.jpg',
        captionAr: 'خط الأساس الفضائي لتاريخ استلام الأرض',
        captionEn: 'Initial satellite baseline audit',
        type: 'evidence',
      },
      {
        src: '/assets/methodology/05-advanced-construction-satellite.jpg',
        captionAr: 'صورة فضائية لتقدم وتكامل الكتل العمرانية',
        captionEn: 'Advanced construction satellite imagery',
        type: 'evidence',
      },
      {
        src: '/assets/methodology/08-unsplash-aerial-materials.jpg',
        captionAr: 'توثيق تشوين المواد وسلاسل الإمداد الميدانية',
        captionEn: 'Material storage and site logistics audit',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/15-real-urban-construction-progress.jpg',
        captionAr: 'مؤشرات التوسع والاندماج في النسيج الحضري',
        captionEn: 'Urban fabric integration indicators',
        type: 'supporting',
      },
    ],
  },
  {
    id: 6,
    titleAr: 'التقارير والقرارات',
    titleEn: 'Reporting & Decision Support',
    dominantImage: '/assets/methodology/20-real-urban-construction-and-traffic.jpg',
    explanationAr: 'استخراج مؤشرات دقيقة موجهة للمستثمرين وصناع القرار لدعم الصرف المالي وإدارة مخاطر المشروع.',
    explanationEn: 'Delivering verified executive metrics to investors and financiers for certified disbursements and risk governance.',
    whatWeKnowAr: [
      'نسبة الصرف المالي المستحقة استناداً للواقع الموثق',
      'جاهزية تقارير الاعتماد البنكي وصناديق الاستثمار العقاري',
      'التنبؤ بموعد اكتمال الأعمال الحرجة وتفادي التعثر',
    ],
    whatWeKnowEn: [
      'Certified disbursement tier matching physical milestones',
      'Audit-ready compliance dossiers for banks and funds',
      'Predictive completion curves preventing timeline slip',
    ],
    stripImages: [
      {
        src: '/assets/methodology/21-real-crane-structure-progress.jpg',
        captionAr: 'توثيق سلامة واكتمال القطاعات الحرجة',
        captionEn: 'Critical structural milestones verification',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/24-real-building-and-tower-crane.jpg',
        captionAr: 'مؤشرات وتيرة التشييد بالارتفاعات',
        captionEn: 'Vertical ascent velocity indicators',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/25-real-crane-and-concrete-structure.jpg',
        captionAr: 'تقييم جاهزية الواجهات والإغلاق الخارجي',
        captionEn: 'Envelope closure readiness assessment',
        type: 'supporting',
      },
    ],
  },
  {
    id: 7,
    titleAr: 'التسليم والتشغيل',
    titleEn: 'Handover & Operations',
    dominantImage: '/assets/methodology/14-real-completed-residential-green-space.jpg',
    explanationAr: 'اكتمال أعمال التشطيب والتنسيق العام للموقع، وإصدار شهادات الإشغال والتحول إلى مرحلة التشغيل المستمر.',
    explanationEn: 'Finalizing landscaping, exterior works, municipal occupancy certification, and long-term asset operation.',
    whatWeKnowAr: [
      'اكتمال الغطاء الأخضر والمرافق الخدمية ومواقف السيارات',
      'ربط شبكات الخدمات العامة وتفعيل مداخل الموقع النهائية',
      'جاهزية الأصل لإدارة المرافق والتسليم النهائي للملاك',
    ],
    whatWeKnowEn: [
      'Completed green landscaping, plazas, and parking',
      'Full utility commissioning and permanent access activation',
      'Facility management operational readiness for owners',
    ],
    stripImages: [
      {
        src: '/assets/methodology/18-real-tower-crane-building-progress.jpg',
        captionAr: 'تفكيك الرافعات وانتهاء الأعمال الإنشائية الرئيسية',
        captionEn: 'Crane demobilization and core completion',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/19-real-construction-site-road-access.jpg',
        captionAr: 'تأهيل وتعبيد المداخل المؤدية للأصل',
        captionEn: 'Access road paved and commissioned',
        type: 'supporting',
      },
      {
        src: '/assets/methodology/22-real-highway-and-construction-site.jpg',
        captionAr: 'اندماج المشروع النهائي في الحركة المرورية',
        captionEn: 'Smooth transit integration and highway link',
        type: 'supporting',
      },
    ],
  },
];

// ----------------------------------------------------------------------
// 2. MAIN VISUAL EVIDENCE SECTION DATA
// ----------------------------------------------------------------------
const EVIDENCE_STAGES: EvidenceStage[] = [
  {
    id: 'stage-1',
    labelAr: 'بداية الأعمال',
    labelEn: 'Work Inception',
    image: '/assets/methodology/01-site-preparation-satellite.jpg',
    timeframeAr: 'المرحلة 01 • خط الأساس الفضائي',
    timeframeEn: 'Phase 01 • Satellite Baseline',
    annotations: [
      {
        id: 'ann-1-1',
        labelAr: 'منطقة تجهيز الموقع',
        labelEn: 'Site Staging Area',
        x: 48,
        y: 45,
        cropBox: { x: 45, y: 40, zoom: 2.2 },
        descAr: 'تحديد حدود التشوين الأولية وبداية تهيئة التربة للمسارات الخدمية.',
        descEn: 'Initial boundary staging and access trail clearing.',
      },
      {
        id: 'ann-1-2',
        labelAr: 'طرق وممرات داخل الموقع',
        labelEn: 'Haul Road Corridors',
        x: 68,
        y: 58,
        cropBox: { x: 65, y: 55, zoom: 2.4 },
        descAr: 'شق الطرق الترابية اللوجستية وتأمين مسار دخول المعدات الثقيلة.',
        descEn: 'Earthwork trails established for heavy haulage access.',
      },
    ],
  },
  {
    id: 'stage-2',
    labelAr: 'تجهيز الموقع',
    labelEn: 'Site Mobilization',
    image: '/assets/methodology/03-construction-progress-aerial.jpg',
    timeframeAr: 'المرحلة 02 • تسوية وحفر القواعد',
    timeframeEn: 'Phase 02 • Grading & Foundations',
    annotations: [
      {
        id: 'ann-2-1',
        labelAr: 'معدات تسوية وحفر',
        labelEn: 'Excavation & Grading',
        x: 38,
        y: 36,
        cropBox: { x: 35, y: 32, zoom: 2.5 },
        descAr: 'انتشار الحفارات والبلدوزرات لقص وتجهيز مناسيب التأسيس المعتمدة.',
        descEn: 'Excavators and dozers deployed for foundation cutting.',
      },
      {
        id: 'ann-2-2',
        labelAr: 'هياكل ومبانٍ تحت الإنشاء',
        labelEn: 'Substructure Footprints',
        x: 62,
        y: 52,
        cropBox: { x: 60, y: 48, zoom: 2.3 },
        descAr: 'بدء صب الخرسانة العادية وقواعد المباني في القطاعات الأولى.',
        descEn: 'Blinding concrete and preliminary footings poured.',
      },
      {
        id: 'ann-2-3',
        labelAr: 'طرق وممرات داخل الموقع',
        labelEn: 'Circulation Grid',
        x: 52,
        y: 68,
        cropBox: { x: 50, y: 65, zoom: 2.2 },
        descAr: 'اكتمال ربط المحاور الداخلية لتسهيل تدفق شاحنات الخرسانة الجاهزة.',
        descEn: 'Internal logistics grid connected for transit-mixers.',
      },
    ],
  },
  {
    id: 'stage-3',
    labelAr: 'تنفيذ وإنشاء',
    labelEn: 'Execution & Cranes',
    image: '/assets/methodology/04-equipment-and-cranes-aerial.jpg',
    timeframeAr: 'المرحلة 03 • ذروة الأعمال الإنشائية',
    timeframeEn: 'Phase 03 • Peak Construction',
    annotations: [
      {
        id: 'ann-3-1',
        labelAr: 'رافعة وأعمال رفع',
        labelEn: 'Tower Crane Operations',
        x: 44,
        y: 38,
        cropBox: { x: 42, y: 35, zoom: 2.6 },
        descAr: 'تشغيل الرافعات البرجية لرفع حديد التسليح وقوالب الشدات المعدنية.',
        descEn: 'Active tower crane lifting rebar bundles and formwork.',
      },
      {
        id: 'ann-3-2',
        labelAr: 'شاحنات نقل',
        labelEn: 'Haulage & Concrete Trucks',
        x: 65,
        y: 62,
        cropBox: { x: 62, y: 58, zoom: 2.4 },
        descAr: 'حركة مستمرة لشاحنات التوريد ومضخات الخرسانة حول الأعمدة الحية.',
        descEn: 'Continuous supply truck flow and boom pump operations.',
      },
      {
        id: 'ann-3-3',
        labelAr: 'هياكل ومبانٍ تحت الإنشاء',
        labelEn: 'Vertical Structures',
        x: 32,
        y: 54,
        cropBox: { x: 30, y: 50, zoom: 2.3 },
        descAr: 'اكتمال صب الطوابق السفلية وبدء تصاعد الأدوار المتكررة.',
        descEn: 'Podium floors completed and typical levels rising.',
      },
    ],
  },
  {
    id: 'stage-4',
    labelAr: 'مرحلة متقدمة',
    labelEn: 'Advanced Stage',
    image: '/assets/methodology/05-advanced-construction-satellite.jpg',
    timeframeAr: 'المرحلة 04 • اكتمال الهيكل والتشطيبات',
    timeframeEn: 'Phase 04 • Structural Envelope',
    annotations: [
      {
        id: 'ann-4-1',
        labelAr: 'هياكل ومبانٍ تحت الإنشاء',
        labelEn: 'Completed Envelopes',
        x: 46,
        y: 44,
        cropBox: { x: 44, y: 40, zoom: 2.2 },
        descAr: 'اكتمال الهياكل الخرسانية الرئيسية وظهور الكتل المعمارية بوضوح فضائي.',
        descEn: 'Main concrete frame closed out and roof levels completed.',
      },
      {
        id: 'ann-4-2',
        labelAr: 'طرق وممرات داخل الموقع',
        labelEn: 'Paved Perimeter Roads',
        x: 66,
        y: 35,
        cropBox: { x: 63, y: 32, zoom: 2.4 },
        descAr: 'تعبيد الطرق المحيطة وربط الموقع بالشبكة المرورية الرئيسية للمدينة.',
        descEn: 'Paved perimeter network integrated into municipal traffic.',
      },
      {
        id: 'ann-4-3',
        labelAr: 'منطقة تجهيز الموقع',
        labelEn: 'Landscape & Public Realm',
        x: 30,
        y: 60,
        cropBox: { x: 28, y: 56, zoom: 2.3 },
        descAr: 'بدء أعمال التنسيق والتشجير وإزالة مكاتب وسياج المقاول المؤقت.',
        descEn: 'Landscape works active; temporary cabins demobilized.',
      },
    ],
  },
];

// ----------------------------------------------------------------------
// 3. INTELLIGENCE BOARD DATA (6 DIMENSIONS)
// ----------------------------------------------------------------------
const INTELLIGENCE_DIMENSIONS: IntelligenceDimension[] = [
  {
    id: 'boundaries',
    titleAr: 'حدود الأرض وقطعة الأصل',
    titleEn: 'Land Boundaries & Parcel Audit',
    image: '/assets/methodology/07-generated-land-planning-green-corridor.png',
    relatedImage: '/assets/methodology/23-real-rural-site-monitoring.jpg',
    explanationAr: 'رصد خطوط الكنتور وحرمات الطرق، ومطابقة إحداثيات الصك الهندسي على الواقع الجغرافي دون تداخل.',
    explanationEn: 'Georeferencing statutory title deed polygons against ground reality to eliminate perimeter overlap risk.',
    indicatorAr: 'مطابقة الإحداثيات: 100% موثقة مكانياً',
    indicatorEn: 'Spatial Deed Match: 100% Verified',
    whyItMattersAr: 'يمنع التعدي والتداخلات العقارية ويضمن سلامة الصك واستحقاق الرخص قبل ضخ رأس المال.',
    whyItMattersEn: 'Eliminates legal boundary disputes and validates statutory setbacks prior to capital deployment.',
  },
  {
    id: 'earthworks',
    titleAr: 'أعمال الحفر والتسوية',
    titleEn: 'Earthworks & Grading',
    image: '/assets/methodology/09-real-road-roller-and-excavator.jpg',
    relatedImage: '/assets/methodology/11-real-excavators-roadworks.jpg',
    explanationAr: 'حساب حجوم القطع والردم، وتوثيق استواء المناسيب وفحص طبقات التربة الأساسية والدمك الميكانيكي.',
    explanationEn: 'Quantifying volumetric cut and fill balance, subgrade soil testing, and mechanical compaction stages.',
    indicatorAr: 'إزاحة كتل التربة: تتبع مساحي دوري دقيق',
    indicatorEn: 'Earthwork Balance: Survey-Grade Audit',
    whyItMattersAr: 'التأكد من جاهزية طبقة التأسيس وتفادي الهبوط المستقبلي للأساسات أو تجاوز ميزانيات التسوية.',
    whyItMattersEn: 'Prevents foundation differential settlement and protects budgets from unauthorized earthwork overruns.',
  },
  {
    id: 'machinery',
    titleAr: 'المعدات والمركبات',
    titleEn: 'Machinery & Equipment Fleet',
    image: '/assets/methodology/06-generated-saudi-construction-equipment.png',
    relatedImage: '/assets/methodology/10-real-heavy-equipment-overview.jpg',
    explanationAr: 'رصد كثافة وتوزيع الآليات الثقيلة (الرافعات، الحفارات، شاحنات الصب والمداحل) في قطاعات الموقع.',
    explanationEn: 'Tracking heavy fleet distribution—tower cranes, excavators, transit mixers—across active work zones.',
    indicatorAr: 'جاهزية الأسطول: نشاط ميداني مستمر',
    indicatorEn: 'Fleet Readiness: Daily Monitored Density',
    whyItMattersAr: 'مؤشر فوري على وتيرة عمل المقاول؛ انخفاض المعدات يعطي إنذاراً مبكراً قبل تأخر الجدول الزمني.',
    whyItMattersEn: 'Direct proxy for contractor commitment; sudden demobilization triggers early delay warning.',
  },
  {
    id: 'structures',
    titleAr: 'المباني والهياكل',
    titleEn: 'Superstructure & Buildings',
    image: '/assets/methodology/16-real-concrete-tower-under-construction.jpg',
    relatedImage: '/assets/methodology/17-real-high-rise-construction-crane.jpg',
    explanationAr: 'متابعة الهيكل الإنشائي وصب الأعمدة والأسقف وارتفاع الطوابق تدريجياً وفق المعايير الهندسية.',
    explanationEn: 'Auditing vertical reinforced concrete ascent, slab cycles, and structural core completion rates.',
    indicatorAr: 'نمو الهيكل الخرساني: تطور رأسي موثق',
    indicatorEn: 'Vertical Ascent: Verified Milestone Cycle',
    whyItMattersAr: 'ربط دفعات التمويل البنكي بنسب الإنجاز الإنشائي الملموسة على أرض الواقع دون اعتماد على التقديرات.',
    whyItMattersEn: 'Ties institutional bank drawdowns strictly to physical structural completion rather than contractor claims.',
  },
  {
    id: 'roads',
    titleAr: 'الطرق والخدمات',
    titleEn: 'Access Roads & Utilities',
    image: '/assets/methodology/13-real-road-construction.jpg',
    relatedImage: '/assets/methodology/22-real-highway-and-construction-site.jpg',
    explanationAr: 'تتبع شق وتعبيد الشوارع الداخلية ومد شبكات المياه والصرف والكهرباء والإنارة لتغذية المشروع.',
    explanationEn: 'Monitoring internal road profiling, asphalt paving, and sub-surface utility grid trenching and hookups.',
    indicatorAr: 'محاور الربط: شبكة طرق معتمدة',
    indicatorEn: 'Transit Connectivity: Commissioned Corridors',
    whyItMattersAr: 'ضمان سلاسة حركة الآليات وتفادي عزل المشروع أو تأخر إيصال الخدمات الحيوية عند الجاهزية.',
    whyItMattersEn: 'Guarantees reliable logistical ingress and prevents handover delays caused by late utility connections.',
  },
  {
    id: 'landscape',
    titleAr: 'المساحات الخضراء والمرافق',
    titleEn: 'Public Realm & Green Corridors',
    image: '/assets/methodology/14-real-completed-residential-green-space.jpg',
    relatedImage: '/assets/methodology/15-real-urban-construction-progress.jpg',
    explanationAr: 'رصد التشجير، والأرصفة، وممرات المشاة، وتنسيق الموقع العام والمرافق المجتمعية المفتوحة.',
    explanationEn: 'Tracking urban tree canopy planting, pedestrian boulevards, hardscape plazas, and civic amenities.',
    indicatorAr: 'اكتمال الغطاء الأخضر: مؤشرات بيئية مستدامة',
    indicatorEn: 'Green Cover Ratio: Sustainable Living Standard',
    whyItMattersAr: 'رفع القيمة السوقية والتأجيرية للأصل وتسريع إصدار شهادات إتمام البناء ورضا الساكنين.',
    whyItMattersEn: 'Drives end-asset valuation and rental premiums while enabling municipal occupancy certification.',
  },
];

// ----------------------------------------------------------------------
// 4. CONSTRUCTION PROGRESS CINEMA (IMAGES 16-25)
// ----------------------------------------------------------------------
const CINEMA_SLIDES: CinemaSlide[] = [
  {
    id: 16,
    labelAr: 'هيكل إنشائي',
    labelEn: 'Concrete Structure Framing',
    subLabelAr: 'تصاعد القوالب الخرسانية والأعمدة الحاملة',
    subLabelEn: 'Formwork climbing and load-bearing column casting',
    image: '/assets/methodology/16-real-concrete-tower-under-construction.jpg',
    descAr: 'توثيق دقة صب الأدوار السفلية والأسقف الخرسانية وسلامة التدعيم الإنشائي المؤقت.',
    descEn: 'Documenting reinforced concrete casting, structural integrity, and falsework stability.',
  },
  {
    id: 17,
    labelAr: 'رافعات وأعمال ارتفاع',
    labelEn: 'High-Rise Tower Crane',
    subLabelAr: 'تشغيل الرافعات البرجية للأعمال الشاهقة',
    subLabelEn: 'Heavy lifting operations at high-rise altitudes',
    image: '/assets/methodology/17-real-high-rise-construction-crane.jpg',
    descAr: 'رصد دورات الرفع اليومية للمواد الثقيلة والواجهات الزجاجية ومطابقة معايير السلامة المهنية.',
    descEn: 'Monitoring daily crane hoist cycles and high-altitude safety compliance across work zones.',
  },
  {
    id: 18,
    labelAr: 'متابعة الارتفاع وتطور الطوابق',
    labelEn: 'Vertical Ascent Velocity',
    subLabelAr: 'إغلاق الطوابق المتكررة وتجهيز السطح',
    subLabelEn: 'Typical floor envelope and rooftop plant levels',
    image: '/assets/methodology/18-real-tower-crane-building-progress.jpg',
    descAr: 'تتبع معدل استكمال الطابق وتوزيع الشدات المعدنية وسرعة انتقال العمالة بين الأدوار.',
    descEn: 'Tracking floor cycle turnaround times and vertical labor allocation across elevations.',
  },
  {
    id: 19,
    labelAr: 'طرق ووصول للموقع',
    labelEn: 'Site Logistics & Ingress',
    subLabelAr: 'تأمين المداخل ومسارات التوريد الميداني',
    subLabelEn: 'Supply haulage corridors and heavy vehicle ingress',
    image: '/assets/methodology/19-real-construction-site-road-access.jpg',
    descAr: 'توثيق سلامة مداخل الشاحنات وانسيابية الحركة اللوجستية دون تعطيل الطرق المحيطة بالموقع.',
    descEn: 'Ensuring uninterrupted supply traffic without obstructing adjacent municipal thoroughfares.',
  },
  {
    id: 20,
    labelAr: 'بنية تحتية وكثافة عمرانية',
    labelEn: 'Urban Context & Traffic',
    subLabelAr: 'اندماج المشروع في الشريان المروري الحضري',
    subLabelEn: 'Integrating project access into urban traffic arteries',
    image: '/assets/methodology/20-real-urban-construction-and-traffic.jpg',
    descAr: 'قياس أثر التشييد على الكثافة المرورية وضمان جاهزية التحويلات والمخارج النظامية.',
    descEn: 'Measuring traffic impact and ensuring certified turning lanes and detour safety.',
  },
  {
    id: 21,
    labelAr: 'هياكل ومعدات ثقيلة',
    labelEn: 'Crane Structural Assembly',
    subLabelAr: 'تثبيت الساريات وتوزيع الأحمال الإنشائية',
    subLabelEn: 'Mast tying and crane anchor load distribution',
    image: '/assets/methodology/21-real-crane-structure-progress.jpg',
    descAr: 'رصد تثبيت ساريات الرافعات على الهياكل الرئيسية وفحص نقاط الارتكاز الميكانيكية.',
    descEn: 'Auditing crane anchor points tied into concrete floor slabs for high-tier stability.',
  },
  {
    id: 22,
    labelAr: 'محاور الحركة والربط السريع',
    labelEn: 'Highway & Arterial Links',
    subLabelAr: 'ربط الأصل بالطرق السريعة والمحاور الرئيسية',
    subLabelEn: 'Connecting project perimeter to arterial expressways',
    image: '/assets/methodology/22-real-highway-and-construction-site.jpg',
    descAr: 'متابعة تهيئة التقاطعات والمخارج السريعة لضمان سهولة الوصول المستقبلي لرواد الموقع.',
    descEn: 'Validating interchange ramps and feeder roads for friction-free future tenant access.',
  },
  {
    id: 23,
    labelAr: 'رصد الموقع والمحيط الجغرافي',
    labelEn: 'Geographic Perimeter Survey',
    subLabelAr: 'مراقبة خطوط الأفق والتضاريس المحيطة',
    subLabelEn: 'Perimeter topography and regional environmental monitoring',
    image: '/assets/methodology/23-real-rural-site-monitoring.jpg',
    descAr: 'توثيق حدود الأصل في سياقه البيئي الأوسع ورصد أي تغيرات تضاريسية أو سيول محتملة.',
    descEn: 'Comprehensive macro-environmental overview verifying runoff buffers and land stability.',
  },
  {
    id: 24,
    labelAr: 'تنسيق وتشغيل إنشائي',
    labelEn: 'Building Completion Phase',
    subLabelAr: 'اكتمال الواجهات وبدء تفكيك معدات البناء',
    subLabelEn: 'Façade glazing completion and crane demobilization',
    image: '/assets/methodology/24-real-building-and-tower-crane.jpg',
    descAr: 'متابعة أعمال الكسوة الخارجية وعزل المباني تمهيداً لإزالة الروافع وتسليم الواجهات.',
    descEn: 'Tracking exterior architectural cladding and thermal insulation prior to crane removal.',
  },
  {
    id: 25,
    labelAr: 'تسليم أصل وتكامل الهيكل',
    labelEn: 'Structural Delivery & Closeout',
    subLabelAr: 'الجاهزية التامة للهيكل والأعمال الخارجية',
    subLabelEn: 'Fully closed-out structure ready for interior fitout',
    image: '/assets/methodology/25-real-crane-and-concrete-structure.jpg',
    descAr: 'توثيق اكتمال الهيكل الخرساني بالكامل وجاهزية الأصل للتشطيبات الداخلية والتشغيل.',
    descEn: 'Certified structural completion milestone ready for interior fitouts and commissioning.',
  },
];

// ----------------------------------------------------------------------
// HERO ROTATING BACKGROUND SCENES (Same concept as Our Work page)
// ----------------------------------------------------------------------
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
    id: 'satellite-orbit',
    labelAr: 'الرصد بالأقمار الصناعية',
    labelEn: 'Satellite Earth Orbit',
    src: '/assets/methodology/satellite-orbit-earth.jpg',
    tagAr: 'مدار الرصد الفضائي • تصوير مستمر',
    tagEn: 'Satellite Orbit • Continuous Surveillance',
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
    id: '01-baseline',
    labelAr: 'خط الأساس الفضائي',
    labelEn: 'Satellite Baseline',
    src: '/assets/methodology/01-site-preparation-satellite.jpg',
    tagAr: '01 • تدقيق حدود الأرض وخط الأساس',
    tagEn: '01 • Land Boundary Baseline',
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
    id: 'skyline-urban',
    labelAr: 'أفق الرياض وتكامل الأصول',
    labelEn: 'Capital Skyline & Urban Assets',
    src: '/images_webp/02-riyadh-skyline-city.webp',
    tagAr: 'أفق العاصمة • تكامل النسيج الحضري',
    tagEn: 'Capital Skyline • Urban Fabric',
  },
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
export function MethodologyPage({ onNavigate }: MethodologyPageProps) {
  const { isAr } = useLanguage();

  // --- Hero Rotating Background State (Matching "Our Work" Page) ---
  const [currentBgIndex, setCurrentBgIndex] = useState<number>(0);
  const [isHeroLoaded, setIsHeroLoaded] = useState<boolean>(false);
  const activeHeroBg = HERO_BACKGROUNDS[currentBgIndex];

  // Auto-switch hero background images smoothly every 6 seconds, like the "Our Work" page
  useEffect(() => {
    setIsHeroLoaded(true);
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // --- Hero Hotspots State ---
  const [activeHeroHotspot, setActiveHeroHotspot] = useState<number | null>(null);

  // --- Journey State ---
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const activeStage = SEVEN_STAGES.find((s) => s.id === activeStageId) || SEVEN_STAGES[0];
  // --- Evidence Section State ---
  const [activeEvidenceStageIndex, setActiveEvidenceStageIndex] = useState<number>(0);
  const [isBeforeAfterMode, setIsBeforeAfterMode] = useState<boolean>(false);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);
  const [isEvidenceZoomed, setIsEvidenceZoomed] = useState<boolean>(false);
  const isDraggingSlider = useRef<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // --- Intelligence Board State ---
  const [activeDimensionId, setActiveDimensionId] = useState<string>('boundaries');
  const activeDimension =
    INTELLIGENCE_DIMENSIONS.find((d) => d.id === activeDimensionId) || INTELLIGENCE_DIMENSIONS[0];

  // --- Cinema Section State ---
  const [cinemaIndex, setCinemaIndex] = useState<number>(0);
  const currentCinemaSlide = CINEMA_SLIDES[cinemaIndex];

  // --- Methodology evidence library state ---
  const [workGalleryCategory, setWorkGalleryCategory] = useState<WorkGalleryCategory | 'all'>('all');
  const [workGalleryLightboxIndex, setWorkGalleryLightboxIndex] = useState<number | null>(null);
  const visibleWorkGalleryItems = WORK_GALLERY_ITEMS.filter(
    (item) => workGalleryCategory === 'all' || item.category === workGalleryCategory,
  );

  // --- Lightbox Modal State ---
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; subtitle?: string } | null>(null);

  // Handle keyboard navigation for cinema & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (workGalleryLightboxIndex !== null) {
        if (e.key === 'Escape') setWorkGalleryLightboxIndex(null);
        if (e.key === 'ArrowLeft') {
          setWorkGalleryLightboxIndex((current) =>
            current === null ? null : (current - 1 + visibleWorkGalleryItems.length) % visibleWorkGalleryItems.length,
          );
        }
        if (e.key === 'ArrowRight') {
          setWorkGalleryLightboxIndex((current) =>
            current === null ? null : (current + 1) % visibleWorkGalleryItems.length,
          );
        }
        return;
      }
      if (lightboxImage) {
        if (e.key === 'Escape') setLightboxImage(null);
        return;
      }
      if (e.key === 'ArrowLeft') {
        if (isAr) {
          setCinemaIndex((prev) => (prev < CINEMA_SLIDES.length - 1 ? prev + 1 : prev));
        } else {
          setCinemaIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
      } else if (e.key === 'ArrowRight') {
        if (isAr) {
          setCinemaIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else {
          setCinemaIndex((prev) => (prev < CINEMA_SLIDES.length - 1 ? prev + 1 : prev));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, isAr, visibleWorkGalleryItems.length, workGalleryLightboxIndex]);

  // Handle Before/After drag
  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isDraggingSlider.current && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
      }
    },
    [handleSliderMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDraggingSlider.current) {
        handleSliderMove(e.clientX);
      }
    },
    [handleSliderMove]
  );

  const stopDragging = useCallback(() => {
    isDraggingSlider.current = false;
  }, []);

  const activeEvidence = EVIDENCE_STAGES[activeEvidenceStageIndex];
  const selectedAnnotation = activeEvidence.annotations.find((a) => a.id === selectedAnnotationId);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900" dir={isAr ? 'rtl' : 'ltr'}>
      {/* ---------------------------------------------------------------- */}
      {/* 1. IMMERSIVE HERO: FROM LAND TO OPERATION (ROTATING SCENES)      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white min-h-[580px] flex flex-col justify-center pt-6 pb-14 lg:pt-10 lg:pb-18">
        
        {/* Crystal-Clear Background Images with smooth automatic crossfade transition (Same concept as Our Work page) */}
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

        {/* Gentle ambient gradient (only 25-45% opacity) so the clear background image shines through vividly */}
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
          
          {/* Top Bar: Scene Indicator & Auto-Rotating Tabs */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'مشهد الرصد الميداني والفضائي:' : 'Observation Scene:'}</span>
              <span className="rounded-md bg-slate-950/70 px-2.5 py-0.5 font-mono text-[11px] text-sky-200 border border-sky-500/40 backdrop-blur-md shadow-xs">
                {isAr ? activeHeroBg.tagAr : activeHeroBg.tagEn}
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

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* RIGHT SIDE (Arabic text): Clear, high-impact message with transparent glass backdrop */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="rounded-3xl border border-white/20 bg-slate-950/45 p-6 sm:p-7 shadow-2xl backdrop-blur-md">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/80 px-3.5 py-1.5 text-xs font-semibold text-sky-300 shadow-xs backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>{isAr ? 'منهجية عين سيجام لمتابعة الأصل العقاري' : 'Ain Sijam Asset Tracking Methodology'}</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[40px] lg:leading-[1.18] drop-shadow-md">
                  {isAr ? (
                    <>
                      من الأرض إلى التشغيل…
                      <span className="block text-sky-400">نتابع كل ما يهم القرار</span>
                    </>
                  ) : (
                    <>
                      From Land to Operations…
                      <span className="block text-sky-400">We Track What Drives Decisions</span>
                    </>
                  )}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-slate-100 sm:text-lg drop-shadow-sm font-medium">
                  {isAr
                    ? 'نربط بيانات الأرض والتخطيط والمقاول والمعدات وصور الأقمار الصناعية والتقارير في سجل واحد واضح وقابل للتحقق.'
                    : 'We connect parcel records, zoning plans, contractor mobilization, machinery fleets, satellite imagery, and executive audits into one transparent, verifiable audit trail.'}
                </p>

                {/* Three compact proof points in glass cards */}
                <div className="mt-6 grid grid-cols-3 gap-2.5 border-y border-white/15 py-3.5">
                  <div className="flex flex-col gap-1 rounded-xl bg-slate-900/60 p-2.5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                      <Compass className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                      <span>{isAr ? 'متابعة مكانية وزمنية' : 'Spatial & Temporal'}</span>
                    </div>
                    <span className="text-[10px] text-slate-200">
                      {isAr ? 'أقمار صناعية وتصوير جوي' : 'Satellites & aerial runs'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 rounded-xl bg-slate-900/60 p-2.5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                      <Activity className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                      <span>{isAr ? 'رصد عناصر الموقع' : 'Site Element Census'}</span>
                    </div>
                    <span className="text-[10px] text-slate-200">
                      {isAr ? 'الآليات والإنشاءات والتربة' : 'Fleet, civil works & grading'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 rounded-xl bg-slate-900/60 p-2.5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                      <FileCheck className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                      <span>{isAr ? 'تقارير تدعم القرار' : 'Executive Governance'}</span>
                    </div>
                    <span className="text-[10px] text-slate-200">
                      {isAr ? 'صرف مالي مدعوم بالواقع' : 'Disbursements tied to fact'}
                    </span>
                  </div>
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#asset-journey"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-sky-600/30 transition-all hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/35 active:scale-[0.98]"
                  >
                    <span>{isAr ? 'استكشف رحلة الأصل' : 'Explore Asset Journey'}</span>
                    {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-white/50 hover:bg-slate-800/90 backdrop-blur-md"
                  >
                    <ShieldCheck className="h-4 w-4 text-sky-400" />
                    <span>{isAr ? 'طلب استشارة مساحية' : 'Request Site Audit'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* LEFT SIDE: Hero Visual with 3 Interactive Hotspot Markers */}
            <div className="lg:col-span-7 xl:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 p-1.5 shadow-2xl shadow-slate-950/60 backdrop-blur-sm">
                
                {/* Visual Container */}
                <div className="group relative aspect-16/10 w-full overflow-hidden rounded-xl bg-slate-950 sm:aspect-16/11">
                  <img
                    src="/assets/methodology/04-equipment-and-cranes-aerial.jpg"
                    alt={isAr ? 'رصد الآليات والرافعات الإنشائية - عين سيجام' : 'Ain Sijam Aerial Fleet Monitoring'}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />

                  {/* Gradient Vignette for Readability */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />

                  {/* Live Badge Top Right */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md border border-white/10">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isAr ? 'مسح جوي موثق • دقة عالية' : 'Verified Aerial Audit • High Resolution'}</span>
                  </div>

                  {/* Expand Lightbox Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImage({
                        src: '/assets/methodology/04-equipment-and-cranes-aerial.jpg',
                        title: isAr ? 'رصد الآليات والرافعات ومسارات العمل' : 'Equipment & Cranes Aerial Survey',
                        subtitle: isAr ? 'مسح جوي عالي الدقة يوضح توزيع المعدات الثقيلة بموقع المشروع' : 'High-resolution aerial scan detailing heavy fleet distribution',
                      })
                    }
                    className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-white/80 backdrop-blur-md border border-white/10 transition hover:bg-slate-900 hover:text-white"
                    title={isAr ? 'عرض ملء الشاشة' : 'Full Screen'}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>

                  {/* ---------------------------------------------------- */}
                  {/* HOTSPOT 1: المعدات (Cranes & Fleet)                  */}
                  {/* ---------------------------------------------------- */}
                  <div className="absolute top-[38%] left-[44%] z-20">
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setActiveHeroHotspot(1)}
                        onMouseLeave={() => setActiveHeroHotspot(null)}
                        onClick={() => setActiveHeroHotspot(activeHeroHotspot === 1 ? null : 1)}
                        className="group/btn flex items-center gap-2 rounded-full border-2 border-white bg-sky-600 px-3 py-1 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                      >
                        <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                        <span>{isAr ? 'المعدات' : 'Equipment'}</span>
                      </button>

                      {/* Small image crop popup (not a large tooltip) */}
                      {activeHeroHotspot === 1 && (
                        <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 w-44 overflow-hidden rounded-xl border border-sky-400/50 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95">
                          <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-800">
                            <img
                              src="/assets/methodology/04-equipment-and-cranes-aerial.jpg"
                              alt="Crop"
                              className="h-full w-full object-cover scale-[2.8] origin-[45%_38%]"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-sky-400/40 rounded-lg" />
                          </div>
                          <p className="mt-1.5 text-center text-[11px] font-semibold text-sky-200">
                            {isAr ? 'رافعات برجية وآليات صب' : 'Tower cranes & concrete boom'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* HOTSPOT 2: أعمال الإنشاء (Civil Construction)        */}
                  {/* ---------------------------------------------------- */}
                  <div className="absolute top-[52%] left-[28%] z-20">
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setActiveHeroHotspot(2)}
                        onMouseLeave={() => setActiveHeroHotspot(null)}
                        onClick={() => setActiveHeroHotspot(activeHeroHotspot === 2 ? null : 2)}
                        className="group/btn flex items-center gap-2 rounded-full border-2 border-white bg-sky-600 px-3 py-1 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                      >
                        <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                        <span>{isAr ? 'أعمال الإنشاء' : 'Civil Works'}</span>
                      </button>

                      {activeHeroHotspot === 2 && (
                        <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 w-44 overflow-hidden rounded-xl border border-sky-400/50 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95">
                          <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-800">
                            <img
                              src="/assets/methodology/04-equipment-and-cranes-aerial.jpg"
                              alt="Crop"
                              className="h-full w-full object-cover scale-[2.6] origin-[28%_52%]"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-sky-400/40 rounded-lg" />
                          </div>
                          <p className="mt-1.5 text-center text-[11px] font-semibold text-sky-200">
                            {isAr ? 'صب القواعد وتصاعد الأعمدة' : 'Substructure & column casting'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* HOTSPOT 3: تطور الموقع (Site Logistics/Roads)        */}
                  {/* ---------------------------------------------------- */}
                  <div className="absolute top-[65%] left-[62%] z-20">
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setActiveHeroHotspot(3)}
                        onMouseLeave={() => setActiveHeroHotspot(null)}
                        onClick={() => setActiveHeroHotspot(activeHeroHotspot === 3 ? null : 3)}
                        className="group/btn flex items-center gap-2 rounded-full border-2 border-white bg-sky-600 px-3 py-1 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                      >
                        <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                        <span>{isAr ? 'تطور الموقع' : 'Site Evolution'}</span>
                      </button>

                      {activeHeroHotspot === 3 && (
                        <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 w-44 overflow-hidden rounded-xl border border-sky-400/50 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95">
                          <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-800">
                            <img
                              src="/assets/methodology/04-equipment-and-cranes-aerial.jpg"
                              alt="Crop"
                              className="h-full w-full object-cover scale-[2.7] origin-[62%_65%]"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-sky-400/40 rounded-lg" />
                          </div>
                          <p className="mt-1.5 text-center text-[11px] font-semibold text-sky-200">
                            {isAr ? 'ممرات الشاحنات ومناطق التشوين' : 'Haulage corridors & staging'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Image Caption Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 pt-8">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {isAr ? 'الأصل قيد الرصد الميداني والفضائي' : 'Asset Under Continuous Observation'}
                        </span>
                        <span className="hidden sm:inline text-slate-400">•</span>
                        <span className="hidden sm:inline text-slate-400">
                          {isAr ? 'مسح دوري لمطابقة نسب الإنجاز' : 'Periodic multi-source validation'}
                        </span>
                      </div>
                      <span className="font-mono text-sky-400 text-[11px]">SIGAM-ASSET-04</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. INTERACTIVE SEVEN-STAGE JOURNEY                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="asset-journey" className="scroll-mt-16 border-b border-slate-200 bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              {isAr ? 'دورة حياة الأصل العقاري' : 'Asset Lifecycle Timeline'}
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">
              {isAr ? 'رحلة الأصل عبر سبع محطات رئيسية' : 'The Seven Stages of Asset Intelligence'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              {isAr
                ? 'نرافق الأصل العقاري في كل مرحلة من لحظة فحص الأرض وحتى تسليم المفاتيح وتشغيل المرافق.'
                : 'Tracking every transition from pre-purchase land checks to tenant occupancy.'}
            </p>

          </div>

          {/* Journey controls stay at their normal size; only the switched visual is scaled. */}
          <div>
            {/* DESKTOP TIMELINE NAVIGATOR (Horizontal Connected Bar) */}
            <div className="mt-6 sm:mt-8 hidden lg:block">
              <div className="relative">
                {/* Connecting Background Line */}
                <div className="absolute top-4.5 inset-x-8 h-0.5 bg-slate-200" />
                
                {/* Animated Progress Line */}
                <div
                  className="absolute top-4.5 right-8 h-0.5 bg-sky-600 transition-all duration-500"
                  style={{
                    width: isAr
                      ? `${((activeStageId - 1) / (SEVEN_STAGES.length - 1)) * 100}%`
                      : 'auto',
                    left: isAr ? 'auto' : '2rem',
                    right: isAr ? '2rem' : 'auto',
                  }}
                />

                {/* Stage Buttons */}
                <div className="relative z-10 grid grid-cols-7 gap-2">
                  {SEVEN_STAGES.map((stage) => {
                    const isActive = stage.id === activeStageId;
                    const isCompleted = stage.id < activeStageId;

                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setActiveStageId(stage.id)}
                        className="group flex flex-col items-center text-center transition-all focus:outline-hidden cursor-pointer"
                      >
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-xs transition-all duration-300 ${
                            isActive
                              ? 'bg-sky-600 text-white ring-4 ring-sky-100 scale-110 shadow-md'
                              : isCompleted
                              ? 'bg-sky-100 text-sky-800 border border-sky-300 hover:bg-sky-200'
                              : 'bg-white text-slate-600 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="h-4 w-4 text-sky-700" /> : stage.id}
                        </div>

                        <span
                          className={`mt-2 text-xs font-bold transition-colors ${
                            isActive ? 'text-sky-700' : 'text-slate-600 group-hover:text-slate-900'
                          }`}
                        >
                          {isAr ? stage.titleAr : stage.titleEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MOBILE TIMELINE SELECTOR (Horizontal Scroll Pill Bar) */}
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:hidden no-scrollbar">
              {SEVEN_STAGES.map((stage) => {
                const isActive = stage.id === activeStageId;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStageId(stage.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-700 text-white shadow-md'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white text-sky-700' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {stage.id}
                    </span>
                    <span>{isAr ? stage.titleAr : stage.titleEn}</span>
                  </button>
                );
              })}
            </div>

            {/* STAGE DISPLAY PANEL (Compact & High-Clarity View) */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-6 lg:p-7 shadow-xs">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                
                {/* LEFT/DOMINANT VISUAL (In RTL, appears on the left of desktop) */}
                <div className="lg:col-span-7">
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-md">
                    <div className="group relative aspect-16/9 sm:aspect-[1.85/1] max-h-[340px] w-full overflow-hidden bg-slate-100">
                      <img
                        key={activeStage.dominantImage}
                        src={activeStage.dominantImage}
                        alt={isAr ? activeStage.titleAr : activeStage.titleEn}
                        className={`h-full w-full transition-opacity duration-500 ease-out animate-in fade-in ${shouldPreserveFullFrame(activeStage.dominantImage) ? 'object-contain p-2' : 'object-cover'}`}
                        loading="eager"
                        decoding="async"
                      />

                      {/* Stage Badge on Dominant Visual */}
                      <div className="absolute top-3 right-3 flex items-center gap-2 rounded-lg bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
                        <span className="font-mono text-sky-400">0{activeStage.id}</span>
                        <span>•</span>
                        <span>{isAr ? activeStage.titleAr : activeStage.titleEn}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setLightboxImage({
                            src: activeStage.dominantImage,
                            title: isAr ? activeStage.titleAr : activeStage.titleEn,
                            subtitle: isAr ? activeStage.explanationAr : activeStage.explanationEn,
                          })
                        }
                        className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950/80 text-white/90 backdrop-blur-md border border-white/10 transition hover:bg-slate-900 hover:text-white cursor-pointer"
                        title={isAr ? 'تكبير الصورة' : 'Zoom'}
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Related Image Strip for this Stage (Compact & Clearly Visible) */}
                  <div className="mt-3">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 text-[11px] sm:text-xs">
                        {isAr ? 'شريط الأدلة والصور المرتبطة بالمرحلة:' : 'Related Visual Evidence Strip:'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {isAr ? 'انقر على أي صورة لتكبيرها' : 'Click thumbnail to inspect'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {activeStage.stripImages.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setLightboxImage({
                              src: item.src,
                              title: isAr ? item.captionAr : item.captionEn,
                              subtitle: isAr
                                ? `توثيق مرحلي داعم للمرحلة (${activeStage.titleAr})`
                                : `Supporting phase evidence for ${activeStage.titleEn}`,
                            })
                          }
                          className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-900 transition-all hover:border-sky-500 hover:shadow-md text-start cursor-pointer"
                        >
                          <div className="aspect-16/9 w-full overflow-hidden max-h-[72px]">
                            <img
                              src={item.src}
                              alt={isAr ? item.captionAr : item.captionEn}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-1.5 bg-white">
                            <p className="line-clamp-1 text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-sky-700">
                              {isAr ? item.captionAr : item.captionEn}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT CONTENT: Concise title, explanation, "What Ain Sijam Knows" */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700">
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-[10px]">
                      0{activeStage.id}
                    </span>
                    <span className="text-[11px]">{isAr ? 'المرحلة في المنظومة' : 'Lifecycle Stage'}</span>
                  </div>

                  <h3 className="mt-1.5 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    {isAr ? activeStage.titleAr : activeStage.titleEn}
                  </h3>

                  {/* Concise explanation */}
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                    {isAr ? activeStage.explanationAr : activeStage.explanationEn}
                  </p>

                  {/* "What Ain Sijam Knows at this Stage" (Compact & Clear) */}
                  <div className="mt-4 rounded-xl border border-sky-100 bg-white p-3.5 sm:p-4 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold text-sky-800">
                      <ShieldCheck className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      <span>{isAr ? 'ماذا ترصد وتعرف عين سيجام في هذه المرحلة؟' : 'What Ain Sijam Knows At This Stage:'}</span>
                    </div>

                    <ul className="mt-2.5 space-y-2">
                      {(isAr ? activeStage.whatWeKnowAr : activeStage.whatWeKnowEn).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                          <span className="leading-snug font-normal">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Navigation Between Stages */}
                  <div className="mt-4 flex items-center justify-between pt-1">
                    <button
                      type="button"
                      disabled={activeStageId === 1}
                      onClick={() => setActiveStageId((prev) => Math.max(1, prev - 1))}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isAr ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
                      <span>{isAr ? 'المرحلة السابقة' : 'Previous Stage'}</span>
                    </button>

                    <span className="text-xs font-bold text-slate-600 font-mono">
                      {activeStageId} / {SEVEN_STAGES.length}
                    </span>

                    <button
                      type="button"
                      disabled={activeStageId === SEVEN_STAGES.length}
                      onClick={() => setActiveStageId((prev) => Math.min(SEVEN_STAGES.length, prev + 1))}
                      className="inline-flex items-center gap-1 rounded-lg bg-sky-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span>{isAr ? 'المرحلة التالية' : 'Next Stage'}</span>
                      {isAr ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. MAIN VISUAL EVIDENCE SECTION                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-slate-200 bg-slate-50/60 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Main Evidence Title */}
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
              <Eye className="h-3.5 w-3.5 text-sky-700" />
              <span>{isAr ? 'الأدلة المكانية الميدانية' : 'Physical Spatial Proof'}</span>
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
              {isAr
                ? 'نرى ما يحدث داخل الموقع، وليس فقط ما يظهر في التقرير'
                : 'We See What Happens Inside The Site, Not Just What Appears In Reports'}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              {isAr
                ? 'مقارنة بصرية زمنية تفاعلية مدعومة بتعليقات مكانية مباشرة ترصد الآليات، الحفر، والهياكل بدقة متناهية.'
                : 'Interactive multi-temporal viewer with solid high-contrast annotations detailing actual construction activity.'}
            </p>
          </div>

          {/* Mode Selector & Stage Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            
            {/* 4-Stage Evidence Timeline Control */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
              {EVIDENCE_STAGES.map((stage, idx) => {
                const isActive = !isBeforeAfterMode && idx === activeEvidenceStageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => {
                      setIsBeforeAfterMode(false);
                      setActiveEvidenceStageIndex(idx);
                      setSelectedAnnotationId(null);
                    }}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-sky-700 text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-mono text-[11px] opacity-80">0{idx + 1}</span>
                    <span>{isAr ? stage.labelAr : stage.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Before / After Slider Toggle Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsBeforeAfterMode(!isBeforeAfterMode);
                  setSelectedAnnotationId(null);
                }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isBeforeAfterMode
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'border border-sky-300 bg-sky-50 text-sky-800 hover:bg-sky-100'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>
                  {isBeforeAfterMode
                    ? isAr
                      ? 'العودة لمراحل الرصد'
                      : 'Back to Timeline'
                    : isAr
                    ? 'مقارنة مسار الرفع والربط (اسحب)'
                      : 'Field Survey ↔ Network Map'}
                </span>
              </button>
            </div>

          </div>

          {/* MAIN EVIDENCE VIEWER CONTAINER */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-300/80 bg-white shadow-xl shadow-slate-900/5">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/80 px-4 py-3 text-xs sm:px-6">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800">
                  {isBeforeAfterMode
                    ? isAr
                      ? 'مسار موحّد: الرفع الميداني GNSS ثم المراجعة على خريطة GIS'
                      : 'One documented workflow: field capture versus network-layer review'
                    : isAr
                    ? activeEvidence.timeframeAr
                    : activeEvidence.timeframeEn}
                </span>
                {!isBeforeAfterMode && (
                  <span className="hidden sm:inline rounded-md bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-800">
                    {isAr
                      ? `${activeEvidence.annotations.length} مؤشرات مكانية محددة`
                      : `${activeEvidence.annotations.length} spatial points`}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!isBeforeAfterMode && (
                  <button
                    type="button"
                    onClick={() => setIsEvidenceZoomed(!isEvidenceZoomed)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Search className="h-3.5 w-3.5 text-sky-600" />
                    <span>{isEvidenceZoomed ? (isAr ? 'إلغاء التكبير' : 'Reset Zoom') : (isAr ? 'تكبير التفاصيل' : 'Zoom In')}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setLightboxImage({
                      src: isBeforeAfterMode
                        ? SURVEY_WORKFLOW_COMPARISON.mapImage
                        : activeEvidence.image,
                      title: isBeforeAfterMode
                        ? isAr
                          ? 'من الرفع الميداني إلى خريطة الشبكات'
                          : 'From Field Survey to Network Map'
                        : isAr
                        ? activeEvidence.labelAr
                        : activeEvidence.labelEn,
                      subtitle: isBeforeAfterMode
                        ? isAr
                          ? SURVEY_WORKFLOW_COMPARISON.explanationAr
                          : SURVEY_WORKFLOW_COMPARISON.explanationEn
                        : isAr
                        ? activeEvidence.timeframeAr
                        : activeEvidence.timeframeEn,
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  title={isAr ? 'عرض ملء الشاشة' : 'Full Screen'}
                >
                  <Maximize2 className="h-3.5 w-3.5 text-slate-600" />
                  <span className="hidden sm:inline">{isAr ? 'ملء الشاشة' : 'Full Screen'}</span>
                </button>
              </div>
            </div>

            {/* VIEWER AREA */}
            <div className="relative bg-slate-950">
              
              {/* --- MODE 1: BEFORE / AFTER DRAG SLIDER --- */}
              {isBeforeAfterMode ? (
                <div
                  ref={sliderContainerRef}
                  onMouseDown={() => {
                    isDraggingSlider.current = true;
                  }}
                  onMouseUp={stopDragging}
                  onMouseLeave={stopDragging}
                  onMouseMove={handleMouseMove}
                  onTouchStart={() => {
                    isDraggingSlider.current = true;
                  }}
                  onTouchEnd={stopDragging}
                  onTouchMove={handleTouchMove}
                  className="relative aspect-[3/2] w-full cursor-ew-resize select-none overflow-hidden bg-slate-100"
                >
                  {/* GIS review is the second, connected step after field capture. */}
                  <img
                    src={SURVEY_WORKFLOW_COMPARISON.mapImage}
                    alt={isAr ? SURVEY_WORKFLOW_COMPARISON.mapLabelAr : SURVEY_WORKFLOW_COMPARISON.mapLabelEn}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />

                  {/* The clipped layer is the preceding on-site GNSS survey. */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: isAr
                        ? `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                        : `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    }}
                  >
                    <img
                      src={SURVEY_WORKFLOW_COMPARISON.fieldImage}
                      alt={isAr ? SURVEY_WORKFLOW_COMPARISON.fieldLabelAr : SURVEY_WORKFLOW_COMPARISON.fieldLabelEn}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />

                    {/* Superseded label retained only for source compatibility. */}
                    <div className="hidden">
                      {isAr ? 'قبل: خط الأساس الفضائي (01)' : 'Before: Baseline (01)'}
                    </div>
                  </div>

                  {/* Superseded label retained only for source compatibility. */}
                  <div className="hidden">
                    {isAr ? 'بعد: مرحلة البناء المتقدمة (05)' : 'After: Advanced Works (05)'}
                  </div>

                  <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-start justify-between gap-3 text-xs font-bold text-white">
                    <span className="max-w-[42%] rounded-md border border-white/10 bg-slate-950/85 px-2.5 py-1 text-start backdrop-blur-md">
                      {isAr ? SURVEY_WORKFLOW_COMPARISON.fieldLabelAr : SURVEY_WORKFLOW_COMPARISON.fieldLabelEn}
                    </span>
                    <span className="max-w-[42%] rounded-md border border-white/10 bg-sky-900/90 px-2.5 py-1 text-end backdrop-blur-md">
                      {isAr ? SURVEY_WORKFLOW_COMPARISON.mapLabelAr : SURVEY_WORKFLOW_COMPARISON.mapLabelEn}
                    </span>
                  </div>

                  {/* Draggable Handle Divider */}
                  <div
                    className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-2xl"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-sky-600 text-white shadow-xl">
                      <Sliders className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute bottom-12 inset-x-0 z-20 flex justify-center px-4">
                    <p className="max-w-xl rounded-md border border-sky-300/30 bg-slate-950/80 px-3 py-1.5 text-center text-[11px] font-medium leading-4 text-slate-100 backdrop-blur-md">
                      {isAr ? SURVEY_WORKFLOW_COMPARISON.explanationAr : SURVEY_WORKFLOW_COMPARISON.explanationEn}
                    </p>
                  </div>

                  {/* Bottom Drag Instruction */}
                  <div className="pointer-events-none absolute bottom-4 inset-x-0 flex justify-center">
                    <span className="rounded-full bg-slate-950/70 px-4 py-1 text-xs font-semibold text-slate-200 backdrop-blur-md border border-white/10">
                      {isAr ? 'اسحب المقبض يميناً ويساراً للمقارنة' : 'Drag handle to compare changes'}
                    </span>
                  </div>
                </div>
              ) : (
                /* --- MODE 2: TIME-BASED STAGE VIEWER WITH ANNOTATIONS --- */
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 sm:aspect-16/9">
                  <img
                    key={activeEvidence.image}
                    src={activeEvidence.image}
                    alt={isAr ? activeEvidence.labelAr : activeEvidence.labelEn}
                    className={`h-full w-full transition-[transform,opacity] duration-500 ease-out animate-in fade-in ${shouldPreserveFullFrame(activeEvidence.image) ? 'object-contain p-2' : 'object-cover'}`}
                    style={{ transform: `scale(${isEvidenceZoomed ? 1.25 : 1})`, transformOrigin: 'center' }}
                    loading="eager"
                    decoding="async"
                  />

                  {/* HTML Overlay Annotations (Solid High-Contrast Ain Sijam Blue Labels) */}
                  {activeEvidence.annotations.map((ann) => {
                    const isSelected = selectedAnnotationId === ann.id;
                    return (
                      <div
                        key={ann.id}
                        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all"
                        style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedAnnotationId(isSelected ? null : ann.id)}
                          className={`group/pin flex items-center gap-1.5 rounded-lg border-2 border-white px-2.5 py-1 text-xs font-bold shadow-xl transition-transform hover:scale-105 ${
                            isSelected
                              ? 'bg-sky-600 text-white ring-4 ring-sky-300 scale-110'
                              : 'bg-sky-700 text-white hover:bg-sky-800'
                          }`}
                        >
                          <span className="h-2 w-2 rounded-full bg-white" />
                          <span>{isAr ? ann.labelAr : ann.labelEn}</span>
                        </button>
                      </div>
                    );
                  })}

                  {/* Active Selected Annotation Crop Panel */}
                  {selectedAnnotation && (
                    <div className="absolute bottom-4 right-4 z-30 max-w-sm rounded-xl border border-sky-400/80 bg-slate-950/95 p-3.5 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                          <span className="text-xs font-bold text-sky-200">
                            {isAr ? selectedAnnotation.labelAr : selectedAnnotation.labelEn}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedAnnotationId(null)}
                          className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Zoom crop preview */}
                      <div className="mt-2.5 relative h-28 w-full overflow-hidden rounded-lg bg-slate-900 border border-white/10">
                        <img
                          src={activeEvidence.image}
                          alt="Annotation detail"
                          className="h-full w-full object-cover"
                          style={{
                            transform: `scale(${selectedAnnotation.cropBox.zoom})`,
                            transformOrigin: `${selectedAnnotation.cropBox.x}% ${selectedAnnotation.cropBox.y}%`,
                          }}
                        />
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-sky-400/50 rounded-lg" />
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-slate-300">
                        {isAr ? selectedAnnotation.descAr : selectedAnnotation.descEn}
                      </p>
                    </div>
                  )}

                  {/* Evidence Navigator showing the four stages thumbnail pills */}
                  <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-1.5 rounded-xl bg-slate-950/80 p-1.5 backdrop-blur-md border border-white/10">
                    {EVIDENCE_STAGES.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setActiveEvidenceStageIndex(idx);
                          setSelectedAnnotationId(null);
                        }}
                        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                          idx === activeEvidenceStageIndex
                            ? 'bg-sky-600 text-white'
                            : 'text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>0{idx + 1}</span>
                        <span>{isAr ? s.labelAr : s.labelEn}</span>
                      </button>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. “EVERYTHING WE CAN TRACK” VISUAL INTELLIGENCE BOARD           */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-slate-200 bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              {isAr ? 'عناصر الرصد الميداني' : 'Observable Site Dimensions'}
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">
              {isAr ? 'كل عنصر في الموقع له أثر يمكن رصده' : 'Every Field Element Leaves an Observable Footprint'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
              {isAr
                ? 'لا نعتمد على تقديرات نظرية؛ نحلل العناصر الملموسة التي تحدد مسار المشروع وقيمته الاستثمارية.'
                : 'No theoretical estimates; we track tangible elements that prove execution and safeguard asset value.'}
            </p>

          </div>

          {/* Keep controls readable; apply the visibility scale to the active visual only. */}
          <div>
            {/* Interactive Split Board (Dominant Visual + Vertical List) */}
            <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-center">
              
              {/* RIGHT SIDE (in RTL): Vertical Interactive List */}
              <div className="lg:col-span-5 space-y-2.5">
                {INTELLIGENCE_DIMENSIONS.map((dim) => {
                  const isActive = dim.id === activeDimensionId;
                  return (
                    <button
                      key={dim.id}
                      type="button"
                      onClick={() => setActiveDimensionId(dim.id)}
                      className={`w-full rounded-xl border p-3.5 text-start transition-all cursor-pointer ${
                        isActive
                          ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-2 ring-sky-200'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm sm:text-base font-bold ${
                            isActive ? 'text-sky-900' : 'text-slate-800'
                          }`}
                        >
                          {isAr ? dim.titleAr : dim.titleEn}
                        </h4>
                        {isActive && <CheckCircle2 className="h-4 w-4 text-sky-600" />}
                      </div>

                      {/* Short Explanation (Active only) */}
                      {isActive && (
                        <div className="mt-2 text-xs leading-relaxed text-slate-600">
                          <p className="font-medium text-slate-700">{isAr ? dim.explanationAr : dim.explanationEn}</p>
                          
                          <div className="mt-2 flex flex-col gap-1 border-t border-sky-100 pt-2 text-xs">
                            <div className="font-bold text-sky-800">
                              {isAr ? 'مؤشر الرصد: ' : 'Indicator: '}
                              <span className="font-semibold text-slate-800">
                                {isAr ? dim.indicatorAr : dim.indicatorEn}
                              </span>
                            </div>
                            <div className="font-bold text-emerald-800">
                              {isAr ? 'لماذا يهم القرار؟ ' : 'Why it matters: '}
                              <span className="font-semibold text-slate-800">
                                {isAr ? dim.whyItMattersAr : dim.whyItMattersEn}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* LEFT SIDE (in RTL): Dominant Active Visual + Related Image */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4 shadow-sm">
                  
                  {/* Active Main Visual */}
                  <div className="group relative aspect-[1.85/1] sm:aspect-16/9 max-h-[380px] w-full overflow-hidden rounded-xl bg-slate-100 shadow-md">
                    <img
                      key={activeDimension.image}
                      src={activeDimension.image}
                      alt={isAr ? activeDimension.titleAr : activeDimension.titleEn}
                      className={`h-full w-full transition-opacity duration-500 ease-out animate-in fade-in ${shouldPreserveFullFrame(activeDimension.image) ? 'object-contain p-2' : 'object-cover'}`}
                      loading="eager"
                      decoding="async"
                    />

                    {/* Title overlay */}
                    <div className="absolute top-3.5 right-3.5 rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/10">
                      <span>{isAr ? activeDimension.titleAr : activeDimension.titleEn}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: activeDimension.image,
                          title: isAr ? activeDimension.titleAr : activeDimension.titleEn,
                          subtitle: isAr ? activeDimension.explanationAr : activeDimension.explanationEn,
                        })
                      }
                      className="absolute top-3.5 left-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950/80 text-white backdrop-blur-md border border-white/10 transition hover:bg-slate-900 cursor-pointer"
                      title={isAr ? 'تكبير' : 'Zoom'}
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Bottom Bar: Indicator Card + Related Visual Preview */}
                  <div className="mt-3 grid gap-3 sm:grid-cols-12 items-center">
                    
                    {/* Indicator Card */}
                    <div className="sm:col-span-8 rounded-xl border border-slate-200 bg-white p-3">
                      <span className="text-xs font-bold text-sky-700">
                        {isAr ? 'الأثر التنفيذي المرصود' : 'Monitored Execution Impact'}
                      </span>
                      <p className="mt-1 text-xs sm:text-sm font-bold text-slate-900">
                        {isAr ? activeDimension.indicatorAr : activeDimension.indicatorEn}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 font-medium">
                        {isAr ? activeDimension.whyItMattersAr : activeDimension.whyItMattersEn}
                      </p>
                    </div>

                    {/* Related Image Preview Button */}
                    <div className="sm:col-span-4">
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxImage({
                            src: activeDimension.relatedImage,
                            title: isAr ? `دليل داعم: ${activeDimension.titleAr}` : `Supporting: ${activeDimension.titleEn}`,
                            subtitle: isAr ? activeDimension.explanationAr : activeDimension.explanationEn,
                          })
                        }
                        className="group relative block w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 text-start shadow-xs transition hover:border-sky-500 cursor-pointer"
                      >
                        <div className="aspect-16/10 w-full overflow-hidden max-h-[64px]">
                          <img
                            src={activeDimension.relatedImage}
                            alt="Related"
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-1.5 bg-white text-xs font-semibold text-slate-800 group-hover:text-sky-700">
                          {isAr ? 'صورة إضافية مرتبطة' : 'Related Image'}
                        </div>
                      </button>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. CONSTRUCTION PROGRESS CINEMA (IMAGES 16-25)                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-slate-200 bg-slate-900 py-8 sm:py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Cinema Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                {isAr ? 'سينما التقدم الميداني' : 'Field Progress Cinema'}
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                {isAr ? 'رحلة الموقع من نشاط ميداني إلى أصل جاهز' : 'Site Evolution: From Raw Ground to Finished Asset'}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
                {isAr
                  ? 'سلسلة بصرية متتابعة توثق حركة الهياكل الخرسانية، الرافعات، الطرق، والواجهات حتى التسليم النهائي.'
                  : 'Editorial sequence tracking structural framing, vertical cranes, access roads, and closeout.'}
              </p>
            </div>

            {/* Counter & Arrow Controls */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="font-mono text-xs sm:text-sm font-bold text-sky-400">
                {String(cinemaIndex + 1).padStart(2, '0')} / {String(CINEMA_SLIDES.length).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCinemaIndex((prev) => (prev > 0 ? prev - 1 : CINEMA_SLIDES.length - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white cursor-pointer"
                  title={isAr ? 'السابق' : 'Previous'}
                >
                  {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setCinemaIndex((prev) => (prev < CINEMA_SLIDES.length - 1 ? prev + 1 : 0))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-sky-600 text-white transition hover:bg-sky-500 cursor-pointer"
                  title={isAr ? 'التالي' : 'Next'}
                >
                  {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Cinema controls remain stable while the active frame uses the shared visibility scale. */}
          <div>
            {/* CINEMA MAIN SCREEN */}
            <div className="mt-6">
              <div className="relative aspect-[1.95/1] sm:aspect-16/9 max-h-[440px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xl">
                <img
                  key={currentCinemaSlide.image}
                  src={currentCinemaSlide.image}
                  alt={isAr ? currentCinemaSlide.labelAr : currentCinemaSlide.labelEn}
                  className={`h-full w-full transition-opacity duration-500 ease-out animate-in fade-in ${shouldPreserveFullFrame(currentCinemaSlide.image) ? 'object-contain p-2' : 'object-cover'}`}
                  loading="eager"
                  decoding="async"
                />

                {/* Top Phase Tag */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-2 rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-sky-300 backdrop-blur-md border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span>{isAr ? currentCinemaSlide.labelAr : currentCinemaSlide.labelEn}</span>
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={() =>
                    setLightboxImage({
                      src: currentCinemaSlide.image,
                      title: isAr ? currentCinemaSlide.labelAr : currentCinemaSlide.labelEn,
                      subtitle: isAr ? currentCinemaSlide.descAr : currentCinemaSlide.descEn,
                    })
                  }
                  className="absolute top-3.5 left-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950/80 text-white backdrop-blur-md border border-white/10 transition hover:bg-slate-800 cursor-pointer"
                  title={isAr ? 'ملء الشاشة' : 'Full Screen'}
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-10">
                  <div className="max-w-3xl">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {isAr ? currentCinemaSlide.subLabelAr : currentCinemaSlide.subLabelEn}
                    </h3>
                    <p className="mt-1 text-xs text-slate-200 sm:text-sm leading-relaxed font-medium">
                      {isAr ? currentCinemaSlide.descAr : currentCinemaSlide.descEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* HORIZONTAL STORY RAIL (Clickable Previews) */}
            <div className="mt-4 flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
              {CINEMA_SLIDES.map((slide, idx) => {
                const isActive = idx === cinemaIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCinemaIndex(idx)}
                    className={`group relative shrink-0 w-28 sm:w-36 overflow-hidden rounded-xl border text-start transition-all cursor-pointer ${
                      isActive
                        ? 'border-sky-400 ring-2 ring-sky-400/50 scale-102 shadow-lg'
                        : 'border-slate-800 opacity-60 hover:opacity-90 hover:border-slate-600'
                    }`}
                  >
                    <div className="aspect-16/10 w-full overflow-hidden bg-slate-950 max-h-[58px]">
                      <img
                        src={slide.image}
                        alt={isAr ? slide.labelAr : slide.labelEn}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-1.5 bg-slate-950 border-t border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono text-[10px]">0{idx + 1}</span>
                        <span className="font-semibold text-slate-200 truncate group-hover:text-sky-300 text-[11px]">
                          {isAr ? slide.labelAr : slide.labelEn}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. DECISION LAYER & PLATFORM CTAS                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              {isAr ? 'طبقة القرار الاستثماري' : 'Decision Governance Layer'}
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">
              {isAr ? 'من مشهد الموقع إلى قرار أسرع وأكثر وضوحًا' : 'From Field Imagery to Clearer, Faster Decisions'}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {isAr
                ? 'تحويل البيانات الجغرافية وصور الأقمار الصناعية إلى قرارات مالية وتنفيذية تحمي حقوق كافة الأطراف.'
                : 'Transforming multi-source field facts into executive governance that mitigates risk.'}
            </p>
          </div>

          {/* Clean Animated Flow: 5 Steps */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
            {[
              {
                step: '01',
                titleAr: 'الأرض والمخطط',
                titleEn: 'Land & Zoning',
                descAr: 'فحص الصك والاشتراطات البلدية',
                descEn: 'Deed audit & municipal code',
              },
              {
                step: '02',
                titleAr: 'الموقع والمعدات',
                titleEn: 'Site & Fleet',
                descAr: 'تتبع جاهزية الآليات والإنشاءات',
                descEn: 'Machinery census & works',
              },
              {
                step: '03',
                titleAr: 'الرصد والتحقق',
                titleEn: 'Verification',
                descAr: 'مقارنة الإنجاز الفعلي بالمخطط',
                descEn: 'Actual vs planned spatial delta',
              },
              {
                step: '04',
                titleAr: 'تقرير موثوق',
                titleEn: 'Certified Report',
                descAr: 'سجل تدقيق غير قابل للتلاعب',
                descEn: 'Tamper-evident audit dossier',
              },
              {
                step: '05',
                titleAr: 'قرار وتنفيذ',
                titleEn: 'Decision & Payout',
                descAr: 'صرف المستحقات وحماية العوائد',
                descEn: 'Disbursement & milestone release',
              },
            ].map((flow, fIdx) => (
              <div
                key={fIdx}
                className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all hover:border-sky-300 hover:bg-white hover:shadow-sm"
              >
                <span className="font-mono text-xs font-bold text-sky-700">{flow.step}</span>
                <h4 className="mt-2 text-sm font-bold text-slate-900">{isAr ? flow.titleAr : flow.titleEn}</h4>
                <p className="mt-1 text-xs text-slate-500 leading-snug">{isAr ? flow.descAr : flow.descEn}</p>
              </div>
            ))}
          </div>

          {/* Highlight Visual Banner using Image 14 */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lg">
            <div className="grid lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 relative aspect-16/9 sm:aspect-16/8 lg:aspect-auto lg:h-80 w-full overflow-hidden">
                <img
                  src="/assets/methodology/14-real-completed-residential-green-space.jpg"
                  alt="Completed Asset"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  {isAr ? 'الأصل المكتمل والمشغل' : 'The Operational Asset'}
                </span>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl text-white">
                  {isAr ? 'الوصول إلى أصل مكتمل وفق أعلى المعايير' : 'Reaching Asset Delivery on Budget and Time'}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isAr
                    ? 'من خلال المتابعة المستمرة للأصل، نضمن انتقال المشروع من مجرد أرض بيضاء إلى مجتمع عمراني مشغل يحقق أعلى العوائد الاستثمارية.'
                    : 'Through continuous spatial governance, Ain Sijam ensures raw ground transitions into a high-yield, operational development.'}
                </p>

                {/* Valid Platform CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-sky-500 active:scale-95"
                  >
                    <span>{isAr ? 'ابدأ متابعة مشروعك' : 'Start Project Monitoring'}</span>
                    {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
                  >
                    <span>{isAr ? 'اطلب عرضًا توضيحيًا' : 'Request Demo'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. METHODOLOGY EVIDENCE LIBRARY                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="overflow-x-hidden bg-[#f7f5ef] py-14 sm:py-20" aria-labelledby="work-evidence-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-y border-slate-900/15 py-5 sm:flex sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-800">
                {isAr ? 'مكتبة الأدلة الميدانية' : 'Methodology Evidence Library'}
              </p>
              <h2 id="work-evidence-title" className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {isAr ? 'سجل بصري لمسار العمل' : 'A visual record of the workstream'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {isAr
                  ? 'أدلة منتقاة من مراحل التخطيط والتنفيذ والتحقق؛ كل سجل معروض مرة واحدة ضمن تصنيف واضح.'
                  : 'A curated record across planning, delivery, equipment, and verification — each item appears once.'}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label={isAr ? 'تصنيفات الأدلة' : 'Evidence categories'}>
            {([
              ['all', isAr ? 'الكل' : 'All'],
              ['aerial', isAr ? 'جوي وتخطيط الموقع' : 'Aerial & Planning'],
              ['execution', isAr ? 'التنفيذ والإنشاء' : 'Execution & Construction'],
              ['equipment', isAr ? 'المعدات والآليات' : 'Equipment & Machinery'],
            ] as const).map(([id, label]) => {
              const active = workGalleryCategory === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setWorkGalleryCategory(id);
                    setWorkGalleryLightboxIndex(null);
                  }}
                  className={`shrink-0 border px-3 py-2 text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 ${
                    active
                      ? 'border-slate-950 bg-slate-950 text-cyan-200 shadow-sm'
                      : 'border-slate-300 bg-white/60 text-slate-700 hover:border-cyan-700 hover:text-cyan-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-4" role="tabpanel">
            {visibleWorkGalleryItems.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setWorkGalleryLightboxIndex(index)}
                className={`group relative w-[82vw] max-w-[320px] shrink-0 snap-center overflow-hidden border border-slate-900/10 bg-slate-200 text-start shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-cyan-700 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 sm:w-auto sm:max-w-none ${
                  index % 11 === 0 ? 'sm:col-span-2 sm:row-span-2' : index % 7 === 0 ? 'sm:row-span-2' : ''
                }`}
              >
                <div className={`relative ${index % 11 === 0 ? 'aspect-[4/3] sm:h-full' : index % 7 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                  <img
                    src={item.src}
                    alt={isAr ? item.captionAr : item.captionEn}
                    loading="lazy"
                    className={`h-full w-full transition duration-500 group-hover:scale-[1.03] ${item.preserveDetail ? 'bg-slate-100 object-contain p-1.5' : 'object-cover'}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent px-2.5 pb-2 pt-9 text-white">
                    <p className="line-clamp-2 text-[11px] font-bold leading-4 sm:text-xs">{isAr ? item.captionAr : item.captionEn}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {workGalleryLightboxIndex !== null && visibleWorkGalleryItems[workGalleryLightboxIndex] && (() => {
        const activeItem = visibleWorkGalleryItems[workGalleryLightboxIndex];
        const advance = (direction: number) =>
          setWorkGalleryLightboxIndex((index) =>
            index === null ? null : (index + direction + visibleWorkGalleryItems.length) % visibleWorkGalleryItems.length,
          );
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={isAr ? 'عارض الأدلة المرئية' : 'Visual evidence viewer'}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 p-2 sm:p-6"
            onClick={() => setWorkGalleryLightboxIndex(null)}
          >
            <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-slate-900 shadow-2xl sm:h-auto sm:max-h-[92vh]" onClick={(event) => event.stopPropagation()}>
              <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{isAr ? activeItem.captionAr : activeItem.captionEn}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-cyan-300">{workGalleryLightboxIndex + 1} / {visibleWorkGalleryItems.length}</p>
                </div>
                <button type="button" onClick={() => setWorkGalleryLightboxIndex(null)} className="grid h-9 w-9 shrink-0 place-items-center border border-white/20 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label={isAr ? 'إغلاق' : 'Close'}><X className="h-4 w-4" /></button>
              </header>
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black p-3">
                <img src={activeItem.src} alt={isAr ? activeItem.captionAr : activeItem.captionEn} className="max-h-full max-w-full object-contain" />
                <button type="button" onClick={() => advance(isAr ? 1 : -1)} className="absolute start-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-white/20 bg-slate-950/70 text-white hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label={isAr ? 'السابق' : 'Previous'}>{isAr ? <ChevronRight /> : <ChevronLeft />}</button>
                <button type="button" onClick={() => advance(isAr ? -1 : 1)} className="absolute end-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-white/20 bg-slate-950/70 text-white hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label={isAr ? 'التالي' : 'Next'}>{isAr ? <ChevronLeft /> : <ChevronRight />}</button>
              </div>
              <footer className="border-t border-white/10 px-4 py-2 text-center text-[11px] text-slate-400">{isAr ? 'استخدم الأسهم للتنقل، و Esc للإغلاق' : 'Use arrow keys to navigate, Esc to close'}</footer>
            </div>
          </div>
        );
      })()}

      {/* ---------------------------------------------------------------- */}
      {/* LIGHTBOX MODAL (Full Resolution Image Viewer)                    */}
      {/* ---------------------------------------------------------------- */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-5xl w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 text-white">
              <div>
                <h3 className="text-sm font-bold text-white">{lightboxImage.title}</h3>
                {lightboxImage.subtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{lightboxImage.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                title={isAr ? 'إغلاق (Esc)' : 'Close (Esc)'}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[75vh] w-full overflow-auto bg-black flex items-center justify-center p-2">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-2.5 text-xs text-slate-400">
              <span>{isAr ? 'منصة عين سيجام • مكتبة الأدلة المرئية' : 'Ain Sijam Visual Intelligence Archive'}</span>
              <span className="font-mono text-[11px] text-sky-400">ESC TO CLOSE</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
