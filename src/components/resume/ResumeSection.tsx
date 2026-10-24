import type { ReactNode } from 'react'
import styles from './ResumeSection.module.css'

export function ResumeSection({
  id,
  title,
  className = '',
  children,
}: {
  id: string
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={`${styles.cvSection} ${className}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  )
}
