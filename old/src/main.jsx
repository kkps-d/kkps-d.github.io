import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global/colors.css";
import "./global/cursor-gradient.css";
import "./global/root-style.css";
import "./global/text-styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
