import React from 'react';

export interface AinSigamLogoProps {
  variant?: 'horizontal' | 'mark-only' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const AinSigamLogo: React.FC<AinSigamLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  theme = 'auto',
  showSubtitle = true,
}) => {
  // Dimensions for responsive scaling
  const dimensions = {
    sm: { markW: 34, markH: 34, title: 'text-base font-extrabold', sub: 'text-[9px] tracking-[3px]' },
    md: { markW: 46, markH: 46, title: 'text-xl sm:text-2xl font-black', sub: 'text-[11px] tracking-[4px]' },
    lg: { markW: 58, markH: 58, title: 'text-2xl sm:text-3xl font-black', sub: 'text-xs tracking-[5px]' },
    xl: { markW: 72, markH: 72, title: 'text-3xl sm:text-4xl font-black', sub: 'text-sm tracking-[6px]' },
  }[size];

  // Authentic Brand Colors from the official brand identity uploaded by user:
  // Emerald / Pine Green: #036853
  // Deep Sovereign Navy Blue: #0A3254 (or #1E3A8A in dark mode, or dynamically adapted)
  // Architectural Warm Gold: #BFA16F
  const emeraldColor = '#036853';
  const navyColor = '#0A3254';
  const goldColor = '#BFA16F';

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      
      {/* 1. Iconic Ain Sijam Vector Emblem: Eye + Map Pin + 3 Architectural Towers */}
      <div 
        className="shrink-0 relative flex items-center justify-center transition-transform group-hover:scale-105 duration-200"
        style={{ width: dimensions.markW, height: dimensions.markH }}
      >
        <svg 
          viewBox="0 0 340 340" 
          width={dimensions.markW} 
          height={dimensions.markH} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm overflow-visible"
        >
          <defs>
            <filter id="sigamGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* EYE CONTOUR (Navy Blue Outer Arc / Slanted Almond Geometry) */}
          <path 
            d="M 10 160 C 60 75, 280 75, 330 160 C 280 245, 60 245, 10 160 Z" 
            fill={navyColor}
            className="dark:fill-[#1E4E79]"
          />
          {/* Inner Eye Cutout (Transparency allows background to show through) */}
          <path 
            d="M 58 160 C 95 105, 245 105, 282 160 C 245 215, 95 215, 58 160 Z" 
            fill="currentColor"
            className="text-white dark:text-slate-900"
          />

          {/* EMERALD GREEN LOCATION PIN (Focal Geography & Geospatial Anchor) */}
          <path 
            d="M 170 30 
               C 232 30, 280 78, 280 140 
               C 280 196, 218 258, 170 312 
               C 122 258, 60 196, 60 140 
               C 60 78, 108 30, 170 30 Z" 
            fill={emeraldColor}
            className="dark:fill-[#0d876d]"
          />

          {/* Inner Circle Cutout of Pin (Creates the Pin's Ring/Hole) */}
          <circle 
            cx="170" 
            cy="140" 
            r="76" 
            fill="currentColor"
            className="text-white dark:text-slate-900" 
          />

          {/* 3 ARCHITECTURAL SKYLINE TOWERS (Centered inside the Pin Ring) */}
          
          {/* Left Tower: Emerald Green (Angled Roof towards center) */}
          <path 
            d="M 122 205 L 122 158 L 148 134 L 148 205 Z" 
            fill={emeraldColor}
            className="dark:fill-[#0d876d]"
          />

          {/* Center Tallest Tower: Deep Navy Blue (Apex/Peak Roof) */}
          <path 
            d="M 154 205 L 154 112 L 170 94 L 186 112 L 186 205 Z" 
            fill={navyColor}
            className="dark:fill-[#2d6fa8]"
          />

          {/* Right Tower: Warm Architectural Gold / Champagne */}
          <path 
            d="M 192 205 L 192 142 L 218 162 L 218 205 Z" 
            fill={goldColor}
            className="dark:fill-[#dfc08b]"
          />
        </svg>
      </div>

      {/* 2. Typographic Wordmark & Subtitle */}
      {variant !== 'mark-only' && (
        <div className={`flex ${variant === 'stacked' ? 'flex-col items-center text-center' : 'flex-col'} leading-tight`}>
          {/* Main Title: عين سجـام */}
          <div className="flex items-center gap-2">
            <span 
              className={`tracking-tight font-['Cairo'] text-[#0A3254] dark:text-white ${dimensions.title}`}
              style={{ letterSpacing: '-0.5px' }}
            >
              عين سجـام
            </span>
          </div>

          {/* Subtitle in English: AIN SIJAM with exact dual-tone branding */}
          {showSubtitle && (
            <div className="flex items-center gap-1 mt-0.5 font-bold font-['Cairo',sans-serif] uppercase text-[10px] sm:text-[11px]">
              <span className="text-[#0A3254] dark:text-blue-300 tracking-[3px] font-black">
                AIN
              </span>
              <span className="text-[#036853] dark:text-emerald-400 tracking-[3px] font-black">
                SIJAM
              </span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export const PaseetahLogo = AinSigamLogo;
export default AinSigamLogo;
