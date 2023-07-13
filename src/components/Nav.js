import Button from "./Button";
import Logo from "./Logo";

export default function Nav({ activePage, setActivePage }) {
  return (
    <nav>
      {activePage !== "about-me" ? <Logo /> : null}

      <div className="spacer"></div>
      <Button
        isActive={activePage === "about-me"}
        onClick={() => setActivePage("about-me")}
      >
        About Me
      </Button>
      <Button
        isActive={activePage === "portfolio"}
        onClick={() => setActivePage("portfolio")}
      >
        Portfolio
      </Button>
    </nav>
  );
}
