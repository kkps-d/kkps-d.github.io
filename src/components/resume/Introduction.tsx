import type { Resume } from '../../types/resume'
import { ContactIcon } from '../ContactIcon'
import styles from './Introduction.module.css'

export function Introduction({ person }: { person: Resume['person'] }) {
  return (
    <section className={styles.introduction} aria-labelledby="name">
      <div>
        <h1 id="name">
          <span className={styles.name}>{person.name}</span>{' '}
          <span className={styles.title}>{person.title}</span>
        </h1>
        <ul
          className={styles.contactChips}
          aria-label="Location and contact information"
        >
          <li>
            <span className={styles.chipContent}>
              <ContactIcon name="myanmar" />
              {person.location}
            </span>
          </li>
          <li>
            <span className={styles.chipContent}>
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
        <p className={styles.summaryStatement}>{person.summary}</p>
      </div>
    </section>
  )
}
