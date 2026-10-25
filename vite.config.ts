import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const resumeFile = fileURLToPath(
  new URL('./public/resume.json', import.meta.url),
)
const resumeModule = '\0virtual:resume'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'resume-data',
      resolveId(id) {
        if (id === 'virtual:resume') return resumeModule
      },
      async load(id) {
        if (id !== resumeModule) return
        // Bundle the public JSON as data without importing a public asset URL.
        this.addWatchFile(resumeFile)
        const resume = JSON.parse(await readFile(resumeFile, 'utf8'))
        return `export default ${JSON.stringify(resume)}`
      },
    },
  ],
})
