import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoIntro = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (showIntro) {
        setShowIntro(false);
        if (onComplete) onComplete();
      }
    }, 32000);

    return () => clearTimeout(fallbackTimer);
  }, [onComplete, showIntro]);

  const handleVideoEnd = () => {
    setShowIntro(false);
    if (onComplete) onComplete();
  };

  const handleVideoCanPlay = () => {
    setIsVideoReady(true);
  };

  const handleSkip = () => {
    setShowIntro(false);
    if (onComplete) onComplete();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10000,
            background: "#0a0a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#000",
            }}
          >
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dcjhzgigb/video/upload/my-drone-force-video-4k_pdqeek.mp4"
              autoPlay
              muted={isMuted}
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              onEnded={handleVideoEnd}
              onCanPlay={handleVideoCanPlay}
            />
          </div>

          {!isVideoReady && (
            <div
              style={{
                position: "absolute",
                color: "white",
                fontSize: "14px",
                background: "rgba(0,0,0,0.7)",
                padding: "10px 20px",
                borderRadius: "30px",
              }}
            >
              LOADING VIDEO...
            </div>
          )}

          {/* Unmute/Mute Button */}
          <button
            onClick={toggleMute}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              background: "rgba(0,0,0,0.6)",
              border: "none",
              padding: "10px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              zIndex: 10001,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.8)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.6)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              padding: "10px 24px",
              borderRadius: "30px",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              zIndex: 10001,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.4)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Skip Intro ✕
          </button>

          {/* Progress Bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "rgba(255,255,255,0.2)",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 30, ease: "linear" }}
              style={{
                height: "100%",
                background: "var(--gradient)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoIntro;
