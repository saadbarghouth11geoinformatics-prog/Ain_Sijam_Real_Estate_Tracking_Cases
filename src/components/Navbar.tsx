import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Globe, 
  Menu, 
  X, 
  MapPin, 
  ChartNoAxesColumnIncreasing, 
  BriefcaseBusiness, 
  Bot, 
  ReceiptText, 
  Calculator, 
  GitCompareArrows, 
  Layers3, 
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
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
    { id: 'indicators', labelAr: 'مؤشر الأسعار والمتر', labelEn: 'Price Index & Sqm', icon: ChartNoAxesColumnIncreasing, descAr: 'مؤشرات دقيقة لأسعار الصفقات الرسمية', descEn: 'Precise official transaction indices' },
    { id: 'deals', labelAr: 'سجل الصفقات العقارية', labelEn: 'Real Estate Deals', icon: ReceiptText, descAr: 'صفقات وزارة العدل والسجل العقاري المباشرة', descEn: 'Ministry of Justice live registry deals' },
    { id: 'portfolio', labelAr: 'المحفظة العقارية', labelEn: 'Portfolio Tracker', icon: BriefcaseBusiness, descAr: 'إدارة وتتبع أملاكك وعقاراتك بذكاء', descEn: 'Smart tracking of your holdings' },
    { id: 'calculator', labelAr: 'حاسبة التقييم والعوائد', labelEn: 'ROI & Yield Calculator', icon: Calculator, descAr: 'حساب العائد الإيجاري الصافي والأقساط', descEn: 'Calculate net rental yields and financing' },
    { id: 'compare', labelAr: 'مقارنة الأحياء', labelEn: 'District Comparator', icon: GitCompareArrows, descAr: 'مقارنة الأسعار والعوائد بين حيين', descEn: 'Compare prices and yields across 2 districts' },
    { id: 'projects', labelAr: 'إحصائيات المشاريع', labelEn: 'Project Statistics', icon: Layers3, descAr: 'إحصائيات المشاريع الكبرى بالرياض والمملكة', descEn: 'Key statistics on major KSA projects' },
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
            <nav className="hidden lg:flex items-center gap-6 lg:gap-8 h-full">
              
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

              {/* أعمالنا (Our Work) */}
              <button
                onClick={() => handleNavClick('case-studies')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  activeSection === 'case-studies'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'أعمالنا' : 'Our Work'}</span>
                {activeSection === 'case-studies' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-full" />
                )}
              </button>

              {/* شبكات البنية التحتية (Infrastructure Networks) */}
              <button
                onClick={() => handleNavClick('infrastructure-networks')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  activeSection === 'infrastructure-networks'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'الشبكات' : 'Networks'}</span>
                {activeSection === 'infrastructure-networks' && (
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
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'Enter') {
                      setServicesDropdownOpen(true);
                    }
                  }}
                  className={`relative h-full flex items-center gap-1.5 text-sm font-bold transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-lg px-2 py-1 ${
                    isServicesActive || servicesDropdownOpen
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>{isAr ? 'الخدمات' : 'Services'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-250 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  {isServicesActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-full" />
                  )}
                </button>

                {/* Services Flyout Menu - Compact, High-contrast, RTL-aligned */}
                {servicesDropdownOpen && (
                  <div 
                    role="menu"
                    aria-label={isAr ? 'قائمة الخدمات العقارية' : 'Services Menu'}
                    className={`absolute top-[calc(100%+8px)] ${isAr ? 'right-0' : 'left-0'} w-84 sm:w-92 max-h-[min(460px,calc(100vh-100px))] overflow-y-auto overscroll-contain bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:transition-none`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {isAr ? 'خدمات عين سيجام (8 خدمات)' : 'Ain Sijam Services (8)'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                        {isAr ? 'رقمية معتمدة' : 'Official'}
                      </span>
                    </div>

                    {/* Services Items List */}
                    <div className="space-y-1">
                      {servicesList.map((service) => {
                        const Icon = service.icon;
                        const isCurrent = activeSection === service.id;
                        return (
                          <button
                            key={service.id}
                            role="menuitem"
                            onClick={() => handleNavClick(service.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-start transition-all duration-200 cursor-pointer group border ${
                              isCurrent
                                ? 'bg-blue-50/90 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 rtl:border-r-3 ltr:border-l-3 rtl:border-r-blue-600 ltr:border-l-blue-600 shadow-xs'
                                : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-slate-200/60 dark:hover:border-slate-700/60 text-slate-800 dark:text-slate-200'
                            } focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden`}
                          >
                            <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center transition-colors duration-200 ${
                              isCurrent
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-blue-50/90 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60'
                            }`}>
                              <Icon className="w-[18px] h-[18px] stroke-[1.8]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-tight flex items-center justify-between">
                                <span className="truncate">{isAr ? service.labelAr : service.labelEn}</span>
                                {isCurrent && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                )}
                              </div>
                              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-tight mt-0.5 truncate">
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

              {/* منهجية العمل (Work Methodology) */}
              <button
                onClick={() => handleNavClick('methodology')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  activeSection === 'methodology'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'منهجية العمل' : 'Work Methodology'}</span>
                {activeSection === 'methodology' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-full" />
                )}
              </button>

              {/* عن عين سيجام (About Ain Sigam) */}
              <button
                onClick={() => setActiveSection?.('about')}
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
                onClick={() => setActiveSection?.('contact')}
                className={`relative h-full flex items-center text-sm font-bold transition-colors cursor-pointer ${
                  activeSection === 'contact'
                    ? 'text-blue-600 dark:text-blue-400 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
              </button>

            </nav>

            {/* 3. Left side: English and AT Avatar Badge */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              
              {/* Language Switcher: Eng */}
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
                        <a href="mailto:support@ainsigam.sa" className="block text-[10px] text-slate-400 truncate hover:text-blue-500">support@ainsigam.sa</a>
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
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 bg-white dark:bg-slate-900 animate-in slide-in-from-top-2 duration-150">
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
                {isAr ? 'أعمالنا' : 'Our Work'}
              </button>

              <button
                onClick={() => handleNavClick('pricing')}
                className={`p-3 rounded-xl text-start font-bold text-sm ${
                  isPricingActive ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                {isAr ? 'الأسعار' : 'Pricing'}
              </button>

              {/* Mobile Services Accordion */}
              <div className="py-1 px-1">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{isAr ? 'خدمات المنصة (8 خدمات)' : 'Platform Services (8)'}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {mobileServicesOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-1 animate-in fade-in duration-150">
                    {servicesList.map((service) => {
                      const Icon = service.icon;
                      const isCurrent = activeSection === service.id;
                      return (
                        <button
                          key={service.id}
                          onClick={() => handleNavClick(service.id)}
                          className={`flex items-center gap-3 p-2.5 rounded-xl text-start transition-all cursor-pointer border ${
                            isCurrent
                              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 shadow-xs'
                              : 'bg-white dark:bg-slate-800/60 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center ${
                            isCurrent
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-blue-50/90 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          }`}>
                            <Icon className="w-[18px] h-[18px] stroke-[1.8]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                              {isAr ? service.labelAr : service.labelEn}
                            </div>
                            <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-tight mt-0.5 line-clamp-1">
                              {isAr ? service.descAr : service.descEn}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('infrastructure-networks');
                }}
                className={`p-3 rounded-xl text-start font-bold text-sm ${
                  activeSection === 'infrastructure-networks'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {isAr ? 'الشبكات' : 'Networks'}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('methodology');
                }}
                className={`p-3 rounded-xl text-start font-bold text-sm ${
                  activeSection === 'methodology'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {isAr ? 'منهجية العمل' : 'Work Methodology'}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveSection?.('about');
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
                  setActiveSection?.('contact');
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
                  <a href="mailto:support@ainsigam.sa" className="font-mono hover:text-blue-600">support@ainsigam.sa</a>
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
