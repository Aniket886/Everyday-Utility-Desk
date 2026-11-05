# Everyday Utility Desk — Student Tools Implementation and Naming Plan

**Status:** Implementation-ready plan

**Date:** 6 November 2026

**Scope:** Exactly 30 previously selected student tools

**Audience:** Product, design, engineering, QA, legal review

## 1. Scope and Operating Rules

- Integrate exactly 30 student tools from the approved Student Section PRD.
- Present three distinct academic-level sections: Bachelor, Master, and PhD.
- Assign 10 tools to each section; do not create additional tools.
- Keep every tool accessible to every user. Academic level is an organizational recommendation, not an access restriction.
- Use only the renamed labels in navigation, routes, page titles, help text, documentation, exports, analytics events, and accessibility labels.
- Keep processing local and subscription-free wherever specified in the approved PRD.
- Use no decorative illustration, gradient, novelty iconography, saturated accent system, or gamified visual treatment.
- Do not introduce AI-dependent behavior in the initial implementation.

## 2. Section Layout

### Student Section Landing Page

The Student Section route is `/student`. It contains:

1. A compact page title and one-sentence educational description.
2. A level selector with **Bachelor**, **Master**, and **PhD**.
3. A search field that searches only the 30 approved tools and their educational keywords.
4. A dense, single-column tool list for the active level.
5. Each tool row contains a line icon, renamed label, one-line description, local/network status, and a right arrow.

Do not use a 30-card dashboard. Use rows, dividers, headings, and whitespace so the interface reads like an academic instrument rather than a promotional website.

### Bachelor Section

- **Route:** `/student/bachelor`
- **Purpose:** Foundational coursework, basic data literacy, introductory programming, study focus, and mathematical reference.
- **Default ordering:** Writing → data → programming → study → mathematics.
- **Tool count:** 10.

### Master Section

- **Route:** `/student/master`
- **Purpose:** Structured literature work, research data preparation, statistical decision support, technical writing, and project planning.
- **Default ordering:** Evidence management → data analysis → technical work → planning.
- **Tool count:** 10.

### PhD Section

- **Route:** `/student/phd`
- **Purpose:** Evidence extraction, research corpus processing, advanced analysis, reproducible technical workflows, and dissertation execution.
- **Default ordering:** Evidence extraction → advanced analysis → systems/research tooling → dissertation workflow.
- **Tool count:** 10.

### Shared Navigation Behavior

- Desktop sidebar groups the Student Section under the three level headings.
- Mobile uses a full-height searchable drawer; it must not expose 30 stacked navigation buttons at once.
- Global search opens with `Ctrl/Cmd + K` and returns the renamed labels only.
- Every tool has a bookmarkable route: `/student/{level}/{tool-slug}`.
- Browser back/forward and direct URL entry must work.
- A small “Recommended for Bachelor/Master/PhD” label may appear, but it must use neutral text and never lock access.

## 3. Renamed Tool List

All 30 names are internally unique after case-folding, punctuation removal, and whitespace normalization. The “Naming status” value means the label passed a preliminary exact-phrase public web screen for obvious software/product-title collisions. It is not a legal opinion or final trademark clearance.

### Bachelor Tools — 10

| # | New tool name | Route slug | Brief description | Naming status |
|---:|---|---|---|---|
| 1 | **Source Format Composer** | `source-format-composer` | Builds properly structured academic references in common citation styles and exports reusable source records. | Preliminary clear |
| 2 | **Delimited Table Reader** | `delimited-table-reader` | Opens CSV and TSV data with searchable, sortable, typed columns and summary information. | Preliminary clear; descriptive phrase |
| 3 | **Numeric Summary Bench** | `numeric-summary-bench` | Calculates core descriptive measures, missing-value counts, frequencies, quartiles, and outlier indicators. | Preliminary clear |
| 4 | **Browser Code Practice** | `browser-code-practice` | Runs small HTML, CSS, and JavaScript exercises in a restricted local preview. | Preliminary clear; descriptive phrase |
| 5 | **Expression Pattern Lab** | `expression-pattern-lab` | Tests text-matching expressions, capture groups, flags, and replacements against sample content. | Preliminary clear |
| 6 | **Object Structure Examiner** | `object-structure-examiner` | Validates and inspects structured JSON using formatted text, a tree view, paths, and comparisons. | Preliminary clear |
| 7 | **Focus Interval Clock** | `focus-interval-clock` | Runs configurable study and break intervals with locally stored session summaries. | Preliminary clear |
| 8 | **CrossUnit Calculation Sheet** | `crossunit-calculation-sheet` | Converts scientific, engineering, computing, and everyday quantities with formulas and precision controls. | Preliminary clear |
| 9 | **Draft Change Reader** | `draft-change-reader` | Compares two texts or files and displays word-, character-, or line-level revisions. | Preliminary clear |
| 10 | **Markup Equation Notebook** | `markup-equation-notebook` | Edits Markdown and mathematical notation with live preview, outline, word count, and local export. | Preliminary clear |

