import { useNavigate } from "react-router-dom";
import Modal from "../../views/Modal/Modal";
import Button from "../Button/Button";
import styles from "./PdfModal.module.css";

function PdfModal({ pdfPath }) {
  const navigate = useNavigate();

  return (
    <Modal>
      <div className={styles.pdfModal}>
        <object
          data={pdfPath}
          type="application/pdf"
          width="100%"
          height="500px"
        >
          <div className={styles.unsupportedMessage}>
            Your browser does not support viewing PDF files. Please download the
            CV using the link below.
          </div>
        </object>
        <div className={styles.actions}>
          <a href={pdfPath} download="Kaung Khant Pyae Sone CV 2026.pdf">
            Download CV
          </a>
          <Button onClick={() => navigate("/")}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}

export default PdfModal;
