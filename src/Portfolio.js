import { useEffect, useRef, useState } from "react";
import HorizontalDivider from "./components/HorizontalDivider";
import { portfolioData } from "./portfolio-data";
import { createPortal } from "react-dom";
import Modal from "./components/Modal";
import PortfolioDetails from "./components/PortfolioDetails";

export default function Portfolio() {
  const [selectedYear, setSelectedYear] = useState({
    year: portfolioData[0].year,
    setFromProjects: false,
  });

  return (
    <div className="portfolio-container">
      <Header />
      <div className="projects-section">
        <YearSelect
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
        />
        <Projects
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
          data={portfolioData}
        />
        <div className="spacer"></div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <>
      <h1>portfolio</h1>
      <p className="lighter-text">
        here's what I did over the years! click them for details
      </p>
      <HorizontalDivider width={"100px"} />
    </>
  );
}

function Projects({ data, selectedYear, onSelectYear }) {
  const projectsRef = useRef(null);
  // const lastTimeSectionRef = useRef(null); // The ref of the last TimeSection element to measure its height
  const timeSectionRefs = []; // Refs to all TimeSections
  const spacerRef = useRef(null); // ref to the spacer div at the bottom

  function handleScroll() {
    resizeSpacer();

    // Get bounding rect of projectsRef
    const projectsRect = projectsRef.current.getBoundingClientRect();

    // Get start and end of Projects element
    const projectsStart = projectsRect.y;
    const projectsEnd = projectsStart + projectsRect.height;

    // Check if each TimeSection is within range
    for (let timeSection of timeSectionRefs) {
      let timeSectionRect = timeSection.getBoundingClientRect();
      let timeSectionStart = timeSectionRect.y;
      let timeSectionEnd = timeSectionStart + timeSectionRect.height;

      if (timeSectionStart < projectsEnd && timeSectionEnd > projectsStart) {
        onSelectYear({
          year: timeSection.firstChild.innerHTML,
          setFromProjects: true,
        });
        break;
      }
    }
  }

  function scrollToYear(year) {
    // console.log(`Scroll to: ${year}`);

    // Find the related TimeSection
    const targetElement = timeSectionRefs.find(
      (elm) => elm.firstChild.innerHTML === year
    );
    // console.log(targetElement);
    targetElement.scrollIntoView();
  }

  function resizeSpacer() {
    // Get height of Projects element
    const projectsHeight = projectsRef.current.getBoundingClientRect().height;

    // Get height of last TimeSection
    const timeSectionHeight =
      timeSectionRefs[timeSectionRefs.length - 1].getBoundingClientRect()
        .height;

    // Set height of spacer to be projectsHeight - timeSectionHeight - 20px (flex gap). This ensures that last time section
    // can be the only element visible after completely scrolling down. This is to prevent breaking the
    // date select when multiple TimeSections are visible on screen.
    spacerRef.current.style = `min-height: ${
      projectsHeight - timeSectionHeight - 20
    }px`;
  }

  useEffect(() => {
    resizeSpacer();
    if (!selectedYear.setFromProjects) scrollToYear(selectedYear.year);
  }, [selectedYear]);

  return (
    <div className="projects" onScroll={handleScroll} ref={projectsRef}>
      {data.map((timeSection) => (
        <TimeSection
          key={timeSection.year}
          year={timeSection.year}
          sectionRef={(ref) => {
            timeSectionRefs.push(ref);
          }}
        >
          {timeSection.projects.map((project) => (
            <ProjectCard
              key={project.cardTitle}
              project={project}
              year={timeSection.year}
            />
          ))}
        </TimeSection>
      ))}
      <div ref={spacerRef} style={{ minHeight: "69px" }}></div>
    </div>
  );
}

function YearSelect({ selectedYear, onSelectYear }) {
  // const [selectedYear, setSelectedYear] = useState("ongoing");

  const years = portfolioData.map((yearGroup) => yearGroup.year);

  function handleClick(year) {
    onSelectYear({
      year: year,
      setFromProjects: false,
    });
    // console.log(selectedYear);
  }

  return (
    <div className="date-select">
      {years.map((year) => (
        <div
          key={year}
          className={`date-select-option ${
            year === selectedYear.year ? "selected" : ""
          }`}
          onClick={() => handleClick(year)}
        >
          {year}
        </div>
      ))}
    </div>
  );
}

function TimeSection({ year, sectionRef, children }) {
  return (
    <section ref={sectionRef} className="time-section">
      <h2>{year}</h2>
      <div className="project-cards">{children}</div>
    </section>
  );
}

function ProjectCard({ project, year }) {
  const [modalContents, setModalContents] = useState(null);
  function trackMouse(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    e.target.style.setProperty("--x", x + "px");
    e.target.style.setProperty("--y", y + "px");
  }

  return (
    <>
      <div
        className="project-card mouse-cursor-gradient-tracking"
        style={{
          backgroundImage: `url(${project.cardImgPath})`,
        }}
        onMouseMove={trackMouse}
        onClick={() =>
          setModalContents(
            <PortfolioDetails
              project={project}
              year={year}
              closeModal={() => setModalContents(null)}
            />
          )
        }
      >
        <div className="project-card-body">
          <h5>{project.cardTitle}</h5>
          <p className="lighter-text">{project.cardDesc}</p>
        </div>
      </div>
      <Modal>{modalContents}</Modal>
    </>
  );
}
