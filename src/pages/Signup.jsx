import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Dumbbell, Sparkles, Heart, Star } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        formData,  // Axios automatically stringifies this
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      console.log("Success:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Full error:", error);
      if (error.response) {
        console.log("Server responded with:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error:", error.message);
      }
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
        className="bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-2xl w-full max-w-md p-10 relative"
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
              FemmeFit
            </h2>
            <p className="mt-3 text-sm font-light tracking-wide text-gray-600">
              Transform • Empower • Inspire
            </p>
          </motion.div>
        </motion.div>

        {/* Form */}
        <form className="space-y-6">
          {/* Username */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`group relative ${
              activeField === "username" ? "z-10" : ""
            }`}
          >
            <label className="block mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 transition-all border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 bg-white/50 backdrop-blur-sm"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              onFocus={() => setActiveField("username")}
              onBlur={() => setActiveField("")}
            />
            <AnimatePresence>
              {activeField === "username" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl blur"
                ></motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`group relative ${
              activeField === "email" ? "z-10" : ""
            }`}
          >
            <label className="block mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 transition-all border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 bg-white/50 backdrop-blur-sm"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onFocus={() => setActiveField("email")}
              onBlur={() => setActiveField("")}
            />
            <AnimatePresence>
              {activeField === "email" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl blur"
                ></motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`group relative ${
              activeField === "password" ? "z-10" : ""
            }`}
          >
            <label className="block mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 transition-all border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 bg-white/50 backdrop-blur-sm"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onFocus={() => setActiveField("password")}
                onBlur={() => setActiveField("")}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 transition-colors -translate-y-1/2 right-4 top-1/2 hover:text-pink-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            </div>
            <AnimatePresence>
              {activeField === "password" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl blur"
                ></motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <button
            type="button" 
            onClick={handleSubmit}
            className="relative w-full group"
          >
            <div className="absolute inset-0 transition-opacity opacity-75 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg group-hover:opacity-100"></div>
            <div className="relative py-4 font-medium tracking-wide text-white shadow-xl bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl">
              Begin Your Transformation
            </div>
          </button>
        </form>

        {/* Login Link */}
        <motion.p
          className="mt-8 text-sm text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Already on your journey?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-transparent transition-opacity bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text hover:opacity-80"
          >
            Log in
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Signup;
