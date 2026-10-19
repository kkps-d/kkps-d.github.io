import Header from "./Components/Header/Header";
import Projects from "./Components/Projects/Projects";
import YearSelect from "./Components/YearSelect/YearSelect";
import styles from "./Portfolio.module.css";
import { portfolioData } from "../../global/portfolio-data";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Hook to sync the current year between components and the current route
 *
 * Justification of this hook instead of just using useNavigate:
 *
 * In the Project component, scrolling to a year section updates the year state.
 * Projects also needs to scroll to a section when the year state is updated from somewhere
 * else, so if the component sets the state itself, it creates a snapping effect section
 * which we don't want. Therefore, the year state update contains to the where the state
 * is updated from. If it is updated from within Projects, no scrolling is done.
 * @param {[string]} years An array of valid years in string format
 * @returns
 */
function useYear(years) {
  const [selectedYear, setSelectedYear] = useState({
    year: years[0],
    projectsScroll: false,
  });

  const { currentYear: pathCurrentYear } = useParams();
  const navigate = useNavigate();

  function setYear(year) {
    setSelectedYear({ year, projectsScroll: true });
  }

  function setYearWithoutScroll(year) {
    setSelectedYear({ year, projectsScroll: false });
  }

  // On hook mount
  useEffect(() => {
    if (!pathCurrentYear) {
      // Add to year to path if it doesn't exist
      navigate(years[0]);
    } else {
      if (!years.includes(pathCurrentYear)) {
        // Set year in path to earliest year if it is invalid
        navigate("/portfolio/" + years[0]);
      }

      // Sync the year in path to the year in internal state
      setSelectedYear({
        year: pathCurrentYear,
        projectsScroll: true,
      });
    }
  }, []);

  // Sync internal selectedYear to path
  useEffect(() => {
    // Only change path if years is valid
    if (years.includes(selectedYear.year))
      navigate("/portfolio/" + selectedYear.year);
  }, [selectedYear]);

  return {
    selectedYear,
    setYear,
    setYearWithoutScroll,
  };
}

function Portfolio() {
  const years = portfolioData.map((yearGroup) => yearGroup.year);
  const { selectedYear, setYear, setYearWithoutScroll } = useYear(years);

  document.title = "Portfolio - kkps.dev";

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contents}>
        <YearSelect selectedYear={selectedYear} onSelectYear={setYear} />
        <Projects
          selectedYear={selectedYear}
          onSelectYear={setYearWithoutScroll}
        />
        <div className={styles.spacer}></div>
      </div>
    </div>
  );
}

export default Portfolio;
