import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { currentUser } = useAuth();

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="fixed top-0 right-0 w-1/2 z-50 px-6 py-4 flex justify-between items-center bg-transparent">
      {/* Only show logo if user is NOT logged in */}
      {!currentUser && (
        <h1 className="text-2xl font-bold text-blue-700 dark:text-white">
          ChatBuddy
        </h1>
      )}

      <div className="flex items-center gap-4 ml-auto">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition"
        >
          {document.documentElement.classList.contains("dark") ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
