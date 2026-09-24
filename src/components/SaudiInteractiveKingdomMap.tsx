import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Crosshair, 
  Maximize2, 
  Minimize2,
  Compass,
  Globe,
  Map as MapIcon,
  Navigation,
  LocateFixed,
  MapPin,
  HardHat,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Building2,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  useUserGeolocation, 
  PRESET_LOCATIONS, 
  ProjectWithDistance, 
  formatDistance 
} from '../hooks/useUserGeolocation';
import { ConstructionSiteItem } from '../data/constructionSitesData';

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
  { id: 'riyadh', nameAr: 'مدينة الرياض (الرئيسية)', nameEn: 'Riyadh City (Default)', coords: [24.7136, 46.6753], zoom: 11, capitalAr: 'مدينة الرياض', capitalEn: 'Riyadh City' },
  { id: 'all', nameAr: 'المملكة كاملة', nameEn: 'All Kingdom', coords: [24.2, 44.5], zoom: 5, capitalAr: 'نظرة شاملة', capitalEn: 'Overview' },
  { id: 'makkah', nameAr: 'منطقة مكة المكرمة', nameEn: 'Makkah & Jeddah', coords: [21.4858, 39.1925], zoom: 9, capitalAr: 'مكة وجدة', capitalEn: 'Makkah & Jeddah' },
  { id: 'eastern', nameAr: 'المنطقة الشرقية', nameEn: 'Eastern Province', coords: [26.4207, 50.0888], zoom: 9, capitalAr: 'الدمام والخبر', capitalEn: 'Dammam & Khobar' },
  { id: 'madinah', nameAr: 'منطقة المدينة المنورة', nameEn: 'Madinah Region', coords: [24.4686, 39.6142], zoom: 9, capitalAr: 'المدينة المنورة', capitalEn: 'Madinah City' },
  { id: 'tabuk', nameAr: 'منطقة تبوك ونيوم', nameEn: 'Tabuk & NEOM', coords: [28.3835, 36.5662], zoom: 8, capitalAr: 'مدينة تبوك ونيوم', capitalEn: 'Tabuk & NEOM' },
  { id: 'asir', nameAr: 'منطقة عسير', nameEn: 'Asir Region', coords: [18.2164, 42.5053], zoom: 9, capitalAr: 'أبها وخميس مشيط', capitalEn: 'Abha' },
  { id: 'qassim', nameAr: 'منطقة القصيم', nameEn: 'Qassim Region', coords: [26.3260, 43.9750], zoom: 9, capitalAr: 'بريدة وعنيزة', capitalEn: 'Buraidah' },
];

