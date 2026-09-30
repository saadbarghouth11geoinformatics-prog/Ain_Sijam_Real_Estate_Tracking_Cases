import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Layers3, 
  Crosshair, 
  Maximize2, 
  Minimize2,
  LocateFixed,
  MapPin,
  MapPinned,
  Building2,
  ReceiptText,
  Map,
  Satellite,
  Mountain,
  Search,
  SlidersHorizontal,
  X,
  Camera,
  TrendingUp,
  Check,
  CheckCircle2,
  Info,
  Globe,
  BriefcaseBusiness,
  Layers,
  Plane,
  Warehouse,
  Sprout,
  Zap,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  useUserGeolocation, 
  ProjectWithDistance 
} from '../hooks/useUserGeolocation';
import { saudiDistricts, sampleLiveDeals } from '../data/mockRealEstateData';
import { sampleDistrictBuildings } from '../data/infrastructureData';
import { DistrictInfo, BuildingParcel, RealEstateDeal, City } from '../types';
import { ConstructionSiteItem, constructionSitesList } from '../data/constructionSitesData';
import { ProjectCoverImage } from './ProjectCoverImage';

/**
 * Three exploration modes as requested:
 * 1. السوق العقاري (Real Estate Market): الأحياء، متوسط سعر المتر السكني والتجاري، الصفقات، العائد
 * 2. الأراضي والتخطيط (Land & Planning): قطع الأراضي، الكاداستر، المخططات، شبكات البنية التحتية والمترو
 * 3. المشروعات والرصد (Projects & Monitoring): المشاريع الكبرى، نسب الإنجاز، المراقبة الفضائية والميدانية
 */
export type MapExploreMode = 'market' | 'planning' | 'monitoring';

interface RegionQuickTarget {
  id: string;
  nameAr: string;
  nameEn: string;
  coords: [number, number];
  zoom: number;
  capitalAr: string;
  capitalEn: string;
}

const saudiRegions: RegionQuickTarget[] = [
  { id: 'all', nameAr: 'المملكة كاملة', nameEn: 'Saudi Arabia', coords: [24.2, 44.5], zoom: 5, capitalAr: 'نظرة شاملة', capitalEn: 'Overview' },
  { id: 'riyadh', nameAr: 'مدينة الرياض', nameEn: 'Riyadh City', coords: [24.7136, 46.6753], zoom: 11, capitalAr: 'الرياض', capitalEn: 'Riyadh' },
  { id: 'makkah', nameAr: 'مكة المكرمة وجدة', nameEn: 'Makkah & Jeddah', coords: [21.4858, 39.1925], zoom: 9, capitalAr: 'مكة وجدة', capitalEn: 'Makkah & Jeddah' },
  { id: 'eastern', nameAr: 'المنطقة الشرقية', nameEn: 'Eastern Province', coords: [26.4207, 50.0888], zoom: 9, capitalAr: 'الدمام والخبر', capitalEn: 'Dammam & Khobar' },
  { id: 'madinah', nameAr: 'المدينة المنورة', nameEn: 'Madinah Region', coords: [24.4686, 39.6142], zoom: 9, capitalAr: 'المدينة المنورة', capitalEn: 'Madinah' },
  { id: 'tabuk', nameAr: 'تبوك ونيوم', nameEn: 'Tabuk & NEOM', coords: [28.3835, 36.5662], zoom: 8, capitalAr: 'تبوك ونيوم', capitalEn: 'Tabuk & NEOM' },
];

interface CategoryFilterOption {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_OPTIONS: CategoryFilterOption[] = [
  { id: 'all', nameAr: 'جميع المشاريع', nameEn: 'All Projects', icon: Layers3 },
  { id: 'توسعة مطارات وبنية تحتية', nameAr: 'مطارات وبنية تحتية', nameEn: 'Airports & Transit', icon: Plane },
  { id: 'مجمعات لوجستية وصناعية', nameAr: 'مجمعات لوجستية وصناعية', nameEn: 'Logistics & Industrial', icon: Warehouse },
  { id: 'تطوير بيئي وزراعي ومرافق ري', nameAr: 'تطوير بيئي وزراعي', nameEn: 'Agro & Environmental', icon: Sprout },
  { id: 'أبراج وتطوير حضري', nameAr: 'أبراج وتطوير حضري', nameEn: 'Urban Towers & Districts', icon: Building2 },
  { id: 'وجهات سياحية ومعالم', nameAr: 'وجهات سياحية ومعالم', nameEn: 'Tourism Destinations', icon: Mountain },
  { id: 'طاقة ومرافق وبنية تحتية', nameAr: 'طاقة ومرافق وبنية تحتية', nameEn: 'Energy & Utilities', icon: Zap }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'توسعة مطارات وبنية تحتية':
      return Plane;
    case 'مجمعات لوجستية وصناعية':
      return Warehouse;
    case 'تطوير بيئي وزراعي ومرافق ري':
      return Sprout;
    case 'أبراج وتطوير حضري':
      return Building2;
    case 'وجهات سياحية ومعالم':
      return Mountain;
    case 'طاقة ومرافق وبنية تحتية':
      return Zap;
    default:
      return Building2;
  }
};

// District approximate geographic coordinates
const DISTRICT_GEO_COORDS: Record<string, { lat: number; lng: number }> = {
  'النرجس': { lat: 24.8436, lng: 46.6698 },
  'الملقا': { lat: 24.8123, lng: 46.6189 },
  'حطين': { lat: 24.7745, lng: 46.6021 },
  'الياسمين': { lat: 24.8210, lng: 46.6450 },
  'العارض': { lat: 24.8870, lng: 46.6340 },
  'الصحافة': { lat: 24.7950, lng: 46.6490 },
  'العليا': { lat: 24.7080, lng: 46.6780 },
  'قرطبة': { lat: 24.8130, lng: 46.7380 },
  'الرمال': { lat: 24.8410, lng: 46.8450 },
  'الشاطئ': { lat: 21.6050, lng: 39.1230 },
  'أبحر الشمالية': { lat: 21.7480, lng: 39.1120 },
  'الروضة': { lat: 21.5640, lng: 39.1580 },
  'الحزام الذهبي': { lat: 26.3120, lng: 50.2180 },
  'الشاطئ الشرقي': { lat: 26.4520, lng: 50.1190 },
  'الشوقية': { lat: 21.3780, lng: 39.7910 }
};

// Parcel geographic coordinates around Riyadh Al-Narjis
const PARCEL_GEO_COORDS: Record<string, { lat: number; lng: number }> = {
  'bldg-101': { lat: 24.8452, lng: 46.6712 },
  'bldg-102': { lat: 24.8448, lng: 46.6728 },
  'bldg-103': { lat: 24.8441, lng: 46.6744 },
  'bldg-201': { lat: 24.8465, lng: 46.6715 },
  'bldg-202': { lat: 24.8461, lng: 46.6734 },
  'bldg-301': { lat: 24.8425, lng: 46.6702 },
  'bldg-302': { lat: 24.8420, lng: 46.6725 },
  'bldg-401': { lat: 24.8475, lng: 46.6740 },
  'bldg-501': { lat: 24.8482, lng: 46.6710 },
};

