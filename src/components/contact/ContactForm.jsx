import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComment,
  FaPaperPlane,
} from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [focused, setFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field, value) => {
    if (!value) {
      setFocused({ ...focused, [field]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const inputFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Your Name",
      icon: <FaUser />,
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Your Email",
      icon: <FaEnvelope />,
      required: true,
    },
    {
      name: "phone",
      type: "tel",
      placeholder: "Phone Number",
      icon: <FaPhone />,
      required: false,
    },
    {
      name: "subject",
      type: "text",
      placeholder: "Subject",
      icon: null,
      required: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="contact-form-container"
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
        Send us a Message
      </h3>
      <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>
        We'll get back to you within 24 hours
      </p>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {inputFields.map((field) => (
            <div key={field.name} className="col-md-6">
              <div className="floating-input">
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={(e) => handleBlur(field.name, e.target.value)}
                  required={field.required}
                  style={{
                    width: "100%",
                    padding: "16px 16px 8px 40px",
                    border: `1px solid ${focused[field.name] || formData[field.name] ? "var(--accent)" : "var(--border-color)"}`,
                    borderRadius: "12px",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                />
                <label
                  style={{
                    position: "absolute",
                    left: "40px",
                    top:
                      focused[field.name] || formData[field.name]
                        ? "5px"
                        : "50%",
                    transform:
                      focused[field.name] || formData[field.name]
                        ? "translateY(0)"
                        : "translateY(-50%)",
                    fontSize:
                      focused[field.name] || formData[field.name]
                        ? "10px"
                        : "14px",
                    color:
                      focused[field.name] || formData[field.name]
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    transition: "all 0.2s ease",
                    pointerEvents: "none",
                    background: "var(--bg-primary)",
                    padding: "0 4px",
                  }}
                >
                  {field.placeholder}
                </label>
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {field.icon}
                </span>
              </div>
            </div>
          ))}

          {/* Message Field */}
          <div className="col-12">
            <div className="floating-input">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={(e) => handleBlur("message", e.target.value)}
                required
                rows="5"
                style={{
                  width: "100%",
                  padding: "16px 16px 8px 40px",
                  border: `1px solid ${focused.message || formData.message ? "var(--accent)" : "var(--border-color)"}`,
                  borderRadius: "12px",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
                }}
              />
              <label
                style={{
                  position: "absolute",
                  left: "40px",
                  top: focused.message || formData.message ? "8px" : "18px",
                  fontSize:
                    focused.message || formData.message ? "10px" : "14px",
                  color:
                    focused.message || formData.message
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  pointerEvents: "none",
                  background: "var(--bg-primary)",
                  padding: "0 4px",
                }}
              >
                Your Message
              </label>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "18px",
                  color: "var(--text-secondary)",
                }}
              >
                <FaComment />
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary-custom"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <FaPaperPlane style={{ marginLeft: "8px" }} />
                </>
              )}
            </motion.button>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === "success" && (
            <div
              style={{
                background: "#d4edda",
                color: "#155724",
                padding: "12px",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              ✅ Message sent successfully! We'll contact you soon.
            </div>
          )}
        </div>
      </form>

      <style jsx>{`
        .floating-input {
          position: relative;
        }
      `}</style>
    </motion.div>
  );
};

export default ContactForm;
