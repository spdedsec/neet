export function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export function getSubjectStats(subject, completed) {
  const chapters = subject.units.flatMap((unit) => unit.chapters);
  const total = chapters.length;
  const done = chapters.filter(([id]) => completed[id]).length;
  const pyqs2026 = chapters.reduce((sum, [, , pyqs]) => sum + pyqs, 0);
  const covered2026Marks = chapters.filter(([id]) => completed[id]).reduce((sum, [, , pyqs]) => sum + pyqs * 4, 0);
  return {
    total,
    done,
    percentage: percent(done, total),
    pyqs2026,
    covered2026Marks,
    paperMarks: subject.marks
  };
}

export function getUnitStats(unit, completed) {
  const total = unit.chapters.length;
  const done = unit.chapters.filter(([id]) => completed[id]).length;
  const pyqs2026 = unit.chapters.reduce((sum, [, , pyqs]) => sum + pyqs, 0);
  const covered2026Marks = unit.chapters.filter(([id]) => completed[id]).reduce((sum, [, , pyqs]) => sum + pyqs * 4, 0);
  return {
    total,
    done,
    percentage: percent(done, total),
    pyqs2026,
    covered2026Marks
  };
}

export function getOverallStats(subjects, completed) {
  const chapters = subjects.flatMap((subject) => subject.units.flatMap((unit) => unit.chapters));
  const total = chapters.length;
  const done = chapters.filter(([id]) => completed[id]).length;
  const marks2026 = chapters.reduce((sum, [, , pyqs]) => sum + pyqs * 4, 0);
  const covered2026Marks = chapters.filter(([id]) => completed[id]).reduce((sum, [, , pyqs]) => sum + pyqs * 4, 0);
  return {
    total,
    done,
    percentage: percent(done, total),
    marks2026,
    covered2026Marks
  };
}
