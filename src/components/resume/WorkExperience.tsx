import type { Resume } from '../../types/resume'
import { ResumeSection } from './ResumeSection'
import { ExpandableText } from '../ExpandableText'
import entry from './ResumeEntry.module.css'
import styles from './WorkExperience.module.css'

export function WorkExperience({
  experience,
}: {
  experience: Resume['experience']
}) {
  return (
    <ResumeSection
      id="experience"
      title="Work experience"
      className={styles.workExperience}
    >
      {experience.map((job) => (
        <article className={styles.experienceItem} key={job.id} id={job.id}>
          <div className={entry.itemHeading}>
            <h3>{job.title}</h3>
            <p className={entry.dateRange}>
              {job.current && (
                <span
                  className={styles.currentIndicator}
                  role="img"
                  aria-label="Current role"
                />
              )}
              {job.dateLabel}
            </p>
          </div>
          <p className={entry.jobCompany}>{job.company}</p>
          <p className={entry.itemLocation}>{job.location}</p>
          <ExpandableText summary={job.summary}>
            <ul className={entry.experienceText}>
              {job.highlights.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </ExpandableText>
        </article>
      ))}
    </ResumeSection>
  )
}
