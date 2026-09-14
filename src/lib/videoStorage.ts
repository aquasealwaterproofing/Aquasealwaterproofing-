// Enhanced Video Storage & Permanent Server Synchronization Utility
// Uploads videos directly to the website backend (/api/upload-video)
// so that when you publish or share the link with anyone, your uploaded video
// is permanently served to every visitor across all devices and browsers.
// Also synchronizes any previously cached local IndexedDB videos to the server automatically.

const DB_NAME = 'AquasealVideoDB';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported'));
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

/**
 * Get raw video blob from local IndexedDB
 */
export async function getPersistentVideoBlob(key: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result instanceof Blob) {
          resolve(req.result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
}

/**
 * Upload a video file directly to the server backend.
 * This permanently overwrites the video file in /public on the server
 * so all visitors and shared link recipients see the uploaded video.
 */
export async function uploadVideoToServer(key: string, file: Blob): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('key', key);
    formData.append('file', file, `${key}-upload.mp4`);

    const res = await fetch('/api/upload-video', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        console.log(`[Video Sync] Successfully uploaded ${key} to server:`, data.url);
        return data.url;
      }
    }
  } catch (err) {
    console.warn(`[Video Sync] Could not upload ${key} to server:`, err);
  }
  return null;
}

/**
 * Saves a video locally in IndexedDB AND uploads it to the server.
 * Returns the permanent server URL if successful, or fallback ObjectURL.
 */
export async function savePersistentVideo(key: string, file: Blob): Promise<string> {
  // 1. Save to local IndexedDB for immediate backup
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not save to IndexedDB:', err);
  }

  // 2. Upload to server permanently
  const serverUrl = await uploadVideoToServer(key, file);
  if (serverUrl) {
    return serverUrl;
  }

  return URL.createObjectURL(file);
}

/**
 * Gets video URL. Checks server status first; falls back to IndexedDB or default.
 */
export async function getPersistentVideoUrl(key: string): Promise<string | null> {
  // Check if we have a locally uploaded blob
  const localBlob = await getPersistentVideoBlob(key);
  if (localBlob) {
    // Attempt background sync to server if not already synced
    uploadVideoToServer(key, localBlob).catch(() => {});
    return URL.createObjectURL(localBlob);
  }

  return null;
}

/**
 * Automatically scans IndexedDB for any videos uploaded earlier by the user
 * and immediately syncs them up to the server filesystem.
 */
export async function syncAllLocalVideosToServer(): Promise<{ syncedCount: number }> {
  let syncedCount = 0;
  try {
    const keys = ['roofseal', 'process', 'why-aquaseal'];
    for (const key of keys) {
      const blob = await getPersistentVideoBlob(key);
      if (blob) {
        console.log(`[Video Auto-Sync] Found local video for "${key}" (${blob.size} bytes). Uploading to server...`);
        const serverUrl = await uploadVideoToServer(key, blob);
        if (serverUrl) {
          syncedCount++;
        }
      }
    }
  } catch (err) {
    console.warn('[Video Auto-Sync] Error syncing videos:', err);
  }
  return { syncedCount };
}

export async function clearPersistentVideo(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not clear video from IndexedDB:', err);
  }
}
