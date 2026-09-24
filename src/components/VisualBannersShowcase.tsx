import React, { useState } from 'react';
import { 
  Eye, 
  MapPin, 
  Layers, 
  Compass, 
  Building2, 
  HardHat, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  X
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

interface VisualBannersShowcaseProps {
  onNavigate: (sectionId: string) => void;
}

export const VisualBannersShowcase: React.FC<VisualBannersShowcaseProps> = ({ onNavigate }) => {
  const { t, isAr } = useLanguage();
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const bannerCards = [
    {
      id: 'urban-planning',
      routeId: 'map',
      image: '/images/drive-banners/drive_banner_01.png',
      badgeAr: 'رصد فضائي وجيوديسي',
      badgeEn: 'Spatial & Geodetic Feed',
      badgeColor: 'from-emerald-500 to-teal-500',
      titleAr: 'تخطيط الأراضي وشبكة الأحياء الحضرية',
      titleEn: 'Urban Land Planning & Parcel Grid',
      descAr: 'تحليل طبوغرافي عالي الدقة لأفق العاصمة والمخططات السكنية، يربط كل قطعة أرض بالشبكة الجيوديسية الوطنية ومؤشرات الصفقات المعتمدة.',
      descEn: 'High-resolution topographic analysis of Riyadh skyline and zoned subdivisions, linking every parcel to national geodetic coordinates and verified MOJ deals.',
      stats: [
        { labelAr: 'دقة الرصد', labelEn: 'Precision', val: '0.05m' },
        { labelAr: 'صفقات موثقة', labelEn: 'Verified Deeds', val: '4.2M+' },
        { labelAr: 'أحياء مغطاة', labelEn: 'Districts', val: '1,400+' }
      ],
      actionLabelAr: 'استكشف الخريطة العقارية',
      actionLabelEn: 'Explore Spatial Map'
    },
    {
      id: 'cad-reality',
      routeId: 'digital-twin-360',
      image: '/images/drive-banners/drive_banner_02.png',
      badgeAr: 'التوأمة ومطابقة CAD',
      badgeEn: 'CAD Digital Twin Alignment',
      badgeColor: 'from-blue-600 to-sky-500',
      titleAr: 'التوأمة الرقمية ومطابقة المخطط الهندسي بالواقع',
      titleEn: 'Digital Twin & CAD vs Reality Blueprints',
      descAr: 'إسقاط مباشر لمخططات الأوتوكاد (CAD/DWG) والارتدادات التنظيمية فوق صور الأقمار الصناعية لكشف أي انحرافات مساحية بدقة السنتيمتر.',
      descEn: 'Direct CAD/DWG overlay onto rectified high-res satellite tiles, detecting boundary shifts and setback non-compliance with sub-2cm precision.',
      stats: [
        { labelAr: 'مطابقة خط التنظيم', labelEn: 'Alignment', val: '±1.8 cm' },
        { labelAr: 'كشف الانحرافات', labelEn: 'Clash Avoidance', val: '99.9%' },
        { labelAr: 'صيغ مدعومة', labelEn: 'Formats', val: 'CAD/BIM/GIS' }
      ],
      actionLabelAr: 'فحص التوأمة ومطابقة CAD',
      actionLabelEn: 'Launch Digital Twin'
    },
    {
      id: 'skyline-growth',
      routeId: 'indicators',
      image: '/images/drive-banners/drive_banner_03.png',
      badgeAr: 'الأفق المعماري والأسعار',
      badgeEn: 'Skyline & Price Indices',
      badgeColor: 'from-amber-500 to-yellow-600',
      titleAr: 'استقراء الأفق العمراني ومؤشرات أسعار المتر',
      titleEn: 'Skyline Architecture & Meter Price Index',
      descAr: 'متابعة حركة نمو الأبراج والمراكز المالية، قياس متوسط سعر المتر التجاري والسكني تاريخياً ولحظياً، واستشراف عوائد التطوير حتى 2030.',
      descEn: 'Tracking vertical skyline evolution, commercial vs residential price per square meter, and forecasting future development yields towards Vision 2030.',
      stats: [
        { labelAr: 'مؤشر النمو السنوي', labelEn: 'Annual Growth', val: '+18.4%' },
        { labelAr: 'صفقات الأبراج', labelEn: 'High-Rise Deeds', val: '12,400' },
        { labelAr: 'تحديث الأسعار', labelEn: 'Index Feed', val: 'لحظي 24/7' }
      ],
      actionLabelAr: 'استعراض مؤشر الأسعار',
      actionLabelEn: 'View Price Index'
    },
    {
      id: 'site-intelligence',
      routeId: 'equipment-fleet',
      image: '/images/drive-banners/drive_banner_04.png',
      badgeAr: 'مراقبة الميدان والمعدات',
      badgeEn: 'Live Site & Fleet Radar',
      badgeColor: 'from-cyan-500 to-blue-600',
      titleAr: 'إدارة المواقع الإنشائية وأسطول المعدات الحية',
      titleEn: 'Construction Fleet & Live Site Surveillance',
      descAr: 'رقابة فضائية وميدانية مستمرة للمعدات الإنشائية ونسب الإنجاز، مع فحص سلامة التربة والجسات ومطابقتها مع كود البناء السعودي SBC 303.',
      descEn: 'Continuous multispectral surveillance of heavy machinery and completion milestones, integrated with geotechnical SBC 303 soil bearing validation.',
      stats: [
        { labelAr: 'معدات متصلة بالـ GPS', labelEn: 'Tracked Fleet', val: '3,850+' },
        { labelAr: 'مواقع تحت المراقبة', labelEn: 'Active Sites', val: '24 موقع' },
        { labelAr: 'توافق كود SBC', labelEn: 'SBC 303 Code', val: '100% معتمد' }
      ],
      actionLabelAr: 'إدارة أسطول المواقع الميدانية',
      actionLabelEn: 'Manage Field Fleet'
    }
  ];

  return (
    <div className="space-y-8 py-4" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Section Header with Fade-In */}
      <ScrollReveal direction="up" delayMs={50}>
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('المعرض البصري للذكاء المكاني', 'Spatial Intelligence Visual Showcase')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-['Cairo'] tracking-tight">
            {t(
              'أبعاد الرصد المتكاملة: من الفضاء إلى واقع الميدان',
              'Integrated Surveillance: From Orbital View to Ground Truth'
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              'صور فائقة الدقة التقطت لمنظومة عين سيجام توضح دمج رصد الأقمار الصناعية، المخططات الهندسية، ومتابعة المشاريع الكبرى بالمملكة.',
              'Ultra high-resolution imagery capturing Ain Sijam spatial fusion: satellite observations, CAD blueprints, and live construction surveillance.'
            )}
          </p>
        </div>
      </ScrollReveal>

      {/* 4 Banners Responsive 2x2 Showcase with Scroll Reveal on Each Item */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {bannerCards.map((card, idx) => (
          <ScrollReveal 
            key={card.id} 
            direction={idx % 2 === 0 ? 'left' : 'right'} 
            delayMs={100 * (idx + 1)}
            className="h-full"
          >
            <div 
              onMouseEnter={() => setActiveCardIndex(idx)}
              onMouseLeave={() => setActiveCardIndex(null)}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-blue-500/60 flex flex-col justify-end min-h-[380px] sm:min-h-[440px]"
            >
              
              {/* Background Image Container with Smooth Scale Effect on Hover */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={isAr ? card.titleAr : card.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Visual Depth Gradient: keeps the image completely clear while ensuring high contrast for transparent text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent transition-opacity duration-300 group-hover:via-slate-950/55" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Top Bar inside image: Badge + Fullscreen expand button */}
              <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between pointer-events-auto">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${card.badgeColor} shadow-md backdrop-blur-md`}>
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>{isAr ? card.badgeAr : card.badgeEn}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalImage(card.image);
                  }}
                  title={t('عرض الصورة كاملة بدقة فائقة', 'View Fullscreen in HD')}
                  className="w-9 h-9 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-white/90 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer shadow-md"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Spacer */}
              <div className="flex-1 min-h-[80px]" />

              {/* Bottom Transparent Glassmorphic Explanatory Box (نص توضيحي شفاف أنيق) */}
              <div className="relative z-10 m-3 sm:m-5 p-4 sm:p-5 rounded-2xl bg-slate-950/80 hover:bg-slate-950/90 backdrop-blur-xl border border-white/15 transition-all duration-300 shadow-2xl space-y-3.5">
                
                {/* Title */}
                <div>
                  <h3 className="text-base sm:text-xl font-black text-white font-['Cairo'] tracking-tight group-hover:text-sky-300 transition-colors">
                    {isAr ? card.titleAr : card.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed mt-1 line-clamp-2 sm:line-clamp-none font-medium">
                    {isAr ? card.descAr : card.descEn}
                  </p>
                </div>

                {/* Micro Stats Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                  {card.stats.map((st, sIdx) => (
                    <div key={sIdx} className="text-center p-1.5 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-300 font-medium">
                        {isAr ? st.labelAr : st.labelEn}
                      </div>
                      <div className="text-xs sm:text-sm font-black font-mono text-sky-300 mt-0.5">
                        {st.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Action Navigation Button */}
                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(card.routeId)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.01]"
                  >
                    <span>{isAr ? card.actionLabelAr : card.actionLabelEn}</span>
                    {isAr ? <ArrowLeft className="w-4 h-4 rtl:inline ltr:hidden" /> : <ArrowRight className="w-4 h-4 ltr:inline rtl:hidden" />}
                  </button>
                </div>

              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Fullscreen HD Image Lightbox Modal */}
      {activeModalImage && (
        <div 
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-6xl w-full max-h-[90vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 cursor-default"
          >
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeModalImage}
              alt="HD Fullscreen Preview"
              className="w-full h-auto max-h-[85vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default VisualBannersShowcase;
