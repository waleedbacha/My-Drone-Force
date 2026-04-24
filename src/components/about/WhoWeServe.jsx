import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaUsers,
  FaBuilding,
  FaHandshake,
  FaUserGraduate,
  FaChartLine,
} from "react-icons/fa";

const WhoWeServe = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const audiences = [
    {
      icon: <FaUsers />,
      title: "Opportunity Youth",
      subtitle: "Ages 16-24",
      description:
        "Young adults in Arkansas, Mississippi, and Tennessee who are ready for a career change. No experience needed — just motivation. We provide the training, certification, and job placement.",
      audience: "🎯 Target Population",
      color: "#0066cc",
      badge: "No Experience Needed",
    },
    {
      icon: <FaBuilding />,
      title: "Employers & Corporate Partners",
      subtitle: "Hiring Certified Pilots",
      description:
        "Companies seeking skilled drone pilots for Precision Agriculture, Infrastructure Inspection, and Construction projects across the Mid-South. Our graduates are ready to work.",
      audience: "🤝 Hiring Now",
      color: "#10b981",
      badge: "50+ Partners",
    },
    {
      icon: <FaHandshake />,
      title: "Community Organizations",
      subtitle: "Strategic Partners",
      description:
        "Non-profits, workforce boards, and community groups helping us identify and recruit Opportunity Youth. Together, we're building a stronger workforce pipeline.",
      audience: "🌱 Join Us",
      color: "#f59e0b",
      badge: "Partnership Opportunities",
    },
    {
      icon: <FaUserGraduate />,
      title: "Career Changers",
      subtitle: "Adults Seeking New Paths",
      description:
        "Fast-track certification programs for professionals transitioning into the drone industry. Leverage your existing skills and add drone expertise.",
      audience: "📈 Career Advancement",
      color: "#8b5cf6",
      badge: "Flexible Schedule",
    },
    {
      icon: <FaChartLine />,
      title: "Government & Public Sector",
      subtitle: "Workforce Development",
      description:
        "State agencies and public institutions focused on economic development and youth employment. We deliver measurable outcomes and placement results.",
      audience: "🏛️ Public Partners",
      color: "#06b6d4",
      badge: "Data-Driven Results",
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
            Building a Workforce Pipeline
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            We bring together motivated youth, employers, and community partners
            to create lasting economic mobility in the Mid-South.
          </p>
        </motion.div>

        <div className="row g-4">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              className="col-lg-4 col-md-6"
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
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: `linear-gradient(135deg, ${audience.color}, var(--accent))`,
                    padding: "4px 12px",
                    borderRadius: "50px",
                    fontSize: "10px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  {audience.badge}
                </div>

                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    marginBottom: "20px",
                    background: `linear-gradient(135deg, ${audience.color}, var(--accent))`,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
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
                    marginBottom: "12px",
                  }}
                >
                  {audience.subtitle}
                </p>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    marginBottom: "15px",
                  }}
                >
                  {audience.description}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(var(--accent-rgb), 0.1)",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "var(--accent)",
                  }}
                >
                  {audience.audience}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Regional Focus Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            marginTop: "40px",
            textAlign: "center",
            padding: "20px",
            background: "rgba(var(--accent-rgb), 0.05)",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "var(--text-secondary)",
            }}
          >
            <span style={{ fontWeight: "bold", color: "var(--accent)" }}>
              📍 Regional Focus:
            </span>{" "}
            Serving Arkansas • Mississippi • Tennessee — the heart of the
            Mid-South
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeServe;
