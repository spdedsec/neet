'use client';

import { useEffect, useState } from 'react';
import { loadCompleted, saveCompleted } from '@/lib/storage';

export function useProgress() {
  const [completed, setCompleted] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(loadCompleted());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCompleted(completed);
  }, [completed, hydrated]);

  function toggleChapter(id) {
    setCompleted((current) => {
      const next = { ...current };
      if (next[id]) delete next[id];
      else next[id] = Date.now();
      return next;
    });
  }

  function clearChapters(ids) {
    if (!Array.isArray(ids) || ids.length === 0) return;
    setCompleted((current) => {
      const next = { ...current };
      ids.forEach((id) => delete next[id]);
      return next;
    });
  }

  function resetProgress() {
    setCompleted({});
  }

  return { completed, toggleChapter, clearChapters, resetProgress, hydrated };
}
