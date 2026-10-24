import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import HorizontalDivider from "../../components/HorizontalDivider/HorizontalDivider";
import styles from "./AboutMe.module.css";

function AboutMe() {
  const navigate = useNavigate();

  document.title = "About Me - kkps.dev";

  return (
    <div className={styles.container}>
      <img
        className={styles.portraitImage}
        src="portrait.png"
        alt="Kaung's portrait"
      />
      <div className={styles.contents}>
        <h1>Kaung Khant Pyae Sone</h1>
        <h4>Full-stack software engineer</h4>
        <h4 className="lighter-text">Based in Myanmar, open to relocation</h4>
        <HorizontalDivider width="100px" />
        <p>
          Full-stack software engineer with U.S. education and professional
          experience, holding a B.Sc. in Computer Science from the University of
          the Pacific. Experienced in designing, modernizing, and delivering
          full-stack applications, with work spanning cloud architecture,
          distributed system integration, application security, performance
          optimization, and legacy modernization. Proven ability to rapidly
          understand complex systems, translate business requirements into
          technical solutions, and take ownership from architecture and
          implementation through delivery.
        </p>

        <p className="lighter-text">
          <b>Education:</b> University of the Pacific, B.Sc. Computer Science,
          GPA: 3.80/4.00 —
          <em> magna cum laude</em>
        </p>
        <p className="lighter-text">
          <b>Employed at:</b> KBZ Bank, Full-stack Engineer — Yangon, Myanmar
          (April 2026 – Current)
        </p>

        <div className={styles.socialIcons}>
          <Button
            onClick={() =>
              window.open(
                "mailto:kaung.kkps01@gmail.com?subject=Hello Kaung!",
                "_blank"
              )
            }
          >
            <i className="bi bi-envelope-fill"></i>
          </Button>
          <Button
            onClick={() =>
              window.open("https://www.linkedin.com/in/kaung-sone/", "_blank")
            }
          >
            <i className="bi bi-linkedin"></i>
          </Button>
          <Button
            onClick={() => window.open("https://github.com/kkps-d/", "_blank")}
          >
            <i className="bi bi-github"></i>
          </Button>
          <a
            className={styles.contactLink}
            href="https://wa.me/12099052480"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp: +1 (209) 905 2480"
            title="WhatsApp: +1 (209) 905 2480"
          >
            <i className="bi bi-whatsapp" aria-hidden="true"></i>
          </a>
          <Button onClick={() => navigate("resume")}>View CV</Button>
        </div>
        <br />
      </div>
    </div>
  );
}

export default AboutMe;
