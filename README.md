# Kaung Khant Pyae Sone — Portfolio

A compact, interactive CV built with React, TypeScript, Vite, and CSS modules.
The text column has an A4 maximum width, with sticky section navigation,
expandable descriptions, and project screenshot carousels that span the viewport,
with their first screenshot aligned to the text column. Inter and Playfair Display
are served locally.

## Content

`public/resume.json` is the single content source and is served at `/resume.json`.
The page loads it directly. Its TypeScript contract is in `src/types/resume.ts`.

- `person`: name, role, location, relocation, contacts, summary, and CV download.
- `experience`: stable IDs, dates, current status, short rewritten summaries grounded in the CV, and full CV bullets.
- `projects`: original names, descriptions, source references, repository/prototype links, technologies, and screenshot metadata.
- `education`: institution, degree, dates, location, GPA, honors, and recognition, displayed after projects.
- `skills`: retained from the CV for resume and retrieval consumers; not a separate page section.
- `footer`: closing text displayed in the tall page footer.
- `sources`: source paths and priority, with the current CV taking precedence over the archived portfolio. `sourceId` and `summarySourceId` identify provenance; project description paragraphs carry their own source IDs.

Dates use `YYYY-MM`; a null experience end date means the role is current. A null
project year means the archive did not provide a calendar year. Project text is
historical unless superseded by the current CV. `schemaVersion` versions the
content contract. Screenshot files are copied unchanged from `old/public/img/`
into `public/projects/`, leaving the archive intact.

Edit the JSON to update the CV without editing components. Design decisions are
documented in `DESIGN_GUIDELINES.md`.

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

`npm run build` checks TypeScript before bundling. Run `npm run typecheck` to check types without building. App source lives in `src/App.tsx`, with the entry point in `src/main.tsx`.

`src/pages/Home.tsx` loads the content and composes the introduction, sticky
navigation, work experience, projects, education, and footer components in
`src/components/resume/`. Section dividers and expandable descriptions share
small components. Component styles live in colocated CSS modules; `src/index.css`
contains the shared theme, base typography, resets, and accessibility rules.

Navigation uses native section anchors (`#experience`, `#projects`, and `#education`). The active
underline follows the visible section. Descriptions use native `details` elements;
carousels hide their scrollbars and support horizontal scrolling, keyboard focus,
and previous/next buttons that align each image to the text column. Trailing space
allows the final image to reach the same alignment. The sticky header spans the
viewport while its contents align to the CV column.
The theme follows the system preference until the visitor chooses a theme, which
is remembered in browser storage. The original PDF is available from the header.

The footer hammer reveals appearance controls for both themes and font pairings
from `color.html`. Changes apply only to the current page and are not saved to
browser storage. Reloading the page or choosing Reset appearance restores the
default palette and fonts.
The default Inter and Playfair Display files remain local. Other font families are
requested from Google Fonts only after selecting a combination that uses them;
they are not preloaded. Bierstadt uses the visitor's installed font or a fallback.

## Code quality

```sh
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

ESLint uses the recommended JavaScript, TypeScript, React Hooks, and Vite Fast Refresh rules. Prettier handles formatting with two spaces, single quotes, no semicolons, and LF line endings. `eslint-config-prettier` disables conflicting lint rules. Both tools skip `old/`, `dist/`, and coverage output.

TypeScript 6 is used for compatibility with the TypeScript ESLint parser.

## Previous site

`old/` contains the previous source, public assets, built site, configuration, and workflow as they existed before the reset. It is an archive and is not part of the new app's build.

The GitHub Pages workflow is disabled by renaming it to `.github/workflows/static.yml.disabled`. Rename it back to a `.yml` file to re-enable it; update it to build the new app before deployment.
