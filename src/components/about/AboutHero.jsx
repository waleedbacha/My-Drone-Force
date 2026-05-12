import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
// Import your image
import aboutImage from "../../assests/images/about-drone.png"; // Add your image here

const AboutHero = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about-details");
  };

  return (
    <section
      className="about-hero"
      style={{ padding: "80px 0", background: "var(--bg-primary)" }}
    >
      <div className="container-custom" ref={ref}>
        <div className="row align-items-center g-5">
          {/* Left Column - Text Content */}
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span
                style={{
                  background: "var(--gradient)",
                  padding: "6px 16px",
                  borderRadius: "50px",
                  display: "inline-block",
                  marginBottom: "20px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                ABOUT US
              </span>

              <h2
                style={{
                  fontSize: "42px",
                  fontWeight: "700",
                  marginBottom: "20px",
                  lineHeight: "1.2",
                  color: "var(--text-primary)",
                }}
              >
                Empowering the Next Generation of{" "}
                <span className="gradient-text">Drone Professionals</span>
              </h2>

              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  marginBottom: "20px",
                }}
              >
                My Drone Force is a leading provider of drone training,
                certification, and workforce services. We're dedicated to
                bridging the skills gap in the drone industry. We provide
                comprehensive Part 107 certification training and career
                readiness programs.
              </p>

              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  marginBottom: "30px",
                }}
              >
                Our mission is to prepare youth and young adults for high-paying
                careers in one of the fastest-growing industries worldwide.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <FaCheckCircle style={{ color: "var(--accent)" }} />
                    <span>FAA Certified Instructors</span>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <FaCheckCircle style={{ color: "var(--accent)" }} />
                    <span>Hands-On Flight Training</span>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <FaCheckCircle style={{ color: "var(--accent)" }} />
                    <span>Job Placement Assistance</span>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {/* <FaCheckCircle style={{ color: "var(--accent)" }} />
                    <span>Lifetime Support</span> */}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleLearnMore}
                className="btn-primary-custom"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "16px",
                  padding: "14px 32px",
                }}
              >
                Learn More About Us
                <FaArrowRight style={{ fontSize: "14px" }} />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Professional Image */}
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="image-container"
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <img
                  src={aboutImage}
                  alt="Drone training and technology"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />

                {/* Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "30px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
                    🚁 Professional Drone Training | FAA Certified
                  </p>
                </div>
              </div>

              {/* Optional: Small trust badge below image */}
              {/* <div
                className="glass text-center p-3 mt-4"
                style={{
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <span>🏆 Best Drone Training 2024</span>
                <span>⭐ 4.9/5 Student Rating</span>
                <span>🇺🇸 Nationally Recognized</span>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
