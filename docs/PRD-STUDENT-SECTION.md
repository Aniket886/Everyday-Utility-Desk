# Product Requirements Document: Everyday Utility Desk — Student Section

**Document status:** Proposed

**Version:** 1.0

**Date:** 6 November 2026

**Product:** Everyday Utility Desk

**Audience:** Product, design, frontend, backend, QA, and accessibility contributors

## Overview

### Product Summary

The Student Section expands Everyday Utility Desk with exactly 30 free, subscription-free tools for bachelor’s students, master’s students, PhD researchers, and independent researchers across disciplines. The tools support academic writing, evidence management, data analysis, programming, study planning, mathematics, and project execution.

The four existing utilities—Create QR, Scan QR, Convert Files, and Media Download—remain available but are not counted among the 30 Student Section tools. The new section must preserve the product’s local-first positioning: primary data processing occurs in the browser or on the user’s local Node process, with no required account, subscription, telemetry, or cloud storage.

### Current Product Baseline

- **Frontend:** React 18, TypeScript, Vite, Lucide icons, one primary `App.tsx`, and global CSS.
- **Local server:** Express with a production static-file host and endpoints for the existing media tool.
- **Existing processing libraries:** PDF.js, PDF-Lib, Mammoth, JSZip, QRCode, and QR Scanner.
- **Current interaction model:** Fixed tool navigation, central workspace, and recent-activity rail.
- **Current constraint:** The source is organized around four tools in a monolithic component; adding 30 tools without modularization would create unacceptable bundle size, navigation complexity, and maintenance risk.

### Problem Statement

Students routinely move among unrelated websites for citations, notes, statistics, code experiments, diagrams, and study planning. Those services often require accounts, upload sensitive work, impose limits, or interrupt the task with advertising. Everyday Utility Desk should provide a coherent local workspace for the most frequent cross-disciplinary tasks without attempting to replace specialist research software.

### Goals

- Provide 30 high-utility tools covering the most common cross-disciplinary student workflows.
- Keep core functionality local, free, and usable without registration.
- Make any tool reachable by search or category navigation in two interactions or fewer.
- Preserve files and drafts locally with explicit export and recovery options.
- Maintain a dark-only professional interface at every route, state, and breakpoint.
- Create a modular platform so future tools can be added without editing the application shell.

### Non-Goals

- Replacing full reference managers, statistical suites, IDEs, or qualitative-analysis platforms.
- Required cloud synchronization, team collaboration, institutional login, or paid APIs.
- Generative-AI features that require hosted inference or usage-based billing.
- Light-theme support or a theme selector.
- Duplicating the four existing utilities.

### Success Metrics

- At least 90% of primary tool tasks complete without a network request.
- Initial shell loads in under 2.5 seconds on a mid-range laptop; individual tools load on demand.
- At least 95% task completion in scripted usability tests for the top 10 tools.
- Zero critical accessibility violations; WCAG 2.2 AA contrast and keyboard operation across all tools.
- No user document content leaves the device unless the user deliberately uses the API Request Builder.
- Crash-free processing for supported files up to the documented per-tool size threshold.

### Core User Stories

- As a student, I can find the right utility by typing a task such as “cite,” “clean CSV,” or “plot graph.”
- As a researcher, I can process unpublished data without uploading it to a third party.
- As a programmer, I can inspect, format, and test small inputs without opening a full IDE.
- As a thesis writer, I can move citations, notes, extracted annotations, and outlines between tools using local files.
- As a returning user, I can reopen locally saved work and export a backup without creating an account.

## Selected Tools (Top 30)

The following list contains exactly 30 new tools. Selection favors cross-disciplinary frequency, local feasibility, interoperability, and value relative to implementation cost.

