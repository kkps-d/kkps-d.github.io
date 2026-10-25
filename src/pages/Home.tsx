import { useRef } from 'react'
import { Introduction } from '../components/resume/Introduction'
import { SectionNavigation } from '../components/resume/SectionNavigation'
import { WorkExperience } from '../components/resume/WorkExperience'
import { Projects } from '../components/resume/Projects'
import { Education } from '../components/resume/Education'
import { Footer } from '../components/resume/Footer'
import type { Resume } from '../types/resume'
import styles from './Home.module.css'

export function Home({ resume }: { resume: Resume }) {
  const mainRef = useRef<HTMLElement>(null)

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: 'https://www.kkps.dev/',
          name: `${resume.person.name} | ${resume.person.title}`,
          mainEntity: {
            '@type': 'Person',
            '@id': 'https://www.kkps.dev/#person',
            name: resume.person.name,
            url: 'https://www.kkps.dev/',
            jobTitle: resume.person.title,
            description: resume.person.summary,
            sameAs: resume.person.contacts
              .filter(({ id }) => id === 'github' || id === 'linkedin')
              .map(({ url }) => url),
            alumniOf: resume.education.map(({ institution }) => ({
              '@type': 'CollegeOrUniversity',
              name: institution,
            })),
          },
        }).replace(/</g, '\\u003c')}
      </script>
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
