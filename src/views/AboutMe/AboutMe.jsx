import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import HorizontalDivider from "../../components/HorizontalDivider/HorizontalDivider";
import styles from "./AboutMe.module.css";

function AboutMe() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img
        className={styles.portraitImage}
        src="portrait.png"
        alt="Kaung's portrait"
      />
      <div className={styles.contents}>
        <h1>Kaung Khant Pyae Sone</h1>
        <h4>software developer: web, native, or embedded!</h4>
        <h4 className="lighter-text">located in San Jose, California</h4>
        <HorizontalDivider width="100px" />
        <p>
          Hey there, I'm Kaung! I'm an aspiring software developer, and I've
          mainly worked with web technologies such as HTML/CSS/JS and Node.js,
          and Python. I also have a growing interest in AI, specifically machine
          learning and computer vision applications. I'm also learning embedded
          programming on the Arduino platform as a hobby. Anyways, I'm
          interested in something as long as it's practical and serves a
          purpose!
        </p>

        <p>
          When I'm not working on something, I like to listen to music,
          especially EDM, with some of my favorite artists are KSHMR, W&W and
          Avicii (RIP). I also enjoy spending time playing games either
          competitive like Apex Legends and DOTA 2 with my friends, or
          story-driven games, a few favorites being Skyrim, The Witcher 3, and
          the Trails series. I also like to take long strolls, being lost in my
          own thoughts.
        </p>

        <p className="lighter-text">
          <b>Education:</b> University of the Pacific, 3.8,
          <em> magna cum laude</em>
        </p>
        <p className="lighter-text">
          <b>Employed at:</b> Looking for work!
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
          <Button onClick={() => navigate("resume")}>View Resume</Button>
        </div>
        <br />
      </div>
    </div>
  );
}

export default AboutMe;
