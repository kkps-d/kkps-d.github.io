import { readFile, writeFile } from 'node:fs/promises'
import { build } from 'vite'

// Keep the Node renderer out of the static site deployed to GitHub Pages.
await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'node_modules/.cache/prerender',
    emptyOutDir: true,
    copyPublicDir: false,
  },
})

const { render } =
  await import('../node_modules/.cache/prerender/entry-server.js')
const htmlPath = new URL('../dist/index.html', import.meta.url)
const template = await readFile(htmlPath, 'utf8')
const placeholder = '<div id="root"></div>'

if (!template.includes(placeholder)) {
  throw new Error('Could not find the root placeholder in dist/index.html')
}

await writeFile(
  htmlPath,
  template.replace(placeholder, () => `<div id="root">${render()}</div>`),
)
console.log('Prerendered the CV and profile markup into dist/index.html')
