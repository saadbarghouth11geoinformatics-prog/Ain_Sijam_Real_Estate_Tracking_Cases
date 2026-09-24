import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  Building, 
  Landmark, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const BaseetaCalculator: React.FC = () => {
  const { t, isAr } = useLanguage();

  // Input States
  const [areaM2, setAreaM2] = useState<number>(350);
  const [pricePerM2, setPricePerM2] = useState<number>(5500);
  const [annualRentExpected, setAnnualRentExpected] = useState<number>(120000);
  const [loanPercentage, setLoanPercentage] = useState<number>(70); // 70% bank loan
  const [interestRate, setInterestRate] = useState<number>(4.8); // 4.8% annual APR
  const [loanYears, setLoanYears] = useState<number>(20);

  // Computed Outputs
  const totalValuation = areaM2 * pricePerM2;
  const grossYield = totalValuation > 0 ? ((annualRentExpected / totalValuation) * 100).toFixed(2) : '0';
  
  // Net Yield (accounting for ~10% maintenance & management expenses)
  const netRent = annualRentExpected * 0.90;
  const netYield = totalValuation > 0 ? ((netRent / totalValuation) * 100).toFixed(2) : '0';

  // Mortgage calculations (Loan amount, monthly installment)
  const loanAmount = (totalValuation * loanPercentage) / 100;
  const downPayment = totalValuation - loanAmount;
  
  // Standard monthly loan installment formula
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanYears * 12;
  const monthlyInstallment = loanAmount > 0 && monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  const monthlyRent = annualRentExpected / 12;
  const monthlyCashflow = monthlyRent - monthlyInstallment;

  return (
    <section id="calculator" className="space-y-6">
      {/* 1. Header (Background Container with 05-kafd-modern-architecture.webp, object-cover, soft overlay & white text) */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 p-6 sm:p-8 shadow-2xl group">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/images_webp/05-kafd-modern-architecture.webp"
            alt={t('العمارة الحديثة وتقييم الأصول العقارية بكافد', 'Modern Architecture & Real Estate Valuation at KAFD')}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-sky-300 border border-blue-400/30 backdrop-blur-md">
                <Calculator className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {t('حاسبة التقييم والعوائد والتمويل العقاري', 'Valuation, Yield & Mortgage Calculator')}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-400/40 font-bold backdrop-blur-md">
                {t('حسابات فورية', 'Instant Calculations')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl font-medium">
              {t(
                'أداة تفاعلية سريعة لتقدير قيمة عقارك، حساب صافي العائد الاستثماري، واحتساب القسط الشهري والتدفق النقدي.',
                'Interactive tool to compute property valuation, net rental yields, monthly mortgage installments, and cashflow.'
              )}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-slate-300 backdrop-blur-md shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t('معادلات التمويل وفق النظم البنكية السعودية', 'Saudi Banking APR Formula')}</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Calculator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders Input Panel (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold text-blue-950 dark:text-white border-b border-blue-100 dark:border-slate-800 pb-3">
            معايير العقار والتمويل
          </h3>

          {/* Slider 1: Area M2 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-bold">مساحة العقار (م²)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{areaM2} م²</span>
            </div>
            <input 
              type="range"
              min={50}
              max={2500}
              step={10}
              value={areaM2}
              onChange={e => setAreaM2(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-blue-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>50 م²</span>
              <span>1,250 م²</span>
              <span>2,500 م²</span>
            </div>
          </div>

          {/* Slider 2: Price Per M2 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-bold">سعر المتر المربع التقديري (ر.س)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{pricePerM2.toLocaleString('en-US')} ر.س</span>
            </div>
            <input 
              type="range"
              min={1000}
              max={25000}
              step={250}
              value={pricePerM2}
              onChange={e => setPricePerM2(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-blue-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1,000 ر.س</span>
              <span>12,500 ر.س</span>
              <span>25,000 ر.س</span>
            </div>
          </div>

          {/* Slider 3: Expected Annual Rent */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-bold">الإيجار السنوي المتوقع (ر.س)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{annualRentExpected.toLocaleString('en-US')} ر.س</span>
            </div>
            <input 
              type="range"
              min={0}
              max={500000}
              step={5000}
              value={annualRentExpected}
              onChange={e => setAnnualRentExpected(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-blue-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 (أرض أو شاغر)</span>
              <span>250,000 ر.س</span>
              <span>500,000 ر.س</span>
            </div>
          </div>

          {/* Slider 4: Loan Financing % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-bold">نسبة التمويل البنكي (%)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{loanPercentage}% ({loanAmount.toLocaleString('en-US')} ر.س)</span>
            </div>
            <input 
              type="range"
              min={0}
              max={85}
              step={5}
              value={loanPercentage}
              onChange={e => setLoanPercentage(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-blue-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (نقداً بالكامل)</span>
              <span>50%</span>
              <span>85% (الحد الأقصى)</span>
            </div>
          </div>

          {/* Loan Tenor & Interest */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300 font-bold block mb-1">فترة السداد (سنوات)</label>
              <select
                value={loanYears}
                onChange={e => setLoanYears(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2 border border-blue-100 dark:border-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value={10}>10 سنوات</option>
                <option value={15}>15 سنة</option>
                <option value={20}>20 سنة</option>
                <option value={25}>25 سنة</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300 font-bold block mb-1">نسبة الربح السنوية التقديرية (APR)</label>
              <input 
                type="number"
                step="0.1"
                value={interestRate}
                onChange={e => setInterestRate(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2 border border-blue-100 dark:border-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card (5 Cols, Royal Blue & White) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Main Valuation Box */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white border border-blue-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-200 font-bold">القيمة التقديرية الإجمالية للعقار</span>
              <Sparkles className="w-4 h-4 text-sky-300" />
            </div>
            
            <div className="text-3xl sm:text-4xl font-black font-mono text-white">
              {totalValuation.toLocaleString('en-US')} <span className="text-sm font-sans text-blue-200">ر.س</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-800/80 text-xs">
              <div>
                <span className="text-blue-300 block text-[11px]">الدفعة الأولى المطلوبة:</span>
                <strong className="text-white font-mono text-sm">{downPayment.toLocaleString('en-US')} ر.س</strong>
              </div>
              <div>
                <span className="text-blue-300 block text-[11px]">مبلغ التمويل البنكي:</span>
                <strong className="text-sky-300 font-mono text-sm">{loanAmount.toLocaleString('en-US')} ر.س</strong>
              </div>
            </div>
          </div>

          {/* Yields & Cashflow Outputs */}
          <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400">مؤشرات الجدوى والعوائد المالية</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50/60 dark:bg-slate-950 p-3 rounded-2xl border border-blue-100 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">العائد الإجمالي (Gross)</span>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">{grossYield}%</span>
                </div>
                <div className="bg-blue-50/60 dark:bg-slate-950 p-3 rounded-2xl border border-blue-100 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">العائد الصافي (Net)</span>
                  <span className="text-xl font-black text-blue-800 dark:text-blue-300 font-mono">{netYield}%</span>
                </div>
              </div>

              {loanAmount > 0 && (
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-blue-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">القسط البنكي الشهري التقديري:</span>
                    <strong className="text-blue-950 dark:text-white font-mono text-sm">{Math.round(monthlyInstallment).toLocaleString('en-US')} ر.س</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">الدخل الإيجاري الشهري:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{Math.round(monthlyRent).toLocaleString('en-US')} ر.س</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-blue-100 dark:border-slate-800 pt-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">صافي التدفق النقدي الشهري:</span>
                    <strong className={`font-mono text-sm ${monthlyCashflow >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-500'}`}>
                      {monthlyCashflow >= 0 ? '+' : ''}{Math.round(monthlyCashflow).toLocaleString('en-US')} ر.س
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-400 text-center pt-2">
              * الأرقام استرشادية تقديرية مبنية على متوسطات السوق العقاري والتمويل البنكي السعودي
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
