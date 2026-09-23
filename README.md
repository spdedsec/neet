# NEET / 27 — Syllabus Tracker

A minimal, responsive NEET 2027 chapter-completion tracker inspired by the supplied black-and-white editorial reference image.

The project is intentionally local-first: there is no database, authentication, API, or account system in v1. Chapter completion is stored in the browser with `localStorage`.

## Stack

- **Next.js App Router** — application framework
- **JavaScript** — deliberately chosen instead of TypeScript for this small, data-first app
- **React** — component/state layer
- **Tailwind CSS v4** — utility styling
- **Custom CSS** — typography, grid layout, responsive behavior, micro-interactions
- **Motion for React** — progress animation, layout transitions, subtle entrances
- **Lucide React** — lightweight icon set
- **Static export** — `next.config.mjs` uses `output: 'export'`

## Why this architecture?

This application does not need a server to do its primary job. The syllabus is static data and the user's progress is a tiny object of completed chapter IDs. A backend would add operational and deployment complexity without improving the core experience.

The app therefore behaves like a fast client-side tracker while still using Next.js so it can later grow into a full application if needed.

If cloud sync is ever added, the data layer can be moved behind a small persistence service without rewriting the visual components.

## Features

### Current

- Full Physics, Chemistry and Biology chapter/unit structure based on the current NMC 2026 syllabus reference used for this project (30 mapped Physics chapters, 21 Chemistry chapter entries, 32 Biology chapters = 84 tracked entries; 20 + 20 + 10 official units)
- 2026 paper PYQ counts mapped to chapters
- 2026 marks footprint (`PYQs × 4`) shown next to chapter data
- Overall completion percentage
- Subject-level completion percentages
- Unit-level completion percentages
- Chapter completion checkbox/toggle
- Persistent progress using browser `localStorage`
- Subject drill-down pages
- Search chapters and units
- Filters: All / Not started / In progress / Completed
- Reset one subject or reset everything
- Responsive desktop/tablet/mobile layout
- Minimal black/white/grey visual system
- Smooth, restrained motion rather than long decorative animations
- Static export suitable for simple hosting

### Intentional design constraints

The interface avoids:

- gradients as decoration
- large rounded cards
- glassmorphism
- excessive shadowing
- giant animation sequences
- fake AI/education dashboard styling
- unnecessary backend infrastructure

The supplied visual reference is treated as an art-direction reference: dark, sparse, typographic, monochrome, editorial, and slightly industrial.

## Data model

The canonical dataset is in:

```text
data/subjects.js
```

Each subject contains units, and each unit contains chapters represented as:

```js
[id, name, pyqs2026]
```

The app normalizes that data with `flattenSubjects()` into chapter objects containing:

```js
{
  id,
  name,
  pyqs2026,
  marks2026,
  unitId,
  unitNo,
  unitName,
  subjectId,
  subjectName
}
```

### Important data note

The NMC syllabus itself is an official syllabus source. Chapter-wise 2026 PYQ counts in this tracker are a reconstructed mapping of the 21 June 2026 paper, not an official NTA chapter-weightage table.

That distinction is visible in the UI and should be preserved if the dataset is expanded.

## Progress model

Completion is **chapter-count based**.

For example:

```text
Physics: 10 completed / 31 chapters = 32%
```

The app separately shows the 2026-paper mark footprint represented by completed chapters. That number is intentionally informational and should not be interpreted as predicted 2027 weightage.

## Storage

The browser key is:

```text
neet-27-tracker:completed:v1
```

The value is a small JSON object. Each value is a completion timestamp so the dashboard can show the most recently completed chapters:

```json
{
  "electric-charges-fields": 1780000000000,
  "chemical-bonding": 1780000005000
}
```

To clear progress manually in a browser, delete that localStorage key or use the in-app reset action.

## Project structure

```text
neet-27-tracker/
├── app/
│   ├── globals.css          # global design system and responsive styles
│   ├── layout.js            # root layout + metadata
│   └── page.js              # application entry
│
├── components/
│   ├── ChapterRow.js        # chapter completion row
│   ├── Dashboard.js         # main overview screen
│   ├── ProgressBar.js       # animated progress bar
│   ├── SubjectCard.js       # subject overview card
│   ├── SubjectView.js       # subject detail screen
│   └── UnitSection.js        # unit + chapter group
│
├── data/
│   └── subjects.js          # all syllabus + 2026 mapping data
│
├── hooks/
│   └── useProgress.js       # localStorage-backed completion state
│
├── lib/
│   ├── progress.js          # derived stats/calculations
│   └── storage.js           # persistence helpers
│
├── public/                  # static assets
├── design-reference.png     # supplied visual reference; not loaded at runtime
├── next.config.mjs          # static export configuration
├── postcss.config.mjs       # Tailwind v4 PostCSS integration
├── jsconfig.json            # import aliases
├── package.json
└── README.md
```

