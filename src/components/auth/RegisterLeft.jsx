import React from "react";
import { motion } from "framer-motion";

const RegisterLeft = () => {
  return (
    <div
      className="register-left"
      style={{
        height: "100%",
        minHeight: "100vh",
        background: "var(--gradient)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "200px",
          height: "200px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          position: "absolute",
          bottom: "15%",
          left: "10%",
          width: "250px",
          height: "250px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "50%",
          filter: "blur(50px)",
        }}
      />

      <div
        className="text-center"
        style={{ position: "relative", zIndex: 2, padding: "40px" }}
      >
        {/* Animated Drone Image */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <div
            style={{
              width: "300px",
              height: "300px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ fontSize: "120px" }}>🚁</span>

            {/* Rotating Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                border: "2px dashed rgba(255,255,255,0.3)",
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              style={{
                position: "absolute",
                width: "85%",
                height: "85%",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{
                position: "absolute",
                width: "70%",
                height: "70%",
                border: "1px dotted rgba(255,255,255,0.15)",
                borderRadius: "50%",
              }}
            />
          </div>
        </motion.div>

        {/* Catchy Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "white",
            marginTop: "40px",
            marginBottom: "15px",
          }}
        >
          Join the Future of
          <br />
          <span
            style={{
              borderBottom: "3px solid white",
              display: "inline-block",
              paddingBottom: "5px",
            }}
          >
            Drone Technology
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.9)",
            maxWidth: "350px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Get FAA Part 107 certified and launch your career in the
          fastest-growing industry.
        </motion.p>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <motion.h3
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              style={{
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              10,000+
            </motion.h3>
            <p style={{ fontSize: "12px", opacity: 0.8 }}>Students Trained</p>
          </div>
          <div>
            <motion.h3
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1.3 }}
              style={{
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              98%
            </motion.h3>
            <p style={{ fontSize: "12px", opacity: 0.8 }}>Pass Rate</p>
          </div>
          <div>
            <motion.h3
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1.6 }}
              style={{
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              50+
            </motion.h3>
            <p style={{ fontSize: "12px", opacity: 0.8 }}>Corporate Partners</p>
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              background: "rgba(255,255,255,0.2)",
              padding: "5px 12px",
              borderRadius: "20px",
            }}
          >
            🏆 Best Drone Training 2024
          </span>
          <span
            style={{
              fontSize: "12px",
              background: "rgba(255,255,255,0.2)",
              padding: "5px 12px",
              borderRadius: "20px",
            }}
          >
            ⭐ 4.9/5 Student Rating
          </span>
          <span
            style={{
              fontSize: "12px",
              background: "rgba(255,255,255,0.2)",
              padding: "5px 12px",
              borderRadius: "20px",
            }}
          >
            🇺🇸 Nationally Recognized
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterLeft;
