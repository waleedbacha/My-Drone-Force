import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import API_URL from "../config/api";
import whiteLogo from "../../assests/images/white.png";
import darkLogo from "../../assests/images/drone_logo2.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Get current theme
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute("data-theme") || "dark";
  });

  // Listen for theme changes
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(currentTheme);
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Check if already logged in
  React.useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, formData);

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminInfo", JSON.stringify(response.data.admin));
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Choose logo based on theme
  const logoSrc = theme === "dark" ? whiteLogo : darkLogo;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--gradient)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <ToastContainer position="top-right" theme="dark" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass"
        style={{
          maxWidth: "450px",
          width: "100%",
          padding: "40px",
          borderRadius: "30px",
          background: "var(--card-bg)",
        }}
      >
        {/* Header with Logo */}
        <div className="text-center mb-4">
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logoSrc}
              alt="My Drone Force"
              style={{
                width: "400%",
                height: "400%",
                objectFit: "contain",
              }}
            />
          </div>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "var(--text-primary)",
            }}
          >
            Admin Login
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              marginTop: "5px",
            }}
          >
            Enter your credentials to access dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--text-primary)",
                marginBottom: "5px",
                display: "block",
              }}
            >
              <FaEnvelope size={12} style={{ marginRight: "5px" }} /> Email
              Address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                borderRadius: "12px",
                padding: "12px",
              }}
              placeholder="admin@mydroneforce.com"
            />
          </div>

          <div className="mb-4">
            <label
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--text-primary)",
                marginBottom: "5px",
                display: "block",
              }}
            >
              <FaLock size={12} style={{ marginRight: "5px" }} /> Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  borderRadius: "12px",
                  padding: "12px",
                  paddingRight: "45px",
                }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="btn-primary-custom"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "600",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Logging in..." : "Login to Dashboard"}
            {!isLoading && <FaArrowRight style={{ marginLeft: "8px" }} />}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
