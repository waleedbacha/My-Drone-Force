import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import Typed from "typed.js";
import { FaArrowDown, FaUsers, FaChartLine, FaAward } from "react-icons/fa";
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
        "40,000+ young adults in Arkansas are ready for opportunity",
        "From Opportunity to Career",
        "Identify. Train. Place.",
        "$60k+ Starting Salaries",
        "FAA Part 107 Certified",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 2000,
    });
    return () => typed.destroy();
  }, []);

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

  // Stats data
  const stats = [
    {
      icon: <FaUsers />,
      value: "40,000+",
      label: "Youth Ready for Opportunity",
    },
    { icon: <FaChartLine />, value: "$60k+", label: "Average Starting Salary" },
    { icon: <FaAward />, value: "98%", label: "FAA Pass Rate" },
  ];

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
              {/* Opportunity Youth Stat Badge */}
              {/* <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(239, 68, 68, 0.1)",
                  padding: "6px 16px 6px 12px",
                  borderRadius: "50px",
                  marginBottom: "25px",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <span style={{ fontSize: "14px" }}>📊</span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#ef4444",
                  }}
                >
                  40,000+ young adults in Arkansas are ready for opportunity
                </span>
              </div> */}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: isMobile ? "36px" : "56px",
                fontWeight: "800",
                lineHeight: "1.1",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              From <span style={{ color: "var(--accent)" }}>Opportunity</span>
              <br />
              to{" "}
              <span
                className="gradient-text"
                style={{
                  background: "var(--gradient)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                High-Paying Career
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ marginBottom: "20px" }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "18px" : "22px",
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
                maxWidth: "550px",
                marginBottom: "25px",
              }}
            >
              We identify, train, and place Opportunity Youth from Arkansas,
              Mississippi, and Tennessee into high-paying drone careers. No
              experience needed — just motivation.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: "flex",
                gap: "25px",
                flexWrap: "wrap",
                marginBottom: "30px",
              }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "var(--card-bg)",
                    padding: "8px 16px",
                    borderRadius: "50px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <span style={{ color: "var(--accent)", fontSize: "18px" }}>
                    {stat.icon}
                  </span>
                  <div>
                    <span
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "var(--text-primary)",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--text-secondary)",
                        marginLeft: "5px",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
            >
              <Link to="contact" smooth={true} duration={500}>
                <button
                  className="btn-primary-custom"
                  style={{
                    padding: "14px 32px",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  Start Your Career →
                </button>
              </Link>
              <Link to="about" smooth={true} duration={500}>
                <button
                  className="btn-outline-custom"
                  style={{
                    padding: "14px 32px",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  Learn More
                </button>
              </Link>
            </motion.div>
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
              <div
                style={{
                  width: "100%",
                  height: isMobile ? "350px" : "550px",
                  position: "relative",
                }}
              >
                <RealisticDrone />
              </div>

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
            </motion.div>
          </div>
        </div>

        {/* Scroll Down */}
        <motion.div
          className="text-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ marginTop: "30px" }}
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
