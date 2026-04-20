import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaPlay, FaTimes } from "react-icons/fa";

const TestimonialCard = ({ testimonial, index }) => {
  const [showVideo, setShowVideo] = useState(false);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        size={16}
        style={{
          color: i < rating ? "#ffc107" : "rgba(255,193,7,0.3)",
          marginRight: "3px",
        }}
      />
    ));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="testimonial-card"
        whileHover={{ y: -5 }}
      >
        <div className="testimonial-content">
          {/* Quote Icon */}
          <FaQuoteLeft className="quote-icon" />

          {/* Testimonial Text */}
          <p className="testimonial-text">{testimonial.text}</p>

          {/* Star Rating */}
          <div className="rating">{renderStars(testimonial.rating)}</div>

          {/* Video Button (if available) */}
          {testimonial.videoUrl && (
            <button
              className="watch-video-btn"
              onClick={() => setShowVideo(true)}
            >
              <FaPlay size={12} />
              Watch Video Testimonial
            </button>
          )}

          {/* Author Info */}
          <div className="author-info">
            <div className="author-avatar">
              {testimonial.avatar ? (
                <img src={testimonial.avatar} alt={testimonial.name} />
              ) : (
                <span>{testimonial.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h4 className="author-name">{testimonial.name}</h4>
              <p className="author-role">
                {testimonial.role} • {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {showVideo && testimonial.videoUrl && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-video" onClick={() => setShowVideo(false)}>
              <FaTimes />
            </button>
            <video
              src={testimonial.videoUrl}
              controls
              autoPlay
              style={{ width: "100%", borderRadius: "12px" }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .testimonial-card {
          background: var(--card-bg);
          border-radius: 24px;
          padding: 30px;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
          border: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
        }

        .testimonial-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .quote-icon {
          color: var(--accent);
          font-size: 32px;
          opacity: 0.3;
          margin-bottom: 20px;
        }

        .testimonial-text {
          color: var(--text-primary);
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 20px;
          font-style: italic;
        }

        .rating {
          display: flex;
          gap: 3px;
          margin-bottom: 20px;
        }

        .watch-video-btn {
          background: var(--gradient);
          border: none;
          padding: 8px 16px;
          border-radius: 50px;
          color: white;
          font-size: 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .watch-video-btn:hover {
          transform: scale(1.05);
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 15px;
          border-top: 1px solid var(--border-color);
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 20px;
          color: white;
          overflow: hidden;
        }

        .author-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .author-name {
          color: var(--text-primary);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .author-role {
          color: var(--text-secondary);
          font-size: 12px;
        }

        /* Video Modal */
        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-modal-content {
          position: relative;
          width: 80vw;
          max-width: 800px;
          border-radius: 16px;
          overflow: hidden;
        }

        .close-video {
          position: absolute;
          top: -40px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            padding: 20px;
          }
          .testimonial-text {
            font-size: 14px;
          }
          .video-modal-content {
            width: 90vw;
          }
        }
      `}</style>
    </>
  );
};

export default TestimonialCard;
