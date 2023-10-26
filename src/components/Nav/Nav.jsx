import styles from "./Nav.module.css";
import FlexSpacer from "../FlexSpacer/FlexSpacer";
import Button from "../Button/Button";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../Logo/Logo";

function Nav({ hideLogo }) {
  const { pathname } = useLocation();
  useEffect(() => {
    // Update the background image according to current pathname
    let root = document.getElementById("root");
    if (pathname === "/about") {
      root.classList.add("bg-photo");
    } else {
      root.classList.remove("bg-photo");
    }
  }, [pathname]);

  return (
    <nav className={styles.nav}>
      {pathname !== "/about" ? hideLogo || <Logo /> : null}
      <FlexSpacer />
      <NavLink to="/about">
        <Button>About Me</Button>
      </NavLink>
      <NavLink to="/portfolio">
        <Button>Portfolio</Button>
      </NavLink>
    </nav>
  );
}

export default Nav;
