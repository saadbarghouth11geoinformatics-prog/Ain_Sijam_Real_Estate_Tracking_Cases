import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  HardHat, 
  CheckCircle2, 
  PauseCircle, 
  TrendingUp, 
  Activity, 
  MapPin, 
  Filter, 
  Layers, 
  ArrowUpRight, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Sparkles,
  BarChart3,
  Calendar,
  Compass,
  Gauge,
  SlidersHorizontal,
  LayoutGrid,
  PieChart as PieChartIcon,
  Eye
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip 
} from 'recharts';
import { useLanguage } from '../i18n/LanguageContext';
import { CircularProjectProgress } from './CircularProjectProgress';
import { ProjectPhaseDonutChart, calculateProjectPhases } from './ProjectPhaseDonutChart';
import { ProjectPhaseModal } from './ProjectPhaseModal';

export type ProjectStatusType = 'under_construction' | 'completed' | 'paused';

export interface DetailedProjectItem {
  id: string;
  nameAr: string;
  nameEn: string;
  code: string;
  region: 'الرياض' | 'مكة المكرمة' | 'الشرقية' | 'المدينة المنورة' | 'تبوك ونيوم' | 'عسير والجنوب';
  city: string;
  categoryAr: 'أبراج وسكني' | 'بنية تحتية ومرافق' | 'تجاري وسياحي' | 'لوجستي وصناعي';
  categoryEn: string;
  status: ProjectStatusType;
  progressPct: number;
  contractor: string;
  areaFormatted: string;
  estimatedValueSar: string;
  startDate: string;
  expectedCompletion: string;
  notesAr?: string;
  notesEn?: string;
  pauseReasonAr?: string;
}

