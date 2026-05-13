import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaQuoteLeft,
  FaPlay,
  FaTimes,
} from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
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
      <div className="testimonial-card">
        <FaQuoteLeft className="quote-icon" />
        <p className="testimonial-text">{testimonial.text}</p>
        <div className="rating">{renderStars(testimonial.rating)}</div>

        {testimonial.videoUrl && (
          <button
            className="watch-video-btn"
            onClick={() => setShowVideo(true)}
          >
            <FaPlay size={12} /> Watch Video Testimonial
          </button>
        )}

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
          padding: 35px;
          transition: all 0.3s ease;
          border: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
          height: 100%;
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

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Drone Pilot",
      company: "Aerial Solutions",
      text: "My Drone Force transformed my career! The Part 107 training was comprehensive and the instructors were incredibly knowledgeable. I passed my exam on the first try and now run my own drone business.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      videoUrl: null,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Operations Manager",
      company: "TechDrone Inc",
      text: "We've trained over 50 employees with My Drone Force. Their corporate program is outstanding - professional, flexible, and results-driven. Highly recommended for any business looking to integrate drone technology.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      videoUrl: null,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "FAA Certified Pilot",
      company: "SkyView Photography",
      text: "The hands-on training was exactly what I needed. The instructors are real experts who care about your success. I went from zero experience to certified professional in just 6 weeks!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      videoUrl: null,
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Youth Program Director",
      company: "STEM Foundation",
      text: "The youth program is fantastic! Our students are engaged and excited about drone technology. The curriculum is well-designed and the support team is amazing.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      videoUrl: null,
    },
  ];

  // Autoplay every 2 seconds
  useEffect(() => {
    let interval;
    if (autoplay && !isHovering) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 2000); // 2 seconds
    }
    return () => clearInterval(interval);
  }, [autoplay, isHovering, testimonials.length]);

  const goToPrevious = () => {
    setAutoplay(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setTimeout(() => setAutoplay(true), 5000);
  };

  const goToNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const goToSlide = (index) => {
    setAutoplay(false);
    setCurrentIndex(index);
    setTimeout(() => setAutoplay(true), 5000);
  };

  return (
    <section
      id="testimonials"
      style={{ padding: "80px 0", background: "var(--bg-secondary)" }}
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
            TESTIMONIALS
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            What Our Students Say
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Join thousands of successful drone pilots who trusted us
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="carousel-container"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button className="carousel-nav prev" onClick={goToPrevious}>
            <FaChevronLeft />
          </button>

          <div className="carousel-track">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="carousel-slide"
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="carousel-nav next" onClick={goToNext}>
            <FaChevronRight />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="stats-row"
        >
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Happy Students</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">85%</div>
            <div className="stat-label">Targeted Pass Rate</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .carousel-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .carousel-track {
          flex: 1;
          min-height: 400px;
        }

        .carousel-slide {
          width: 100%;
        }

        .carousel-nav {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .carousel-nav:hover {
          background: var(--gradient);
          color: white;
          transform: scale(1.1);
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border-color);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          width: 30px;
          border-radius: 10px;
          background: var(--gradient);
        }

        .stats-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          margin-top: 60px;
          padding: 30px;
          background: var(--card-bg);
          border-radius: 20px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: var(--accent);
        }

        .stat-label {
          color: var(--text-secondary);
          fontsize: 14px;
          margin-top: 5px;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--border-color);
        }

        @media (max-width: 768px) {
          .carousel-nav {
            width: 35px;
            height: 35px;
          }
          .stats-row {
            gap: 20px;
          }
          .stat-number {
            font-size: 24px;
          }
          .stat-divider {
            height: 30px;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;
