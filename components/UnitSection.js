'use client';

import { motion } from 'motion/react';
import { getUnitStats } from '@/lib/progress';
import { ProgressBar } from './ProgressBar';
import { ChapterRow } from './ChapterRow';

export function UnitSection({ unit, completed, onToggle }) {
  const stats = getUnitStats(unit, completed);

  return (
    <section className="thin-rule">
      <div className="unit-head">
        <div className="kicker">Unit {String(unit.no).padStart(2, '0')}</div>
        <div>
          <div className="unit-title">{unit.name}</div>
          <div className="mt-2 unit-subtitle">
            {stats.done}/{stats.total} completed · {stats.pyqs2026} PYQs in 2026
          </div>
        </div>
        <div className="text-right">
          <div className="chapter-number">{stats.percentage}%</div>
        </div>
      </div>

      <div className="mb-4">
        <ProgressBar value={stats.percentage} />
      </div>

      <div className="unit-body">
        {unit.chapters.map(([id, name, pyqs2026, note], index) => (
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
            onToggle={onToggle}
          />
        ))}
      </div>

      {stats.done > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-3 text-right text-[9px] uppercase tracking-[0.12em] text-zinc-600"
        >
          {stats.covered2026Marks} of {unit.chapters.reduce((s, [, , pyqs]) => s + pyqs * 4, 0)} 2026-paper marks represented by completed chapters
        </motion.div>
      ) : null}
    </section>
  );
}
