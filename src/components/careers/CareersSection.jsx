import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaBuilding, FaCamera, FaLeaf } from "react-icons/fa";

const CareersSection = () => {
  const navigate = useNavigate();

  const careerPaths = [
    {
      icon: <FaLeaf />,
      title: "Agricultural Technology",
      description:
        "Precision agriculture, crop monitoring, yield optimization, and livestock management.",
      salary: "$45,000-$75,000",
      color: "#4caf50",
    },
    {
      icon: <FaBuilding />,
      title: "Construction & Infrastructure",
      description:
        "Site surveying, progress monitoring, safety inspections, and project documentation.",
      salary: "$50,000-$80,000",
      color: "#ff9800",
    },
    {
      icon: <FaCamera />,
      title: "Real Estate Photography",
      description:
        "Aerial photography and videography for property listings, virtual tours, and marketing materials.",
      salary: "$200-$500/shoot",
      color: "#2196f3",
    },
    // {
    //   icon: <FaCamera />,
    //   title: "Commercial Photography",
    //   description:
    //     "Event coverage, cinematic productions, marketing content, and specialized aerial photography services.",
    //   salary: "Varies by project",
    //   color: "#9c27b0",
    // },
    // {
    //   icon: <FaShieldAlt />,
    //   title: "Security & Surveillance",
    //   description:
    //     "Perimeter monitoring, crowd management, asset protection, and emergency response support.",
    //   salary: "$45,000-$70,000",
    //   color: "#f44336",
    // },
    // {
    //   icon: <FaMapMarkedAlt />,
    //   title: "Mapping & Surveying",
    //   description:
    //     "Topographic mapping, land surveying, GIS data collection, and environmental monitoring.",
    //   salary: "$55,000-$85,000",
    //   color: "#009688",
    // },
  ];

  const handleLearnMore = () => {
    navigate("/careers");
  };

  return (
    <section
      id="careers"
      style={{ padding: "80px 0", background: "var(--bg-secondary)" }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
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
            HIGH-DEMAND CAREERS
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Launch Your Drone Career
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Join one of the fastest-growing industries with high-paying career
            opportunities
          </p>
        </motion.div>

        {/* Career Cards Grid */}
        <div className="row g-4">
          {careerPaths.map((career, index) => (
            <motion.div
              key={index}
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="career-card"
                style={{
                  background: "var(--card-bg)",
                  borderRadius: "20px",
                  padding: "30px",
                  transition: "all 0.3s ease",
                  height: "100%",
                  border: "1px solid var(--border-color)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${career.color}, var(--accent))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    color: "white",
                    marginBottom: "20px",
                  }}
                >
                  {career.icon}
                </div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    marginBottom: "12px",
                    color: "var(--text-primary)",
                  }}
                >
                  {career.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    marginBottom: "15px",
                  }}
                >
                  {career.description}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(var(--accent-rgb), 0.1)",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "var(--accent)",
                  }}
                >
                  💰 {career.salary}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-5"
        >
          <button onClick={handleLearnMore} className="btn-primary-custom">
            Learn More About Careers
            <FaArrowRight style={{ marginLeft: "8px" }} />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .career-card:hover {
          border-color: var(--accent);
        }
      `}</style>
    </section>
  );
};

export default CareersSection;
