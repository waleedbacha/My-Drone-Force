import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaLinkedin, FaTwitter, FaEnvelope, FaQuoteLeft } from "react-icons/fa";

// Import owner images
import henryImage from "../../assests/images/who-we-are/HenryAGolatt.jpeg";
import terenceImage from "../../assests/images/who-we-are/Terence Bolden.jpeg";
import vinceImage from "../../assests/images/who-we-are/Vince Bailey.jpeg";

const WhoWeAre = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const owners = [
    {
      name: "Terence Bolden",
      title: "Co-Founder and Managing Partner",
      bio: "Terence L. Bolden is an international organizational development and sustainability strategist with experience leading renewable energy and workforce initiatives across Africa, Asia, and the United States. At MyDroneForce, he applies his global project leadership and systems‑level expertise to drive strategic vision, operational excellence, and the integration of drone technology into community‑centered economic development.",
      image: terenceImage,
      social: {
        linkedin: " https://www.linkedin.com/in/terencelbolden-a385221a",
        twitter: "#",
        email: "#",
      },
      color: "#3b82f6",
      quote: "Excellence in every flight",
    },
    {
      name: "Henry A. Golatt",
      title: "Co‑Founder, Lead Strategist, and Partnership Architect",
      bio: "Henry Golatt is nationally recognized for his work in inclusive economic development, driving equity‑centered workforce strategy, institutional transformation, and community economic mobility across multiple states. At MyDroneForce, he applies decades of ecosystem design and cross‑sector partnership expertise to shape a scalable workforce vision that positions drone technology as a gateway to generational opportunity for underserved communities.",
      image: henryImage,
      social: {
        linkedin: "https://www.linkedin.com/in/hgconsultingservices/",
        twitter: "#",
        email: "#",
      },
      color: "#0066cc",
      quote: "Empowering youth through technology",
    },

    {
      name: "Vince Bailey",
      title:
        "Co‑Founder, Resident Drone Pilot, Official Voice and Media/Marketing Manager",
      bio: "Vince “The Voice” Bailey is a nationally recognized broadcast professional and workforce development leader whose 40‑year career spans radio, television, video production, and high‑impact public engagement. At MyDroneForce, he leverages his instructional expertise and communication mastery to lead learner engagement and community outreach, ensuring every participant gains the confidence and professionalism needed to excel in the drone industry.",
      image: vinceImage,
      social: {
        linkedin: " https://www.linkedin.com/in/vincebailey",
        twitter: "#",
        email: "#",
      },
      color: "#00a3ff",
      quote: "Innovation drives us forward",
    },
  ];

  return (
    <section style={{ padding: "80px 0", background: "var(--bg-primary)" }}>
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
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
            WHO WE ARE
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            The Leaders Behind My Drone Force
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Dedicated professionals committed to your success in the drone
            industry
          </p>
        </motion.div>

        {/* Owners Grid */}
        <div className="row g-5">
          {owners.map((owner, index) => (
            <motion.div
              key={index}
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div
                className="glass"
                style={{
                  borderRadius: "24px",
                  transition: "all 0.4s ease",
                  height: "100%",
                  overflow: "hidden",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-10px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {/* Image Container */}
                <div
                  style={{
                    position: "relative",
                    height: "320px",
                    overflow: "hidden",
                    background: `linear-gradient(135deg, ${owner.color}, var(--accent-dark))`,
                  }}
                >
                  <img
                    src={owner.image}
                    alt={owner.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      opacity: 0.95,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.08)")
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
                      padding: "30px 20px 20px",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        right: "20px",
                      }}
                    >
                      <h3
                        style={{
                          color: "white",
                          fontSize: "24px",
                          fontWeight: "700",
                          marginBottom: "5px",
                        }}
                      >
                        {owner.name}
                      </h3>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "0",
                        }}
                      >
                        {owner.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "25px" }}>
                  {/* Quote Icon */}
                  <FaQuoteLeft
                    style={{
                      color: "var(--accent)",
                      fontSize: "24px",
                      opacity: 0.3,
                      marginBottom: "15px",
                    }}
                  />

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "15px",
                      lineHeight: "1.7",
                      marginBottom: "20px",
                    }}
                  >
                    {owner.bio}
                  </p>

                  <p
                    style={{
                      color: "var(--accent)",
                      fontSize: "14px",
                      fontStyle: "italic",
                      fontWeight: "500",
                      marginBottom: "20px",
                    }}
                  >
                    "{owner.quote}"
                  </p>

                  {/* Social Links */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "15px",
                      paddingTop: "10px",
                      borderTop: "1px solid var(--border-color)",
                    }}
                  >
                    <a
                      href={owner.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "38px",
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--card-bg)",
                        borderRadius: "50%",
                        color: "var(--text-secondary)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#0077b5";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--card-bg)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <FaLinkedin size={18} />
                    </a>
                    <a
                      href={owner.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "38px",
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--card-bg)",
                        borderRadius: "50%",
                        color: "var(--text-secondary)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#1da1f2";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--card-bg)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <FaTwitter size={18} />
                    </a>
                    <a
                      href={owner.social.email}
                      style={{
                        width: "38px",
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--card-bg)",
                        borderRadius: "50%",
                        color: "var(--text-secondary)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ea4335";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--card-bg)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <FaEnvelope size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement Section */}
        <div
          className="glass text-center p-5"
          style={{
            borderRadius: "24px",
            maxWidth: "900px",
            margin: "60px auto 0 auto",
            background:
              "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
            color: "white",
          }}
        >
          <p
            style={{
              fontSize: "22px",
              fontStyle: "italic",
              lineHeight: "1.5",
              marginBottom: "20px",
            }}
          >
            "Our mission is to identify, train, and place Opportunity Youth from
            Arkansas, Mississippi, and Tennessee into high-paying careers in the
            drone industry. We're building a workforce pipeline that transforms
            lives and strengthens our regional economy."
          </p>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "white",
              margin: "0 auto",
              borderRadius: "3px",
              opacity: 0.5,
            }}
          />
          <p style={{ marginTop: "15px", fontSize: "14px", opacity: 0.8 }}>
            — My Drone Force Team
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
