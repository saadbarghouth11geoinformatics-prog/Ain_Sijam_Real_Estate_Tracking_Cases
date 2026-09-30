import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { CheckCircle2, HardHat, PauseCircle, Layers } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface ProjectPhase {
  id: string;
  nameAr: string;
  nameEn: string;
  shortNameAr: string;
  shortNameEn: string;
  weightPct: number;    // % weight of this phase in total project
  progressPct: number;  // 0 - 100% completion of this phase
  contributedPct: number; // actual % this phase contributes to the total project (0 - weightPct)
  color: string;
  status: 'completed' | 'in_progress' | 'pending';
}

export interface PhaseChartSlice {
  name: string;
  nameEn: string;
  value: number;
  color: string;
  isRemaining?: boolean;
  phase?: ProjectPhase;
}

/**
 * Standard 5-phase breakdown for engineering & mega construction projects.
 * Maps overall project progressPct (0 - 100) to each sequential phase.
 */
export function calculateProjectPhases(progressPct: number): ProjectPhase[] {
  const clamped = Math.min(100, Math.max(0, Math.round(progressPct)));

  // Phase 1: Site Prep & Excavation (Weight: 15%) - Range: 0 -> 15%
  const p1Progress = Math.min(100, Math.max(0, Math.round((clamped / 15) * 100)));
  const p1Contributed = Number(((p1Progress / 100) * 15).toFixed(1));

  // Phase 2: Foundations & Substructure (Weight: 20%) - Range: 15 -> 35%
  const p2Progress = clamped <= 15 ? 0 : Math.min(100, Math.round(((clamped - 15) / 20) * 100));
  const p2Contributed = Number(((p2Progress / 100) * 20).toFixed(1));

  // Phase 3: Superstructure & Concrete Core (Weight: 30%) - Range: 35 -> 65%
  const p3Progress = clamped <= 35 ? 0 : Math.min(100, Math.round(((clamped - 35) / 30) * 100));
  const p3Contributed = Number(((p3Progress / 100) * 30).toFixed(1));

  // Phase 4: MEP & Facades / Finishing (Weight: 25%) - Range: 65 -> 90%
  const p4Progress = clamped <= 65 ? 0 : Math.min(100, Math.round(((clamped - 65) / 25) * 100));
  const p4Contributed = Number(((p4Progress / 100) * 25).toFixed(1));

  // Phase 5: Testing, Commissioning & Handover (Weight: 10%) - Range: 90 -> 100%
  const p5Progress = clamped <= 90 ? 0 : Math.min(100, Math.round(((clamped - 90) / 10) * 100));
  const p5Contributed = Number(((p5Progress / 100) * 10).toFixed(1));

  return [
    {
      id: 'phase-1',
      nameAr: 'الحفر وتهيئة الموقع الميداني',
      nameEn: 'Site Prep & Excavation',
      shortNameAr: 'الحفر والتهيئة',
      shortNameEn: 'Excavation',
      weightPct: 15,
      progressPct: p1Progress,
      contributedPct: p1Contributed,
      color: '#0d9488', // Teal 600
      status: p1Progress === 100 ? 'completed' : p1Progress > 0 ? 'in_progress' : 'pending',
    },
    {
      id: 'phase-2',
      nameAr: 'الأساسات العميقة والأقبية الخرسانية',
      nameEn: 'Foundations & Substructure',
      shortNameAr: 'الأساسات والأقبية',
      shortNameEn: 'Foundations',
      weightPct: 20,
      progressPct: p2Progress,
      contributedPct: p2Contributed,
      color: '#0284c7', // Sky 600
      status: p2Progress === 100 ? 'completed' : p2Progress > 0 ? 'in_progress' : 'pending',
    },
    {
      id: 'phase-3',
      nameAr: 'الهيكل الإنشائي والأبراج الخرسانية',
      nameEn: 'Superstructure & Concrete Core',
      shortNameAr: 'الهيكل الإنشائي',
      shortNameEn: 'Superstructure',
      weightPct: 30,
      progressPct: p3Progress,
      contributedPct: p3Contributed,
      color: '#2563eb', // Royal Blue 600
      status: p3Progress === 100 ? 'completed' : p3Progress > 0 ? 'in_progress' : 'pending',
    },
    {
      id: 'phase-4',
      nameAr: 'التشطيبات والأنظمة الكهروميكانيكية (MEP)',
      nameEn: 'MEP & Facades / Finishing',
      shortNameAr: 'التشطيبات والكهروميكانيك',
      shortNameEn: 'MEP & Finishing',
      weightPct: 25,
      progressPct: p4Progress,
      contributedPct: p4Contributed,
      color: '#7c3aed', // Purple 600
      status: p4Progress === 100 ? 'completed' : p4Progress > 0 ? 'in_progress' : 'pending',
    },
    {
      id: 'phase-5',
      nameAr: 'الفحص الميداني والتشغيل والتسليم',
      nameEn: 'Testing, Commissioning & Handover',
      shortNameAr: 'التشغيل والتسليم',
      shortNameEn: 'Handover',
      weightPct: 10,
      progressPct: p5Progress,
      contributedPct: p5Contributed,
      color: '#10b981', // Emerald 500
      status: p5Progress === 100 ? 'completed' : p5Progress > 0 ? 'in_progress' : 'pending',
    },
  ];
}

