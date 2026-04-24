import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCity,
  FaFlagUsa,
  FaRegAddressCard,
  FaGraduationCap,
  FaUserFriends,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const Step2AddressCourse = ({
  formData,
  errors,
  touched,
  getFieldStatus,
  handleChange,
  handleBlur,
  prevStep,
  goToStep3,
  isStep2Valid,
  courses,
  hearAboutOptions,
  states,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Address */}
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
          <FaMapMarkerAlt size={12} style={{ marginRight: "5px" }} /> Address *
        </label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              background: "var(--bg-primary)",
              border: `1px solid ${
                getFieldStatus("address") === "error"
                  ? "#f44336"
                  : getFieldStatus("address") === "success"
                    ? "#4caf50"
                    : "var(--border-color)"
              }`,
              color: "var(--text-primary)",
              borderRadius: "12px",
              padding: "12px",
              paddingRight: "35px",
            }}
          />
          {getFieldStatus("address") === "success" && (
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
          {getFieldStatus("address") === "error" && (
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
        {touched.address && errors.address && (
          <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
            {errors.address}
          </p>
        )}
      </div>

      {/* City & State Row */}
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
            <FaCity size={12} style={{ marginRight: "5px" }} /> City *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                background: "var(--bg-primary)",
                border: `1px solid ${
                  getFieldStatus("city") === "error"
                    ? "#f44336"
                    : getFieldStatus("city") === "success"
                      ? "#4caf50"
                      : "var(--border-color)"
                }`,
                color: "var(--text-primary)",
                borderRadius: "12px",
                padding: "12px",
                paddingRight: "35px",
              }}
            />
            {getFieldStatus("city") === "success" && (
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
            {getFieldStatus("city") === "error" && (
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
          {touched.city && errors.city && (
            <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
              {errors.city}
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
            <FaFlagUsa size={12} style={{ marginRight: "5px" }} /> State *
          </label>
          <select
            name="state"
            className="form-control"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              background: "var(--bg-primary)",
              border: `1px solid ${
                getFieldStatus("state") === "error"
                  ? "#f44336"
                  : getFieldStatus("state") === "success"
                    ? "#4caf50"
                    : "var(--border-color)"
              }`,
              color: "var(--text-primary)",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {touched.state && errors.state && (
            <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
              {errors.state}
            </p>
          )}
        </div>
      </div>

      {/* ZIP Code & Course Row */}
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
            <FaRegAddressCard size={12} style={{ marginRight: "5px" }} /> ZIP
            Code *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="zipCode"
              className="form-control"
              value={formData.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                background: "var(--bg-primary)",
                border: `1px solid ${
                  getFieldStatus("zipCode") === "error"
                    ? "#f44336"
                    : getFieldStatus("zipCode") === "success"
                      ? "#4caf50"
                      : "var(--border-color)"
                }`,
                color: "var(--text-primary)",
                borderRadius: "12px",
                padding: "12px",
                paddingRight: "35px",
              }}
            />
            {getFieldStatus("zipCode") === "success" && (
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
            {getFieldStatus("zipCode") === "error" && (
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
          {touched.zipCode && errors.zipCode && (
            <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
              {errors.zipCode}
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
            <FaGraduationCap size={12} style={{ marginRight: "5px" }} /> Course
            Interest *
          </label>
          <select
            name="courseInterest"
            className="form-control"
            value={formData.courseInterest}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              background: "var(--bg-primary)",
              border: `1px solid ${
                getFieldStatus("courseInterest") === "error"
                  ? "#f44336"
                  : getFieldStatus("courseInterest") === "success"
                    ? "#4caf50"
                    : "var(--border-color)"
              }`,
              color: "var(--text-primary)",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          {touched.courseInterest && errors.courseInterest && (
            <p style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}>
              {errors.courseInterest}
            </p>
          )}
        </div>
      </div>

      {/* How did you hear about us? */}
      <div className="mb-4">
        <label
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "var(--text-primary)",
            marginBottom: "5px",
            display: "block",
          }}
        >
          <FaUserFriends size={12} style={{ marginRight: "5px" }} /> How did you
          hear about us?
        </label>
        <select
          name="hearAboutUs"
          className="form-control"
          value={formData.hearAboutUs}
          onChange={handleChange}
          style={{
            background: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          <option value="">Select Option</option>
          {hearAboutOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-3" style={{ display: "flex", gap: "15px" }}>
        <motion.button
          type="button"
          onClick={prevStep}
          className="btn-outline-custom"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ flex: 1, justifyContent: "center", padding: "14px" }}
        >
          Back
        </motion.button>
        <motion.button
          type="button"
          onClick={goToStep3}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 2,
            justifyContent: "center",
            padding: "14px",
            background: "var(--gradient)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontWeight: "600",
            opacity: !isStep2Valid() ? 0.5 : 1,
            cursor: !isStep2Valid() ? "not-allowed" : "pointer",
          }}
        >
          Continue to Commitment <FaArrowRight style={{ marginLeft: "8px" }} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step2AddressCourse;
