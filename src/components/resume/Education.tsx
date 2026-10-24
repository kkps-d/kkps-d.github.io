import type { Resume } from '../../types/resume'
import { ResumeSection } from './ResumeSection'
import { ContactIcon } from '../ContactIcon'
import entry from './ResumeEntry.module.css'
import styles from './Education.module.css'

export function Education({ education }: { education: Resume['education'] }) {
  return (
    <ResumeSection
      id="education"
      title="Education"
      className={styles.educationSection}
    >
      {education.map((school) => (
        <article
          className={styles.educationItem}
          key={school.id}
          id={school.id}
        >
          <div className={entry.itemHeading}>
            <h3>{school.institution}</h3>
            <p className={entry.dateRange}>
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
                {new Date(`${school.endDate}-01T00:00:00Z`).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    year: 'numeric',
                    timeZone: 'UTC',
                  },
                )}
              </time>
            </p>
          </div>
          <p className={entry.jobCompany}>{school.degree}</p>
          <p className={`${entry.itemLocation} ${styles.location}`}>
            <ContactIcon name="us" />
            {school.location}
          </p>
          <p className={styles.educationHonors}>
            GPA: {school.gpa} · <em>{school.honors}</em>
          </p>
          <ul className={entry.experienceText}>
            {school.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      ))}
    </ResumeSection>
  )
}
