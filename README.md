# React + Vite

A minimal React app using wouter for routing and plain CSS for styling.

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

The app uses hash routes (`/#/` and `/#/about`) so navigation and refreshes work on static hosting without server rewrites. Unknown routes display a not-found page.

## Previous site

`old/` contains the previous source, public assets, built site, configuration, and workflow as they existed before the reset. It is an archive and is not part of the new app's build.

The GitHub Pages workflow is disabled by renaming it to `.github/workflows/static.yml.disabled`. Rename it back to a `.yml` file to re-enable it; update it to build the new app before deployment.
