// src/hooks/useChat.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { sendMessageToAI } from "../services/openai";

export const useChat = () => {
  const { currentUser } = useAuth();
  const { state, dispatch } = useApp();
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      text,
      sender: currentUser?.email || "Anonymous",
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    try {
      const aiResponse = await sendMessageToAI(text);
      const aiMessage = {
        text: aiResponse,
        sender: "AI",
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: "ADD_MESSAGE", payload: aiMessage });
    } catch (error) {
      console.error("Chat error:", error);
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          text: "Sorry, I couldn't process your request.",
          sender: "AI",
          timestamp: new Date().toISOString(),
        },
      });
    }
  };

  return {
    messages: state.currentConversation?.messages || [],
    inputMessage,
    sendMessage,
    setInputMessage,
  };
};

export default useChat;
