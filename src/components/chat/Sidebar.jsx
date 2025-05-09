import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import Lottie from "lottie-react";
import sidebarAnimation from "../../assets/AnimationHome.json";

const Sidebar = () => {
  const { state, dispatch } = useApp();
  const { logout, currentUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScreenChange = (screen) => {
    if ((screen === "chat" || screen === "transcription") && !state.apiKey) {
      alert("Please set your API key first.");
      return;
    }
    dispatch({ type: "CHANGE_SCREEN", payload: screen });
    setMobileOpen(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const SidebarContent = () => (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {currentUser && (
        <div
          className={`text-center mb-2 text-lg font-semibold text-gray-800 dark:text-white ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          Hello, {currentUser.displayName || "User"}
        </div>
      )}

      <button
        onClick={() => handleScreenChange("chat")}
        disabled={!state.apiKey}
        className={`flex items-center justify-center w-full px-6 py-3 rounded-lg text-sm font-semibold transition ${
          !state.apiKey
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
        }`}
      >
        {isCollapsed ? "" : "Chat"}
      </button>

      <button
        onClick={() => handleScreenChange("transcription")}
        disabled={!state.apiKey}
        className={`flex items-center justify-center w-full px-6 py-3 rounded-lg text-sm font-semibold transition ${
          !state.apiKey
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
        }`}
      >
        {isCollapsed ? "" : "Transcription"}
      </button>

      <button
        onClick={() => handleScreenChange("profile")}
        className="flex items-center justify-center w-full px-6 py-3 rounded-lg text-sm font-semibold transition text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
      >
        {isCollapsed ? "" : "Profile"}
      </button>

      <button
        onClick={logout}
        className="flex items-center justify-center w-full px-6 py-3 rounded-lg text-sm font-semibold transition text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
      >
        {isCollapsed ? "" : "Logout"}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 p-2 rounded-md"
        >
          ☰
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={`hidden md:flex flex-col fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex justify-end items-center p-4">
          <button
            onClick={toggleSidebar}
            className="text-lg text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {isCollapsed ? "›" : "‹"}
          </button>
        </div>

        {!isCollapsed && (
          <div className="w-full mb-4 px-4">
            <Lottie animationData={sidebarAnimation} loop autoplay />
          </div>
        )}

        <SidebarContent />
      </div>

      {/* Sidebar - Mobile */}
      {mobileOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 md:hidden">
          <div className="w-64 bg-white dark:bg-gray-800 h-full p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-lg text-gray-600 dark:text-gray-200"
              >
                ✕
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
