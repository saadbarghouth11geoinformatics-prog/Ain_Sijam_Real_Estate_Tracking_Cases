import React, { useState, useMemo, useEffect } from 'react';
import { 
  Briefcase, 
  Layers, 
  Calendar, 
  Satellite, 
  CheckCircle2, 
  Filter, 
  ExternalLink,
  Building2,
  Plane,
  Train,
  Factory,
  Palmtree,
  Sparkles,
  ShieldCheck,
  Search,
  X,
  ArrowLeft,
  ArrowDown,
  Eye,
  Compass
} from 'lucide-react';
import { 
  CASE_STUDY_PROJECTS, 
  CASE_STUDY_CATEGORIES, 
  CaseStudyProject, 
  SATELLITE_ATTRIBUTION,
  BASEMAP_ATTRIBUTION
} from '../../data/caseStudiesData';
import { CaseStudyCard } from './CaseStudyCard';
import { CaseStudyDetailModal } from './CaseStudyDetailModal';
import { ImageViewerWithZoom } from './ImageViewerWithZoom';
import { PagesDirectoryGrid } from '../PagesDirectoryGrid';
import { FeaturedProjectStory } from './FeaturedProjectStory';
import { StoryProjectRow } from './StoryProjectRow';

interface CaseStudiesPageProps {
  onNavigate?: (pageId: string) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<CaseStudyProject | null>(null);
  const [isHeroLoaded, setIsHeroLoaded] = useState<boolean>(false);