### Master Tools — 10

| # | New tool name | Route slug | Brief description | Naming status |
|---:|---|---|---|---|
| 11 | **Reference Key Curator** | `reference-key-curator` | Creates, validates, deduplicates, searches, and exports bibliography records and citation keys. | Preliminary clear |
| 12 | **CrossStudy Evidence Matrix** | `crossstudy-evidence-matrix` | Compares research sources by method, population, findings, limitations, evidence, and research gaps. | Preliminary clear |
| 13 | **Tabular Cleanup Workshop** | `tabular-cleanup-workshop` | Applies reproducible column, missing-value, duplicate, date, and normalization corrections to tabular data. | Preliminary clear |
| 14 | **Method Choice Navigator** | `method-choice-navigator` | Guides users through appropriate common statistical methods, assumptions, effect sizes, and result reporting. | Preliminary clear |
| 15 | **Research Figure Workshop** | `research-figure-workshop` | Builds accessible academic charts from local datasets and exports SVG or PNG figures. | Preliminary clear |
| 16 | **Local Query Database Lab** | `local-query-database-lab` | Runs SQL exercises against local SQLite-compatible databases and imported tables. | Preliminary clear |
| 17 | **Scholarly Clarity Review** | `scholarly-clarity-review` | Reports sentence length, passive-voice heuristics, repeated wording, structure, and readability without hosted AI. | Preliminary clear |
| 18 | **Citation Anchored Notes** | `citation-anchored-notes` | Stores searchable research notes connected to source identifiers, quotations, page references, and tags. | Preliminary clear |
| 19 | **Degree Milestone Scheduler** | `degree-milestone-scheduler` | Tracks assignments, research milestones, dependencies, priorities, recurring work, and academic deadlines. | Preliminary clear |
| 20 | **Reading Course Ledger** | `reading-course-ledger` | Organizes papers, books, standards, and course readings by status, priority, deadline, and source metadata. | Preliminary clear |

### PhD Tools — 10

| # | New tool name | Route slug | Brief description | Naming status |
|---:|---|---|---|---|
| 21 | **Document Margin Extractor** | `document-margin-extractor` | Extracts PDF highlights, comments, page references, and document metadata into structured local output. | Preliminary clear |
| 22 | **Scanned Corpus Transcriber** | `scanned-corpus-transcriber` | Converts scanned pages and image-based documents into editable text using local OCR. | Preliminary clear |
| 23 | **Survey Pattern Review** | `survey-pattern-review` | Summarizes questionnaire responses, Likert scales, cross-tabulations, missing data, and open-text keywords. | Preliminary clear; descriptive phrase |
| 24 | **Endpoint Exchange Desk** | `endpoint-exchange-desk` | Sends authorized HTTP requests and inspects status, headers, response content, timing, and reusable request definitions. | Preliminary clear |
| 25 | **Recall Schedule Decks** | `recall-schedule-decks` | Maintains local study decks and calculates spaced review dates from user-rated recall. | Preliminary clear |
| 26 | **Knowledge Relation Mapper** | `knowledge-relation-mapper` | Connects theories, variables, sources, concepts, and findings in a searchable visual relationship map. | Preliminary clear |
| 27 | **Symbolic Matrix Workbench** | `symbolic-matrix-workbench` | Evaluates scientific expressions, equations, plots, matrices, determinants, inverses, and linear systems. | Preliminary clear |
| 28 | **Research Process Diagrammer** | `research-process-diagrammer` | Produces validated research flows, sequences, timelines, and system diagrams from editable local source. | Preliminary clear |
| 29 | **Dissertation Task Ledger** | `dissertation-task-ledger` | Organizes dissertation or long-term research work into stages, tasks, checklists, labels, and deadlines. | Preliminary clear |
| 30 | **Code Layout Refiner** | `code-layout-refiner` | Formats supported source and markup languages locally and displays a non-destructive before/after comparison. | Preliminary clear |

## 4. Naming and Trademark Verification

### Completed Preliminary Checks

