import React, { useEffect, useRef } from "react";
import { useChat } from "../../hooks/useChat";
import Message from "./Message";

const ChatInterface = () => {
  const { messages, inputMessage, sendMessage, setInputMessage } = useChat();

  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[80vh] sm:h-[90vh] bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl">
      {/* Message History */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} isSender={msg.sender !== "AI"} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className={`px-6 py-3 ${
              inputMessage.trim()
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "bg-gray-400"
            } text-white rounded-lg hover:opacity-90 transition`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
