import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="flex items-center bg-gray-50 p-3 rounded-xl mb-4 border">
          <FiMail className="text-gray-400 text-xl mr-3" />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent w-full outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-gray-50 p-3 rounded-xl mb-6 border">
          <FiLock className="text-gray-400 text-xl mr-3" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent w-full outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={loginUser}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <FiLogIn />
          Login
        </button>

        {/* Google Login */}
        <button
          onClick={googleLogin}
          className="w-full bg-white border mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-gray-500">
          Don’t have an account?{" "}
          <Link className="text-blue-600 font-semibold" to="/signup">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
