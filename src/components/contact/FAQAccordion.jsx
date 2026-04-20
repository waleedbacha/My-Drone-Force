import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How long does it take to get certified?",
      answer:
        "Our Part 107 certification program typically takes 4-6 weeks to complete. This includes self-paced online learning, practice exams, and hands-on flight training. Many students complete it sooner depending on their schedule and dedication.",
    },
    {
      question: "Do I need any prior experience?",
      answer:
        "No prior experience is required! Our program is designed for beginners and experienced pilots alike. We start with the basics and gradually build up to advanced concepts.",
    },
    {
      question: "What is the job placement rate?",
      answer:
        "We have a 95% job placement rate within 3 months of certification. Our career services team works with over 50 corporate partners actively hiring drone pilots.",
    },
    {
      question: "Is financial aid available?",
      answer:
        "Yes! We offer payment plans, scholarships for veterans, and corporate sponsorship programs. Contact our admissions team for personalized options.",
    },
    {
      question: "Can I take courses online?",
      answer:
        "Absolutely! Our Part 107 ground school is 100% online with flexible scheduling. Hands-on flight training is conducted at our local facilities or can be arranged remotely.",
    },
    {
      question: "What drones do you use for training?",
      answer:
        "We train on industry-standard drones including DJI Mavic series, Phantom 4, and enterprise-grade drones used by our corporate partners.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{
        background: "var(--card-bg)",
        borderRadius: "24px",
        padding: "40px",
        border: "1px solid var(--border-color)",
      }}
    >
      <h3
        style={{
          fontSize: "24px",
          marginBottom: "10px",
          color: "var(--text-primary)",
        }}
      >
        Frequently Asked Questions
      </h3>
      <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>
        Find answers to common questions about our programs
      </p>

      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 20px 14px 45px",
            border: "1px solid var(--border-color)",
            borderRadius: "50px",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <FaSearch
          style={{
            position: "absolute",
            left: "18px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-secondary)",
          }}
        />
      </div>

      {/* FAQ Accordion */}
      <div>
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            style={{
              borderBottom:
                index !== filteredFaqs.length - 1
                  ? "1px solid var(--border-color)"
                  : "none",
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-primary)",
                fontSize: "16px",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown style={{ color: "var(--accent)" }} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      paddingBottom: "18px",
                    }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            padding: "40px",
          }}
        >
          No matching questions found. Try a different search term.
        </p>
      )}
    </motion.div>
  );
};

export default FAQAccordion;
