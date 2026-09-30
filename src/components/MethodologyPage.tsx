import React from 'react';
import { ArrowLeft, CheckCircle2, ClipboardCheck, MapPinned, Route, Satellite } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MethodologyPageProps {
  onNavigate: (pageId: string) => void;
}

const steps = [
  {
    icon: MapPinned,
    ar: 'تحديد نطاق الأصل',
    en: 'Define the asset scope',
    detailAr: 'نربط الموقع بالحدود والبيانات التنظيمية ومصادر الخرائط المعتمدة.',
    detailEn: 'We connect the location to verified boundaries, planning data, and map sources.',
  },
  {
    icon: Satellite,
    ar: 'التحقق الفضائي والميداني',
    en: 'Satellite and field validation',
    detailAr: 'نقارن المشاهدات الزمنية بالتوثيق الميداني لمتابعة التغيرات بوضوح.',
    detailEn: 'We compare time-based imagery with field evidence to track changes clearly.',
  },
  {
    icon: ClipboardCheck,
    ar: 'تحليل قابل للتنفيذ',
    en: 'Actionable analysis',
    detailAr: 'نحوّل البيانات إلى مؤشرات وتقارير مختصرة تدعم القرار دون تعقيد.',
    detailEn: 'We turn data into concise indicators and reports that support decisions.',
  },
];

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate }) => {
  const { t, isAr } = useLanguage();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12" dir={isAr ? 'rtl' : 'ltr'}>
      <section className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-10 sm:px-12 sm:py-14 text-white shadow-2xl shadow-blue-950/15">
        <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-200">
            <Route className="h-4 w-4" />
            {t('منهجية عمل واضحة وقابلة للتتبع', 'A clear, traceable methodology')}
          </div>
          <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
            {t('من التخطيط إلى قرار عقاري أوضح', 'From planning to clearer real-estate decisions')}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {t(
              'نجمع البيانات المكانية، الرصد الفضائي، والتحقق الميداني في مسار واحد مختصر يساعد فرق التطوير والملاك على رؤية حالة الأصل بثقة.',
              'We bring spatial data, satellite monitoring, and field verification into one concise workflow for confident asset decisions.'
            )}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('map')}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <MapPinned className="h-4 w-4" />
            {t('استكشف الخريطة العقارية', 'Explore the real-estate map')}
            <ArrowLeft className={`h-4 w-4 ${isAr ? '' : 'rotate-180'}`} />
          </button>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article key={step.ar} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-cyan-300"><Icon className="h-5 w-5" /></span>
                <span className="text-sm font-black text-slate-300 dark:text-slate-600">0{index + 1}</span>
              </div>
              <h2 className="mt-5 text-lg font-black text-slate-900 dark:text-white">{t(step.ar, step.en)}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{t(step.detailAr, step.detailEn)}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <h2 className="font-black text-slate-900 dark:text-white">{t('ما الذي تحصل عليه؟', 'What you receive')}</h2>
            <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{t('ملخص واضح للحالة، الأدلة المرتبطة بالموقع، وخطوات عملية للمتابعة دون تكرار خدمات إدارة المواقع أو الأساطيل.', 'A clear status summary, location-linked evidence, and practical follow-up steps without duplicating site or fleet management services.')}</p>
          </div>
        </div>
      </section>
    </main>
  );
};
