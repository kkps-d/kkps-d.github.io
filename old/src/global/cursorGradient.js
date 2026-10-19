export default function cursorGradient(e) {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  e.target.style.setProperty("--x", x + "px");
  e.target.style.setProperty("--y", y + "px");
}
