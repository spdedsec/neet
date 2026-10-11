export const STORAGE_KEY = 'neet-27-tracker:completed:v1';
export const STARRED_KEY = 'neet-27-tracker:starred:v1';

export function loadCompleted() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCompleted(value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage can be disabled or full; in-memory state still works.
  }
}

export function loadStarred() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STARRED_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveStarred(value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STARRED_KEY, JSON.stringify(value));
  } catch {
    // Storage can be disabled or full; in-memory state still works.
  }
}

export function exportBackup(completed, starred) {
  if (typeof window === 'undefined') return;
  const data = {
    app: 'neet-27-tracker',
    version: 1,
    exportedAt: new Date().toISOString(),
    completed: completed || {},
    starred: starred || {}
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `neet-27-progress-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(rawText) {
  const parsed = JSON.parse(rawText);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid backup file format');
  }
  const completed = parsed.completed && typeof parsed.completed === 'object' ? parsed.completed : {};
  const starred = parsed.starred && typeof parsed.starred === 'object' ? parsed.starred : {};
  return { completed, starred };
}

