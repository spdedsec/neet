'use client';

import { motion } from 'motion/react';

export function ProgressBar({ value, className = '' }) {
  return (
    <div className={`progress-track ${className}`} aria-label={`${value}% complete`}>
      <motion.div
        className="progress-fill"
        animate={{ width: `${value}%` }}
        initial={false}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
