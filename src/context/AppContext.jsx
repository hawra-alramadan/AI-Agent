// In context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  theme: localStorage.getItem("theme") || "light",
  currentScreen: "chat", // Default screen is "chat"
  apiKey: localStorage.getItem("openaiApiKey") || "", // Store API Key in localStorage for persistence
  conversations: [],
  currentConversation: {
    id: Date.now(),
    messages: [],
    createdAt: new Date().toISOString(),
  },
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { ...state, theme: newTheme };
    case "CHANGE_SCREEN":
      return { ...state, currentScreen: action.payload };
    case "SET_API_KEY": // New action to set the API Key
      localStorage.setItem("apiKey", action.payload); // Store in localStorage for persistence
      return { ...state, apiKey: action.payload };
    case "START_NEW_CHAT":
      return {
        ...state,
        currentConversation: {
          id: Date.now(),
          messages: [],
          createdAt: new Date().toISOString(),
        },
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        currentConversation: {
          ...state.currentConversation,
          messages: [...state.currentConversation.messages, action.payload],
        },
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    document.body.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useApp = () => useContext(AppContext);
