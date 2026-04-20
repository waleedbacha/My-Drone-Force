import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaRocket, FaAward, FaUsers, FaGlobe } from "react-icons/fa";

const TimelineSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description:
        "My Drone Force launched with a mission to democratize drone education",
      icon: <FaRocket />,
    },
    {
      year: "2021",
      title: "First 1000 Students",
      description: "Reached milestone of training 1000+ aspiring drone pilots",
      icon: <FaUsers />,
    },
    {
      year: "2022",
      title: "Nationwide Expansion",
      description: "Expanded programs to 15 states across America",
      icon: <FaGlobe />,
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description:
        "Awarded 'Best Drone Training Program' by Drone Industry Insights",
      icon: <FaAward />,
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
            OUR JOURNEY
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Company Timeline
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Milestones that shaped our success
          </p>
        </motion.div>

        <div className="row position-relative">
          {/* Timeline Line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "2px",
              height: "100%",
              background: "var(--gradient)",
              opacity: 0.3,
            }}
          />

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className={`col-md-6 ${index % 2 === 0 ? "text-end pe-5" : "ms-auto ps-5"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{ marginBottom: "60px", position: "relative" }}
            >
              <div
                className="glass p-4"
                style={{
                  borderRadius: "20px",
                  maxWidth: "400px",
                  marginLeft: index % 2 === 0 ? "auto" : 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    [index % 2 === 0 ? "right" : "left"]: "-15px",
                    width: "30px",
                    height: "30px",
                    background: "var(--gradient)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {milestone.icon}
                </div>
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "var(--accent)",
                  }}
                >
                  {milestone.year}
                </h3>
                <h4 style={{ marginBottom: "10px" }}>{milestone.title}</h4>
                <p style={{ color: "var(--text-secondary)" }}>
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
