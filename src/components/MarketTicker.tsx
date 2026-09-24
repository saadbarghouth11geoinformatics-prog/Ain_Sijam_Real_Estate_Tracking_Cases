import React from 'react';
import { Compass, HardHat, Layers, ShieldCheck, Truck, Radio, Eye } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MarketTickerProps {
  onOpenEvolution?: () => void;
  onOpenConstruction?: () => void;
  onOpenPlots?: () => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ 
  onOpenEvolution,
  onOpenConstruction,
  onOpenPlots,
}) => {
  const { t, isAr } = useLanguage();

  return (
    <div id="features-ticker" className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 text-slate-800 dark:text-slate-100 border-y border-sky-100/80 dark:border-slate-800 shadow-xs transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Headline badge */}
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {t('مؤشرات الرصد والتخطيط الهندسي', 'Engineering & Survey Telemetry')}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 font-mono font-bold">
                  {t('رصد مباشر', 'Live Feed')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t('فحص صلاحية الأراضي، نسب البناء SBC، وأعداد المعدات والتوأم الرقمي', 'Soil suitability, SBC compliance, fleet count & BIM digital twins')}
              </p>
            </div>
          </div>

          {/* Key Stat Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 items-center text-xs">
            
            {/* Built-up ratio */}
            <a 
              href="#evolution"
              className="bg-white dark:bg-slate-800/90 border border-sky-100 dark:border-slate-700/70 hover:border-sky-300 dark:hover:border-sky-500 rounded-xl p-2 cursor-pointer transition-all shadow-xs"
            >
              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>{t('متوسط نسبة البناء', 'Avg Built-Up Ratio')}</span>
                <span className="text-sky-600 dark:text-sky-400 font-mono text-[10px] font-bold flex items-center">
                  {t('+14.2% سنوي', '+14.2% YoY')}
                </span>
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white font-mono mt-0.5">
                68.4% <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">({t('رقعة العمران', 'Urban Footprint')})</span>
              </div>
            </a>

            {/* Machinery on site */}
            <a 
              href="#equipment-fleet"
              className="bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-slate-700/70 hover:border-emerald-300 dark:hover:border-emerald-500 rounded-xl p-2 cursor-pointer transition-all shadow-xs"
            >
              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>{t('أسطول المعدات بالمواقع', 'On-Site Equipment')}</span>
                <Truck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                1,645 <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">{t('معدة نشطة', 'active units')}</span>
              </div>
            </a>

            {/* Land parcels tested */}
            <a 
              href="#soil-suitability"
              className="bg-white dark:bg-slate-800/90 border border-sky-100 dark:border-slate-700/70 hover:border-sky-300 dark:hover:border-sky-500 rounded-xl p-2 cursor-pointer transition-all shadow-xs"
            >
              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>{t('القطع المفحوصة', 'Parcels Audited')}</span>
                <Layers className="w-3 h-3 text-sky-500 dark:text-sky-400" />
              </div>
              <div className="text-sm font-black text-sky-700 dark:text-sky-300 font-mono mt-0.5">
                4,320 <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">{t('قطعة أرض', 'parcels')}</span>
              </div>
            </a>

            {/* Code compliance */}
            <div className="bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-slate-700/70 rounded-xl p-2 shadow-xs">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>{t('صلاحية التربة والجسات', 'Soil Bearing Test')}</span>
                <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                94.8% <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">{t('مطابقة', 'valid pass')}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

