export const HIGH_YIELD_THRESHOLD = 3;

export function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export function getSubjectStats(subject, completed, starred = {}) {
  const chapters = subject.units.flatMap((unit) => unit.chapters);
  const total = chapters.length;
  const done = chapters.filter(([id]) => completed[id]).length;
  const pyqs2026 = chapters.reduce((sum, [, , pyqs]) => sum + pyqs, 0);
  const covered2026Marks = chapters.filter(([id]) => completed[id]).reduce((sum, [, , pyqs]) => sum + pyqs * 4, 0);
  const starredCount = chapters.filter(([id]) => starred[id]).length;
  const highYieldTotal = chapters.filter(([, , pyqs]) => pyqs >= HIGH_YIELD_THRESHOLD).length;
  const highYieldDone = chapters.filter(([id, , pyqs]) => pyqs >= HIGH_YIELD_THRESHOLD && completed[id]).length;

  return {
    total,
    done,
    percentage: percent(done, total),
    pyqs2026,
    covered2026Marks,
    paperMarks: subject.marks,
    starredCount,
    highYieldTotal,
    highYieldDone
  };
}

export function getUnitStats(unit, completed, starred = {}) {
  const total = unit.chapters.length;
  const done = unit.chapters.filter(([id]) => completed[id]).length;
  const pyqs2026 = unit.chapters.reduce((sum, [, , pyqs]) => sum + pyqs, 0);
  const covered2026Marks = unit.chapters.filter(([id]) => completed[id]).reduce((sum, [, , pyqs]) => sum + pyqs * 4, 0);
  const starredCount = unit.chapters.filter(([id]) => starred[id]).length;
  const allCompleted = total > 0 && done === total;

  return {
    total,
    done,
    percentage: percent(done, total),
    pyqs2026,
    covered2026Marks,
    starredCount,
    allCompleted
  };
}

export function getOverallStats(subjects, completed, starred = {}) {
  const chapters = subjects.flatMap((subject) => subject.units.flatMap((unit) => unit.chapters));
  const total = chapters.length;
  const done = chapters.filter(([id]) => completed[id]).length;
  const remaining = total - done;
  const marks2026 = chapters.reduce((sum, [, , pyqs]) => sum + pyqs * 4, 0);
  const covered2026Marks = chapters.filter(([id]) => completed[id]).reduce((sum, [, , pyqs]) => sum + pyqs * 4, 0);
  const starredCount = chapters.filter(([id]) => starred[id]).length;
  const highYieldTotal = chapters.filter(([, , pyqs]) => pyqs >= HIGH_YIELD_THRESHOLD).length;
  const highYieldDone = chapters.filter(([id, , pyqs]) => pyqs >= HIGH_YIELD_THRESHOLD && completed[id]).length;

  return {
    total,
    done,
    remaining,
    percentage: percent(done, total),
    marks2026,
    covered2026Marks,
    marksPercentage: percent(covered2026Marks, marks2026),
    starredCount,
    highYieldTotal,
    highYieldDone
  };
}

export function calculatePace(remainingChapters, daysRemaining) {
  if (daysRemaining <= 0) return { perWeek: 0, perDay: 0 };
  const weeks = daysRemaining / 7;
  const perWeek = weeks > 0 ? (remainingChapters / weeks).toFixed(1) : remainingChapters;
  const perDay = (remainingChapters / daysRemaining).toFixed(2);
  return { perWeek, perDay };
}

