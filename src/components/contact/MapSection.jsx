import React from "react";
import { motion } from "framer-motion";

const MapSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid var(--border-color)",
        height: "450px",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.123456789!2d-92.331!3d34.746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d2f1f2f2f2f2f%3A0x123456789abcdef!2s300%20South%20Spring%20Street%2C%20Little%20Rock%2C%20AR!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="My Drone Force Location"
      />
    </motion.div>
  );
};

export default MapSection;
