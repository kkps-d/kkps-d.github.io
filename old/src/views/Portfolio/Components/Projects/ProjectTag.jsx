import styles from "./ProjectTag.module.css";

function ProjectTag({ tag }) {
  return (
    <div className={styles.tag} style={{ backgroundColor: tag.color }}>
      {tag.name}
    </div>
  );
}

export default ProjectTag;
