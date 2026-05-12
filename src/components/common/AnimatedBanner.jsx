import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const AnimatedBanner = ({ message, subMessage, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after duration (default 5 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: "relative",
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.95), rgba(139,92,246,0.95))",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "clamp(16px, 3vw, 20px) clamp(20px, 4vw, 30px)",
            marginBottom: "25px",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          {/* Animated background glow */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Close button */}
          <button
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
            style={{
              position: "absolute",
              top: "12px",
              right: "16px",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
          >
            <FaTimes size={12} />
          </button>

          {/* Content */}
          <div style={{ textAlign: "center", paddingRight: "24px" }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: "clamp(15px, 4vw, 18px)",
                fontWeight: "bold",
                color: "white",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              {message}
            </motion.p>
            {subMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontSize: "clamp(12px, 3vw, 14px)",
                  color: "rgba(255,255,255,0.9)",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {subMessage}
              </motion.p>
            )}
          </div>

          {/* Progress bar for auto-dismiss */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "3px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: "0 0 0 20px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedBanner;
