import { useState } from "react";
import PropType from "prop-types";
import AboutMe from "./AboutMe";
import Portfolio from "./Portfolio";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Modal from "./components/Modal";

function App() {
  const [activePage, setActivePage] = useState("about-me");
  var pageToReturn;

  switch (activePage) {
    default:
    case "about-me":
      pageToReturn = <AboutMe />;
      document.title = "About Me - kkps.dev";
      break;

    case "portfolio":
      pageToReturn = <Portfolio />;
      document.title = "Portfolio - kkps.dev";
      break;
  }

  return (
    <>
      <Page
        className={activePage === "about-me" ? "bg-image" : "bg-gradient"}
        activePage={activePage}
        setActivePage={setActivePage}
      >
        {pageToReturn}
      </Page>
    </>
  );
}

Page.propType = {
  className: PropType.string,
};
function Page({ activePage, setActivePage, children, className = "" }) {
  return (
    <div className={`container ${className}`}>
      <Nav activePage={activePage} setActivePage={setActivePage} />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

export default App;
