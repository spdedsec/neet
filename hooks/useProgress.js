'use client';

import { useEffect, useState, useCallback } from 'react';
import { loadCompleted, saveCompleted, loadStarred, saveStarred } from '@/lib/storage';

export function useProgress() {
  const [completed, setCompleted] = useState({});
  const [starred, setStarred] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(loadCompleted());
    setStarred(loadStarred());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveCompleted(completed);
    }
  }, [completed, hydrated]);

  useEffect(() => {
    if (hydrated) {
      saveStarred(starred);
    }
  }, [starred, hydrated]);

  const toggleChapter = useCallback((id) => {
    setCompleted((current) => {
      const next = { ...current };
      if (next[id]) delete next[id];
      else next[id] = Date.now();
      return next;
    });
  }, []);

  const toggleStar = useCallback((id) => {
    setStarred((current) => {
      const next = { ...current };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }, []);

  const setMultipleChapters = useCallback((ids, isDone) => {
    if (!Array.isArray(ids) || ids.length === 0) return;
    setCompleted((current) => {
      const next = { ...current };
      const now = Date.now();
      ids.forEach((id) => {
        if (isDone) {
          next[id] = next[id] || now;
        } else {
          delete next[id];
        }
      });
      return next;
    });
  }, []);

  const clearChapters = useCallback((ids) => {
    if (!Array.isArray(ids) || ids.length === 0) return;
    setCompleted((current) => {
      const next = { ...current };
      ids.forEach((id) => delete next[id]);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setCompleted({});
    setStarred({});
  }, []);

  const importState = useCallback(({ completed: newCompleted, starred: newStarred }) => {
    if (newCompleted && typeof newCompleted === 'object') {
      setCompleted(newCompleted);
    }
    if (newStarred && typeof newStarred === 'object') {
      setStarred(newStarred);
    }
  }, []);

  return {
    completed,
    starred,
    toggleChapter,
    toggleStar,
    setMultipleChapters,
    clearChapters,
    resetProgress,
    importState,
    hydrated
  };
}

