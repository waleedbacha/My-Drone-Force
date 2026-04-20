import React from "react";
import { motion } from "framer-motion";
import { ContactInfo, ContactForm, MapSection, FAQAccordion } from "./contact";
const Contact = () => {
  return (
    <section
      id="contact"
      style={{ padding: "80px 0", background: "var(--bg-primary)" }}
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
            GET IN TOUCH
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Let's Start a Conversation
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <ContactInfo />

        {/* Contact Form and Map Row */}
        <div className="row g-4 mt-4">
          <div className="col-lg-6">
            <ContactForm />
          </div>
          <div className="col-lg-6">
            <MapSection />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-5">
          <FAQAccordion />
        </div>
      </div>
    </section>
  );
};

export default Contact;
