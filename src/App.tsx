/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { StickySubNavBar } from './components/StickySubNavBar';
import { PageHeaderBanner } from './components/PageHeaderBanner';
import { PagesDirectoryGrid } from './components/PagesDirectoryGrid';
import { BaseetaHero } from './components/BaseetaHero';
import { BaseetaCleanHome } from './components/BaseetaCleanHome';
import { BaseetaPortfolio } from './components/BaseetaPortfolio';
import { BaseetaPriceIndex } from './components/BaseetaPriceIndex';
import { BaseetaDealsTable } from './components/BaseetaDealsTable';
import { BaseetaCalculator } from './components/BaseetaCalculator';
import { BaseetaDistrictComparator } from './components/BaseetaDistrictComparator';
import { BaseetaAdvisorPaseet } from './components/BaseetaAdvisorPaseet';
import { SaudiInteractiveKingdomMap } from './components/SaudiInteractiveKingdomMap';
import { ProjectStatistics } from './components/ProjectStatistics';
import { PricingSection } from './components/PricingSection';
import { MegaProjectsMap } from './components/MegaProjectsMap';
import { DigitalTwin360Section } from './components/DigitalTwin360Section';
import { UrbanEvolutionSection } from './components/UrbanEvolutionSection';
import { LandSuitabilitySection } from './components/LandSuitabilitySection';
import { ConstructionSiteManager } from './components/ConstructionSiteManager';
import { InfrastructureNetworks } from './components/InfrastructureNetworks';
import { SigamEngineeringAdvisor } from './components/SigamEngineeringAdvisor';
import { AboutAinSigamPage } from './components/AboutAinSigamPage';
import { ContactUsPage } from './components/ContactUsPage';
import { CaseStudiesPage } from './components/case-studies/CaseStudiesPage';
import { SubscriptionModal } from './components/SubscriptionModal';
import { Footer } from './components/Footer';