interface ProjectPhaseDonutChartProps {
  progressPct: number;
  status?: 'under_construction' | 'completed' | 'paused';
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showCenterText?: boolean;
  centerSublabel?: string;
  onPhaseSelect?: (phase: ProjectPhase) => void;
  className?: string;
}

export const ProjectPhaseDonutChart: React.FC<ProjectPhaseDonutChartProps> = ({
  progressPct,
  status = 'under_construction',
  size = 140,
  innerRadius,
  outerRadius,
  showLegend = false,
  showCenterText = true,
  centerSublabel,
  onPhaseSelect,
  className = '',
}) => {
  const { isAr } = useLanguage();
  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);

  const clampedPct = Math.min(100, Math.max(0, Math.round(progressPct)));
  const phases = calculateProjectPhases(clampedPct);

  // Default radii based on size
  const calculatedOuterRadius = outerRadius ?? Math.round(size * 0.44);
  const calculatedInnerRadius = innerRadius ?? Math.round(size * 0.32);

  // Generate Recharts slices: each phase's completed contribution + remaining slice
  const chartData: PhaseChartSlice[] = [];

  phases.forEach((phase) => {
    if (phase.contributedPct > 0) {
      chartData.push({
        name: isAr ? phase.shortNameAr : phase.shortNameEn,
        nameEn: phase.nameEn,
        value: phase.contributedPct,
        color: phase.color,
        phase,
      });
    }
  });

  // Remaining incomplete percentage to complete the 100% circle
  const remainingValue = Number((100 - clampedPct).toFixed(1));
  if (remainingValue > 0) {
    chartData.push({
      name: isAr ? 'المتبقي للإنجاز' : 'Remaining',
      nameEn: 'Remaining',
      value: remainingValue,
      color: status === 'paused' ? '#cbd5e1' : '#e2e8f0', // slate-300 / slate-200
      isRemaining: true,
    });
  }

  // Handle case where project is 0%
  if (chartData.length === 0) {
    chartData.push({
      name: isAr ? 'لم يبدأ بعد' : 'Not Started',
      nameEn: 'Not Started',
      value: 100,
      color: '#e2e8f0',
      isRemaining: true,
    });
  }

  // Custom Tooltip for Recharts Donut
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: PhaseChartSlice = payload[0].payload;
      if (data.isRemaining) {
        return (
          <div className="bg-slate-900/95 text-white text-[11px] p-2.5 rounded-xl shadow-xl border border-slate-700 backdrop-blur-md font-['Cairo']">
            <div className="font-bold text-slate-300">
              {isAr ? 'المتبقي لإكمال المشروع' : 'Remaining to Complete'}
            </div>
            <div className="text-emerald-400 font-mono font-bold text-sm mt-0.5">
              {data.value}%
            </div>
          </div>
        );
      }

      const p = data.phase;
      if (!p) return null;

      return (
        <div className="bg-slate-900/95 text-white text-[11px] p-3 rounded-xl shadow-xl border border-slate-700 backdrop-blur-md space-y-1.5 max-w-[200px] font-['Cairo']">
          <div className="flex items-center gap-1.5 font-bold border-b border-slate-700 pb-1" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span>{isAr ? p.nameAr : p.nameEn}</span>
          </div>
          
          <div className="flex justify-between items-center text-[10px] text-slate-300">
            <span>{isAr ? 'إنجاز المرحلة:' : 'Phase Progress:'}</span>
            <strong className="text-white font-mono">{p.progressPct}%</strong>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-300">
            <span>{isAr ? 'مساهمتها بالمشروع:' : 'Project Contribution:'}</span>
            <strong className="font-mono text-emerald-400">{p.contributedPct}%</strong>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span>{isAr ? 'وزن المرحلة الكلي:' : 'Total Weight:'}</span>
            <span className="font-mono">{p.weightPct}%</span>
          </div>

          <div className="pt-1">
            <span className={`px-2 py-0.5 rounded text-[9px] font-bold inline-block ${
              p.status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : p.status === 'in_progress'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-slate-700 text-slate-300'
            }`}>
              {p.status === 'completed' 
                ? (isAr ? '✓ مكتملة' : 'Completed') 
                : p.status === 'in_progress' 
                ? (isAr ? '⚡ قيد التنفيذ' : 'In Progress') 
                : (isAr ? '⌛ بانتظار البدء' : 'Pending')}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Donut Chart Container */}
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={calculatedInnerRadius}
              outerRadius={calculatedOuterRadius}
              paddingAngle={chartData.length > 1 ? 2.5 : 0}
              dataKey="value"
              animationDuration={800}
              stroke="none"
              onClick={(entry: any) => {
                if (entry && entry.phase && onPhaseSelect) {
                  onPhaseSelect(entry.phase);
                }
              }}
              onMouseEnter={(_, index) => setActivePhaseIndex(index)}
              onMouseLeave={() => setActivePhaseIndex(null)}
            >
              {chartData.map((entry, index) => {
                const isHovered = activePhaseIndex === index;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={isHovered ? 1 : 0.92}
                    className="transition-all duration-200 cursor-pointer outline-none"
                    style={{
                      filter: isHovered && !entry.isRemaining ? 'drop-shadow(0 0 4px rgba(37,99,235,0.4))' : undefined,
                    }}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text displaying overall percentage */}
        {showCenterText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <div className="flex items-baseline justify-center">
              <span className="text-xl sm:text-2xl font-black font-mono text-blue-950 dark:text-white leading-none">
                {clampedPct}
              </span>
              <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400 ml-0.5">
                %
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
              {centerSublabel || (status === 'completed' ? (isAr ? 'مكتمل' : 'Done') : status === 'paused' ? (isAr ? 'موقوف' : 'Hold') : (isAr ? 'إنجاز' : 'Progress'))}
            </span>
          </div>
        )}
      </div>

      {/* Optional Compact Phase Legend */}
      {showLegend && (
        <div className="w-full mt-2 grid grid-cols-2 gap-1 text-[10px]">
          {phases.map((phase) => (
            <div 
              key={phase.id}
              onClick={() => onPhaseSelect && onPhaseSelect(phase)}
              className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: phase.color }}
              />
              <span className="text-slate-600 dark:text-slate-300 truncate">
                {isAr ? phase.shortNameAr : phase.shortNameEn}
              </span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 ml-auto">
                {phase.progressPct}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
