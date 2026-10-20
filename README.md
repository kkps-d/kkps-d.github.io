# React + TypeScript + Vite

A minimal React TypeScript app using wouter for routing and plain CSS for styling.

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

The app uses hash routes (`/#/` and `/#/about`) so navigation and refreshes work on static hosting without server rewrites. Unknown routes display a not-found page.

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
