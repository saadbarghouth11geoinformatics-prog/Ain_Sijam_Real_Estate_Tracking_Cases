import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Crown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PAGES_DATA } from '../data/pagesData';
import { AinSigamLogo } from './AinSigamLogo';

interface FooterProps {
  onOpenPricing?: () => void;
  onNavigate?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPricing, onNavigate }) => {
  const { t, isAr } = useLanguage();

  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 text-xs border-t border-blue-100 dark:border-slate-800 transition-colors" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand (Authentic Ain Sigam Logo) */}
          <div className="space-y-4 md:col-span-1">
            <AinSigamLogo size="lg" variant="horizontal" />
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs">
              {t(
                'منصة عين سيجام الهندسية والعقارية الذكية لمتابعة أسعار الأراضي والمتر المربع، فحص صلاحية الأراضي للبناء، استعراض صفقات وزارة العدل والسجل العقاري، وإدارة المحافظ والمشاريع بدقة متناهية.',
                'The leading Saudi spatial intelligence platform for land suitability, market transactions, price per sqm tracking, and real estate portfolio management.'
              )}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-blue-600 dark:text-blue-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('معتمدة وفق بيانات وزارة العدل والهيئة العامة للعقار والسجل العقاري', 'Verified with MOJ, REGA, and the National Real Estate Registry')}</span>
            </div>
          </div>

          {/* Col 2: Navigation Anchors */}
          <div className="space-y-3">
            <h4 className="text-blue-950 dark:text-white font-bold text-sm">
              {t('أدوات المنصة المباشرة', 'Platform Quick Tools')}
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'home')} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer text-start"
                >
                  <span>{t('الرئيسية ومحرك البحث', 'Home & Search')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'indicators')} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer text-start"
                >
                  <span>{t('مؤشر الأسعار والمتر المربع', 'Price Index & Meter Trend')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'deals')} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer text-start"
                >
                  <span>{t('جدول الصفقات الحية المفرغة', 'Live Deals & Executions')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'calculator')} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer text-start"
                >
                  <span>{t('حاسبة التقييم والعوائد والتمويل', 'Valuation & Yield Calculator')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'compare')} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer text-start"
                >
                  <span>{t('مقارنة الأحياء جنباً إلى جنب', 'Side-by-Side District Comparator')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'advisor')} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer text-start"
                >
                  <span>{t('المستشار العقاري الذكي «عين سيجام AI»', 'Ain Sigam AI Spatial Advisor')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'about')} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer text-start font-bold text-slate-700 dark:text-slate-300"
                >
                  <span>{t('عن منظومة عين سيجام والركائز الثلاث', 'About Ain Sijam & The 3 Pillars')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'contact')} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer text-start font-bold text-slate-700 dark:text-slate-300"
                >
                  <span>{t('تواصل معنا وحجز جلسة استعراض حي', 'Contact Us & Book Live Demo')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Sources */}
          <div className="space-y-3">
            <h4 className="text-blue-950 dark:text-white font-bold text-sm">
              {t('المراجع والمصادر الرسمية', 'Official Standards & References')}
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>• {t('وزارة العدل (البورصة والصفقات العقارية)', 'Ministry of Justice (Real Estate Market)')}</li>
              <li>• {t('السجل العقاري السعودي (السجل العيني)', 'Saudi Real Estate Registry')}</li>
              <li>• {t('الهيئة العامة للعقار (REGA)', 'Real Estate General Authority')}</li>
              <li>• {t('منصة بلدي وكود البناء السعودي (SBC)', 'Balady Platform & Saudi Building Code')}</li>
              <li>• {t('الهيئة الملكية لمدينة الرياض (RCRC)', 'Royal Commission for Riyadh City')}</li>
            </ul>
          </div>

          {/* Col 4: Contact & Subscription (Blue & White) */}
          <div className="space-y-3">
            <h4 className="text-blue-950 dark:text-white font-bold text-sm">
              {t('تواصل مع فريق عين سيجام', 'Contact Ain Sigam Team')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-mono">support@ainsigam.sa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-mono" dir="ltr">+966 11 480 8800</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{t('طريق الملك فهد، الرياض، المملكة العربية السعودية', 'King Fahd Road, Riyadh, Saudi Arabia')}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPricing}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/25 cursor-pointer"
              >
                <Crown className="w-4 h-4 text-white" />
                <span>{t('ترقية حساب المستثمر والمطور', 'Upgrade to Investor Tier')}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-blue-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © 2026 {t('عين سيجام (Ain Sigam). كافة الحقوق محفوظة لمنظومة تخطيط الأراضي والبيانات العقارية بالمملكة العربية السعودية.', 'Ain Sigam. All rights reserved for Saudi Spatial & Real Estate Intelligence Platform.')}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">{t('رصد فوري لصفقات السوق العقاري والأراضي', 'Live Real Estate & Land Deals Tracking')}</span>
            <span>•</span>
            <span>MOJ & REGA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
