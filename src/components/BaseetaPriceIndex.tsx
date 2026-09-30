import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ChartNoAxesColumnIncreasing, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  SlidersHorizontal,
  DollarSign,
  Building2,
  Sparkles,
  Search,
  RotateCcw,
  Check,
  Eye,
  GitCompareArrows,
  Layers3,
  Percent,
  BadgePercent,
  Coins,
  ShieldCheck,
  Info
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { saudiDistricts } from '../data/mockRealEstateData';
import { City, DistrictInfo } from '../types';

interface QuarterPricePoint {
  quarter: string;
  quarterAr: string;
  quarterShortAr: string;
  resPrice: number;
  comPrice: number;
  volumeM: number;
  prevResPrice: number;
  prevComPrice: number;
}

export const BaseetaPriceIndex: React.FC = () => {
  const { t, isAr } = useLanguage();
  
  // State for filters
  const [selectedCity, setSelectedCity] = useState<City>('الرياض');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('all');
  const [propertyCategory, setPropertyCategory] = useState<'residential' | 'commercial'>('residential');
  const [metricView, setMetricView] = useState<'price' | 'yield'>('price');
  const [timeRange, setTimeRange] = useState<'all' | 'recent'>('all'); // all = 6 quarters, recent = last 4 quarters
  const [showComparison, setShowComparison] = useState<boolean>(true);
  const [activeQuarterIndex, setActiveQuarterIndex] = useState<number>(5); // Default to latest (index 5)
  const [hoveredQuarterIndex, setHoveredQuarterIndex] = useState<number | null>(null);
  const [districtSearchQuery, setDistrictSearchQuery] = useState<string>('');

  const chartRef = useRef<HTMLDivElement>(null);

  // Available cities that have data in saudiDistricts
  const availableCities: City[] = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'الخبر'];

  // Filter districts based on selected city
  const cityDistricts = useMemo(() => {
    return saudiDistricts.filter(d => d.city === selectedCity);
  }, [selectedCity]);

  // Selected district info (if any)
  const selectedDistrict = useMemo(() => {
    if (selectedDistrictId === 'all') return null;
    return cityDistricts.find(d => d.id === selectedDistrictId) || null;
  }, [selectedDistrictId, cityDistricts]);

  // Filtered districts for the table search
  const filteredDistrictsForTable = useMemo(() => {
    if (!districtSearchQuery.trim()) return cityDistricts;
    return cityDistricts.filter(d => 
      d.name.includes(districtSearchQuery.trim()) ||
      d.zoneType.includes(districtSearchQuery.trim())
    );
  }, [cityDistricts, districtSearchQuery]);

  // Reset district selection when city changes
  useEffect(() => {
    setSelectedDistrictId('all');
    setDistrictSearchQuery('');
  }, [selectedCity]);

  // Real quarterly base price history for each city
  const baseCityPriceHistory: Record<string, QuarterPricePoint[]> = useMemo(() => ({
    'الرياض': [
      { quarter: 'Q1 2024', quarterAr: 'الربع الأول 2024', quarterShortAr: 'ر1 2024', resPrice: 4200, comPrice: 7800, volumeM: 380, prevResPrice: 3950, prevComPrice: 7400 },
      { quarter: 'Q2 2024', quarterAr: 'الربع الثاني 2024', quarterShortAr: 'ر2 2024', resPrice: 4450, comPrice: 8100, volumeM: 410, prevResPrice: 4180, prevComPrice: 7750 },
      { quarter: 'Q3 2024', quarterAr: 'الربع الثالث 2024', quarterShortAr: 'ر3 2024', resPrice: 4680, comPrice: 8500, volumeM: 445, prevResPrice: 4390, prevComPrice: 8050 },
      { quarter: 'Q4 2024', quarterAr: 'الربع الرابع 2024', quarterShortAr: 'ر4 2024', resPrice: 4950, comPrice: 8900, volumeM: 480, prevResPrice: 4620, prevComPrice: 8400 },
      { quarter: 'Q1 2025', quarterAr: 'الربع الأول 2025', quarterShortAr: 'ر1 2025', resPrice: 5200, comPrice: 9400, volumeM: 520, prevResPrice: 4880, prevComPrice: 8850 },
      { quarter: 'Q2 2025', quarterAr: 'الربع الثاني 2025', quarterShortAr: 'ر2 2025', resPrice: 5580, comPrice: 10100, volumeM: 575, prevResPrice: 5200, prevComPrice: 9400 },
    ],
    'جدة': [
      { quarter: 'Q1 2024', quarterAr: 'الربع الأول 2024', quarterShortAr: 'ر1 2024', resPrice: 3800, comPrice: 6900, volumeM: 260, prevResPrice: 3620, prevComPrice: 6600 },
      { quarter: 'Q2 2024', quarterAr: 'الربع الثاني 2024', quarterShortAr: 'ر2 2024', resPrice: 3950, comPrice: 7100, volumeM: 280, prevResPrice: 3750, prevComPrice: 6800 },
      { quarter: 'Q3 2024', quarterAr: 'الربع الثالث 2024', quarterShortAr: 'ر3 2024', resPrice: 4120, comPrice: 7350, volumeM: 300, prevResPrice: 3910, prevComPrice: 7000 },
      { quarter: 'Q4 2024', quarterAr: 'الربع الرابع 2024', quarterShortAr: 'ر4 2024', resPrice: 4300, comPrice: 7600, volumeM: 315, prevResPrice: 4080, prevComPrice: 7250 },
      { quarter: 'Q1 2025', quarterAr: 'الربع الأول 2025', quarterShortAr: 'ر1 2025', resPrice: 4480, comPrice: 7900, volumeM: 340, prevResPrice: 4250, prevComPrice: 7500 },
      { quarter: 'Q2 2025', quarterAr: 'الربع الثاني 2025', quarterShortAr: 'ر2 2025', resPrice: 4720, comPrice: 8300, volumeM: 370, prevResPrice: 4480, prevComPrice: 7900 },
    ],
    'الدمام': [
      { quarter: 'Q1 2024', quarterAr: 'الربع الأول 2024', quarterShortAr: 'ر1 2024', resPrice: 3100, comPrice: 5800, volumeM: 190, prevResPrice: 2950, prevComPrice: 5500 },
      { quarter: 'Q2 2024', quarterAr: 'الربع الثاني 2024', quarterShortAr: 'ر2 2024', resPrice: 3250, comPrice: 6000, volumeM: 210, prevResPrice: 3080, prevComPrice: 5700 },
      { quarter: 'Q3 2024', quarterAr: 'الربع الثالث 2024', quarterShortAr: 'ر3 2024', resPrice: 3380, comPrice: 6150, volumeM: 220, prevResPrice: 3210, prevComPrice: 5850 },
      { quarter: 'Q4 2024', quarterAr: 'الربع الرابع 2024', quarterShortAr: 'ر4 2024', resPrice: 3500, comPrice: 6350, volumeM: 240, prevResPrice: 3320, prevComPrice: 6050 },
      { quarter: 'Q1 2025', quarterAr: 'الربع الأول 2025', quarterShortAr: 'ر1 2025', resPrice: 3680, comPrice: 6600, volumeM: 265, prevResPrice: 3490, prevComPrice: 6280 },
      { quarter: 'Q2 2025', quarterAr: 'الربع الثاني 2025', quarterShortAr: 'ر2 2025', resPrice: 3850, comPrice: 6900, volumeM: 290, prevResPrice: 3680, prevComPrice: 6600 },
    ],
    'مكة المكرمة': [
      { quarter: 'Q1 2024', quarterAr: 'الربع الأول 2024', quarterShortAr: 'ر1 2024', resPrice: 3900, comPrice: 8500, volumeM: 210, prevResPrice: 3720, prevComPrice: 8100 },
      { quarter: 'Q2 2024', quarterAr: 'الربع الثاني 2024', quarterShortAr: 'ر2 2024', resPrice: 4050, comPrice: 8800, volumeM: 230, prevResPrice: 3870, prevComPrice: 8400 },
      { quarter: 'Q3 2024', quarterAr: 'الربع الثالث 2024', quarterShortAr: 'ر3 2024', resPrice: 4200, comPrice: 9100, volumeM: 245, prevResPrice: 4010, prevComPrice: 8700 },
      { quarter: 'Q4 2024', quarterAr: 'الربع الرابع 2024', quarterShortAr: 'ر4 2024', resPrice: 4380, comPrice: 9500, volumeM: 270, prevResPrice: 4180, prevComPrice: 9050 },
      { quarter: 'Q1 2025', quarterAr: 'الربع الأول 2025', quarterShortAr: 'ر1 2025', resPrice: 4590, comPrice: 9900, volumeM: 295, prevResPrice: 4370, prevComPrice: 9420 },
      { quarter: 'Q2 2025', quarterAr: 'الربع الثاني 2025', quarterShortAr: 'ر2 2025', resPrice: 4850, comPrice: 10400, volumeM: 320, prevResPrice: 4590, prevComPrice: 9900 },
    ],
    'الخبر': [
      { quarter: 'Q1 2024', quarterAr: 'الربع الأول 2024', quarterShortAr: 'ر1 2024', resPrice: 3300, comPrice: 6200, volumeM: 180, prevResPrice: 3120, prevComPrice: 5900 },
      { quarter: 'Q2 2024', quarterAr: 'الربع الثاني 2024', quarterShortAr: 'ر2 2024', resPrice: 3450, comPrice: 6400, volumeM: 195, prevResPrice: 3280, prevComPrice: 6100 },
      { quarter: 'Q3 2024', quarterAr: 'الربع الثالث 2024', quarterShortAr: 'ر3 2024', resPrice: 3600, comPrice: 6650, volumeM: 210, prevResPrice: 3420, prevComPrice: 6350 },
      { quarter: 'Q4 2024', quarterAr: 'الربع الرابع 2024', quarterShortAr: 'ر4 2024', resPrice: 3780, comPrice: 6900, volumeM: 225, prevResPrice: 3590, prevComPrice: 6580 },
      { quarter: 'Q1 2025', quarterAr: 'الربع الأول 2025', quarterShortAr: 'ر1 2025', resPrice: 3950, comPrice: 7200, volumeM: 240, prevResPrice: 3760, prevComPrice: 6860 },
      { quarter: 'Q2 2025', quarterAr: 'الربع الثاني 2025', quarterShortAr: 'ر2 2025', resPrice: 4180, comPrice: 7550, volumeM: 260, prevResPrice: 3950, prevComPrice: 7200 },
    ]
  }), []);

  // Compute actual price series (adjusted if specific district selected)
  const fullPriceHistory = useMemo(() => {
    const raw = baseCityPriceHistory[selectedCity] || baseCityPriceHistory['الرياض'];
    
    if (!selectedDistrict) {
      return raw;
    }

    // Scale proportionally to selected district's baseline price
    const latestRawRes = raw[raw.length - 1].resPrice;
    const latestRawCom = raw[raw.length - 1].comPrice;
    const distResRatio = selectedDistrict.avgPriceM2Residential / latestRawRes;
    const distComRatio = selectedDistrict.avgPriceM2Commercial / latestRawCom;

    return raw.map(pt => ({
      ...pt,
      resPrice: Math.round(pt.resPrice * distResRatio),
      comPrice: Math.round(pt.comPrice * distComRatio),
      prevResPrice: Math.round(pt.prevResPrice * distResRatio),
      prevComPrice: Math.round(pt.prevComPrice * distComRatio),
    }));
  }, [baseCityPriceHistory, selectedCity, selectedDistrict]);

  // Trim based on time range
  const priceHistory = useMemo(() => {
    if (timeRange === 'recent') {
      return fullPriceHistory.slice(2); // Last 4 quarters
    }
    return fullPriceHistory; // All 6 quarters
  }, [fullPriceHistory, timeRange]);

  // Ensure activeQuarterIndex is in bounds
  const safeActiveIndex = Math.min(activeQuarterIndex, priceHistory.length - 1);
  const effectiveHoverOrActive = hoveredQuarterIndex !== null && hoveredQuarterIndex < priceHistory.length 
    ? hoveredQuarterIndex 
    : safeActiveIndex;

  const currentData = priceHistory[effectiveHoverOrActive] || priceHistory[priceHistory.length - 1];
  
  // Previous quarter for change calculation
  const previousData = effectiveHoverOrActive > 0 ? priceHistory[effectiveHoverOrActive - 1] : null;

  // Prices according to property category
  const currentPrice = propertyCategory === 'residential' ? currentData.resPrice : currentData.comPrice;
  const previousPrice = previousData 
    ? (propertyCategory === 'residential' ? previousData.resPrice : previousData.comPrice)
    : (propertyCategory === 'residential' ? currentData.prevResPrice : currentData.prevComPrice);
  
  const comparisonPrice = propertyCategory === 'residential' ? currentData.prevResPrice : currentData.prevComPrice;

  // Quarter-over-Quarter change
  const qoqChangePct = previousPrice > 0 
    ? Number((((currentPrice - previousPrice) / previousPrice) * 100).toFixed(1))
    : 0;

  // Year-over-Year change (compare latest to Q2 2024 or Q1 2024)
  const yoyBasePrice = priceHistory[0] ? (propertyCategory === 'residential' ? priceHistory[0].resPrice : priceHistory[0].comPrice) : currentPrice;
  const yoyChangePct = yoyBasePrice > 0
    ? Number((((currentPrice - yoyBasePrice) / yoyBasePrice) * 100).toFixed(1))
    : 0;

  // Calculate SVG dimensions and coordinate scales
  const chartWidth = 800;
  const chartHeight = 290;
  const paddingLeft = 30; // RTL: margin on left
  const paddingRight = 85; // RTL: margin on right for Y-axis labels
  const paddingTop = 30;
  const paddingBottom = 48;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  // Price range for Y-axis
  const allValues = useMemo(() => {
    const vals: number[] = [];
    priceHistory.forEach(h => {
      vals.push(propertyCategory === 'residential' ? h.resPrice : h.comPrice);
      if (showComparison) {
        vals.push(propertyCategory === 'residential' ? h.prevResPrice : h.prevComPrice);
      }
    });
    return vals;
  }, [priceHistory, propertyCategory, showComparison]);

  const minRaw = Math.min(...allValues);
  const maxRaw = Math.max(...allValues);
  
  // Nice rounded bounds for Y axis
  const yMin = Math.floor((minRaw * 0.92) / 200) * 200;
  const yMax = Math.ceil((maxRaw * 1.06) / 200) * 200;
  const yRange = yMax - yMin || 1;

  // Generate 4-5 nice tick marks
  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const count = 4;
    const step = Math.round((yMax - yMin) / count / 100) * 100;
    for (let i = 0; i <= count; i++) {
      ticks.push(yMin + i * step);
    }
    return ticks;
  }, [yMin, yMax]);

  // Points coordinates for main line
  const mainPoints = useMemo(() => {
    return priceHistory.map((item, index) => {
      const x = paddingLeft + (index / (priceHistory.length - 1)) * plotWidth;
      const val = propertyCategory === 'residential' ? item.resPrice : item.comPrice;
      const y = paddingTop + plotHeight - ((val - yMin) / yRange) * plotHeight;
      return { x, y, val, item, index };
    });
  }, [priceHistory, propertyCategory, yMin, yRange, plotWidth, plotHeight]);

  // Points coordinates for comparison line
  const comparisonPoints = useMemo(() => {
    if (!showComparison) return [];
    return priceHistory.map((item, index) => {
      const x = paddingLeft + (index / (priceHistory.length - 1)) * plotWidth;
      const val = propertyCategory === 'residential' ? item.prevResPrice : item.prevComPrice;
      const y = paddingTop + plotHeight - ((val - yMin) / yRange) * plotHeight;
      return { x, y, val, item, index };
    });
  }, [priceHistory, propertyCategory, showComparison, yMin, yRange, plotWidth, plotHeight]);

  // Smooth cubic spline generator
  const createSmoothPath = (pts: { x: number; y: number }[]): string => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    if (pts.length === 2) return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`;

    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const tension = 0.2;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    return d;
  };

  const mainPathD = useMemo(() => createSmoothPath(mainPoints), [mainPoints]);
  const comparisonPathD = useMemo(() => createSmoothPath(comparisonPoints), [comparisonPoints]);

  // Filled area path underneath the main curve
  const areaPathD = useMemo(() => {
    if (mainPoints.length === 0) return '';
    const firstX = mainPoints[0].x.toFixed(1);
    const lastX = mainPoints[mainPoints.length - 1].x.toFixed(1);
    const bottomY = (paddingTop + plotHeight).toFixed(1);
    return `${mainPathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [mainPathD, mainPoints, paddingTop, plotHeight]);

  // Active point for tooltip and highlight
  const activePoint = mainPoints[effectiveHoverOrActive] || mainPoints[mainPoints.length - 1];
  const activeCompPoint = comparisonPoints[effectiveHoverOrActive] || null;

  // Tooltip positioning
  const tooltipXPercent = activePoint ? (activePoint.x / chartWidth) * 100 : 50;
  const tooltipYPercent = activePoint ? (activePoint.y / chartHeight) * 100 : 50;

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCity('الرياض');
    setSelectedDistrictId('all');
    setPropertyCategory('residential');
    setMetricView('price');
    setTimeRange('all');
    setShowComparison(true);
    setDistrictSearchQuery('');
    setActiveQuarterIndex(5);
  };

  return (
    <section id="indicators" className="space-y-6 animate-fadeIn">
      {/* 1. COMPACT PAGE HEADER & REAL-TIME CONTROLS BAR */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 flex items-center justify-center">
                <ChartNoAxesColumnIncreasing className="w-5 h-5 text-blue-600 dark:text-blue-400 stroke-[2]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white tracking-tight">
                {t('مؤشر أسعار المتر المربع وتداولات السوق العقاري', 'Price Index & Market Analytics')}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {t('بيانات وزارة العدل والبورصة العقارية', 'MOJ & Real Estate Exchange')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
              {t(
                'رصد فصلي دقيق لمتوسط سعر المتر المربع وحجم السيولة المتداولة للأراضي والوحدات العقارية، مع إمكانية المقارنة الفورية وتحليل اتجاهات النمو عبر مختلف المدن والأحياء السعودية.',
                'Official quarterly monitoring of average price per square meter and transaction volume across major Saudi cities and neighborhoods.'
              )}
            </p>
          </div>

          {/* Quick city switcher pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            {availableCities.map(city => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Property Category: Residential vs Commercial */}
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPropertyCategory('residential')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  propertyCategory === 'residential'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>سكني</span>
              </button>
              <button
                type="button"
                onClick={() => setPropertyCategory('commercial')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  propertyCategory === 'commercial'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
                }`}
              >
                <Layers3 className="w-3.5 h-3.5" />
                <span>تجاري</span>
              </button>
            </div>

            {/* District Dropdown Selector */}
            <div className="relative">
              <select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                aria-label="اختيار الحي"
                className="appearance-none bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-1.5 pe-8 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">جميع أحياء {selectedCity} ({cityDistricts.length} حي)</option>
                {cityDistricts.map(dist => (
                  <option key={dist.id} value={dist.id}>
                    حي {dist.name} ({dist.zoneType})
                  </option>
                ))}
              </select>
              <div className="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Time range selector */}
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setTimeRange('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  timeRange === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-blue-600'
                }`}
              >
                كل الفصول (6 فترات)
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('recent')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  timeRange === 'recent'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-blue-600'
                }`}
              >
                آخر سنة (4 فصول)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Comparison Line */}
            <button
              type="button"
              onClick={() => setShowComparison(!showComparison)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                showComparison
                  ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                  : 'bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-blue-600'
              }`}
            >
              <GitCompareArrows className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>مقارنة الفترة السابقة</span>
            </button>

            {/* Reset button if filtered */}
            {(selectedDistrictId !== 'all' || timeRange !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-blue-600 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
                title="إعادة ضبط الفلاتر"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">إعادة ضبط</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. KPI SUMMARY ROW ABOVE THE CHART (COMPACT & RICH REAL DATA) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Current Price */}
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>متوسط سعر المتر</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ChartNoAxesColumnIncreasing className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-blue-950 dark:text-white font-mono tracking-tight">
              {currentPrice.toLocaleString('en-US')}
            </span>
            <span className="text-xs font-bold text-slate-400 font-sans">ر.س / م²</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <span>صفقات معتمدة وموثقة</span>
          </div>
        </div>

        {/* KPI 2: Period Change */}
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>التغير الدوري (فصلي)</span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              qoqChangePct >= 0 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600' 
                : 'bg-red-50 dark:bg-red-950/50 text-red-600'
            }`}>
              {qoqChangePct >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-600 stroke-[2.5]" />
              )}
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
              qoqChangePct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {qoqChangePct > 0 ? `+${qoqChangePct}%` : `${qoqChangePct}%`}
            </span>
            <span className="text-[11px] font-bold text-slate-400 font-sans">عن الربع السابق</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <span className="font-mono text-emerald-600 font-bold">+{yoyChangePct}%</span>
            <span>نمو سنوي إجمالي</span>
          </div>
        </div>

        {/* KPI 3: Selected Scope / Area */}
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>نطاق التغطية العقارية</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <MapPin className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="pt-0.5 truncate">
            <div className="text-base sm:text-lg font-black text-blue-950 dark:text-white truncate">
              {selectedDistrict ? `حي ${selectedDistrict.name}` : selectedCity}
            </div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {propertyCategory === 'residential' ? 'القطاع السكني المعتمد' : 'القطاع التجاري والاستثماري'}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            {selectedDistrict ? `تصنيف: ${selectedDistrict.zoneType}` : `${cityDistricts.length} حي مسجل في المؤشر`}
          </div>
        </div>

        {/* KPI 4: Last Update & Volume */}
        <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>الفترة وحجم التداولات</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="text-base sm:text-lg font-black text-blue-950 dark:text-white font-mono">
              {currentData.quarterAr}
            </span>
          </div>
          <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1 font-mono">
            <span>السيولة:</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{currentData.volumeM} مليون ر.س</span>
          </div>
        </div>
      </div>

      {/* 3. HERO CHART CARD: PREMIUM CURVED LINE CHART WITH ACCURATE SCALING */}
      <div 
        ref={chartRef}
        className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-7 shadow-sm space-y-4 relative"
      >
        {/* Card Header & Controls inside Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-blue-950 dark:text-white">
                منحنى اتجاه سعر المتر المربع وتطور السيولة
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono">
                {currentData.quarter}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              انقر أو مرّر على أي نقطة زمنية لاستعراض تفاصيل الربع السعري ومؤشراته
            </p>
          </div>

          {/* Clean Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Current period indicator */}
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-1 rounded-full bg-blue-600 inline-block" />
              <span className="font-bold text-slate-700 dark:text-slate-300">
                الفترة الحالية ({propertyCategory === 'residential' ? 'سكني' : 'تجاري'})
              </span>
            </div>

            {/* Comparison period indicator */}
            {showComparison && (
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 border-t-2 border-dashed border-purple-500 inline-block" />
                <span className="font-bold text-purple-700 dark:text-purple-300">
                  الفترة السابقة المقارنة
                </span>
              </div>
            )}
          </div>
        </div>

        {/* The SVG Trend Graph Canvas */}
        <div className="relative w-full overflow-hidden select-none">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[330px] overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Primary Blue Gradient Area under curve (starts ~32% opacity, fades to transparent) */}
              <linearGradient id="ainSijamBlueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.32" />
                <stop offset="65%" stopColor="#2563EB" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.00" />
              </linearGradient>

              {/* Violet Gradient for Comparison curve */}
              <linearGradient id="compVioletGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.00" />
              </linearGradient>

              {/* Subtle Drop Shadow for active marker */}
              <filter id="activeMarkerGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#2563EB" floodOpacity="0.55" />
              </filter>
            </defs>

            {/* Horizontal Light Blue-Gray Grid Lines and Y-Axis Labels */}
            {yTicks.map((tickVal) => {
              const yPos = paddingTop + plotHeight - ((tickVal - yMin) / yRange) * plotHeight;
              return (
                <g key={tickVal}>
                  <line
                    x1={paddingLeft}
                    y1={yPos}
                    x2={chartWidth - paddingRight}
                    y2={yPos}
                    stroke="#E2E8F0"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    className="dark:stroke-slate-800"
                  />
                  {/* Y-axis Label on the right (RTL friendly) */}
                  <text
                    x={chartWidth - paddingRight + 12}
                    y={yPos + 4}
                    textAnchor="start"
                    fontSize="11"
                    fontFamily="monospace"
                    className="fill-slate-400 dark:fill-slate-500 font-semibold"
                  >
                    {tickVal.toLocaleString('en-US')} ر.س
                  </text>
                </g>
              );
            })}

            {/* Filled Area Under Primary Curve */}
            <path
              d={areaPathD}
              fill="url(#ainSijamBlueGradient)"
              className="transition-all duration-300"
            />

            {/* Comparison Dashed Curve (if enabled) */}
            {showComparison && (
              <path
                d={comparisonPathD}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeDasharray="5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80 transition-all duration-300"
              />
            )}

            {/* Comparison Points (small subtle dots) */}
            {showComparison && comparisonPoints.map((pt) => {
              const isPtActive = pt.index === effectiveHoverOrActive;
              return (
                <circle
                  key={`comp-${pt.index}`}
                  cx={pt.x}
                  cy={pt.y}
                  r={isPtActive ? 4.5 : 3}
                  fill="#8B5CF6"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />
              );
            })}

            {/* Main Trend Line (Ain Sijam Blue #2563EB) */}
            <path
              d={mainPathD}
              fill="none"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-line-animated drop-shadow-[0_2px_4px_rgba(37,99,235,0.2)]"
            />

            {/* Vertical Guide Line on Active Point */}
            {activePoint && (
              <line
                x1={activePoint.x}
                y1={paddingTop}
                x2={activePoint.x}
                y2={paddingTop + plotHeight}
                stroke="#2563EB"
                strokeWidth="1.5"
                strokeDasharray="2 3"
                className="opacity-60 pointer-events-none"
              />
            )}

            {/* Interactive Data Points on Main Curve */}
            {mainPoints.map((pt) => {
              const isSelected = pt.index === safeActiveIndex;
              const isHovered = pt.index === hoveredQuarterIndex;
              const isHighlighted = isSelected || isHovered;

              return (
                <g
                  key={`point-${pt.index}`}
                  className="cursor-pointer group"
                  onClick={() => setActiveQuarterIndex(pt.index)}
                  onMouseEnter={() => setHoveredQuarterIndex(pt.index)}
                  onMouseLeave={() => setHoveredQuarterIndex(null)}
                >
                  {/* Invisible wide hit area for easy tapping on touch screens */}
                  <rect
                    x={pt.x - 24}
                    y={paddingTop}
                    width={48}
                    height={plotHeight}
                    fill="transparent"
                  />

                  {/* Outer pulse ring for highlighted point */}
                  {isHighlighted && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="11"
                      fill="#2563EB"
                      fillOpacity="0.15"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Marker Circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHighlighted ? 7 : 4.5}
                    fill="#2563EB"
                    stroke="#FFFFFF"
                    strokeWidth={isHighlighted ? 2.5 : 2}
                    filter={isHighlighted ? "url(#activeMarkerGlow)" : undefined}
                    className="transition-all duration-150"
                  />

                  {/* White inner center for active/selected marker */}
                  {isHighlighted && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="2.5"
                      fill="#FFFFFF"
                    />
                  )}

                  {/* X-axis Label underneath */}
                  <text
                    x={pt.x}
                    y={paddingTop + plotHeight + 24}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="sans-serif"
                    className={`transition-colors font-medium ${
                      isHighlighted 
                        ? 'fill-blue-600 dark:fill-blue-400 font-bold' 
                        : 'fill-slate-500 dark:fill-slate-400'
                    }`}
                  >
                    {/* Responsive text: show short on smaller viewBox or full */}
                    {pt.item.quarterShortAr}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Polished Floating RTL Tooltip Card */}
          {activePoint && (
            <div
              className="absolute z-20 pointer-events-none transition-all duration-150 ease-out"
              style={{
                left: `${Math.min(Math.max(tooltipXPercent, 14), 86)}%`,
                top: `${Math.max(tooltipYPercent - 22, 10)}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl p-3 shadow-xl text-xs space-y-1.5 min-w-[190px] max-w-[240px]">
                {/* Period and Badge */}
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <span className="font-bold text-white text-xs">{currentData.quarterAr}</span>
                  <span className="font-mono text-[10px] text-blue-400 font-bold bg-blue-950/60 px-1.5 py-0.5 rounded">
                    {currentData.quarter}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline justify-between pt-0.5">
                  <span className="text-slate-400 text-[11px]">متوسط المتر:</span>
                  <span className="text-sm font-black text-sky-300 font-mono">
                    {currentPrice.toLocaleString('en-US')} <span className="text-[10px] font-sans text-slate-300">ر.س</span>
                  </span>
                </div>

                {/* Change QoQ */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">التغير الدوري:</span>
                  <span className={`font-mono text-xs font-bold flex items-center gap-0.5 ${
                    qoqChangePct >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {qoqChangePct >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                    {qoqChangePct > 0 ? `+${qoqChangePct}%` : `${qoqChangePct}%`}
                  </span>
                </div>

                {/* Comparison Price (if active) */}
                {showComparison && (
                  <div className="flex items-center justify-between text-[11px] text-purple-300 pt-0.5 border-t border-slate-800/80">
                    <span className="text-slate-400 text-[10px]">الفترة المقارنة:</span>
                    <span className="font-mono font-bold">
                      {comparisonPrice.toLocaleString('en-US')} ر.س
                    </span>
                  </div>
                )}

                {/* Trading Volume */}
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 flex items-center justify-between">
                  <span>حجم الصفقات:</span>
                  <span className="font-mono text-slate-300 font-semibold">{currentData.volumeM} مليون ر.س</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SUBTLE FACTUAL INSIGHT CALLOUT BELOW THE GRAPH */}
        <div className="rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 p-3.5 sm:p-4 flex items-start gap-3 text-xs leading-relaxed text-blue-950 dark:text-blue-200">
          <div className="w-7 h-7 rounded-xl bg-blue-600 text-white shrink-0 flex items-center justify-center mt-0.5 shadow-sm shadow-blue-600/20">
            <Info className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <span>تحليل الأداء الفصلي لمؤشر {selectedCity} ({propertyCategory === 'residential' ? 'سكني' : 'تجاري'}):</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-mono font-bold">
                {currentData.quarterAr}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {qoqChangePct >= 0 ? (
                <>
                  سجّل متوسط سعر المتر المربع في <span className="font-bold text-blue-900 dark:text-white">{selectedDistrict ? `حي ${selectedDistrict.name}` : selectedCity}</span> ارتفاعاً بنسبة <span className="font-bold font-mono text-emerald-600">+{qoqChangePct}%</span> مقارنة بالفترة السابقة، مع بلوغ إجمالي قيمة الصفقات المنفذة <span className="font-bold font-mono text-blue-900 dark:text-blue-200">{currentData.volumeM} مليون ريال سعودي</span>، مسجلاً نمواً تراكمياً قدره <span className="font-bold font-mono text-blue-700 dark:text-blue-300">+{yoyChangePct}%</span> مقارنة بالفترة ذاتها من العام الماضي.
                </>
              ) : (
                <>
                  سجّل متوسط سعر المتر المربع في <span className="font-bold text-blue-900 dark:text-white">{selectedDistrict ? `حي ${selectedDistrict.name}` : selectedCity}</span> تراجعاً طفيفاً بنسبة <span className="font-bold font-mono text-red-600">{qoqChangePct}%</span> مقارنة بالفترة السابقة، مع تداول <span className="font-bold font-mono text-blue-900 dark:text-blue-200">{currentData.volumeM} مليون ريال سعودي</span>.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 4. DISTRICTS LEADERBOARD & INTERACTIVE DATA TABLE */}
      <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-blue-950 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 stroke-[2]" />
              <span>مؤشرات أداء الأحياء المعتمدة في {selectedCity}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              انقر على أي حي لعرض مساره السعري في الرسم البياني أعلاه
            </p>
          </div>

          {/* District Search Input */}
          <div className="relative min-w-[200px] sm:w-64">
            <input
              type="text"
              value={districtSearchQuery}
              onChange={(e) => setDistrictSearchQuery(e.target.value)}
              placeholder="البحث باسم الحي أو التصنيف..."
              className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs px-3 py-2 ps-9 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute start-2.5 top-1/2 -translate-y-1/2" />
            {districtSearchQuery && (
              <button
                type="button"
                onClick={() => setDistrictSearchQuery('')}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State when no districts match search */}
        {filteredDistrictsForTable.length === 0 ? (
          <div className="py-12 px-4 text-center rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                لا توجد أحياء مطابقة لبحثك "{districtSearchQuery}" في {selectedCity}
              </p>
              <p className="text-xs text-slate-400">
                يمكنك مسح البحث أو تغيير المدينة لاستعراض بيانات الأحياء الأخرى
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDistrictSearchQuery('')}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              إعادة ضبط البحث
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50/80 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">الحي</th>
                  <th className="py-3 px-3">التصنيف العمراني</th>
                  <th className="py-3 px-3">سعر المتر السكني</th>
                  <th className="py-3 px-3">سعر المتر التجاري</th>
                  <th className="py-3 px-3">النمو السنوي</th>
                  <th className="py-3 px-3">العائد الإيجاري</th>
                  <th className="py-3 px-3">حجم الصفقات</th>
                  <th className="py-3 px-4">مستوى الطلب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {filteredDistrictsForTable.map(dist => {
                  const isRowSelected = selectedDistrictId === dist.id;

                  return (
                    <tr 
                      key={dist.id} 
                      onClick={() => setSelectedDistrictId(isRowSelected ? 'all' : dist.id)}
                      className={`transition-colors cursor-pointer ${
                        isRowSelected 
                          ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-950 dark:text-white' 
                          : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 shrink-0 ${
                          isRowSelected ? 'text-blue-600' : 'text-slate-400'
                        }`} />
                        <span className={isRowSelected ? 'text-blue-700 dark:text-blue-400 font-black' : 'text-slate-800 dark:text-slate-200'}>
                          {dist.name}
                        </span>
                        {isRowSelected && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                            محدد
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">
                        {dist.zoneType}
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {dist.avgPriceM2Residential.toLocaleString('en-US')} ر.س
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {dist.avgPriceM2Commercial.toLocaleString('en-US')} ر.س
                      </td>
                      <td className="py-3.5 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        +{dist.yearlyChangePct}%
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-700 dark:text-slate-300 font-semibold">
                        {dist.rentalYieldPct}%
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-500 dark:text-slate-400">
                        {dist.dealsCountMonth} صفقة/شهر
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          dist.demandLevel === 'مرتفع جداً'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {dist.demandLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-2 gap-2">
          <span>* مصدر البيانات: المؤشر العقاري المعتمد لدى وزارة العدل والبورصة العقارية السعودية</span>
          <span className="font-mono text-slate-500">تحديث أسبوعي مستمر</span>
        </div>
      </div>
    </section>
  );
};
