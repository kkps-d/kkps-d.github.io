import type { ReactNode } from 'react'
import { Chevron } from './Chevron'
import styles from './ExpandableText.module.css'

export function ExpandableText({
  summary,
  children,
}: {
  summary: string
  children: ReactNode
}) {
  return (
    <details className={styles.disclosure}>
      <summary>
        <span>{summary}</span>
        <Chevron />
      </summary>
      {children}
    </details>
  )
}