  // Subtle entrance effect timer (350-500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroLoaded(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  // Handle hash scrolling on mount
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  // Filter projects by category and optional search term
  const filteredProjects = useMemo(() => {
    return CASE_STUDY_PROJECTS.filter((project) => {
      const matchesCategory = 
        selectedCategory === 'all' || project.categoryKey === selectedCategory;
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch = 
        project.nameAr.toLowerCase().includes(query) ||
        (project.nameEn && project.nameEn.toLowerCase().includes(query)) ||
        project.locationAr.toLowerCase().includes(query) ||
        project.descriptionAr.toLowerCase().includes(query) ||
        project.statusAr.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryCount = (key: string) => {
    if (key === 'all') return CASE_STUDY_PROJECTS.length;
    return CASE_STUDY_PROJECTS.filter(p => p.categoryKey === key).length;
  };

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'urban_commercial':
        return Building2;
      case 'transport_infra':
        return Train;
      case 'tourism_entertainment':
        return Palmtree;
      case 'aviation_airports':
        return Plane;
      case 'industrial_energy':
        return Factory;
      default:
        return Briefcase;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Available high-definition background scenes for the Hero section
  const HERO_BACKGROUNDS = [
    { id: 'skyline', label: 'أفق الرياض بانوراما', src: '/images_webp/02-riyadh-skyline-city.webp' },
    { id: 'kafd_tower', label: 'كافد وبرج المملكة', src: '/images_webp/04-riyadh-kafd-kingdom-tower.webp' },
    { id: 'kafd_detail', label: 'أبراج مركز الملك عبدالله', src: '/images_webp/08-kafd-city-detail.webp' },
    { id: 'skyline_north', label: 'شمال العاصمة', src: '/images_webp/01-riyadh-skyline-north.webp' },
  ];
  const [activeHeroBg, setActiveHeroBg] = useState('/images_webp/02-riyadh-skyline-city.webp');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors" dir="rtl">
      
      {/* 1. HERO SECTION WITH CLEAR BACKGROUND IMAGE & OVERLAID CONTENT */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[560px] flex items-center border-b border-slate-800">
        
        {/* Crystal-Clear Background Image - Fully visible, vivid & sharp */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            isHeroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ 
            backgroundImage: `url('${activeHeroBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Gentle ambient gradient (only 30-40% opacity) so the clear cityscape image shines through */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(7, 14, 30, 0.45) 0%, rgba(7, 14, 30, 0.20) 50%, rgba(7, 14, 30, 0.35) 100%)'
          }}
        />
        {/* Soft edge blend for smooth transition with header and section below */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(7, 14, 30, 0.55) 0%, transparent 15%, transparent 80%, rgba(7, 14, 30, 0.85) 100%)'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
          
          {/* Quick Scene Selector on Top Bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 border border-white/20 text-blue-200 text-xs font-bold backdrop-blur-md shadow-md">
              <Satellite className="w-3.5 h-3.5 text-sky-400" />
              <span>عين سيجام • تتبع الأصول العقارية والمشاريع الكبرى</span>
            </div>

            {/* Background scene switcher tabs */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/60 border border-white/20 backdrop-blur-md shadow-md text-xs">
              <span className="text-slate-300 px-2 text-[11px] font-medium">خلفية المشهد:</span>
              {HERO_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setActiveHeroBg(bg.src)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    activeHeroBg === bg.src
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Text Content Overlaid on top inside a refined Frosted Glass Card */}
            <div className={`lg:col-span-7 transition-all duration-400 ease-out delay-100 motion-reduce:transition-none motion-reduce:transform-none ${
              isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
            }`}>
              <div className="bg-slate-950/75 sm:bg-slate-950/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl shadow-slate-950/70 space-y-5">
                
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-['Cairo'] drop-shadow-md">
                    سابقة الأعمال
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-sm">
                    نماذج واقعية لمتابعة تطور المشروعات والأصول العقارية من التخطيط والموافقات إلى التنفيذ والتشغيل باستخدام البيانات الجغرافية وصور الأقمار الصناعية.
                  </p>
                </div>

                {/* Scope Bullet Highlights Overlaid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-100 pt-1">
                  <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">تدقيق الحدود والقرارات المساحية والملكيات</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">متابعة نسب الإنجاز ورصد الهياكل من الفضاء</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">فحص 16 مرحلة متسلسلة لدورة حياة الأصل</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">بيانات استشعار فضائي موثقة من سنتينل وEsri</span>
                  </div>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedProject(CASE_STUDY_PROJECTS[0])}
                    className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/35 transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>استعراض دراسة مركز الملك عبدالله المالي (KAFD)</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('indicators')}
                    className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4 text-sky-300" />
                    <span>مؤشرات وسجل المشاريع الستة</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Supporting Visual: comparison_clear_before_latest.jpg from KAFD with clean glass frame */}
            <div className={`lg:col-span-5 transition-all duration-400 ease-out delay-250 motion-reduce:transition-none motion-reduce:transform-none ${
              isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
            }`}>
              <div 
                onClick={() => setSelectedProject(CASE_STUDY_PROJECTS[0])}
                className="relative rounded-3xl overflow-hidden bg-slate-950/75 backdrop-blur-md border border-white/20 shadow-2xl p-2 group cursor-pointer hover:border-blue-400/60 transition-all duration-300"
                title="انقر لفتح دراسة حالة مركز الملك عبدالله المالي بالكامل"
              >
                <ImageViewerWithZoom
                  src="/assets/case-studies/01-kafd-riyadh/comparison_clear_before_latest.jpg"
                  fallbackSrc="/assets/case-studies/01-kafd-riyadh/timeline_5_stages_high_resolution.jpg"
                  alt="مقارنة فضائية قبل وبعد لمشروع مركز الملك عبدالله المالي"
                  caption="مقارنة فضائية معتمدة توضح مراحل التطور لمركز الملك عبدالله المالي (KAFD) من التأسيس إلى التشغيل"
                  badgeLabel="نموذج مقارنة فضائي معتمد"
                  aspectRatioClass="aspect-16/10"
                  objectFit="contain"
                />
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300 px-1">
                  <span>المصدر: Sentinel-2 & Esri World Imagery</span>
                  <span className="text-blue-400 font-bold group-hover:underline flex items-center gap-1">
                    <span>فتح دراسة الحالة</span>
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REDESIGNED DIRECTORY & INDICATORS SECTION (#indicators) */}
      <div className="bg-slate-50/80 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <PagesDirectoryGrid
            currentPageId="case-studies"
            onNavigate={(pageId) => {
              if (onNavigate) {
                onNavigate(pageId);
              }
            }}
            id="indicators"
            featuredActionLabel="استكشاف المشروعات الميدانية الستة بالأسفل"
            onFeaturedAction={() => scrollToSection('projects-grid')}
          />
        </div>
      </div>

      {/* 3. FILTERING CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {CASE_STUDY_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.key);
              const isActive = selectedCategory === cat.key;
              const count = getCategoryCount(cat.key);
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.labelAr}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-white/25 text-white' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مشروع أو موقع..."
              className="w-full pr-10 pl-9 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="مسح البحث"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 5. IMMERSIVE VISUAL PROJECT-TRACKING STORIES */}
      <section id="projects-grid" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20 scroll-mt-24">
        {filteredProjects.length > 0 ? (
          <div className="space-y-12 sm:space-y-16">
            
            {/* If the first project is KAFD (or default view), present as Large Featured Case Study */}
            {filteredProjects[0].id === 'kafd-riyadh' ? (
              <>
                <FeaturedProjectStory
                  project={filteredProjects[0]}
                  onSelectProject={(proj) => setSelectedProject(proj)}
                />

                {/* Remaining projects presented in alternating horizontal story rows */}
                {filteredProjects.length > 1 && (
                  <div className="space-y-12 sm:space-y-16 pt-4">
                    {filteredProjects.slice(1).map((project, idx) => (
                      <StoryProjectRow
                        key={project.id}
                        project={project}
                        index={idx + 1}
                        onSelectProject={(proj) => setSelectedProject(proj)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* If filtered by other categories, present as alternating storytelling sections */
              <div className="space-y-12 sm:space-y-16">
                {filteredProjects.map((project, idx) => (
                  <StoryProjectRow
                    key={project.id}
                    project={project}
                    index={idx}
                    onSelectProject={(proj) => setSelectedProject(proj)}
                  />
                ))}
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              لا توجد مشاريع مطابقة للتصنيف المحدد
            </h3>
            <p className="text-xs text-slate-500">
              يمكنك اختيار تصنيف «الكل» أو تغيير كلمة البحث للاطلاع على كافة المشاريع الموثقة.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 py-2 px-5 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer hover:bg-blue-700 transition-colors"
            >
              عرض كافة المشروعات (6)
            </button>
          </div>
        )}
      </section>

      {/* 6. PLATFORM FOOTER ATTRIBUTION STRIP */}
      <section id="sources-attribution" className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="font-bold text-white text-sm">توثيق حقوق البيانات الفضائية والجغرافية</span>
              <p className="text-[11px] text-slate-400">
                تلتزم منصة عين سيجام بأعلى معايير الإسناد العلمي لحزم الاستشعار عن بعد.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Sentinel-2 MSI</span>
              <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Landsat 8/9</span>
              <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Esri Basemaps</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div>
              <span className="font-semibold text-slate-300 block">إسناد بيانات برنامج كوبرنيكوس الأوروبي:</span>
              <span className="font-mono text-blue-400" dir="ltr">{SATELLITE_ATTRIBUTION}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-300 block">إسناد خرائط الأساس العالمية:</span>
              <span className="font-mono text-slate-400" dir="ltr">{BASEMAP_ATTRIBUTION}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEDICATED PROJECT DETAIL MODAL */}
      <CaseStudyDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
};