| # | Category | Tool | Delivery wave |
|---:|---|---|---|
| 1 | Research & Writing | Citation Generator | 1 |
| 2 | Research & Writing | BibTeX Manager | 1 |
| 3 | Research & Writing | Literature Review Matrix | 2 |
| 4 | Research & Writing | PDF Annotation Extractor | 2 |
| 5 | Research & Writing | OCR Workspace | 2 |
| 6 | Research & Writing | Academic Writing Analyzer | 1 |
| 7 | Research & Writing | Text Difference Viewer | 1 |
| 8 | Research & Writing | Research Notes Organizer | 2 |
| 9 | Data & Statistics | CSV Explorer | 1 |
| 10 | Data & Statistics | Dataset Cleaner | 1 |
| 11 | Data & Statistics | Descriptive Statistics Calculator | 1 |
| 12 | Data & Statistics | Statistical Test Assistant | 2 |
| 13 | Data & Statistics | Chart Builder | 2 |
| 14 | Data & Statistics | Survey Response Analyzer | 3 |
| 15 | Programming | Code Playground | 1 |
| 16 | Programming | Regular Expression Tester | 1 |
| 17 | Programming | JSON Toolkit | 1 |
| 18 | Programming | SQL Practice Lab | 2 |
| 19 | Programming | Markdown & LaTeX Editor | 1 |
| 20 | Programming | Code Formatter | 2 |
| 21 | Programming | API Request Builder | 3 |
| 22 | Study & Knowledge | Pomodoro Study Timer | 1 |
| 23 | Study & Knowledge | Task & Deadline Planner | 2 |
| 24 | Study & Knowledge | Spaced-Repetition Flashcards | 2 |
| 25 | Study & Knowledge | Concept Map Builder | 3 |
| 26 | Study & Knowledge | Reading List Manager | 2 |
| 27 | Mathematics | Equation, Graph & Matrix Workbench | 3 |
| 28 | Mathematics | Scientific Unit Converter | 1 |
| 29 | Projects | Diagram Builder | 3 |
| 30 | Projects | Personal Project Kanban | 3 |

## Tool Details

### Research & Writing

#### 1. Citation Generator

- **Purpose:** Produce correctly structured citations and bibliographies without a hosted citation service.
- **Key features:** Manual source entry; APA, MLA, Chicago, Harvard, Vancouver, and IEEE styles; live preview; copy; BibTeX and RIS export; validation for missing fields.
- **Integration points:** Use Citation.js with locally bundled CSL styles; send records to BibTeX Manager and Reading List Manager; store recent sources in IndexedDB.

#### 2. BibTeX Manager

- **Purpose:** Create, inspect, search, merge, and repair bibliography files used by LaTeX and reference workflows.
- **Key features:** `.bib` import/export; structured and raw modes; duplicate detection; required-field validation; citation-key generation; sort and filter.
- **Integration points:** Reuse Citation.js parsing; accept Citation Generator output; expose selected entries to the Literature Review Matrix and Markdown & LaTeX Editor.

#### 3. Literature Review Matrix

- **Purpose:** Compare research papers consistently and expose themes, disagreements, methods, limitations, and gaps.
- **Key features:** Configurable columns; sortable rows; tags; status; evidence quotations with page references; CSV/JSON export; printable view.
- **Integration points:** Import BibTeX, RIS, or CSV; attach records from Reading List Manager; link extracted PDF annotations without copying source files into the database.

#### 4. PDF Annotation Extractor

- **Purpose:** Recover highlights, comments, page references, and document metadata from annotated PDFs.
- **Key features:** File drop; annotation type filters; page thumbnails; text/comment extraction; Markdown, CSV, and JSON export; extraction warnings for unsupported annotations.
- **Integration points:** Build on PDF.js; run parsing in a Web Worker; send selected annotations to Research Notes Organizer or Literature Review Matrix.

#### 5. OCR Workspace

- **Purpose:** Convert scanned pages, photographed notes, and image-based documents into editable text locally.
- **Key features:** Image/PDF input; language selection from installed packs; rotation and crop; confidence indicators; side-by-side source/text view; TXT and searchable-text export.
- **Integration points:** Use Tesseract.js in a dedicated worker; reuse PDF rendering; cap concurrent jobs; allow output to open in Academic Writing Analyzer.

#### 6. Academic Writing Analyzer

- **Purpose:** Improve clarity and consistency using transparent, deterministic checks rather than hosted AI.
- **Key features:** Word and sentence counts; reading time; long-sentence detection; passive-voice heuristics; repeated phrases; filler words; heading structure; user-managed terminology list.
- **Integration points:** Shared editor component; analysis worker; accept TXT, DOCX text, Markdown, or pasted content; export a non-destructive issue report.

#### 7. Text Difference Viewer

- **Purpose:** Compare drafts, code, transcripts, or extracted text and make revisions visible.
- **Key features:** Side-by-side and unified views; character, word, or line comparison; whitespace controls; change counts; copy and HTML report export.
- **Integration points:** Use a local diff library; accept two files or text areas; integrate with Research Notes and Markdown & LaTeX Editor through “Compare with…” actions.

#### 8. Research Notes Organizer