// Deals geographic coordinates
const DEAL_GEO_COORDS: Record<string, { lat: number; lng: number }> = {
  'deal-101': { lat: 24.8430, lng: 46.6705 },
  'deal-102': { lat: 24.8115, lng: 46.6200 },
  'deal-103': { lat: 24.7738, lng: 46.6030 },
  'deal-104': { lat: 21.7470, lng: 39.1130 },
  'deal-105': { lat: 24.8860, lng: 46.6350 },
  'deal-106': { lat: 24.8200, lng: 46.6460 },
  'deal-107': { lat: 26.3110, lng: 50.2190 },
  'deal-108': { lat: 21.6040, lng: 39.1240 },
  'deal-109': { lat: 24.8400, lng: 46.8460 },
  'deal-110': { lat: 21.3770, lng: 39.7920 },
  'deal-111': { lat: 24.7070, lng: 46.6790 },
  'deal-112': { lat: 26.4510, lng: 50.1200 },
};

export type SelectedItemType = 
  | { type: 'district'; data: DistrictInfo }
  | { type: 'deal'; data: RealEstateDeal }
  | { type: 'parcel'; data: BuildingParcel }
  | { type: 'project'; data: ProjectWithDistance }
  | null;

// Reusable SVG markers for Leaflet with zero emojis and 18-20px Lucide lines
const createDistrictMarkerIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'clean-district-marker',
    iconSize: [28, 34],
    iconAnchor: [14, 34],
    popupAnchor: [0, -34],
    html: `
      <div style="width: 28px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="34" viewBox="0 0 24 28" fill="${isSelected ? '#2563eb' : '#2563eb'}" stroke="${isSelected ? '#ffffff' : '#1d4ed8'}" stroke-width="${isSelected ? '2' : '1.5'}" stroke-linecap="round" stroke-linejoin="round" style="${isSelected ? 'filter: drop-shadow(0 0 0 2px #2563eb) drop-shadow(0 3px 8px rgba(0,0,0,0.3));' : 'filter: drop-shadow(0 2px 5px rgba(0,0,0,0.2));'}">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
          <circle cx="12" cy="10" r="3.2" fill="#ffffff" stroke="none"/>
        </svg>
      </div>
    `
  });
};

const createDealMarkerIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'clean-deal-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
    html: `
      <div style="width: 32px; height: 32px; border-radius: 50%; background: ${isSelected ? '#2563eb' : '#ffffff'}; border: 2px solid ${isSelected ? '#ffffff' : '#2563eb'}; ${isSelected ? 'box-shadow: 0 0 0 2px #2563eb, 0 3px 10px rgba(0,0,0,0.25); transform: scale(1.15);' : 'box-shadow: 0 2px 6px rgba(0,0,0,0.15);'} display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='${isSelected ? 'scale(1.15)' : 'scale(1)'}'">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#ffffff' : '#2563eb'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
          <path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>
        </svg>
      </div>
    `
  });
};

const createParcelMarkerIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'clean-parcel-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
    html: `
      <div style="width: 32px; height: 32px; border-radius: 8px; background: ${isSelected ? '#2563eb' : '#ffffff'}; border: 2px solid ${isSelected ? '#ffffff' : '#2563eb'}; ${isSelected ? 'box-shadow: 0 0 0 2px #2563eb, 0 3px 10px rgba(0,0,0,0.25); transform: scale(1.15);' : 'box-shadow: 0 2px 6px rgba(0,0,0,0.15);'} display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='${isSelected ? 'scale(1.15)' : 'scale(1)'}'">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#ffffff' : '#2563eb'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8c0 3.613-3.887 7.6-5.43 8.97a1 1 0 0 1-1.14 0C9.887 15.6 6 11.613 6 8a6 6 0 0 1 12 0"/>
          <circle cx="12" cy="8" r="2"/>
          <path d="M8.714 14h-3.714a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-3.714"/>
        </svg>
      </div>
    `
  });
};

const createProjectMarkerIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'clean-project-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
    html: `
      <div style="width: 32px; height: 32px; border-radius: 50%; background: ${isSelected ? '#2563eb' : '#ffffff'}; border: 2px solid ${isSelected ? '#ffffff' : '#2563eb'}; ${isSelected ? 'box-shadow: 0 0 0 2px #2563eb, 0 3px 10px rgba(0,0,0,0.25); transform: scale(1.15);' : 'box-shadow: 0 2px 6px rgba(0,0,0,0.15);'} display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='${isSelected ? 'scale(1.15)' : 'scale(1)'}'">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#ffffff' : '#2563eb'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
          <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
        </svg>
      </div>
    `
  });
};

export interface SaudiInteractiveKingdomMapProps {
  selectedCity?: City | 'الكل';
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  focusedProjectId?: string | null;
  onSelectProject?: (project: ConstructionSiteItem) => void;
  initialExploreMode?: MapExploreMode;
}

