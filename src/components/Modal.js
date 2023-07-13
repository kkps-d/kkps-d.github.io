import { createPortal } from "react-dom";

export default function Modal({ children }) {
  return children
    ? createPortal(
        <div className="modal">{children}</div>,
        document.getElementById("root")
      )
    : null;
}