- **Purpose:** Maintain searchable, source-linked research notes without a hosted notebook service.
- **Key features:** Markdown notes; tags; backlinks; source and page fields; pinned notes; full-text search; JSON/Markdown ZIP backup and restore.
- **Integration points:** Store data in IndexedDB through a versioned repository layer; receive citations and annotations; sanitize rendered Markdown; provide explicit export before destructive reset.

### Data & Statistics

#### 9. CSV Explorer

- **Purpose:** Inspect tabular data quickly before analysis or cleaning.
- **Key features:** CSV/TSV import; encoding and delimiter detection; virtualized table; sort, filter, search, column typing, summary profile, and selection export.
- **Integration points:** Parse with Papa Parse in a worker; use shared dataset schema; hand the active dataset to Dataset Cleaner, Statistics Calculator, Chart Builder, or Survey Analyzer.

#### 10. Dataset Cleaner

- **Purpose:** Apply common reproducible corrections to local tabular datasets.
- **Key features:** Trim and normalize; missing-value handling; duplicate removal; date and numeric conversion; column rename/split/merge; undo history; transformation recipe export.
- **Integration points:** Consume the shared dataset schema; execute operations in a worker; export cleaned CSV plus a JSON recipe; maintain immutable checkpoints rather than mutating the source file.

#### 11. Descriptive Statistics Calculator

- **Purpose:** Calculate trustworthy summary statistics for numeric and categorical variables.
- **Key features:** Count, missing count, mean, median, mode, variance, standard deviation, range, quartiles, interquartile range, frequency table, and outlier flags.
- **Integration points:** Use simple-statistics or validated internal functions; accept pasted values or CSV Explorer columns; publish result tables to Chart Builder and clipboard.

#### 12. Statistical Test Assistant

- **Purpose:** Guide users through common statistical tests while explaining assumptions and outputs.
- **Key features:** Test selector based on variable types; independent/paired t-test; chi-square; Pearson/Spearman correlation; one-way ANOVA; effect size; confidence intervals; assumption checklist.
- **Integration points:** Use jStat or equivalent local math libraries; accept selected dataset columns; include calculation provenance and test fixtures; explicitly state that interpretation does not replace expert review.

#### 13. Chart Builder

- **Purpose:** Turn local datasets into publication-ready exploratory charts.
- **Key features:** Bar, line, scatter, histogram, box plot, and heatmap; field mapping; labels; accessible palettes; SVG/PNG export; data-table alternative.
- **Integration points:** Consume shared datasets and statistical results; use ECharts or Plotly with tree-shaken imports; save chart specification separately from data.

#### 14. Survey Response Analyzer

- **Purpose:** Summarize common questionnaire structures without external survey-analysis software.
- **Key features:** Likert detection and recoding; frequencies and percentages; cross-tabulation; multi-select parsing; missing-response report; simple keyword counts for open text; anonymized export.
- **Integration points:** Build on CSV Explorer and Statistics Calculator; reuse Chart Builder; require a column-mapping step and preview before analysis.

### Programming

#### 15. Code Playground

- **Purpose:** Run small HTML, CSS, and JavaScript experiments in a safe local learning environment.
- **Key features:** Split editors; live preview; console capture; reset; downloadable project; starter templates; execution timeout.
- **Integration points:** Use CodeMirror 6 and a sandboxed iframe with restrictive permissions; no Node execution; keep preview origin isolated where supported.

#### 16. Regular Expression Tester

- **Purpose:** Teach and validate regular expressions against sample text.
- **Key features:** Match highlighting; capture groups; flags; replace preview; match table; common-pattern library; zero-length-match protection.
- **Integration points:** Use the browser RegExp engine in a worker with execution guardrails; allow examples to open in Code Playground; clearly label engine compatibility.

#### 17. JSON Toolkit

- **Purpose:** Inspect and transform JSON used in programming, research data, and configuration files.
- **Key features:** Validate; format; minify; tree view; path copy; JSON Pointer search; sort keys; compare documents; JSON-to-CSV for flat records.
- **Integration points:** Shared code editor; worker parsing for large inputs; route tab state in the URL; send tabular output to CSV Explorer.

#### 18. SQL Practice Lab

- **Purpose:** Learn SQL and query local datasets without installing a database server.
- **Key features:** SQLite-compatible editor; sample databases; CSV import; schema browser; result grid; query history; execution timing; database export.
- **Integration points:** Use `sql.js` WebAssembly in a worker; import shared datasets; place limits on result rows; lazy-load the WASM asset only on the tool route.

