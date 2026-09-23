'use client';

import { RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { subjects } from '@/data/subjects';
import { getOverallStats } from '@/lib/progress';
import { useProgress } from '@/hooks/useProgress';
import { ProgressBar } from './ProgressBar';
import { SubjectCard } from './SubjectCard';
import { SubjectView } from './SubjectView';

function SectionLabel({ children }) {
  return <div className="kicker">{children}</div>;
}

export function Dashboard() {
  const { completed, toggleChapter, clearChapters, resetProgress, hydrated } = useProgress();
  const [subjectId, setSubjectId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const overall = getOverallStats(subjects, completed);
  const activeSubject = subjects.find((subject) => subject.id === subjectId) ?? null;

  const recent = useMemo(() => {
    const all = subjects.flatMap((subject) => subject.units.flatMap((unit) => unit.chapters.map(([id, name, pyqs]) => ({
      id, name, subject: subject.name, subjectId: subject.id, pyqs
    }))));
    return all
      .filter((chapter) => completed[chapter.id])
      .sort((a, b) => Number(completed[b.id]) - Number(completed[a.id]))
      .slice(0, 6);
  }, [completed]);

  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subjects.filter((subject) => {
      const subjectMatches = !q || subject.name.toLowerCase().includes(q) || subject.units.some((u) => u.name.toLowerCase().includes(q) || u.chapters.some(([, name]) => name.toLowerCase().includes(q)));
      if (filter === 'all') return subjectMatches;
      const stats = subject.units.flatMap((unit) => unit.chapters);
      const done = stats.filter(([id]) => completed[id]).length;
      if (filter === 'completed') return subjectMatches && done === stats.length;
      if (filter === 'in-progress') return subjectMatches && done > 0 && done < stats.length;
      if (filter === 'not-started') return subjectMatches && done === 0;
      return subjectMatches;
    });
  }, [completed, filter, query]);

  function resetSubject(id) {
    const ids = subjects.find((subject) => subject.id === id)?.units.flatMap((unit) => unit.chapters.map(([chapterId]) => chapterId)) ?? [];
    if (window.confirm(`Reset all ${id} progress? This cannot be undone.`)) clearChapters(ids);
  }

  function handleResetAll() {
    if (window.confirm('Reset all NEET progress? This cannot be undone.')) resetProgress();
  }

  if (!hydrated) {
    return (
      <main className="app-shell">
        <div className="page-wrap">
          <div className="py-20 text-[10px] uppercase tracking-[0.12em] text-zinc-600">Loading tracker…</div>
        </div>
      </main>
    );
  }

  if (activeSubject) {
    return (
      <main className="app-shell">
        <div className="page-wrap">
          <SubjectView
            subject={activeSubject}
            completed={completed}
            onToggle={toggleChapter}
            onBack={() => setSubjectId(null)}
            onReset={() => resetSubject(activeSubject.id)}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="page-wrap">
        <header className="header-grid border-b border-zinc-900 pb-6">
          <div className="header-left">
            <div className="kicker">NMC reference · NEET 2026 syllabus</div>
            <div className="mt-4 text-xs uppercase tracking-[0.09em] text-zinc-500">Completion tracker · 88 chapters</div>
          </div>

          <div className="header-center text-center">
            <div className="display-type">NEET / 27</div>
          </div>

          <div className="header-right text-right">
            <div className="kicker">2026 paper footprint</div>
            <div className="mt-3 text-2xl tracking-[-0.04em]">720 marks</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-zinc-600">180 questions</div>
          </div>
        </header>

        <section className="py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <SectionLabel>Overall preparation</SectionLabel>
              <div className="mt-4 flex items-end gap-3">
                <div className="display-type">{overall.percentage}%</div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.12em] text-zinc-600">complete</div>
              </div>
              <div className="mt-6 max-w-2xl">
                <ProgressBar value={overall.percentage} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="data-pill"><span className="block text-zinc-300">{overall.done}</span><span>done</span></div>
              <div className="data-pill"><span className="block text-zinc-300">{overall.total - overall.done}</span><span>remaining</span></div>
              <div className="data-pill col-span-2 sm:col-span-1"><span className="block text-zinc-300">{overall.total}</span><span>chapters</span></div>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-900 py-10">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <SectionLabel>Subjects</SectionLabel>
              <p className="mt-2 max-w-2xl text-[12px] leading-6 text-zinc-500">
                Tick a chapter when you are genuinely done with it. Progress is stored locally in this browser.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                ['all', 'All'],
                ['not-started', 'Not started'],
                ['in-progress', 'In progress'],
                ['completed', 'Completed']
              ].map(([value, label]) => (
                <button key={value} type="button" className={`filter-button ${filter === value ? 'active' : ''}`} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {filteredSubjects.map((subject, index) => (
              <motion.div key={subject.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.06 }}>
                <SubjectCard subject={subject} completed={completed} onOpen={() => setSubjectId(subject.id)} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-900 py-10">
          <div className="grid gap-9 lg:grid-cols-[1fr_1.25fr]">
            <div>
              <SectionLabel>Continue</SectionLabel>
              <div className="mt-5 max-w-xl">
                {recent.length ? recent.slice(0, 3).map((chapter) => (
                  <div key={chapter.id} className="border-t border-zinc-900 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm tracking-[-0.02em]">{chapter.name}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-zinc-600">{chapter.subject} · completed</div>
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.12em] text-zinc-600">{chapter.pyqs} PYQ{chapter.pyqs === 1 ? '' : 'S'}</div>
                    </div>
                  </div>
                )) : (
                  <div className="border-t border-zinc-900 py-7 text-[10px] uppercase tracking-[0.12em] text-zinc-600">Nothing completed yet.</div>
                )}
              </div>
            </div>

            <div>
              <SectionLabel>Historical paper data</SectionLabel>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {subjects.map((subject) => {
                  const stats = subject.units.flatMap((unit) => unit.chapters).reduce((sum, [, , pyqs]) => sum + pyqs, 0);
                  return (
                    <div key={subject.id} className="border-t border-zinc-900 pt-4">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="text-sm tracking-[-0.02em]">{subject.name}</div>
                          <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-zinc-600">2026 re-exam</div>
                        </div>
                        <div className="text-2xl tracking-[-0.04em]">{stats}</div>
                      </div>
                      <div className="mt-2 text-[9px] uppercase tracking-[0.12em] text-zinc-600">questions mapped across chapters</div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-7 max-w-2xl text-[10px] uppercase leading-5 tracking-[0.11em] text-zinc-600">
                2026 PYQ counts are a reconstructed chapter mapping, not official NTA chapter-wise weightage. A zero in 2026 does not mean a chapter is removed.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-900 pt-7">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[9px] uppercase tracking-[0.12em] text-zinc-700">
            <div>NEET / 27 · local-first tracker</div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={handleResetAll} className="inline-flex items-center gap-1.5 transition hover:text-zinc-300"><RotateCcw size={11} /> Reset all</button>
              <span>Reference dataset · NMC 2026 syllabus</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
