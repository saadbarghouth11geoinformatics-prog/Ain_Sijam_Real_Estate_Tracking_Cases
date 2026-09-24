import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Globe, 
  Menu, 
  X, 
  MapPin, 
  BarChart3, 
  Briefcase, 
  Bot, 
  Table, 
  Calculator, 
  GitCompare, 
  Layers, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Sun, 
  Moon,
  Sparkles,
  ExternalLink,
  User,
  LogOut
} from 'lucide-react';
import { City } from '../types';
import { Language, ThemeMode, translations } from '../i18n/translations';
import { AinSigamLogo } from './AinSigamLogo';

interface NavbarProps {
  activeSection: string;
  setActiveSection?: (sec: string) => void;
  selectedCity: City | 'الكل';
  setSelectedCity: (city: City | 'الكل') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSubscriber: boolean;
  onOpenSubscriptionModal: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  selectedCity,
  setSelectedCity,
  searchQuery,
  setSearchQuery,
  isSubscriber,
  onOpenSubscriptionModal,
  theme,
  setTheme,
  lang,
  setLang,
}) => {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const isAr = lang === 'ar';

  // Close dropdowns on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
        setAboutModalOpen(false);
        setContactModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (id: string) => {
    if (setActiveSection) {
      setActiveSection(id);
    }
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Paseetah Platform Services List for the "الخدمات ⌵" Dropdown
  const servicesList = [
    { id: 'map', labelAr: 'الخريطة العقارية الحية', labelEn: 'Live Real Estate Map', icon: MapPin, descAr: 'استكشاف قطع الأراضي والصفقات مكانياً', descEn: 'Explore spatial parcels and deals' },
    { id: 'indicators', labelAr: 'مؤشر الأسعار والمتر', labelEn: 'Price Index & Sqm', icon: BarChart3, descAr: 'مؤشرات دقيقة لأسعار الصفقات الرسمية', descEn: 'Precise official transaction indices' },
    { id: 'deals', labelAr: 'سجل الصفقات العقارية', labelEn: 'Real Estate Deals', icon: Table, descAr: 'صفقات وزارة العدل والسجل العقاري المباشرة', descEn: 'Ministry of Justice live registry deals' },
    { id: 'portfolio', labelAr: 'المحفظة العقارية', labelEn: 'Portfolio Tracker', icon: Briefcase, descAr: 'إدارة وتتبع أملاكك وعقاراتك بذكاء', descEn: 'Smart tracking of your holdings' },
    { id: 'calculator', labelAr: 'حاسبة التقييم والعوائد', labelEn: 'ROI & Yield Calculator', icon: Calculator, descAr: 'حساب العائد الإيجاري الصافي والأقساط', descEn: 'Calculate net rental yields and financing' },
    { id: 'compare', labelAr: 'مقارنة الأحياء', labelEn: 'District Comparator', icon: GitCompare, descAr: 'مقارنة الأسعار والعوائد بين حيين', descEn: 'Compare prices and yields across 2 districts' },
    { id: 'projects', labelAr: 'إحصائيات المشاريع', labelEn: 'Project Statistics', icon: Layers, descAr: 'إحصائيات المشاريع الكبرى بالرياض والمملكة', descEn: 'Key statistics on major KSA projects' },
    { id: 'advisor', labelAr: 'المستشار الذكي سيجام AI', labelEn: 'Sigam AI Advisor', icon: Bot, descAr: 'استشارات وتحليلات فورية مدعومة بالبيانات', descEn: 'Instant AI advisory backed by data' },
  ];

  const isServicesActive = servicesList.some(s => s.id === activeSection);
  const isHomeActive = activeSection === 'home' || activeSection === 'hero' || !activeSection;
  const isPricingActive = activeSection === 'pricing';

  return (
    <>
      <header 
        className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xs transition-colors"
        dir={isAr ? 'rtl' : 'ltr'}
        id="sigam-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* 1. Right side: Authentic Ain Sigam Logo (عين سيجام) */}
            <div 
              onClick={() => handleNavClick('home')}
              className="cursor-pointer select-none group shrink-0 flex items-center"
              role="button"
              tabIndex={0}
              title={isAr ? 'منصة عين سيجام لتخطيط الأراضي والذكاء العقاري' : 'Ain Sigam Real Estate & Spatial Platform'}
            >
              <AinSigamLogo size="md" variant="horizontal" />
            </div>

            {/* 2. Middle Navigation Links (Exactly as in the reference image) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
              
              {/* الرئيسية (Home) with blue underline when active */}
              <button
                onClick={() => handleNavClick('home')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  isHomeActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'الرئيسية' : 'Home'}</span>
                {isHomeActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-full" />
                )}
              </button>

              {/* سابقة الأعمال (Case Studies) */}
              <button
                onClick={() => handleNavClick('case-studies')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  activeSection === 'case-studies'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'سابقة الأعمال' : 'Case Studies'}</span>
                {activeSection === 'case-studies' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-full" />
                )}
              </button>

              {/* الأسعار (Pricing) */}
              <button
                onClick={() => handleNavClick('pricing')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  isPricingActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'الأسعار' : 'Pricing'}</span>
                {isPricingActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-full" />
                )}
              </button>

              {/* الخدمات ⌵ (Services with dropdown) */}
              <div className="relative h-full flex items-center" ref={servicesDropdownRef}>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`relative h-full flex items-center gap-1 text-sm font-bold transition-colors cursor-pointer ${
                    isServicesActive || servicesDropdownOpen
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>{isAr ? 'الخدمات' : 'Services'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  {isServicesActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-full" />
                  )}
                </button>

                {/* Services Flyout Menu */}
                {servicesDropdownOpen && (
                  <div className="absolute top-[80%] right-0 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                      {isAr ? 'خدمات وحلول عين سيجام' : 'Ain Sigam Platform Services'}
                    </div>
                    <div className="space-y-1">
                      {servicesList.map((service) => {
                        const Icon = service.icon;
                        const isCurrent = activeSection === service.id;
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleNavClick(service.id)}
                            className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-start transition-colors cursor-pointer group ${
                              isCurrent
                                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                              isCurrent
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold leading-tight">
                                {isAr ? service.labelAr : service.labelEn}
                              </div>
                              <p className="text-[10px] text-slate-400 leading-tight mt-0.5 truncate">
                                {isAr ? service.descAr : service.descEn}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* عن عين سيجام (About Ain Sigam) */}
              <button
                onClick={() => setActiveSection('about')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  activeSection === 'about'
                    ? 'text-blue-600 dark:text-blue-400 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'عن عين سيجام' : 'About'}</span>
              </button>

              {/* تواصل معنا (Contact Us) */}
              <button
                onClick={() => setActiveSection('contact')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  activeSection === 'contact'
                    ? 'text-blue-600 dark:text-blue-400 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
              </button>

            </nav>

            {/* 3. Left side: Eng 🌐 and AT Avatar Badge */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              
              {/* Language Switcher: Eng 🌐 */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
                title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
              >
                <span>{isAr ? 'Eng' : 'عربي'}</span>
                <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>

              {/* User Avatar Badge: [AT] inside royal blue & white theme */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center cursor-pointer transition-all hover:ring-2 hover:ring-blue-300 group"
                  title="حساب المستخدم / Ahmed Tamam"
                  aria-label="User Account"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    AT
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute top-full mt-2 left-0 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-3 z-50 animate-in fade-in duration-100">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                        AT
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Ahmed Tamam</div>
                        <div className="text-[10px] text-slate-400 truncate">ahmed.tamam.cairo48@gmail.com</div>
                      </div>
                    </div>

                    <div className="py-2 space-y-1">
                      <div className="flex items-center justify-between px-2 py-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <span>{isAr ? 'حالة الحساب' : 'Account Status'}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {isSubscriber ? (isAr ? 'باقة المستثمر' : 'Investor') : (isAr ? 'مجاني نشط' : 'Free Active')}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenSubscriptionModal();
                        }}
                        className="w-full text-start px-2 py-1.5 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>{isAr ? 'ترقية / باقات الاشتراك' : 'Upgrade Plans'}</span>
                      </button>

                      <button
                        onClick={toggleTheme}
                        className="w-full text-start px-2 py-1.5 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5">
                          {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-500" />}
                          <span>{theme === 'dark' ? (isAr ? 'الوضع النهاري' : 'Light Mode') : (isAr ? 'الوضع الليلي' : 'Dark Mode')}</span>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 bg-white dark:bg-slate-900 animate-in slide-in-from-top-2 duration-150">
              <button
                onClick={() => handleNavClick('home')}
                className={`p-3 rounded-xl text-start font-bold text-sm ${
                  isHomeActive ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                {isAr ? 'الرئيسية' : 'Home'}
              </button>

              <button
                onClick={() => handleNavClick('case-studies')}
                className={`p-3 rounded-xl text-start font-bold text-sm ${
                  activeSection === 'case-studies' ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                {isAr ? 'سابقة الأعمال' : 'Case Studies'}
              </button>

              <button
                onClick={() => handleNavClick('pricing')}
                className={`p-3 rounded-xl text-start font-bold text-sm ${
                  isPricingActive ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                {isAr ? 'الأسعار' : 'Pricing'}
              </button>

              <div className="py-2 px-3">
                <div className="text-xs font-bold text-slate-400 mb-2">{isAr ? 'الخدمات:' : 'Services:'}</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {servicesList.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleNavClick(service.id)}
                      className={`p-2 rounded-lg text-start text-xs font-semibold ${
                        activeSection === service.id ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isAr ? service.labelAr : service.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveSection('about');
                }}
                className={`p-3 rounded-xl text-start font-bold text-sm ${
                  activeSection === 'about'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {isAr ? 'عن عين سيجام' : 'About Ain Sigam'}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveSection('contact');
                }}
                className={`p-3 rounded-xl text-start font-bold text-sm ${
                  activeSection === 'contact'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {isAr ? 'تواصل معنا' : 'Contact Us'}
              </button>
            </div>
          )}

        </div>
      </header>

      {/* About Ain Sigam Modal (عن عين سيجام) */}
      {aboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 space-y-5" dir={isAr ? 'rtl' : 'ltr'}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <AinSigamLogo size="md" variant="horizontal" />
              <button
                onClick={() => setAboutModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? 'منظومة عين سيجام لتخطيط الأراضي والذكاء العقاري' : 'Ain Sigam Real Estate & Spatial Intelligence'}
              </h3>
              <p>
                {isAr 
                  ? 'منصة «عين سيجام» هي المنظومة السعودية المتقدمة لفحص وتخطيط الأراضي، تحليل الصفقات العقارية، واستقراء حركة الأسعار والمتر المربع بدقة مكانية وهندسية استثنائية.' 
                  : 'Ain Sigam is the advanced Saudi spatial intelligence and real estate platform for land suitability, cadastral zoning, and verified transactions.'}
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{isAr ? 'بيانات معتمدة من وزارة العدل والهيئة العامة للعقار والسجل العقاري' : 'Verified data from MOJ, REGA, and the National Real Estate Registry'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{isAr ? 'تحليلات مكانية دقيقة للأراضي والمشاريع الإنشائية والتطويرية' : 'Spatial zoning and master planning analytics'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAboutModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* Contact Us Modal (تواصل معنا) */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 space-y-5" dir={isAr ? 'rtl' : 'ltr'}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {isAr ? 'تواصل مع فريق عين سيجام' : 'Contact Ain Sigam Team'}
                </h3>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-mono">ahmed.tamam.cairo48@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="font-mono">+966 800 124 0000</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'رسالتك أو استفسارك:' : 'Your message or inquiry:'}
                </label>
                <textarea
                  rows={3}
                  placeholder={isAr ? 'اكتب استفسارك الهندسي والعقاري أو طلب الشراكة...' : 'Write your inquiry...'}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                onClick={() => {
                  alert(isAr ? 'شكراً لتواصلك! تم استلام رسالتك وسيتواصل معك فريق عين سيجام.' : 'Thank you! Your message has been received.');
                  setContactModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                {isAr ? 'إرسال الرسالة' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
