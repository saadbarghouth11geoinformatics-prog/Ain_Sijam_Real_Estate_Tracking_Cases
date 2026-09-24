import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check, Filter, X, Sparkles } from 'lucide-react';
import { City } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export interface RegionFilterOption {
  id: City | 'الكل';
  labelAr: string;
  labelEn: string;
  descAr: string;
  descEn: string;
  tagAr: string;
  tagEn: string;
}

export const REGION_OPTIONS: RegionFilterOption[] = [
  {
    id: 'الكل',
    labelAr: 'الكل',
    labelEn: 'All Regions',
    descAr: 'كافة مناطق ومشاريع المملكة',
    descEn: 'All Kingdom Regions & Sites',
    tagAr: 'شامل',
    tagEn: 'All',
  },
  {
    id: 'الرياض',
    labelAr: 'الرياض',
    labelEn: 'Riyadh',
    descAr: 'منطقة الرياض • العاصمة والمشاريع الكبرى',
    descEn: 'Riyadh Region • Capital & Mega Hubs',
    tagAr: 'الوسطى',
    tagEn: 'Central',
  },
  {
    id: 'جدة',
    labelAr: 'جدة',
    labelEn: 'Jeddah',
    descAr: 'عروس البحر الأحمر • منطقة مكة المكرمة',
    descEn: 'Red Sea Hub • Makkah Region',
    tagAr: 'الغربية',
    tagEn: 'Western',
  },
  {
    id: 'الدمام',
    labelAr: 'الدمام',
    labelEn: 'Dammam',
    descAr: 'حاضرة المنطقة الشرقية ومراكز التشييد',
    descEn: 'Eastern Province Capital',
    tagAr: 'الشرقية',
    tagEn: 'Eastern',
  },
  {
    id: 'الخبر',
    labelAr: 'الخبر',
    labelEn: 'Khobar',
    descAr: 'الساحل الشرقي والمشاريع الحضرية',
    descEn: 'Eastern Coastal Hub',
    tagAr: 'الشرقية',
    tagEn: 'Eastern',
  },
  {
    id: 'نيوم',
    labelAr: 'نيوم',
    labelEn: 'NEOM',
    descAr: 'منطقة تبوك • مشروعات المستقبل والابتكار',
    descEn: 'Tabuk Region • Future Megaprojects',
    tagAr: 'الشمالية الغربية',
    tagEn: 'North-West',
  },
];

interface RegionFilterDropdownProps {
  selectedCity: City | 'الكل';
  onSelectCity: (city: City | 'الكل') => void;
  className?: string;
  compact?: boolean;
}

export const RegionFilterDropdown: React.FC<RegionFilterDropdownProps> = ({
  selectedCity,
  onSelectCity,
  className = '',
  compact = false,
}) => {
  const { isAr, t } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const currentOption = REGION_OPTIONS.find((opt) => opt.id === selectedCity) || REGION_OPTIONS[0];

  const handleSelect = (cityId: City | 'الكل') => {
    onSelectCity(cityId);
    setIsOpen(false);
  };

  return (
    <div 
      ref={dropdownRef} 
      className={`relative inline-block text-start ${className}`} 
      id="region-filter-container"
    >
      {/* Trigger Button: Displays "اسم المنطقة" explicitly as requested */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        id="region-filter-trigger"
        className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none shadow-2xs ${
          isOpen
            ? 'bg-emerald-50 dark:bg-slate-800 border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-400/20'
            : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-750 border-sky-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600'
        }`}
        title={isAr ? 'تصفية البيانات والمشاريع حسب اسم المنطقة' : 'Filter data and projects by Region Name'}
      >
        {/* MapPin / Filter Icon with subtle pulse */}
        <div className="w-5 h-5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <MapPin className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>

        {/* Filter Label & Selected Value */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">
            {isAr ? 'اسم المنطقة:' : 'Region Name:'}
          </span>
          <span className={`font-black tracking-tight ${
            selectedCity === 'الكل'
              ? 'text-slate-800 dark:text-slate-200'
              : 'text-emerald-600 dark:text-emerald-400'
          }`}>
            {isAr ? currentOption.labelAr : currentOption.labelEn}
          </span>
        </div>

        {/* Status Indicator Tag if specific region is chosen */}
        {selectedCity !== 'الكل' && (
          <span className="hidden xl:inline-block px-1.5 py-0.2 rounded-md text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
            {isAr ? currentOption.tagAr : currentOption.tagEn}
          </span>
        )}

        {/* Chevron Indicator */}
        <ChevronDown 
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''
          }`} 
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div 
          role="listbox"
          id="region-filter-menu"
          aria-label={isAr ? 'قائمة اسم المنطقة' : 'Region Name list'}
          className={`absolute z-50 mt-1.5 w-72 sm:w-80 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-sky-100 dark:border-slate-800 shadow-xl shadow-slate-900/15 p-2 animate-in fade-in zoom-in-95 duration-150 ${
            isAr ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
          }`}
        >
          {/* Header of the Filter */}
          <div className="flex items-center justify-between px-2.5 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-black text-slate-900 dark:text-white">
                {isAr ? 'فلتر اسم المنطقة' : 'Filter by Region Name'}
              </span>
            </div>
            
            {/* Quick Reset to 'All' */}
            {selectedCity !== 'الكل' ? (
              <button
                type="button"
                onClick={() => handleSelect('الكل')}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <span>{isAr ? 'إعادة ضبط للكل' : 'Reset to All'}</span>
              </button>
            ) : (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                {REGION_OPTIONS.length} {isAr ? 'خيارات' : 'options'}
              </span>
            )}
          </div>

          {/* Region Options List */}
          <div className="space-y-1 max-h-72 overflow-y-auto no-scrollbar py-0.5">
            {REGION_OPTIONS.map((option) => {
              const isSelected = selectedCity === option.id;

              return (
                <button
                  key={option.id}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  className={`w-full p-2 rounded-xl text-start flex items-center justify-between transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 group-hover:text-emerald-600'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold truncate ${
                          isSelected ? 'text-white' : 'text-slate-900 dark:text-white'
                        }`}>
                          {isAr ? option.labelAr : option.labelEn}
                        </span>
                        
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                          isSelected 
                            ? 'bg-white/25 text-white' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {isAr ? option.tagAr : option.tagEn}
                        </span>
                      </div>
                      
                      <p className={`text-[10px] truncate leading-tight mt-0.5 ${
                        isSelected ? 'text-emerald-50' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {isAr ? option.descAr : option.descEn}
                      </p>
                    </div>
                  </div>

                  {/* Active Checkmark */}
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-1.5 mr-1.5">
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-1 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 text-center">
            {isAr 
              ? 'تتزامن التصفية فورياً مع الخرائط والتوأم الرقمي ومواقع البناء' 
              : 'Filter synchronizes instantly with maps, BIM twin & sites'}
          </div>
        </div>
      )}
    </div>
  );
};
