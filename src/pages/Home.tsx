import { useEffect, useRef, useState } from 'react'
import { Introduction } from '../components/resume/Introduction'
import { SectionNavigation } from '../components/resume/SectionNavigation'
import { WorkExperience } from '../components/resume/WorkExperience'
import { Projects } from '../components/resume/Projects'
import { Education } from '../components/resume/Education'
import { Footer } from '../components/resume/Footer'
import type { Resume } from '../types/resume'
import styles from './Home.module.css'

export function Home() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [error, setError] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    async function loadResume() {
      try {
        const response = await fetch('/resume.json', {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Could not load resume')
        setResume(await response.json())
      } catch {
        if (!controller.signal.aborted) setError(true)
      }
    }
    void loadResume()
    return () => controller.abort()
  }, [])

  if (error)
    return (
      <p className={styles.loadStatus} role="alert">
        The CV could not be loaded. Please reload the page.
      </p>
    )
  if (!resume)
    return (
      <p className={styles.loadStatus} role="status">
        Loading CV…
      </p>
    )

  return (
    <>
      <main className={styles.resume} ref={mainRef} id="top">
        <a className={styles.skipLink} href="#experience">
          Skip to work experience
        </a>
        <Introduction person={resume.person} />
        <SectionNavigation cvUrl={resume.person.cvUrl} contentRef={mainRef} />
        <WorkExperience experience={resume.experience} />
        <Projects projects={resume.projects} />
        <Education education={resume.education} />
      </main>
      <Footer text={resume.footer} />
    </>
  )
}
