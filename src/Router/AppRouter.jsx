// src/AppRouter.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import ChatPage from "../pages/ChatPage";

import { AppProvider } from "../context/AppContext";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Navbar from "../components/shared/Navbar";

// ProtectedRoute component ensures the user is logged in before accessing the page
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />; // Redirect to home if not logged in
};

function AppRouter() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Navbar />{" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default AppRouter;
