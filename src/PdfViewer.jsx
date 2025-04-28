import React from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useParams } from "react-router-dom";

const PdfViewer = () => {
  const { documentId } = useParams();
  return (
    <div style={{ width: "100%", height: "100vh" }} className="flex flex-col">
      <h1
        className="text-2xl font-bold text-center"
        style={{ margin: "20px 0" }}
      >
        Viewer
      </h1>
      <iframe
        src={`${import.meta.env.VITE_SOME_KEY}/file/${documentId}`}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default PdfViewer;
