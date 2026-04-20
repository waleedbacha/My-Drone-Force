import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const TeamSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const team = [
    {
      name: "Dr. James Wilson",
      role: "Chief Flight Instructor",
      bio: "FAA Master Pilot with 15+ years of experience",
      image: "👨‍✈️",
      color: "#0066cc",
    },
    {
      name: "Sarah Chen",
      role: "Lead Drone Engineer",
      bio: "Expert in drone technology and automation",
      image: "👩‍🔧",
      color: "#3b82f6",
    },
    {
      name: "Michael Rodriguez",
      role: "Career Development Director",
      bio: "Helped 500+ students launch drone careers",
      image: "👨‍💼",
      color: "#00a3ff",
    },
    {
      name: "Emily Thompson",
      role: "Part 107 Specialist",
      bio: "Certified FAA ground instructor",
      image: "👩‍🏫",
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
            OUR TEAM
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Meet Our Experts
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Industry professionals dedicated to your success
          </p>
        </motion.div>

        <div className="row g-4">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.02}
                glareEnable={true}
              >
                <div
                  className="glass text-center p-4"
                  style={{
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      margin: "0 auto 20px",
                      background: `linear-gradient(135deg, ${member.color}, var(--accent))`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "60px",
                    }}
                  >
                    {member.image}
                  </div>
                  <h4 style={{ fontWeight: "700", marginBottom: "5px" }}>
                    {member.name}
                  </h4>
                  <p
                    style={{
                      color: "var(--accent)",
                      fontWeight: "500",
                      marginBottom: "10px",
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      marginBottom: "15px",
                    }}
                  >
                    {member.bio}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <a href="#" style={{ color: "var(--text-secondary)" }}>
                      <FaLinkedin size={18} />
                    </a>
                    <a href="#" style={{ color: "var(--text-secondary)" }}>
                      <FaTwitter size={18} />
                    </a>
                    <a href="#" style={{ color: "var(--text-secondary)" }}>
                      <FaEnvelope size={18} />
                    </a>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
