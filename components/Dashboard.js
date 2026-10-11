'use client';

import { RotateCcw, Search, X, Database, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { subjects } from '@/data/subjects';
import { getOverallStats, HIGH_YIELD_THRESHOLD } from '@/lib/progress';
import { useProgress } from '@/hooks/useProgress';
import { ProgressBar } from './ProgressBar';
import { SubjectCard } from './SubjectCard';
import { SubjectView } from './SubjectView';
import { Countdown } from './Countdown';
import { ChapterRow } from './ChapterRow';
import { BackupModal } from './BackupModal';

function SectionLabel({ children }) {
  return <div className="kicker">{children}</div>;
}

export function Dashboard() {
  const {
    completed,
    starred,
    toggleChapter,
    toggleStar,
    setMultipleChapters,
    clearChapters,
    resetProgress,
    importState,
    hydrated
  } = useProgress();

  const [subjectId, setSubjectId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const searchInputRef = useRef(null);

  const overall = getOverallStats(subjects, completed, starred);
  const activeSubject = subjects.find((subject) => subject.id === subjectId) ?? null;

  // Flatten all chapters for global search
  const allChapters = useMemo(() => {
    return subjects.flatMap((subject) =>
      subject.units.flatMap((unit) =>
        unit.chapters.map(([id, name, pyqs, note]) => ({
          id,
          name,
          pyqs2026: pyqs,
          marks2026: pyqs * 4,
          unitId: unit.id,
          unitNo: unit.no,
          unitName: unit.name,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectShort: subject.short,
          note
        }))
      )
    );
  }, []);

  // Global keyboard shortcuts: "/" to search, "Escape" to clear
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        if (query) {
          setQuery('');
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [query]);

  const recent = useMemo(() => {
    return allChapters
      .filter((chapter) => completed[chapter.id])
      .sort((a, b) => Number(completed[b.id]) - Number(completed[a.id]))
      .slice(0, 6);
  }, [allChapters, completed]);

  // Global search matches
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allChapters.filter((chapter) =>
      chapter.name.toLowerCase().includes(q) ||
      chapter.unitName.toLowerCase().includes(q) ||
      chapter.subjectName.toLowerCase().includes(q) ||
      chapter.subjectShort.toLowerCase().includes(q)
    );
  }, [allChapters, query]);

  // Filtered subjects on dashboard
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const stats = subject.units.flatMap((unit) => unit.chapters);
      const done = stats.filter(([id]) => completed[id]).length;
      const hasStarred = stats.some(([id]) => starred[id]);
      const hasHighYield = stats.some(([, , pyqs]) => pyqs >= HIGH_YIELD_THRESHOLD);

      if (filter === 'all') return true;
      if (filter === 'completed') return done === stats.length;
      if (filter === 'in-progress') return done > 0 && done < stats.length;
      if (filter === 'not-started') return done === 0;
      if (filter === 'high-yield') return hasHighYield;
      if (filter === 'starred') return hasStarred;
      return true;
    });
  }, [completed, starred, filter]);

  function resetSubject(id) {
    const ids = subjects.find((subject) => subject.id === id)?.units.flatMap((unit) => unit.chapters.map(([chapterId]) => chapterId)) ?? [];
    if (window.confirm(`Reset all ${id} progress? This cannot be undone.`)) {
      clearChapters(ids);
    }
  }

  function handleResetAll() {
    resetProgress();
  }

  if (!hydrated) {
    return (
      <main className="app-shell">
        <div className="page-wrap">
          <div className="py-24 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Initializing NEET Tracker…
          </div>
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
            starred={starred}
            onToggle={toggleChapter}
            onToggleStar={toggleStar}
            onSetMultiple={setMultipleChapters}
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
            <div className="mt-4 text-xs font-mono uppercase tracking-[0.09em] text-zinc-500 tabular-nums">
              Completion tracker · {overall.total} chapters
            </div>
          </div>

          <div className="header-center text-center">
            <div className="display-type">NEET / 27</div>
          </div>

          <div className="header-right text-right">
            <div className="kicker">2026 paper footprint</div>
            <div className="mt-3 text-2xl font-mono tracking-[-0.04em] tabular-nums">720 marks</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-zinc-600">180 questions</div>
          </div>
        </header>

        {/* Exam Target Countdown */}
        <section className="pt-8 pb-4">
          <Countdown remainingChapters={overall.remaining} totalChapters={overall.total} />
        </section>

        {/* Overall Preparation Progress */}
        <section className="py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <SectionLabel>Overall preparation</SectionLabel>
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <div className="display-type font-mono tabular-nums">{overall.percentage}%</div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.12em] text-zinc-600">complete</div>
                <div className="mb-2 ml-auto text-right font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-400 tabular-nums">
                  {overall.covered2026Marks} / {overall.marks2026} marks ({overall.marksPercentage}%)
                </div>
              </div>
              <div className="mt-4 max-w-2xl">
                <ProgressBar value={overall.percentage} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="data-pill">
                <span className="block font-mono text-base tabular-nums text-zinc-200">{overall.done}</span>
                <span>done</span>
              </div>
              <div className="data-pill">
                <span className="block font-mono text-base tabular-nums text-zinc-200">{overall.remaining}</span>
                <span>remaining</span>
              </div>
              <div className="data-pill">
                <span className="block font-mono text-base tabular-nums text-zinc-200">
                  {overall.highYieldDone}/{overall.highYieldTotal}
                </span>
                <span>high yield</span>
              </div>
              <div className="data-pill">
                <span className="block font-mono text-base tabular-nums text-zinc-200">{overall.starredCount}</span>
                <span>priority ★</span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Search and Subject Grid */}
        <section className="border-t border-zinc-900 py-10">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <SectionLabel>Syllabus explorer</SectionLabel>
              <p className="mt-2 max-w-2xl text-[12px] leading-6 text-zinc-500">
                Tick a chapter when you have completed its theory and PYQs. Star chapters to mark them for pre-exam revision.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                ['all', 'All'],
                ['not-started', 'Not started'],
                ['in-progress', 'In progress'],
                ['completed', 'Completed'],
                ['high-yield', 'High Yield'],
                ['starred', 'Prioritized ★']
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`filter-button ${filter === value ? 'active' : ''}`}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-6 flex items-center justify-between gap-4 border-b border-zinc-900 pb-3">
            <div className="flex flex-1 items-center gap-3">
              <Search size={14} className="text-zinc-600" />
              <input
                ref={searchInputRef}
                className="search-input text-zinc-200"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across all 84 chapters, units, or subjects... (Press '/' to focus)"
                aria-label="Search all chapters"
              />
            </div>
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-zinc-500 hover:text-zinc-200 transition"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-700 sm:inline">
                shortcut: /
              </span>
            )}
          </div>

          {/* If search query is active, show search results; otherwise show subject cards */}
          {query.trim() ? (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <SectionLabel>Found {searchResults.length} chapter{searchResults.length === 1 ? '' : 's'}</SectionLabel>
              </div>

              {searchResults.length ? (
                <div className="unit-body">
                  {searchResults.map((chapter) => (
                    <ChapterRow
                      key={chapter.id}
                      chapter={chapter}
                      checked={Boolean(completed[chapter.id])}
                      isStarred={Boolean(starred[chapter.id])}
                      onToggle={toggleChapter}
                      onToggleStar={toggleStar}
                      showSubject={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                  No chapters found matching &ldquo;{query}&rdquo;
                </div>
              )}
            </div>
          ) : (
            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {filteredSubjects.map((subject, index) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <SubjectCard
                    subject={subject}
                    completed={completed}
                    starred={starred}
                    onOpen={() => setSubjectId(subject.id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Continue & Historical Data */}
        <section className="border-t border-zinc-900 py-10">
          <div className="grid gap-9 lg:grid-cols-[1fr_1.25fr]">
            <div>
              <SectionLabel>Continue</SectionLabel>
              <div className="mt-5 max-w-xl">
                {recent.length ? (
                  recent.slice(0, 4).map((chapter) => (
                    <div key={chapter.id} className="border-t border-zinc-900 py-3.5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm tracking-[-0.02em] text-zinc-200">{chapter.name}</div>
                          <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-zinc-500">
                            {chapter.subjectName} · completed
                          </div>
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500 tabular-nums">
                          {chapter.pyqs} PYQ{chapter.pyqs === 1 ? '' : 'S'}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border-t border-zinc-900 py-7 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">
                    No chapters completed yet.
                  </div>
                )}
              </div>
            </div>

            <div>
              <SectionLabel>Historical paper data</SectionLabel>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {subjects.map((subject) => {
                  const stats = subject.units
                    .flatMap((unit) => unit.chapters)
                    .reduce((sum, [, , pyqs]) => sum + pyqs, 0);
                  return (
                    <div key={subject.id} className="border-t border-zinc-900 pt-4">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="text-sm tracking-[-0.02em]">{subject.name}</div>
                          <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-zinc-600">2026 paper</div>
                        </div>
                        <div className="text-2xl font-mono tracking-[-0.04em] tabular-nums">{stats}</div>
                      </div>
                      <div className="mt-2 text-[9px] uppercase tracking-[0.12em] text-zinc-600">questions mapped</div>
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

        {/* Footer */}
        <footer className="border-t border-zinc-900 pt-7">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[9px] uppercase tracking-[0.12em] text-zinc-700">
            <div>NEET / 27 · local-first tracker</div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsBackupOpen(true)}
                className="inline-flex items-center gap-1.5 transition hover:text-zinc-300"
              >
                <Database size={11} /> Backup & Data
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all NEET progress? This cannot be undone.')) {
                    handleResetAll();
                  }
                }}
                className="inline-flex items-center gap-1.5 transition hover:text-zinc-300"
              >
                <RotateCcw size={11} /> Reset all
              </button>
              <span>Reference dataset · NMC 2026 syllabus</span>
            </div>
          </div>
        </footer>

        {/* Data Backup & Restore Modal */}
        <BackupModal
          isOpen={isBackupOpen}
          onClose={() => setIsBackupOpen(false)}
          completed={completed}
          starred={starred}
          overall={overall}
          subjects={subjects}
          onImport={importState}
          onResetAll={handleResetAll}
        />
      </div>
    </main>
  );
}
