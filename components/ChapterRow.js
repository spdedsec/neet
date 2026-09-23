'use client';

import { Check } from 'lucide-react';
import { motion } from 'motion/react';

export function ChapterRow({ chapter, checked, onToggle }) {
  return (
    <motion.div
      layout
      className={`chapter-row ${checked ? 'completed' : ''}`}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: checked ? 0.62 : 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-600">
        {String(chapter.unitNo).padStart(2, '0')}
      </div>

      <div className="min-w-0">
        <div className="chapter-name truncate text-[13px] leading-5 text-zinc-100">{chapter.name}</div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.11em] text-zinc-600 md:hidden">
          {chapter.unitName}
        </div>
      </div>

      <div className="chapter-meta text-right text-[10px] uppercase tracking-[0.1em] text-zinc-500">
        {chapter.pyqs2026} PYQ{chapter.pyqs2026 === 1 ? '' : 'S'}
      </div>

      <div className="chapter-marks text-right text-[10px] uppercase tracking-[0.1em] text-zinc-500">
        {chapter.marks2026} MARKS
      </div>

      <button
        type="button"
        className="square-check justify-self-end"
        data-checked={checked}
        aria-label={checked ? `Mark ${chapter.name} incomplete` : `Mark ${chapter.name} complete`}
        aria-pressed={checked}
        onClick={() => onToggle(chapter.id)}
      >
        {checked ? <Check size={12} strokeWidth={2.5} /> : null}
      </button>
    </motion.div>
  );
}
