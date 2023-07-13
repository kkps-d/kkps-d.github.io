import Button from "./Button";

const resumeFilePath = "Kaung's Master Resume.pdf";

export default function ResumeViewer({ closeViewer }) {
  return (
    <div className="pdf-viewer">
      <object
        data="Kaung's Master Resume.pdf"
        type="application/pdf"
        width="100%"
        height="500px"
      >
        Your browser does not support viewing PDF files. Please download the
        resume instead
        <Button
          onClick={() => {
            const a = document.createElement("a");
            a.href = resumeFilePath;
            a.download = resumeFilePath;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
        >
          Download Resume
        </Button>
      </object>
      <Button onClick={closeViewer}>Close</Button>
    </div>
  );
}
