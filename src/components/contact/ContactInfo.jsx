import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";

const ContactInfo = () => {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isVisible =
          rect.top <= window.innerHeight - 100 && rect.bottom >= 100;
        setShowWhatsApp(isVisible);
      }
    };

    // Check on scroll
    window.addEventListener("scroll", checkVisibility);
    // Check on mount
    checkVisibility();

    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  const contactMethods = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["(501) 859-4672"],
      subtext: "Mon-Fri 9am-6pm",
      color: "#4caf50",
      link: "tel:+15011234567",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["info@mydroneforce.com"],
      subtext: "24/7 Support",
      color: "#2196f3",
      link: "mailto:info@mydroneforce.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Office",
      details: ["300 South Spring Street", "Suite 940, Little Rock, AR 72201"],
      subtext: "Visit us",
      color: "#ff9800",
      link: "https://maps.google.com",
    },
    {
      icon: <FaClock />,
      title: "Hours",
      details: ["Mon-Fri: 9am - 6pm", "Sat: 10am - 4pm", "Sun: Closed"],
      subtext: "Appointments available",
      color: "#9c27b0",
      link: null,
    },
  ];

  return (
    <div className="contact-info-section">
      <div className="row g-4">
        {contactMethods.map((method, index) => (
          <motion.div
            key={index}
            className="col-lg-3 col-md-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className="info-card"
              style={{
                background: "var(--card-bg)",
                borderRadius: "20px",
                padding: "25px",
                textAlign: "center",
                transition: "all 0.3s ease",
                border: "1px solid var(--border-color)",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  margin: "0 auto 20px",
                  background: `linear-gradient(135deg, ${method.color}, var(--accent))`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  color: "white",
                }}
              >
                {method.icon}
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "15px",
                  color: "var(--text-primary)",
                }}
              >
                {method.title}
              </h3>
              {method.details.map((detail, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  {detail}
                </p>
              ))}
              <p
                style={{
                  color: "var(--accent)",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                {method.subtext}
              </p>
              {method.link && (
                <a
                  href={method.link}
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    color: "var(--accent)",
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  Contact Now →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* WhatsApp Floating Button - Shows only on Contact Section */}
      {showWhatsApp && (
        <motion.a
          href="https://wa.me/15011234567"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaWhatsapp size={28} />
        </motion.a>
      )}

      <style jsx>{`
        .whatsapp-float {
          position: fixed;
          bottom: 30px;
          left: 30px;
          background: #25d366;
          color: white;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          z-index: 100;
          cursor: pointer;
        }
        .whatsapp-float:hover {
          transform: scale(1.1);
          background: #128c7e;
        }
        @media (max-width: 768px) {
          .whatsapp-float {
            width: 45px;
            height: 45px;
            bottom: 20px;
            left: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactInfo;