- Confirmed that all 30 final labels are unique within the project after normalization.
- Performed exact-phrase public web searches for the candidate labels on 6 November 2026.
- Rejected candidate names when searches showed existing educational platforms, products, or close product-title usage.
- Avoided adopting a new umbrella brand; every label remains subordinate to **Everyday Utility Desk**.
- Favored descriptive multiword labels over invented commercial-sounding marks.

### Mandatory Pre-Release Clearance

The preliminary result is not a guarantee of registrability, non-infringement, or global availability. Before a public commercial launch, a qualified trademark professional must complete and document the following:

1. Search each full label as an exact word mark.
2. Search the distinctive words separately and in combinations.
3. Search spelling variants, plural/singular forms, phonetic equivalents, translations, and similar meanings.
4. Review live and relevant dead records for related software, downloadable software, education, research, and software-service goods/services.
5. Review relevant Nice classes, especially Classes 9, 41, and 42, without assuming class separation prevents confusion.
6. Search common-law usage: search engines, domains, app stores, package registries, GitHub, educational institutions, and company registries.
7. Check the intended launch jurisdictions independently.
8. Record query strings, dates, screenshots, result IDs, status, owner, goods/services, and reviewer conclusion.
9. Obtain written legal approval before presenting any tool label as a protected standalone brand.
10. Repeat the knockout search immediately before release because filings and marketplace use change over time.

### Official Search Sources

