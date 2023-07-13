import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AboutMe from "./views/AboutMe/AboutMe";
import Portfolio from "./views/Portfolio/Portfolio";
import Modal from "./views/Modal/Modal";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import PdfModal from "./components/PdfModal/PdfModal";
import Pdf from "./Kaung's Master Resume.pdf";
import ProjectDetails from "./views/Portfolio/Components/ProjectDetails/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<Navigate to="about" />} />
        <Route path="about" element={<AboutMe />} />
        <Route path="about/resume" element={<PdfModal pdfPath={Pdf} />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:currentYear" element={<Portfolio />} />
        <Route
          path="portfolio/:currentYear/:projectPath"
          element={<ProjectDetails />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