#### 19. Markdown & LaTeX Editor

- **Purpose:** Draft technical notes, assignments, reports, and mathematical content with live preview.
- **Key features:** Markdown preview; GitHub-style tables and task lists; KaTeX math; outline; word count; file import/export; HTML and printable output.
- **Integration points:** Reuse CodeMirror; render with Markdown-it and KaTeX; sanitize all output; open BibTeX citation keys and Research Notes content.

#### 20. Code Formatter

- **Purpose:** Format small source files consistently without sending code to an online formatter.
- **Key features:** JavaScript, TypeScript, JSON, CSS, HTML, Markdown, SQL, and Python formatting; indentation controls; before/after diff; copy and download.
- **Integration points:** Lazy-load Prettier standalone parsers and language-specific formatters; use Text Difference Viewer for preview; execute expensive formatting in a worker.

#### 21. API Request Builder

- **Purpose:** Let students learn HTTP and test APIs they are authorized to access.
- **Key features:** Method, URL, query, headers, and body editors; response headers/body; timing; saved local requests; cURL export; JSON formatting.
- **Integration points:** Browser requests by default; an opt-in local Express proxy for CORS-blocked endpoints; strict SSRF controls, private-network warnings, size/time limits, secret masking, and no request telemetry.

### Study & Knowledge

#### 22. Pomodoro Study Timer

- **Purpose:** Support structured focus sessions without an account or distracting service.
- **Key features:** Configurable work/break lengths; pause/resume; keyboard controls; optional notification; session labels; daily/weekly local summaries.
- **Integration points:** Shared local settings; Visibility API handling; timestamp-based recovery after sleep; link sessions to Planner tasks without requiring the Planner.

#### 23. Task & Deadline Planner

- **Purpose:** Track assignments, research milestones, exams, and submission dates.
- **Key features:** List and calendar views; priority; course/project labels; subtasks; recurring items; due-date filters; iCalendar and JSON export.
- **Integration points:** IndexedDB repository; use native date/time handling with explicit timezone display; link focus sessions; route filters in query parameters.

#### 24. Spaced-Repetition Flashcards

- **Purpose:** Improve long-term retention through locally calculated review schedules.
- **Key features:** Decks; front/back and cloze cards; image attachments; SM-2-style scheduling; keyboard review; CSV/JSON import/export; progress summaries.
- **Integration points:** IndexedDB blob storage with quota checks; deterministic scheduling service; optional import from Research Notes headings; no remote deck marketplace.

#### 25. Concept Map Builder

- **Purpose:** Visualize relationships among theories, variables, sources, concepts, and study topics.
- **Key features:** Node and edge editing; labels and colors; grouping; keyboard navigation; auto-layout; search; PNG/SVG/JSON export.
- **Integration points:** Use React Flow with ELK/Dagre layout; store only local graph documents; accept note links and citation identifiers as metadata.

#### 26. Reading List Manager

- **Purpose:** Organize papers, books, standards, and course readings by status and priority.
- **Key features:** To-read/reading/completed states; tags; rating; due date; source metadata; notes; filters; BibTeX/RIS/CSV import and export.
- **Integration points:** Share citation schema with Citation Generator and BibTeX Manager; send selected items to Literature Review Matrix; IndexedDB persistence.

### Mathematics & Projects

#### 27. Equation, Graph & Matrix Workbench

- **Purpose:** Support common quantitative coursework and exploratory calculations in one technical workspace.
- **Key features:** Scientific expressions; equation solving; 2D function plotting; matrices, determinants, inverses, and systems of linear equations; calculation history; exportable results.
- **Integration points:** Use Math.js and a local plotting library; parse expressions without JavaScript evaluation; isolate long calculations in a worker; allow chart export to Diagram Builder.

#### 28. Scientific Unit Converter

- **Purpose:** Convert quantities used across science, engineering, computing, economics, and everyday work.
- **Key features:** Length, area, volume, mass, temperature, time, pressure, energy, power, speed, data size, and angle; precision controls; formula display; favorites.
- **Integration points:** Use a reviewed local conversion table; no arbitrary code evaluation; persist favorites in local settings; expose copyable normalized values.

#### 29. Diagram Builder

