import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaMicrophoneAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const EventsPage = () => {
  // ============================================
  // SINGLE EVENT CONFIGURATION
  // Update this section when event changes
  // ============================================

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isEventLive, setIsEventLive] = useState(false);
  const [showPastEventWarning, setShowPastEventWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive adjustments
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Event date: May 26, 2026 at 7:00 PM CST
  const eventDate = new Date("May 26, 2026 19:00:00 CST");

  const currentEvent = {
    id: 1,
    title: "Free Drone Pilot Webinar",
    host: "Steffanie Rivers",
    date: "Tuesday, May 26, 2026",
    time: "7:00 PM",
    zoomLink: "https://us06web.zoom.us/meeting/register/nTqIJnRYTpy__B-bgSktkw",
    heroImage:
      "https://res.cloudinary.com/dcjhzgigb/image/upload/v1778055415/Gemini_Generated_Image_2dzhcz2dzhcz2dzh_y4fkzb.png",
    hostImage:
      "https://res.cloudinary.com/dcjhzgigb/image/upload/v1778052320/upcoming-event3_ydcgpt.png",
    registrationDeadline: "May 26, 2026 at 6:00 PM CST",
    whatYouWillLearn: [
      "How to get FAA certified in 60 days",
      "Job opportunities paying $60,000+",
      "Real success stories from our graduates",
      "Live Q&A with Steffanie and industry experts",
    ],
  };

  // Countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = eventDate - now;

      if (difference <= 0) {
        setIsEventLive(false);
        setShowPastEventWarning(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (difference <= 15 * 60 * 1000) {
        setIsEventLive(true);
      } else {
        setIsEventLive(false);
      }

      setShowPastEventWarning(false);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // eventDate is constant, no need to include

  const handleRegisterClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "webinar_registration_click", {
        event_title: currentEvent.title,
        event_date: currentEvent.date,
      });
    }
    window.open(currentEvent.zoomLink, "_blank");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
      }}
    >
      {/* Hero Section - Responsive with improved mobile image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1376 / 768",
          maxHeight: isMobile ? "350px" : "none",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <img
          src={currentEvent.heroImage}
          alt="Drone Webinar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Gradient Overlay - Stronger on mobile for better text contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: isMobile
              ? "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.9) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Hero Content - Centered */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "8%" : "15%",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "white",
            padding: isMobile ? "0 16px" : "0 24px",
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              style={{
                fontSize: isMobile ? "24px" : "clamp(32px, 8vw, 56px)",
                fontWeight: "bold",
                marginBottom: isMobile ? "12px" : "20px",
                lineHeight: 1.3,
                textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
              }}
              className="gradient-text"
            >
              {currentEvent.title}
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: isMobile ? "8px" : "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(0,0,0,0.65)",
                  padding: isMobile ? "5px 12px" : "8px 20px",
                  borderRadius: "50px",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: isMobile ? "10px" : "13px",
                }}
              >
                <FaCalendarAlt
                  style={{
                    color: "#818cf8",
                    fontSize: isMobile ? "9px" : "12px",
                  }}
                />
                <span>May 26, 2026</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(0,0,0,0.65)",
                  padding: isMobile ? "5px 12px" : "8px 20px",
                  borderRadius: "50px",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: isMobile ? "10px" : "13px",
                }}
              >
                <FaClock
                  style={{
                    color: "#818cf8",
                    fontSize: isMobile ? "9px" : "12px",
                  }}
                />
                <span>7:00 PM CST</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(0,0,0,0.65)",
                  padding: isMobile ? "5px 12px" : "8px 20px",
                  borderRadius: "50px",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: isMobile ? "10px" : "13px",
                }}
              >
                <FaVideo
                  style={{
                    color: "#818cf8",
                    fontSize: isMobile ? "9px" : "12px",
                  }}
                />
                <span>Live on Zoom</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Countdown & Registration Card */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          padding: "0 16px",
          marginTop: isMobile ? "-15px" : "-30px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: "var(--card-bg)",
            borderRadius: isMobile ? "18px" : "28px",
            padding: isMobile ? "16px 14px" : "28px 24px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {!showPastEventWarning && !isEventLive && (
            <>
              <h3
                style={{
                  fontSize: isMobile ? "10px" : "13px",
                  marginBottom: isMobile ? "12px" : "20px",
                  letterSpacing: "2px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: "600",
                }}
              >
                Event Starts In
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: isMobile ? "4px" : "10px",
                  flexWrap: "wrap",
                  marginBottom: isMobile ? "16px" : "28px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    minWidth: isMobile ? "45px" : "65px",
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "22px" : "clamp(32px, 7vw, 48px)",
                      fontWeight: "bold",
                      color: "var(--accent)",
                      lineHeight: 1,
                      background: "rgba(99, 102, 241, 0.1)",
                      padding: isMobile ? "6px" : "10px",
                      borderRadius: isMobile ? "8px" : "14px",
                    }}
                  >
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "7px" : "10px",
                      textTransform: "uppercase",
                      marginTop: "4px",
                      color: "var(--text-secondary)",
                      fontWeight: "500",
                    }}
                  >
                    Days
                  </div>
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "18px" : "clamp(28px, 6vw, 40px)",
                    fontWeight: "bold",
                    color: "var(--accent)",
                  }}
                >
                  :
                </div>
                <div
                  style={{
                    textAlign: "center",
                    minWidth: isMobile ? "45px" : "65px",
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "22px" : "clamp(32px, 7vw, 48px)",
                      fontWeight: "bold",
                      color: "var(--accent)",
                      lineHeight: 1,
                      background: "rgba(99, 102, 241, 0.1)",
                      padding: isMobile ? "6px" : "10px",
                      borderRadius: isMobile ? "8px" : "14px",
                    }}
                  >
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "7px" : "10px",
                      textTransform: "uppercase",
                      marginTop: "4px",
                      color: "var(--text-secondary)",
                      fontWeight: "500",
                    }}
                  >
                    Hours
                  </div>
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "18px" : "clamp(28px, 6vw, 40px)",
                    fontWeight: "bold",
                    color: "var(--accent)",
                  }}
                >
                  :
                </div>
                <div
                  style={{
                    textAlign: "center",
                    minWidth: isMobile ? "45px" : "65px",
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "22px" : "clamp(32px, 7vw, 48px)",
                      fontWeight: "bold",
                      color: "var(--accent)",
                      lineHeight: 1,
                      background: "rgba(99, 102, 241, 0.1)",
                      padding: isMobile ? "6px" : "10px",
                      borderRadius: isMobile ? "8px" : "14px",
                    }}
                  >
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "7px" : "10px",
                      textTransform: "uppercase",
                      marginTop: "4px",
                      color: "var(--text-secondary)",
                      fontWeight: "500",
                    }}
                  >
                    Mins
                  </div>
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "18px" : "clamp(28px, 6vw, 40px)",
                    fontWeight: "bold",
                    color: "var(--accent)",
                  }}
                >
                  :
                </div>
                <div
                  style={{
                    textAlign: "center",
                    minWidth: isMobile ? "45px" : "65px",
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "22px" : "clamp(32px, 7vw, 48px)",
                      fontWeight: "bold",
                      color: "var(--accent)",
                      lineHeight: 1,
                      background: "rgba(99, 102, 241, 0.1)",
                      padding: isMobile ? "6px" : "10px",
                      borderRadius: isMobile ? "8px" : "14px",
                    }}
                  >
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "7px" : "10px",
                      textTransform: "uppercase",
                      marginTop: "4px",
                      color: "var(--text-secondary)",
                      fontWeight: "500",
                    }}
                  >
                    Secs
                  </div>
                </div>
              </div>
            </>
          )}

          {isEventLive && !showPastEventWarning && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                borderRadius: "50px",
                padding: isMobile ? "8px 12px" : "14px 20px",
                marginBottom: isMobile ? "12px" : "20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "white",
                    borderRadius: "50%",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: isMobile ? "11px" : "15px",
                    fontWeight: "bold",
                  }}
                >
                  LIVE NOW! Join the Webinar
                </span>
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRegisterClick}
            className="btn-primary-custom"
            style={{
              padding: isMobile ? "10px 16px" : "14px 28px",
              fontSize: isMobile ? "13px" : "clamp(15px, 4vw, 17px)",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: showPastEventWarning ? "not-allowed" : "pointer",
              opacity: showPastEventWarning ? 0.5 : 1,
              borderRadius: "50px",
              width: "100%",
              background: showPastEventWarning
                ? "var(--text-secondary)"
                : "linear-gradient(135deg, #6366f1, #4f46e5)",
            }}
            disabled={showPastEventWarning}
          >
            <FaVideo style={{ fontSize: isMobile ? "11px" : "14px" }} />
            {isEventLive ? "Join Webinar Now" : "Register Now"}
            <FaArrowRight style={{ fontSize: isMobile ? "11px" : "14px" }} />
          </motion.button>
        </motion.div>
      </div>

      {/* Main Content */}
      <div
        className="container-custom"
        style={{ maxWidth: "1200px", margin: "50px auto 0", padding: "0 16px" }}
      >
        {showPastEventWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid #f59e0b",
              borderRadius: "16px",
              padding: "12px 16px",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#f59e0b", marginBottom: 0, fontSize: "12px" }}>
              ⚠️ This event has passed. Check back soon for our next webinar
              date!
            </p>
          </motion.div>
        )}

        {/* Two Column Layout for Host & Learning */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "25px" : "40px",
            marginBottom: "50px",
          }}
        >
          {/* Host Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              flex: 1,
              background: "var(--card-bg)",
              borderRadius: isMobile ? "18px" : "28px",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
              boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))",
                padding: isMobile ? "20px" : "30px",
                textAlign: "center",
              }}
            >
              <img
                src={currentEvent.hostImage}
                alt="Steffanie Rivers"
                style={{
                  width: isMobile ? "100px" : "160px",
                  height: isMobile ? "100px" : "160px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid var(--accent)",
                  marginBottom: "12px",
                }}
              />
              <h2
                style={{
                  fontSize: isMobile ? "22px" : "clamp(24px, 5vw, 28px)",
                  fontWeight: "bold",
                  color: "var(--accent)",
                  marginBottom: "6px",
                }}
              >
                Steffanie Rivers
              </h2>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "rgba(99, 102, 241, 0.1)",
                  padding: "4px 10px",
                  borderRadius: "50px",
                  fontSize: "11px",
                }}
              >
                <FaMicrophoneAlt style={{ fontSize: "9px" }} />
                <span>Host & Industry Expert</span>
              </div>
            </div>
            <div style={{ padding: isMobile ? "16px" : "24px" }}>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: isMobile ? "13px" : "15px",
                  lineHeight: "1.6",
                  marginBottom: 0,
                }}
              >
                Steffanie is a passionate expert for Opportunity Youth and drone
                education. With 8+ years in workforce development, she has
                helped hundreds launch successful careers in emerging
                technologies.
              </p>
            </div>
          </motion.div>

          {/* What You'll Learn */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              flex: 1,
              background: "var(--card-bg)",
              borderRadius: isMobile ? "18px" : "28px",
              border: "1px solid var(--border-color)",
              padding: isMobile ? "20px" : "32px",
              boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "20px" : "clamp(22px, 5vw, 26px)",
                fontWeight: "bold",
                marginBottom: "16px",
                color: "var(--text-primary)",
              }}
            >
              What You'll Learn
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {currentEvent.whatYouWillLearn.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    background: "rgba(99, 102, 241, 0.05)",
                    borderRadius: "12px",
                  }}
                >
                  <FaCheckCircle
                    style={{
                      color: "var(--accent)",
                      fontSize: isMobile ? "16px" : "20px",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.4",
                    }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;