- [USPTO Federal Trademark Searching](https://www.uspto.gov/trademarks/search/federal-trademark-searching)
- [USPTO Trademark Search](https://tmsearch.uspto.gov/search/)
- [WIPO — Check Availability](https://www.wipo.int/en/web/madrid-system/check-availability)
- [WIPO Global Brand Database](https://www.wipo.int/en/web/global-brand-database)
- [IP India — Search Existing Trademarks](https://ipindia.gov.in/trade-marks-before-you-apply-search-existing-trademarks)
- [EUIPO eSearch](https://euipo.europa.eu/eSearch/)

USPTO guidance states that clearance requires more than an exact-name search and must consider similarity and related goods/services. WIPO likewise recommends checking identical and similar marks and supplementing its global database with national or regional registers. Therefore, the labels above remain **preliminary clear / legal review pending**.

## 5. UI Design Guidelines

### Visual Direction

- Dark, neutral, academic workspace only.
- No gradients, decorative patterns, illustrations, mascots, confetti, glow effects, glass effects, or multicolor category coding.
- No gamified level appearance. Bachelor, Master, and PhD are navigational groupings, not achievement ranks.
- Use dividers and spacing instead of rounded card mosaics.
- Use familiar line icons only when they improve scanning; every icon must have a visible text label.

### Color Palette

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#0D0F12` | Main application background |
| `--sidebar` | `#090B0D` | Primary navigation |
| `--surface` | `#14171B` | Inputs and work regions |
| `--surface-raised` | `#1A1E23` | Menus, dialogs, selected rows |
| `--border` | `#2B3036` | Dividers and control borders |
| `--border-strong` | `#434A52` | Focused or active boundaries |
| `--text-primary` | `#F1F3F5` | Headings and primary text |
| `--text-secondary` | `#B6BCC3` | Descriptions and labels |
| `--text-muted` | `#818A94` | Metadata and placeholders |
| `--action` | `#D8DDE1` | Primary action fill |
| `--action-text` | `#111418` | Text on primary action |
| `--selection` | `#242A30` | Active navigation background |
| `--success-muted` | `#8FA79A` | Success status only |
| `--warning-muted` | `#B0A080` | Warning status only |
| `--danger-muted` | `#B28D8D` | Error or destructive status only |

Color usage must remain functional. Status colors require an icon and text; do not rely on color alone. Body text must meet WCAG 2.2 AA contrast.

### Typography

- **UI and prose:** DM Sans Variable, self-hosted; fallback `system-ui, "Segoe UI", sans-serif`.
- **Code, formulas, identifiers, raw data:** JetBrains Mono Variable, self-hosted.
- **Weights:** 400 for body, 500 for labels, 600 for headings and actions.
- Do not introduce serif, script, display, or decorative fonts.

| Role | Size / line height | Weight |
|---|---|---:|
| Metadata | 12 / 16 px | 500 |
| Controls and tool rows | 14 / 20 px | 500 |
| Body and editor default | 16 / 24 px | 400 |
| Section heading | 20 / 28 px | 600 |
| Tool page title | 28 / 34 px | 600 |
| Student Section title | 36 / 42 px | 600 |

- Uppercase micro-labels use `0.08em` letter spacing.
- Use tabular numerals for timers, measurements, statistics, and tables.
- Limit prose to approximately 65 characters per line.

### Spacing and Geometry

- Base unit: 4 px.
- Spacing scale: 4, 8, 12, 16, 24, 32, and 48 px.
- Desktop navigation: 264 px; context panel: up to 300 px.
- Control height: minimum 40 px desktop and 44 px touch layouts.
- Radius: 0–4 px for controls; maximum 6 px for dialogs and draggable objects.
- Shadows: overlays only. Use surface and border differences for normal hierarchy.
- Tool rows use 16 px vertical padding and a 1 px divider.

### Interaction and Accessibility

- Every tool is keyboard-operable.
- Use `:focus-visible` with a 2 px high-contrast outline and 2 px offset.
- Do not disable zoom, block paste, or make any action drag-only.
- Announce validation, processing, completion, and failure through `aria-live`.
- Long local operations show progress, cancelation, and recovery guidance.
- Motion is limited to 120–200 ms opacity/position transitions and is removed under `prefers-reduced-motion`.

## 6. Technical Implementation Steps

### Step 1 — Registry and Routing

- Refactor the current flat tool list into `src/app/toolRegistry.ts`.
- Add a `studentLevel: "bachelor" | "master" | "phd"` property.
- Register exactly 30 Student Section entries with the names and slugs in this document.
- Add React Router routes for the level pages and individual tool pages.
- Add a development assertion that fails when labels or slugs are duplicated.

### Step 2 — Application Shell

- Replace the flat navigation with grouped academic-level navigation.
- Add the Student Section landing page, level selector, and command search.
- Preserve the existing everyday-tool area separately.
- Store recent/pinned tools by stable tool ID rather than display name so future legally required renaming does not corrupt user data.

### Step 3 — Shared Foundations

- Implement shared local file intake, IndexedDB storage, Web Worker pool, editor shell, tabular-data schema, citation-record schema, export service, and error model.
- Self-host fonts and heavy runtime assets.
- Lazy-load every individual tool and its specialist dependencies.

### Step 4 — Tool Delivery

- Implement Bachelor tools first, followed by Master and PhD.
- Each feature folder exports its route component, metadata, worker/service boundary, validation, fixtures, and tests.
- Preserve local processing and disclose any intentional network request at the action point.
- Do not introduce optional AI behavior during this implementation.

### Step 5 — Rename Enforcement

- Search the repository for every superseded label before release.
- Check navigation, document titles, accessible names, route metadata, exports, test snapshots, error copy, help text, and saved-example fixtures.
- Add a test asserting that none of the superseded labels appears in production UI strings.
- Keep legacy route redirects only when necessary; redirects must resolve to new slugs and never expose legacy labels in visible UI.

### Step 6 — Verification

- Unit-test naming registry uniqueness and slug stability.
- Run canonical end-to-end workflows for all 30 tools.
- Validate desktop, tablet, and mobile navigation.
- Run WCAG, keyboard, screen-reader, contrast, reduced-motion, bundle, and worker-performance checks.
- Complete the formal legal clearance gate before public release.

## 7. API Keys

### Required for the Approved 30-Tool Scope

**None.** The approved functionality is deterministic and local-first. No GROQ, OpenAI, Anthropic, Gemini, or other AI API key is required.

### Reserved Placeholder — Disabled

Do not add this variable to client-side code or commit a real key. It is reserved only for a separately approved future scope:

```dotenv
# Server-side only. Not required or read by the approved implementation.
GROQ_API_KEY=[PLACEHOLDER_PROVIDE_ONLY_AFTER_SEPARATE_AI_SCOPE_APPROVAL]
```

If AI assistance is later requested, engineering must first obtain explicit approval for the feature, data sent off-device, retention terms, cost controls, academic-integrity safeguards, failure behavior, and privacy notice. A key must then be supplied explicitly and stored server-side. The current implementation must not assume it exists.

## 8. Copy-Paste Release Checklist

- [ ] Exactly 30 renamed tools are registered.
- [ ] Bachelor, Master, and PhD sections contain exactly 10 tools each.
- [ ] Final names and slugs match this document.
- [ ] Normalized label and slug uniqueness tests pass.
- [ ] No superseded label appears in production UI strings.
- [ ] Preliminary public-web name screen is recorded.
- [ ] Formal trademark review is complete for target jurisdictions.
- [ ] UI uses only the approved dark neutral palette and two approved font families.
- [ ] No decorative, colorful, promotional, or gamified elements are present.
- [ ] No AI API key is required by the approved scope.
- [ ] Any future GROQ key remains server-side and disabled until separately approved.
- [ ] All routes, accessibility checks, responsive checks, and canonical tool workflows pass.
