import { XMarkIcon } from "@heroicons/react/24/outline";
import { auth } from "../../config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      onRegisterSuccess?.();
    } catch (error) {
      console.error("Google Sign-Up Error:", error.message);
    }
  };

  const handleEmailSignUp = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      onRegisterSuccess?.();
    } catch (error) {
      console.error("Registration Error:", error.message);
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
          Create Account
        </h2>
        <button
          onClick={handleGoogleSignUp}
          className="w-full py-2 border rounded-lg bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        >
          Continue with Google
        </button>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          or use email
        </div>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={handleEmailSignUp}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-500 dark:to-purple-500"
        >
          Register
        </button>
        <div className="text-center">
          <span
            onClick={onSwitchToLogin}
            className="text-blue-600 cursor-pointer hover:underline dark:text-blue-400"
          >
            Already have an account? Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
