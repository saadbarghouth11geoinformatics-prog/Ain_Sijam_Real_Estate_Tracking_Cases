import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Layers, 
  ArrowLeft, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { CaseStudyProject } from '../../data/caseStudiesData';
import { ImageViewerWithZoom } from './ImageViewerWithZoom';

interface CaseStudyCardProps {
  project: CaseStudyProject;
  onSelectProject: (project: CaseStudyProject) => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  project,
  onSelectProject,
}) => {
  return (
    <div 
      onClick={() => onSelectProject(project)}
      className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
      dir="rtl"
    >
      {/* Category header strip above the image */}
      <div className="px-5 py-3 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-950/70 px-2.5 py-1 rounded-lg">
          {project.categoryAr}
        </span>
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{project.trackingPeriod}</span>
        </div>
      </div>

      {/* Visual Container: comparison_clear_before_latest.jpg with object-fit: contain & dark navy background */}
      <div className="relative w-full aspect-16/10 bg-[#0a1128] overflow-hidden flex items-center justify-center p-2 group/img">
        <ImageViewerWithZoom
          src={project.comparisonBeforeLatestPath}
          fallbackSrc={project.timelineHighResOverviewPath}
          alt={`مقارنة فضائية قبل وبعد لمشروع ${project.nameAr}`}
          badgeLabel="رصد فضائي متزامن"
          aspectRatioClass="aspect-16/10"
          isCoverThumbnail={false}
          objectFit="contain"
          className="w-full h-full border-0 bg-transparent transition-transform duration-500 group-hover:scale-[1.03]"
        />
        
        {/* Stages Count Badge */}
        <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md pointer-events-none">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>{project.stagesCount} مراحل زمنية موثقة</span>
        </div>

        {/* Time Range Badge */}
        <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-bold text-slate-300 flex items-center gap-1.5 shadow-md pointer-events-none">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span dir="ltr">{project.timeRange}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Project Title (Arabic) */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {project.nameAr}
          </h3>

          {/* Project Title (English) */}
          {project.nameEn && (
            <p className="text-xs font-medium text-slate-400 font-mono" dir="ltr">
              {project.nameEn}
            </p>
          )}

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{project.locationAr}</span>
          </div>

          {/* Current Documented Status */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              الحالة الموثقة الحالية:
            </div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{project.statusAr}</span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {project.descriptionAr}
          </p>
        </div>

        {/* Action Button: عرض رحلة المشروع */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProject(project);
          }}
          className="w-full py-3 px-4 rounded-2xl bg-slate-900 group-hover:bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-xs group-hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
        >
          <span>عرض رحلة المشروع وتفاصيل الأصل</span>
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
        </button>
      </div>
    </div>
  );
};