- **Purpose:** Create flowcharts, process diagrams, sequence diagrams, timelines, and simple system models.
- **Key features:** Text-based Mermaid mode; visual preview; templates; validation with line-specific errors; SVG/PNG export; source download.
- **Integration points:** Lazy-load Mermaid; sandbox rendered output; accept chart SVGs and Markdown embeds; keep diagram source as the canonical saved format.

#### 30. Personal Project Kanban

- **Purpose:** Organize dissertations, laboratories, capstones, coursework, and personal projects visually.
- **Key features:** Boards, columns, draggable tasks, labels, checklists, due dates, filters, archive, and JSON backup/restore.
- **Integration points:** IndexedDB persistence; accessible drag-and-drop with keyboard alternatives; create cards from Planner tasks without creating a second conflicting record.

## Implementation Plan

### Target Information Architecture

```text
Everyday Utility Desk
├── Everyday Tools
│   ├── Create QR
│   ├── Scan QR
│   ├── Convert Files
│   └── Media Download
└── Student Section
    ├── Research & Writing (8)
    ├── Data & Statistics (6)
    ├── Programming (7)
    ├── Study & Knowledge (5)
    ├── Mathematics (2)
    └── Projects (2)
```

### Navigation Model

- Replace the flat tool array with a typed tool registry containing `id`, `slug`, `category`, `keywords`, `icon`, `loader`, `privacyMode`, and supported file types.
- Add a global tool search/command palette opened with `Ctrl/Cmd + K`.
- Use expandable category groups in the desktop rail; show recent and pinned tools above groups.
- Use a searchable full-height drawer on small screens rather than placing 30 tools in bottom navigation.
- Give every tool a bookmarkable route: `/student/:toolSlug`; store tool-specific tabs and filters in query parameters when practical.
- Preserve browser back/forward behavior with React Router and use real links for navigation.

### Proposed Source Structure

```text
src/
├── app/
│   ├── AppShell.tsx
│   ├── router.tsx
│   ├── toolRegistry.ts
│   └── providers/
├── features/
│   ├── existing/
│   └── student/
│       ├── citation-generator/
│       ├── bibtex-manager/
│       └── ...one folder per selected tool
├── shared/
│   ├── components/
│   ├── editors/
│   ├── files/
│   ├── datasets/
│   ├── storage/
│   ├── workers/
│   ├── validation/
│   └── design-tokens/
├── styles/
└── test/
```

Each feature folder must expose a route component, metadata, validation schema, worker/service boundary, tests, and optional import/export adapters. No feature may directly read another feature’s IndexedDB tables; interoperability occurs through typed shared schemas.

### Shared Platform Services

- **File intake:** Central drag/drop, MIME and extension validation, size limits, cancelation, error recovery, and file metadata display.
- **Local storage:** Versioned IndexedDB via Dexie; quotas and failure states; explicit JSON/ZIP backup and restore; no automatic remote sync.
- **Worker pool:** Web Worker abstraction for OCR, parsing, statistics, formatting, and large-table operations; progress and cancelation messages.
- **Dataset schema:** Typed column definitions, missing values, transformations, and provenance shared by all data tools.
- **Citation schema:** CSL-compatible records shared by research tools.
- **Editor platform:** CodeMirror-based editor wrapper with language loading, accessible commands, search, and resize behavior.
- **Export service:** Consistent filename rules, Blob download, SVG/PNG/PDF helpers, and safe HTML sanitization.
- **Activity service:** Extend recent activity to record tool, action, timestamp, and local result reference without recording document content.
- **Error model:** Standard inline errors, actionable remedies, worker failures, unsupported files, quota exhaustion, and recoverable state.

### Performance Strategy

- Route-level lazy loading for every Student Section tool.
- Dynamic import of heavy libraries such as Tesseract.js, Mermaid, SQL.js, plotting, and formatters.
- Web Workers for CPU-heavy tasks; never block the main thread for more than 50 ms during normal interaction.
- Virtualize tables and long lists beyond 100 visible rows/items.
- Cache immutable WASM and worker assets with a service worker after first use.
- Establish budgets: shell JavaScript under 250 KB gzip; no unused tool code in the initial chunk; route interaction ready within 1 second after cached load.

### Privacy and Security Requirements

- No required analytics, account, advertising SDK, or remote font request.
- Self-host fonts and runtime assets.
- Display a clear “Local processing” indicator only when the current operation is truly local.
- Sanitize Markdown, HTML, SVG, and Mermaid output before insertion.
- Sandbox executable previews; prohibit `eval` in mathematical and data-expression paths.
- Apply URL allow/deny rules, timeouts, response-size limits, and SSRF protection to the API proxy.
- Never persist API authorization headers unless the user explicitly saves a request; mask secrets in history and screenshots.
- Maintain a dependency review and lockfile policy; test file parsers with malformed and adversarial fixtures.

