<div align="center">

# Everyday Utility Desk

### A private, local-first collection of everyday and academic tools

[![React](https://img.shields.io/badge/React-18-20232a?logo=react&logoColor=61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-20232a?logo=typescript&logoColor=3178c6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-20232a?logo=vite&logoColor=ffc517)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-20232a?logo=node.js&logoColor=5fa04e)](https://nodejs.org/)
[![Local first](https://img.shields.io/badge/processing-local--first-d8dde1)](#privacy-and-security)

[Features](#features) · [Installation](#installation) · [Usage](#usage) · [Contributing](#contributing) · [Troubleshooting](#troubleshooting)

</div>

---

## Description

Everyday Utility Desk is a dark-theme web application that brings frequently used utilities, academic workspaces, documentation helpers, and carefully selected external learning resources into one interface.

Most operations run directly in the browser. Files used by the QR, document, data, mathematics, writing, and research tools are not uploaded to a project-operated cloud service. Features that intentionally contact another service—such as authorized HTTP requests, external resources, and permitted media downloads—are clearly identified in the interface.

Repository: [github.com/Aniket886/Everyday-Utility-Desk](https://github.com/Aniket886/Everyday-Utility-Desk)

## Features

### Everyday tools

- Create downloadable QR codes with configurable colors and resolution.
- Scan QR codes using a camera or local image.
- Convert images, PDFs, DOCX files, and text documents locally.
- Inspect and download media that the user owns or is authorized to download.

### Student section

The Student Section contains **36 local academic tools**:

- **Bachelor — 10 tools:** citations, tabular data, descriptive statistics, browser code practice, regular expressions, JSON inspection, study timer, units, text comparison, and Markdown notes.
- **Master — 10 tools:** bibliography records, evidence matrices, data cleaning, statistical-method guidance, research figures, SQL practice, writing metrics, research notes, milestones, and reading management.
- **PhD — 10 tools:** PDF annotations, OCR, survey summaries, authorized HTTP requests, review decks, knowledge mapping, symbolic mathematics, research diagrams, dissertation tasks, and code formatting.
- **Documentation — 6 tools:** document outlines, README blueprints, procedures, meeting records, change records, and requirements briefs.

### Program and course directory

Students can filter relevant tools for Computer Science, Data Science, Engineering, Business, Health and Life Sciences, Humanities and Social Sciences, or general research and dissertation work.

### Official external resources

Heavyweight specialist software is linked rather than duplicated. External destinations include image generation, Zotero, Overleaf, JupyterLab, RStudio Desktop, QGIS, FreeCAD, Blender, diagrams.net, and Krita. External links open in a separate tab and remain subject to the provider's account, privacy, availability, and usage terms.

## Technology

| Area | Technology |
|---|---|
| UI | React 18, TypeScript, Lucide icons |
| Build | Vite 6 |
| Local server | Node.js, Express |
| Documents | PDF.js, PDF-Lib, Mammoth, JSZip |
| Academic/data | AlaSQL, Math.js, Mermaid, Marked, DOMPurify |
| OCR | Tesseract.js |
| QR | QRCode, QR Scanner |
| Formatting | Prettier standalone |
| Media | yt-dlp through `youtube-dl-exec`; FFmpeg recommended |

## Installation

### Requirements

- Node.js 20 or later
- npm, included with Node.js
- A current version of Chrome, Edge, Firefox, or another modern browser
- FFmpeg on `PATH` for media merging and MP3 export
- Internet access during the first dependency installation and for external/network tools

### One-click Windows installation

1. Download or clone the repository.
2. Double-click `START_EVERYDAY_UTILITY_DESK.bat`.
3. Wait while dependencies are installed or checked.
4. Open `http://localhost:5173` if the browser does not open automatically.

Use `UPDATE_DEPENDENCIES.bat` to check compatible dependency updates and verify the production build without starting the site.

### Command-line installation

```bash
git clone https://github.com/Aniket886/Everyday-Utility-Desk.git
cd Everyday-Utility-Desk
npm install
npm run dev
```

Open `http://localhost:5173`.

### Production build

```bash
npm run build
npm start
```

Open `http://localhost:4174`.

## Usage

1. Select an everyday utility or **Student section** from the sidebar.
2. In Student Section, choose **Academic levels**, **Documentation**, **Programs & courses**, or **External resources**.
3. Enter text, data, code, or a supported local file.
4. Run the tool and review the generated output.
5. Export results where an export control is available.

Inputs for most Student Section tools are automatically saved in browser-local storage. Browser storage is device-specific and should not be treated as a permanent backup.

Detailed instructions for every tool are available in [`INSTRUCTIONS.txt`](INSTRUCTIONS.txt).

## Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Check dependencies and run Vite plus the local API server |
| `npm run build` | Create the production bundle in `dist/` |
| `npm start` | Serve the production build on port 4174 by default |
| `npm run preview` | Preview the Vite production bundle |
| `npm run setup` | Install dependencies, update compatible versions, and build |
| `npm run deps:update` | Force a compatible dependency-update check |
| `npx tsc --noEmit` | Run the TypeScript type check |

## Project structure

```text
everyday-utility-desk/
├── docs/                         Product and naming documentation
├── public/                       Static public assets
├── scripts/                      Setup and dependency helpers
├── src/
│   ├── App.tsx                   Main application shell and everyday tools
│   ├── StudentSection.tsx        Academic registry and tool workspaces
│   ├── main.tsx                  React entry point
│   ├── student.css               Dark academic interface styles
│   └── styles.css                Core application styles
├── server.mjs                    Express server and permitted media endpoints
├── START_EVERYDAY_UTILITY_DESK.bat
├── UPDATE_DEPENDENCIES.bat
├── INSTRUCTIONS.txt
├── GIT_WORKFLOW.txt
├── package.json
└── vite.config.ts
```

## Privacy and security

- Never commit `.env`, tokens, credentials, cookies, private keys, or downloaded private documents.
- Do not enter sensitive or unpublished information into external tools unless institutional policy permits it.
- Endpoint Exchange Desk sends data to the URL entered by the user; inspect requests before sending them.
- Media downloading is restricted to content the user created, owns, or is licensed to download. Platform terms and local law still apply.
- Third-party output remains subject to provider terms and applicable academic-integrity policies.

See [`.env.example`](.env.example) for the optional process environment setting. No `.env` file or AI API key is required by the current application.

## Troubleshooting

See the complete troubleshooting FAQ in [`INSTRUCTIONS.txt`](INSTRUCTIONS.txt). Common fixes:

- Stop an older development server with `Ctrl+C` if Vite selects port 5174 instead of 5173.
- Run `UPDATE_DEPENDENCIES.bat` or `npm install` when a module cannot be found.
- Grant browser camera permission before using QR scanning.
- Install FFmpeg and restart the terminal when media merging fails.
- Use smaller files if the browser reports insufficient memory.

## Contributing

Contributions are welcome after the public repository has an initialized default branch.

1. Read [`GIT_WORKFLOW.txt`](GIT_WORKFLOW.txt).
2. Create a focused branch such as `feat/documentation-tools` or `docs/improve-setup-guide`.
3. Preserve local-first privacy behavior.
4. Run the type check and production build.
5. Use Conventional Commits.
6. Open a pull request with testing evidence and screenshots for UI changes.

```text
feat: add documentation workspaces
fix: handle SQL sample initialization
docs: add comprehensive setup and troubleshooting guide
chore: update compatible dependencies
```

## License

**[PLACEHOLDER: Choose a license before accepting external contributions or redistribution.]**

No `LICENSE` file is currently included. The repository owner should select an appropriate license and add it as `LICENSE`. Do not assume permission to reuse the project until a license is published.

## Contact

- Maintainer: [@Aniket886](https://github.com/Aniket886)
- Issues: [Everyday Utility Desk issues](https://github.com/Aniket886/Everyday-Utility-Desk/issues)
- Email: `[PLACEHOLDER_EMAIL]`

---

<div align="center">
Built for practical, privacy-conscious everyday and academic work.
</div>
