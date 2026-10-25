# Kaung Khant Pyae Sone — Portfolio

A compact, interactive CV built with React, TypeScript, Vite, and CSS modules.
The text column has an A4 maximum width, with sticky section navigation,
expandable descriptions, and project screenshot carousels that span the viewport,
with their first screenshot aligned to the text column. Inter and Playfair Display
are served locally as WOFF2 variable fonts.

## Content

`public/resume.json` is the single content source and is served at `/resume.json`.
The app imports it through the `virtual:resume` Vite module for both prerendering
and browser hydration, while the public JSON URL remains available.
Its TypeScript contract is in `src/types/resume.ts`. Content changes require a
new build and deployment; development updates are handled by Vite.

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
content contract. Screenshots in `public/projects/` are converted from
`old/public/img/` to lossless WebP when smaller; the JPEG is retained because
lossless WebP would increase its size. Dimensions and decoded pixels are
unchanged, and the archive remains intact.

Edit the JSON to update the CV without editing components. Design decisions are
documented in `DESIGN_GUIDELINES.md`.

## Search metadata and assets

The preferred URL is `https://www.kkps.dev/`, matching the existing GitHub Pages
redirect destination and declared by the canonical link and
Open Graph URL in `index.html` and the Pages domain file in `public/CNAME`.
The custom domain and redirects also need to be configured in GitHub Pages
settings and DNS. Update the title and descriptions in `index.html` when the
profile changes.

`Home.tsx` generates `ProfilePage` / `Person` JSON-LD from the resume,
including the name, role, summary, education, and GitHub and LinkedIn profiles.
The introduction uses a single H1 containing the name and role, and projects
display their technologies as text.

The production HTML contains the complete CV and JSON-LD before JavaScript
runs. React hydrates that HTML to enable the interactive controls. The existing
head script applies the visitor's theme before paint; the theme toggle reads
browser preferences after hydration without changing the initial markup.

Fonts and screenshots are optimized once and checked in. WOFF2 retains all
font glyphs, styles, and variable axes. No asset conversion runs during the
build, and no conversion dependencies are required to develop or deploy.

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

`npm run build` checks TypeScript, bundles the browser app, and runs
`scripts/prerender.mjs`. The script builds the Node renderer from
`src/entry-server.tsx` into the ignored `node_modules/.cache/prerender/` directory,
then renders the app into `dist/index.html` using the same content and CSS modules
as the client. Only `dist/` is deployed; no server is needed on GitHub Pages.
The existing Pages workflow runs this build automatically.

Run `npm run typecheck` to check types without building. App source lives in
`src/App.tsx`, with the browser entry point in `src/main.tsx`. Development uses
client rendering; production hydrates the prerendered HTML.

`src/pages/Home.tsx` receives the content and composes the introduction, sticky
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
npm test
npm run lint:fix
npm run format
npm run format:check
```

ESLint uses the recommended JavaScript, TypeScript, React Hooks, and Vite Fast Refresh rules. Prettier handles formatting with two spaces, single quotes, no semicolons, and LF line endings. `eslint-config-prettier` disables conflicting lint rules. Both tools skip `old/`, `dist/`, and coverage output.

TypeScript 6 is used for compatibility with the TypeScript ESLint parser.

Run `npm run build` before `npm test`. The prerender tests check that the initial
HTML includes all CV content and profile markup and that its CSS module classes
match the browser stylesheet.

## Previous site

`old/` contains the previous source, public assets, built site, configuration, and workflow as they existed before the reset. It is an archive and is not part of the new app's build.

The GitHub Pages workflow in `.github/workflows/static.yml` runs on pushes to
`master` and can also be started manually. It uses Node.js 24, installs the locked
dependencies with `npm ci`, builds the app, and deploys `dist/` to Pages.

The archived SPA routing workaround is retained: `public/404.html` redirects
unknown paths to the app, and the script in `index.html` restores the original
path, query, and hash before React starts. The redirect keeps zero path segments
because this is a user Pages site served at the domain root.
