import { useState, useEffect, useCallback } from 'react';
import { ConstructionSiteItem, constructionSitesList } from '../data/constructionSitesData';

export interface UserCoords {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface ProjectWithDistance extends ConstructionSiteItem {
  distanceKm: number;
  distanceFormattedAr: string;
  distanceFormattedEn: string;
}

export interface PresetLocation {
  id: string;
  nameAr: string;
  nameEn: string;
  coords: UserCoords;
}

export const PRESET_LOCATIONS: PresetLocation[] = [
  { id: 'riyadh', nameAr: 'الرياض (حي الملقا/الصحافة)', nameEn: 'Riyadh (Al Malqa)', coords: { lat: 24.7876, lng: 46.6342, accuracy: 15 } },
  { id: 'jeddah', nameAr: 'جدة (الكورنيش والشمال)', nameEn: 'Jeddah (North Corniche)', coords: { lat: 21.5833, lng: 39.1667, accuracy: 20 } },
  { id: 'dammam', nameAr: 'الدمام والخبر', nameEn: 'Dammam & Khobar', coords: { lat: 26.4207, lng: 50.0888, accuracy: 25 } },
  { id: 'neom', nameAr: 'نيوم وتبوك', nameEn: 'NEOM & Tabuk', coords: { lat: 28.0050, lng: 35.3120, accuracy: 30 } },
  { id: 'makkah', nameAr: 'مكة المكرمة', nameEn: 'Makkah Al Mukarramah', coords: { lat: 21.4225, lng: 39.8262, accuracy: 20 } },
  { id: 'abha', nameAr: 'أبها وعسير', nameEn: 'Abha & Asir', coords: { lat: 18.2164, lng: 42.5053, accuracy: 25 } },
];

/**
 * Calculates Great-Circle Distance between two GPS points using Haversine formula in Kilometers.
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

export function formatDistance(distanceKm: number, isAr: boolean): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return isAr ? `${meters} متر` : `${meters} m`;
  }
  return isAr ? `${distanceKm.toLocaleString('ar-SA')} كم` : `${distanceKm} km`;
}

/**
 * Ranks all construction projects by proximity to user coordinates.
 */
export function getRankedProjectsByDistance(
  userCoords: UserCoords,
  isAr: boolean = true
): ProjectWithDistance[] {
  return constructionSitesList
    .map((site) => {
      const dist = calculateHaversineDistanceKm(
        userCoords.lat,
        userCoords.lng,
        site.realGps.lat,
        site.realGps.lng
      );
      return {
        ...site,
        distanceKm: dist,
        distanceFormattedAr: formatDistance(dist, true),
        distanceFormattedEn: formatDistance(dist, false),
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export type GeolocationStatus =
  | 'idle'
  | 'requesting'
  | 'located'
  | 'denied'
  | 'unavailable'
  | 'simulated';

export function useUserGeolocation() {
  const [coords, setCoords] = useState<UserCoords | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string>('الرياض');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('riyadh');

  // Request browser geolocation
  const requestLocation = useCallback(() => {
    setStatus('requesting');
    setErrorMsg(null);

    if (!('geolocation' in navigator)) {
      setStatus('unavailable');
      setErrorMsg('المتصفح لا يدعم التحديد الجغرافي');
      // Fallback to Riyadh
      const fallback = PRESET_LOCATIONS[0].coords;
      setCoords(fallback);
      setCityName('الرياض');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        setCoords({ lat: userLat, lng: userLng, accuracy });
        setStatus('located');
        setErrorMsg(null);

        // Approximate city name in Saudi Arabia or closest
        let closestPreset = PRESET_LOCATIONS[0];
        let minD = Infinity;
        for (const p of PRESET_LOCATIONS) {
          const d = calculateHaversineDistanceKm(userLat, userLng, p.coords.lat, p.coords.lng);
          if (d < minD) {
            minD = d;
            closestPreset = p;
          }
        }
        setCityName(closestPreset.nameAr);
        setSelectedPresetId(closestPreset.id);
      },
      (error) => {
        let msg = 'تعذر تحديد الموقع الجغرافي';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'تم رفض إذن تحديد الموقع من المتصفح';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'بيانات الموقع غير متوفرة حالياً';
        } else if (error.code === error.TIMEOUT) {
          msg = 'انتهت مهلة طلب تحديد الموقع';
        }
        setErrorMsg(msg);
        setStatus('denied');
        // Fallback gracefully to Riyadh as default
        setCoords(PRESET_LOCATIONS[0].coords);
        setCityName(PRESET_LOCATIONS[0].nameAr);
        setSelectedPresetId('riyadh');
      },
      {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 120000,
      }
    );
  }, []);

  // Set predefined Saudi location (simulated/preset)
  const setPresetLocation = useCallback((presetId: string) => {
    const found = PRESET_LOCATIONS.find((p) => p.id === presetId);
    if (found) {
      setCoords(found.coords);
      setCityName(found.nameAr);
      setSelectedPresetId(presetId);
      setStatus('simulated');
      setErrorMsg(null);
    }
  }, []);

  // Trigger automatically on mount (page load) as requested by user
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return {
    coords,
    status,
    errorMsg,
    cityName,
    selectedPresetId,
    requestLocation,
    setPresetLocation,
    nearbyProjects: coords ? getRankedProjectsByDistance(coords) : [],
  };
}
