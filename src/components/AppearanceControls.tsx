import styles from './AppearanceControls.module.css'
import { useEffect, useRef, useState } from 'react'
import { Hammer } from 'lucide-react'

const fontGroups = [
  {
    label: 'Original combinations',
    pairs: [
      ['Playfair Display', 'Inter'],
      ['Playfair Display', 'Bierstadt'],
    ],
  },
  {
    label: 'Serif / Sans-serif',
    pairs: [
      ['Lora', 'Inter'],
      ['Lora', 'Plus Jakarta Sans'],
      ['Playfair Display', 'Plus Jakarta Sans'],
    ],
  },
  {
    label: 'Sans-serif / Serif',
    pairs: [
      ['Work Sans', 'Merriweather'],
      ['Work Sans', 'Source Serif 4'],
      ['Outfit', 'Merriweather'],
      ['Outfit', 'Source Serif 4'],
    ],
  },
  {
    label: 'Sans-serif / Sans-serif',
    pairs: [
      ['Plus Jakarta Sans', 'Inter'],
      ['Plus Jakarta Sans', 'DM Sans'],
      ['Space Grotesk', 'Inter'],
      ['Space Grotesk', 'DM Sans'],
    ],
  },
  {
    label: 'Serif / Serif',
    pairs: [
      ['Cormorant Garamond', 'Lora'],
      ['Cormorant Garamond', 'EB Garamond'],
      ['Cinzel', 'Lora'],
      ['Cinzel', 'EB Garamond'],
    ],
  },
]
const localFonts = new Set(['Playfair Display', 'Inter', 'Bierstadt'])
const serifFonts = new Set([
  'Playfair Display',
  'Lora',
  'Merriweather',
  'Source Serif 4',
  'Cormorant Garamond',
  'Cinzel',
  'EB Garamond',
])
const defaults = {
  light: { background: '#FAF6EC', foreground: '#23211E' },
  dark: { background: '#23211E', foreground: '#FAF6EC' },
  fontPair: 'Playfair Display|Inter',
}
type Mode = 'light' | 'dark'

function normalizeHex(value: string) {
  const hex = value.trim().replace(/^#/, '')
  if (/^[\da-f]{6}$/i.test(hex)) return `#${hex.toUpperCase()}`
  if (/^[\da-f]{3}$/i.test(hex))
    return `#${[...hex]
      .map((char) => char + char)
      .join('')
      .toUpperCase()}`
  return null
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const [draft, setDraft] = useState<string | null>(null)
  const invalid = draft !== null && normalizeHex(draft) === null

  function commit() {
    if (draft === null) return
    const color = normalizeHex(draft)
    if (color) {
      onChange(color)
      setDraft(null)
    }
  }

  return (
    <div className={styles.appearanceColor}>
      <span>{label}</span>
      <div className={styles.appearancePicker}>
        <input
          type="color"
          aria-label={`${label} color`}
          value={value}
          onChange={(event) => {
            setDraft(null)
            onChange(event.target.value.toUpperCase())
          }}
        />
        <input
          type="text"
          aria-label={`${label} hex color`}
          value={draft ?? value}
          maxLength={7}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={invalid || undefined}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              commit()
            }
          }}
        />
      </div>
      {invalid && <small>Enter a 3- or 6-digit hex color.</small>}
    </div>
  )
}

export function AppearanceControls() {
  const [open, setOpen] = useState(false)
  const [appearance, setAppearance] = useState(defaults)
  const [resetCount, setResetCount] = useState(0)
  const [fontError, setFontError] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const root = document.documentElement
    for (const mode of ['light', 'dark'] as const) {
      root.style.setProperty(
        `--${mode}-background`,
        appearance[mode].background,
      )
      root.style.setProperty(
        `--${mode}-foreground`,
        appearance[mode].foreground,
      )
    }
    const mode = root.dataset.theme === 'dark' ? 'dark' : 'light'
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', appearance[mode].background)
  }, [appearance])

  useEffect(() => {
    const [heading, body] = appearance.fontPair.split('|')
    const root = document.documentElement
    root.style.setProperty(
      '--font-serif',
      `"${heading}", ${serifFonts.has(heading) ? 'Georgia, serif' : 'system-ui, sans-serif'}`,
    )
    root.style.setProperty(
      '--font-sans',
      `"${body}", ${serifFonts.has(body) ? 'Georgia, serif' : 'system-ui, sans-serif'}`,
    )

    // Only fetch non-bundled fonts after their combination has been selected.
    const params = new URLSearchParams()
    if (!localFonts.has(heading))
      params.append('family', `${heading}:wght@500;600`)
    if (!localFonts.has(body))
      params.append('family', `${body}:ital,wght@0,400;1,400`)
    if (!params.has('family')) return
    params.set('display', 'swap')
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.dataset.appearanceFonts = ''
    stylesheet.href = `https://fonts.googleapis.com/css2?${params}`
    stylesheet.onerror = () => setFontError(true)
    stylesheet.onload = () => setFontError(false)
    document.head.append(stylesheet)
    return () => {
      stylesheet.onload = null
      stylesheet.onerror = null
      stylesheet.remove()
    }
  }, [appearance.fontPair])

  function updateColor(
    mode: Mode,
    role: 'background' | 'foreground',
    color: string,
  ) {
    setAppearance((current) => ({
      ...current,
      [mode]: { ...current[mode], [role]: color },
    }))
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.appearanceToggle}
        aria-label="Customize appearance"
        title="Customize appearance"
        aria-expanded={open}
        aria-controls="appearance-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <Hammer size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
      {open && (
        <section
          className={styles.appearancePanel}
          id="appearance-panel"
          aria-label="Appearance controls"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false)
              buttonRef.current?.focus()
            }
          }}
        >
          <div className={styles.appearancePalettes}>
            {(['light', 'dark'] as const).map((mode) => (
              <fieldset key={`${mode}-${resetCount}`}>
                <legend>{mode === 'light' ? 'Light mode' : 'Dark mode'}</legend>
                <ColorControl
                  label={`${mode === 'light' ? 'Light' : 'Dark'} background`}
                  value={appearance[mode].background}
                  onChange={(color) => updateColor(mode, 'background', color)}
                />
                <ColorControl
                  label={`${mode === 'light' ? 'Light' : 'Dark'} foreground`}
                  value={appearance[mode].foreground}
                  onChange={(color) => updateColor(mode, 'foreground', color)}
                />
              </fieldset>
            ))}
          </div>
          <label className={styles.appearanceFonts}>
            Heading / body fonts
            <select
              value={appearance.fontPair}
              onChange={(event) => {
                setFontError(false)
                setAppearance((current) => ({
                  ...current,
                  fontPair: event.target.value,
                }))
              }}
            >
              {fontGroups.map((group) => (
                <optgroup label={group.label} key={group.label}>
                  {group.pairs.map((pair) => (
                    <option value={pair.join('|')} key={pair.join('|')}>
                      {pair.join(' / ')}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          {fontError && (
            <p role="status">
              The selected web fonts could not load. Fallback fonts are being
              used.
            </p>
          )}
          <button
            type="button"
            className={styles.appearanceReset}
            onClick={() => {
              setAppearance(defaults)
              setResetCount((count) => count + 1)
              setFontError(false)
            }}
          >
            Reset appearance
          </button>
        </section>
      )}
    </>
  )
}
