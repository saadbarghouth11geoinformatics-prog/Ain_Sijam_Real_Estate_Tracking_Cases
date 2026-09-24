import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Building2,
  Lock
} from 'lucide-react';
import { sigamSubscriptionPlans } from '../data/sigamData';
import { SubscriptionPlan } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface PricingSectionProps {
  isSubscriber: boolean;
  onActivatePlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  isSubscriber,
  onActivatePlan,
}) => {
  const { t, isAr, lang } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [activatedId, setActivatedId] = useState<string | null>(null);

  const handleActivate = (planId: string) => {
    onActivatePlan(planId);
    setActivatedId(planId);
    setTimeout(() => {
      setActivatedId(null);
    }, 2500);
  };

  const planEnglishDetails: Record<string, { tagline: string; limits: string[]; features: string[] }> = {
    free_demo: {
      tagline: 'Public demo preview for benchmark districts and projects',
      limits: ['Public demo parcels only (no private deeds)', '3 public demo project sites'],
      features: [
        'Explore public parcel samples and land suitability',
        'Inspect yearly urban sprawl satellite metrics',
        'Monitor machinery fleet in public benchmark projects',
        'Estimate setback and FAR coverage calculators',
        'Consult SIGAM engineering advisor (preview tier)'
      ]
    },
    independent_surveyor: {
      tagline: 'Tailored for consulting engineers, surveyors & solo developers',
      limits: ['50 private parcels/month by deed or coordinates', 'Track up to 2 private construction job sites'],
      features: [
        'Audit 50 private parcels/month by deed or GPS coordinates',
        'Download certified geotechnical & soil borehole PDF reports',
        'Export engineering cadastre to CAD (DWG) & Vector layers',
        'Track fleet counts & equipment telematics on 2 custom job sites',
        'Compare monthly satellite time-lapses (50cm resolution)',
        'Query floodway buffers, utility easements & road right-of-ways'
      ]
    },
    engineering_office: {
      tagline: 'For certified engineering firms, general contractors & developers',
      limits: ['Unlimited private parcel and deed audits', 'Track up to 10 construction sites simultaneously'],
      features: [
        'Unlimited private land parcel audits, setbacks & FAR ratios',
        'Unlimited export of borehole tests, CAD files & BIM models',
        'Fleet & IoT machinery telematics tracking for up to 10 job sites',
        'Monthly temporal delta analyzing actual vs. planned progress',
        'Weekly high-res contour, elevation (DEM) & drainage refresh',
        'Soil settlement, water table & certified bearing capacity',
        'Direct compliance integration with Saudi Building Code (SBC)',
        'Dedicated on-demand consultation with SIGAM senior engineers'
      ]
    },
    enterprise_developer: {
      tagline: 'For sovereign funds, master developers & giga-projects',
      limits: ['Unlimited coverage kingdom-wide and raw land plots', 'Unlimited active construction job sites'],
      features: [
        'Kingdom-wide coverage for raw master plans & giga-projects',
        'Topographic, hydrological flood & geotechnical master analysis',
        'Centralized operations center monitoring thousands of machines',
        'Certified engineering audit dossiers for institutional funds',
        'Comprehensive historical earth observation archive since 2015',
        'Dedicated private instance & sovereign data encryption',
        '24/7 dedicated lead geospatial consulting partner'
      ]
    }
  };

  return (
    <section id="pricing" className="py-16 bg-gradient-to-b from-white via-sky-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950 relative transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 shadow-xs">
            <Crown className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t('باقات الاشتراك والترخيص المهني للمنصة', 'Subscription Plans & Professional Licensing')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('اختر الباقة المناسبة لمكتبك، استثماراتك أو شركتك التطويرية', 'Choose the Optimal Tier for Your Investments, Firm or Projects')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t(
              'توفر منصة عين سيجام اشتراكات مخصصة للمستثمرين، المطورين العقاريين، والمكاتب الهندسية، تشمل فحص الصكوك وتتبع المحافظ وتقارير الجدوى وصور الأقمار الصناعية.',
              'SIGAM Eye provides specialized subscription tiers for investors, developers, and consulting firms, featuring deed auditing, portfolio tracking, and high-precision spatial reports.'
            )}
          </p>

          {/* Investor & Developer Banner Container with drive_banner_03, object-fit: cover, soft overlay and crisp white text */}
          <div className="relative overflow-hidden max-w-4xl mx-auto my-6 p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-2xl text-start group">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src="/images/drive-banners/drive_banner_03.png"
                alt={t('أبراج مركز الملك عبدالله المالي واستثمارات التطوير العقاري', 'KAFD Towers & Real Estate Investment')}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                style={{ objectPosition: 'center 45%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/80 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="text-[11px] font-bold text-sky-300 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-400/30 backdrop-blur-md inline-block">
                  {t('حلول المستثمرين وكبار المطورين', 'Investors & Enterprise Developers')}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Cairo'] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {t('تمكين قرارات الاستثمار العقاري وصناديق التطوير الكبرى', 'Empowering Real Estate Investments & Sovereign Funds')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-medium">
                  {t(
                    'احصل على وصول مباشر لتقارير دراسات الجدوى المتكاملة، مراقبة مشاريع الأبراج والوجهات الحضرية، وتحليل مؤشرات السيولة والتراخيص الرسمية.',
                    'Direct access to full feasibility analytics, tower & urban mega-project monitoring, and official liquidity and licensing data.'
                  )}
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-center">
                  <div className="text-xs text-slate-300">{t('تغطية الصفقات الرسمية', 'Official Deeds')}</div>
                  <div className="text-xl font-black text-sky-400 font-mono mt-0.5">4.2M+</div>
                  <div className="text-[10px] text-emerald-400 font-medium">100% {t('تحديث فوري', 'Real-time')}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-center">
                  <div className="text-xs text-slate-300">{t('كود البناء والارتدادات', 'SBC 303 Code')}</div>
                  <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">±1.8cm</div>
                  <div className="text-[10px] text-slate-300 font-medium">{t('مطابقة خط التنظيم', 'Cadastre Match')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Switcher */}
          <div className="pt-3 flex items-center justify-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold shadow-inner">
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t('اشتراك سنوي (الأكثر توفيراً)', 'Annual Billing (Best Value)')}</span>
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
                  {t('توفير 20%', 'Save 20%')}
                </span>
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t('اشتراك شهري', 'Monthly Billing')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sigamSubscriptionPlans.map((plan: SubscriptionPlan) => {
            const isFree = plan.id === 'free_demo';
            const price = billingCycle === 'annual' ? plan.annualPriceSAR : plan.monthlyPriceSAR;
            const isSelected = activatedId === plan.id;
            const enInfo = planEnglishDetails[plan.id];

            const planName = isAr ? plan.nameAr : plan.nameEn;
            const planTagline = isAr ? plan.tagline : (enInfo?.tagline || plan.tagline);
            const planFeatures = isAr ? plan.features : (enInfo?.features || plan.features);

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative border ${
                  plan.highlight
                    ? 'bg-white dark:bg-slate-900 border-sky-400 dark:border-sky-500 shadow-xl shadow-sky-500/10 ring-2 ring-sky-400/30'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 ${isAr ? 'right-6' : 'left-6'} bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md`}>
                    {isAr ? plan.badge : (plan.id === 'engineering_office' ? 'MOST POPULAR' : 'BEST VALUE')}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{planName}</h3>
                    <div className="text-[11px] text-sky-600 dark:text-sky-400 font-mono font-bold">
                      {isAr ? plan.nameEn : plan.nameAr}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 min-h-[36px] leading-relaxed">{planTagline}</p>
                  </div>

                  {/* Price Display */}
                  <div className="mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    {isFree ? (
                      <div>
                        <span className="text-2xl font-black text-slate-900 dark:text-white">
                          {t('مجاني', 'Free')}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mx-2">
                          {t('(معاينة استرشادية فقط)', '(Public sample preview)')}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">{price.toLocaleString()}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {t('ريال', 'SAR')} / {billingCycle === 'annual' ? t('سنة', 'yr') : t('شهر', 'mo')}
                          </span>
                        </div>
                        {billingCycle === 'annual' && (
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 font-mono">
                            {t(
                              `يعادل ${Math.round(plan.annualPriceSAR / 12).toLocaleString()} ر.س شهرياً`,
                              `Approx. ${Math.round(plan.annualPriceSAR / 12).toLocaleString()} SAR/mo`
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Key Quota Limits */}
                  <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 mb-4 text-xs space-y-1">
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                      {t('حدود الاستخدام:', 'Quota Limits:')}
                    </div>
                    {isAr ? (
                      <>
                        <div className="text-slate-800 dark:text-slate-200 font-bold">• {plan.limits.privatePlotsSearches}</div>
                        <div className="text-slate-800 dark:text-slate-200 font-bold">• {plan.limits.customSitesTracked}</div>
                      </>
                    ) : (
                      enInfo?.limits.map((lim, idx) => (
                        <div key={idx} className="text-slate-800 dark:text-slate-200 font-bold">• {lim}</div>
                      ))
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-600 dark:text-slate-300">
                    {planFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  <button
                    onClick={() => handleActivate(plan.id)}
                    className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-black'
                        : plan.highlight
                        ? 'bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white shadow-lg shadow-sky-500/25'
                        : isFree
                        ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                        : 'bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>{t('تم تفعيل الباقة بنجاح', 'Plan Activated Successfully')}</span>
                      </>
                    ) : isFree ? (
                      <span>{t('الباقة الحالية المفتوحة', 'Current Active Plan')}</span>
                    ) : (
                      <>
                        <span>{t('اختيار وتفعيل الباقة', 'Select & Activate Plan')}</span>
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-slate-600 dark:text-slate-300">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('بيانات معتمدة وموثقة', 'Certified & Validated Data')}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t(
                'مطابقة لاشتراطات كود البناء السعودي SBC والهيئة العامة للعقار',
                'Compliant with Saudi Building Code (SBC) and Real Estate General Authority'
              )}
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
              <Crown className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{t('دعم فني وهندسي مباشر', 'Direct Engineering Support')}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t(
                'مهندسون استشاريون معتمدون لمراجعة وفحص المخططات والجسات',
                'Certified consulting engineers for borehole and cadastre peer review'
              )}
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('ربط وتكامل API شامل', 'Comprehensive API Integration')}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t(
                'تصدير سلس لبرامج CAD و BIM ونظام تخطيط الموارد ERP',
                'Seamless exports to AutoCAD, Revit BIM, and enterprise ERPs'
              )}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

