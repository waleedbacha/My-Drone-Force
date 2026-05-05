import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  //   FaClock,
  FaVideo,
  //   faExternalLinkAlt,
  //   FaUserCheck,
  //   FaRegClock,
} from "react-icons/fa";
// import { HiLocationMarker } from "react-icons/hi";

const EventsPage = () => {
  // ============================================
  // SINGLE EVENT CONFIGURATION
  // Update this section when event changes
  // ============================================

  const [currentEvent] = useState({
    // Current active event (ONLY ONE at a time)
    id: 1,
    title: "Free Drone Pilot Webinar",
    date: "Friday, May 15, 2026",
    time: "2:00 PM - 3:00 PM CST",
    description:
      "Join us for an exclusive free webinar where you'll discover how to launch your career in the fastest-growing industry. Learn about FAA certification requirements, job opportunities, and how My Drone Force can help you get started.",
    zoomLink: "https://us06web.zoom.us/meeting/register/nTqIJnRYTpy__B-bgSktkw", // REPLACE with actual Zoom link
    imageUrl:
      "https://res.cloudinary.com/dcjhzgigb/image/upload/v1777956206/drone_7_cne7on.jpg", // Optional
    registrationDeadline: "May 14, 2026 at 11:59 PM CST",
    whatYouWillLearn: [
      "How to get FAA certified in 60 days",
      "Job opportunities paying $60,000+",
      "Zero-cost training options for Opportunity Youth",
      "Real success stories from our graduates",
      "Live Q&A with industry experts",
    ],
    speakers: [
      {
        name: "Captain Sarah Johnson",
        title: "FAA Certified Drone Pilot & Instructor",
      },
      {
        name: "Michael Williams",
        title: "Drone Industry Recruiter",
      },
    ],
  });

  // For future events (store here, but don't display)
  // When current event passes, copy next event to currentEvent
  const [showPastEventWarning, setShowPastEventWarning] = useState(false);

  // Check if event has passed
  useEffect(() => {
    const eventDate = new Date("May 15, 2026");
    const today = new Date();

    if (today > eventDate) {
      setShowPastEventWarning(true);
    }
  }, []);

  const handleRegisterClick = () => {
    // Track click (optional analytics)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "webinar_registration_click", {
        event_title: currentEvent.title,
        event_date: currentEvent.date,
      });
    }

    // Open Zoom registration link in new tab
    window.open(currentEvent.zoomLink, "_blank");
  };

  return (
    <div
      style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px" }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <h1
            className="gradient-text"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Upcoming Events
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Join us for live sessions and webinars
          </p>
        </motion.div>

        {/* Past Event Warning */}
        {showPastEventWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: "var(--card-bg)",
              border: "1px solid #f59e0b",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#f59e0b", marginBottom: 0 }}>
              ⚠️ This event has passed. Check back soon for our next webinar
              date!
            </p>
          </motion.div>
        )}

        {/* SINGLE EVENT CARD - Only ONE displayed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            background: "var(--card-bg)",
            borderRadius: "24px",
            border: "1px solid var(--border-color)",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          {/* Event Image (optional) */}
          {currentEvent.imageUrl && (
            <div
              style={{
                width: "100%",
                height: "240px",
                backgroundImage: `url(${currentEvent.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          {/* Event Content */}
          <div style={{ padding: "40px" }}>
            {/* Event Badge - ONE EVENT at a time */}
            <div
              style={{
                display: "inline-block",
                background: "rgba(99, 102, 241, 0.1)",
                color: "var(--accent)",
                padding: "6px 14px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "24px",
              }}
            >
              Current Event
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: "bold",
                marginBottom: "24px",
                color: "var(--text-primary)",
              }}
            >
              {currentEvent.title}
            </h2>

            {/* Event Details Grid */}
            {/* <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginBottom: "32px",
                padding: "20px",
                background: "var(--bg-secondary)",
                borderRadius: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FaCalendarAlt
                  style={{ color: "var(--accent)", fontSize: "20px" }}
                />
                <div>
                  <div
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
                    Date
                  </div>
                  <div
                    style={{ fontWeight: "600", color: "var(--text-primary)" }}
                  >
                    {currentEvent.date}
                  </div>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FaClock style={{ color: "var(--accent)", fontSize: "20px" }} />
                <div>
                  <div
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
                    Time
                  </div>
                  <div
                    style={{ fontWeight: "600", color: "var(--text-primary)" }}
                  >
                    {currentEvent.time}
                  </div>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FaVideo style={{ color: "var(--accent)", fontSize: "20px" }} />
                <div>
                  <div
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
                    Platform
                  </div>
                  <div
                    style={{ fontWeight: "600", color: "var(--text-primary)" }}
                  >
                    Zoom Webinar
                  </div>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FaRegClock
                  style={{ color: "var(--accent)", fontSize: "20px" }}
                />
                <div>
                  <div
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
                    Registration Deadline
                  </div>
                  <div
                    style={{ fontWeight: "600", color: "var(--text-primary)" }}
                  >
                    {currentEvent.registrationDeadline}
                  </div>
                </div>
              </div>
            </div> */}

            {/* Description */}
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "16px",
                lineHeight: "1.7",
                marginBottom: "32px",
              }}
            >
              {currentEvent.description}
            </p>

            {/* What You'll Learn Section */}
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "var(--text-primary)",
                }}
              >
                What You'll Learn
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {currentEvent.whatYouWillLearn.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "var(--accent)", fontSize: "18px" }}>
                      ✓
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers Section */}
            {/* {currentEvent.speakers && currentEvent.speakers.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    color: "var(--text-primary)",
                  }}
                >
                  Meet Your Hosts
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {currentEvent.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        background: "var(--bg-secondary)",
                        padding: "12px 20px",
                        borderRadius: "50px",
                      }}
                    >
                      <FaUserCheck style={{ color: "var(--accent)" }} />
                      <div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: "var(--text-primary)",
                          }}
                        >
                          {speaker.name}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {speaker.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* CTA Button - ONLY ONE button */}
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegisterClick}
                className="btn-primary-custom"
                style={{
                  padding: "16px 40px",
                  fontSize: "18px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                }}
                disabled={showPastEventWarning}
              >
                <FaVideo />
                Register Now on Zoom
                <FaCalendarAlt style={{ fontSize: "14px" }} />
              </motion.button>

              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginTop: "16px",
                }}
              >
                You'll be redirected to Zoom to complete your registration
              </p>
            </div>

            {/* Note about single event */}
            <div
              style={{
                marginTop: "40px",
                padding: "16px",
                background: "rgba(99, 102, 241, 0.05)",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px dashed var(--border-color)",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginBottom: 0,
                }}
              >
                📌 Only our current webinar is shown here. Check back for future
                event dates.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Admin Instructions - Hidden from public (only visible in development) */}
      {/* {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#1e1e2f",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "12px",
            maxWidth: "280px",
            zIndex: 9999,
            border: "1px solid #333",
          }}
        >
          <strong style={{ color: "#fff" }}>🔧 Admin Instructions</strong>
          <p style={{ marginTop: "8px", color: "#aaa", fontSize: "11px" }}>
            To update event:
            <br />
            Edit <code>EventsPage.jsx</code> → <code>currentEvent</code> object.
            <br />
            Update date, Zoom link, and description.
            <br />
            When event passes → replace with next event.
          </p>
        </div>
      )} */}
    </div>
  );
};

export default EventsPage;
