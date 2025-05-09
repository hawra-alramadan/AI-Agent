import React from "react";
import AudioUpload from "./AudioUpload";
import ProgressIndicator from "./ProgressIndicator";
import TranscriptionViewer from "./TranscriptionViewer";
import { useTranscription } from "../../hooks/useTranscription";

const TranscriptionInterface = () => {
  const { uploadAudio, loading, error, selectedTranscription } =
    useTranscription();

  return (
    <div className="flex flex-col h-full p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
      {/* Upload Section */}
      <div className="mb-4 sm:mb-6">
        <AudioUpload onUpload={uploadAudio} />
      </div>

      {/* Loading Indicator */}
      {loading && <ProgressIndicator />}

      {/* Error */}
      {error && (
        <div className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</div>
      )}

      {/* Transcription Viewer */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow p-4 dark:bg-gray-800 dark:text-white min-h-[200px]">
        {selectedTranscription ? (
          <TranscriptionViewer text={selectedTranscription.text} />
        ) : (
          <div className="text-gray-500 text-center mt-20 dark:text-gray-400">
            Select an audio file to view its transcription.
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionInterface;
