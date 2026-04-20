import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import Typed from "typed.js";
import { FaArrowDown } from "react-icons/fa";
import RealisticDrone from "../common/RealisticDrone";

const HeroSection = () => {
  const typedRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Professional Drone Pilot",
        "FAA Part 107 Certified",
        "Drone Career Expert",
        "Industry Leader Since 2020",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 2000,
    });
    return () => typed.destroy();
  }, []);

  // Drone entrance animation variants
  const droneVariants = {
    hidden: {
      opacity: 0,
      x: 300,
      rotateY: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "tween",
        ease: [0.25, 0.1, 0.25, 1],
        duration: 1.5,
        delay: 0.2,
      },
    },
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-primary)",
        // More padding on mobile, comfortable on desktop
        paddingTop: isMobile ? "100px" : "80px",
      }}
    >
      {/* Animated Background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "80%",
          height: "80%",
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div
        className="container-custom"
        style={{ position: "relative", zIndex: 2, width: "100%" }}
      >
        <div className="row align-items-center">
          {/* Left Column - Text Content */}
          <div className="col-lg-6 col-12 text-center text-lg-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge - Uncomment if needed */}
              {/* <span
                style={{
                  background: "var(--gradient)",
                  padding: "10px 24px",
                  borderRadius: "50px",
                  display: "inline-block",
                  marginBottom: "30px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                🚁 America's Leading Drone Training
              </span> */}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: isMobile ? "38px" : "64px",
                fontWeight: "800",
                lineHeight: "1.1",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              Launch Your{" "}
              <span
                className="gradient-text"
                style={{
                  background: "var(--gradient)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Drone Career
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ marginBottom: "24px" }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "18px" : "24px",
                  fontWeight: "500",
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  ref={typedRef}
                  style={{ color: "var(--accent)", fontWeight: "600" }}
                ></span>
                <span style={{ color: "var(--accent)" }}>|</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: isMobile ? "14px" : "17px",
                lineHeight: "1.6",
                color: "var(--text-secondary)",
                maxWidth: "500px",
                marginBottom: "0",
              }}
            >
              Join thousands of successful drone pilots trained by industry
              experts. Get FAA Part 107 certified and start your high-flying
              career today.
            </motion.p>
          </div>

          {/* Right Column - Realistic 3D Drone */}
          <div className="col-lg-6 col-12 text-center mt-4 mt-lg-0">
            <motion.div
              variants={droneVariants}
              initial="hidden"
              animate="visible"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: isMobile ? "350px" : "550px",
              }}
            >
              {/* Realistic 3D Drone Component */}
              <div
                style={{
                  width: "100%",
                  height: isMobile ? "350px" : "550px",
                  position: "relative",
                }}
              >
                <RealisticDrone />
              </div>

              {/* Instruction text for mobile users */}
              {isMobile && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1.5 }}
                  style={{
                    fontSize: "10px",
                    color: "var(--text-secondary)",
                    marginTop: "5px",
                    opacity: 0.6,
                    position: "absolute",
                    bottom: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  👆 Tap and drag to rotate
                </motion.p>
              )}

              {/* Desktop instruction */}
              {!isMobile && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1.5 }}
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    marginTop: "10px",
                    opacity: 0.6,
                    position: "absolute",
                    bottom: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  🖱️ Click and drag to rotate the 3D drone
                </motion.p>
              )}

              {/* Floating elements */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                style={{
                  position: "absolute",
                  top: "5%",
                  right: "10%",
                  background: "var(--card-bg)",
                  padding: "10px",
                  borderRadius: "50%",
                  fontSize: isMobile ? "18px" : "24px",
                  boxShadow: "var(--shadow-md)",
                  zIndex: 10,
                  backdropFilter: "blur(10px)",
                }}
              >
                <motion.div
                  animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  ✨
                </motion.div>
              </motion.div> */}
              {/* 
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "10%",
                  background: "var(--card-bg)",
                  padding: "8px",
                  borderRadius: "50%",
                  fontSize: isMobile ? "16px" : "20px",
                  boxShadow: "var(--shadow-md)",
                  zIndex: 10,
                  backdropFilter: "blur(10px)",
                }}
              >
                <motion.div
                  animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                >
                  🎯
                </motion.div>
              </motion.div> */}
            </motion.div>
          </div>
        </div>

        {/* Scroll Down */}
        <motion.div
          className="text-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ marginTop: "20px" }}
        >
          <Link to="about" smooth={true} duration={500}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--gradient)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <FaArrowDown
                style={{
                  color: "white",
                  fontSize: "18px",
                }}
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
