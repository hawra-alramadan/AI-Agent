import React from "react";
import Message from "./Message";

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 px-2 sm:px-4">
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg}
          isSender={msg.sender === currentUser.email}
        />
      ))}
    </div>
  );
};

export default MessageList;
