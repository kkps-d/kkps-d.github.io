import styles from './ThemeToggle.module.css'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [clickCount, setClickCount] = useState(0)
  const [countdownVisible, setCountdownVisible] = useState(false)
  const waveActive = clickCount >= 6
  const [preference, setPreference] = useState<Theme | null>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme')
      return saved === 'light' || saved === 'dark' ? saved : null
    } catch {
      return null
    }
  })
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  )
  const theme = preference ?? (systemDark ? 'dark' : 'light')

  useEffect(() => {
    if (clickCount === 0) return
    const hideTimeout = window.setTimeout(
      () => setCountdownVisible(false),
      1100,
    )
    const resetTimeout = waveActive
      ? undefined
      : window.setTimeout(() => setClickCount(0), 3000)
    return () => {
      window.clearTimeout(hideTimeout)
      window.clearTimeout(resetTimeout)
    }
  }, [clickCount, waveActive])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemTheme = (event: MediaQueryListEvent) => {
      setSystemDark(event.matches)
    }
    media.addEventListener('change', updateSystemTheme)
    return () => media.removeEventListener('change', updateSystemTheme)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        'content',
        document.documentElement.style.getPropertyValue(
          `--${theme}-background`,
        ) || (theme === 'dark' ? '#23211E' : '#FAF6EC'),
      )
  }, [theme])

  function toggleTheme() {
    setCountdownVisible(!waveActive)
    setClickCount((count) => (count >= 6 ? 0 : count + 1))
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setPreference(nextTheme)
    try {
      localStorage.setItem('portfolio-theme', nextTheme)
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  return (
    <>
      {waveActive &&
        createPortal(
          <div className={styles.rgbWave} aria-hidden="true" />,
          document.body,
        )}
      <button
        className={styles.themeToggle}
        type="button"
        onClick={toggleTheme}
        aria-label="Dark mode"
        aria-pressed={theme === 'dark'}
        title={
          waveActive
            ? 'Stop RGB wave and switch theme'
            : `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`
        }
      >
        {countdownVisible && clickCount > 0 && (
          <span
            key={clickCount}
            className={styles.countdown}
            aria-hidden="true"
          >
            {6 - clickCount}
          </span>
        )}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {theme === 'light' ? (
            <path d="M20.8 13A8.5 8.5 0 0 1 11 3.2 8.5 8.5 0 1 0 20.8 13Z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
            </>
          )}
        </svg>
      </button>
      <span className="sr-only" role="status">
        {waveActive
          ? 'RGB wave on. Activate the theme button again to stop.'
          : ''}
      </span>
    </>
  )
}