export const SaudiInteractiveKingdomMap: React.FC<SaudiInteractiveKingdomMapProps> = ({
  selectedCity,
  selectedCategory: propCategory,
  onSelectCategory,
  focusedProjectId,
  onSelectProject,
  initialExploreMode = 'market'
}) => {
  const { t, isAr } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  // Base Layer References
  const satelliteLayerRef = useRef<L.TileLayer | null>(null);
  const topoLayerRef = useRef<L.TileLayer | null>(null);
  const streetLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);

  // Markers Layer Groups
  const userMarkerGroupRef = useRef<L.LayerGroup | null>(null);
  const modeMarkerGroupRef = useRef<L.LayerGroup | null>(null);

  // Geolocation Hook
  const {
    coords: userCoords,
    requestLocation,
    nearbyProjects,
  } = useUserGeolocation();

  // === 1. TOP-LEVEL EXPLORATION MODE ===
  const [exploreMode, setExploreMode] = useState<MapExploreMode>(initialExploreMode);

  // Search Bar State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // Basemap & View States
  const [activeBaseLayer, setActiveBaseLayer] = useState<'street' | 'satellite' | 'topo'>('street');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('riyadh');
  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number } | null>({ lat: 24.7136, lng: 46.6753 });
  const [currentZoom, setCurrentZoom] = useState<number>(11);

  // Mode 1: Market State
  const [marketSubFilter, setMarketSubFilter] = useState<'all' | 'residential' | 'commercial' | 'deals'>('all');
  
  // Mode 2: Planning State
  const [showMetroOverlay, setShowMetroOverlay] = useState<boolean>(true);
  const [showUtilitiesOverlay, setShowUtilitiesOverlay] = useState<boolean>(true);

  // Mode 3: Monitoring State
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const activeCategory = propCategory !== undefined ? propCategory : internalCategory;

  const handleCategoryChange = (catId: string) => {
    setInternalCategory(catId);
    onSelectCategory?.(catId);
  };

  // Selected item state (Defaults to certified District: حي النرجس)
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>({
    type: 'district',
    data: saudiDistricts[0]
  });

  // Inspection Modal for Project Photos
  const [selectedInspectionProject, setSelectedInspectionProject] = useState<ProjectWithDistance | null>(null);

  // Default Map Focus (Riyadh Overview)
  const defaultCenter: [number, number] = [24.7136, 46.6753];
  const defaultZoom = 11;

  // Fly to focused project when prop updates
  useEffect(() => {
    if (!focusedProjectId || !mapInstanceRef.current) return;
    const proj = nearbyProjects.find(p => p.id === focusedProjectId) || constructionSitesList.find(p => p.id === focusedProjectId);
    if (proj) {
      setExploreMode('monitoring');
      setSelectedItem({ type: 'project', data: proj as ProjectWithDistance });
      mapInstanceRef.current.flyTo([proj.realGps.lat, proj.realGps.lng], 14, { animate: true });
      if (mapContainerRef.current) {
        mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [focusedProjectId, nearbyProjects]);

  // Sync city navigation when selectedCity prop changes
  useEffect(() => {
    if (!selectedCity || !mapInstanceRef.current) return;
    const cityCoords: Record<string, { coords: [number, number]; zoom: number }> = {
      'الرياض': { coords: [24.7136, 46.6753], zoom: 11 },
      'جدة': { coords: [21.5833, 39.1667], zoom: 11 },
      'الدمام': { coords: [26.4207, 50.0888], zoom: 11 },
      'مكة المكرمة': { coords: [21.4225, 39.8262], zoom: 11 },
      'المدينة المنورة': { coords: [24.4686, 39.6142], zoom: 11 },
      'الخبر': { coords: [26.3120, 50.2180], zoom: 11 },
      'نيوم': { coords: [28.0050, 35.3120], zoom: 9 },
    };
    if (selectedCity === 'الكل') {
      mapInstanceRef.current.flyTo([24.2, 44.5], 5.5, { animate: true });
    } else if (cityCoords[selectedCity]) {
      const target = cityCoords[selectedCity];
      mapInstanceRef.current.flyTo(target.coords, target.zoom, { animate: true });
    }
  }, [selectedCity]);

  // Filtered Projects for Monitoring Mode
  const filteredProjects = useMemo(() => {
    let list = nearbyProjects;
    if (selectedCity && selectedCity !== 'الكل') {
      list = list.filter(p => p.city === selectedCity);
    }
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
    }
    return list;
  }, [nearbyProjects, selectedCity, activeCategory, searchQuery]);

  // Filtered Districts for Market Mode
  const filteredDistricts = useMemo(() => {
    let list = saudiDistricts;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(d => d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q));
    }
    return list;
  }, [searchQuery]);

  // Filtered Deals for Market Mode
  const filteredDeals = useMemo(() => {
    let list = sampleLiveDeals;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(deal => deal.dealNumber.toLowerCase().includes(q) || deal.district.toLowerCase().includes(q));
    }
    return list;
  }, [searchQuery]);

  // Filtered Parcels for Planning Mode
  const filteredParcels = useMemo(() => {
    let list = sampleDistrictBuildings;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => p.parcelNumber.toLowerCase().includes(q) || p.subdivision.toLowerCase().includes(q));
    }
    return list;
  }, [searchQuery]);

  // Determine if active mode returned empty results
  const isEmptyResults = useMemo(() => {
    if (exploreMode === 'market') {
      if (marketSubFilter === 'deals') return filteredDeals.length === 0;
      if (marketSubFilter === 'residential' || marketSubFilter === 'commercial') return filteredDistricts.length === 0;
      return filteredDistricts.length === 0 && filteredDeals.length === 0;
    }
    if (exploreMode === 'planning') {
      return filteredParcels.length === 0;
    }
    if (exploreMode === 'monitoring') {
      return filteredProjects.length === 0;
    }
    return false;
  }, [exploreMode, marketSubFilter, filteredDistricts, filteredDeals, filteredParcels, filteredProjects]);

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setMarketSubFilter('all');
    handleCategoryChange('all');
  };

  // Fly to target and highlight item
  const handleFlyToTarget = (lat: number, lng: number, zoomLevel: number = 13) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([lat, lng], zoomLevel, {
      duration: 0.8,
      easeLinearity: 0.25,
    });
  };

  // Select Item and Automatically Zoom into Feature
  const handleSelectItemWithZoom = (item: SelectedItemType) => {
    setSelectedItem(item);
    if (!item) return;

    if (item.type === 'project') {
      onSelectProject?.(item.data);
    }

    let targetLat = 24.7136;
    let targetLng = 46.6753;
    let targetZoom = 13;

    if (item.type === 'district') {
      const coords = DISTRICT_GEO_COORDS[item.data.name];
      if (coords) {
        targetLat = coords.lat;
        targetLng = coords.lng;
        targetZoom = 13;
      }
    } else if (item.type === 'deal') {
      const coords = DEAL_GEO_COORDS[item.data.id];
      if (coords) {
        targetLat = coords.lat;
        targetLng = coords.lng;
        targetZoom = 15;
      }
    } else if (item.type === 'parcel') {
      const coords = PARCEL_GEO_COORDS[item.data.id];
      if (coords) {
        targetLat = coords.lat;
        targetLng = coords.lng;
        targetZoom = 16;
      }
    } else if (item.type === 'project') {
      targetLat = item.data.realGps.lat;
      targetLng = item.data.realGps.lng;
      targetZoom = 14;
    }

    handleFlyToTarget(targetLat, targetLng, targetZoom);
  };

  // Global window callbacks for Leaflet Popups
  useEffect(() => {
    (window as any).__selectDistrictFromMap = (districtId: string) => {
      const d = saudiDistricts.find(item => item.id === districtId);
      if (d) handleSelectItemWithZoom({ type: 'district', data: d });
    };

    (window as any).__selectDealFromMap = (dealId: string) => {
      const deal = sampleLiveDeals.find(item => item.id === dealId);
      if (deal) handleSelectItemWithZoom({ type: 'deal', data: deal });
    };

    (window as any).__selectParcelFromMap = (parcelId: string) => {
      const parcel = sampleDistrictBuildings.find(item => item.id === parcelId);
      if (parcel) handleSelectItemWithZoom({ type: 'parcel', data: parcel });
    };

    (window as any).__selectProjectFromMap = (projectId: string) => {
      const proj = nearbyProjects.find(item => item.id === projectId);
      if (proj) handleSelectItemWithZoom({ type: 'project', data: proj });
    };

    return () => {
      delete (window as any).__selectDistrictFromMap;
      delete (window as any).__selectDealFromMap;
      delete (window as any).__selectParcelFromMap;
      delete (window as any).__selectProjectFromMap;
    };
  }, [nearbyProjects]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });

    // 1. Esri World Imagery (Satellite)
    const satLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19, attribution: 'Esri, Maxar' }
    );
    satelliteLayerRef.current = satLayer;

    // 2. Esri World Topo (Terrain)
    const topoLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19 }
    );
    topoLayerRef.current = topoLayer;

    // 3. OpenStreetMap (Clean Street Base)
    const streetLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 19, attribution: '&copy; OpenStreetMap' }
    );
    streetLayerRef.current = streetLayer;
    streetLayer.addTo(map);

    // 4. Esri Boundaries and Places
    const labelsLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19 }
    );
    labelsLayerRef.current = labelsLayer;
    labelsLayer.addTo(map);

    // Layer Groups
    const userGroup = L.layerGroup().addTo(map);
    userMarkerGroupRef.current = userGroup;

    const modeGroup = L.layerGroup().addTo(map);
    modeMarkerGroupRef.current = modeGroup;

    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setMouseCoords({
        lat: Number(e.latlng.lat.toFixed(4)),
        lng: Number(e.latlng.lng.toFixed(4)),
      });
    });

    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    mapInstanceRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Base Layer Switch
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (satelliteLayerRef.current && map.hasLayer(satelliteLayerRef.current)) {
      map.removeLayer(satelliteLayerRef.current);
    }
    if (topoLayerRef.current && map.hasLayer(topoLayerRef.current)) {
      map.removeLayer(topoLayerRef.current);
    }
    if (streetLayerRef.current && map.hasLayer(streetLayerRef.current)) {
      map.removeLayer(streetLayerRef.current);
    }

    if (activeBaseLayer === 'satellite' && satelliteLayerRef.current) {
      satelliteLayerRef.current.addTo(map);
    } else if (activeBaseLayer === 'topo' && topoLayerRef.current) {
      topoLayerRef.current.addTo(map);
    } else if (activeBaseLayer === 'street' && streetLayerRef.current) {
      streetLayerRef.current.addTo(map);
    }

    if (showLabels && labelsLayerRef.current) {
      if (activeBaseLayer === 'street') {
        if (map.hasLayer(labelsLayerRef.current)) {
          map.removeLayer(labelsLayerRef.current);
        }
      } else {
        if (!map.hasLayer(labelsLayerRef.current)) {
          labelsLayerRef.current.addTo(map);
        }
      }
    }
  }, [activeBaseLayer, showLabels]);

  // Update User Location Marker (Clean radar, no emojis)
  useEffect(() => {
    const userGroup = userMarkerGroupRef.current;
    if (!userGroup || !userCoords) return;

    userGroup.clearLayers();

    const userPulseIcon = L.divIcon({
      className: 'user-geo-radar-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      html: `
        <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; pointer-events: none;">
          <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(37, 99, 235, 0.2); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 16px; height: 16px; border-radius: 50%; background: #2563eb; border: 2.5px solid #ffffff; box-shadow: 0 0 10px rgba(37, 99, 235, 0.8);">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 4px; height: 4px; border-radius: 50%; background: #ffffff;"></div>
          </div>
        </div>
      `,
    });

    const userMarker = L.marker([userCoords.lat, userCoords.lng], {
      icon: userPulseIcon,
      zIndexOffset: 1000,
    });

    userMarker.bindTooltip(
      `<div style="font-family: Cairo, sans-serif; font-size: 11px; font-weight: bold; color: #2563eb;">${isAr ? 'موقعك الحالي' : 'Your Location'}</div>`,
      { direction: 'top', offset: [0, -14], className: 'compact-clean-tooltip' }
    );

    userMarker.addTo(userGroup);
  }, [userCoords, isAr]);

  // === 3. DYNAMIC MARKERS POPULATION WITH LUCIDE ICONS, COMPACT 2-LINE TOOLTIPS, & CLUSTERING ===
  useEffect(() => {
    const map = mapInstanceRef.current;
    const modeGroup = modeMarkerGroupRef.current;
    if (!map || !modeGroup) return;

    modeGroup.clearLayers();

    // -------------------------------------------------------------
    // MODE 1: السوق العقاري (Real Estate Market)
    // -------------------------------------------------------------
    if (exploreMode === 'market') {
      const isZoomedOut = currentZoom < 11;

      if (isZoomedOut) {
        // Proximity cluster markers (clean blue circle with count, zero emojis)
        const clusters: { centerLat: number; centerLng: number; count: number; label: string }[] = [];
        
        if (marketSubFilter !== 'deals') {
          clusters.push({
            centerLat: 24.8136,
            centerLng: 46.6753,
            count: filteredDistricts.length,
            label: isAr ? 'أحياء' : 'Districts'
          });
        }
        if (marketSubFilter === 'deals' || marketSubFilter === 'all') {
          clusters.push({
            centerLat: 24.8430,
            centerLng: 46.6705,
            count: filteredDeals.length,
            label: isAr ? 'صفقات' : 'Deals'
          });
        }

        clusters.forEach((c) => {
          const clusterIcon = L.divIcon({
            className: 'clean-cluster-marker',
            iconSize: [44, 44],
            iconAnchor: [22, 22],
            html: `
              <div style="width: 44px; height: 44px; border-radius: 50%; background: #2563eb; color: #ffffff; border: 2.5px solid #ffffff; box-shadow: 0 3px 10px rgba(37,99,235,0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; font-family: Cairo, sans-serif; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                <span style="font-size: 13px; font-weight: 800; line-height: 1;">${c.count}</span>
                <span style="font-size: 8px; font-weight: 700; opacity: 0.95;">${c.label}</span>
              </div>
            `
          });
          const marker = L.marker([c.centerLat, c.centerLng], { icon: clusterIcon });
          marker.on('click', () => {
            map.flyTo([c.centerLat, c.centerLng], 12, { duration: 0.8 });
          });
          marker.addTo(modeGroup);
        });

      } else {
        // Individual Markers when zoomed in

        // 1. District Marker: Blue map-pin icon with a small white center
        if (marketSubFilter === 'all' || marketSubFilter === 'residential' || marketSubFilter === 'commercial') {
          filteredDistricts.forEach((d) => {
            const coords = DISTRICT_GEO_COORDS[d.name];
            if (!coords) return;

            const isSelected = selectedItem?.type === 'district' && selectedItem.data.id === d.id;
            const displayPrice = marketSubFilter === 'commercial' 
              ? `${d.avgPriceM2Commercial.toLocaleString()} ر.س` 
              : `${d.avgPriceM2Residential.toLocaleString()} ر.س`;

            const icon = createDistrictMarkerIcon(isSelected);
            const marker = L.marker([coords.lat, coords.lng], { icon });

            // Compact 2-line tooltip next to marker (no emojis)
            marker.bindTooltip(`
              <div style="font-family: Cairo, sans-serif; font-size: 11px; line-height: 1.25; text-align: center; padding: 2px 4px;">
                <div style="font-weight: 800; color: #0f172a; white-space: nowrap;">حي ${d.name}</div>
                <div style="font-family: monospace; font-size: 10px; font-weight: 700; color: #2563eb;">${displayPrice}/م²</div>
              </div>
            `, {
              direction: 'top',
              offset: [0, -32],
              permanent: currentZoom >= 13,
              className: 'compact-clean-tooltip',
              opacity: 0.95
            });

            marker.on('click', () => {
              handleSelectItemWithZoom({ type: 'district', data: d });
            });
            marker.addTo(modeGroup);
          });
        }

        // 2. Deal Marker: Blue circular marker with a ReceiptText icon
        if (marketSubFilter === 'deals' || marketSubFilter === 'all') {
          filteredDeals.forEach((deal) => {
            const coords = DEAL_GEO_COORDS[deal.id];
            if (!coords) return;

            const isSelected = selectedItem?.type === 'deal' && selectedItem.data.id === deal.id;
            const icon = createDealMarkerIcon(isSelected);
            const marker = L.marker([coords.lat, coords.lng], { icon });

            // Compact 2-line tooltip next to marker (no emojis)
            marker.bindTooltip(`
              <div style="font-family: Cairo, sans-serif; font-size: 11px; line-height: 1.25; text-align: center; padding: 2px 4px;">
                <div style="font-weight: 800; color: #0f172a; white-space: nowrap;">صفقة ${deal.dealNumber}</div>
                <div style="font-family: monospace; font-size: 10px; font-weight: 700; color: #2563eb;">${deal.totalPrice.toLocaleString()} ر.س</div>
              </div>
            `, {
              direction: 'top',
              offset: [0, -18],
              permanent: currentZoom >= 14,
              className: 'compact-clean-tooltip',
              opacity: 0.95
            });

            marker.on('click', () => {
              handleSelectItemWithZoom({ type: 'deal', data: deal });
            });
            marker.addTo(modeGroup);
          });
        }
      }
    }

    // -------------------------------------------------------------
    // MODE 2: الأراضي والتخطيط (Land & Planning)
    // -------------------------------------------------------------
    if (exploreMode === 'planning') {
      // Land parcel marker: Blue square marker with a MapPinned icon
      filteredParcels.forEach((parcel) => {
        const coords = PARCEL_GEO_COORDS[parcel.id];
        if (!coords) return;

        const isSelected = selectedItem?.type === 'parcel' && selectedItem.data.id === parcel.id;
        const icon = createParcelMarkerIcon(isSelected);
        const marker = L.marker([coords.lat, coords.lng], { icon });

        // Compact 2-line tooltip next to marker (no emojis)
        marker.bindTooltip(`
          <div style="font-family: Cairo, sans-serif; font-size: 11px; line-height: 1.25; text-align: center; padding: 2px 4px;">
            <div style="font-weight: 800; color: #0f172a; white-space: nowrap;">قطعة ${parcel.parcelNumber}</div>
            <div style="font-size: 10px; font-weight: 700; color: #2563eb;">${parcel.areaM2}م² • ${parcel.typeName}</div>
          </div>
        `, {
          direction: 'top',
          offset: [0, -18],
          permanent: currentZoom >= 14,
          className: 'compact-clean-tooltip',
          opacity: 0.95
        });

        marker.on('click', () => {
          handleSelectItemWithZoom({ type: 'parcel', data: parcel });
        });
        marker.addTo(modeGroup);
      });

      // Metro Lines Overlay
      if (showMetroOverlay) {
        const blueLineCoords: [number, number][] = [
          [24.7675, 46.6433],
          [24.7350, 46.6620],
          [24.7080, 46.6780],
          [24.6750, 46.7010],
          [24.6380, 46.7150]
        ];
        L.polyline(blueLineCoords, {
          color: '#2563eb',
          weight: 4,
          dashArray: '6, 6',
          opacity: 0.9
        }).addTo(modeGroup);

        const yellowLineCoords: [number, number][] = [
          [24.7675, 46.6433],
          [24.8130, 46.7380],
          [24.8436, 46.6698],
          [24.9570, 46.7020]
        ];
        L.polyline(yellowLineCoords, {
          color: '#eab308',
          weight: 4,
          dashArray: '5, 5',
          opacity: 0.9
        }).addTo(modeGroup);
      }

      // Utilities Infrastructure Overlay
      if (showUtilitiesOverlay) {
        const utilityCoords: [number, number][] = [
          [24.8420, 46.6680],
          [24.8436, 46.6698],
          [24.8452, 46.6712],
          [24.8480, 46.6740]
        ];
        L.polyline(utilityCoords, {
          color: '#2563eb',
          weight: 3.5,
          dashArray: '3, 6',
          opacity: 0.8
        }).addTo(modeGroup);
      }
    }

    // -------------------------------------------------------------
    // MODE 3: المشروعات والرصد (Projects & Monitoring)
    // -------------------------------------------------------------
    if (exploreMode === 'monitoring') {
      filteredProjects.forEach((project) => {
        const isSelected = selectedItem?.type === 'project' && selectedItem.data.id === project.id;
        const icon = createProjectMarkerIcon(isSelected);
        const marker = L.marker([project.realGps.lat, project.realGps.lng], { icon });

        // Compact 2-line tooltip next to marker (no emojis)
        marker.bindTooltip(`
          <div style="font-family: Cairo, sans-serif; font-size: 11px; line-height: 1.25; text-align: center; padding: 2px 4px;">
            <div style="font-weight: 800; color: #0f172a; white-space: nowrap;">${project.name}</div>
            <div style="font-size: 10px; font-weight: 700; color: #2563eb;">${project.city} • ${project.progressPct}%</div>
          </div>
        `, {
          direction: 'top',
          offset: [0, -18],
          permanent: currentZoom >= 13,
          className: 'compact-clean-tooltip',
          opacity: 0.95
        });

        marker.on('click', () => {
          handleSelectItemWithZoom({ type: 'project', data: project });
        });
        marker.addTo(modeGroup);
      });
    }

  }, [exploreMode, marketSubFilter, showMetroOverlay, showUtilitiesOverlay, activeCategory, filteredDistricts, filteredDeals, filteredParcels, filteredProjects, selectedItem, currentZoom, isAr]);

  // Autocomplete search results with clean Lucide icons
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();

    const districts = saudiDistricts
      .filter(d => d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q))
      .map(d => ({
        type: 'district' as const,
        id: d.id,
        title: `حي ${d.name}`,
        subtitle: `${d.city} • ${d.avgPriceM2Residential.toLocaleString()} ر.س/م²`,
        data: d,
        coords: DISTRICT_GEO_COORDS[d.name] || { lat: 24.7136, lng: 46.6753 }
      }));

    const projects = nearbyProjects
      .filter(p => p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      .map(p => ({
        type: 'project' as const,
        id: p.id,
        title: p.name,
        subtitle: `${p.city} • ${p.category} (${p.progressPct}%)`,
        data: p,
        coords: p.realGps
      }));

    const parcels = sampleDistrictBuildings
      .filter(b => b.parcelNumber.toLowerCase().includes(q) || b.subdivision.toLowerCase().includes(q) || b.typeName.toLowerCase().includes(q))
      .map(b => ({
        type: 'parcel' as const,
        id: b.id,
        title: `${b.parcelNumber} (${b.typeName})`,
        subtitle: `${b.subdivision} • ${b.areaM2}م²`,
        data: b,
        coords: PARCEL_GEO_COORDS[b.id] || { lat: 24.8452, lng: 46.6712 }
      }));

    const deals = sampleLiveDeals
      .filter(deal => deal.dealNumber.toLowerCase().includes(q) || deal.district.toLowerCase().includes(q))
      .map(deal => ({
        type: 'deal' as const,
        id: deal.id,
        title: `صفقة ${deal.dealNumber}`,
        subtitle: `حي ${deal.district} • ${deal.totalPrice.toLocaleString()} ر.س`,
        data: deal,
        coords: DEAL_GEO_COORDS[deal.id] || { lat: 24.8430, lng: 46.6705 }
      }));

    return [...districts, ...projects, ...parcels, ...deals].slice(0, 8);
  }, [searchQuery, nearbyProjects]);

  const handleSelectSearchResult = (item: any) => {
    setSearchQuery(item.title);
    setIsSearchFocused(false);
    if (item.type === 'district') {
      setExploreMode('market');
      handleSelectItemWithZoom({ type: 'district', data: item.data });
    } else if (item.type === 'project') {
      setExploreMode('monitoring');
      handleSelectItemWithZoom({ type: 'project', data: item.data });
    } else if (item.type === 'parcel') {
      setExploreMode('planning');
      handleSelectItemWithZoom({ type: 'parcel', data: item.data });
    } else if (item.type === 'deal') {
      setExploreMode('market');
      setMarketSubFilter('deals');
      handleSelectItemWithZoom({ type: 'deal', data: item.data });
    }
  };

  const handleSelectRegion = (region: RegionQuickTarget) => {
    setSelectedRegionId(region.id);
    handleFlyToTarget(region.coords[0], region.coords[1], region.zoom);
  };

  const handleCenterOnUser = () => {
    if (!userCoords) {
      requestLocation();
      return;
    }
    handleFlyToTarget(userCoords.lat, userCoords.lng, 13);
  };

  const handleResetView = () => {
    setSelectedRegionId('all');
    handleFlyToTarget(24.2, 44.5, 5);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);
  };

  return (
    <section 
      id="saudi-interactive-map" 
      className={`py-2 transition-all duration-300 motion-reduce:transition-none ${
        isFullscreen ? 'fixed inset-0 z-50 p-3 bg-slate-950 flex flex-col' : 'relative'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className={`max-w-7xl mx-auto w-full ${isFullscreen ? 'h-full flex flex-col max-w-none' : 'space-y-4'}`}>

        {/* =========================================================================
            TOP BAR: THREE CLEAN EXPLORATION MODES & CONTEXT FILTERS
            ========================================================================= */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-xs space-y-3">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input with Search Icon */}
            <div className="relative flex-1">
              <div className="relative flex items-center">
                <Search className={`w-[18px] h-[18px] text-slate-400 absolute ${isAr ? 'right-3.5' : 'left-3.5'} pointer-events-none stroke-[1.8]`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={t(
                    'ابحث عن حي، مدينة، قطعة أرض، مشروع، أو صفقة...',
                    'Search for district, city, parcel, project, or deal...'
                  )}
                  className={`w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl py-2 ${
                    isAr ? 'pr-10 pl-8' : 'pl-10 pr-8'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner`}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchFocused(false);
                    }}
                    className={`absolute ${isAr ? 'left-2.5' : 'right-2.5'} text-slate-400 hover:text-slate-600 dark:hover:text-white p-1`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown with clean Lucide icons (no emojis) */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full inset-x-0 mt-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto">
                  <div className="p-1.5 space-y-0.5">
                    {searchResults.map((item, idx) => (
                      <button
                        key={`${item.type}-${item.id}-${idx}`}
                        onClick={() => handleSelectSearchResult(item)}
                        className="w-full text-start p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            {item.type === 'district' ? <MapPin className="w-4 h-4 stroke-[1.8]" /> :
                             item.type === 'project' ? <Building2 className="w-4 h-4 stroke-[1.8]" /> :
                             item.type === 'parcel' ? <MapPinned className="w-4 h-4 stroke-[1.8]" /> :
                             <ReceiptText className="w-4 h-4 stroke-[1.8]" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.subtitle}</div>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {item.type === 'district' ? t('حي', 'District') :
                           item.type === 'project' ? t('مشروع', 'Project') :
                           item.type === 'parcel' ? t('قطعة', 'Parcel') : t('صفقة', 'Deal')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* THREE CLEAN EXPLORATION MODES (one active at a time) */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 overflow-x-auto no-scrollbar">
              
              {/* Mode 1: السوق العقاري */}
              <button
                onClick={() => {
                  setExploreMode('market');
                  if (!selectedItem || selectedItem.type !== 'district') {
                    handleSelectItemWithZoom({ type: 'district', data: saudiDistricts[0] });
                  }
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  exploreMode === 'market'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-white/80 dark:hover:bg-slate-700'
                }`}
              >
                <TrendingUp className="w-4 h-4 stroke-[1.8]" />
                <span>{t('السوق العقاري', 'Real Estate Market')}</span>
              </button>

              {/* Mode 2: الأراضي والتخطيط */}
              <button
                onClick={() => {
                  setExploreMode('planning');
                  if (!selectedItem || selectedItem.type !== 'parcel') {
                    handleSelectItemWithZoom({ type: 'parcel', data: sampleDistrictBuildings[0] });
                  }
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  exploreMode === 'planning'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-white/80 dark:hover:bg-slate-700'
                }`}
              >
                <Layers className="w-4 h-4 stroke-[1.8]" />
                <span>{t('الأراضي والتخطيط', 'Land & Planning')}</span>
              </button>

              {/* Mode 3: المشروعات والرصد */}
              <button
                onClick={() => {
                  setExploreMode('monitoring');
                  if (!selectedItem || selectedItem.type !== 'project') {
                    handleSelectItemWithZoom({ type: 'project', data: nearbyProjects[0] });
                  }
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  exploreMode === 'monitoring'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-white/80 dark:hover:bg-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4 stroke-[1.8]" />
                <span>{t('المشروعات والرصد', 'Projects & Monitoring')}</span>
              </button>

            </div>

          </div>

          {/* Sub-Context Controls Bar: Shows ONLY what applies to the selected mode */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            
            {/* Mode 1 Context: Market Filters */}
            {exploreMode === 'market' && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.8] text-blue-600" />
                  <span>{t('تصفية السوق:', 'Filter Market:')}</span>
                </span>
                <button
                  onClick={() => setMarketSubFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    marketSubFilter === 'all' 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {t('الكل (أحياء وصفقات)', 'All (Districts & Deals)')}
                </button>
                <button
                  onClick={() => setMarketSubFilter('residential')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    marketSubFilter === 'residential' 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {t('المتر السكني', 'Residential / m²')}
                </button>
                <button
                  onClick={() => setMarketSubFilter('commercial')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    marketSubFilter === 'commercial' 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {t('المتر التجاري', 'Commercial / m²')}
                </button>
                <button
                  onClick={() => setMarketSubFilter('deals')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    marketSubFilter === 'deals' 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {t('صفقات مسجلة', 'Registered Deals')}
                </button>
              </div>
            )}

            {/* Mode 2 Context: Planning Overlays */}
            {exploreMode === 'planning' && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.8] text-blue-600" />
                  <span>{t('طبقات التخطيط:', 'Planning Layers:')}</span>
                </span>
                <button
                  onClick={() => setShowMetroOverlay(!showMetroOverlay)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    showMetroOverlay 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 stroke-[1.8]" />
                  <span>{t('مسارات المترو', 'Metro Lines')}</span>
                  {showMetroOverlay && <Check className="w-3 h-3 ml-0.5" />}
                </button>
                <button
                  onClick={() => setShowUtilitiesOverlay(!showUtilitiesOverlay)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    showUtilitiesOverlay 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Layers3 className="w-3.5 h-3.5 stroke-[1.8]" />
                  <span>{t('شبكات المرافق', 'Utilities')}</span>
                  {showUtilitiesOverlay && <Check className="w-3 h-3 ml-0.5" />}
                </button>
              </div>
            )}

            {/* Mode 3 Context: Monitoring Categories (No emojis, clean line icons) */}
            {exploreMode === 'monitoring' && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.8] text-blue-600" />
                  <span>{t('تصنيف المشاريع:', 'Filter Projects:')}</span>
                </span>
                {CATEGORY_OPTIONS.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeCategory === cat.id 
                          ? 'bg-blue-600 text-white shadow-xs' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <CatIcon className="w-3.5 h-3.5 stroke-[1.8]" />
                      <span>{isAr ? cat.nameAr : cat.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Quick Regional Navigation */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">{t('الانتقال السريع:', 'Jump:')}</span>
              {saudiRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleSelectRegion(region)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedRegionId === region.id
                      ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  {region.capitalAr}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* =========================================================================
            MAP CANVAS & DETAILS PANEL
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* MAP CANVAS (8 Columns on desktop, 12 if fullscreen) */}
          <div className={`${isFullscreen ? 'w-full flex-1' : 'lg:col-span-8'} space-y-2`}>
            
            <div className={`relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md ${
              isFullscreen ? 'h-full rounded-none border-0' : 'h-[560px] sm:h-[640px] lg:h-[680px]'
            }`}>
              
              {/* Leaflet DOM Anchor */}
              <div ref={mapContainerRef} className="w-full h-full z-0 cursor-grab active:cursor-grabbing" />

              {/* Action Prompt Toast */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>
                  {exploreMode === 'market' && t('انقر على أي حي أو صفقة لعرض تفاصيل الأسعار والعوائد', 'Click any district or deal to view market analytics')}
                  {exploreMode === 'planning' && t('انقر على قطعة أرض لفحص الكاداستر والترخيص والخدمات', 'Click any land parcel to inspect zoning & services')}
                  {exploreMode === 'monitoring' && t('انقر على أي مشروع لمعاينة نسب الإنجاز والرصد الميداني', 'Click any mega project to inspect satellite & field data')}
                </span>
              </div>

              {/* Top Control Bar: Basemap Switcher & Labels Toggle (Map, Satellite, Mountain) */}
              <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} z-20 flex flex-col gap-2`}>
                
                {/* Basemap Switcher: Street -> Map, Satellite -> Satellite, Terrain -> Mountain */}
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setActiveBaseLayer('street')}
                    className={`px-2.5 py-1.5 rounded-xl font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      activeBaseLayer === 'street'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={t('خريطة شوارع مبسطة', 'Street Map')}
                  >
                    <Map className="w-4 h-4 stroke-[1.8]" />
                    <span>{t('شوارع', 'Streets')}</span>
                    {activeBaseLayer === 'street' && <Check className="w-3 h-3 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setActiveBaseLayer('satellite')}
                    className={`px-2.5 py-1.5 rounded-xl font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      activeBaseLayer === 'satellite'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={t('صور الأقمار الصناعية الفضائية', 'Satellite Imagery')}
                  >
                    <Satellite className="w-4 h-4 stroke-[1.8]" />
                    <span>{t('فضائي', 'Satellite')}</span>
                    {activeBaseLayer === 'satellite' && <Check className="w-3 h-3 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setActiveBaseLayer('topo')}
                    className={`px-2.5 py-1.5 rounded-xl font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      activeBaseLayer === 'topo'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={t('الخريطة الطبوغرافية والتضاريس', 'Topographic Map')}
                  >
                    <Mountain className="w-4 h-4 stroke-[1.8]" />
                    <span>{t('تضاريس', 'Topo')}</span>
                    {activeBaseLayer === 'topo' && <Check className="w-3 h-3 ml-0.5" />}
                  </button>
                </div>

                {/* Labels & Boundaries Toggle: Layers3 icon */}
                <button
                  onClick={() => setShowLabels(!showLabels)}
                  className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all ${
                    showLabels 
                      ? 'text-blue-600 dark:text-blue-400 border-blue-400 dark:border-blue-700' 
                      : 'text-slate-500 border-slate-200 dark:border-slate-700 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Layers3 className="w-4 h-4 stroke-[1.8]" />
                  <span>{showLabels ? t('الحدود: مفعّلة', 'Labels: ON') : t('الحدود: مخفية', 'Labels: OFF')}</span>
                </button>
              </div>

              {/* Grouped Controls: Plus, Minus, RotateCcw, LocateFixed, Maximize2 */}
              <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-20 flex flex-col gap-1.5`}>
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md flex flex-col items-center gap-1">
                  
                  {/* Zoom In: Plus */}
                  <button
                    onClick={() => mapInstanceRef.current?.zoomIn()}
                    className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                    title={t('تكبير الخريطة (+)', 'Zoom In')}
                  >
                    <Plus className="w-4 h-4 stroke-[1.8]" />
                  </button>

                  {/* Visible Zoom Level Indicator */}
                  <div 
                    className="w-8 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-300 text-center select-none"
                    title={t(`مستوى التكبير الحالي: ${currentZoom}`, `Current Zoom Level: ${currentZoom}`)}
                  >
                    {currentZoom}x
                  </div>

                  {/* Zoom Out: Minus */}
                  <button
                    onClick={() => mapInstanceRef.current?.zoomOut()}
                    className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                    title={t('تصغير الخريطة (-)', 'Zoom Out')}
                  >
                    <Minus className="w-4 h-4 stroke-[1.8]" />
                  </button>

                  <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 my-0.5" />

                  {/* Reset View Button: RotateCcw */}
                  <button
                    onClick={handleResetView}
                    className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                    title={t('إعادة الضبط لنظرة المملكة الشاملة', 'Reset to Saudi Arabia Overview')}
                  >
                    <RotateCcw className="w-4 h-4 stroke-[1.8]" />
                  </button>

                  {/* Locate Me Button: LocateFixed */}
                  <button
                    onClick={handleCenterOnUser}
                    className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    title={t('التركيز على موقعي الجغرافي', 'Locate Me')}
                  >
                    <LocateFixed className="w-4 h-4 stroke-[1.8]" />
                  </button>

                  {/* Fullscreen Toggle: Maximize2 */}
                  <button
                    onClick={toggleFullscreen}
                    className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                    title={isFullscreen ? t('إنهاء ملء الشاشة', 'Exit Fullscreen') : t('ملء الشاشة', 'Fullscreen')}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4 stroke-[1.8]" /> : <Maximize2 className="w-4 h-4 stroke-[1.8]" />}
                  </button>

                </div>
              </div>

              {/* Dynamic Simple Map Legend (No emojis, clean indicators) */}
              <div className={`absolute bottom-4 ${isAr ? 'left-4' : 'right-4'} z-20 hidden md:flex items-center gap-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs shadow-md`}>
                <span className="font-bold text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 stroke-[1.8] text-blue-600" />
                  {t('المفتاح:', 'Legend:')}
                </span>

                {exploreMode === 'market' && (
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                      <span>{t('أحياء معتمدة', 'Districts')}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full border border-blue-600 bg-white"></span>
                      <span>{t('صفقات موثقة', 'Deals')}</span>
                    </span>
                  </div>
                )}

                {exploreMode === 'planning' && (
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-blue-600"></span>
                      <span>{t('قطع أراضي المخطط', 'Cadastral Parcels')}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-1 border-t-2 border-dashed border-blue-600"></span>
                      <span>{t('مسارات المترو', 'Metro Lines')}</span>
                    </span>
                  </div>
                )}

                {exploreMode === 'monitoring' && (
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                      <span>{t('مشاريع قيد الإنجاز', 'Projects')}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Coordinates Datum HUD */}
              <div className={`absolute bottom-4 ${isAr ? 'right-4' : 'left-4'} z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-mono shadow-md flex items-center gap-2.5`}>
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Crosshair className="w-3.5 h-3.5 stroke-[1.8] animate-pulse" />
                  <span>
                    {mouseCoords ? `${mouseCoords.lat}° N, ${mouseCoords.lng}° E` : '24.200° N, 44.500° E'}
                  </span>
                </div>
                <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
                <span className="text-[10px] text-slate-500 hidden sm:inline">WGS84</span>
              </div>

              {/* REQUIRED EMPTY STATE INSIDE MAP PANEL */}
              {isEmptyResults && (
                <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center shadow-xl space-y-3.5">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
                      <Search className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {isAr ? 'لا توجد عناصر مطابقة' : 'No matching items'}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isAr 
                        ? 'لا توجد عناصر مطابقة. يرجى مسح أو تعديل خيارات التصفية للمتابعة.' 
                        : 'No matching items. Clear or change filters to continue.'}
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      {isAr ? 'مسح التصفية وعرض الكل' : 'Clear Filters & Show All'}
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* =========================================================================
              FOCUSED INFORMATION PANEL (لوحة تفاصيل العنصر المختار - بدون إيموجي)
              ========================================================================= */}
          {!isFullscreen && (
            <div className="lg:col-span-4 space-y-4">
              
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 transition-all">
                
                {/* 1. Header of selected item */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {selectedItem?.type === 'district' ? t('حي عقاري معتمد', 'Certified District') :
                       selectedItem?.type === 'deal' ? t('صفقة موثقة رسمياً', 'Verified Deal') :
                       selectedItem?.type === 'parcel' ? t('قطعة أرض ومخطط', 'Cadastral Parcel') :
                       selectedItem?.type === 'project' ? t('مشروع قيد الرصد', 'Monitored Project') : t('عنصر محدد', 'Selected')}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                      {selectedItem?.type === 'district' && <span>حي {selectedItem.data.name}</span>}
                      {selectedItem?.type === 'deal' && <span>{selectedItem.data.propertyTypeName}</span>}
                      {selectedItem?.type === 'parcel' && <span>{selectedItem.data.typeName} ({selectedItem.data.parcelNumber})</span>}
                      {selectedItem?.type === 'project' && <span>{selectedItem.data.name}</span>}
                    </h3>
                  </div>

                  {selectedItem && (
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      title={t('إلغاء التحديد', 'Clear Selection')}
                    >
                      <X className="w-4 h-4 stroke-[1.8]" />
                    </button>
                  )}
                </div>

                {/* 2. Body based on selected item type (Strictly requested fields only) */}
                {selectedItem?.type === 'district' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 stroke-[1.8] text-blue-600 shrink-0" />
                        <span>{selectedItem.data.city} • {selectedItem.data.zoneType}</span>
                      </span>
                      <span className="text-blue-600 font-bold font-mono">+{selectedItem.data.yearlyChangePct}% {t('سنوياً', '/yr')}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('سعر المتر السكني', 'Price / m² (Res.)')}</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                          {selectedItem.data.avgPriceM2Residential.toLocaleString()} ر.س
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('سعر المتر التجاري', 'Price / m² (Comm.)')}</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                          {selectedItem.data.avgPriceM2Commercial.toLocaleString()} ر.س
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('العائد الإيجاري الصافي', 'Net Rental Yield')}</span>
                        <strong className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
                          {selectedItem.data.rentalYieldPct}%
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('عدد الصفقات الشهرية', 'Deal Count')}</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                          {selectedItem.data.dealsCountMonth} {t('صفقة', 'deals')}
                        </strong>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-300">
                      <strong>المشاريع والمحاور الحيوية المجاورة: </strong>
                      <span>{selectedItem.data.nearbyProjects.join(' • ')}</span>
                    </div>

                    <button
                      onClick={() => {
                        setExploreMode('planning');
                        handleSelectItemWithZoom({ type: 'parcel', data: sampleDistrictBuildings[0] });
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                    >
                      <MapPinned className="w-4 h-4 stroke-[1.8]" />
                      <span>{t('استكشاف قطع الأراضي والمخطط (الكاداستر)', 'Inspect Cadastral Parcels')}</span>
                    </button>
                  </div>
                )}

                {selectedItem?.type === 'deal' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 stroke-[1.8] text-blue-600 shrink-0" />
                        <span>حي {selectedItem.data.district} • {selectedItem.data.city}</span>
                      </span>
                      <span className="font-mono text-slate-500">{selectedItem.data.date}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('إجمالي قيمة الصفقة', 'Total Price')}</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                          {selectedItem.data.totalPrice.toLocaleString()} ر.س
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('سعر المتر المربع', 'Price per m²')}</span>
                        <strong className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
                          {selectedItem.data.pricePerM2.toLocaleString()} ر.س
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('المساحة الموثقة', 'Area')}</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                          {selectedItem.data.areaM2} م²
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('المصدر الرسمي', 'Official Source')}</span>
                        <strong className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {selectedItem.data.source}
                        </strong>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
                      <div><strong>{t('رقم المخطط:', 'Subdivision:')} </strong>{selectedItem.data.subdivisionCode}</div>
                      <div><strong>{t('رقم القطعة:', 'Parcel No:')} </strong>{selectedItem.data.parcelNumber}</div>
                      <div><strong>{t('نوع الاستخدام:', 'Usage:')} </strong>{selectedItem.data.usage}</div>
                    </div>
                  </div>
                )}

                {selectedItem?.type === 'parcel' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPinned className="w-3.5 h-3.5 stroke-[1.8] text-blue-600 shrink-0" />
                        <span>{selectedItem.data.subdivision}</span>
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{selectedItem.data.parcelNumber}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('المساحة الإجمالية', 'Total Area')}</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                          {selectedItem.data.areaM2} م²
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('حالة التخطيط', 'Planning Status')}</span>
                        <strong className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {selectedItem.data.status}
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('التصنيف والارتفاع', 'Zoning & Floors')}</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                          {selectedItem.data.floors > 0 ? `${selectedItem.data.floors} أدوار` : t('أرض فضاء', 'Vacant')}
                        </strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t('الاستخدام المعتمد', 'Zoning')}</span>
                        <strong className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {selectedItem.data.typeName}
                        </strong>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5 text-[11px]">
                      <span className="font-bold text-slate-700 dark:text-slate-300 block">{t('جاهزية وتوصيل الخدمات المجاورة:', 'Nearby Services & Utilities:')}</span>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.8]" />
                          <span>كهرباء (SEC)</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.8]" />
                          <span>مياه (NWC)</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.8]" />
                          <span>شبكة الصرف</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.8]" />
                          <span>ألياف ضوئية 5G</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedItem?.type === 'project' && (
                  <div className="space-y-3 text-xs">
                    <div className="relative w-full rounded-xl overflow-hidden shadow-xs">
                      <ProjectCoverImage
                        src={selectedItem.data.previewImage}
                        alt={`${selectedItem.data.name} - ${selectedItem.data.city}`}
                        aspectRatioClass="aspect-16/9"
                        projectTitle={selectedItem.data.name}
                        city={selectedItem.data.city}
                        category={selectedItem.data.category}
                      />
                      <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[11px] text-white bg-slate-950/75 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 stroke-[2] text-blue-400" />
                          <span>{selectedItem.data.city}</span>
                        </span>
                        <span className="font-bold font-mono text-emerald-400">{selectedItem.data.progressPct}% {t('منجز', 'Done')}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 block">{t('المعدات', 'Machinery')}</span>
                        <strong className="text-xs font-bold text-slate-900 dark:text-white font-mono">{selectedItem.data.activeMachinery}</strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 block">{t('الكوادر', 'Workers')}</span>
                        <strong className="text-xs font-bold text-slate-900 dark:text-white font-mono">{selectedItem.data.activeWorkers}</strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-200/70 dark:border-slate-700">
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 block">{t('طلعات درون', 'Drones')}</span>
                        <strong className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">{selectedItem.data.dronesFlying}</strong>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>{t('تصنيف المشروع:', 'Category:')} </strong>
                      <span>{selectedItem.data.category}</span>
                    </div>

                    <button
                      onClick={() => setSelectedInspectionProject(selectedItem.data)}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 stroke-[1.8]" />
                      <span>{t('معاينة صور الرصد الفضائي والميداني', 'View Satellite & Field Imagery')}</span>
                    </button>
                  </div>
                )}

                {!selectedItem && (
                  <div className="py-8 text-center text-slate-400 space-y-2">
                    <MapPin className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 stroke-[1.5]" />
                    <p className="text-xs">
                      {t('انقر على أي عنصر على الخريطة لعرض بطاقة تفاصيله المعتمدة.', 'Click any item on the map to inspect its verified details.')}
                    </p>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

      </div>

      {/* FULL PROJECT INSPECTION MODAL */}
      {selectedInspectionProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          dir={isAr ? 'rtl' : 'ltr'}
          onClick={() => setSelectedInspectionProject(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 transition-all font-['Cairo'] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                    {selectedInspectionProject.code}
                  </span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {selectedInspectionProject.progressPct}% {t('نسبة الإنجاز', 'Progress')}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {selectedInspectionProject.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInspectionProject(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[1.8]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('التصوير الميداني للموقع:', 'Field Site Photo:')}</div>
                  <ProjectCoverImage 
                    src={selectedInspectionProject.previewImage} 
                    alt={`${selectedInspectionProject.name} - رصد ميداني`}
                    aspectRatioClass="aspect-16/9"
                    projectTitle={selectedInspectionProject.name}
                    city={selectedInspectionProject.city}
                    category={selectedInspectionProject.category}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('رصد الأقمار الصناعية (Time-Lapse):', 'Satellite Earth Observation:')}</div>
                  <ProjectCoverImage 
                    src={selectedInspectionProject.satelliteImage || selectedInspectionProject.previewImage} 
                    alt={`${selectedInspectionProject.name} - تصوير فضائي`}
                    aspectRatioClass="aspect-16/9"
                    projectTitle={selectedInspectionProject.name}
                    city={selectedInspectionProject.city}
                    category={selectedInspectionProject.category}
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr ? selectedInspectionProject.description : selectedInspectionProject.descriptionEn}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedInspectionProject(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                {t('إغلاق', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
