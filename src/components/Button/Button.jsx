import styles from "./Button.module.css";
import cursorGradient from "../../global/cursorGradient";

function Button({ children, onClick, isDisabled }) {
  return (
    <div
      className={`${styles.button} ${
        isDisabled ? styles.disabled : "cursor-gradient"
      }`}
      onMouseMove={cursorGradient}
      onClick={onClick}
      role="button"
    >
      {children}
    </div>
  );
}

export default Button;
