import React, { useState, useRef } from "react";

const MessageInput = ({ onSend, onRecord }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage(""); // Clear the message input
    inputRef.current.focus(); // Focus back on the input field after sending
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-3 shadow-sm"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        ref={inputRef} // Reference to the input field
      />
      <button
        type="button"
        onClick={onRecord}
        className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg px-3 py-2"
      >
        🎤
      </button>
      <button
        type="submit"
        disabled={!message.trim()} // Disable Send button if message is empty
        className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 ${
          !message.trim() ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
