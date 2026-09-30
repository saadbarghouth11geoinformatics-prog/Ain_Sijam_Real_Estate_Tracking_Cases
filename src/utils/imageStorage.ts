// Helper for storing and retrieving uploaded images persistently using IndexedDB

const DB_NAME = 'SigamGisComparisonDB';
const STORE_NAME = 'project_images';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePersistentImage(key: 'satellite' | 'cad', dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Failed to save image to IndexedDB:', e);
    // Fallback to localStorage if small
    try {
      if (dataUrl.length < 4000000) {
        localStorage.setItem(`sigam_${key}_img`, dataUrl);
      }
    } catch {
      // ignore
    }
  }
}

export async function getPersistentImage(key: 'satellite' | 'cad'): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result) {
          resolve(req.result as string);
        } else {
          // fallback to localStorage
          const local = localStorage.getItem(`sigam_${key}_img`);
          resolve(local || null);
        }
      };
      req.onerror = () => {
        const local = localStorage.getItem(`sigam_${key}_img`);
        resolve(local || null);
      };
    });
  } catch {
    const local = localStorage.getItem(`sigam_${key}_img`);
    return local || null;
  }
}

export async function clearPersistentImages(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
    localStorage.removeItem('sigam_satellite_img');
    localStorage.removeItem('sigam_cad_img');
  } catch (e) {
    console.warn(e);
  }
}
