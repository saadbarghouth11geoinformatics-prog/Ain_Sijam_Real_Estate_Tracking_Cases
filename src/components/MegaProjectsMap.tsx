import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  HardHat, 
  Eye, 
  CheckCircle2, 
  Radio, 
  ExternalLink,
  Search,
  LocateFixed,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { constructionSitesList, ConstructionSiteItem } from '../data/constructionSitesData';
import { SaudiGisSatelliteMap } from './SaudiGisSatelliteMap';
import { useUserGeolocation, calculateHaversineDistanceKm, formatDistance } from '../hooks/useUserGeolocation';

export type MegaProjectItem = ConstructionSiteItem;

const megaProjectsData: MegaProjectItem[] = constructionSitesList;

interface MegaProjectsMapProps {
  onSelectProjectFor360?: (project: MegaProjectItem) => void;
  onRequestSubscription?: (reason: string) => void;
}

export const MegaProjectsMap: React.FC<MegaProjectsMapProps> = ({
  onSelectProjectFor360,
  onRequestSubscription
}) => {
  const { t, isAr } = useLanguage();
  const { coords: userCoords, cityName: geoCityName, requestLocation } = useUserGeolocation();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('site-obj-1');
  const [activeRegion, setActiveRegion] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortByProximity, setSortByProximity] = useState<boolean>(true);

  // Compute distances for projects
  const projectsWithDistances = megaProjectsData.map(p => {
    let distanceKm = 0;
    if (userCoords) {
      distanceKm = calculateHaversineDistanceKm(userCoords.lat, userCoords.lng, p.realGps.lat, p.realGps.lng);
    }
    return {
      ...p,
      distanceKm,
      distanceFormattedAr: formatDistance(distanceKm, true),
      distanceFormattedEn: formatDistance(distanceKm, false),
    };
  });

  const selectedProject = projectsWithDistances.find(p => p.id === selectedProjectId) || projectsWithDistances[0];

  let filteredProjects = projectsWithDistances.filter(p => {
    if (activeRegion !== 'الكل' && p.region !== activeRegion) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q) || (p.nameEn && p.nameEn.toLowerCase().includes(q));
      const matchCity = p.city.toLowerCase().includes(q);
      const matchId = `site ${p.objectId}`.includes(q) || `${p.objectId}` === q || p.code.toLowerCase().includes(q);
      return matchName || matchCity || matchId;
    }
    return true;
  });

  if (sortByProximity && userCoords) {
    filteredProjects = [...filteredProjects].sort((a, b) => a.distanceKm - b.distanceKm);
  }

  const closestProject = userCoords ? [...projectsWithDistances].sort((a, b) => a.distanceKm - b.distanceKm)[0] : null;

  const regionLabels: Record<string, string> = {
    'الكل': isAr ? 'الكل (24 موقعاً)' : 'All (24 Sites)',
    'الوسطى': isAr ? 'الوسطى (8)' : 'Central (8)',
    'الغربية': isAr ? 'الغربية (9)' : 'Western (9)',
    'الشمالية': isAr ? 'الشمالية (5)' : 'Northern (5)',
    'الجنوبية': isAr ? 'الجنوبية (2)' : 'Southern (2)'
  };

  const getStatusLabel = (status: string) => {
    if (status === 'نشط على مدار الساعة') return t('نشط 24/7', 'Active 24/7');
    if (status === 'أعمال نهارية') return t('أعمال نهارية', 'Day Shifts');
    return t('مرحلة التسليم', 'Handover Phase');
  };

  return (
    <section id="live-projects-map" className="py-12 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Background Tech Shapes */}
      <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-sky-100/60 dark:bg-sky-900/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-100/60 dark:bg-emerald-900/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-3 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-sky-500 animate-spin-slow" />
              <span>{t('الخريطة التفاعلية الكبرى للمشاريع والمواقع الميدانية', 'Interactive National Giga-Projects & Job-Sites Radar')}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-mono">{t('رصد حي 24/7', 'Live 24/7 Telematics')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('خريطة المشاريع الكبرى والمتابعة الميدانية', 'National Mega Projects Field & Satellite Map')}
            </h2>
          </div>

          {/* Filters and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "ابحث برقم الموقع (1-24) أو اسم المدينة أو المشروع..." : "Search by site # (1-24), city, or name..."}
                className={`w-full sm:w-64 ${isAr ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-1.5 rounded-xl text-xs bg-slate-100/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute ${isAr ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200`}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100/80 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
              {userCoords && (
                <button
                  onClick={() => setSortByProximity(!sortByProximity)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    sortByProximity
                      ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title={t('ترتيب المشاريع تلقائياً حسب الأقرب لموقعك الجغرافي', 'Sort by closest to your location')}
                >
                  <LocateFixed className="w-3.5 h-3.5" />
                  <span>{t('الأقرب لموقعي', 'Nearest')}</span>
                </button>
              )}
              {['الكل', 'الوسطى', 'الغربية', 'الشمالية', 'الجنوبية'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setActiveRegion(reg)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeRegion === reg
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800'
                  }`}
                >
                  {regionLabels[reg]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Proximity Telemetry Live Banner */}
        {userCoords && closestProject && (
          <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-sky-950/80 border border-sky-500/30 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-sky-300">{t(`موقعك الجغرافي: ${geoCityName}`, `Location: ${geoCityName}`)}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-200">
                {t('أقرب مشروع لموقعك:', 'Nearest Project:')} <strong className="text-white">{closestProject.name}</strong>
              </span>
              <span className="text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                {closestProject.distanceFormattedAr}
              </span>
            </div>
            <button
              onClick={() => setSelectedProjectId(closestProject.id)}
              className="px-3 py-1 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              {t('عرض على الخريطة', 'Inspect on Map')}
            </button>
          </div>
        )}

        {/* Main Interactive Map & Project Details Layout (12 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* MAP CANVAS (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-4 shadow-xl shadow-sky-950/10 border border-sky-100 dark:border-slate-800 overflow-hidden relative">
            
            {/* Map Top Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>{t('رادار الرصد والمتابعة الميدانية والفضائية', 'Satellite & Field Telematics Radar')}</span>
                </span>
                <span className="text-[10px] text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2 py-0.5 rounded font-mono">
                  WGS84 • Google Earth & Sentinel-2
                </span>
              </div>
            </div>

            {/* MAP STAGE */}
            <div className="relative w-full h-[520px] bg-[#0c182a] rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none">
              <div className="w-full h-full">
                <SaudiGisSatelliteMap
                  sites={filteredProjects}
                  selectedSiteId={selectedProjectId}
                  onSelectSite={(id) => setSelectedProjectId(id)}
                  isAr={isAr}
                  userCoords={userCoords}
                />
              </div>
            </div>

              {/* Quick Map Stat Ticker below */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-white text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{t('المشاريع النشطة', 'Active Projects')}</span>
                <span className="font-bold font-mono text-sky-400 text-sm">{t('24 مشروع', '24 Sites')}</span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{t('كاميرات المراقبة الحية', 'Live Cameras')}</span>
                <span className="font-bold font-mono text-emerald-400 text-sm">450+ {t('كاميرا', 'Units')}</span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{t('الآليات المرصودة', 'Fleet Census')}</span>
                <span className="font-bold font-mono text-sky-300 text-sm">1,645 {t('معدة', 'Machines')}</span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{t('أمان الرافعات', 'Crane Safety')}</span>
                <span className="font-bold text-emerald-400 text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {t('100% مطابق', '100% Compliant')}
                </span>
              </div>
            </div>

          </div>

          {/* PROJECT DETAIL DRAWER CARD (4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg shadow-sky-500/5 border border-sky-100 dark:border-slate-800 flex flex-col justify-between h-full transition-colors">
            
            <div>
              {/* Project Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono font-black text-white bg-sky-600 px-2 py-0.5 rounded-md shadow-xs">
                      OBJECTID #{selectedProject.objectId}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800">
                      {selectedProject.code}
                    </span>
                    {userCoords && selectedProject.distanceKm > 0 && (
                      <span className="text-[10px] font-mono font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                        🚗 {selectedProject.distanceFormattedAr}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1.5">
                    {isAr ? selectedProject.name : (selectedProject.nameEn || selectedProject.name)}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{selectedProject.city} • {t(`المنطقة ${selectedProject.region}`, `${selectedProject.region} Region`)}</span>
                  </div>

                  {/* Distance Banner */}
                  {userCoords && selectedProject.distanceKm > 0 && (
                    <div className="mt-2 p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-xs text-sky-800 dark:text-sky-200 flex items-center justify-between">
                      <span className="font-semibold">{t('المسافة التقديرية من موقعك:', 'Distance from you:')}</span>
                      <strong className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">{selectedProject.distanceFormattedAr}</strong>
                    </div>
                  )}

                  {/* Real GPS coordinates & Google Maps link */}
                  <div className="mt-2 flex items-center gap-2 flex-wrap text-[11px]">
                    <span className="font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      📍 {selectedProject.realGps.lat.toFixed(5)}°N, {selectedProject.realGps.lng.toFixed(5)}°E
                    </span>
                    <a
                      href={`https://www.google.com/maps?q=${selectedProject.realGps.lat},${selectedProject.realGps.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 dark:text-sky-400 hover:underline font-bold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{t('خرائط Google', 'Google Maps')}</span>
                    </a>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                  {getStatusLabel(selectedProject.status)}
                </span>
              </div>

              {/* Progress Metric Bar */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-4">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300">{t('نسبة الإنجاز الفعلي مقابل المخطط', 'Actual vs Planned Milestones')}</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400 font-black text-sm">
                    {selectedProject.progressPct}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${selectedProject.progressPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  <span>{t('المستهدف:', 'Target:')} {selectedProject.plannedPct}%</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {t('انحراف إيجابي', 'Ahead')} +{(selectedProject.progressPct - selectedProject.plannedPct).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Site Stats grid */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px]">{t('العمال بالموقع', 'Workforce')}</div>
                  <div className="font-bold text-slate-900 dark:text-white font-mono mt-0.5">{selectedProject.activeWorkers}</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px]">{t('المعدات النشطة', 'Active Fleet')}</div>
                  <div className="font-bold text-sky-600 dark:text-sky-400 font-mono mt-0.5">{selectedProject.activeMachinery}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {isAr ? selectedProject.description : (selectedProject.descriptionEn || selectedProject.description)}
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <a
                href="#digital-twin-360"
                onClick={() => onSelectProjectFor360 && onSelectProjectFor360(selectedProject)}
                className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 text-xs transition-all"
              >
                <Eye className="w-4 h-4 text-white" />
                <span>{t('فتح التوأم الرقمي والمطابقة لهذا الموقع', 'Open Digital Twin & BIM Overlay')}</span>
              </a>

              <button
                onClick={() => onRequestSubscription && onRequestSubscription(t('تتبع مسارات المتابعة الميدانية اللحظية وتصدير النماذج الهندسية يتطلب اشتراكاً نشطاً', 'Telemetry and engineering dataset export requires an active license'))}
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-xl text-xs transition-all"
              >
                {t('تحميل التقرير الفني للمشروع (PDF/DWG)', 'Download Engineering Project Report (PDF/DWG)')}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