import { PAGES_DATA, PageInfo } from './data/pagesData';
import { City } from './types';
import { Language, ThemeMode } from './i18n/translations';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { lang, setLang, theme, setTheme, t, isAr } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<City | 'الكل'>('الرياض');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Navigation & Multi-page routing state
  const [currentPageId, setCurrentPageId] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\//, '');
    const hash = window.location.hash.replace('#', '');
    if (path === 'case-studies') {
      return 'case-studies';
    }
    if (PAGES_DATA.some(p => p.id === path)) {
      return path;
    }
    if (hash && (hash === 'case-studies' || PAGES_DATA.some(p => p.id === hash))) {
      return hash;
    }
    return 'home';
  });

  // View Mode: 'pages' (each title opens a dedicated page) vs 'continuous' (all-in-one scroll)
  const [viewMode, setViewMode] = useState<'pages' | 'continuous'>('pages');

  // Subscription & Paywall state
  const [isSubscriber, setIsSubscriber] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [subscriptionReason, setSubscriptionReason] = useState<string>('');

  // Engineering advisor incoming prompt
  const [advisorInitialPrompt, setAdvisorInitialPrompt] = useState<string>('');

  // Handle URL hash changes and in-page anchor scrolling
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\//, '');
      const hash = window.location.hash.replace('#', '');
      
      let target: string | null = null;
      if (path === 'case-studies') {
        target = 'case-studies';
      } else if (PAGES_DATA.some(p => p.id === path)) {
        target = path;
      } else if (hash && (hash === 'case-studies' || PAGES_DATA.some(p => p.id === hash))) {
        target = hash;
      }

      if (target) {
        setCurrentPageId(target);
        if (hash) {
          setTimeout(() => {
            const anchor = document.getElementById(hash);
            if (anchor) {
              anchor.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (!hash || hash === 'home' || hash === 'hero') {
        setCurrentPageId('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    
    // Check initial hash on load
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Main Page Navigation Handler - cleanly updates route and hash
  const handleNavigate = useCallback((pageId: string) => {
    const targetId = (pageId === 'hero' || pageId === 'home') ? 'home' : pageId;
    setCurrentPageId(targetId);

    // Update window path or hash cleanly without corrupting the path
    if (targetId === 'case-studies') {
      if (window.location.pathname !== '/case-studies') {
        window.history.pushState(null, '', '/case-studies');
      }
    } else {
      const newUrl = `/#${targetId}`;
      if (window.location.pathname !== '/' || window.location.hash !== `#${targetId}`) {
        window.history.pushState(null, '', newUrl);
      }
    }

    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleRequestSubscription = (reasonText: string) => {
    setSubscriptionReason(reasonText);
    setIsSubscriptionModalOpen(true);
  };

  const handleActivateSubscription = (planId: string) => {
    setIsSubscriber(true);
  };

  const handleConsultEngineering = (topic: string) => {
    setAdvisorInitialPrompt(topic);
    handleNavigate('advisor');
  };

  const handleToggleViewMode = () => {
    setViewMode(prev => prev === 'pages' ? 'continuous' : 'pages');
  };

  // Resolve current active Page object
  const currentPageInfo: PageInfo = PAGES_DATA.find(p => p.id === currentPageId) || PAGES_DATA[0];

  return (
    <div 
      className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white font-['Cairo'] antialiased transition-colors" 
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Main Navigation Bar (Baseeta Inspired) */}
      <Navbar
        activeSection={currentPageId}
        setActiveSection={handleNavigate}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSubscriber={isSubscriber}
        onOpenSubscriptionModal={() => {
          setSubscriptionReason(
            isAr
              ? 'ترقية حسابك يتيح لك فحص صكوك الأراضي، تتبع المحفظة العقارية بدون قيود، والوصول الفوري لكافة مؤشرات وزارة العدل.'
              : 'Upgrading unlocks full portfolio tracking, deed audits, and instant access to all Ministry of Justice price metrics.'
          );
          setIsSubscriptionModalOpen(true);
        }}
        theme={theme}
        setTheme={setTheme}
        lang={lang}
        setLang={setLang}
      />

      {/* Persistent Sticky Sub-Nav Bar (shown on subpages and continuous mode for clean Paseetah home) */}
      {(currentPageId !== 'home' || viewMode === 'continuous') && (
        <StickySubNavBar
          activeSection={currentPageId}
          onNavigate={handleNavigate}
          lang={lang}
          viewMode={viewMode}
          onToggleViewMode={handleToggleViewMode}
        />
      )}

      {/* RENDER MODE 1: DEDICATED INDIVIDUAL PAGES */}
      {viewMode === 'pages' ? (
        <main className="flex-1 w-full">
          
          {/* 1. HOME DASHBOARD PAGE (Clean, lightweight Paseetah Methodology) */}
          {currentPageId === 'home' && (
            <BaseetaCleanHome 
              onNavigate={handleNavigate}
              onSearchSelectDistrict={(district) => {
                setSearchQuery(district);
                handleNavigate('map');
              }}
              onOpenAdvisor={(prompt) => {
                setAdvisorInitialPrompt(prompt);
                handleNavigate('advisor');
              }}
              selectedCity={selectedCity}
              isSubscriber={isSubscriber}
              onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
            />
          )}

          {/* DEDICATED PAGE: سابقة الأعمال (Case Studies) */}
          {currentPageId === 'case-studies' && (
            <div className="space-y-6">
              <CaseStudiesPage onNavigate={handleNavigate} />
            </div>
          )}

          {/* 2. DEDICATED PAGE: الخريطة العقارية */}
          {currentPageId === 'map' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-8">
                <SaudiInteractiveKingdomMap />
                <ProjectStatistics onNavigate={handleNavigate} />
              </div>
            </div>
          )}

          {/* 3. DEDICATED PAGE: مؤشرات الأسعار والرسوم البيانية */}
          {currentPageId === 'indicators' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <BaseetaPriceIndex />
              </div>
            </div>
          )}

          {/* 4. DEDICATED PAGE: المحفظة العقارية */}
          {currentPageId === 'portfolio' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <BaseetaPortfolio />
              </div>
            </div>
          )}

          {/* 5. DEDICATED PAGE: الصفقات والجداول العقارية */}
          {currentPageId === 'deals' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <BaseetaDealsTable />
              </div>
            </div>
          )}

          {/* 6. DEDICATED PAGE: حاسبة التقييم والعوائد */}
          {currentPageId === 'calculator' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <BaseetaCalculator />
              </div>
            </div>
          )}

          {/* 7. DEDICATED PAGE: مقارنة الأحياء */}
          {currentPageId === 'compare' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <BaseetaDistrictComparator />
              </div>
            </div>
          )}

          {/* 8. DEDICATED PAGE: إحصائيات المشاريع */}
          {currentPageId === 'projects' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <ProjectStatistics onNavigate={handleNavigate} />
              </div>
            </div>
          )}

          {/* 9. DEDICATED PAGE: المستشار الذكي بسيط AI */}
          {currentPageId === 'advisor' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <BaseetaAdvisorPaseet initialPrompt={advisorInitialPrompt} />
              </div>
            </div>
          )}

          {/* 10. DEDICATED PAGE: باقات الاشتراك */}
          {currentPageId === 'pricing' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <PricingSection
                  isSubscriber={isSubscriber}
                  onActivatePlan={handleActivateSubscription}
                />
              </div>
            </div>
          )}

          {/* Legacy / Engineering Pages for deep dive when chosen */}
          {currentPageId === 'live-projects-map' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <MegaProjectsMap />
              </div>
            </div>
          )}

          {currentPageId === 'digital-twin-360' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <DigitalTwin360Section
                  isSubscriber={isSubscriber}
                  onRequestSubscription={handleRequestSubscription}
                />
              </div>
            </div>
          )}

          {currentPageId === 'evolution' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <UrbanEvolutionSection
                  selectedCity={selectedCity}
                  isSubscriber={isSubscriber}
                  onRequestSubscription={handleRequestSubscription}
                  onConsultEngineering={handleConsultEngineering}
                />
              </div>
            </div>
          )}

          {currentPageId === 'soil-suitability' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <LandSuitabilitySection
                  selectedCity={selectedCity}
                  isSubscriber={isSubscriber}
                  onRequestSubscription={handleRequestSubscription}
                  onConsultEngineering={handleConsultEngineering}
                />
              </div>
            </div>
          )}

          {currentPageId === 'equipment-fleet' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <ConstructionSiteManager
                  selectedCity={selectedCity}
                  isSubscriber={isSubscriber}
                  onRequestSubscription={handleRequestSubscription}
                  onConsultEngineering={handleConsultEngineering}
                />
              </div>
            </div>
          )}

          {currentPageId === 'infrastructure' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <InfrastructureNetworks
                  selectedCity={selectedCity}
                  onConsultAI={handleConsultEngineering}
                />
              </div>
            </div>
          )}

          {/* 17. DEDICATED PAGE: عن عين سيجام */}
          {currentPageId === 'about' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <AboutAinSigamPage onNavigate={handleNavigate} />
              </div>
            </div>
          )}

          {/* 18. DEDICATED PAGE: تواصل معنا */}
          {currentPageId === 'contact' && (
            <div className="space-y-6">
              <PageHeaderBanner
                currentPage={currentPageInfo}
                onNavigate={handleNavigate}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                viewMode={viewMode}
                onToggleViewMode={handleToggleViewMode}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <ContactUsPage onNavigate={handleNavigate} />
              </div>
            </div>
          )}

          {/* Quick jump grid at bottom for dedicated pages */}
          {currentPageId !== 'home' && currentPageId !== 'case-studies' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
              <div className="bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <PagesDirectoryGrid
                  currentPageId={currentPageId}
                  onNavigate={handleNavigate}
                  isCompact={true}
                />
              </div>
            </div>
          )}

        </main>
      ) : (
        /* RENDER MODE 2: CONTINUOUS ALL-IN-ONE VIEW */
        <main className="flex-1 w-full space-y-10 max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <BaseetaHero 
            onSearchSelectDistrict={(district) => {
              setSearchQuery(district);
              handleNavigate('map');
            }}
            onNavigateSection={handleNavigate}
            onOpenAdvisor={(prompt) => {
              setAdvisorInitialPrompt(prompt);
              handleNavigate('advisor');
            }}
          />

          <SaudiInteractiveKingdomMap />
          <ProjectStatistics onNavigate={handleNavigate} />
          <BaseetaPriceIndex />
          <BaseetaPortfolio />
          <BaseetaAdvisorPaseet initialPrompt={advisorInitialPrompt} />
          <BaseetaDealsTable />
          <BaseetaCalculator />
          <BaseetaDistrictComparator />
          <PricingSection
            isSubscriber={isSubscriber}
            onActivatePlan={handleActivateSubscription}
          />
        </main>
      )}

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        lang={lang}
      />

      {/* Subscription & Paywall Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        reason={subscriptionReason}
        onSelectPlan={handleActivateSubscription}
      />
    </div>
  );
}
