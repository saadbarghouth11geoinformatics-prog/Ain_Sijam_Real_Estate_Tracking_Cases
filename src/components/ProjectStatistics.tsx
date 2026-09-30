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
  Eye,
  Plane,
  Warehouse,
  Sprout,
  Mountain,
  Zap,
  Wrench,
  Users,
  ShieldCheck,
  RotateCcw
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
import { ProjectPhaseDonutChart } from './ProjectPhaseDonutChart';
import { ProjectPhaseModal } from './ProjectPhaseModal';
import { ProjectCoverImage } from './ProjectCoverImage';
import { constructionSitesList, ConstructionSiteItem } from '../data/constructionSitesData';

export type ProjectStatusType = 'under_construction' | 'completed' | 'paused';
export type DetailedProjectItem = ConstructionSiteItem;
export const sampleKingdomProjects: ConstructionSiteItem[] = constructionSitesList;

interface ProjectStatisticsProps {
  onNavigate?: (pageId: string) => void;
  onNavigateToProject?: (projectId: string) => void;
  selectedCity?: string;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  focusedProjectId?: string | null;
  className?: string;
}

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'توسعة مطارات وبنية تحتية':
      return Plane;
    case 'مجمعات لوجستية وصناعية':
      return Warehouse;
    case 'تطوير بيئي وزراعي ومرافق ري':
      return Sprout;
    case 'أبراج وتطوير حضري':
      return Building2;
    case 'وجهات سياحية ومعالم':
      return Mountain;
    case 'طاقة ومرافق وبنية تحتية':
      return Zap;
    default:
      return Building2;
  }
};

const CATEGORY_FILTER_TABS = [
  { id: 'all', labelAr: 'كافة التصنيفات', labelEn: 'All Categories', icon: Layers },
  { id: 'توسعة مطارات وبنية تحتية', labelAr: 'مطارات وبنية تحتية', labelEn: 'Airports & Transit', icon: Plane },
  { id: 'مجمعات لوجستية وصناعية', labelAr: 'مجمعات لوجستية', labelEn: 'Logistics & Industrial', icon: Warehouse },
  { id: 'تطوير بيئي وزراعي ومرافق ري', labelAr: 'تطوير بيئي وزراعي', labelEn: 'Agro & Environmental', icon: Sprout },
  { id: 'أبراج وتطوير حضري', labelAr: 'أبراج وتطوير حضري', labelEn: 'Urban Towers', icon: Building2 },
  { id: 'وجهات سياحية ومعالم', labelAr: 'وجهات سياحية', labelEn: 'Tourism Destinations', icon: Mountain },
  { id: 'طاقة ومرافق وبنية تحتية', labelAr: 'طاقة ومرافق', labelEn: 'Energy & Utilities', icon: Zap }
];

