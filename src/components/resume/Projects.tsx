import type { Resume } from '../../types/resume'
import { ResumeSection } from './ResumeSection'
import { ExpandableText } from '../ExpandableText'
import { ProjectGallery } from '../ProjectGallery'
import entry from './ResumeEntry.module.css'
import styles from './Projects.module.css'

export function Projects({ projects }: { projects: Resume['projects'] }) {
  return (
    <ResumeSection id="projects" title="Projects">
      {projects.map((project) => (
        <article
          className={styles.projectItem}
          key={project.id}
          id={project.id}
        >
          <div className={entry.itemHeading}>
            <h3>{project.name}</h3>
            {project.year && <p className={entry.dateRange}>{project.year}</p>}
          </div>
          {project.technologies.length > 0 && (
            <p className={styles.technologies}>
              <span className="sr-only">Technologies: </span>
              {project.technologies.join(' · ')}
            </p>
          )}
          <ExpandableText summary={project.summary}>
            <div className={styles.projectDescription}>
              {project.description.map((paragraph) => (
                <p key={paragraph.text}>{paragraph.text}</p>
              ))}
            </div>
          </ExpandableText>
          <ProjectGallery project={project} />
        </article>
      ))}
    </ResumeSection>
  )
}
