import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaBriefcase,
  FaUserGraduate,
  FaArrowRight,
  FaStar,
  FaMedal,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const PricingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // UPDATED: New card content
  const features = [
    {
      icon: <FaBookOpen size={32} />,
      title: "Comprehensive Exam Readiness",
      description:
        "Master the FAA Part 107 curriculum with practice exams and dedicated study materials designed to help you pass with confidence.",
      included: true,
    },
    {
      icon: <FaBriefcase size={32} />,
      title: "Career Development Toolkit",
      description:
        "Gain exclusive access to the MyDroneForce regional employer network, connecting you directly to high-demand industry sectors like Agriculture, Infrastructure, and Public Safety.",
      included: true,
    },
    {
      icon: <FaUserGraduate size={32} />,
      title: "Targeted Regional Support",
      description:
        "Benefit from specialized mentorship and resources tailored for young professionals (ages 16-24) across Arkansas, Mississippi, and Tennessee.",
      included: true,
    },
  ];

  const faqs = [
    {
      question: "Is the FAA exam fee really included?",
      answer:
        "Yes! Your $1,500 investment includes the FAA Part 107 exam fee. No hidden costs.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes! Contact us to discuss flexible payment options that work for your budget.",
    },
    {
      question: "What is the job placement rate?",
      answer:
        "94% of our graduates are employed within 90 days of completing the program.",
    },
    {
      question: "Do I need any prior experience?",
      answer:
        "No experience needed! Our program is designed for beginners. We'll teach you everything.",
    },
    {
      question: "How long is the program?",
      answer:
        "The core training is 3 months, followed by a 30-day exam preparation window.",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Students Trained",
      icon: <FaUserGraduate size={24} />,
    },
    { value: "94%", label: "FAA Pass Rate", icon: <FaMedal size={24} /> },
    {
      value: "$60K+",
      label: "Average Starting Salary",
      icon: <FaMoneyBillWave size={24} />,
    },
    {
      value: "85%",
      label: "Targeted Job Placement Rate",
      icon: <FaBriefcase size={24} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        paddingTop: "120px",
        paddingBottom: "80px",
      }}
    >
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(99, 102, 241, 0.1)",
              padding: "6px 16px",
              borderRadius: "50px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--accent)",
              }}
            >
              Simple, Transparent Pricing
            </span>
          </div>
          <h1
            className="gradient-text"
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Only{" "}
            <span style={{ fontSize: "clamp(44px, 7vw, 68px)" }}>$1,500</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(18px, 3vw, 22px)",
              color: "var(--text-secondary)",
              maxWidth: "800px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            "Don't just learn to fly, get a job! My Drone Force provides each
            participant with career path and job placement assistance!"
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            marginBottom: "60px",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass"
              style={{
                padding: "24px",
                borderRadius: "20px",
                textAlign: "center",
                border: "1px solid var(--border-color)",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  color: "var(--accent)",
                  marginBottom: "12px",
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* What's Included Grid - UPDATED CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: "60px" }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "16px",
              color: "var(--text-primary)",
            }}
          >
            What's Included in Your Drone Training Flight Path
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              fontSize: "14px",
              marginBottom: "40px",
              maxWidth: "700px",
              margin: "0 auto 40px",
            }}
          >
            We believe in access. That's why our training is designed to be
            affordable and flexible, removing barriers to entry in the
            high-growth UAS industry.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass"
                style={{
                  padding: "28px",
                  borderRadius: "20px",
                  border: "1px solid var(--border-color)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(99, 102, 241, 0.1)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "var(--accent)",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    color: "var(--text-primary)",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: "rgba(16, 185, 129, 0.08)",
            borderRadius: "20px",
            padding: "clamp(30px, 5vw, 40px)",
            marginBottom: "40px",
            textAlign: "center",
            border: "1px solid rgba(16, 185, 129, 0.2)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(16px, 3vw, 18px)",
              color: "var(--text-primary)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Most of our students complete their exam preparation in as little as{" "}
            <strong style={{ color: "#10b981" }}>two weeks</strong>, gaining the
            professional credentials needed to enter a market where skilled
            drone pilots are in high demand.
          </p>
        </motion.div>

        {/* Why Choose Us Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.05))",
            borderRadius: "28px",
            padding: "40px",
            marginBottom: "40px",
            textAlign: "center",
            border: "1px solid var(--border-color)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "rgba(99, 102, 241, 0.15)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <FaStar size={40} color="var(--accent)" />
          </div>
          <h3
            style={{
              fontSize: "clamp(22px, 4vw, 28px)",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "var(--text-primary)",
            }}
          >
            Why choose My Drone Force?
          </h3>
          <p
            style={{
              fontSize: "clamp(15px, 2.5vw, 17px)",
              color: "var(--text-secondary)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Online courses teach you to{" "}
            <strong style={{ color: "var(--accent)" }}>PASS a test</strong>. We
            teach you to{" "}
            <strong style={{ color: "var(--accent)" }}>BUILD a career</strong>.
            You get LIVE instructors, REAL drones, a COMMUNITY that supports
            you, and JOB PLACEMENT assistance that follows you into the
            industry.
          </p>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            background: "var(--card-bg)",
            borderRadius: "28px",
            border: "1px solid var(--border-color)",
            padding: "clamp(30px, 5vw, 50px)",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "clamp(24px, 4vw, 40px)",
              color: "var(--text-primary)",
            }}
          >
            Frequently Asked Questions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "clamp(16px, 3vw, 24px)",
            }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div
                  onClick={() => toggleFaq(index)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "clamp(16px, 3vw, 20px)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background:
                      openFaq === index
                        ? "rgba(99, 102, 241, 0.05)"
                        : "transparent",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "clamp(15px, 3.5vw, 16px)",
                      fontWeight: "600",
                      margin: 0,
                      color: "var(--accent)",
                      flex: 1,
                      paddingRight: "12px",
                    }}
                  >
                    {faq.question}
                  </h4>
                  <div
                    style={{
                      color: "var(--accent)",
                      transition: "transform 0.3s ease",
                      transform:
                        openFaq === index ? "rotate(180deg)" : "rotate(0deg)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {openFaq === index ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </div>
                </div>

                <div
                  style={{
                    padding: openFaq === index ? "0 20px 20px 20px" : "0 20px",
                    maxHeight: openFaq === index ? "500px" : "0",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  className="faq-answer-desktop"
                >
                  <p
                    style={{
                      fontSize: "clamp(13px, 3vw, 14px)",
                      color: "var(--text-secondary)",
                      lineHeight: "1.6",
                      margin: 0,
                      paddingTop: "4px",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <style>{`
            @media (min-width: 768px) {
              .faq-answer-desktop {
                max-height: 500px !important;
                padding: 0 20px 20px 20px !important;
              }
            }
          `}</style>
        </motion.div>

        {/* Terms & Disclosures */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            background: "rgba(107, 114, 128, 0.05)",
            borderRadius: "16px",
            padding: "clamp(20px, 4vw, 30px)",
            marginBottom: "30px",
            border: "1px solid var(--border-color)",
          }}
        >
          <h4
            style={{
              fontSize: "clamp(14px, 3vw, 16px)",
              fontWeight: "600",
              marginBottom: "12px",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "18px" }}>📋</span> Terms & Disclosures
          </h4>
          <p
            style={{
              fontSize: "clamp(11px, 2.5vw, 12px)",
              color: "var(--text-secondary)",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            MyDroneForce is a STEM training and workforce development
            intermediary. While we provide robust career support and networking
            opportunities, we do not guarantee specific salary amounts or
            immediate employment. Outcomes vary based on industry demand,
            geographic location, and the individual pilot's skill level and
            experience.
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            textAlign: "center",
            background: "linear-gradient(135deg, var(--gradient))",
            borderRadius: "28px",
            padding: "clamp(40px, 6vw, 60px) clamp(20px, 5vw, 40px)",
            color: "white",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Ready to Launch Your Drone Career?
          </h3>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 16px)",
              marginBottom: "30px",
              opacity: 0.9,
              maxWidth: "600px",
              margin: "0 auto 30px",
            }}
          >
            Join hundreds of students who have launched successful drone careers
            with My Drone Force.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="btn-primary-custom"
            style={{
              padding: "clamp(12px, 3vw, 16px) clamp(24px, 5vw, 40px)",
              fontSize: "clamp(14px, 3vw, 18px)",
              fontWeight: "600",
              background: "white",
              color: "var(--accent)",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Enroll Now — Limited Spots Available <FaArrowRight />
          </button>
          <p
            style={{
              fontSize: "clamp(10px, 2.5vw, 12px)",
              marginTop: "24px",
              opacity: 0.8,
            }}
          >
            ⚡ Only $1,500 • No hidden fees • Job placement included
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