export const ProjectStatistics: React.FC<ProjectStatisticsProps> = ({ 
  onNavigate,
  onNavigateToProject,
  selectedCity,
  selectedCategory: propCategory,
  onSelectCategory,
  focusedProjectId,
  className = ''
}) => {
  const { t, isAr } = useLanguage();

  // Filters & Controls
  const [selectedRegion, setSelectedRegion] = useState<string>('الكل');
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const activeCategory = propCategory !== undefined ? propCategory : internalCategory;

  const handleSelectCategory = (catId: string) => {
    setInternalCategory(catId);
    onSelectCategory?.(catId);
  };

  const [selectedStatusTab, setSelectedStatusTab] = useState<'all' | ProjectStatusType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showProjectsList, setShowProjectsList] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'default' | 'highest' | 'lowest'>('default');
  const [viewMode, setViewMode] = useState<'cards' | 'radar'>('cards');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ConstructionSiteItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Available regions based on actual data
  const regionsList = [
    { id: 'الكل', labelAr: 'كافة مناطق المملكة (24)', labelEn: 'All Kingdom (24)' },
    { id: 'الوسطى', labelAr: 'المنطقة الوسطى (8)', labelEn: 'Central Region (8)' },
    { id: 'الغربية', labelAr: 'المنطقة الغربية (8)', labelEn: 'Western Region (8)' },
    { id: 'الشمالية', labelAr: 'المنطقة الشمالية (6)', labelEn: 'Northern Region (6)' },
    { id: 'الجنوبية', labelAr: 'المنطقة الجنوبية (2)', labelEn: 'Southern Region (2)' },
  ];

  // Dynamic statistics calculated from central constructionSitesList synced with city and category
  const stats = useMemo(() => {
    let pool = constructionSitesList;
    if (selectedCity && selectedCity !== 'الكل') {
      pool = pool.filter(s => s.city === selectedCity);
    } else if (selectedRegion !== 'الكل') {
      pool = pool.filter(s => s.region === selectedRegion);
    }
    if (activeCategory !== 'all') {
      pool = pool.filter(s => s.category === activeCategory);
    }

    const underConst = pool.filter(s => s.statusType === 'under_construction' || (!s.statusType && s.status !== 'مرحلة التسليم' && s.status !== 'مكتمل')).length;
    const completed = pool.filter(s => s.statusType === 'completed' || s.status === 'مرحلة التسليم' || s.status === 'مكتمل').length;
    const paused = pool.filter(s => s.statusType === 'paused' || s.status === 'متوقف مؤقتاً').length;

    const total = pool.length || 1;
    return {
      total: pool.length,
      underConstruction: underConst,
      completed,
      paused,
      underConstructionPct: ((underConst / total) * 100).toFixed(1),
      completedPct: ((completed / total) * 100).toFixed(1),
      pausedPct: ((paused / total) * 100).toFixed(1),
    };
  }, [selectedCity, selectedRegion, activeCategory]);

  // Filtered projects list based on city, category, region, status, and search
  const filteredProjects = useMemo(() => {
    return constructionSitesList.filter(project => {
      // City match (strict)
      if (selectedCity && selectedCity !== 'الكل' && project.city !== selectedCity) {
        return false;
      }

      // Region match
      const matchRegion = selectedRegion === 'الكل' || project.region === selectedRegion;
      if (!matchRegion) return false;

      // Category match
      if (activeCategory !== 'all' && project.category !== activeCategory) {
        return false;
      }
      
      // Status match
      let matchStatus = true;
      if (selectedStatusTab === 'under_construction') {
        matchStatus = project.statusType === 'under_construction' || (!project.statusType && project.status !== 'مرحلة التسليم' && project.status !== 'مكتمل');
      } else if (selectedStatusTab === 'completed') {
        matchStatus = project.statusType === 'completed' || project.status === 'مرحلة التسليم' || project.status === 'مكتمل';
      } else if (selectedStatusTab === 'paused') {
        matchStatus = project.statusType === 'paused' || project.status === 'متوقف مؤقتاً';
      }

      // Search match (name, city, contractor, code, category)
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        project.name.toLowerCase().includes(q) || 
        (project.nameEn && project.nameEn.toLowerCase().includes(q)) ||
        project.city.toLowerCase().includes(q) ||
        (project.contractor && project.contractor.toLowerCase().includes(q)) ||
        project.code.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q);

      return matchStatus && matchSearch;
    });
  }, [selectedCity, selectedRegion, activeCategory, selectedStatusTab, searchQuery]);

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

  const handleOpenModal = (project: ConstructionSiteItem) => {
    setSelectedProjectForModal(project);
    setIsModalOpen(true);
  };

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
              {t('إحصائيات ورصد المشاريع الكبرى', 'Project Monitoring & Statistics')}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
              {t('24 مشروعاً معتمداً ومطابقاً مكانياً', '24 Audited & Verified Projects')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {t(
              'رصد مباشر لحالة التنفيذ الميداني ونسب الإنجاز التراكمية، ومطابقة دقيقة بين مسميات المشاريع، وإحداثيات الخريطة، والتصوير الميداني الفعلي.',
              'Real-time field monitoring, progress metrics, and strict factual validation between project titles, map positions, and field photography.'
            )}
          </p>
        </div>

        {/* Regional Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="appearance-none bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-2 pe-8 rounded-xl border border-blue-100 dark:border-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
              aria-label="تصفية حسب المنطقة"
            >
              {regionsList.map(r => (
                <option key={r.id} value={r.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {isAr ? r.labelAr : r.labelEn}
                </option>
              ))}
            </select>
            <div className="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Statistics Cards (Under Construction, Delivered/Completed, Paused, Total) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: تحت الإنشاء */}
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
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 group-hover:scale-110 transition-transform">
              <HardHat className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-blue-950 dark:text-white font-mono tracking-tight">
                {stats.underConstruction}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {t('مشروع نشط', 'active projects')}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-2 border-t border-blue-100 dark:border-slate-800/80">
              <span className="text-slate-500 dark:text-slate-400">{t('نسبة المشاريع:', 'Share:')}</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{stats.underConstructionPct}%</span>
            </div>
          </div>

          <div className="w-full bg-blue-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-700" 
              style={{ width: `${stats.underConstructionPct}%` }}
            />
          </div>
        </div>

        {/* Card 2: المكتملة ومرحلة التسليم */}
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
              {t('مرحلة التسليم والتجهيز', 'Handover & Staging')}
            </span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300 border border-sky-200 dark:border-sky-800 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-blue-950 dark:text-white font-mono tracking-tight">
                {stats.completed}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {t('مشروع متقدم', 'advanced projects')}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-2 border-t border-sky-100 dark:border-slate-800/80">
              <span className="text-slate-500 dark:text-slate-400">{t('نسبة المشاريع:', 'Share:')}</span>
              <span className="font-bold text-sky-600 dark:text-sky-400 font-mono">{stats.completedPct}%</span>
            </div>
          </div>

          <div className="w-full bg-sky-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-sky-500 h-full rounded-full transition-all duration-700" 
              style={{ width: `${stats.completedPct}%` }}
            />
          </div>
        </div>

        {/* Card 3: التوزيع الميداني للكوادر والمعدات */}
        <div className="relative rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              {t('الآليات والكوادر النشطة', 'Fleet & Workforce')}
            </span>
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-500">إجمالي المعدات:</span>
              <span className="text-lg font-black text-blue-950 dark:text-white font-mono">
                {filteredProjects.reduce((acc, p) => acc + p.activeMachinery, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-baseline justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">إجمالي القوى العاملة:</span>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                {filteredProjects.reduce((acc, p) => acc + p.activeWorkers, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: إجمالي المشاريع المرصودة */}
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
                {stats.total}
              </span>
              <span className="text-xs text-blue-100 font-medium">
                {t('مشروع معتمد', 'verified projects')}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/20">
              <span className="text-blue-100">{t('متوسط الإنجاز الميداني:', 'Avg Progress:')}</span>
              <span className="font-bold text-white font-mono">{avgProgressPct}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Interactive Projects Explorer Header & Filter Tabs */}
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
              {t('مرحلة التسليم', 'Handover Phase')}
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
                placeholder={t('بحث باسم المشروع، المدينة، المقاول...', 'Search project, city, contractor...')}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl pr-9 pl-3 py-2 border border-blue-100 dark:border-slate-800 focus:outline-none focus:border-blue-600 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('map')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
                title={t('فتح خريطة المشاريع التفاعلية المباشرة', 'Open Live Interactive Map')}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('الخريطة الحية', 'Live Map')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Synchronized with Live Map) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('التصنيف:', 'Category:')}</span>
          </span>
          {CATEGORY_FILTER_TABS.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <IconComp className="w-3 h-3 stroke-[1.8]" />
                <span>{isAr ? cat.labelAr : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
        {showProjectsList && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
            {sortedProjects.map((proj) => {
              const CatIcon = getCategoryIcon(proj.category);
              const isComp = proj.status === 'مرحلة التسليم' || proj.status === 'مكتمل';

              const isSelected = focusedProjectId === proj.id;

              return (
                <div
                  key={proj.id}
                  id={`project-card-${proj.id}`}
                  className={`bg-white dark:bg-slate-950 rounded-2xl border p-4 space-y-3.5 transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500 shadow-md bg-blue-50/20 dark:bg-blue-950/20'
                      : 'border-blue-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Cover Image (Consistent 16:9 ratio, object-fit cover, onError fallback) */}
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => {
                        if (onNavigateToProject) {
                          onNavigateToProject(proj.id);
                        } else {
                          handleOpenModal(proj);
                        }
                      }}
                    >
                      <ProjectCoverImage
                        src={proj.previewImage}
                        alt={`${proj.name} - ${proj.category}`}
                        aspectRatioClass="aspect-16/9"
                        className="shadow-xs"
                        projectTitle={proj.name}
                        city={proj.city}
                        category={proj.category}
                      />
                      <div className="absolute top-2.5 start-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/20">
                        {proj.code}
                      </div>
                      <div className="absolute top-2.5 end-2.5 px-2 py-0.5 rounded-md bg-blue-600/90 backdrop-blur-md text-[10px] font-bold text-white">
                        {proj.status}
                      </div>
                    </div>

                    {/* Project Title & Category */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        <CatIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="line-clamp-1">{proj.category}</span>
                      </div>
                      <h4 
                        onClick={() => {
                          if (onNavigateToProject) {
                            onNavigateToProject(proj.id);
                          } else {
                            handleOpenModal(proj);
                          }
                        }}
                        className="text-sm font-bold text-blue-950 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {proj.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{proj.city}</span>
                        <span>•</span>
                        <span>المنطقة {proj.region}</span>
                      </div>
                    </div>

                    {/* Progress Bar & Percentage */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">{t('نسبة الإنجاز الفعلي:', 'Progress:')}</span>
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                          {proj.progressPct}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${
                            isComp ? 'bg-sky-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${proj.progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Telemetry Chips (Machinery, Workers, Area) */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">{t('الآليات:', 'Machinery:')}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{proj.activeMachinery}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">{t('الكوادر:', 'Workers:')}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{proj.activeWorkers}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(proj)}
                      className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t('المراحل والاعتماد', 'Milestones')}</span>
                    </button>

                    {(onNavigateToProject || onNavigate) && (
                      <button
                        onClick={() => {
                          if (onNavigateToProject) {
                            onNavigateToProject(proj.id);
                          } else if (onNavigate) {
                            onNavigate('map');
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                        title={t('عرض الموقع على الخريطة', 'Inspect on Map')}
                      >
                        <Compass className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {t('لا توجد مشاريع مطابقة لمعايير البحث الحالية', 'No projects match current filter criteria')}
            </p>
            <button
              onClick={() => {
                setSelectedRegion('الكل');
                setSelectedStatusTab('all');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer hover:bg-blue-700 transition-colors"
            >
              {t('إعادة ضبط الفلاتر', 'Reset filters')}
            </button>
          </div>
        )}
      </div>

      {/* 5. Phase Detail Modal */}
      <ProjectPhaseModal
        project={selectedProjectForModal}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProjectForModal(null);
        }}
        onNavigateToMap={() => {
          setIsModalOpen(false);
          if (onNavigate) onNavigate('map');
        }}
      />
    </section>
  );
};
