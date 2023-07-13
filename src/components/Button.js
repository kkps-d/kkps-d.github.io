export default function Button({ isActive, isDisabled, onClick, children }) {
  const btnIsActive = isActive ? true : false; // Deals with undefined props

  function trackMouse(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    e.target.style.setProperty("--x", x + "px");
    e.target.style.setProperty("--y", y + "px");
  }

  return (
    <div
      aria-disabled={isDisabled}
      className={`button ${
        isDisabled
          ? "disabled"
          : btnIsActive
          ? "active"
          : "mouse-cursor-gradient-tracking"
      } `}
      onMouseMove={btnIsActive || isDisabled ? null : trackMouse}
      onClick={onClick}
      role="button"
    >
      {children}
    </div>
  );
}
