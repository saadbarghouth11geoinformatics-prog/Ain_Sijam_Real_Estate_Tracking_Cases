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
  MapPin,
  LocateFixed
} from 'lucide-react';
import { ConstructionSiteItem } from '../data/constructionSitesData';

interface SaudiGisSatelliteMapProps {
  sites: ConstructionSiteItem[];
  selectedSiteId: string;
  onSelectSite: (siteId: string) => void;
  isAr: boolean;
  userCoords?: { lat: number; lng: number } | null;
}

export const SaudiGisSatelliteMap: React.FC<SaudiGisSatelliteMapProps> = ({
  sites,
  selectedSiteId,
  onSelectSite,
  isAr,
  userCoords,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const userMarkerRef = useRef<L.LayerGroup | null>(null);
  const satelliteLayerRef = useRef<L.TileLayer | null>(null);
  const streetLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);

  const [activeBaseLayer, setActiveBaseLayer] = useState<'satellite' | 'street'>('satellite');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Default Saudi Arabia center & zoom (matches the exact view in user screenshot)
  const defaultCenter: [number, number] = [24.2, 44.5];
  const defaultZoom = 5;

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

    // 1. Esri World Imagery (Satellite Basemap - identical to user screenshot)
    const satLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution: 'Esri, Maxar, Earthstar Geographics',
      }
    );
    satelliteLayerRef.current = satLayer;
    satLayer.addTo(map);

    // 2. OpenStreetMap (Standard OSM Tiles)
    const streetLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }
    );
    streetLayerRef.current = streetLayer;

    // 3. Esri Boundaries and Places (National borders, cities, place names - identical to user screenshot)
    const labelsLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
      }
    );
    labelsLayerRef.current = labelsLayer;
    labelsLayer.addTo(map);

    const userGrp = L.layerGroup().addTo(map);
    userMarkerRef.current = userGrp;

    mapInstanceRef.current = map;

    // Force map to invalidate size once mounted
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Base Layer Switch (Satellite vs OpenStreetMap)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (activeBaseLayer === 'satellite') {
      if (streetLayerRef.current && map.hasLayer(streetLayerRef.current)) {
        map.removeLayer(streetLayerRef.current);
      }
      if (satelliteLayerRef.current && !map.hasLayer(satelliteLayerRef.current)) {
        satelliteLayerRef.current.addTo(map);
      }
      if (showLabels && labelsLayerRef.current && !map.hasLayer(labelsLayerRef.current)) {
        labelsLayerRef.current.addTo(map);
      }
    } else {
      if (satelliteLayerRef.current && map.hasLayer(satelliteLayerRef.current)) {
        map.removeLayer(satelliteLayerRef.current);
      }
      if (labelsLayerRef.current && map.hasLayer(labelsLayerRef.current)) {
        map.removeLayer(labelsLayerRef.current);
      }
      if (streetLayerRef.current && !map.hasLayer(streetLayerRef.current)) {
        streetLayerRef.current.addTo(map);
      }
    }
  }, [activeBaseLayer, showLabels]);

  // Toggle Boundaries and Labels Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !labelsLayerRef.current) return;
    if (activeBaseLayer === 'street') return; // OpenStreetMap already has full labels

    if (showLabels) {
      if (!mapInstanceRef.current.hasLayer(labelsLayerRef.current)) {
        labelsLayerRef.current.addTo(mapInstanceRef.current);
      }
    } else {
      if (mapInstanceRef.current.hasLayer(labelsLayerRef.current)) {
        mapInstanceRef.current.removeLayer(labelsLayerRef.current);
      }
    }
  }, [showLabels, activeBaseLayer]);

  // Update Markers whenever sites or selectedSiteId change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    (Object.values(markersRef.current) as L.Marker[]).forEach((m) => m.remove());
    markersRef.current = {};

    // Helper to generate the exact red circle with black border & black dot icon from user screenshot
    const createEsriMarkerIcon = (site: ConstructionSiteItem, isSelected: boolean) => {
      return L.divIcon({
        className: 'esri-gis-marker-pin',
        html: `
          <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${
              isSelected
                ? '<div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: rgba(56, 189, 248, 0.45); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>'
                : ''
            }
            <div style="
              width: ${isSelected ? '16px' : '12px'};
              height: ${isSelected ? '16px' : '12px'};
              background-color: #d90429;
              border: 2px solid #000000;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 1px 4px rgba(0,0,0,0.8);
              transition: all 0.2s ease;
            ">
              <div style="
                width: ${isSelected ? '4px' : '3px'};
                height: ${isSelected ? '4px' : '3px'};
                background-color: #000000;
                border-radius: 50%;
              "></div>
            </div>
            ${
              isSelected
                ? `<div style="position: absolute; top: 100%; margin-top: 3px; background: rgba(15, 23, 42, 0.95); color: #fff; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; white-space: nowrap; border: 1px solid #38bdf8; box-shadow: 0 4px 10px rgba(0,0,0,0.5); z-index: 1000; pointer-events: none;">#${site.objectId} ${site.city}</div>`
                : ''
            }
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
    };

    sites.forEach((site) => {
      const isSelected = site.id === selectedSiteId;
      const icon = createEsriMarkerIcon(site, isSelected);
      const marker = L.marker([site.realGps.lat, site.realGps.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 100,
      });

      marker.bindTooltip(
        `
        <div style="font-family: 'Cairo', system-ui, sans-serif; font-size: 11px; padding: 4px; text-align: ${isAr ? 'right' : 'left'}; direction: ${isAr ? 'rtl' : 'ltr'}; width: 170px;">
          <div style="width: 100%; height: 68px; border-radius: 6px; overflow: hidden; margin-bottom: 5px; background: #0f172a;">
            <img src="${site.previewImage}" alt="" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
          </div>
          <div style="font-weight: 800; color: #0284c7; display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 2px;">
            <span>#${site.objectId} ${site.city}</span>
            <span style="font-size: 9px; background: #e0f2fe; color: #0369a1; padding: 1px 4px; border-radius: 4px; font-weight: 700;">${site.code}</span>
          </div>
          <div style="color: #0f172a; font-size: 10px; font-weight: 700; line-height: 1.3;">
            ${isAr ? site.name : (site.nameEn || site.name)}
          </div>
        </div>
      `,
        {
          direction: 'top',
          offset: [0, -10],
          opacity: 0.98,
        }
      );

      marker.on('click', () => {
        onSelectSite(site.id);
      });

      marker.addTo(map);
      markersRef.current[site.id] = marker;
    });
  }, [sites, selectedSiteId, isAr, onSelectSite]);

  // Update User Location Marker if available
  useEffect(() => {
    const map = mapInstanceRef.current;
    const userGrp = userMarkerRef.current;
    if (!map || !userGrp) return;

    userGrp.clearLayers();
    if (!userCoords) return;

    const userPulseIcon = L.divIcon({
      className: 'user-geo-radar-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      html: `
        <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; pointer-events: none;">
          <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(14, 165, 233, 0.3); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 16px; height: 16px; border-radius: 50%; background: #0284c7; border: 2.5px solid #ffffff; box-shadow: 0 0 10px #0284c7;"></div>
          <div style="position: absolute; bottom: -18px; white-space: nowrap; background: rgba(15, 23, 42, 0.9); color: #38bdf8; font-size: 9px; font-weight: bold; padding: 1px 6px; border-radius: 10px; border: 1px solid rgba(56, 189, 248, 0.4);">
            ${isAr ? 'موقعك الحالي' : 'Your Location'}
          </div>
        </div>
      `,
    });

    const marker = L.marker([userCoords.lat, userCoords.lng], {
      icon: userPulseIcon,
      zIndexOffset: 1200,
    });
    marker.addTo(userGrp);
  }, [userCoords, isAr]);

  // Handle map controls
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetKingdomView = () => {
    mapInstanceRef.current?.flyTo(defaultCenter, defaultZoom, { duration: 1.2 });
  };

  const handleFocusSelectedSite = () => {
    const sel = sites.find((s) => s.id === selectedSiteId);
    if (sel && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([sel.realGps.lat, sel.realGps.lng], 10, { duration: 1.2 });
    }
  };

  const handleFocusUserLocation = () => {
    if (userCoords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([userCoords.lat, userCoords.lng], 12, { duration: 1.2 });
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)]' : 'h-full min-h-[480px]'
      }`}
    >
      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="w-full h-full bg-[#1e293b]" />

      {/* Top Left Status Badge (ArcGIS / OpenStreetMap) */}
      <div
        className={`absolute top-3 ${
          isAr ? 'right-3' : 'left-3'
        } z-[400] flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-white text-xs shadow-lg`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black animate-pulse"></span>
        <span className="font-bold text-slate-100">
          {activeBaseLayer === 'street'
            ? (isAr ? 'خريطة OpenStreetMap الحية للشوارع' : 'OpenStreetMap Live Streets')
            : (isAr ? 'خريطة الأقمار الصناعية للمملكة (ArcGIS Satellite)' : 'Kingdom Satellite Imagery (ArcGIS)')
          }
        </span>
        <span className="text-[10px] text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded font-mono border border-sky-800">
          {activeBaseLayer === 'street' ? 'OSM' : 'WGS84'}
        </span>
      </div>

      {/* Top Right / Map Action Controls */}
      <div
        className={`absolute top-3 ${
          isAr ? 'left-3' : 'right-3'
        } z-[400] flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-lg`}
      >
        {/* Street vs Satellite Switcher */}
        <button
          onClick={() => setActiveBaseLayer(activeBaseLayer === 'satellite' ? 'street' : 'satellite')}
          className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold ${
            activeBaseLayer === 'street'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title={isAr ? 'التبديل إلى خريطة الشوارع OpenStreetMap' : 'Switch to OpenStreetMap'}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[11px]">
            {activeBaseLayer === 'street' 
              ? (isAr ? 'شوارع (OSM)' : 'OSM')
              : (isAr ? 'شوارع' : 'Streets')
            }
          </span>
        </button>

        {/* User Location Button */}
        {userCoords && (
          <button
            onClick={handleFocusUserLocation}
            className="p-1.5 rounded-lg bg-sky-600/30 text-sky-300 hover:bg-sky-600 hover:text-white transition-colors flex items-center gap-1 text-xs border border-sky-500/40"
            title={isAr ? 'التركيز على موقعي الحالي' : 'Focus on my location'}
          >
            <LocateFixed className="w-4 h-4 text-sky-300" />
            <span className="hidden sm:inline text-[11px] font-bold">
              {isAr ? 'موقعي' : 'My GPS'}
            </span>
          </button>
        )}

        <button
          onClick={handleFocusSelectedSite}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
          title={isAr ? 'التركيز على الموقع المحدد' : 'Focus on selected site'}
        >
          <Crosshair className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline text-[11px] font-bold">
            {isAr ? 'الموقع المحدد' : 'Target'}
          </span>
        </button>

        <button
          onClick={handleResetKingdomView}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
          title={isAr ? 'عرض المملكة بالكامل' : 'Full Kingdom view'}
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline text-[11px] font-bold">
            {isAr ? 'المملكة' : 'Kingdom'}
          </span>
        </button>

        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
            showLabels
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title={isAr ? 'إظهار/إخفاء أسماء المدن والحدود' : 'Toggle borders and labels'}
        >
          <Layers className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">
            {isAr ? 'التسميات' : 'Labels'}
          </span>
        </button>

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title={isFullscreen ? (isAr ? 'تصغير' : 'Exit Fullscreen') : (isAr ? 'ملء الشاشة' : 'Fullscreen')}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Zoom Controls */}
      <div
        className={`absolute bottom-4 ${
          isAr ? 'left-4' : 'right-4'
        } z-[400] flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 shadow-xl`}
      >
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
          title={isAr ? 'تكبير' : 'Zoom in'}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
          title={isAr ? 'تصغير' : 'Zoom out'}
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Legend matching User's screenshot */}
      <div
        className={`absolute bottom-4 ${
          isAr ? 'right-4' : 'left-4'
        } z-[400] bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-slate-300 shadow-xl space-y-1`}
      >
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#d90429] border-2 border-black flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-black"></div>
          </div>
          <span className="font-bold text-white">
            {isAr ? 'مواقع البناء والمشاريع المرصودة (24 موقعاً)' : 'Tracked Construction Sites (24 Sites)'}
          </span>
        </div>
        <div className="text-[10px] text-slate-400">
          {isAr ? 'انقر على أي نقطة حمراء لاستعراض بيانات الموقع' : 'Click any red point to view site telemetry'}
        </div>
      </div>
    </div>
  );
};
