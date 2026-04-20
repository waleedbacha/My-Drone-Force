import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaBuilding, FaRocket, FaShieldAlt } from "react-icons/fa";

const WhoWeServe = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const audiences = [
    {
      icon: <FaUsers />,
      title: "Youth & Young Adults",
      description:
        "STEM-focused drone education programs designed to prepare the next generation for high-paying careers.",
      audience: "Ages 16-24",
      color: "#0066cc",
    },
    {
      icon: <FaBuilding />,
      title: "Corporate Partners",
      description:
        "Custom training programs for businesses seeking to integrate drone technology into their operations.",
      audience: "Enterprise Clients",
      color: "#3b82f6",
    },
    {
      icon: <FaRocket />,
      title: "Career Changers",
      description:
        "Fast-track certification programs for professionals transitioning into the drone industry.",
      audience: "Adult Learners",
      color: "#00a3ff",
    },
    {
      icon: <FaShieldAlt />,
      title: "Government & Public Sector",
      description:
        "Specialized training for public safety, infrastructure inspection, and emergency response.",
      audience: "Public Agencies",
      color: "#0066cc",
    },
  ];

  return (
    <section style={{ padding: "80px 0", background: "var(--bg-primary)" }}>
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
            WHO WE SERVE
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Our Community
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Empowering diverse groups to achieve their drone career goals
          </p>
        </motion.div>

        <div className="row g-4">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div
                className="glass p-4 text-center"
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
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 20px",
                    background: `linear-gradient(135deg, ${audience.color}, var(--accent))`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    color: "white",
                  }}
                >
                  {audience.icon}
                </div>
                <h4
                  style={{ marginBottom: "5px", color: "var(--text-primary)" }}
                >
                  {audience.title}
                </h4>
                <p
                  style={{
                    color: "var(--accent)",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  {audience.audience}
                </p>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {audience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass mt-5 p-4 text-center"
          style={{ borderRadius: "20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>
              🏆 Best Drone Training 2024
            </span>
            <span style={{ color: "var(--text-primary)" }}>
              ⭐ 4.9/5 Student Rating
            </span>
            <span style={{ color: "var(--text-primary)" }}>
              🇺🇸 Nationally Recognized
            </span>
            <span style={{ color: "var(--text-primary)" }}>
              ✅ FAA Part 107 Certified
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeServe;
