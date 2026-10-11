'use client';

import { motion } from 'motion/react';
import { getSubjectStats } from '@/lib/progress';
import { ProgressBar } from './ProgressBar';

export function SubjectCard({ subject, completed, starred = {}, onOpen }) {
  const stats = getSubjectStats(subject, completed, starred);

  return (
    <motion.button
      type="button"
      className="subject-card text-left w-full group cursor-pointer"
      whileTap={{ scale: 0.995 }}
      onClick={onOpen}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="kicker">{subject.short}</div>
          <div className="mt-3 text-2xl tracking-[-0.04em] group-hover:text-white transition-colors">{subject.name}</div>
        </div>
        <div className="chapter-number font-mono tabular-nums">{stats.percentage}%</div>
      </div>

      <div className="mt-8 space-y-3">
        <ProgressBar value={stats.percentage} />
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500 tabular-nums">
          <span>{stats.done}/{stats.total} chapters</span>
          <span>{stats.covered2026Marks} / {subject.marks} marks</span>
        </div>
      </div>

      <div className="mt-8 border-t border-zinc-900 pt-4 text-[10px] uppercase leading-5 tracking-[0.09em] text-zinc-500">
        <div className="flex items-center justify-between">
          <span className="truncate max-w-[200px]">{subject.difficulty}</span>
          {stats.starredCount > 0 ? (
            <span className="text-zinc-300 font-mono">★ {stats.starredCount}</span>
          ) : null}
        </div>
        <div className="mt-1 flex items-center justify-between text-zinc-600 font-mono tabular-nums">
          <span>2026 · {subject.questions} Qs</span>
          <span>{stats.highYieldDone}/{stats.highYieldTotal} High-Yield</span>
        </div>
      </div>
    </motion.button>
  );
}

