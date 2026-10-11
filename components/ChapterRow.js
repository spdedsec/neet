'use client';

import { Check, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { HIGH_YIELD_THRESHOLD } from '@/lib/progress';

export function ChapterRow({
  chapter,
  checked,
  isStarred = false,
  onToggle,
  onToggleStar,
  showSubject = false
}) {
  const isHighYield = (chapter.pyqs2026 ?? 0) >= HIGH_YIELD_THRESHOLD;

  return (
    <motion.div
      layout
      className={`chapter-row ${checked ? 'completed' : ''}`}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: checked ? 0.62 : 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="text-[10px] font-mono tabular-nums uppercase tracking-[0.12em] text-zinc-600">
        {String(chapter.unitNo).padStart(2, '0')}
      </div>

      <div className="min-w-0 pr-2">
        <div className="flex items-center gap-2">
          <span className="chapter-name truncate text-[13px] leading-5 text-zinc-100">{chapter.name}</span>
          {isHighYield ? (
            <span className="shrink-0 rounded-none border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-zinc-400">
              High Yield
            </span>
          ) : null}
        </div>
        <div className="mt-1 flex items-center gap-2 text-[9px] uppercase tracking-[0.11em] text-zinc-600 md:hidden">
          {showSubject && chapter.subjectShort ? <span>{chapter.subjectShort} ·</span> : null}
          <span>{chapter.unitName}</span>
        </div>
      </div>

      <div className="chapter-meta text-right font-mono tabular-nums text-[10px] uppercase tracking-[0.1em] text-zinc-500">
        {chapter.pyqs2026} PYQ{chapter.pyqs2026 === 1 ? '' : 'S'}
      </div>

      <div className="chapter-marks text-right font-mono tabular-nums text-[10px] uppercase tracking-[0.1em] text-zinc-500">
        {chapter.marks2026} MARKS
      </div>

      <div className="flex items-center justify-end gap-1.5 justify-self-end">
        <button
          type="button"
          className={`star-button ${isStarred ? 'starred' : ''}`}
          aria-label={isStarred ? `Unstar ${chapter.name}` : `Star ${chapter.name} for priority revision`}
          aria-pressed={isStarred}
          title={isStarred ? 'Prioritized for revision' : 'Star for revision'}
          onClick={() => onToggleStar?.(chapter.id)}
        >
          <Star
            size={13}
            fill={isStarred ? '#f0f0ea' : 'none'}
            strokeWidth={isStarred ? 1 : 1.5}
            className={isStarred ? 'text-zinc-100' : 'text-zinc-600 hover:text-zinc-300'}
          />
        </button>

        <button
          type="button"
          className="square-check"
          data-checked={checked}
          aria-label={checked ? `Mark ${chapter.name} incomplete` : `Mark ${chapter.name} complete`}
          aria-pressed={checked}
          onClick={() => onToggle(chapter.id)}
        >
          {checked ? <Check size={12} strokeWidth={2.5} /> : null}
        </button>
      </div>
    </motion.div>
  );
}

