import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Satellite, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { HistoricalStageImage } from '../../data/caseStudiesData';
import { ImageViewerWithZoom, normalizeCaseStudyAssetPath } from './ImageViewerWithZoom';
import { useLanguage } from '../../i18n/LanguageContext';

interface ProjectTimelineStoryProps {
  stages: HistoricalStageImage[];
  projectName: string;
  className?: string;
}

export const ProjectTimelineStory: React.FC<ProjectTimelineStoryProps> = ({
  stages,
  projectName,
  className = '',
}) => {
  const { t, isAr } = useLanguage();
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isCrossFading, setIsCrossFading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!stages || stages.length === 0) {
    return null;
  }

  const currentStage = stages[activeStageIndex] || stages[0];

  const handleStageChange = (newIndex: number) => {
    if (newIndex === activeStageIndex) return;
    setIsCrossFading(true);
    setTimeout(() => {
      setActiveStageIndex(newIndex);
      setIsCrossFading(false);
    }, 180);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newIdx = activeStageIndex > 0 ? activeStageIndex - 1 : stages.length - 1;
    handleStageChange(newIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newIdx = activeStageIndex < stages.length - 1 ? activeStageIndex + 1 : 0;
    handleStageChange(newIdx);
  };

  // Keyboard navigation support: Left / Right arrows
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      if (isAr) {
        handlePrev();
      } else {
        handleNext();
      }
    } else if (e.key === 'ArrowLeft') {
      if (isAr) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${t('الخط الزمني لمشروع', 'Project timeline for')} ${projectName}`}
      className={`flex flex-col rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`} 
      dir={isAr ? 'rtl' : 'ltr'}
    >
      
      {/* 1. TIMELINE PROGRESS BAR & STAGE SELECTORS */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 p-3 sm:p-4">
        
        {/* Step Buttons with subtle staggered interactions */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {stages.map((stg, idx) => {
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;

            return (
              <button
                key={stg.stageNumber || idx}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStageChange(idx);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 cursor-pointer text-center group active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400 scale-[1.02]'
                    : isCompleted
                    ? 'bg-slate-800/80 hover:bg-slate-800 hover:scale-[1.01] text-slate-300'
                    : 'bg-slate-850 hover:bg-slate-800 hover:scale-[1.01] text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors duration-300 ${
                    isActive ? 'bg-white text-blue-700' : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="hidden md:inline text-[11px] font-mono tracking-tight" dir="ltr">
                    {stg.acquisitionDate ? stg.acquisitionDate.substring(0, 4) : `S${idx + 1}`}
                  </span>
                </div>
                
                <span className={`text-[10px] mt-1 line-clamp-1 font-['Cairo'] transition-colors duration-200 ${
                  isActive ? 'font-bold text-white' : 'text-slate-400 group-hover:text-slate-200'
                }`}>
                  {stg.phaseNameAr || `المرحلة ${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ACTIVE STAGE VISUAL CONTAINER WITH SMOOTH CROSSFADE & HOVER SCALE */}
      <div className="relative w-full aspect-16/10 bg-[#0a1128] overflow-hidden flex items-center justify-center group/view">
        
        {/* Animated Visual Stage with transition */}
        <div 
          className={`w-full h-full flex items-center justify-center transition-all duration-300 ease-out ${
            isCrossFading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover/view:scale-[1.025]">
            <ImageViewerWithZoom
              key={currentStage.imagePath}
              src={currentStage.imagePath}
              fallbackSrc={currentStage.fallbackAliasPath}
              alt={`المرحلة ${activeStageIndex + 1}: ${currentStage.phaseNameAr} - ${projectName}`}
              badgeLabel={`المرحلة ${activeStageIndex + 1} من 5: ${currentStage.phaseNameAr}`}
              caption={currentStage.descriptionAr}
              aspectRatioClass="aspect-16/10"
              objectFit="contain"
              className="w-full h-full border-0 bg-transparent"
            />
          </div>
        </div>

        {/* Floating Nav Controls with subtle spring and RTL awareness */}
        <button
          onClick={handlePrev}
          aria-label={t('المرحلة السابقة', 'Previous Stage')}
          title={t('المرحلة السابقة', 'Previous Stage')}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/85 hover:bg-blue-600 active:scale-90 text-white flex items-center justify-center backdrop-blur-md border border-slate-700/80 shadow-lg transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
        >
          {isAr ? <ChevronRight className="w-5 h-5 transition-transform group-hover:scale-110" /> : <ChevronLeft className="w-5 h-5 transition-transform group-hover:scale-110" />}
        </button>

        <button
          onClick={handleNext}
          aria-label={t('المرحلة التالية', 'Next Stage')}
          title={t('المرحلة التالية', 'Next Stage')}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/85 hover:bg-blue-600 active:scale-90 text-white flex items-center justify-center backdrop-blur-md border border-slate-700/80 shadow-lg transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
        >
          {isAr ? <ChevronLeft className="w-5 h-5 transition-transform group-hover:scale-110" /> : <ChevronRight className="w-5 h-5 transition-transform group-hover:scale-110" />}
        </button>

        {/* Date & Sensor Watermark with smooth fade */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none transition-opacity duration-300">
          <div className="px-2.5 py-1 rounded-lg bg-slate-950/85 border border-slate-700/80 text-[11px] font-mono text-amber-300 flex items-center gap-1.5 shadow-md">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span dir="ltr">{currentStage.acquisitionDate}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/85 border border-slate-700/80 text-[10px] text-sky-300 shadow-md">
            <Satellite className="w-3 h-3 text-sky-400" />
            <span>{currentStage.satelliteSource || 'Sentinel-2 (Copernicus)'}</span>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE STAGE METADATA & NARRATIVE FOOTER */}
      <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-slate-800 text-right space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h5 className="text-sm sm:text-base font-bold text-white font-['Cairo'] transition-colors duration-200">
              {currentStage.phaseNameAr}
            </h5>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>{t('تغطية السحب:', 'Cloud Cover:')} <strong className="text-slate-200 font-mono">{currentStage.cloudCover || '0.0%'}</strong></span>
            <span>·</span>
            <span>{t('المرحلة', 'Stage')} {activeStageIndex + 1} {t('من', 'of')} 5</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-['Cairo'] transition-opacity duration-300">
          {currentStage.descriptionAr}
        </p>

        {/* Thumbnails Strip with active feedback */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {stages.map((stg, idx) => (
            <button
              key={`thumb-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                handleStageChange(idx);
              }}
              className={`relative shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
                idx === activeStageIndex
                  ? 'border-blue-500 ring-2 ring-blue-500/40 opacity-100 scale-105 shadow-md'
                  : 'border-slate-700/70 hover:border-slate-400 opacity-60 hover:opacity-95'
              }`}
            >
              <img 
                src={normalizeCaseStudyAssetPath(stg.imagePath)}
                alt="" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                loading="lazy"
              />
              <span className="absolute bottom-0 inset-x-0 bg-slate-950/85 text-[9px] text-center font-mono text-white py-0.5">
                {stg.acquisitionDate ? stg.acquisitionDate.substring(0, 4) : `S${idx + 1}`}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
