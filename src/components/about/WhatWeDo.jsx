import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGraduationCap,
  FaRocket,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
// Removed FaDrone - using FaRocket instead

const WhatWeDo = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const services = [
    {
      icon: <FaGraduationCap />,
      title: "Part 107 Certification Training",
      description:
        "Comprehensive exam preparation with 98% pass rate. Our proven curriculum covers all FAA requirements.",
      color: "#0066cc",
    },
    {
      icon: <FaRocket />, // Changed from FaDrone to FaRocket
      title: "Hands-On Flight Training",
      description:
        "Real-world drone operation experience with industry-standard equipment and professional instructors.",
      color: "#3b82f6",
    },
    {
      icon: <FaHandshake />,
      title: "Career Placement Assistance",
      description:
        "Job placement support with 50+ corporate partners actively hiring certified drone pilots.",
      color: "#00a3ff",
    },
    {
      icon: <FaChartLine />,
      title: "Workforce Development",
      description:
        "Specialized programs for youth and young adults to launch successful drone careers.",
      color: "#0066cc",
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
            Our Core Services
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Comprehensive drone training and certification programs
          </p>
        </motion.div>

        <div className="row g-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div
                className="glass p-4"
                style={{
                  borderRadius: "20px",
                  height: "100%",
                  transition: "all 0.3s ease",
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
                  style={{ marginBottom: "10px", color: "var(--text-primary)" }}
                >
                  {service.title}
                </h4>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
