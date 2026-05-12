import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaSearch, FaGraduationCap, FaBriefcase } from "react-icons/fa";

const WhatWeDo = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const services = [
    {
      icon: <FaSearch />,
      title: "1. Identify",
      subtitle: "Find & Recruit",
      description:
        "We partner with community organizations, workforce boards, and schools across Arkansas, Mississippi, and Tennessee to identify motivated Opportunity Youth ready for a career change.",
      features: [
        "Community partnerships across 3 states",
        "Targeted outreach to disconnected youth",
        "No experience required — just motivation",
      ],
      color: "#3b82f6",
    },
    {
      icon: <FaGraduationCap />,
      title: "2. Train",
      subtitle: "Certify & Skill Up",
      description:
        "Comprehensive FAA Part 107 certification training with hands-on experience using enterprise-grade drones — LiDAR, Thermal, Multispectral, and more.",
      features: [
        "98% FAA Part 107 pass rate",
        "Hands-on with industry-standard equipment",
        "Specialized tracks: Ag-Tech, Infrastructure, Public Safety",
      ],
      color: "#10b981",
    },
    {
      icon: <FaBriefcase />,
      title: "3. Place",
      subtitle: "Launch Career",
      description:
        "Direct job placement with 50+ corporate partners across the Mid-South. Starting salaries range from $45k to $85k+ with room for growth.",
      features: [
        "$60k+ average starting salary",
        "50+ corporate partners hiring",
        "Lifetime career support",
      ],
      color: "#f59e0b",
    },
  ];

  return (
    <section style={{ padding: "80px 0", background: "var(--bg-secondary)" }}>
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
            WHAT WE DO
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Identify. Train. Place.
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            A clear, proven path from today to a high-paying drone career
          </p>
        </motion.div>

        <div className="row g-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div
                className="glass p-4"
                style={{
                  borderRadius: "20px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    marginBottom: "20px",
                    background: `linear-gradient(135deg, ${service.color}, var(--accent))`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    color: "white",
                  }}
                >
                  {service.icon}
                </div>
                <h4
                  style={{ marginBottom: "5px", color: "var(--text-primary)" }}
                >
                  {service.title}
                </h4>
                <p
                  style={{
                    color: "var(--accent)",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  {service.subtitle}
                </p>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    marginBottom: "15px",
                  }}
                >
                  {service.description}
                </p>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "18px",
                    color: "var(--text-secondary)",
                    fontSize: "12px",
                    lineHeight: "1.8",
                  }}
                >
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
