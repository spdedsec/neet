'use client';

import { ArrowLeft, Search, RotateCcw, X } from 'lucide-react';
import { motion } from 'motion/react';
import { getSubjectStats, HIGH_YIELD_THRESHOLD } from '@/lib/progress';
import { ProgressBar } from './ProgressBar';
import { UnitSection } from './UnitSection';
import { Countdown } from './Countdown';
import { useMemo, useState, useEffect } from 'react';

export function SubjectView({
  subject,
  completed,
  starred = {},
  onToggle,
  onToggleStar,
  onSetMultiple,
  onBack,
  onReset
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const stats = getSubjectStats(subject, completed, starred);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (query) {
          setQuery('');
        } else {
          onBack();
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [query, onBack]);

  const filteredUnits = useMemo(() => {
    const q = query.trim().toLowerCase();

    return subject.units
      .map((unit) => {
        const unitNameMatches = !q || unit.name.toLowerCase().includes(q);
        const matchingChapters = unit.chapters.filter(([id, name, pyqs]) => {
          const nameMatches = unitNameMatches || name.toLowerCase().includes(q);
          if (!nameMatches) return false;

          const isDone = Boolean(completed[id]);
          const isStarred = Boolean(starred[id]);
          const isHighYield = pyqs >= HIGH_YIELD_THRESHOLD;

          if (filter === 'completed') return isDone;
          if (filter === 'remaining') return !isDone;
          if (filter === 'high-yield') return isHighYield;
          if (filter === 'starred') return isStarred;
          return true;
        });

        return {
          ...unit,
          chapters: matchingChapters
        };
      })
      .filter((unit) => unit.chapters.length > 0);
  }, [subject, query, filter, completed, starred]);

  return (
    <div>
      <header className="border-b border-zinc-900 pb-7">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-zinc-500 transition hover:text-zinc-100"
          >
            <ArrowLeft size={13} /> Back to overview <span className="text-zinc-600 font-mono text-[9px]">(Esc)</span>
          </button>
          <Countdown compact />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="kicker">Subject / {subject.short}</div>
            <h1 className="mt-3 text-4xl font-normal tracking-[-0.055em] sm:text-6xl">{subject.name}</h1>
          </div>

          <div className="text-right">
            <div className="stat-type font-mono tabular-nums">{stats.percentage}%</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500 tabular-nums">
              {stats.done}/{stats.total} chapters · {stats.covered2026Marks}/{subject.marks} marks
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_auto_auto] md:items-end">
          <ProgressBar value={stats.percentage} />
          <div className="data-pill font-mono tabular-nums">{subject.questions} Q / {subject.marks} MARKS</div>
          <div className="data-pill">{subject.difficulty}</div>
        </div>
      </header>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px] max-w-md search-shell">
          <Search size={14} className="text-zinc-600" />
          <input
            className="search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chapters or units in this subject..."
            aria-label="Search chapters or units"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-zinc-600 hover:text-zinc-200 transition"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            ['all', 'All'],
            ['remaining', 'Remaining'],
            ['completed', 'Completed'],
            ['high-yield', 'High Yield'],
            ['starred', 'Prioritized ★']
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              className={`filter-button ${filter === val ? 'active' : ''}`}
              onClick={() => setFilter(val)}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-1.5 ml-2 text-[10px] uppercase tracking-[0.12em] text-zinc-600 transition hover:text-zinc-200"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      <div className="mt-4">
        {filteredUnits.length ? (
          filteredUnits.map((unit, index) => (
            <motion.div
              key={unit.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: index * 0.025 }}
            >
              <UnitSection
                unit={unit}
                completed={completed}
                starred={starred}
                onToggle={onToggle}
                onToggleStar={onToggleStar}
                onSetMultiple={onSetMultiple}
              />
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center text-[10px] uppercase tracking-[0.14em] text-zinc-600">
            No matching chapters found.
          </div>
        )}
      </div>
    </div>
  );
}

