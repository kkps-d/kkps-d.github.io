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
            resume instead
            <Button
              onClick={() => {
                const a = document.createElement("a");
                a.href = pdfPath;
                a.download = pdfPath;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              Download Resume
            </Button>
          </div>
        </object>
        <Button onClick={() => navigate("/")}>Close</Button>
      </div>
    </Modal>
  );
}

export default PdfModal;
