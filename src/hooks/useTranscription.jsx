import { useState } from "react";

export const useTranscription = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTranscription, setSelectedTranscription] = useState(null);
  const apiKey = localStorage.getItem("openaiApiKey"); // Get API key from environment variables

  const uploadAudio = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", "whisper-1");

      const res = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Transcription failed");
      }

      const newTranscription = {
        id: Date.now(),
        text: data.text,
        filename: file.name,
      };

      setTranscriptions((prev) => [...prev, newTranscription]);
      setSelectedTranscription(newTranscription);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    transcriptions,
    uploadAudio,
    loading,
    error,
    selectedTranscription,
    setSelectedTranscription,
  };
};