### Quality and Testing

- Unit tests for parsers, transformations, statistics, schedule algorithms, and export schemas.
- Component tests for empty, loading, success, invalid, quota, and large-input states.
- End-to-end tests for one canonical workflow per tool plus cross-tool handoffs.
- Golden fixtures for citations, statistics, OCR, BibTeX, SQL, and formatting.
- Axe-based accessibility checks plus manual keyboard and screen-reader validation.
- Visual regression at 360 × 800, 768 × 1024, 1280 × 720, and 1440 × 900.
- Performance tests with representative 10 MB documents and 100,000-row datasets, with lower documented limits where browser memory requires them.

### Definition of Done for Each Tool

- Primary task, empty state, validation, progress, cancelation, success, and failure paths are implemented.
- Keyboard navigation, focus order, labels, announcements, and contrast pass accessibility review.
- Local-processing claim is accurate and documented.
- Import/export round-trip passes fixture tests.
- Tool is lazy-loaded, responsive, and registered in search/navigation.
- Help text states supported formats, size limits, and calculation or interpretation caveats.
- No console errors, uncaught worker errors, or unreviewed network requests.

## UI/UX Guidelines

### Visual Direction

Use a dark, technical workbench rather than a decorative “dark SaaS” aesthetic. The interface should feel like a serious research instrument: low-glare canvas, strong type contrast, thin structural dividers, compact controls, and a single warm action accent. Cards are reserved for selectable or movable objects; ordinary grouping uses spacing, headings, and borders.

The interface is dark-only. Do not implement a light palette, automatic theme switching, or a theme toggle.

### Layout

- **Desktop:** 264 px navigation rail, flexible primary workspace, optional 300 px context/inspector rail.
- **Tablet:** Collapsible navigation rail; inspector becomes an overlay sheet.
- **Mobile:** 56 px header plus searchable navigation drawer; tool workspace uses one column; primary actions may use a sticky bottom action bar when necessary.
- Keep dense work areas full width; constrain explanatory prose to 65 characters per line.
- Avoid a homepage grid of 30 identical cards. Use category rows, search, recent tools, and pinned tools.

### Dark Color Palette

| Token | Value | Role |
|---|---|---|
| `--bg-canvas` | `#0B0D10` | Application background |
| `--bg-sidebar` | `#08090B` | Navigation rail |
| `--bg-surface` | `#11141A` | Inputs and primary work surfaces |
| `--bg-raised` | `#171B22` | Menus, dialogs, selected interactive containers |
| `--border-subtle` | `#272C35` | Default dividers and input borders |
| `--border-strong` | `#3A414D` | Active boundaries and resize handles |
| `--text-primary` | `#F4F6F8` | Headings and body text |
| `--text-secondary` | `#B2B9C3` | Descriptions and secondary labels |
| `--text-muted` | `#7D8794` | Metadata and placeholders; not long-form body copy |
| `--accent` | `#FF6B35` | Primary actions and active navigation only |
| `--accent-hover` | `#FF8159` | Accent hover/focus state |
| `--success` | `#39C98A` | Success and completed status only |
| `--warning` | `#F0B84B` | Warnings and assumptions only |
| `--danger` | `#F06A6A` | Errors and destructive actions only |
| `--info` | `#55A7F7` | Informational state only |

#### Color Rules

- Never use pure black for every surface; depth comes from three neutral surface levels and borders, not gradients.
- Orange must not become a section background or decorative glow. Its role is action, focus, and active selection.
- Semantic colors must not be used decoratively.
- Body text must meet at least 4.5:1 contrast; large text and graphical controls must meet at least 3:1.
- Data visualizations must remain understandable without color through labels, shapes, strokes, or patterns.

### Typography

- **Primary family:** DM Sans Variable, self-hosted; fallback `system-ui, Segoe UI, sans-serif`.
- **Technical family:** JetBrains Mono Variable, self-hosted; use only for code, raw data, identifiers, formulas, and aligned numeric output.
- **Weights:** 400 body, 500 UI labels, 600 headings/actions. Avoid additional weights unless a verified need emerges.

