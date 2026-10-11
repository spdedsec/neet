'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { calculatePace } from '@/lib/progress';

export function getNeetTargetDate() {
  // NEET 2027: 03 May 2027 at 14:00:00 IST
  const target2027 = new Date('2027-05-03T14:00:00+05:30');
  const now = new Date();
  if (now > target2027) {
    const nextYear = now.getFullYear() + (now.getMonth() > 4 || (now.getMonth() === 4 && now.getDate() >= 3) ? 1 : 0);
    return new Date(`${nextYear}-05-03T14:00:00+05:30`);
  }
  return target2027;
}

function pad(num) {
  return String(Math.max(0, num)).padStart(2, '0');
}

export function Countdown({ remainingChapters = 0, totalChapters = 84, compact = false }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  });

  const targetDate = useMemo(() => getNeetTargetDate(), []);

  useEffect(() => {
    setMounted(true);

    function update() {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });
        return;
      }
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setTimeLeft({ days, hours, minutes, seconds, totalSeconds });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pace = useMemo(() => {
    return calculatePace(remainingChapters, timeLeft.days);
  }, [remainingChapters, timeLeft.days]);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 border border-zinc-900 bg-zinc-950/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-zinc-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-200 animate-pulse" />
        <span className="font-mono tabular-nums text-zinc-200">
          {mounted ? `${timeLeft.days}D ${pad(timeLeft.hours)}H ${pad(timeLeft.minutes)}M` : '03 MAY 2027'}
        </span>
        <span className="text-zinc-600">· TARGET</span>
      </div>
    );
  }

  return (
    <div className="countdown-card border border-zinc-800/80 bg-[#0a0a0a] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-100" />
          </span>
          <span className="kicker">Target · 03 May 2027 · 14:00 IST</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500 font-mono">
          NEET UG Examination
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="countdown-segment border border-zinc-900 bg-[#0d0d0d] p-4 text-center transition hover:border-zinc-700">
          <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.04em] tabular-nums text-zinc-100">
            {mounted ? timeLeft.days : '---'}
          </div>
          <div className="mt-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Days</div>
        </div>

        <div className="countdown-segment border border-zinc-900 bg-[#0d0d0d] p-4 text-center transition hover:border-zinc-700">
          <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.04em] tabular-nums text-zinc-100">
            {mounted ? pad(timeLeft.hours) : '--'}
          </div>
          <div className="mt-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Hours</div>
        </div>

        <div className="countdown-segment border border-zinc-900 bg-[#0d0d0d] p-4 text-center transition hover:border-zinc-700">
          <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.04em] tabular-nums text-zinc-100">
            {mounted ? pad(timeLeft.minutes) : '--'}
          </div>
          <div className="mt-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Minutes</div>
        </div>

        <div className="countdown-segment border border-zinc-900 bg-[#0d0d0d] p-4 text-center transition hover:border-zinc-700">
          <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.04em] tabular-nums text-zinc-100">
            {mounted ? pad(timeLeft.seconds) : '--'}
          </div>
          <div className="mt-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">Seconds</div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-4 text-[10px] uppercase tracking-[0.12em] text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="text-zinc-300 font-medium">{remainingChapters} chapters remaining</span>
          <span>·</span>
          <span>Target pace: ~{pace.perWeek} chapters / week</span>
        </div>
        <div className="text-zinc-600">
          {timeLeft.days > 0 ? `${(timeLeft.days / 7).toFixed(1)} weeks left` : 'Exam day'}
        </div>
      </div>
    </div>
  );
}