## Local development

### Requirements

- Node.js 20+
- npm 10+

Node 22 is also a good fit.

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
```

Because the app uses static export, the generated site is placed in:

```text
out/
```

### Local production preview

After building, the easiest preview is any static HTTP server. For example:

```bash
npx serve out
```

## Deployment

### Vercel

The project can be deployed directly from the repository. Because `output: 'export'` is enabled, the result is a static site.

### GitHub Pages / Cloudflare Pages / Netlify / static hosting

Upload the contents of `out/` or configure the host to run:

```bash
npm install
npm run build
```

with the publish directory set to:

```text
out
```

## Validating the dataset

Run:

```bash
npm run validate:data
```

The validator confirms that the chapter mapping sums to 45 Physics questions, 45 Chemistry questions, and 90 Biology questions (180 total).

## Updating syllabus data

Do not edit components to change syllabus content.

Update:

```text
data/subjects.js
```

For a new year, a simple approach is to preserve stable IDs and change only the data fields:

```js
['coordination-compounds', 'Coordination Compounds', 6]
```

The completion system is ID-based, so stable IDs matter.

If a chapter is renamed but remains the same conceptual chapter, keep its ID where possible. If it is genuinely replaced by a different syllabus item, create a new ID.

## Adding historical paper years

The current schema only stores 2026 PYQ counts. A future version can evolve this from:

```js
pyqs2026: 6
```

to:

```js
pyqs: {
  2026: 6,
  2025: 5,
  2024: 4
}
```

Then the UI can calculate:

- multi-year frequency
- historical marks footprint
- chapter recurrence
- trend charts

Do not call such a metric “predicted weightage” unless the methodology is explicitly defined and appropriately caveated.

## Adding cloud sync later

A good upgrade path is:

1. Keep `useProgress()` as the UI-facing API.
2. Replace only the persistence implementation.
3. Add an authenticated user ID.
4. Store completed chapter IDs in a small user-progress table.
5. Optionally add last-updated timestamps for conflict resolution.

Supabase, Firebase, or a small custom API can all fit this model.

## Accessibility notes

- Completion controls are real `<button>` elements.
- `aria-pressed` indicates chapter state.
- Search has an accessible label.
- The interface remains usable without hover.
- Motion is mostly decorative and should not be required to understand state.

A future accessibility pass could add a `prefers-reduced-motion` switch around Motion transitions.

## Design notes for contributors

Preserve these principles when adding UI:

### 1. Hierarchy through scale, not decoration

Use typography and whitespace before adding cards, badges, or color.

### 2. Monochrome first

Default palette is black / off-white / grey. Introduce a new color only when it represents a real semantic state.

### 3. Motion should communicate state

Use short transitions for:

- progress changes
- row completion
- view transitions
- filtered content

Avoid perpetual motion and long entrance animations.

### 4. Prefer borders to shadows

The visual language is editorial/Swiss-inspired rather than “modern SaaS”.

### 5. Keep data out of UI components

Put syllabus changes in `data/subjects.js` and calculations in `lib/progress.js`.

## Source references

- NMC / UGMEB public notice finalizing the NEET (UG)-2026 syllabus: https://nta.ac.in/Download/Notice/Notice_20260108180635.pdf
- NMC news archive entry for the updated NEET (UG)-2026 syllabus: https://www.nmc.org.in/information-desk/all-news/
- 21 June 2026 re-exam chapterwise mapping used for the initial dataset: https://www.scribd.com/document/1074969074/NEET-2026-Re-Test-Question-Paper-and-Solutions

## Known limitations

- Progress is currently browser-local and device-specific.
- There is no authentication or cross-device sync.
- Historical question mapping is 2026-only in the initial dataset.
- The app is a tracker, not a test engine.
- 2026 chapter counts are not official NTA weightage data.

## Suggested next features

The architecture is ready for:

- daily study logs
- revision queue
- chapter status beyond done/not-done
- notes per chapter
- PYQ-year drill-down
- mock-test scores
- weak-topic detection
- CSV/JSON backup and restore
- cloud sync
- installable PWA/offline cache

For a study tracker, the most useful next upgrade is probably **status beyond a binary checkbox**:

```text
NOT STARTED → LEARNING → REVISED → MASTERED
```

That would allow progress to represent actual revision state instead of only first completion.

## License

No license is declared by default. Add one before public redistribution.
