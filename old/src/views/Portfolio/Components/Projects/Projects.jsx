import styles from "./Projects.module.css";
import { portfolioData } from "../../../../global/portfolio-data";
import YearSection from "./YearSection";
import ProjectCard from "./ProjectCard";
import { useEffect, useRef } from "react";

function resizeSpacer(projectsRef, yearSectionRefs, spacerRef) {
  // Get height of Projects element
  const projectsHeight = projectsRef.current.getBoundingClientRect().height;

  // Get height of last TimeSection
  const yearSectionHeight =
    yearSectionRefs[yearSectionRefs.length - 1].getBoundingClientRect().height;

  // Set height of spacer to be projectsHeight - yearSectionHeight - 20px (flex gap). This ensures that last time section
  // can be the only element visible after completely scrolling down. This is to prevent breaking the
  // date select when multiple YearSections are visible on screen.
  spacerRef.current.style = `min-height: ${
    projectsHeight - yearSectionHeight - 20
  }px`;
}

function handleScroll(projectsRef, yearSectionRefs, spacerRef, onSelectYear) {
  resizeSpacer(projectsRef, yearSectionRefs, spacerRef);

  // Get bounding rect of projectsRef
  const projectsRect = projectsRef.current.getBoundingClientRect();

  // Get start and end of Projects element
  const projectsStart = projectsRect.y;
  const projectsEnd = projectsStart + projectsRect.height;

  // Check if each YearSection is within range
  for (let yearSection of yearSectionRefs) {
    let yearSectionRect = yearSection.getBoundingClientRect();
    let yearSectionStart = yearSectionRect.y;
    let yearSectionEnd = yearSectionStart + yearSectionRect.height;

    if (yearSectionStart < projectsEnd && yearSectionEnd > projectsStart) {
      onSelectYear(yearSection.firstChild.innerHTML);
      break;
    }
  }
}

function scrollToYear(year, yearSectionRefs) {
  // Find the related TimeSection
  const targetElement = yearSectionRefs.find(
    (elm) => elm.firstChild.innerHTML === year
  );

  targetElement.scrollIntoView();
}

function Projects({ selectedYear, onSelectYear }) {
  // Ref to the 'Projects' component
  const projectsRef = useRef(null);

  // Refs to each YearSection
  const yearSectionRefs = [];

  // Ref to the spacer at the end of Projects
  const spacerRef = useRef(null);

  useEffect(() => {
    resizeSpacer(projectsRef, yearSectionRefs, spacerRef);
    if (selectedYear.projectsScroll)
      scrollToYear(selectedYear.year, yearSectionRefs);
  }, [selectedYear]);

  return (
    <div
      className={styles.projects}
      onScroll={() =>
        handleScroll(projectsRef, yearSectionRefs, spacerRef, onSelectYear)
      }
      ref={projectsRef}
    >
      {portfolioData.map((yearGroup) => (
        <YearSection
          key={yearGroup.year}
          year={yearGroup.year}
          sectionRef={(ref) => {
            yearSectionRefs.push(ref);
          }}
        >
          {yearGroup.projects.map((project) => (
            <ProjectCard
              key={project.cardTitle}
              project={project}
              year={yearGroup.year}
            />
          ))}
        </YearSection>
      ))}
      <div ref={spacerRef} style={{ minHeight: "69px" }}></div>
    </div>
  );
}

export default Projects;
