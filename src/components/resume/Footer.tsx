import { AppearanceControls } from '../AppearanceControls'
import styles from './Footer.module.css'

export function Footer({ text }: { text: string }) {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerSignoff}>
        <p>{text}</p>
        <AppearanceControls />
      </div>
    </footer>
  )
}
