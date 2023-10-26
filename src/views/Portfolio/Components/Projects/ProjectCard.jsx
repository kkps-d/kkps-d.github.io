import styles from "./ProjectCard.module.css";
import cursorGradient from "../../../../global/cursorGradient";
import { useNavigate } from "react-router-dom";
import { tags } from "../../../../global/tags";
import ProjectTag from "./ProjectTag";

function ProjectCard({ project, year }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.projectCard} cursor-gradient`}
      onMouseMove={cursorGradient}
      onMouseEnter={(e) => {
        e.target.children[0].classList.remove("hidden");
      }}
      onMouseLeave={(e) => {
        e.target.children[0].classList.add("hidden");
      }}
      onClick={() => navigate(`/portfolio/${year}/${project.urlPath}`)}
      style={{
        backgroundImage: `url(${project.cardImgPath})`,
      }}
    >
      <div className={`${styles.projectCardBody} hidden`}>
        <h5>{project.cardTitle}</h5>
        <div className={styles.tagContainer}>
          {project.tagIndexes.map((tag) => (
            <ProjectTag key={tag} tag={tags[tag]} />
          ))}
        </div>
        <p className="lighter-text">{project.cardDesc}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
