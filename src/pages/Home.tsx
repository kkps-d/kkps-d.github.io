import { useEffect, useRef, useState } from 'react'
import { FileDown } from 'lucide-react'
import { AppearanceControls } from '../components/AppearanceControls'
import { ContactIcon } from '../components/ContactIcon'
import { Chevron } from '../components/Chevron'
import { ProjectGallery } from '../components/ProjectGallery'
import { ThemeToggle } from '../components/ThemeToggle'
import type { Resume } from '../types/resume'

export function Home() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [error, setError] = useState(false)
  const [activeSection, setActiveSection] = useState('experience')
  const headerRef = useRef<HTMLElement>(null)
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

  useEffect(() => {
    if (!resume || !mainRef.current) return
    const sections = ['experience', 'projects', 'education'].map((id) =>
      document.getElementById(id),
    )
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
    observer.observe(mainRef.current)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    // The JSON loads after the browser first attempts to resolve a deep link.
    const target = document.getElementById(window.location.hash.slice(1))
    target?.scrollIntoView({ behavior: 'instant' })
    updateSection()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [resume])

  if (error)
    return (
      <p className="load-status" role="alert">
        The CV could not be loaded. Please reload the page.
      </p>
    )
  if (!resume)
    return (
      <p className="load-status" role="status">
        Loading CV…
      </p>
    )

  const { person, experience, projects, education } = resume

  return (
    <>
      <main className="resume" ref={mainRef} id="top">
        <a className="skip-link" href="#experience">
          Skip to work experience
        </a>
        <section className="introduction" aria-labelledby="name">
          <div className="introduction-content">
            <h2 id="name">{person.name}</h2>
            <h1>{person.title}</h1>
            <ul
              className="contact-chips"
              aria-label="Location and contact information"
            >
              <li>
                <span className="chip-content">
                  <ContactIcon name="myanmar" />
                  {person.location}
                </span>
              </li>
              <li>
                <span className="chip-content">
                  <ContactIcon name="relocation" />
                  {person.relocation}
                </span>
              </li>
              {person.contacts.map((contact) => (
                <li key={contact.id}>
                  <a href={contact.url}>
                    <ContactIcon name={contact.id} />
                    {contact.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="summary-statement">{person.summary}</p>
          </div>
        </section>

        <header className="section-header" ref={headerRef}>
          <nav aria-label="CV sections">
            <a
              href="#experience"
              aria-current={
                activeSection === 'experience' ? 'location' : undefined
              }
            >
              Work experience
            </a>
            <a
              href="#projects"
              aria-current={
                activeSection === 'projects' ? 'location' : undefined
              }
            >
              Projects
            </a>
            <a
              href="#education"
              aria-current={
                activeSection === 'education' ? 'location' : undefined
              }
            >
              Education
            </a>
          </nav>
          <div className="header-tools">
            <a
              href={person.cvUrl}
              download
              className="cv-download"
              aria-label="Download CV"
            >
              <span className="cv-download-label">Download CV</span>
              <FileDown size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <ThemeToggle />
          </div>
        </header>

        <section
          className="cv-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <h2 id="experience-title">Work experience</h2>
          {experience.map((job) => (
            <article className="experience-item" key={job.id} id={job.id}>
              <div className="item-heading">
                <h3>{job.title}</h3>
                <p className="date-range">
                  {job.current && (
                    <span
                      className="current-indicator"
                      role="img"
                      aria-label="Current role"
                    />
                  )}
                  {job.dateLabel}
                </p>
              </div>
              <p className="job-company">{job.company}</p>
              <p className="item-location">{job.location}</p>
              <details className="disclosure">
                <summary>
                  <span>{job.summary}</span>
                  <Chevron />
                </summary>
                <ul className="experience-text">
                  {job.highlights.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </section>

        <section
          className="cv-section"
          id="projects"
          aria-labelledby="projects-title"
        >
          <h2 id="projects-title">Projects</h2>
          {projects.map((project) => (
            <article className="project-item" key={project.id} id={project.id}>
              <div className="item-heading">
                <h3>{project.name}</h3>
                {project.year && <p className="date-range">{project.year}</p>}
              </div>
              <details className="disclosure">
                <summary>
                  <span>{project.summary}</span>
                  <Chevron />
                </summary>
                <div className="project-description">
                  {project.description.map((paragraph) => (
                    <p key={paragraph.text}>{paragraph.text}</p>
                  ))}
                </div>
              </details>
              <ProjectGallery project={project} />
            </article>
          ))}
        </section>
        <section
          className="cv-section education-section"
          id="education"
          aria-labelledby="education-title"
        >
          <h2 id="education-title">Education</h2>
          {education.map((school) => (
            <article className="education-item" key={school.id} id={school.id}>
              <div className="item-heading">
                <h3>{school.institution}</h3>
                <p className="date-range">
                  <time dateTime={school.startDate}>
                    {new Date(
                      `${school.startDate}-01T00:00:00Z`,
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                  <span aria-hidden="true">–</span>
                  <span className="sr-only">to</span>
                  <time dateTime={school.endDate}>
                    {new Date(
                      `${school.endDate}-01T00:00:00Z`,
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                </p>
              </div>
              <p className="job-company">{school.degree}</p>
              <p className="item-location chip-content">
                <ContactIcon name="us" />
                {school.location}
              </p>
              <p className="education-honors">
                GPA: {school.gpa} · <em>{school.honors}</em>
              </p>
              <ul className="experience-text">
                {school.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-signoff">
          <p>{resume.footer}</p>
          <AppearanceControls />
        </div>
      </footer>
    </>
  )
}
