import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      setIsDarkMode(isDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Main Gradient Orbs */}
      <motion.div
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "50%", "0%"],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "10%",
          left: "-20%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background: isDarkMode
            ? "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,102,204,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        animate={{
          x: ["0%", "-50%", "0%"],
          y: ["50%", "0%", "50%"],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-20%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background: isDarkMode
            ? "radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,163,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "20%", "-20%"],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background: isDarkMode
            ? "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,102,204,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Subtle Grid Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `radial-gradient(${isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
