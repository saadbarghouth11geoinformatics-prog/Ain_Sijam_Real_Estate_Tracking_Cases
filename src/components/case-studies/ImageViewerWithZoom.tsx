import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, X, Satellite } from 'lucide-react';

/**
 * The case-study assets are stored with underscore-separated folder names,
 * while an earlier data export used hyphen-separated slugs in its URLs.
 */
export const normalizeCaseStudyAssetPath = (path?: string) =>
  path?.replace(
    /\/(0[1-6])-(kafd-riyadh|riyadh-metro-west-depot|six-flags-qiddiya|red-sea-airport|sheybarah-resort|spark-energy-park)(?=\/)/,
    (_match, number, slug) => `/${number}_${slug.replace(/-/g, '_')}`
  );

interface ImageViewerWithZoomProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  filename?: string;
  caption?: string;
  badgeLabel?: string;
  aspectRatioClass?: string;
  className?: string;
  isCoverThumbnail?: boolean;
  objectFit?: 'contain' | 'cover';
}

export const ImageViewerWithZoom: React.FC<ImageViewerWithZoomProps> = ({
  src,
  fallbackSrc,
  alt,
  filename,
  caption,
  badgeLabel,
  aspectRatioClass = 'aspect-16/10',
  className = '',
  isCoverThumbnail = false,
  objectFit = 'contain'
}) => {
  const normalizedSrc = normalizeCaseStudyAssetPath(src) ?? src;
  const normalizedFallbackSrc = normalizeCaseStudyAssetPath(fallbackSrc);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync if src changes
  useEffect(() => {
    setCurrentSrc(normalizedSrc);
    setHasTriedFallback(false);
    setImageError(false);
    setIsLoaded(false);
  }, [normalizedSrc]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setScale(1);
      }
    };
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const handleImageError = () => {
    if (normalizedFallbackSrc && !hasTriedFallback && currentSrc !== normalizedFallbackSrc) {
      setHasTriedFallback(true);
      setCurrentSrc(normalizedFallbackSrc);
    } else {
      setImageError(true);
      setIsLoaded(true);
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.3, 1));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
    setScale(1);
  };

  return (
    <>
      <div className={`relative overflow-hidden rounded-2xl bg-[#0a1128] text-white select-none group border border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 ${className}`}>
        
        {/* Loading state skeleton matching brand */}
        {!isLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 animate-pulse flex items-center justify-center z-10 pointer-events-none">
            <div className="flex items-center gap-2 text-xs text-blue-300 font-mono">
              <Satellite className="w-4 h-4 animate-spin text-blue-400" />
              <span>جاري تحميل الرصد الفضائي...</span>
            </div>
          </div>
        )}

        {/* Badge Label */}
        {badgeLabel && (
          <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-bold text-blue-300 shadow-md transition-opacity duration-300">
            {badgeLabel}
          </div>
        )}

        {/* Toolbar Controls */}
        {!imageError && !isCoverThumbnail && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-slate-200 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white active:scale-90 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
              title="تكبير الصورة"
              aria-label="تكبير"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white active:scale-90 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
              title="تصغير الصورة"
              aria-label="تصغير"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            {scale > 1 && (
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white active:scale-90 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
                title="إعادة التعيين"
                aria-label="إعادة التعيين"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="w-[1px] h-4 bg-slate-700 mx-0.5" />
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg hover:bg-blue-600 hover:text-white active:scale-90 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
              title="عرض بملء الشاشة"
              aria-label="ملء الشاشة"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Display with subtle scale between 1.02 and 1.04 on hover */}
        <div className={`w-full ${aspectRatioClass} flex items-center justify-center overflow-hidden bg-[#0a1128]`}>
          {!imageError ? (
            <img
              src={currentSrc}
              alt={alt}
              onLoad={() => setIsLoaded(true)}
              onError={handleImageError}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
              }}
              className={`w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} cursor-zoom-in transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              } ${scale === 1 ? 'hover:scale-[1.025]' : ''}`}
              onClick={toggleFullscreen}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0a1128] text-slate-500 space-y-2">
              <Satellite className="w-8 h-8 text-slate-600" />
              <p className="text-xs text-slate-400 font-medium">{alt}</p>
            </div>
          )}
        </div>

        {/* Caption */}
        {caption && (
          <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 text-xs text-slate-300 flex items-center justify-between gap-2">
            <span className="truncate">{caption}</span>
            {badgeLabel && (
              <span className="shrink-0 text-[10px] text-blue-400 font-semibold">
                {badgeLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
          dir="rtl"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          {/* Top Bar */}
          <div className="h-16 px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-slate-200">{alt}</span>
              {badgeLabel && (
                <span className="text-xs text-blue-400 bg-slate-800/80 border border-slate-700/60 px-2.5 py-0.5 rounded-lg">
                  {badgeLabel}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-90 text-slate-200 hover:text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400"
                title="تكبير"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-90 text-slate-200 hover:text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400"
                title="تصغير"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {scale > 1 && (
                <button
                  onClick={handleResetZoom}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-90 text-slate-200 hover:text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400"
                  title="إعادة التعيين"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <div className="w-[1px] h-6 bg-slate-700 mx-1" />
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 active:scale-90 text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-400"
                title="إغلاق (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fullscreen Body */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-[#050b1a]">
            <img
              src={currentSrc}
              alt={alt}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.2s ease-out'
              }}
              className="max-h-full max-w-full object-contain cursor-zoom-out"
              onClick={toggleFullscreen}
            />
          </div>

          {/* Fullscreen Footer */}
          {caption && (
            <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-center text-xs text-slate-300">
              {caption}
            </div>
          )}
        </div>
      )}
    </>
  );
};