// Sample projects representing real mega and urban projects across the Kingdom
export const sampleKingdomProjects: DetailedProjectItem[] = [
  // تحت الإنشاء (Under Construction)
  {
    id: 'proj-01',
    nameAr: 'توسعة مطار الملك سلمان الدولي - الصالة 2 ومدرج الطيران',
    nameEn: 'King Salman Int\'l Airport Expansion - Terminal 2',
    code: 'KSA-RYD-001',
    region: 'الرياض',
    city: 'الرياض',
    categoryAr: 'بنية تحتية ومرافق',
    categoryEn: 'Infrastructure',
    status: 'under_construction',
    progressPct: 48,
    contractor: 'تحالف بن لادن والمقاولون العرب',
    areaFormatted: '57 كم²',
    estimatedValueSar: '34 مليار ر.س',
    startDate: '2023-01',
    expectedCompletion: '2028-Q4',
    notesAr: 'أعمال الأساسات الخرسانية ومد شبكات التغذية الكهروضوئية جارية بنسبة متقدمة.'
  },
  {
    id: 'proj-02',
    nameAr: 'أبراج حديقة الملك سلمان - الحي السكني الإيكولوجي',
    nameEn: 'King Salman Park - Eco-Residential Towers',
    code: 'KSA-RYD-002',
    region: 'الرياض',
    city: 'الرياض',
    categoryAr: 'أبراج وسكني',
    categoryEn: 'Residential Towers',
    status: 'under_construction',
    progressPct: 62,
    contractor: 'شركة السيف للمقاولات الهندسية',
    areaFormatted: '480,000 م²',
    estimatedValueSar: '12.5 مليار ر.س',
    startDate: '2023-06',
    expectedCompletion: '2026-Q4',
    notesAr: 'اكتمال صب 44 طابقاً بالأبراج الرئيسية وتركيب الواجهات الزجاجية الذكية.'
  },
  {
    id: 'proj-03',
    nameAr: 'مشروع ذا لاين (NEOM The Line) - أعمال الحفر والأساسات العميقة',
    nameEn: 'NEOM The Line - Deep Piling & Excavation Works',
    code: 'KSA-NEOM-001',
    region: 'تبوك ونيوم',
    city: 'نيوم',
    categoryAr: 'بنية تحتية ومرافق',
    categoryEn: 'Infrastructure',
    status: 'under_construction',
    progressPct: 37,
    contractor: 'تحالف تريفي وبوير العالمية',
    areaFormatted: '34 كم²',
    estimatedValueSar: '180 مليار ر.س',
    startDate: '2022-09',
    expectedCompletion: '2030-Q1',
    notesAr: 'حفر ونقل أكثر من 22 مليون متر مكعب وتشغيل 360 رافعة ثقيلة متزامنة.'
  },
  {
    id: 'proj-04',
    nameAr: 'مجمع وجهة مسار مكة - المحور الإداري والفندقي الموحد',
    nameEn: 'Masar Makkah Destination - Central Commercial Hub',
    code: 'KSA-MKK-001',
    region: 'مكة المكرمة',
    city: 'مكة المكرمة',
    categoryAr: 'تجاري وسياحي',
    categoryEn: 'Commercial & Tourism',
    status: 'under_construction',
    progressPct: 79,
    contractor: 'شركة أم القرى للتنمية والإعمار',
    areaFormatted: '1.2 مليون م²',
    estimatedValueSar: '40 مليار ر.س',
    startDate: '2021-03',
    expectedCompletion: '2026-Q2',
    notesAr: 'التشطيبات النهائية لأنفاق المشاة ومحطات الحافلات السريعة BRT.'
  },
  {
    id: 'proj-05',
    nameAr: 'تطوير كورنيش الخبر الشمالي وتوسعة المارينا السياحية',
    nameEn: 'Khobar North Corniche & Marina Expansion',
    code: 'KSA-EST-001',
    region: 'الشرقية',
    city: 'الخبر',
    categoryAr: 'تجاري وسياحي',
    categoryEn: 'Commercial & Tourism',
    status: 'under_construction',
    progressPct: 54,
    contractor: 'مجموعة التميمي للمقاولات',
    areaFormatted: '310,000 م²',
    estimatedValueSar: '4.8 مليار ر.س',
    startDate: '2023-08',
    expectedCompletion: '2027-Q1',
    notesAr: 'أعمال الحماية البحرية وأرصفة اليخوت وتركيب المسارات الترفيهية.'
  },
  {
    id: 'proj-06',
    nameAr: 'مشروع رؤى المدينة - المجمع السكني الاستثماري الشرقي',
    nameEn: 'Rua Al Madinah - Eastern Hospitality District',
    code: 'KSA-MED-001',
    region: 'المدينة المنورة',
    city: 'المدينة المنورة',
    categoryAr: 'أبراج وسكني',
    categoryEn: 'Residential Towers',
    status: 'under_construction',
    progressPct: 41,
    contractor: 'تحالف شركة المباني ونسما للشركاء',
    areaFormatted: '1.5 مليون م²',
    estimatedValueSar: '28 مليار ر.س',
    startDate: '2023-04',
    expectedCompletion: '2028-Q2',
    notesAr: 'تنفيذ القواعد الخرسانية ومحطات تبريد المناطق وشبكات الخدمات المركزية.'
  },
  {
    id: 'proj-07',
    nameAr: 'مشروع قمم السودة السياحي - تلفريك ومرافق الضيافة الجبلية',
    nameEn: 'Soudah Peaks - Highland Hospitality & Cable Cars',
    code: 'KSA-ASR-001',
    region: 'عسير والجنوب',
    city: 'أبها',
    categoryAr: 'تجاري وسياحي',
    categoryEn: 'Commercial & Tourism',
    status: 'under_construction',
    progressPct: 33,
    contractor: 'شركة السودة للتطوير',
    areaFormatted: '620,000 م²',
    estimatedValueSar: '11 مليار ر.س',
    startDate: '2023-10',
    expectedCompletion: '2028-Q3',
    notesAr: 'تهيئة المسارات الجبلية البيئية وتثبيت ركائز المحطات المعلقة.'
  },

  // مكتملة (Completed)
  {
    id: 'proj-08',
    nameAr: 'مشروع قطار الرياض (المترو) - المسار الأزرق (محور العليا - البطحاء)',
    nameEn: 'Riyadh Metro - Blue Line (Olaya - Batha Axis)',
    code: 'KSA-RYD-003',
    region: 'الرياض',
    city: 'الرياض',
    categoryAr: 'بنية تحتية ومرافق',
    categoryEn: 'Infrastructure',
    status: 'completed',
    progressPct: 100,
    contractor: 'ائتلاف باكس (PAX - Bechtel)',
    areaFormatted: '38 كم مسار',
    estimatedValueSar: '24 مليار ر.س',
    startDate: '2016-02',
    expectedCompletion: '2024-Q4',
    notesAr: 'مكتمل بالكامل وتم تدشين الرحلات التشغيلية الرسمية وخدمة الركاب بنجاح.'
  },
  {
    id: 'proj-09',
    nameAr: 'مركز الملك عبدالله المالي (KAFD) - مجمع الأبراج المالية المرحلة الأولى',
    nameEn: 'KAFD Financial District - Phase 1 Towers',
    code: 'KSA-RYD-004',
    region: 'الرياض',
    city: 'الرياض',
    categoryAr: 'تجاري وسياحي',
    categoryEn: 'Commercial & Tourism',
    status: 'completed',
    progressPct: 100,
    contractor: 'مجموعة بن لادن وسعودي أوجيه سابقاً',
    areaFormatted: '1.6 مليون م²',
    estimatedValueSar: '38 مليار ر.س',
    startDate: '2014-06',
    expectedCompletion: '2023-Q4',
    notesAr: 'مكتمل ومأهول بأكثر من 85 مقر بنكي وشركة عالمية ومؤسسة استثمارية.'
  },
  {
    id: 'proj-10',
    nameAr: 'مطار الملك عبدالعزيز الدولي الجديد بجدة - صالة 1 المتكاملة',
    nameEn: 'King Abdulaziz Int\'l Airport Terminal 1',
    code: 'KSA-MKK-002',
    region: 'مكة المكرمة',
    city: 'جدة',
    categoryAr: 'بنية تحتية ومرافق',
    categoryEn: 'Infrastructure',
    status: 'completed',
    progressPct: 100,
    contractor: 'مجموعة بن لادن السعودية',
    areaFormatted: '810,000 م²',
    estimatedValueSar: '36 مليار ر.س',
    startDate: '2013-05',
    expectedCompletion: '2023-Q2',
    notesAr: 'تسليم كامل المرافق ومحطة قطار الحرمين المرتبطة بنسبة إشغال 100%.'
  },
  {
    id: 'proj-11',
    nameAr: 'مركز الملك عبدالعزيز للثقافة العالمية (إثراء) - الظهران',
    nameEn: 'King Abdulaziz Center for World Culture (Ithra)',
    code: 'KSA-EST-002',
    region: 'الشرقية',
    city: 'الظهران',
    categoryAr: 'تجاري وسياحي',
    categoryEn: 'Commercial & Tourism',
    status: 'completed',
    progressPct: 100,
    contractor: 'أرامكو السعودية وشركة سنامك',
    areaFormatted: '85,000 م²',
    estimatedValueSar: '3.2 مليار ر.س',
    startDate: '2012-08',
    expectedCompletion: '2022-Q1',
    notesAr: 'صرح معماري مكتمل حائز على جوائز عالمية بتشغيل ثقافي دائم.'
  },
  {
    id: 'proj-12',
    nameAr: 'مجمع ضاحية خزام السكنية - المربع الأول (الرياض)',
    nameEn: 'Khuzam Suburb Residential Sector 1',
    code: 'KSA-RYD-005',
    region: 'الرياض',
    city: 'الرياض',
    categoryAr: 'أبراج وسكني',
    categoryEn: 'Residential Towers',
    status: 'completed',
    progressPct: 100,
    contractor: 'الشركة الوطنية للإسكان (NHC)',
    areaFormatted: '3.8 مليون م²',
    estimatedValueSar: '8.4 مليار ر.س',
    startDate: '2021-01',
    expectedCompletion: '2024-Q3',
    notesAr: 'تسليم 5,200 وحدة سكنية للمستفيدين مع اكتمال كافة شبكات المياه والكهرباء والحدائق.'
  },

  // متوقفة (Paused / On Hold)
  {
    id: 'proj-13',
    nameAr: 'مجمع أبراج العليا التجاري المقابل للمحور المالي',
    nameEn: 'Olaya Commercial Towers Complex',
    code: 'KSA-RYD-006',
    region: 'الرياض',
    city: 'الرياض',
    categoryAr: 'أبراج وسكني',
    categoryEn: 'Residential Towers',
    status: 'paused',
    progressPct: 28,
    contractor: 'شركة الإنشاءات العقارية المتطورة',
    areaFormatted: '180,000 م²',
    estimatedValueSar: '2.4 مليار ر.س',
    startDate: '2022-03',
    expectedCompletion: 'موقوف مؤقتاً',
    pauseReasonAr: 'إعادة جدولة التصاميم المعمارية لزيادة كفاءة استهلاك الطاقة ومواقف السيارات الذكية.',
    notesAr: 'جاري استكمال اعتماد التراخيص المعدلة من أمانة منطقة الرياض ويتوقع الاستئناف قريباً.'
  },
  {
    id: 'proj-14',
    nameAr: 'مشروع مارينا أبحر الشمالية الترفيهي (جدة)',
    nameEn: 'North Obhur Marina & Entertainment Hub',
    code: 'KSA-MKK-003',
    region: 'مكة المكرمة',
    city: 'جدة',
    categoryAr: 'تجاري وسياحي',
    categoryEn: 'Commercial & Tourism',
    status: 'paused',
    progressPct: 19,
    contractor: 'شركة الساحل الغربي للإنشاءات',
    areaFormatted: '95,000 م²',
    estimatedValueSar: '1.1 مليار ر.س',
    startDate: '2022-11',
    expectedCompletion: 'موقوف مؤقتاً',
    pauseReasonAr: 'تحديث دراسات الأثر البيئي وتصريف السيول الساحلية.',
    notesAr: 'بانتظار تصريح المركز الوطني للرقابة على الالتزام البيئي لاستئناف الصب.'
  },
  {
    id: 'proj-15',
    nameAr: 'مجمع المستودعات اللوجستية المركزية - غرب الدمام',
    nameEn: 'West Dammam Central Logistics Park',
    code: 'KSA-EST-003',
    region: 'الشرقية',
    city: 'الدمام',
    categoryAr: 'لوجستي وصناعي',
    categoryEn: 'Logistics',
    status: 'paused',
    progressPct: 42,
    contractor: 'شركة البناء اللوجستي الخليجية',
    areaFormatted: '450,000 م²',
    estimatedValueSar: '850 مليون ر.س',
    startDate: '2023-02',
    expectedCompletion: 'موقوف مؤقتاً',
    pauseReasonAr: 'تغيير المقاول الرئيسي ومراجعة اشتراطات الدفاع المدني.',
    notesAr: 'تم طرح مناقصة استكمال المشروع على مقاول بديل واستئناف العمل مجدول خلال الربع القادم.'
  }
];

