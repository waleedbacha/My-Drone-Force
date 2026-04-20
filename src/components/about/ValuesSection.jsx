import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaStar, FaHandshake, FaLightbulb, FaShieldAlt } from "react-icons/fa";

const ValuesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const values = [
    {
      icon: <FaStar />,
      title: "Excellence",
      description: "We deliver the highest quality training and support",
      color: "#f59e0b",
    },
    {
      icon: <FaHandshake />,
      title: "Integrity",
      description: "Honest, transparent, and ethical in everything we do",
      color: "#10b981",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Constantly evolving with drone technology",
      color: "#3b82f6",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safety First",
      description: "Commitment to safe and responsible drone operation",
      color: "#ef4444",
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
            OUR VALUES
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            What We Stand For
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Core principles that guide our mission
          </p>
        </motion.div>

        <div className="row g-4">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="glass text-center p-4"
                style={{
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  height: "100%",
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
                    width: "70px",
                    height: "70px",
                    margin: "0 auto 20px",
                    background: `linear-gradient(135deg, ${value.color}, var(--accent))`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    color: "white",
                  }}
                >
                  {value.icon}
                </div>
                <h4 style={{ marginBottom: "10px" }}>{value.title}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
