import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ProjectDetails.module.css";
import Modal from "../../../Modal/Modal";
import { portfolioData } from "../../../../global/portfolio-data";
import Button from "../../../../components/Button/Button";
import HorizontalDivider from "../../../../components/HorizontalDivider/HorizontalDivider";
import ImageGallery from "./ImageGallery";
import { useState } from "react";
import { tags } from "../../../../global/tags";
import ProjectTag from "../Projects/ProjectTag";

function findProject(targetYear, urlPath) {
  return portfolioData
    .find((yearGroup) => targetYear === yearGroup.year)
    ?.projects.find((project) => project.urlPath === urlPath);
}

function ProjectDetails() {
  const navigate = useNavigate();
  const { currentYear, projectPath } = useParams();
  const [isGalleryExpanded, setExpandGallery] = useState(false);
  const { pathname } = useLocation();

  const project = findProject(currentYear, projectPath);

  if (!project) {
    document.title = "Project not found - kkps.dev";
    return (
      <Modal>
        <div className={styles.notFound}>
          <h1>Project not found</h1>
          <Button onClick={() => navigate("/portfolio")}>Go back</Button>
        </div>
      </Modal>
    );
  }

  const { cardTitle, fullDesc, galleryImgPaths, demoUrl, repoUrl, tagIndexes } =
    project;
  document.title = `${cardTitle} - kkps.dev`;
  return (
    <Modal>
      <div className={styles.projectDetails}>
        <ImageGallery
          images={galleryImgPaths}
          isGalleryExpanded={isGalleryExpanded}
          onExpandGallery={setExpandGallery}
        />
        <div
          className={`${styles.contents} ${
            isGalleryExpanded ? styles.collapsed : ""
          }`}
        >
          <h1>{cardTitle}</h1>
          <h4 className="lighter-text">{currentYear}</h4>
          <div className={styles.tagContainer}>
            {tagIndexes.map((tag) => (
              <ProjectTag key={tag} tag={tags[tag]} />
            ))}
          </div>
          <HorizontalDivider width="100px" />
          <div className={styles.description}>
            {fullDesc.map((desc) => (
              <p key={desc.slice(0, 5)}>{desc}</p>
            ))}
          </div>
          <div className={styles.btnGroup}>
            {demoUrl ? (
              <Button onClick={() => window.open(demoUrl, "_blank")}>
                View demo
              </Button>
            ) : (
              <Button isDisabled={true}>Demo unavailable</Button>
            )}
            {repoUrl ? (
              <Button onClick={() => window.open(repoUrl, "_blank")}>
                View repo
              </Button>
            ) : (
              <Button isDisabled={true}>Repo unavailable</Button>
            )}
            <Button
              onClick={() => {
                let previousPath = pathname.split("/").slice(0, -1).join("/");
                navigate(previousPath);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProjectDetails;
