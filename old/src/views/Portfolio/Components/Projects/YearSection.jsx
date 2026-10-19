import styles from "./YearSection.module.css";

function YearSection({ year, sectionRef, children }) {
  return (
    <section ref={sectionRef} className={styles.yearSection}>
      <h2>{year}</h2>
      <div className={styles.cards}>{children}</div>
    </section>
  );
}

export default YearSection;
