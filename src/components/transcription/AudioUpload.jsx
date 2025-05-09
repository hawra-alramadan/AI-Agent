import React, { useState } from "react";

const AudioUpload = ({ onUpload }) => {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      onUpload(file);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      onUpload(file);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
        dragging
          ? "bg-blue-100 border-blue-500"
          : "bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600"
      }`}
    >
      <p className="text-gray-700 mb-2 dark:text-gray-300">
        Drag & drop an audio file here or click to upload:
      </p>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-colors dark:bg-indigo-600 dark:hover:bg-indigo-700"
      >
        Choose File
      </label>
    </div>
  );
};

export default AudioUpload;
