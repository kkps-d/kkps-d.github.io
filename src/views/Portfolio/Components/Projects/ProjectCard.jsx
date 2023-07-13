import styles from "./ProjectCard.module.css";
import cursorGradient from "../../../../global/cursorGradient";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project, year }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.projectCard} cursor-gradient`}
      onMouseMove={cursorGradient}
      onClick={() => navigate(`/portfolio/${year}/${project.urlPath}`)}
      style={{
        backgroundImage: `url(${project.cardImgPath})`,
      }}
    >
      <div className={styles.projectCardBody}>
        <h5>{project.cardTitle}</h5>
        <p className="lighter-text">{project.cardDesc}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
