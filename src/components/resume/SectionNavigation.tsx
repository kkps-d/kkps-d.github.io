import { useEffect, useRef, useState, type RefObject } from 'react'
import { FileDown } from 'lucide-react'
import { ThemeToggle } from '../ThemeToggle'
import styles from './SectionNavigation.module.css'

const sectionLinks = [
  { id: 'experience', label: 'Work experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
]

export function SectionNavigation({
  cvUrl,
  contentRef,
}: {
  cvUrl: string
  contentRef: RefObject<HTMLElement | null>
}) {
  const [activeSection, setActiveSection] = useState('experience')
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const sections = sectionLinks.map(({ id }) => document.getElementById(id))
    let frame = 0

    function updateSection() {
      const threshold = (headerRef.current?.offsetHeight ?? 64) + 32
      let current = 'experience'
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= threshold)
          current = section.id
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        current = 'education'
      }
      setActiveSection(current)
    }

    function scheduleUpdate() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateSection)
    }

    // Expanded descriptions and loaded images can move the section boundaries.
    const observer = new ResizeObserver(scheduleUpdate)
    observer.observe(contentRef.current)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    // Resolve deep links after hydration or the development client render.
    const target = document.getElementById(window.location.hash.slice(1))
    target?.scrollIntoView({ behavior: 'instant' })
    updateSection()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [contentRef])

  return (
    <header className={styles.sectionHeader} ref={headerRef}>
      <nav aria-label="CV sections">
        {sectionLinks.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={activeSection === id ? 'location' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className={styles.headerTools}>
        <a
          href={cvUrl}
          download
          className={styles.cvDownload}
          aria-label="Download CV"
        >
          <span className={styles.cvDownloadLabel}>Download CV</span>
          <FileDown size={18} strokeWidth={1.5} aria-hidden="true" />
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
