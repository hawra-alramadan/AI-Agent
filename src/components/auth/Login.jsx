import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import GoogleIcon from "../../assets/GoogleIcon";
import { auth } from "../../config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onSwitchToRegister, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, new GoogleAuthProvider());
      onLoginSuccess?.(); // Notify parent of success
    } catch (error) {
      setError("Google login failed. Please try again.");
      console.error("Google login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess?.();
    } catch (error) {
      if (error.code === "auth/invalid-email") setError("Invalid email.");
      else if (error.code === "auth/wrong-password")
        setError("Incorrect password.");
      else setError("Login failed.");
      console.error("Email login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Welcome Back
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2 border rounded-lg bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        >
          <GoogleIcon className="h-5 w-5 inline mr-2" />
          Continue with Google
        </button>
        <button
          onClick={handleEmailLogin}
          disabled={loading}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-500 dark:to-purple-500"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center">
          <span
            onClick={onSwitchToRegister}
            className="text-blue-600 cursor-pointer hover:underline dark:text-blue-400"
          >
            Don’t have an account? Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
