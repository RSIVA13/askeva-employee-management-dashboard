import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        data.token
      );

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login Failed"
      );

      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">

      {/* Animated Background */}

      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        whileHover={{
          rotateX: 5,
          rotateY: 5,
        }}
        className="
          relative
          w-full
          max-w-md
          p-8
          rounded-3xl
          backdrop-blur-xl
          bg-white/10
          border
          border-white/20
          shadow-[0_20px_80px_rgba(0,0,0,0.5)]
        "
      >
        {/* Floating Logo */}

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="flex justify-center mb-6"
        >
          <div
            className="
              w-20
              h-20
              rounded-2xl
              bg-gradient-to-r
              from-cyan-400
              to-blue-600
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              text-white
              shadow-xl
            "
          >
            E
          </div>
        </motion.div>

        {/* Heading */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Employee Dashboard
          </h1>

          <p className="text-gray-300 mt-2">
            Secure Admin Login
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Form */}

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-200 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="
                w-full
                px-4
                py-3
                bg-white/10
                border
                border-white/20
                rounded-xl
                text-white
                placeholder-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
              "
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-200 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="
                w-full
                px-4
                py-3
                bg-white/10
                border
                border-white/20
                rounded-xl
                text-white
                placeholder-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              hover:scale-105
              transition
              duration-300
              shadow-lg
              disabled:opacity-50
            "
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>

        <div className="text-center text-gray-300 text-sm mt-6">
          Employee Management System
        </div>
      </motion.div>
    </div>
  );
};

export default Login;