import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import test from 'node:test'

const html = await readFile(
  new URL('../dist/index.html', import.meta.url),
  'utf8',
)
const resume = JSON.parse(
  await readFile(new URL('../public/resume.json', import.meta.url), 'utf8'),
)

function escapeHtml(text) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  }
  return text.replace(/[&<>"']/g, (character) => entities[character])
}

test('the initial HTML contains the complete CV without running JavaScript', () => {
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
  assert.ok(html.includes(escapeHtml(resume.person.name)))
  assert.ok(html.includes(escapeHtml(resume.person.summary)))
  assert.doesNotMatch(html, /Loading CV|<div id="root"><\/div>/)

  for (const id of ['experience', 'projects', 'education']) {
    assert.ok(html.includes(`id="${id}"`), `Missing ${id} section`)
  }
  for (const role of resume.experience) {
    for (const text of [role.company, role.summary, ...role.highlights]) {
      assert.ok(html.includes(escapeHtml(text)), `Missing experience: ${text}`)
    }
  }
  for (const project of resume.projects) {
    assert.ok(html.includes(escapeHtml(project.name)))
    for (const paragraph of project.description) {
      assert.ok(html.includes(escapeHtml(paragraph.text)))
    }
    for (const image of project.screenshots) {
      assert.ok(html.includes(`src="${escapeHtml(image.src)}"`))
    }
  }
  for (const school of resume.education) {
    assert.ok(html.includes(escapeHtml(school.institution)))
    assert.ok(html.includes(escapeHtml(school.degree)))
  }
})

test('profile markup is present in the initial HTML and matches the CV', () => {
  const scripts = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ]
  assert.equal(scripts.length, 1)
  const profile = JSON.parse(scripts[0][1])
  assert.equal(profile['@type'], 'ProfilePage')
  assert.equal(profile.mainEntity.name, resume.person.name)
  assert.equal(profile.mainEntity.jobTitle, resume.person.title)
  assert.equal(profile.mainEntity.description, resume.person.summary)
  assert.equal(profile.url, html.match(/rel="canonical" href="([^"]+)"/)[1])
})

test('prerendered CSS modules match the client stylesheet', async () => {
  const assets = new URL('../dist/assets/', import.meta.url)
  const files = await readdir(assets)
  const css = (
    await Promise.all(
      files
        .filter((file) => file.endsWith('.css'))
        .map((file) => readFile(new URL(file, assets), 'utf8')),
    )
  ).join('\n')
  const classes = new Set(
    [...html.matchAll(/class="([^"]+)"/g)].flatMap((match) =>
      match[1].split(/\s+/),
    ),
  )
  for (const className of classes) {
    if (className.startsWith('_')) {
      assert.ok(
        css.includes(`.${className}`),
        `Missing client CSS for ${className}`,
      )
    }
  }
  assert.ok(!files.some((file) => file.includes('entry-server')))
})
