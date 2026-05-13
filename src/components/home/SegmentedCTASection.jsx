import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaUserGraduate,
  FaBuilding,
  FaHandshake,
  FaArrowRight,
} from "react-icons/fa";

const SegmentedCTASection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const ctas = [
    {
      icon: <FaUserGraduate />,
      title: "For Youth",
      headline: "Start Your Debt-Free Career",
      description:
        "No experience? No problem. We'll train you from the ground up and connect you with employers paying $45k-$85k+.",
      buttonText: "Enroll Now",
      buttonLink: "/register",
      bgGradient: "linear-gradient(135deg, #1e40af, #3b82f6)",
      hoverGradient: "linear-gradient(135deg, #1e3a8a, #2563eb)",
      stat: "85% Targeted Pass Rate",
      statColor: "#60a5fa",
    },
    {
      icon: <FaBuilding />,
      title: "For Employers",
      headline: "Hire Our Certified Graduates",
      description:
        "Access a pipeline of FAA-certified drone pilots ready for Agriculture, Construction, Infrastructure, and Public Safety roles.",
      buttonText: "Request Talent",
      buttonLink: "mailto:careers@mydroneforce.com?subject=Hiring%20Inquiry",
      bgGradient: "linear-gradient(135deg, #065f46, #10b981)",
      hoverGradient: "linear-gradient(135deg, #064e3b, #059669)",
      stat: "50+ Corporate Partners",
      statColor: "#34d399",
    },
    {
      icon: <FaHandshake />,
      title: "For Partners",
      headline: "Help Us Reach More Youth",
      description:
        "Join us as a community partner, funder, or strategic ally to expand opportunity across Arkansas, Mississippi, and Tennessee.",
      buttonText: "Partner With Us",
      buttonLink:
        "mailto:partners@mydroneforce.com?subject=Partnership%20Inquiry",
      bgGradient: "linear-gradient(135deg, #78350f, #f59e0b)",
      hoverGradient: "linear-gradient(135deg, #451a03, #d97706)",
      stat: "Community-Focused",
      statColor: "#fbbf24",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 0",
        background: "var(--bg-primary)",
      }}
    >
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
            GET STARTED TODAY
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Ready to Take the Next Step?
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Whether you're looking to launch your career, hire talent, or
            partner with us — we're here to help.
          </p>
        </motion.div>

        <div className="row g-4">
          {ctas.map((cta, index) => (
            <motion.div
              key={index}
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div
                style={{
                  background: "var(--card-bg)",
                  borderRadius: "24px",
                  padding: "30px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  border: "1px solid var(--border-color)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Top Gradient Bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: cta.bgGradient,
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    marginBottom: "20px",
                    background: cta.bgGradient,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    color: "white",
                  }}
                >
                  {cta.icon}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: cta.statColor,
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {cta.title}
                </div>

                {/* Headline */}
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: "var(--text-primary)",
                    lineHeight: "1.3",
                  }}
                >
                  {cta.headline}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                  }}
                >
                  {cta.description}
                </p>

                {/* Stat Badge */}
                <div
                  style={{
                    display: "inline-block",
                    background: `rgba(${cta.statColor === "#60a5fa" ? "96,165,250" : cta.statColor === "#34d399" ? "16,185,129" : "245,158,11"}, 0.1)`,
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: cta.statColor,
                    marginBottom: "20px",
                  }}
                >
                  📊 {cta.stat}
                </div>

                {/* Button */}
                <a
                  href={cta.buttonLink}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: cta.bgGradient,
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = cta.hoverGradient;
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = cta.bgGradient;
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {cta.buttonText}
                  <FaArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: "40px",
            textAlign: "center",
            padding: "15px",
            background: "rgba(var(--accent-rgb), 0.05)",
            borderRadius: "12px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "var(--text-secondary)",
            }}
          >
            📍 Serving Arkansas, Mississippi, and Tennessee — building economic
            opportunity across the Mid-South
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SegmentedCTASection;
