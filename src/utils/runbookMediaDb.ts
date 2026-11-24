import { ShowKey } from '../types';

export interface AnnualMediaItem {
  id: string;
  showKey: ShowKey;
  name: string;
  mimeType: string;
  sizeBytes: number;
  addedAt: string;
  /** Stored offline as data URL inside IndexedDB for zero-dependency portability */
  dataUrl: string;
}

export interface AnnualShowMeta {
  seasonLabel: string;
  customNotes: string;
  updatedAt: string;
}

const META_STORAGE_KEY = 'boulder_audio_annual_show_meta_v1';
const DB_NAME = 'boulder_audio_media_db_v1';
const STORE_NAME = 'runbook_media';

export function readAnnualShowMeta(showKey: ShowKey): AnnualShowMeta {
  try {
    const raw = window.localStorage.getItem(META_STORAGE_KEY);
    if (!raw) return { seasonLabel: '', customNotes: '', updatedAt: '' };
    const parsed = JSON.parse(raw) as Record<string, AnnualShowMeta>;
    return parsed[showKey] ?? { seasonLabel: '', customNotes: '', updatedAt: '' };
  } catch {
    return { seasonLabel: '', customNotes: '', updatedAt: '' };
  }
}

export function saveAnnualShowMeta(showKey: ShowKey, meta: AnnualShowMeta): void {
  try {
    const raw = window.localStorage.getItem(META_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, AnnualShowMeta>) : {};
    parsed[showKey] = meta;
    window.localStorage.setItem(META_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Ignore quota errors in restricted frames
  }
}

export function clearAnnualShowMeta(showKey: ShowKey): void {
  try {
    const raw = window.localStorage.getItem(META_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, AnnualShowMeta>;
    delete parsed[showKey];
    window.localStorage.setItem(META_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Ignore storage errors
  }
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = window.indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('showKey', 'showKey', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('Failed to open IndexedDB'));
  });
}

export async function listAnnualMedia(showKey: ShowKey): Promise<AnnualMediaItem[]> {
  try {
    const db = await openMediaDb();
    return await new Promise<AnnualMediaItem[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const idx = store.index('showKey');
      const req = idx.getAll(showKey);
      req.onsuccess = () => resolve((req.result as AnnualMediaItem[]) ?? []);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function saveAnnualMediaItems(items: AnnualMediaItem[]): Promise<void> {
  if (items.length === 0) return;
  const db = await openMediaDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    items.forEach((item) => store.put(item));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('Failed to store media'));
  });
}

export async function deleteAnnualMediaItem(id: string): Promise<void> {
  const db = await openMediaDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearAnnualMediaForShow(showKey: ShowKey): Promise<void> {
  const existing = await listAnnualMedia(showKey);
  if (existing.length === 0) return;
  const db = await openMediaDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    existing.forEach((item) => store.delete(item.id));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
