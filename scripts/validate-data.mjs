import { subjects, allChapters } from '../data/subjects.js';

const expected = {
  Physics: 45,
  Chemistry: 45,
  Biology: 90
};

let failed = false;

for (const subject of subjects) {
  const chapters = subject.units.flatMap((unit) => unit.chapters);
  const pyqs = chapters.reduce((sum, chapter) => sum + chapter[2], 0);
  if (pyqs !== expected[subject.name]) {
    failed = true;
    console.error(`✗ ${subject.name}: ${pyqs} mapped questions (expected ${expected[subject.name]})`);
  } else {
    console.log(`✓ ${subject.name}: ${chapters.length} chapters / ${pyqs} mapped questions`);
  }
}

const totalPyqs = allChapters.reduce((sum, chapter) => sum + chapter.pyqs2026, 0);
if (totalPyqs !== 180) {
  failed = true;
  console.error(`✗ Overall: ${totalPyqs} mapped questions (expected 180)`);
} else {
  console.log(`✓ Overall: ${allChapters.length} chapters / ${totalPyqs} mapped questions`);
}

if (failed) process.exit(1);
