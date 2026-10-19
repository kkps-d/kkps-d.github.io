import styles from "./YearSelect.module.css";
import { portfolioData } from "../../../../global/portfolio-data";

function YearSelect({ selectedYear, onSelectYear }) {
  const years = portfolioData.map((yearGroup) => yearGroup.year);
  const { year: currentYear } = selectedYear;

  return (
    <div className={styles.yearSelect}>
      {years.map((year) => (
        <div
          key={year}
          className={`${styles.yearSelectOption} ${
            year === currentYear ? styles.selected : ""
          } `}
          onClick={() => onSelectYear(year)}
        >
          {year}
        </div>
      ))}
    </div>
  );
}

export default YearSelect;
