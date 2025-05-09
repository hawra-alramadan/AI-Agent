import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";

const APIKeyManager = () => {
  const { dispatch } = useApp();
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("openaiApiKey");
    if (stored) {
      setSavedKey(stored);
      setApiKey(stored);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      setError("API key is required.");
      return;
    }

    try {
      localStorage.setItem("openaiApiKey", apiKey);
      setSavedKey(apiKey);
      setError(null);
      dispatch({ type: "SET_API_KEY", payload: apiKey });
      dispatch({ type: "CHANGE_SCREEN", payload: "chat" }); // Go to chat after key set
    } catch (err) {
      setError("Failed to save API key.");
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem("openaiApiKey");
    setApiKey("");
    setSavedKey("");
    dispatch({ type: "SET_API_KEY", payload: "" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-8 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-indigo-500 dark:to-pink-600">
            API Key Manager
          </span>
        </h2>

        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300 text-center">
            {savedKey
              ? "You have a saved OpenAI API key."
              : "No API key found. Please enter your OpenAI API key below."}
          </p>

          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your OpenAI API key"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleSaveKey}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              Save API Key
            </button>

            {savedKey && (
              <button
                onClick={handleClearKey}
                className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 hover:dark:bg-gray-600 transition"
              >
                Remove API Key
              </button>
            )}
          </div>

          <p className="text-sm text-center mt-2">
            <span
              className="text-blue-600 hover:underline cursor-pointer dark:text-blue-400"
              onClick={() =>
                window.open(
                  "https://platform.openai.com/account/api-keys",
                  "_blank"
                )
              }
            >
              Or Get your own API key
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default APIKeyManager;
