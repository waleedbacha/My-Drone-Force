import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaBookOpen,
  FaBriefcase,
  FaArrowRight,
  FaStar,
  FaUserGraduate,
} from "react-icons/fa";

const PricingSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaBookOpen size={32} />,
      title: "Comprehensive Exam Readiness",
      description:
        "Master the FAA Part 107 curriculum with practice exams and dedicated study materials designed to help you pass with confidence.",
      included: true,
    },
    {
      icon: <FaBriefcase size={32} />,
      title: "Career Development Toolkit",
      description:
        "Gain exclusive access to the MyDroneForce regional employer network, connecting you directly to high-demand industry sectors like Agriculture, Infrastructure, and Public Safety.",
      included: true,
    },
    {
      icon: <FaUserGraduate size={32} />,
      title: "Targeted Regional Support",
      description:
        "Benefit from specialized mentorship and resources tailored for young professionals (ages 16-24) across Arkansas, Mississippi, and Tennessee.",
      included: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      style={{
        padding: "100px 0",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(99, 102, 241, 0.1)",
              padding: "6px 16px",
              borderRadius: "50px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--accent)",
              }}
            >
              🎯 Investment in Your Future
            </span>
          </div>
          <h2
            className="gradient-text"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Only{" "}
            <span style={{ fontSize: "clamp(40px, 6vw, 60px)" }}>$1,500</span>
            <br />
            Complete Drone Career Package
          </h2>
          <p
            style={{
              fontSize: "clamp(18px, 3vw, 20px)",
              color: "var(--text-secondary)",
              maxWidth: "800px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            "Don't just learn to fly, get a job! My Drone Force provides each
            participant with career path and job placement assistance!"
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "60px",
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass"
              style={{
                padding: "28px",
                borderRadius: "20px",
                border: "1px solid var(--border-color)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "rgba(99, 102, 241, 0.1)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  color: "var(--accent)",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  color: "var(--text-primary)",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                  marginBottom: "16px",
                }}
              >
                {feature.description}
              </p>
              {feature.included && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <FaCheckCircle size={14} color="#10b981" />
                  <span style={{ fontSize: "12px", color: "#10b981" }}>
                    Included
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.05))",
            borderRadius: "28px",
            padding: "40px",
            marginBottom: "60px",
            border: "1px solid var(--border-color)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "rgba(99, 102, 241, 0.15)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <FaStar size={40} color="var(--accent)" />
          </div>
          <h3
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "var(--text-primary)",
            }}
          >
            Why choose My Drone Force over other online courses?
          </h3>
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 18px)",
              color: "var(--text-secondary)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Online courses teach you to{" "}
            <strong style={{ color: "var(--accent)" }}>PASS a test</strong>. We
            teach you to{" "}
            <strong style={{ color: "var(--accent)" }}>BUILD a career</strong>.
            You get LIVE instructors, REAL drones, and a COMMUNITY that supports
            you from Day 1 through job placement.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: "center",
            background: "linear-gradient(135deg, var(--gradient))",
            borderRadius: "28px",
            padding: "50px 40px",
            color: "white",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Ready to Launch Your Drone Career?
          </h3>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 16px)",
              marginBottom: "30px",
              opacity: 0.9,
              maxWidth: "600px",
              margin: "0 auto 30px",
            }}
          >
            Limited spots available per cohort. Don't miss your opportunity to
            join the fastest-growing industry.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/register")}
              className="btn-primary-custom"
              style={{
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "600",
                background: "white",
                color: "var(--accent)",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Enroll Now → <FaArrowRight style={{ marginLeft: "8px" }} />
            </button>
            <button
              onClick={() => navigate("/pricing")}
              style={{
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "600",
                background: "transparent",
                color: "white",
                borderRadius: "50px",
                border: "2px solid white",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              View Full Pricing Details{" "}
              <FaArrowRight style={{ marginLeft: "8px" }} />
            </button>
          </div>
          <p
            style={{
              fontSize: "12px",
              marginTop: "24px",
              opacity: 0.8,
            }}
          >
            ⚡ Limited spots • No hidden fees
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
