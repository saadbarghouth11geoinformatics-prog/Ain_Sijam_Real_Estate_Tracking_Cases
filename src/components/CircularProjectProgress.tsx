import React, { useId } from 'react';

export type ProjectProgressStatus = 'under_construction' | 'completed' | 'paused' | 'default';

export interface CircularProjectProgressProps {
  percentage: number;
  status?: ProjectProgressStatus;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  showLabel?: boolean;
  sublabel?: string;
  glow?: boolean;
  className?: string;
}

export const CircularProjectProgress: React.FC<CircularProjectProgressProps> = ({
  percentage,
  status = 'under_construction',
  size = 'md',
  strokeWidth,
  showLabel = true,
  sublabel,
  glow = true,
  className = '',
}) => {
  const rawId = useId();
  const safeId = rawId.replace(/[:]/g, '');

  // Normalize percentage 0-100
  const clampedPct = Math.min(100, Math.max(0, Math.round(percentage)));

  // Size mapping
  const pixelSize = typeof size === 'number' 
    ? size 
    : size === 'sm' ? 56 
    : size === 'md' ? 76 
    : size === 'lg' ? 96 
    : 120; // xl

  const defaultStroke = typeof strokeWidth === 'number' 
    ? strokeWidth 
    : pixelSize >= 96 ? 8 
    : pixelSize >= 76 ? 7 
    : 5;

  const center = pixelSize / 2;
  const radius = center - defaultStroke - 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedPct / 100) * circumference;

  // Calculate tip marker position (starts from top -90deg)
  const angleDeg = (clampedPct / 100) * 360 - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  const tipX = center + radius * Math.cos(angleRad);
  const tipY = center + radius * Math.sin(angleRad);

  // Status themes based on Royal Blue & White platform palette
  const getTheme = () => {
    switch (status) {
      case 'completed':
        return {
          gradientId: `compGrad-${safeId}`,
          startColor: '#38BDF8', // Sky 400
          endColor: '#0284C7',   // Sky 600
          glowColor: 'rgba(2, 132, 199, 0.35)',
          trackColor: 'stroke-sky-100 dark:stroke-slate-800',
          textColor: 'text-sky-600 dark:text-sky-400',
          badgeBg: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300',
          tipColor: '#0284C7',
          pulseColor: 'bg-sky-500'
        };
      case 'paused':
        return {
          gradientId: `pauseGrad-${safeId}`,
          startColor: '#94A3B8', // Slate 400
          endColor: '#64748B',   // Slate 500
          glowColor: 'rgba(100, 116, 139, 0.25)',
          trackColor: 'stroke-slate-100 dark:stroke-slate-800',
          textColor: 'text-slate-600 dark:text-slate-400',
          badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
          tipColor: '#64748B',
          pulseColor: 'bg-slate-400'
        };
      case 'under_construction':
      default:
        return {
          gradientId: `blueGrad-${safeId}`,
          startColor: '#60A5FA', // Blue 400
          endColor: '#1D4ED8',   // Blue 700 (Royal Blue)
          glowColor: 'rgba(37, 99, 235, 0.4)',
          trackColor: 'stroke-blue-50 dark:stroke-slate-800',
          textColor: 'text-blue-600 dark:text-blue-400',
          badgeBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300',
          tipColor: '#2563EB',
          pulseColor: 'bg-blue-600'
        };
    }
  };

  const theme = getTheme();

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center select-none group ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      aria-label={`نسبة الإنجاز ${clampedPct}%`}
    >
      <svg
        width={pixelSize}
        height={pixelSize}
        className="transform -rotate-90 origin-center overflow-visible"
      >
        <defs>
          {/* Progress Gradient */}
          <linearGradient id={theme.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.startColor} />
            <stop offset="100%" stopColor={theme.endColor} />
          </linearGradient>

          {/* Soft Glow Filter */}
          {glow && (
            <filter id={`glow-${theme.gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor={theme.glowColor} />
            </filter>
          )}
        </defs>

        {/* Outer subtle decorative dashed ring */}
        <circle
          cx={center}
          cy={center}
          r={radius + 3}
          fill="none"
          stroke="currentColor"
          className="text-slate-100 dark:text-slate-800/80"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Main Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className={theme.trackColor}
          strokeWidth={defaultStroke}
        />

        {/* Animated Progress Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${theme.gradientId})`}
          strokeWidth={defaultStroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter={glow ? `url(#glow-${theme.gradientId})` : undefined}
          className="transition-all duration-1000 ease-out"
        />

        {/* Tip Marker Dot (at the end of progress arc, visible if percentage > 0) */}
        {clampedPct > 2 && clampedPct < 99 && (
          <circle
            cx={tipX}
            cy={tipY}
            r={defaultStroke / 2 + 1}
            fill="#FFFFFF"
            stroke={theme.tipColor}
            strokeWidth="2"
            className="transition-all duration-1000 ease-out drop-shadow-xs"
          />
        )}
      </svg>

      {/* Center Percentage Display */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="flex items-baseline justify-center">
            <span 
              className={`font-black font-mono leading-none tracking-tight ${theme.textColor} ${
                pixelSize >= 96 ? 'text-xl' : pixelSize >= 76 ? 'text-base' : 'text-xs'
              }`}
            >
              {clampedPct}
            </span>
            <span 
              className={`font-bold font-mono ${theme.textColor} ${
                pixelSize >= 96 ? 'text-xs ml-0.5' : 'text-[10px] ml-0.5'
              }`}
            >
              %
            </span>
          </div>

          {sublabel && (
            <span 
              className={`font-medium tracking-tight text-slate-400 dark:text-slate-400 leading-tight mt-0.5 ${
                pixelSize >= 96 ? 'text-[11px]' : 'text-[9px]'
              }`}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
