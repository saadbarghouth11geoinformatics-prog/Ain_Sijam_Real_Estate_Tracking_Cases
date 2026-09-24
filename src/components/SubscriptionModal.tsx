import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Crown, 
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { sigamSubscriptionPlans } from '../data/sigamData';
import { SubscriptionPlan } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasonText?: string;
  customReason?: string;
  isSubscriber?: boolean;
  onActivateSubscription?: (planId: string) => void;
  onSelectPlan?: (planId: string) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  reasonText,
  customReason,
  isSubscriber = false,
  onActivateSubscription,
  onSelectPlan,
}) => {
  const { t, isAr } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('engineering_office');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const displayReason = reasonText || customReason;

  const handleSelectAndActivate = (planId: string) => {
    if (onActivateSubscription) onActivateSubscription(planId);
    if (onSelectPlan) onSelectPlan(planId);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 1200);
  };

  const planEnglishDetails: Record<string, { tagline: string; features: string[] }> = {
    independent_surveyor: {
      tagline: 'Tailored for consulting engineers, surveyors & solo developers',
      features: [
        '50 private parcels/month by deed or GPS coordinates',
        'Download certified geotechnical & soil borehole PDF reports',
        'Export engineering cadastre to CAD (DWG) & Vector layers',
        'Track fleet counts & equipment telematics on 2 custom job sites',
      ]
    },
    engineering_office: {
      tagline: 'For certified engineering firms, general contractors & developers',
      features: [
        'Unlimited private land parcel audits, setbacks & FAR ratios',
        'Unlimited export of borehole tests, CAD files & BIM models',
        'Fleet & IoT machinery telematics tracking for up to 10 job sites',
        'Monthly temporal delta analyzing actual vs. planned progress',
      ]
    },
    enterprise_developer: {
      tagline: 'For sovereign funds, master developers & giga-projects',
      features: [
        'Kingdom-wide coverage for raw master plans & giga-projects',
        'Topographic, hydrological flood & geotechnical master analysis',
        'Centralized operations center monitoring thousands of machines',
        'Certified engineering audit dossiers for institutional funds',
      ]
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-800 dark:text-slate-100 transition-colors"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Success Alert Toast */}
        {showSuccessToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>{t('تم تفعيل الاشتراك بنجاح! تم فتح كافة الميزات والتحميلات والمواقع الخاصة.', 'Subscription activated! All private deeds and downloads are unlocked.')}</span>
          </div>
        )}

        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-6 border-b border-sky-100 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {t('بوابة اشتراك وترخيص منصة عين سيجام الهندسية', 'SIGAM Eye Engineering Subscription & Licensing Portal')}
                  </h3>
                  <span className="bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                    {t('ترقية الحساب', 'Account Upgrade')}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {t(
                    'الوصول الكامل لفحص الأراضي الخاصة، تقارير الجسات والتربة، وتتبع معدات المشاريع',
                    'Full access to private deed auditing, geotechnical borehole dossiers & live fleet telematics'
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Reason Banner if triggered by a locked action */}
          {displayReason && (
            <div className="mt-4 p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>{displayReason}</span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-1 text-xs font-bold shadow-inner">
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t('اشتراك سنوي', 'Annual Billing')}</span>
                <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-md">
                  {t('خصم 20%', 'Save 20%')}
                </span>
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t('اشتراك شهري', 'Monthly Billing')}</span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sigamSubscriptionPlans.filter(p => p.id !== 'free_demo').map((plan: SubscriptionPlan) => {
              const isSelected = selectedPlanId === plan.id;
              const price = billingCycle === 'annual' ? plan.annualPriceSAR : plan.monthlyPriceSAR;
              const perMonth = billingCycle === 'annual' ? Math.round(plan.annualPriceSAR / 12) : plan.monthlyPriceSAR;
              const enInfo = planEnglishDetails[plan.id];

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative cursor-pointer rounded-2xl p-5 transition-all border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800/90 border-sky-400 dark:border-sky-500 shadow-xl shadow-sky-500/10 ring-2 ring-sky-400/30'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 hover:border-sky-300'
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-3 ${isAr ? 'right-4' : 'left-4'} bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm`}>
                      {isAr ? plan.badge : (plan.id === 'engineering_office' ? 'MOST POPULAR' : 'BEST VALUE')}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {isAr ? plan.nameAr : plan.nameEn}
                      </h4>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 min-h-[32px]">
                      {isAr ? plan.tagline : (enInfo?.tagline || plan.tagline)}
                    </p>

                    <div className="mb-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{price.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {t('ريال', 'SAR')} / {billingCycle === 'annual' ? t('سنة', 'yr') : t('شهر', 'mo')}
                        </span>
                      </div>
                      {billingCycle === 'annual' && (
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 font-mono">
                          {t(
                            `يعادل ${perMonth.toLocaleString()} ر.س شهرياً فقط`,
                            `Approx. ${perMonth.toLocaleString()} SAR/month`
                          )}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      {(isAr ? plan.features.slice(0, 4) : (enInfo?.features || plan.features.slice(0, 4))).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAndActivate(plan.id);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white hover:from-sky-600 hover:to-emerald-600 shadow-md shadow-sky-500/20'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    <span>{t('تفعيل هذا الاشتراك', 'Activate This Plan')}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick Instant Demo Access */}
          <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/50 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('معاينة تجريبية فورية لحساب المطورين', 'Instant Developer Demo Preview')}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    'يمكنك تفعيل الوضع الكامل مجاناً لتجربة كافة أدوات التحميل وفحص الأراضي الخاصة الآن',
                    'Activate instant full evaluation mode to test private parcel tests & PDF downloads right now'
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleSelectAndActivate('engineering_office')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold text-xs hover:from-sky-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 shrink-0 shadow-md shadow-sky-500/20"
            >
              <span>{isSubscriber ? t('تأكيد الحساب المفعل', 'Confirm Active Plan') : t('تفعيل المعاينة الكاملة فوراً', 'Activate Full Preview Now')}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>{t('المدفوعات آمنة ومشفرة', 'Secure & Encrypted Transactions')}</span>
            <span>•</span>
            <span>{t('فواتير ضريبية معتمدة من هيئة الزكاة والضريبة والجمارك (ZATCA)', 'Certified ZATCA Tax Invoices')}</span>
            <span>•</span>
            <span>{t('معتمد ومتوافق مع كود البناء السعودي SBC والهيئة العامة للعقار', 'Compliant with Saudi Building Code & REGA')}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-semibold"
          >
            {t('إغلاق', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};

