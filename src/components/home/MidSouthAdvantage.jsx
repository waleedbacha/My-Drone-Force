import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaChartLine, FaDollarSign } from "react-icons/fa";

const MidSouthAdvantage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    {
      icon: <FaUsers />,
      value: "40,000+",
      label: "Young Adults Disconnected from Labor Force",
      description: "In Arkansas alone, thousands are ready for opportunity",
      color: "#ef4444",
    },
    {
      icon: <FaChartLine />,
      value: "13.1%",
      label: "Youth Disconnection Rate",
      description: "Across Arkansas, Mississippi, and Tennessee",
      color: "#f59e0b",
    },
    {
      icon: <FaDollarSign />,
      value: "$60k+",
      label: "Average Starting Salary",
      description: "After completing our program",
      color: "#10b981",
    },
  ];

  const states = [
    { name: "Arkansas", count: "Headquarters", color: "#3b82f6" },
    { name: "Mississippi", count: "Expanding", color: "#10b981" },
    { name: "Tennessee", count: "Growing", color: "#f59e0b" },
  ];

  return (
    <section
      style={{
        padding: "80px 0",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          background:
            "radial-gradient(circle, rgba(var(--accent-rgb), 0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
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
            OUR REGION
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            The Mid-South Advantage
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            We're building the drone workforce of tomorrow, right here in the
            heart of America
          </p>
        </motion.div>

        <div className="row align-items-center g-5">
          {/* Left Column - Map/States Visualization */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="glass"
              style={{
                borderRadius: "24px",
                padding: "30px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative map outline */}
              <div
                style={{
                  fontSize: "120px",
                  lineHeight: 1,
                  opacity: 0.1,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              >
                🗺️
              </div>

              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "25px",
                  color: "var(--text-primary)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Serving the Mid-South
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "30px",
                  flexWrap: "wrap",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {states.map((state, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    style={{
                      textAlign: "center",
                      minWidth: "100px",
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto 12px",
                        background: `linear-gradient(135deg, ${state.color}, var(--accent))`,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "32px",
                        color: "white",
                      }}
                    >
                      📍
                    </div>
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        marginBottom: "5px",
                        color: "var(--text-primary)",
                      }}
                    >
                      {state.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--accent)",
                        fontWeight: "500",
                      }}
                    >
                      {state.count}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "25px",
                  padding: "15px",
                  background: "rgba(var(--accent-rgb), 0.1)",
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <strong style={{ color: "var(--accent)" }}>
                    📍 Strategic Focus:
                  </strong>{" "}
                  We're targeting the highest-need communities across the
                  Mid-South region
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "20px",
                color: "var(--text-primary)",
              }}
            >
              The Opportunity Gap
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "30px",
                lineHeight: "1.7",
              }}
            >
              Across Arkansas, Mississippi, and Tennessee, thousands of young
              adults are disconnected from the labor force — not working, not in
              school. We're changing that by providing a clear path to
              high-paying careers in the drone industry.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px",
                    background: "var(--card-bg)",
                    borderRadius: "16px",
                    border: "1px solid var(--border-color)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.borderColor = `var(--accent)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.borderColor = "var(--border-color)";
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      background: `linear-gradient(135deg, ${stat.color}, var(--accent))`,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      color: "white",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: stat.color,
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "var(--text-primary)",
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                        marginTop: "4px",
                      }}
                    >
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            marginTop: "50px",
            textAlign: "center",
            padding: "25px",
            background: "rgba(var(--accent-rgb), 0.05)",
            borderRadius: "20px",
            border: "1px solid var(--border-color)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "500",
              color: "var(--text-primary)",
            }}
          >
            🌱 "We're not just training pilots — we're building economic
            opportunity in the communities that need it most."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MidSouthAdvantage;
