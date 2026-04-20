import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaBuilding,
  FaCamera,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaLeaf,
  FaDollarSign,
  FaClock,
  FaUserGraduate,
  FaBriefcase,
} from "react-icons/fa";

const CareersPage = () => {
  const careerOpportunities = [
    {
      icon: <FaLeaf />,
      title: "Agricultural Technology",
      description:
        "Precision agriculture, crop monitoring, yield optimization, and livestock management.",
      salary: "$45,000 - $75,000",
      skills: ["Drone Operation", "Data Analysis", "Agriculture Knowledge"],
      demand: "High",
      color: "#4caf50",
    },
    {
      icon: <FaBuilding />,
      title: "Construction & Infrastructure",
      description:
        "Site surveying, progress monitoring, safety inspections, and project documentation.",
      salary: "$50,000 - $80,000",
      skills: ["Site Surveying", "Safety Protocols", "Project Management"],
      demand: "Very High",
      color: "#ff9800",
    },
    {
      icon: <FaCamera />,
      title: "Real Estate Photography",
      description:
        "Aerial photography and videography for property listings, virtual tours, and marketing materials.",
      salary: "$200 - $500 per shoot",
      skills: ["Photography", "Video Editing", "Marketing"],
      demand: "High",
      color: "#2196f3",
    },
    {
      icon: <FaCamera />,
      title: "Commercial Photography",
      description:
        "Event coverage, cinematic productions, marketing content, and specialized aerial photography services.",
      salary: "Varies by project",
      skills: ["Cinematography", "Content Creation", "Client Management"],
      demand: "Growing",
      color: "#9c27b0",
    },
    {
      icon: <FaShieldAlt />,
      title: "Security & Surveillance",
      description:
        "Perimeter monitoring, crowd management, asset protection, and emergency response support.",
      salary: "$45,000 - $70,000",
      skills: ["Surveillance", "Emergency Response", "Risk Assessment"],
      demand: "High",
      color: "#f44336",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Mapping & Surveying",
      description:
        "Topographic mapping, land surveying, GIS data collection, and environmental monitoring.",
      salary: "$55,000 - $85,000",
      skills: ["GIS", "Data Collection", "Environmental Science"],
      demand: "Very High",
      color: "#009688",
    },
  ];

  const benefits = [
    {
      icon: <FaDollarSign />,
      title: "Competitive Salary",
      description: "Earn $45,000 - $85,000+ annually",
    },
    {
      icon: <FaClock />,
      title: "Flexible Schedule",
      description: "Work freelance or full-time positions",
    },
    {
      icon: <FaUserGraduate />,
      title: "Fast Training",
      description: "Get certified in as little as 6 weeks",
    },
    {
      icon: <FaBriefcase />,
      title: "Job Placement",
      description: "50+ corporate partners hiring graduates",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          padding: "120px 0 60px",
          background: "var(--gradient)",
          color: "white",
        }}
      >
        <div className="container-custom">
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "30px",
            }}
          >
            <FaArrowLeft /> Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="display-3 fw-bold mb-3"
          >
            High-Demand Career Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lead"
            style={{ maxWidth: "700px", opacity: 0.9 }}
          >
            Launch your career in one of the fastest-growing industries. Get
            certified and start earning with My Drone Force.
          </motion.p>
        </div>
      </section>

      {/* Career Opportunities Grid */}
      <section style={{ padding: "80px 0", background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3 gradient-text">
              Career Paths
            </h2>
            <p
              className="lead"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Choose from multiple high-paying career paths in the drone
              industry
            </p>
          </div>

          <div className="row g-4">
            {careerOpportunities.map((career, index) => (
              <motion.div
                key={index}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  style={{
                    background: "var(--card-bg)",
                    borderRadius: "20px",
                    padding: "30px",
                    height: "100%",
                    border: "1px solid var(--border-color)",
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
                      marginBottom: "10px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {career.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "15px",
                      lineHeight: "1.6",
                    }}
                  >
                    {career.description}
                  </p>
                  <div style={{ marginBottom: "15px" }}>
                    <span style={{ fontWeight: "600", color: "var(--accent)" }}>
                      💰 Salary Range:
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {" "}
                      {career.salary}
                    </span>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <span style={{ fontWeight: "600", color: "var(--accent)" }}>
                      📈 Demand:
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {" "}
                      {career.demand}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600", color: "var(--accent)" }}>
                      🔧 Key Skills:
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginTop: "8px",
                      }}
                    >
                      {career.skills.map((skill, i) => (
                        <span
                          key={i}
                          style={{
                            background: "rgba(var(--accent-rgb), 0.1)",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            color: "var(--accent)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: "80px 0", background: "var(--bg-secondary)" }}>
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3 gradient-text">
              Why Choose a Drone Career?
            </h2>
            <p
              className="lead"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Join an industry with unlimited growth potential
            </p>
          </div>

          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="col-lg-3 col-md-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="text-center p-4 glass"
                  style={{ borderRadius: "20px", height: "100%" }}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      color: "var(--accent)",
                      marginBottom: "15px",
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <h4
                    style={{
                      marginBottom: "10px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {benefit.title}
                  </h4>
                  <p
                    style={{ color: "var(--text-secondary)", fontSize: "14px" }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "80px 0",
          background: "var(--gradient)",
          color: "white",
        }}
      >
        <div className="container-custom text-center">
          <h2 className="display-4 fw-bold mb-3">
            Ready to Start Your Career?
          </h2>
          <p
            className="lead mb-4"
            style={{ maxWidth: "600px", margin: "0 auto", opacity: 0.9 }}
          >
            Get certified and launch your drone career with My Drone Force
          </p>
          <Link to="/#contact">
            <button
              className="btn-primary-custom"
              style={{ background: "white", color: "var(--accent)" }}
            >
              Enroll Now
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
