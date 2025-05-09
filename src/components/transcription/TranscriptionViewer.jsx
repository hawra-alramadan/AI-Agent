import React from "react";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown

const TranscriptionViewer = ({ text }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Transcription
      </h2>
      <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-300">
        <ReactMarkdown>{text}</ReactMarkdown> {/* Render the markdown text */}
      </div>
    </div>
  );
};

export default TranscriptionViewer;