| Token | Size / line height | Use |
|---|---|---|
| `--text-xs` | 12 / 16 px | Metadata, timestamps, compact captions |
| `--text-sm` | 14 / 20 px | Controls, labels, table content |
| `--text-base` | 16 / 24 px | Body copy and editor defaults |
| `--text-lg` | 20 / 28 px | Section headings and dialog titles |
| `--text-xl` | 28 / 34 px | Tool title |
| `--text-display` | 40 / 44 px | Student Section overview title only |

- Uppercase eyebrow labels use at least `0.08em` letter spacing.
- Tool titles use `-0.02em` tracking and `text-wrap: balance`.
- Use tabular numerals for timers, statistics, tables, and measurements.
- Do not use decorative serif, italic word swaps, or more than the two specified families.

### Components and Interaction

- Minimum touch target: 44 × 44 px; minimum control height: 40 px desktop and 44 px mobile.
- Radius: 0–4 px for controls, 6 px for dialogs and genuinely draggable objects; no pill controls except binary/status tokens with short text.
- Shadows are limited to overlays; normal hierarchy uses surface and border contrast.
- Use Lucide icons consistently at 16, 18, or 20 px; icons supplement labels rather than replace unfamiliar actions.
- Primary action: solid orange with near-black text; secondary action: raised neutral surface; tertiary action: text button.
- Focus indicator: 2 px `--accent-hover` outline with 2 px offset, visible only through `:focus-visible`.
- Loading text uses a typographic ellipsis (`Processing…`); long operations include progress and cancelation.
- Success and error feedback uses `aria-live`; errors state what happened and how to fix it.

### Motion

- Tool-route transition: 160–220 ms opacity and 8 px translate.
- Drawer/dialog transition: 180–240 ms; no spring overshoot.
- Hover/focus transitions: 100–160 ms on explicit properties only; never `transition: all`.
- Respect `prefers-reduced-motion` and remove non-essential transform/opacity sequences.
- Do not animate charts, counters, or tool output when animation delays comprehension.

### Accessibility and Responsive Behavior

- All functionality must be operable by keyboard without drag-only or pointer-only actions.
- Provide keyboard alternatives for maps, diagrams, and Kanban movement.
- Use semantic headings, labels, tables, buttons, links, and landmarks.
- Dialogs trap focus, restore focus to their trigger, and close with Escape when safe.
- Never disable zoom or block paste.
- Preserve input values during viewport changes and navigation confirmations.
- Announce worker progress and completion without repeatedly interrupting screen readers.

### Design Decision Ledger

| Decision | Source | Rule preserved | Rationale |
|---|---|---|---|
| Dark-only workbench | Explicit product constraint | No light alternative | Required and suitable for prolonged technical work |
| Orange accent | Existing product identity | Action/active role only | Preserves recognizability without color noise |
| DM Sans + JetBrains Mono | Existing typography plus technical-content requirement | Mono limited to code/data | Supports mixed academic and programming content |
| Dividers over card grids | Product-UI craft guidance | Cards only for interactive objects | Keeps 30 tools dense and scannable |
| Searchable grouped navigation | Tool count and task-finding goal | URL reflects selected tool | Prevents a flat 30-item sidebar |
| Workers and lazy routes | Performance requirements | Heavy processing off main thread | Keeps local tools responsive |

## Timeline

The recommended schedule is 16 weeks for a small cross-functional team of two frontend engineers, one full-stack engineer, one product designer, and shared QA. The schedule assumes the existing four tools remain operational throughout migration.

