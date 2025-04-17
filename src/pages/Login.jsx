import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Eye, EyeOff, Sparkles, Heart, Star } from "lucide-react";
import { AuthContext } from "../components/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email: formData.email, password: formData.password },
      );
      console.log("Login successful:", response.data);
      await login(formData.email);
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  // Floating particles animation
  const particles = Array.from({ length: 15 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute"
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0,
      }}
      animate={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: [0, 1, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {i % 3 === 0 && <Sparkles size={16} className="text-pink-300/30" />}
      {i % 3 === 1 && <Heart size={16} className="text-pink-400/30" />}
      {i % 3 === 2 && <Star size={16} className="text-purple-300/30" />}
    </motion.div>
  ));

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800">
      {particles}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-2xl w-full max-w-md p-10 relative z-10"
      >
        {/* Logo and Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-r from-pink-400 to-purple-500 blur-lg"></div>
            <div className="relative p-5 mb-4 rounded-full shadow-xl bg-gradient-to-r from-pink-500 to-purple-600">
              <Dumbbell size={40} className="text-white" />
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
              Welcome Back
            </h2>
            <p className="mt-3 text-sm font-light tracking-wide text-gray-600">
              Transform • Empower • Inspire
            </p>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="relative">
            <label className="block mb-1 text-xs font-medium text-gray-500 uppercase">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 transition-all border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 bg-white/50"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setActiveField("email")}
              onBlur={() => setActiveField("")}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block mb-1 text-xs font-medium text-gray-500 uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 transition-all border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 bg-white/50"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setActiveField("password")}
                onBlur={() => setActiveField("")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 transition-colors -translate-y-1/2 right-4 top-1/2 hover:text-pink-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="relative w-full group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 transition-opacity opacity-75 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg group-hover:opacity-100"></div>
            <div className="relative py-4 font-medium tracking-wide text-white shadow-xl bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl">
              Welcome Back
            </div>
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-8 text-sm text-center text-gray-600">
          New to FemmeFit?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="font-medium text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text hover:opacity-80"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;