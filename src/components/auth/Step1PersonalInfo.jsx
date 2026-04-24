import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUpload,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
} from "react-icons/fa";

const Step1PersonalInfo = ({
  formData,
  errors,
  touched,
  imagePreview,
  getFieldStatus,
  handleChange,
  handleBlur,
  handleImageChange,
  nextStep,
  isStep1Valid,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Profile Image Upload */}
      <div className="text-center mb-4">
        <div
          style={{
            width: "100px",
            height: "100px",
            margin: "0 auto",
            borderRadius: "50%",
            background: "var(--gradient)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden",
            transition: "transform 0.3s ease",
            border: errors.profileImage ? "2px solid #f44336" : "none",
          }}
          onClick={() => document.getElementById("profileImage").click()}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <FaUpload size={30} color="white" />
          )}
        </div>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {errors.profileImage && (
          <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
            {errors.profileImage}
          </p>
        )}
        <p
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            marginTop: "5px",
          }}
        >
          Click to upload profile photo (JPG, PNG, WEBP, max 5MB)
        </p>
      </div>

      {/* First Name & Last Name Row */}
      <div className="row mb-3" style={{ display: "flex", gap: "15px" }}>
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-primary)",
              marginBottom: "5px",
              display: "block",
            }}
          >
            <FaUser size={12} style={{ marginRight: "5px" }} /> First Name *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                background: "var(--bg-primary)",
                border: `1px solid ${
                  getFieldStatus("firstName") === "error"
                    ? "#f44336"
                    : getFieldStatus("firstName") === "success"
                      ? "#4caf50"
                      : "var(--border-color)"
                }`,
                color: "var(--text-primary)",
                borderRadius: "12px",
                padding: "12px",
                paddingRight: "35px",
              }}
            />
            {getFieldStatus("firstName") === "success" && (
              <FaCheckCircle
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4caf50",
                  fontSize: "18px",
                }}
              />
            )}
            {getFieldStatus("firstName") === "error" && (
              <FaExclamationCircle
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#f44336",
                  fontSize: "18px",
                }}
              />
            )}
          </div>
          {touched.firstName && errors.firstName && (
            <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
              {errors.firstName}
            </p>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-primary)",
              marginBottom: "5px",
              display: "block",
            }}
          >
            <FaUser size={12} style={{ marginRight: "5px" }} /> Last Name *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                background: "var(--bg-primary)",
                border: `1px solid ${
                  getFieldStatus("lastName") === "error"
                    ? "#f44336"
                    : getFieldStatus("lastName") === "success"
                      ? "#4caf50"
                      : "var(--border-color)"
                }`,
                color: "var(--text-primary)",
                borderRadius: "12px",
                padding: "12px",
                paddingRight: "35px",
              }}
            />
            {getFieldStatus("lastName") === "success" && (
              <FaCheckCircle
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4caf50",
                  fontSize: "18px",
                }}
              />
            )}
            {getFieldStatus("lastName") === "error" && (
              <FaExclamationCircle
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#f44336",
                  fontSize: "18px",
                }}
              />
            )}
          </div>
          {touched.lastName && errors.lastName && (
            <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-3">
        <label
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "var(--text-primary)",
            marginBottom: "5px",
            display: "block",
          }}
        >
          <FaEnvelope size={12} style={{ marginRight: "5px" }} /> Email Address
          *
        </label>
        <div style={{ position: "relative" }}>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              background: "var(--bg-primary)",
              border: `1px solid ${
                getFieldStatus("email") === "error"
                  ? "#f44336"
                  : getFieldStatus("email") === "success"
                    ? "#4caf50"
                    : "var(--border-color)"
              }`,
              color: "var(--text-primary)",
              borderRadius: "12px",
              padding: "12px",
              paddingRight: "35px",
            }}
          />
          {getFieldStatus("email") === "success" && (
            <FaCheckCircle
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#4caf50",
                fontSize: "18px",
              }}
            />
          )}
          {getFieldStatus("email") === "error" && (
            <FaExclamationCircle
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#f44336",
                fontSize: "18px",
              }}
            />
          )}
        </div>
        {touched.email && errors.email && (
          <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone & DOB Row */}
      <div className="row mb-4" style={{ display: "flex", gap: "15px" }}>
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-primary)",
              marginBottom: "5px",
              display: "block",
            }}
          >
            <FaPhone size={12} style={{ marginRight: "5px" }} /> Phone Number *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                background: "var(--bg-primary)",
                border: `1px solid ${
                  getFieldStatus("phone") === "error"
                    ? "#f44336"
                    : getFieldStatus("phone") === "success"
                      ? "#4caf50"
                      : "var(--border-color)"
                }`,
                color: "var(--text-primary)",
                borderRadius: "12px",
                padding: "12px",
                paddingRight: "35px",
              }}
            />
            {getFieldStatus("phone") === "success" && (
              <FaCheckCircle
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4caf50",
                  fontSize: "18px",
                }}
              />
            )}
            {getFieldStatus("phone") === "error" && (
              <FaExclamationCircle
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#f44336",
                  fontSize: "18px",
                }}
              />
            )}
          </div>
          {touched.phone && errors.phone && (
            <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
              {errors.phone}
            </p>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-primary)",
              marginBottom: "5px",
              display: "block",
            }}
          >
            <FaCalendarAlt size={12} style={{ marginRight: "5px" }} /> Date of
            Birth *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              value={formData.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                background: "var(--bg-primary)",
                border: `1px solid ${
                  getFieldStatus("dateOfBirth") === "error"
                    ? "#f44336"
                    : getFieldStatus("dateOfBirth") === "success"
                      ? "#4caf50"
                      : "var(--border-color)"
                }`,
                color: "var(--text-primary)",
                borderRadius: "12px",
                padding: "12px",
                paddingRight: "35px",
              }}
            />
            {getFieldStatus("dateOfBirth") === "success" && (
              <FaCheckCircle
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4caf50",
                  fontSize: "18px",
                }}
              />
            )}
            {getFieldStatus("dateOfBirth") === "error" && (
              <FaExclamationCircle
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#f44336",
                  fontSize: "18px",
                }}
              />
            )}
          </div>
          {touched.dateOfBirth && errors.dateOfBirth && (
            <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
              {errors.dateOfBirth}
            </p>
          )}
        </div>
      </div>

      <motion.button
        type="button"
        onClick={nextStep}
        className="btn-primary-custom"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%",
          justifyContent: "center",
          padding: "14px",
          fontSize: "16px",
          fontWeight: "600",
          opacity: !isStep1Valid() ? 0.5 : 1,
          cursor: !isStep1Valid() ? "not-allowed" : "pointer",
        }}
      >
        Next Step <FaArrowRight style={{ marginLeft: "8px" }} />
      </motion.button>
    </motion.div>
  );
};

export default Step1PersonalInfo;
