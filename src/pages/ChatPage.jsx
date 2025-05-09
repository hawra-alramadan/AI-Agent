import React from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatInterface from "../components/chat/ChatInterface";
import TranscriptionInterface from "../components/transcription/TranscriptionInterface";
import APIKeyManager from "../components/profile/APIKeyManager"; // تأكد من المسار
import { useApp } from "../context/AppContext";

const ChatPage = () => {
  const { state } = useApp();

  const renderContent = () => {
    switch (state.currentScreen) {
      case "chat":
        return <ChatInterface />;
      case "transcription":
        return <TranscriptionInterface />;
      case "profile":
        return <APIKeyManager />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen p-4 gap-4">
      <div className="w-full sm:w-1/4 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 h-full">{renderContent()}</div>
    </div>
  );
};

export default ChatPage;