// Statistical totals across the Kingdom
export const kingdomOverallStats = {
  underConstruction: 1486,
  completed: 658,
  paused: 186,
  total: 2330,
  totalInvestmentSar: '840+ مليار ر.س',
  totalActiveWorkers: '185,000+',
  totalMachinery: '14,200+',
  inspectionComplianceRatePct: 98.4
};

// Regional breakdown multipliers to dynamically filter counts
export const regionalStatsBreakdown: Record<string, { underConstruction: number; completed: number; paused: number }> = {
  'الكل': { underConstruction: 1486, completed: 658, paused: 186 },
  'الرياض': { underConstruction: 642, completed: 298, paused: 64 },
  'مكة المكرمة': { underConstruction: 384, completed: 186, paused: 52 },
  'الشرقية': { underConstruction: 248, completed: 114, paused: 38 },
  'تبوك ونيوم': { underConstruction: 112, completed: 24, paused: 12 },
  'المدينة المنورة': { underConstruction: 68, completed: 26, paused: 14 },
  'عسير والجنوب': { underConstruction: 32, completed: 10, paused: 6 },
};

interface ProjectStatisticsProps {
  onNavigate?: (pageId: string) => void;
  className?: string;
}

export const ProjectStatistics: React.FC<ProjectStatisticsProps> = ({ 
  onNavigate,
  className = ''
}) => {
  const { t, isAr } = useLanguage();

  // Filters & Controls
  const [selectedRegion, setSelectedRegion] = useState<string>('الكل');
  const [selectedStatusTab, setSelectedStatusTab] = useState<'all' | ProjectStatusType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showProjectsList, setShowProjectsList] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'default' | 'highest' | 'lowest'>('default');
  const [viewMode, setViewMode] = useState<'cards' | 'donut' | 'radar'>('cards');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<DetailedProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showMacroDonut, setShowMacroDonut] = useState<boolean>(false);

  // Dynamic statistics based on regional selection
  const stats = useMemo(() => {
    return regionalStatsBreakdown[selectedRegion] || regionalStatsBreakdown['الكل'];
  }, [selectedRegion]);

  const total = stats.underConstruction + stats.completed + stats.paused;
  const underConstructionPct = ((stats.underConstruction / total) * 100).toFixed(1);
  const completedPct = ((stats.completed / total) * 100).toFixed(1);
  const pausedPct = ((stats.paused / total) * 100).toFixed(1);

  // Recharts Macro Distribution Data
  const statusDonutData = useMemo(() => [
    { name: isAr ? 'تحت الإنشاء' : 'Under Construction', value: stats.underConstruction, color: '#2563eb', pct: underConstructionPct },
    { name: isAr ? 'مكتملة' : 'Completed', value: stats.completed, color: '#0284c7', pct: completedPct },
    { name: isAr ? 'متوقفة مؤقتاً' : 'Paused', value: stats.paused, color: '#94a3b8', pct: pausedPct },
  ], [stats, isAr, underConstructionPct, completedPct, pausedPct]);

  // Filtered sample projects list
  const filteredProjects = useMemo(() => {
    return sampleKingdomProjects.filter(project => {
      // Region match
      const matchRegion = selectedRegion === 'الكل' || project.region === selectedRegion;
      // Status match
      const matchStatus = selectedStatusTab === 'all' || project.status === selectedStatusTab;
      // Search match
      const matchSearch = searchQuery.trim() === '' || 
        project.nameAr.includes(searchQuery) || 
        project.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.city.includes(searchQuery) ||
        project.contractor.includes(searchQuery) ||
        project.code.toLowerCase().includes(searchQuery.toLowerCase());

      return matchRegion && matchStatus && matchSearch;
    });
  }, [selectedRegion, selectedStatusTab, searchQuery]);

  // Average progress percentage of the current selection
  const avgProgressPct = useMemo(() => {
    if (filteredProjects.length === 0) return 0;
    const sum = filteredProjects.reduce((acc, p) => acc + p.progressPct, 0);
    return Math.round(sum / filteredProjects.length);
  }, [filteredProjects]);

  // Sorted projects by progress or default
  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    if (sortOrder === 'highest') {
      return list.sort((a, b) => b.progressPct - a.progressPct);
    }
    if (sortOrder === 'lowest') {
      return list.sort((a, b) => a.progressPct - b.progressPct);
    }
    return list;
  }, [filteredProjects, sortOrder]);

  // Regions list for filter
  const regionsList = [
    { id: 'الكل', labelAr: 'كافة مناطق المملكة', labelEn: 'All Kingdom' },
    { id: 'الرياض', labelAr: 'منطقة الرياض', labelEn: 'Riyadh' },
    { id: 'مكة المكرمة', labelAr: 'مكة وجدة', labelEn: 'Makkah & Jeddah' },
    { id: 'الشرقية', labelAr: 'المنطقة الشرقية', labelEn: 'Eastern Province' },
    { id: 'تبوك ونيوم', labelAr: 'تبوك ونيوم', labelEn: 'Tabuk & NEOM' },
    { id: 'المدينة المنورة', labelAr: 'المدينة المنورة', labelEn: 'Madinah' },
    { id: 'عسير والجنوب', labelAr: 'عسير والجنوب', labelEn: 'Asir & South' },
  ];

  return (
    <section 
      id="project-statistics-section"
      className={`w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6 transition-all ${className}`}
    >
      {/* 1. Header & Regional Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-blue-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white tracking-tight">
              {t('إحصائيات المشاريع', 'Project Statistics')}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
              {t('رصد فضائي وميداني مباشر', 'Live Spatial & Field Tracking')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {t(
              'توزيع ومؤشرات المشاريع التنموية والعقارية الكبرى بالمملكة مقسمة حسب حالة التنفيذ الميداني مع نسب الإنجاز والتحديث المستمر عبر الأقمار الصناعية.',
              'Distribution and key indicators of major developmental and real estate projects across the Kingdom categorized by on-site execution status with continuous satellite updates.'
            )}
          </p>
        </div>

        {/* Region Filter Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 border border-blue-100 dark:border-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer transition-colors"
              aria-label="تصفية حسب المنطقة"
            >
              {regionsList.map(r => (
                <option key={r.id} value={r.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {isAr ? r.labelAr : r.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Visual Project Spotlight Banner with 06-kafd-towers.webp */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 shadow-xl group">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/images_webp/06-kafd-towers.webp"
            alt={t('أبراج كافد والمشروعات الكبرى قيد التنفيذ', 'KAFD Towers & Mega Projects Under Construction')}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/75 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30 text-xs font-bold backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('متابعة دورية عبر الأقمار الصناعية وكاميرات المواقع', 'Periodic Satellite & Camera Audits')}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white font-['Cairo']">
              {t('رصد تطور الأبراج والمشروعات الكبرى بالمملكة', 'Monitoring Towers & Mega Projects Execution Across KSA')}
            </h3>
            <p className="text-xs text-slate-200/90 leading-relaxed">
              {t(
                'تتبع دقيق لمراحل الإنشاء والهياكل الخرسانية ونسب الإنجاز التراكمية في كافة المناطق الاستراتيجية وفق معايير عين سيجام الهندسية.',
                'Precise tracking of construction milestones, concrete superstructure, and cumulative completion rates in strategic regions.'
              )}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/85 border border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SATELLITE ACTIVE</span>
            </span>
            <span className="text-[11px] text-slate-300">
              {t('تحديث فوري للمشاريع', 'Real-time Updates')}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Key Statistics Cards (Responsive Grid: 1 col on mobile, 3 cols on sm/md, 4 cols on lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: تحت الإنشاء (Under Construction) - Royal Blue */}
        <div 
          onClick={() => {
            setSelectedStatusTab('under_construction');
            setShowProjectsList(true);
          }}
          className={`relative rounded-2xl p-5 border transition-all cursor-pointer group select-none ${
            selectedStatusTab === 'under_construction'
              ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-600 shadow-md shadow-blue-500/10'
              : 'bg-white dark:bg-slate-950 border-blue-100 dark:border-slate-800 hover:border-blue-400 hover:bg-blue-50/30'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              {t('تحت الإنشاء', 'Under Construction')}
            </span>
            <div className="flex items-center gap-2">
              <CircularProjectProgress 
                percentage={parseFloat(underConstructionPct)}
                status="under_construction"
                size={36}
                strokeWidth={3.5}
                showLabel={false}
                glow={false}
              />
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 group-hover:scale-110 transition-transform">
                <HardHat className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-blue-950 dark:text-white font-mono tracking-tight">
                {stats.underConstruction.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {t('مشروع نشط', 'active projects')}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-2 border-t border-blue-100 dark:border-slate-800/80">
              <span className="text-slate-500 dark:text-slate-400">{t('نسبة المشاريع:', 'Share of total:')}</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{underConstructionPct}%</span>
            </div>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-full bg-blue-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-700" 
              style={{ width: `${underConstructionPct}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="text-blue-600/80">{t('معدل إنجاز نشط', 'Active execution')}</span>
            <span className="group-hover:text-blue-600 transition-colors font-medium flex items-center gap-0.5">
              {t('عرض القائمة', 'View list')} 
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: المكتملة (Completed) - Sky Blue */}
        <div 
          onClick={() => {
            setSelectedStatusTab('completed');
            setShowProjectsList(true);
          }}
          className={`relative rounded-2xl p-5 border transition-all cursor-pointer group select-none ${
            selectedStatusTab === 'completed'
              ? 'bg-sky-50/80 dark:bg-sky-950/60 border-sky-600 shadow-md shadow-sky-500/10'
              : 'bg-white dark:bg-slate-950 border-sky-100 dark:border-slate-800 hover:border-sky-400 hover:bg-sky-50/30'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              {t('المكتملة', 'Completed')}
            </span>
            <div className="flex items-center gap-2">
              <CircularProjectProgress 
                percentage={parseFloat(completedPct)}
                status="completed"
                size={36}
                strokeWidth={3.5}
                showLabel={false}
                glow={false}
              />
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300 border border-sky-200 dark:border-sky-800 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-blue-950 dark:text-white font-mono tracking-tight">
                {stats.completed.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {t('مشروع مستلم', 'delivered')}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-2 border-t border-sky-100 dark:border-slate-800/80">
              <span className="text-slate-500 dark:text-slate-400">{t('نسبة المشاريع:', 'Share of total:')}</span>
              <span className="font-bold text-sky-600 dark:text-sky-400 font-mono">{completedPct}%</span>
            </div>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-full bg-sky-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-sky-500 h-full rounded-full transition-all duration-700" 
              style={{ width: `${completedPct}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="text-sky-600/80">{t('تشغيل وتسليم نهائي', 'Handed over')}</span>
            <span className="group-hover:text-sky-600 transition-colors font-medium flex items-center gap-0.5">
              {t('عرض القائمة', 'View list')} 
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: المتوقفة (Paused / On Hold) */}
        <div 
          onClick={() => {
            setSelectedStatusTab('paused');
            setShowProjectsList(true);
          }}
          className={`relative rounded-2xl p-5 border transition-all cursor-pointer group select-none ${
            selectedStatusTab === 'paused'
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-400 shadow-md'
              : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              {t('المتوقفة', 'Paused / On Hold')}
            </span>
            <div className="flex items-center gap-2">
              <CircularProjectProgress 
                percentage={parseFloat(pausedPct)}
                status="paused"
                size={36}
                strokeWidth={3.5}
                showLabel={false}
                glow={false}
              />
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                <PauseCircle className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-blue-950 dark:text-white font-mono tracking-tight">
                {stats.paused.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {t('مشروع موقوف', 'paused projects')}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-slate-500 dark:text-slate-400">{t('نسبة المشاريع:', 'Share of total:')}</span>
              <span className="font-bold text-slate-600 dark:text-slate-300 font-mono">{pausedPct}%</span>
            </div>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-slate-400 h-full rounded-full transition-all duration-700" 
              style={{ width: `${pausedPct}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="text-slate-500">{t('قيد إعادة الجدولة', 'In rescheduling')}</span>
            <span className="group-hover:text-slate-700 dark:group-hover:text-white transition-colors font-medium flex items-center gap-0.5">
              {t('عرض القائمة', 'View list')} 
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 4: إجمالي المشاريع (Total Monitored Projects) - Royal Blue Gradient */}
        <div 
          onClick={() => {
            setSelectedStatusTab('all');
            setShowProjectsList(true);
          }}
          className="relative rounded-2xl p-5 border border-blue-500 bg-gradient-to-br from-blue-700 via-blue-600 to-sky-600 text-white shadow-md shadow-blue-600/20 cursor-pointer group select-none"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-blue-100 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              {t('إجمالي المشاريع المرصودة', 'Total Monitored')}
            </span>
            <div className="p-2 rounded-xl bg-white/15 text-white border border-white/20 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {total.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-blue-100 font-medium">
                {t('مشروع كلي', 'total projects')}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/20">
              <span className="text-blue-100">{t('الاستثمار التقديري:', 'Est. Investment:')}</span>
              <span className="font-bold text-white font-mono text-[11px]">{kingdomOverallStats.totalInvestmentSar}</span>
            </div>
          </div>

          {/* Combined Multi-Color Distribution Bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden flex">
            <div className="bg-white h-full transition-all duration-700" style={{ width: `${underConstructionPct}%` }} title="تحت الإنشاء" />
            <div className="bg-sky-200 h-full transition-all duration-700" style={{ width: `${completedPct}%` }} title="مكتملة" />
            <div className="bg-blue-300 h-full transition-all duration-700" style={{ width: `${pausedPct}%` }} title="متوقفة" />
          </div>

          <div className="mt-2 text-[11px] text-blue-100 flex items-center justify-between">
            <span>{t('تغطية وطنية شاملة', 'Nationwide')}</span>
            <span className="group-hover:text-white transition-colors font-medium flex items-center gap-0.5">
              {t('عرض الكل', 'View all')} 
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>

      {/* 3. Distribution Ratio Bar Strip (شريط التوزيع النسبي) */}
      <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-blue-950 dark:text-white flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            {t('التوزيع النسبي لحالات المشاريع بالمملكة:', 'Kingdom Project Status Ratio:')}
          </span>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-600"></span>
              {t('تحت الإنشاء', 'Under Construction')} ({underConstructionPct}%)
            </span>
            <span className="flex items-center gap-1.5 text-sky-700 dark:text-sky-300">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500"></span>
              {t('مكتملة', 'Completed')} ({completedPct}%)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-400"></span>
              {t('متوقفة', 'Paused')} ({pausedPct}%)
            </span>
          </div>
        </div>

        {/* High-Resolution Stacked Segment Bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex shadow-inner">
          <div 
            className="bg-blue-600 hover:brightness-110 transition-all duration-700 relative group"
            style={{ width: `${underConstructionPct}%` }}
          />
          <div 
            className="bg-sky-500 hover:brightness-110 transition-all duration-700 relative group"
            style={{ width: `${completedPct}%` }}
          />
          <div 
            className="bg-slate-400 hover:brightness-110 transition-all duration-700 relative group"
            style={{ width: `${pausedPct}%` }}
          />
        </div>
      </div>

      {/* 4. Interactive Projects Explorer Header & Filter Tabs */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-blue-100 dark:border-slate-800 overflow-x-auto">
            <button
              onClick={() => setSelectedStatusTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedStatusTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800/60'
              }`}
            >
              {t('كافة المشاريع', 'All Projects')} ({filteredProjects.length})
            </button>
            <button
              onClick={() => setSelectedStatusTab('under_construction')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedStatusTab === 'under_construction'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              {t('تحت الإنشاء', 'Under Construction')}
            </button>
            <button
              onClick={() => setSelectedStatusTab('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedStatusTab === 'completed'
                  ? 'bg-sky-600 text-white font-bold shadow-sm'
                  : 'text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              {t('المكتملة', 'Completed')}
            </button>
            <button
              onClick={() => setSelectedStatusTab('paused')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedStatusTab === 'paused'
                  ? 'bg-slate-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              {t('المتوقفة', 'Paused')}
            </button>
          </div>

          {/* Search Box & Quick Navigation to Live Map */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('بحث باسم المشروع أو المقاول...', 'Search project or contractor...')}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl pr-9 pl-3 py-2 border border-blue-100 dark:border-slate-800 focus:outline-none focus:border-blue-600 placeholder:text-slate-400"
              />
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('live-projects-map')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
                title={t('فتح خريطة المشاريع التفاعلية الكاملة', 'Open Full Interactive Projects Map')}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('الخريطة الكاملة', 'Full Map')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-bar: Circular Progress Indicator & Display Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-2xl bg-blue-50/40 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800 text-xs">
          {/* Average Completion Circular Gauge Widget */}
          <div className="flex items-center gap-3">
            <div className="shrink-0 p-1 bg-white dark:bg-slate-950 rounded-xl border border-blue-100 dark:border-slate-800 shadow-2xs">
              <CircularProjectProgress
                percentage={avgProgressPct}
                status={selectedStatusTab === 'completed' ? 'completed' : selectedStatusTab === 'paused' ? 'paused' : 'under_construction'}
                size={44}
                strokeWidth={4}
                glow={true}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-blue-950 dark:text-white">
                <Gauge className="w-3.5 h-3.5 text-blue-600" />
                <span>{t('متوسط الإنجاز الميداني:', 'Average Field Completion:')}</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-black">{avgProgressPct}%</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t(
                  `بناءً على ${filteredProjects.length} مشروعاً مرصوداً ومطابقاً للشروط`,
                  `Based on ${filteredProjects.length} monitored matching projects`
                )}
              </p>
            </div>
          </div>

          {/* Sort & View Mode Switches */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Sort by Progress buttons */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-950 p-1 rounded-xl border border-blue-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold px-1.5 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-blue-600" />
                <span className="hidden sm:inline">{t('الفرز:', 'Sort:')}</span>
              </span>
              <button
                onClick={() => setSortOrder('default')}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  sortOrder === 'default'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
                }`}
              >
                {t('الافتراضي', 'Default')}
              </button>
              <button
                onClick={() => setSortOrder('highest')}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  sortOrder === 'highest'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
                }`}
                title={t('ترتيب حسب الأعلى نسبة إنجاز', 'Sort by Highest Progress')}
              >
                <TrendingUp className="w-3 h-3" />
                <span>{t('الأعلى إنجازاً', 'Highest')}</span>
              </button>
              <button
                onClick={() => setSortOrder('lowest')}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  sortOrder === 'lowest'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
                }`}
                title={t('ترتيب حسب الأقل نسبة إنجاز', 'Sort by Lowest Progress')}
              >
                <span>{t('الأقل', 'Lowest')}</span>
              </button>
            </div>

            {/* View Mode Toggle: Cards vs Radar */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-950 p-1 rounded-xl border border-blue-100 dark:border-slate-800">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-500 hover:text-blue-600'
                }`}
                title={t('عرض البطاقات التفصيلية مع المقاييس الدائرية', 'Detailed Cards with Gauges')}
                aria-label="عرض البطاقات"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('radar')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'radar'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-500 hover:text-blue-600'
                }`}
                title={t('مصفوفة المقاييس الدائرية (Gauges Radar)', 'Circular Gauges Radar Grid')}
                aria-label="مصفوفة المقاييس الدائرية"
              >
                <Gauge className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Projects Cards Responsive Grid (Cards View with Circular Progress Bars) */}
        {showProjectsList && viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {sortedProjects.map((proj) => {
              const isUnderConst = proj.status === 'under_construction';
              const isComp = proj.status === 'completed';
              const isPaused = proj.status === 'paused';

              return (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-slate-950 rounded-2xl border border-blue-100 dark:border-slate-800 p-4 space-y-3 hover:border-blue-400 dark:hover:border-slate-700 transition-all hover:shadow-md flex flex-col justify-between group"
                >
                  {/* Top Bar: Code + Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-blue-100 dark:border-slate-800">
                      {proj.code}
                    </span>

                    {isUnderConst && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        {t('تحت الإنشاء', 'Under Construction')}
                      </span>
                    )}
                    {isComp && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        <CheckCircle2 className="w-3 h-3 text-sky-600" />
                        {t('مكتمل', 'Completed')}
                      </span>
                    )}
                    {isPaused && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        <PauseCircle className="w-3 h-3 text-slate-500" />
                        {t('متوقف مؤقتاً', 'Paused')}
                      </span>
                    )}
                  </div>

                  {/* Project Title + Circular Progress Gauge */}
                  <div className="flex items-center justify-between gap-3 pt-0.5">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-blue-950 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors leading-snug">
                        {isAr ? proj.nameAr : proj.nameEn}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{proj.city}</span>
                        <span>•</span>
                        <span>{isAr ? proj.categoryAr : proj.categoryEn}</span>
                      </div>
                    </div>

                    {/* Circular Progress Gauge */}
                    <div 
                      className="shrink-0 p-1.5 rounded-2xl bg-blue-50/40 dark:bg-slate-900/60 border border-blue-100/70 dark:border-slate-800/80 shadow-2xs group-hover:scale-105 group-hover:shadow-sm transition-all flex flex-col items-center"
                      title={`${t('نسبة الإنجاز:', 'Progress:')} ${proj.progressPct}%`}
                    >
                      <CircularProjectProgress 
                        percentage={proj.progressPct}
                        status={proj.status}
                        size={70}
                        strokeWidth={6}
                        sublabel={isComp ? (isAr ? 'مكتمل' : 'Done') : isPaused ? (isAr ? 'موقوف' : 'Hold') : (isAr ? 'إنجاز' : 'Progress')}
                        glow={true}
                      />
                    </div>
                  </div>

                  {/* Field Construction Phase Milestone Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        {t('المرحلة الإنشائية:', 'Field Phase:')}
                      </span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        {proj.progressPct >= 80 ? (isAr ? 'التشطيبات والواجهات' : 'Finishing & Facades') 
                          : proj.progressPct >= 50 ? (isAr ? 'الهيكل الإنشائي والخرسانة' : 'Structural Works')
                          : proj.progressPct >= 25 ? (isAr ? 'الأساسات والأقبية' : 'Foundations & Deep Piling')
                          : (isAr ? 'الحفر وتجهيز الموقع' : 'Excavation & Prep')}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isComp ? 'bg-sky-500' : isUnderConst ? 'bg-blue-600' : 'bg-slate-400'
                        }`}
                        style={{ width: `${proj.progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-blue-50/40 dark:bg-slate-900/60 p-2.5 rounded-xl border border-blue-100 dark:border-slate-800/60 text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block">{t('المقاول المنفذ:', 'Contractor:')}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{proj.contractor}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block">{t('المساحة الإجمالية:', 'Area:')}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{proj.areaFormatted}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block">{t('القيمة التقديرية:', 'Value:')}</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">{proj.estimatedValueSar}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block">{t('الموعد المستهدف:', 'Target date:')}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{proj.expectedCompletion}</span>
                    </div>
                  </div>

                  {/* Notes / Pause Reason if any */}
                  {proj.pauseReasonAr && isPaused && (
                    <div className="text-[11px] bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 p-2 rounded-lg border border-slate-200 dark:border-slate-800 flex items-start gap-1.5">
                      <PauseCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span>{proj.pauseReasonAr}</span>
                    </div>
                  )}

                  {proj.notesAr && !isPaused && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {proj.notesAr}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 5b. Radar Gallery of Circular Gauges (Spotlight View) */}
        {showProjectsList && viewMode === 'radar' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 pt-1">
            {sortedProjects.map((proj) => {
              const isUnderConst = proj.status === 'under_construction';
              const isComp = proj.status === 'completed';

              return (
                <div
                  key={`radar-${proj.id}`}
                  className="bg-white dark:bg-slate-950 rounded-2xl border border-blue-100 dark:border-slate-800 p-3 flex flex-col items-center text-center space-y-2.5 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-md group"
                >
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded border border-blue-50 dark:border-slate-800 w-full truncate">
                    {proj.code}
                  </span>

                  {/* Prominent Circular Gauge */}
                  <div className="p-1 rounded-2xl bg-blue-50/30 dark:bg-slate-900/60 group-hover:scale-105 transition-transform">
                    <CircularProjectProgress
                      percentage={proj.progressPct}
                      status={proj.status}
                      size={82}
                      strokeWidth={7}
                      sublabel={isComp ? (isAr ? 'مكتمل' : 'Done') : (isAr ? 'إنجاز' : 'Progress')}
                      glow={true}
                    />
                  </div>

                  <div className="w-full space-y-0.5">
                    <h5 className="text-xs font-bold text-blue-950 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {isAr ? proj.nameAr : proj.nameEn}
                    </h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {proj.city}
                    </p>
                  </div>

                  <span className={`w-full text-[10px] font-bold py-1 px-1.5 rounded-lg truncate ${
                    isComp 
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300' 
                      : isUnderConst 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' 
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {proj.expectedCompletion}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-blue-100 dark:border-slate-800/80 space-y-2">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {t('لا توجد مشاريع مطابقة لمعايير التصفية الحالية', 'No projects match the selected filters')}
            </p>
            <button
              onClick={() => {
                setSelectedRegion('الكل');
                setSelectedStatusTab('all');
                setSearchQuery('');
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
            >
              {t('إعادة ضبط الفلاتر', 'Reset filters')}
            </button>
          </div>
        )}
      </div>

      {/* 6. Footer Summary Bar */}
      <div className="pt-3 border-t border-blue-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('آخر تحديث فضائي:', 'Latest Satellite Update:')} <strong className="text-slate-800 dark:text-slate-200 font-mono">2026-09-23</strong></span>
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="hidden sm:inline">{t('دقة المطابقة الميدانية:', 'Field Accuracy:')} <strong className="text-blue-600 dark:text-blue-400 font-mono">99.2%</strong></span>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('live-projects-map')}
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            <span>{t('استكشف كافة مواقع البناء بالأقمار الصناعية', 'Explore All Sites via Satellite')}</span>
            <ChevronLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
          </button>
        )}
      </div>
    </section>
  );
};
