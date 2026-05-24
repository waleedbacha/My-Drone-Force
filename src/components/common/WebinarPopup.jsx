/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaVideo } from "react-icons/fa";

const WebinarPopup = ({ isOpen, onClose, zoomLink }) => {
  // Close popup when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleRegisterClick = () => {
    window.open(zoomLink, "_blank");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="webinar-popup-overlay" onClick={handleOverlayClick}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="webinar-popup-container"
          >
            {/* Close Button */}
            <button
              className="webinar-popup-close"
              onClick={onClose}
              aria-label="Close"
            >
              <FaTimes size={16} />
            </button>

            {/* Content */}
            <div className="webinar-popup-content">
              <h3 className="webinar-popup-headline">
                Free Drone Pilot Webinar
              </h3>

              <p className="webinar-popup-description">
                Join us for an exclusive free webinar to learn how you can
                launch your drone career.
              </p>

              <button
                className="webinar-popup-button"
                onClick={handleRegisterClick}
              >
                <FaVideo size={16} />
                Register Now on Zoom
              </button>

              <p className="webinar-popup-footer">
                Limited spots available. Register today!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WebinarPopup;
