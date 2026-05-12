import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle, FaEnvelope, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AlreadyRegisteredModal = ({ isOpen, onClose, userEmail, userName }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isOpen && countdown === 0) {
      navigate("/");
    }
    return () => clearTimeout(timer);
  }, [isOpen, countdown, navigate]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            background: "var(--card-bg)",
            borderRadius: "28px",
            maxWidth: "500px",
            width: "100%",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <FaCheckCircle
              style={{ fontSize: "64px", color: "white", marginBottom: "16px" }}
            />
            <h2 style={{ color: "white", margin: 0, fontSize: "28px" }}>
              Already Registered!
            </h2>
          </div>

          {/* Content */}
          <div style={{ padding: "30px" }}>
            <p
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontSize: "16px",
                lineHeight: 1.6,
              }}
            >
              <strong>{userName || "You"}</strong> have already completed your
              registration with My Drone Force.
            </p>

            <div
              style={{
                background: "var(--bg-secondary)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <FaEnvelope style={{ color: "var(--accent)" }} />
                <span>{userEmail || "your email"}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FaPhone style={{ color: "var(--accent)" }} />
                <span>(501) 123-4567</span>
              </div>
            </div>

            <p
              style={{
                fontSize: "14px",
                textAlign: "center",
                color: "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              If you need assistance, please contact our support team.
            </p>

            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "rgba(59, 130, 246, 0.1)",
                borderRadius: "12px",
                marginBottom: "24px",
              }}
            >
              <p style={{ fontSize: "13px", marginBottom: 0 }}>
                Redirecting to home page in <strong>{countdown}</strong>{" "}
                seconds...
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="btn-primary-custom"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
              }}
            >
              Go to Home Page
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlreadyRegisteredModal;