export const SaudiInteractiveKingdomMap: React.FC = () => {
  const { t, isAr } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  // Layer References
  const satelliteLayerRef = useRef<L.TileLayer | null>(null);
  const topoLayerRef = useRef<L.TileLayer | null>(null);
  const streetLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);

  // Markers Groups
  const userMarkerGroupRef = useRef<L.LayerGroup | null>(null);
  const projectsMarkerGroupRef = useRef<L.LayerGroup | null>(null);
  const projectMarkersMapRef = useRef<Record<string, L.Marker>>({});

  // Geolocation Hook
  const {
    coords: userCoords,
    status: geoStatus,
    errorMsg: geoErrorMsg,
    cityName: geoCityName,
    selectedPresetId,
    requestLocation,
    setPresetLocation,
    nearbyProjects,
  } = useUserGeolocation();

  // States
  const [activeBaseLayer, setActiveBaseLayer] = useState<'satellite' | 'topo' | 'street'>('street');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('riyadh');
  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number } | null>({ lat: 24.7136, lng: 46.6753 });
  const [currentZoom, setCurrentZoom] = useState<number>(11);
  const [isNearbyDrawerOpen, setIsNearbyDrawerOpen] = useState<boolean>(true);
  const [hasAutoCenteredUser, setHasAutoCenteredUser] = useState<boolean>(false);
  const [activeHighlightedProjectId, setActiveHighlightedProjectId] = useState<string | null>(null);

  // Default Focus
  const defaultCenter: [number, number] = [24.7136, 46.6753];
  const defaultZoom = 11;

  // Initialize Map
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
      {
        maxZoom: 19,
        attribution: 'Esri, Maxar, Earthstar Geographics',
      }
    );
    satelliteLayerRef.current = satLayer;

    // 2. Esri World Topo
    const topoLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
      }
    );
    topoLayerRef.current = topoLayer;

    // 3. OpenStreetMap
    const streetLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }
    );
    streetLayerRef.current = streetLayer;
    streetLayer.addTo(map);

    // 4. Esri Boundaries and Places
    const labelsLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
      }
    );
    labelsLayerRef.current = labelsLayer;
    labelsLayer.addTo(map);

    // Marker Layer Groups
    const userGroup = L.layerGroup().addTo(map);
    userMarkerGroupRef.current = userGroup;

    const projectsGroup = L.layerGroup().addTo(map);
    projectsMarkerGroupRef.current = projectsGroup;

    // Mouse Move Coordinates Tracking
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
  }, [activeBaseLayer]);

  // Handle Labels Toggle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !labelsLayerRef.current) return;

    if (showLabels) {
      if (activeBaseLayer !== 'street' && !map.hasLayer(labelsLayerRef.current)) {
        labelsLayerRef.current.addTo(map);
      }
    } else {
      if (map.hasLayer(labelsLayerRef.current)) {
        map.removeLayer(labelsLayerRef.current);
      }
    }
  }, [showLabels, activeBaseLayer]);

  // Update User Location Marker & Radar Pulse Ring
  useEffect(() => {
    const map = mapInstanceRef.current;
    const userGroup = userMarkerGroupRef.current;
    if (!map || !userGroup || !userCoords) return;

    userGroup.clearLayers();

    // High-Tech Radar Marker for User
    const userPulseIcon = L.divIcon({
      className: 'user-geo-radar-marker',
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; pointer-events: none;">
          <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(14, 165, 233, 0.25); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 28px; height: 28px; border-radius: 50%; background: rgba(2, 132, 199, 0.4); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
          <div style="position: relative; width: 18px; height: 18px; border-radius: 50%; background: #0284c7; border: 3px solid #ffffff; box-shadow: 0 0 14px rgba(2, 132, 199, 0.9);">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 4px; height: 4px; border-radius: 50%; background: #ffffff;"></div>
          </div>
          <div style="position: absolute; bottom: -20px; white-space: nowrap; background: rgba(15, 23, 42, 0.9); color: #38bdf8; font-family: Cairo, sans-serif; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.4); box-shadow: 0 2px 6px rgba(0,0,0,0.5);">
            ${isAr ? 'موقعك الحالي' : 'You are here'}
          </div>
        </div>
      `,
    });

    const userMarker = L.marker([userCoords.lat, userCoords.lng], {
      icon: userPulseIcon,
      zIndexOffset: 1000,
    });

    userMarker.bindPopup(`
      <div style="font-family: Cairo, sans-serif; direction: ${isAr ? 'rtl' : 'ltr'}; text-align: ${isAr ? 'right' : 'left'}; padding: 4px; min-width: 180px;">
        <div style="display: flex; align-items: center; gap: 6px; font-weight: bold; color: #0284c7; margin-bottom: 4px; font-size: 13px;">
          <span>📍</span>
          <span>${isAr ? 'موقعك الجغرافي الحالي' : 'Your Detected Location'}</span>
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">
          ${isAr ? `المدينة: ${geoCityName}` : `City: ${geoCityName}`}
          ${userCoords.accuracy ? `<br>${isAr ? `دقة الرصد: ±${Math.round(userCoords.accuracy)}م` : `Accuracy: ±${Math.round(userCoords.accuracy)}m`}` : ''}
        </div>
        <div style="font-size: 11px; font-weight: bold; color: #10b981; background: #ecfdf5; padding: 4px 8px; border-radius: 6px; border: 1px solid #a7f3d0;">
          ${isAr ? 'تم رصد المشاريع القريبة منك بنجاح' : 'Nearby projects mapped'}
        </div>
      </div>
    `);

    userMarker.addTo(userGroup);

    // Accuracy Circle
    const radius = Math.max(userCoords.accuracy || 800, 500);
    const accuracyCircle = L.circle([userCoords.lat, userCoords.lng], {
      radius: Math.min(radius, 3500),
      color: '#0284c7',
      fillColor: '#38bdf8',
      fillOpacity: 0.12,
      weight: 1.5,
      dashArray: '4, 6',
    });
    accuracyCircle.addTo(userGroup);

    // Auto center map on user on first load
    if (!hasAutoCenteredUser) {
      map.flyTo([userCoords.lat, userCoords.lng], 11, {
        duration: 1.4,
        easeLinearity: 0.25,
      });
      setHasAutoCenteredUser(true);
    }
  }, [userCoords, geoCityName, isAr, hasAutoCenteredUser]);

  // Update Project Markers with Real Distance from User
  useEffect(() => {
    const map = mapInstanceRef.current;
    const projectsGroup = projectsMarkerGroupRef.current;
    if (!map || !projectsGroup) return;

    projectsGroup.clearLayers();
    projectMarkersMapRef.current = {};

    nearbyProjects.forEach((project) => {
      const isHighlighted = activeHighlightedProjectId === project.id;
      const categoryColor = project.category === 'أبراج وأعمال خرسانية'
        ? '#0284c7'
        : project.category === 'بنية تحتية وأنفاق'
        ? '#10b981'
        : project.category === 'مدن سياحية ذكية'
        ? '#8b5cf6'
        : '#f59e0b';

      const projectIcon = L.divIcon({
        className: 'sigam-project-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;">
            ${isHighlighted ? `<div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: ${categoryColor}40; animation: ping 1.5s infinite;"></div>` : ''}
            <div style="width: 28px; height: 28px; border-radius: 50%; background: #0f172a; border: 2.5px solid ${categoryColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transform: ${isHighlighted ? 'scale(1.25)' : 'scale(1)'};">
              <span style="font-size: 11px; font-weight: 900; color: #ffffff; font-family: monospace;">${project.objectId}</span>
            </div>
            <div style="position: absolute; top: -14px; background: rgba(15, 23, 42, 0.95); color: #ffffff; border: 1px solid ${categoryColor}; border-radius: 8px; padding: 1px 5px; font-size: 9px; font-weight: bold; white-space: nowrap; font-family: monospace;">
              ${project.distanceFormattedAr}
            </div>
          </div>
        `,
      });

      const marker = L.marker([project.realGps.lat, project.realGps.lng], {
        icon: projectIcon,
      });

      // Custom Rich Popup
      marker.bindPopup(`
        <div style="font-family: Cairo, sans-serif; direction: ${isAr ? 'rtl' : 'ltr'}; text-align: ${isAr ? 'right' : 'left'}; padding: 6px; min-width: 240px; max-width: 280px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: bold; color: ${categoryColor}; background: ${categoryColor}15; padding: 2px 8px; border-radius: 12px; border: 1px solid ${categoryColor}40;">
              ${project.category}
            </span>
            <span style="font-size: 10px; font-family: monospace; color: #64748b;">
              ${project.code}
            </span>
          </div>

          <h4 style="font-size: 13px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; line-height: 1.3;">
            ${isAr ? project.name : project.nameEn}
          </h4>

          <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: bold; color: #0284c7; background: #f0f9ff; padding: 4px 8px; border-radius: 8px; margin-bottom: 8px;">
            <span>🚗</span>
            <span>${isAr ? `تبعد عن موقعك: ${project.distanceFormattedAr}` : `Distance from you: ${project.distanceFormattedEn}`}</span>
          </div>

          <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #475569; margin-bottom: 2px;">
              <span>${isAr ? 'نسبة الإنجاز الفعلية' : 'Actual Progress'}</span>
              <span style="font-weight: bold; font-family: monospace; color: #10b981;">${project.progressPct}%</span>
            </div>
            <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
              <div style="width: ${project.progressPct}%; height: 100%; background: linear-gradient(90deg, #0284c7, #10b981); border-radius: 4px;"></div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 10px; color: #334155; margin-bottom: 8px;">
            <div style="background: #f8fafc; padding: 4px; border-radius: 6px; text-align: center;">
              <span style="color: #64748b; display: block;">${isAr ? 'المعدات النشطة' : 'Machinery'}</span>
              <strong style="font-family: monospace; color: #0f172a;">${project.activeMachinery}</strong>
            </div>
            <div style="background: #f8fafc; padding: 4px; border-radius: 6px; text-align: center;">
              <span style="color: #64748b; display: block;">${isAr ? 'الكوادر العاملة' : 'Workers'}</span>
              <strong style="font-family: monospace; color: #0f172a;">${project.activeWorkers}</strong>
            </div>
          </div>

          <div style="font-size: 10px; color: #10b981; font-weight: bold; text-align: center; background: #ecfdf5; padding: 3px; border-radius: 6px;">
            🟢 ${isAr ? project.status : 'Active'}
          </div>
        </div>
      `);

      marker.addTo(projectsGroup);
      projectMarkersMapRef.current[project.id] = marker;
    });
  }, [nearbyProjects, activeHighlightedProjectId, isAr]);

  // Jump to Nearest Project
  const handleFocusOnProject = (project: ProjectWithDistance) => {
    setActiveHighlightedProjectId(project.id);
    const map = mapInstanceRef.current;
    if (!map) return;

    map.flyTo([project.realGps.lat, project.realGps.lng], 14, {
      duration: 1.2,
    });

    const marker = projectMarkersMapRef.current[project.id];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 1200);
    }
  };

  // Center on User's Current GPS Location
  const handleCenterOnUser = () => {
    const map = mapInstanceRef.current;
    if (!map || !userCoords) {
      requestLocation();
      return;
    }

    map.flyTo([userCoords.lat, userCoords.lng], 13, {
      duration: 1.3,
    });
  };

  // Quick-Jump to Region
  const handleSelectRegion = (region: RegionQuickTarget) => {
    setSelectedRegionId(region.id);
    const map = mapInstanceRef.current;
    if (!map) return;

    map.flyTo(region.coords, region.zoom, {
      duration: 1.4,
      easeLinearity: 0.25,
    });
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetView = () => {
    setSelectedRegionId('riyadh');
    mapInstanceRef.current?.flyTo(defaultCenter, defaultZoom, { duration: 1.2 });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);
  };

  const activeRegion = saudiRegions.find(r => r.id === selectedRegionId) || saudiRegions[0];
  const closestProject = nearbyProjects[0];

  return (
    <section 
      id="saudi-interactive-map" 
      className={`pt-2 sm:pt-4 pb-6 transition-colors ${
        isFullscreen ? 'fixed inset-0 z-50 p-4 bg-slate-950 flex flex-col' : 'relative'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 w-full ${isFullscreen ? 'h-full flex flex-col max-w-none px-0' : ''}`}>
        
        {/* Sleek Top Region Navigation & Telemetry Toolbar */}
        {!isFullscreen && (
          <div className="mb-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Region Quick Navigation Pills */}
            <div className="flex-1 overflow-x-auto no-scrollbar py-1">
              <div className="flex items-center gap-1.5 min-w-max">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 px-1">
                  <Navigation className="w-3.5 h-3.5 text-emerald-500" />
                  {t('المناطق:', 'Regions:')}
                </span>
                {saudiRegions.map((region) => {
                  const isSelected = selectedRegionId === region.id;
                  return (
                    <button
                      key={region.id}
                      onClick={() => handleSelectRegion(region)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-500/25 scale-[1.02]'
                          : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{isAr ? region.nameAr : region.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live GPS Telemetry Status Pill */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={handleCenterOnUser}
                className="flex items-center gap-2 bg-sky-50 dark:bg-sky-950/80 hover:bg-sky-100 dark:hover:bg-sky-900/80 px-3 py-1.5 rounded-xl border border-sky-300 dark:border-sky-800 text-xs font-bold text-sky-700 dark:text-sky-300 shadow-xs cursor-pointer transition-all"
                title={t('التركيز على موقعك الحالي على الخريطة', 'Center on your location')}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </span>
                <span>{t(`موقعك: ${geoCityName}`, `Your Location: ${geoCityName}`)}</span>
                <LocateFixed className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              </button>
            </div>
          </div>
        )}

        {/* Main Map Container Card */}
        <div className={`relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-xl ${
          isFullscreen ? 'flex-1 rounded-none border-0' : 'h-[580px] sm:h-[640px] lg:h-[700px]'
        }`}>
          
          {/* Leaflet DOM Anchor */}
          <div ref={mapContainerRef} className="w-full h-full z-0 cursor-grab active:cursor-grabbing" />

          {/* Top-Right Control Bar: Layer Switcher & Labels Toggle */}
          <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} z-20 flex flex-col gap-2`}>
            {/* Basemap Switcher */}
            <div className="bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700 shadow-lg flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveBaseLayer('satellite')}
                className={`px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeBaseLayer === 'satellite'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={t('صور الأقمار الصناعية الفضائية Esri World Imagery', 'Esri Satellite Imagery')}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t('فضائي', 'Satellite')}</span>
              </button>

              <button
                onClick={() => setActiveBaseLayer('topo')}
                className={`px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeBaseLayer === 'topo'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={t('الخريطة الطبوغرافية والتضاريس', 'Topographic & Relief Map')}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>{t('طبوغرافي', 'Topo')}</span>
              </button>

              <button
                onClick={() => setActiveBaseLayer('street')}
                className={`px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeBaseLayer === 'street'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={t('خريطة الشوارع المفتوحة والملاحة OpenStreetMap', 'OpenStreetMap Streets & Navigation')}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t('شوارع', 'Streets')}</span>
              </button>
            </div>

            {/* Labels & Boundaries Toggle */}
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700 text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-all ${
                showLabels ? 'text-emerald-400 border-emerald-600/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${showLabels ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
              <span>{showLabels ? t('الحدود والمدن (مفعلة)', 'Labels: ON') : t('الحدود والمدن (مخفية)', 'Labels: OFF')}</span>
            </button>
          </div>

          {/* Top-Left Control Bar: Zoom, User Location, Reset Controls */}
          <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-20 flex flex-col gap-1.5`}>
            <div className="bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700 shadow-lg flex flex-col gap-1">
              {/* Center on My Location Button */}
              <button
                onClick={handleCenterOnUser}
                className="w-8 h-8 rounded-xl bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md shadow-sky-600/30"
                title={t('التركيز على موقعي الحالي', 'Locate Me & Focus')}
              >
                <LocateFixed className="w-4 h-4 animate-pulse" />
              </button>

              <button
                onClick={handleZoomIn}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={t('تكبير الخريطة (+)', 'Zoom In')}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={t('تصغير الخريطة (-)', 'Zoom Out')}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetView}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
                title={t('إعادة الضبط للمملكة كاملة', 'Reset to Kingdom Overview')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 flex items-center justify-center transition-colors cursor-pointer"
                title={isFullscreen ? t('إنهاء ملء الشاشة', 'Exit Fullscreen') : t('ملء الشاشة', 'Fullscreen')}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* FLOATING INTERACTIVE NEARBY PROJECTS RADAR DRAWER */}
          <div className={`absolute bottom-14 ${isAr ? 'right-4' : 'left-4'} z-20 max-w-sm sm:max-w-md w-[calc(100%-2rem)] sm:w-auto transition-all`}>
            <div className="bg-slate-950/92 backdrop-blur-xl rounded-2xl border border-sky-500/30 shadow-2xl overflow-hidden text-white font-['Cairo']">
              
              {/* Header with Live Radar Pulse */}
              <div className="p-3 bg-gradient-to-r from-slate-900 via-sky-950/70 to-slate-900 border-b border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{t('المشاريع القريبة من موقعك', 'Projects Near Your Location')}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono font-normal">
                        {nearbyProjects.length} {t('موقعاً', 'sites')}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-300 flex items-center gap-1">
                      <span>{t(`📍 تم رصد موقعك: ${geoCityName}`, `📍 Location: ${geoCityName}`)}</span>
                      {closestProject && (
                        <span className="text-emerald-400 font-mono font-bold">
                          • {t(`الأقرب: ${closestProject.distanceFormattedAr}`, `Closest: ${closestProject.distanceFormattedEn}`)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={requestLocation}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-sky-300 transition-colors"
                    title={t('إعادة تحديد موقعي بالـ GPS', 'Refresh GPS Location')}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsNearbyDrawerOpen(!isNearbyDrawerOpen)}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {isNearbyDrawerOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              {isNearbyDrawerOpen && (
                <div className="p-3 space-y-2.5 max-h-72 overflow-y-auto custom-scrollbar">
                  
                  {/* Preset City Selector for Instant Location Simulation */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800 text-[11px]">
                    <span className="text-slate-400 shrink-0">{t('محاكاة الموقع:', 'Simulate City:')}</span>
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                      {PRESET_LOCATIONS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => setPresetLocation(preset.id)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors whitespace-nowrap ${
                            selectedPresetId === preset.id
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {preset.nameAr.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* List of Closest 4 Projects */}
                  <div className="space-y-2">
                    {nearbyProjects.slice(0, 4).map((project, idx) => (
                      <div
                        key={project.id}
                        onClick={() => handleFocusOnProject(project)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer text-start ${
                          activeHighlightedProjectId === project.id
                            ? 'bg-sky-950/70 border-sky-400 shadow-md shadow-sky-500/10'
                            : 'bg-slate-900/60 hover:bg-slate-900 border-white/5 hover:border-sky-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-500/30">
                            #{idx + 1} {project.category}
                          </span>
                          <span className="text-xs font-black font-mono text-emerald-400 flex items-center gap-1">
                            <span>🚗</span>
                            <span>{project.distanceFormattedAr}</span>
                          </span>
                        </div>

                        <h5 className="text-xs font-bold text-white line-clamp-1">
                          {isAr ? project.name : project.nameEn}
                        </h5>

                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{project.city}</span>
                          <span className="text-slate-300 font-mono">
                            {t('إنجاز:', 'Progress:')} <strong className="text-white">{project.progressPct}%</strong>
                          </span>
                          <span className="text-sky-300 hover:underline flex items-center gap-0.5">
                            <span>{t('انتقال', 'Fly to')}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Button to center on user */}
                  <button
                    onClick={handleCenterOnUser}
                    className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <LocateFixed className="w-3.5 h-3.5" />
                    <span>{t('التركيز على موقعي في الخريطة', 'Center Map on My Location')}</span>
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Bottom Coordinates & Geospatial Datum HUD */}
          <div className={`absolute bottom-4 ${isAr ? 'left-4' : 'right-4'} z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 text-white text-xs font-mono shadow-lg flex items-center gap-3`}>
            <div className="flex items-center gap-1.5 text-sky-400">
              <Crosshair className="w-3.5 h-3.5 animate-pulse" />
              <span>
                {mouseCoords ? `${mouseCoords.lat}° N, ${mouseCoords.lng}° E` : '24.200° N, 44.500° E'}
              </span>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <div className="text-slate-400 hidden sm:block text-[11px]">
              {t('الإسناد: WGS 84 / Ain el Abd', 'Datum: WGS 84')}
            </div>
          </div>

          {/* Bottom North Compass */}
          <div className={`absolute bottom-4 ${isAr ? 'right-4' : 'left-4'} z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700 text-emerald-400 text-xs font-mono shadow-lg flex items-center gap-1.5`}>
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span className="font-bold">N</span>
            <span className="text-[10px] text-slate-400">0.0°</span>
          </div>

        </div>

      </div>
    </section>
  );
};
