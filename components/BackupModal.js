'use client';

import { useState, useRef } from 'react';
import { X, Download, Upload, Copy, Check, AlertTriangle } from 'lucide-react';
import { exportBackup, parseBackup } from '@/lib/storage';

export function BackupModal({
  isOpen,
  onClose,
  completed,
  starred,
  overall,
  subjects,
  onImport,
  onResetAll
}) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  function handleCopySummary() {
    const lines = [
      `NEET / 27 — Syllabus Tracker Summary`,
      `Target: 03 May 2027`,
      `Overall Progress: ${overall.done}/${overall.total} chapters (${overall.percentage}%)`,
      `2026 Score Footprint: ${overall.covered2026Marks}/${overall.marks2026} marks (${overall.marksPercentage}%)`,
      `Priority/Starred Chapters: ${overall.starredCount}`,
      `High-Yield Completed: ${overall.highYieldDone}/${overall.highYieldTotal}`,
      ``,
      `Subject Breakdown:`
    ];

    subjects.forEach((subj) => {
      const chapters = subj.units.flatMap((u) => u.chapters);
      const done = chapters.filter(([id]) => completed[id]).length;
      const pct = Math.round((done / chapters.length) * 100);
      lines.push(`• ${subj.name}: ${done}/${chapters.length} (${pct}%)`);
    });

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }

  function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError('');
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error('Could not read file');
        const state = parseBackup(text);
        onImport(state);
        setImportSuccess(true);
        setTimeout(() => {
          setImportSuccess(false);
          onClose();
        }, 1200);
      } catch (err) {
        setImportError(err.message || 'Failed to parse backup JSON');
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div
        className="w-full max-w-lg border border-zinc-800 bg-[#0c0c0c] p-6 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="backup-modal-title"
      >
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div>
            <div className="kicker">Local-First Storage</div>
            <h2 id="backup-modal-title" className="text-xl font-normal tracking-[-0.03em] mt-1 text-zinc-100">
              Backup & Data Management
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 p-1 transition"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-[12px] leading-5 text-zinc-400">
          Your progress is stored securely in this browser&apos;s <code className="text-zinc-200">localStorage</code>. Export a JSON backup to transfer your progress across devices or safeguard your history.
        </p>

        <div className="mt-6 space-y-3">
          <div className="border border-zinc-900 bg-[#111111] p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-zinc-200">Export Backup</div>
              <div className="text-[10px] uppercase tracking-[0.11em] text-zinc-500 mt-0.5">
                Download .json file containing all chapter and starred states
              </div>
            </div>
            <button
              type="button"
              onClick={() => exportBackup(completed, starred)}
              className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition"
            >
              <Download size={12} /> Download
            </button>
          </div>

          <div className="border border-zinc-900 bg-[#111111] p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-zinc-200">Import Backup</div>
              <div className="text-[10px] uppercase tracking-[0.11em] text-zinc-500 mt-0.5">
                Restore progress from a previously exported JSON backup
              </div>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition"
              >
                <Upload size={12} /> Upload
              </button>
            </div>
          </div>

          <div className="border border-zinc-900 bg-[#111111] p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-zinc-200">Copy Summary</div>
              <div className="text-[10px] uppercase tracking-[0.11em] text-zinc-500 mt-0.5">
                Copy text report of current completion for notes or study journals
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition"
            >
              {copySuccess ? (
                <>
                  <Check size={12} className="text-emerald-400" /> Copied
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {importError ? (
          <div className="mt-4 flex items-center gap-2 border border-red-950 bg-red-950/20 p-3 text-[11px] text-red-400">
            <AlertTriangle size={14} /> {importError}
          </div>
        ) : null}

        {importSuccess ? (
          <div className="mt-4 flex items-center gap-2 border border-emerald-950 bg-emerald-950/20 p-3 text-[11px] text-emerald-400">
            <Check size={14} /> Progress successfully restored!
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between border-t border-zinc-900 pt-4">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all progress? This action cannot be undone.')) {
                onResetAll();
                onClose();
              }
            }}
            className="text-[10px] uppercase tracking-[0.12em] text-red-500/80 hover:text-red-400 transition"
          >
            Reset all data
          </button>

          <button
            type="button"
            onClick={onClose}
            className="border border-zinc-800 px-4 py-2 text-[10px] uppercase tracking-[0.12em] text-zinc-400 hover:text-zinc-200 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
