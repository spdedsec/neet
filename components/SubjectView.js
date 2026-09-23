'use client';

import { ArrowLeft, Search, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { getSubjectStats } from '@/lib/progress';
import { ProgressBar } from './ProgressBar';
import { UnitSection } from './UnitSection';
import { useMemo, useState } from 'react';

export function SubjectView({ subject, completed, onToggle, onBack, onReset }) {
  const [query, setQuery] = useState('');
  const stats = getSubjectStats(subject, completed);

  const filteredUnits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subject.units;

    return subject.units
      .map((unit) => ({
        ...unit,
        chapters: unit.chapters.filter(([, name]) => name.toLowerCase().includes(q) || unit.name.toLowerCase().includes(q))
      }))
      .filter((unit) => unit.chapters.length > 0);
  }, [subject, query]);

  return (
    <div>
      <header className="border-b border-zinc-900 pb-7">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-zinc-500 transition hover:text-zinc-100"
            >
              <ArrowLeft size={13} /> Back to overview
            </button>
            <div className="kicker">Subject / {subject.short}</div>
            <h1 className="mt-3 text-4xl font-normal tracking-[-0.055em] sm:text-6xl">{subject.name}</h1>
          </div>

          <div className="text-right">
            <div className="stat-type">{stats.percentage}%</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.12em] text-zinc-600">{stats.done}/{stats.total} chapters</div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_auto_auto] md:items-end">
          <ProgressBar value={stats.percentage} />
          <div className="data-pill">{subject.questions} Q / {subject.marks} MARKS</div>
          <div className="data-pill">2026 · {subject.difficulty}</div>
        </div>
      </header>

      <div className="mt-7 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div className="search-shell">
          <Search size={14} className="text-zinc-600" />
          <input
            className="search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chapters or units..."
            aria-label="Search chapters or units"
          />
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.12em] text-zinc-600 transition hover:text-zinc-200"
        >
          <RotateCcw size={13} /> Reset {subject.short}
        </button>
      </div>

      <div className="mt-2">
        {filteredUnits.length ? (
          filteredUnits.map((unit, index) => (
            <motion.div key={unit.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: index * 0.025 }}>
              <UnitSection unit={unit} completed={completed} onToggle={onToggle} />
            </motion.div>
          ))
        ) : (
          <div className="py-16 text-center text-[10px] uppercase tracking-[0.12em] text-zinc-600">No matching chapters.</div>
        )}
      </div>
    </div>
  );
}
