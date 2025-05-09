import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ message, isSender }) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} p-2`}>
      <div
        className={`max-w-[80%] p-4 rounded-lg ${
          isSender
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            : "bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        }`}
      >
        <ReactMarkdown>{message.text}</ReactMarkdown>
        <p className="text-xs opacity-70 mt-1 dark:text-gray-400">
          {" "}
          {/* Any additional text content */}
        </p>
      </div>
    </div>
  );
};

export default Message;
