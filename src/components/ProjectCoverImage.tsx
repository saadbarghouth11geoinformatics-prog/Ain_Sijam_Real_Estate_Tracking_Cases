import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Plane, 
  Warehouse, 
  Sprout, 
  Mountain, 
  Zap 
} from 'lucide-react';

interface ProjectCoverImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  projectTitle?: string;
  city?: string;
  category?: string;
  priority?: boolean;
}

const getCategoryIcon = (category?: string) => {
  if (!category) return Building2;
  if (category.includes('مطار') || category.includes('Airport')) return Plane;
  if (category.includes('لوجست') || category.includes('صناع') || category.includes('Logistics') || category.includes('Industrial')) return Warehouse;
  if (category.includes('زراع') || category.includes('بيئ') || category.includes('Agro') || category.includes('Environmental')) return Sprout;
  if (category.includes('سياح') || category.includes('معالم') || category.includes('Tourism') || category.includes('Mountain')) return Mountain;
  if (category.includes('طاقة') || category.includes('مرافق') || category.includes('Energy') || category.includes('Utilities')) return Zap;
  return Building2;
};

export const ProjectCoverImage: React.FC<ProjectCoverImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-16/9',
  projectTitle,
  city,
  category,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isInvalidUrl = !src || src.trim() === '' || hasError;
  const CategoryIcon = getCategoryIcon(category);

  return (
    <div className={`relative w-full ${aspectRatioClass} overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 ${className}`}>
      {isInvalidUrl ? (
        /* Clean professional fallback state (No broken image icon, no black rectangles) */
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-200/60 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border border-slate-200/70 dark:border-slate-700/60 select-none">
          <div className="flex items-center justify-between gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100/90 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
              <CategoryIcon className="w-4 h-4 stroke-[1.8]" />
            </div>
            {category && (
              <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700 shadow-2xs">
                {category}
              </span>
            )}
          </div>

          <div className="space-y-1">
            {projectTitle && (
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
                {projectTitle}
              </h4>
            )}
            {city && (
              <div className="flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400">
                <MapPin className="w-3 h-3 stroke-[2] shrink-0" />
                <span>{city}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
              <span className="text-[10px] text-slate-400">جاري التحميل...</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
