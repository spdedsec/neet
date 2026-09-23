'use client';

import { motion } from 'motion/react';
import { getSubjectStats } from '@/lib/progress';
import { ProgressBar } from './ProgressBar';

export function SubjectCard({ subject, completed, onOpen }) {
  const stats = getSubjectStats(subject, completed);
  return (
    <motion.button
      type="button"
      className="subject-card text-left"
      whileTap={{ scale: 0.995 }}
      onClick={onOpen}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="kicker">{subject.short}</div>
          <div className="mt-3 text-2xl tracking-[-0.04em]">{subject.name}</div>
        </div>
        <div className="chapter-number">{stats.percentage}%</div>
      </div>

      <div className="mt-9 space-y-3">
        <ProgressBar value={stats.percentage} />
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-zinc-500">
          <span>{stats.done}/{stats.total} chapters</span>
          <span>{subject.marks} marks</span>
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-900 pt-4 text-[10px] uppercase leading-5 tracking-[0.09em] text-zinc-500">
        <div>{subject.difficulty}</div>
        <div className="mt-2 text-zinc-600">2026 paper · {subject.questions} questions</div>
      </div>
    </motion.button>
  );
}
