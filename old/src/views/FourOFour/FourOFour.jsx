import { useLocation } from "react-router-dom";
import styles from "./FourOFour.module.css";
import Nav from "../../components/Nav/Nav";

function FourOFour() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <h1>
        <code>{location.pathname}</code> not found
      </h1>
      <h2 className="lighter-text">Please try one of the following links!</h2>
      <Nav hideLogo={true} />
    </div>
  );
}

export default FourOFour;