| Phase | Weeks | Scope | Exit criteria |
|---|---:|---|---|
| 0. Discovery & architecture | 1–2 | Confirm schemas, fixtures, privacy limits, navigation prototype, dependency review | Approved architecture, dark tokens, and test plan |
| 1. Platform foundation | 3–4 | App shell refactor, routing, registry, search, IndexedDB, workers, shared editors/files, dark theme | Existing four tools migrated without regression |
| 2. Delivery wave 1 | 5–7 | Tools 1, 2, 6, 7, 9, 10, 11, 15, 16, 17, 19, 22, and 28 | Core workflows pass E2E and accessibility checks |
| 3. Delivery wave 2 | 8–11 | Tools 3, 4, 5, 8, 12, 13, 18, 20, 23, 24, and 26 | Cross-tool imports/exports and large-input tests pass |
| 4. Delivery wave 3 | 12–14 | Tools 14, 21, 25, 27, 29, and 30 | Security review and advanced interaction QA pass |
| 5. Hardening & release | 15–16 | Performance, responsive QA, documentation, recovery tests, dependency audit | Release candidate meets quality budgets |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Scope is too large for one release | Delays and uneven quality | Deliver in three independently releasable waves behind stable routes |
| Initial bundle becomes excessive | Slow startup | Route-level lazy loading, dynamic libraries, bundle budgets, and CI analysis |
| Heavy local processing freezes UI | Lost work and abandonment | Worker pool, progress, cancelation, file limits, and recovery checkpoints |
| Browser memory limits vary | Large-file failures | Preflight estimates, documented limits, chunked parsing, and graceful failure |
| Statistical output is misinterpreted | Academic harm | Assumption checks, effect sizes, provenance, plain-language caveats, fixture verification |
| OCR quality varies | Incorrect extracted evidence | Confidence display, source comparison, language selection, and mandatory user review messaging |
| Local data is lost or quota is exceeded | Loss of notes/plans | Quota monitoring, explicit backup reminders, versioned exports, and transaction-safe migrations |
| API builder enables SSRF or leaks secrets | Security/privacy exposure | Browser-first requests, hardened local proxy, blocked internal targets, limits, and masked history |
| Third-party libraries introduce vulnerabilities | Compromise or instability | Dependency allowlist, lockfile, automated audit, manual review of parsers and WASM assets |
| Dark UI has insufficient contrast | Accessibility failure | Token-level contrast testing, semantic color restrictions, and visual regression |
| Thirty tools are difficult to discover | Low adoption | Global search, categories, keywords, recent tools, pinned tools, and route-level help |
| Monolithic state creates regressions | Maintenance cost | Feature isolation, typed registries, shared schemas, and per-tool test boundaries |

## Appendices

### Appendix A — Prioritization Method

Each candidate was assessed against five criteria:

- Frequency across disciplines and academic levels.
- Ability to run locally with free/open-source components.
- Privacy benefit compared with common web alternatives.
- Reuse of shared platform services and data schemas.
- Delivery risk relative to educational value.

Specialist-only tools, cloud-dependent collaboration, paid databases, and generative-AI features were excluded.

### Appendix B — Shared Data Contracts

- **Citation record:** CSL-compatible JSON plus local tags, notes, and status.
- **Dataset:** Column schema, typed rows or streaming source, missing-value rules, provenance, and transformation history.
- **Tool document:** Version, tool ID, created/updated timestamps, payload, attachments, and export metadata.
- **Activity event:** Tool ID, action ID, timestamp, status, and optional local result reference; never raw document content.
- **Import result:** Accepted records, warnings, rejected records, and recoverable error details.

All contracts require an explicit schema version and migration tests.

### Appendix C — Dependency Candidates

Candidate dependencies must pass license, maintenance, bundle, security, and accessibility review before adoption.

- Research: Citation.js, PDF.js, Tesseract.js, Markdown-it, DOMPurify.
- Data: Papa Parse, simple-statistics, jStat, ECharts or Plotly.
- Programming: CodeMirror 6, SQL.js, Prettier standalone, KaTeX.
- Knowledge/project: Dexie, React Flow, ELK/Dagre, Mermaid, accessible drag-and-drop utilities.
- Platform: React Router, Zod, Comlink where worker ergonomics justify it.

### Appendix D — Release Acceptance Checklist

- [ ] Exactly 30 Student Section tools are registered and documented.
- [ ] Existing four utilities remain functional and are not duplicated.
- [ ] Every route uses the approved dark tokens; no light-theme code or toggle exists.
- [ ] Every tool works without an account or subscription.
- [ ] Local processing and any network use are accurately disclosed.
- [ ] Navigation search, category groups, recent tools, and routes work at all breakpoints.
- [ ] Import/export and cross-tool handoffs pass fixture tests.
- [ ] WCAG 2.2 AA, keyboard, screen-reader, responsive, and reduced-motion checks pass.
- [ ] Performance and bundle budgets pass CI.
- [ ] Backup, restore, quota, cancellation, and recovery paths are tested.
- [ ] Security review covers sandboxing, sanitization, file parsing, the API proxy, and dependency integrity.

### Appendix E — Assumptions Requiring Confirmation

- The selected 30 are additions to, not replacements for, the four existing tools.
- The browser remains the primary runtime; the local Express server supports only operations that browser security prevents.
- Data persistence is device-local and single-user.
- English ships first; architecture must permit later localization without changing tool schemas.
- The implementation team may substitute dependencies when licensing, maintenance, or security review rejects a candidate.
