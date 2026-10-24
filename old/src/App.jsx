import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AboutMe from "./views/AboutMe/AboutMe";
import Portfolio from "./views/Portfolio/Portfolio";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import PdfModal from "./components/PdfModal/PdfModal";
import ProjectDetails from "./views/Portfolio/Components/ProjectDetails/ProjectDetails";

// import "../404.html";
import FourOFour from "./views/FourOFour/FourOFour";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<Navigate to="about" />} />
        <Route path="about" element={<AboutMe />} />
        <Route
          path="about/resume"
          element={
            <PdfModal pdfPath="/Kaung%20Khant%20Pyae%20Sone%20CV%202026.pdf" />
          }
        />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:currentYear" element={<Portfolio />} />
        <Route
          path="portfolio/:currentYear/:projectPath"
          element={<ProjectDetails />}
        />
        <Route path="*" element={<FourOFour />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
