'use client';

import { motion } from 'motion/react';
import { CheckCheck, RotateCcw } from 'lucide-react';
import { getUnitStats } from '@/lib/progress';
import { ProgressBar } from './ProgressBar';
import { ChapterRow } from './ChapterRow';

export function UnitSection({
  unit,
  completed,
  starred = {},
  onToggle,
  onToggleStar,
  onSetMultiple
}) {
  const stats = getUnitStats(unit, completed, starred);
  const chapterIds = unit.chapters.map(([id]) => id);

  function handleBatchToggle() {
    if (!onSetMultiple) return;
    if (stats.allCompleted) {
      onSetMultiple(chapterIds, false);
    } else {
      onSetMultiple(chapterIds, true);
    }
  }

  return (
    <section className="thin-rule">
      <div className="unit-head">
        <div className="kicker">Unit {String(unit.no).padStart(2, '0')}</div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="unit-title font-normal">{unit.name}</h2>
            {onSetMultiple ? (
              <button
                type="button"
                onClick={handleBatchToggle}
                className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-zinc-600 transition hover:text-zinc-300"
                title={stats.allCompleted ? 'Reset this unit' : 'Mark all chapters in this unit complete'}
              >
                {stats.allCompleted ? (
                  <>
                    <RotateCcw size={10} /> Reset unit
                  </>
                ) : (
                  <>
                    <CheckCheck size={11} /> Complete unit
                  </>
                )}
              </button>
            ) : null}
          </div>
          <div className="mt-2 unit-subtitle">
            <span className="font-mono tabular-nums">{stats.done}/{stats.total}</span> completed · <span className="font-mono tabular-nums">{stats.pyqs2026}</span> PYQs in 2026
            {stats.starredCount > 0 ? (
              <span className="ml-2 text-zinc-400">· {stats.starredCount} prioritized ★</span>
            ) : null}
          </div>
        </div>
        <div className="text-right">
          <div className="chapter-number font-mono tabular-nums">{stats.percentage}%</div>
        </div>
      </div>

      <div className="mb-4">
        <ProgressBar value={stats.percentage} />
      </div>

      <div className="unit-body">
        {unit.chapters.map(([id, name, pyqs2026, note]) => (
          <ChapterRow
            key={id}
            chapter={{
              id,
              name,
              pyqs2026,
              marks2026: pyqs2026 * 4,
              unitNo: unit.no,
              unitName: unit.name,
              note
            }}
            checked={Boolean(completed[id])}
            isStarred={Boolean(starred[id])}
            onToggle={onToggle}
            onToggleStar={onToggleStar}
          />
        ))}
      </div>

      {stats.done > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-3 text-right font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-600 tabular-nums"
        >
          {stats.covered2026Marks} of {unit.chapters.reduce((s, [, , pyqs]) => s + pyqs * 4, 0)} 2026-paper marks represented by completed chapters
        </motion.div>
      ) : null}
    </section>
  );
}

