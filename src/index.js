import React from "react";
import ReactDOM from "react-dom/client";
import "./css/App.css";
import "./css/AboutMe.css";
import "./css/Button.css";
import "./css/DateSelect.css";
import "./css/Footer.css";
import "./css/HorizontalDivider.css";
import "./css/Logo.css";
import "./css/Modal.css";
import "./css/Nav.css";
import "./css/Portfolio.css";
import "./css/PortfolioDetails.css";
import "./css/ResumeViewer.css";
import "./css/text-styles.css";
import "./css/cursor-gradient.css";
import App from "./App";
import ResumeViewer from "./components/ResumeViewer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <ResumeViewer /> */}
  </React.StrictMode>
);
