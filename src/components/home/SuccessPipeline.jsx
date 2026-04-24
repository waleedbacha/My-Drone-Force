import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaSearch,
  FaGraduationCap,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";

const SuccessPipeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const steps = [
    {
      number: "01",
      icon: <FaSearch />,
      title: "Identify",
      subtitle: "Find & Recruit",
      description:
        "We partner with community organizations, workforce boards, and schools to identify motivated Opportunity Youth across Arkansas, Mississippi, and Tennessee.",
      duration: "2-4 weeks",
      color: "#3b82f6",
      details: [
        "Community partnerships",
        "Targeted outreach",
        "Eligibility screening",
      ],
    },
    {
      number: "02",
      icon: <FaGraduationCap />,
      title: "Train",
      subtitle: "Certify & Skill Up",
      description:
        "Comprehensive FAA Part 107 certification with hands-on training using enterprise-grade drones — LiDAR, Thermal, Multispectral, and more.",
      duration: "6-8 weeks",
      color: "#10b981",
      details: [
        "FAA Part 107 certification",
        "Hands-on equipment training",
        "Industry-specific tracks",
      ],
    },
    {
      number: "03",
      icon: <FaBriefcase />,
      title: "Place",
      subtitle: "Launch Career",
      description:
        "Direct job placement with 50+ corporate partners. Starting salaries range from $45k to $85k+ with lifetime career support.",
      duration: "2-4 weeks",
      color: "#f59e0b",
      details: [
        "Job placement assistance",
        "Interview preparation",
        "Lifetime career support",
      ],
    },
  ];

  return (
    <section
      style={{
        padding: "80px 0",
        background: "var(--bg-secondary)",
        position: "relative",
      }}
    >
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <span
            style={{
              background: "var(--gradient)",
              padding: "6px 16px",
              borderRadius: "50px",
              display: "inline-block",
              marginBottom: "15px",
              color: "white",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            YOUR PATH TO SUCCESS
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            From Today to a High-Paying Career
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            A clear, proven pipeline that transforms Opportunity Youth into
            certified drone professionals
          </p>
        </motion.div>

        {/* Desktop Pipeline (Row layout) */}
        <div
          className="d-none d-lg-block"
          style={{ position: "relative", marginTop: "40px" }}
        >
          {/* Connecting Line */}
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "15%",
              right: "15%",
              height: "2px",
              background: "var(--gradient)",
              opacity: 0.3,
              zIndex: 0,
            }}
          />

          <div className="row g-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="col-lg-4"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div
                  className="glass"
                  style={{
                    borderRadius: "24px",
                    padding: "30px",
                    height: "100%",
                    position: "relative",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    border: "1px solid var(--border-color)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.borderColor = step.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--border-color)";
                  }}
                >
                  {/* Step Number */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-15px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: `linear-gradient(135deg, ${step.color}, var(--accent))`,
                      padding: "4px 12px",
                      borderRadius: "50px",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
                    Step {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      margin: "20px auto 20px",
                      background: `linear-gradient(135deg, ${step.color}, var(--accent))`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      color: "white",
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      marginBottom: "5px",
                      color: step.color,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "var(--accent)",
                      marginBottom: "15px",
                    }}
                  >
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Duration Badge */}
                  <div
                    style={{
                      display: "inline-block",
                      background: `rgba(${step.color === "#3b82f6" ? "59,130,246" : step.color === "#10b981" ? "16,185,129" : "245,158,11"}, 0.1)`,
                      padding: "5px 12px",
                      borderRadius: "50px",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: step.color,
                      marginBottom: "15px",
                    }}
                  >
                    ⏱️ {step.duration}
                  </div>

                  {/* Details List */}
                  <ul
                    style={{
                      textAlign: "left",
                      margin: "0",
                      paddingLeft: "20px",
                      color: "var(--text-secondary)",
                      fontSize: "12px",
                      lineHeight: "1.8",
                    }}
                  >
                    {step.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrow indicators between steps (desktop) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "calc(33.33% - 80px)",
              marginTop: "-30px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {[1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--card-bg)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--border-color)",
                }}
              >
                <FaArrowRight style={{ color: "var(--accent)" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Pipeline (Vertical layout) */}
        <div className="d-block d-lg-none">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ marginBottom: "30px" }}
            >
              <div
                className="glass"
                style={{
                  borderRadius: "20px",
                  padding: "25px",
                  textAlign: "center",
                  border: `1px solid ${step.color}20`,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50px",
                    height: "50px",
                    background: `linear-gradient(135deg, ${step.color}, var(--accent))`,
                    borderRadius: "50%",
                    fontSize: "24px",
                    color: "white",
                    marginBottom: "15px",
                  }}
                >
                  {step.icon}
                </div>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: step.color,
                  }}
                >
                  {step.title}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  {step.subtitle}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    marginTop: "10px",
                  }}
                >
                  {step.description}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    background: `rgba(${step.color === "#3b82f6" ? "59,130,246" : step.color === "#10b981" ? "16,185,129" : "245,158,11"}, 0.1)`,
                    padding: "4px 10px",
                    borderRadius: "50px",
                    fontSize: "11px",
                    color: step.color,
                    marginTop: "10px",
                  }}
                >
                  ⏱️ {step.duration}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div style={{ textAlign: "center", margin: "10px 0" }}>
                  <FaArrowRight
                    style={{
                      color: "var(--accent)",
                      transform: "rotate(90deg)",
                      opacity: 0.5,
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-5"
        >
          <button
            className="btn-primary-custom"
            onClick={() => (window.location.href = "/register")}
            style={{ padding: "14px 40px", fontSize: "16px" }}
          >
            Start Your Journey Today →
          </button>
          <p
            style={{
              marginTop: "15px",
              fontSize: "13px",
              color: "var(--text-secondary)",
            }}
          >
            No experience required. We'll guide you every step of the way.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessPipeline;
