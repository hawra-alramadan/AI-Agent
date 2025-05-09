// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/AnimationHome.json";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleStartChatting = () => {
    if (currentUser) {
      navigate("/chat");
    } else {
      setShowLogin(true);
    }
  };

  const closeLoginModal = () => setShowLogin(false);
  const closeRegisterModal = () => setShowRegister(false);
  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };
  const onLoginSuccess = () => navigate("/chat");

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden duration-300">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 w-full">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Your talkative
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">
                little tech buddy
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              AI-powered conversations that feel natural, helpful, and always
              available.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={handleStartChatting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Start Chatting
              </button>
              <button className="px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-sm">
              <Lottie animationData={animationData} loop autoplay />
            </div>
          </div>
        </div>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Login
            onClose={closeLoginModal}
            onSwitchToRegister={switchToRegister}
            onLoginSuccess={onLoginSuccess}
          />
        </div>
      )}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Register
            onClose={closeRegisterModal}
            onSwitchToLogin={switchToLogin}
          />
        </div>
      )}
    </section>
  );
};

export default Home;
