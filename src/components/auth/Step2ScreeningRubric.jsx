import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaClipboardList,
  FaCalculator,
} from "react-icons/fa";

const Step2ScreeningRubric = ({
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  screeningResult,
  onBack,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      const boolValue = value === "true";
      setFormData({ ...formData, [name]: boolValue });

      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // Calculate scores based on selections
  const calculateScores = () => {
    // Section 1: Basic Eligibility (3 questions)
    const section1Score =
      (formData.ageRequirement === true ? 1 : 0) +
      (formData.validId === true ? 1 : 0) +
      (formData.englishReadWrite === true ? 1 : 0);
    const section1Total = 3;

    // Section 2: Technical Readiness (3 questions)
    const section2Score =
      (formData.hasComputerTablet === true ? 1 : 0) +
      (formData.hasInternet === true ? 1 : 0) +
      (formData.comfortableZoom === true ? 1 : 0);
    const section2Total = 3;

    // Section 3: Availability & Commitment (4 questions)
    const section3Score =
      (formData.availableTraining === true ? 1 : 0) +
      (formData.canAttendInPerson === true ? 1 : 0) +
      (formData.canStudyDaily === true ? 1 : 0) +
      (formData.canTakeExamWithin30Days === true ? 1 : 0);
    const section3Total = 4;

    // Section 4: Motivation Indicators (3 questions, 2x weight)
    const section4Raw =
      (formData.clearReasonForCert === true ? 1 : 0) +
      (formData.careerInterest === true ? 1 : 0) +
      (formData.willingSignPledge === true ? 1 : 0);
    const section4Score = section4Raw * 2;
    const section4Total = 6; // 3 questions * 2 points each

    const totalScore =
      section1Score + section2Score + section3Score + section4Score;
    const maxScore =
      section1Total + section2Total + section3Total + section4Total;
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Check if all basic eligibility requirements are met
    const allBasicEligibilityMet = section1Score === 3;

    // Determine eligibility status
    let eligibilityStatus = "";
    let eligibilityMessage = "";
    let statusIcon = "";
    let statusColor = "";

    if (!allBasicEligibilityMet) {
      eligibilityStatus = "NOT ELIGIBLE";
      eligibilityMessage =
        "❌ NOT ELIGIBLE - Missing one or more Basic Eligibility requirements";
      statusIcon = "❌";
      statusColor = "#f44336";
    } else if (totalScore >= 12) {
      eligibilityStatus = "ELIGIBLE";
      eligibilityMessage = "✅ ELIGIBLE - Recommend for Program";
      statusIcon = "✅";
      statusColor = "#4caf50";
    } else {
      eligibilityStatus = "CONDITIONAL";
      eligibilityMessage =
        "⚠️ CONDITIONAL - All Basic Eligibility met but Total Score < 12";
      statusIcon = "⚠️";
      statusColor = "#ff9800";
    }

    return {
      section1Score,
      section1Total,
      section2Score,
      section2Total,
      section3Score,
      section3Total,
      section4Score,
      section4Total,
      totalScore,
      maxScore,
      percentage,
      allBasicEligibilityMet,
      eligibilityStatus,
      eligibilityMessage,
      statusIcon,
      statusColor,
    };
  };

  const scores = calculateScores();

  // Check if all questions have been answered (either Yes or No)
  const isFormComplete = () => {
    const requiredFields = [
      "ageRequirement",
      "validId",
      "englishReadWrite",
      "hasComputerTablet",
      "hasInternet",
      "comfortableZoom",
      "availableTraining",
      "canAttendInPerson",
      "canStudyDaily",
      "canTakeExamWithin30Days",
      "clearReasonForCert",
      "careerInterest",
      "willingSignPledge",
    ];
    // Check that every field has a boolean value (true OR false)
    return requiredFields.every(
      (field) => typeof formData[field] === "boolean",
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      onSubmit(formData);
    } else {
      toast.error("Please answer all questions (Yes or No) before proceeding");
    }
  };

  const allBasicEligibilityMet = scores.allBasicEligibilityMet;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div
          className="glass"
          style={{
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaClipboardList /> DRONE PILOT PROGRAM – CANDIDATE SCREENING RUBRIC
          </h3>

          {/* Score Summary Card */}
          <div
            style={{
              marginBottom: "25px",
              padding: "20px",
              borderRadius: "12px",
              background: "var(--gradient)",
              color: "white",
            }}
          >
            <h4
              style={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FaCalculator /> SCORE SUMMARY
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
              }}
            >
              <div>
                <strong>Total Score:</strong> {scores.totalScore} /{" "}
                {scores.maxScore}
              </div>
              <div>
                <strong>Percentage:</strong> {scores.percentage}%
              </div>
              <div>
                <strong>Basic Eligibility:</strong> {scores.section1Score} /{" "}
                {scores.section1Total}
              </div>
              <div>
                <strong style={{ color: scores.statusColor }}>Status:</strong>{" "}
                <span style={{ color: scores.statusColor }}>
                  {scores.eligibilityMessage}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 1: BASIC ELIGIBILITY */}
          <div
            style={{
              marginBottom: "25px",
              background: "var(--bg-secondary)",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                marginBottom: "10px",
                color: "var(--accent)",
              }}
            >
              SECTION 1: BASIC ELIGIBILITY (Required - All must be 'Yes')
            </h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Criterion
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Yes (1)
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    No (0)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "10px" }}>
                    At least 16 years old (FAA requirement)
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="ageRequirement"
                      checked={formData.ageRequirement === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="ageRequirement"
                      checked={formData.ageRequirement === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Valid government-issued ID
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="validId"
                      checked={formData.validId === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="validId"
                      checked={formData.validId === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Able to read, write, and understand English
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="englishReadWrite"
                      checked={formData.englishReadWrite === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="englishReadWrite"
                      checked={formData.englishReadWrite === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    Section 1 Subtotal:
                  </td>
                  <td
                    colSpan="2"
                    style={{ padding: "10px", fontWeight: "bold" }}
                  >
                    {scores.section1Score} / {scores.section1Total}
                  </td>
                </tr>
              </tfoot>
            </table>
            {!allBasicEligibilityMet && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#f44336",
                  marginTop: "10px",
                }}
              >
                ⚠️ All Basic Eligibility requirements must be 'Yes' to proceed
              </p>
            )}
          </div>

          {/* SECTION 2: TECHNICAL READINESS */}
          <div
            style={{
              marginBottom: "25px",
              background: "var(--bg-secondary)",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                marginBottom: "10px",
                color: "var(--accent)",
              }}
            >
              SECTION 2: TECHNICAL READINESS
            </h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Criterion
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Yes (1)
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    No (0)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Has access to a computer or tablet
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="hasComputerTablet"
                      checked={formData.hasComputerTablet === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="hasComputerTablet"
                      checked={formData.hasComputerTablet === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Has reliable internet access
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="hasInternet"
                      checked={formData.hasInternet === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="hasInternet"
                      checked={formData.hasInternet === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Comfortable using Zoom or willing to learn
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="comfortableZoom"
                      checked={formData.comfortableZoom === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="comfortableZoom"
                      checked={formData.comfortableZoom === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    Section 2 Subtotal:
                  </td>
                  <td
                    colSpan="2"
                    style={{ padding: "10px", fontWeight: "bold" }}
                  >
                    {scores.section2Score} / {scores.section2Total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* SECTION 3: AVAILABILITY & COMMITMENT */}
          <div
            style={{
              marginBottom: "25px",
              background: "var(--bg-secondary)",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                marginBottom: "10px",
                color: "var(--accent)",
              }}
            >
              SECTION 3: AVAILABILITY & COMMITMENT
            </h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Criterion
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Yes (1)
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    No (0)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Available for all scheduled training dates
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="availableTraining"
                      checked={formData.availableTraining === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="availableTraining"
                      checked={formData.availableTraining === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Able to attend in-person flight sessions
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="canAttendInPerson"
                      checked={formData.canAttendInPerson === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="canAttendInPerson"
                      checked={formData.canAttendInPerson === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Can commit 1–2 hours/day for study
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="canStudyDaily"
                      checked={formData.canStudyDaily === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="canStudyDaily"
                      checked={formData.canStudyDaily === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Can take the FAA exam within 30 days
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="canTakeExamWithin30Days"
                      checked={formData.canTakeExamWithin30Days === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="canTakeExamWithin30Days"
                      checked={formData.canTakeExamWithin30Days === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    Section 3 Subtotal:
                  </td>
                  <td
                    colSpan="2"
                    style={{ padding: "10px", fontWeight: "bold" }}
                  >
                    {scores.section3Score} / {scores.section3Total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* SECTION 4: MOTIVATION INDICATORS */}
          <div
            style={{
              marginBottom: "25px",
              background: "var(--bg-secondary)",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                marginBottom: "10px",
                color: "var(--accent)",
              }}
            >
              SECTION 4: MOTIVATION INDICATORS ⭐ (Weight: 2x)
            </h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Criterion
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Yes (2)
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    No (0)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Expressed clear reason for wanting certification
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="clearReasonForCert"
                      checked={formData.clearReasonForCert === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="clearReasonForCert"
                      checked={formData.clearReasonForCert === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Interested in employment, entrepreneurship, or skill
                    development
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="careerInterest"
                      checked={formData.careerInterest === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="careerInterest"
                      checked={formData.careerInterest === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Willing to sign Participant Commitment Agreement
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="willingSignPledge"
                      checked={formData.willingSignPledge === true}
                      onChange={handleChange}
                      value="true"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="radio"
                      name="willingSignPledge"
                      checked={formData.willingSignPledge === false}
                      onChange={handleChange}
                      value="false"
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    Section 4 Subtotal (2x weight):
                  </td>
                  <td
                    colSpan="2"
                    style={{ padding: "10px", fontWeight: "bold" }}
                  >
                    {scores.section4Score} / {scores.section4Total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* SCORING LEGEND */}
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "12px",
              background: "var(--bg-secondary)",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                marginBottom: "10px",
                color: "var(--accent)",
              }}
            >
              SCORING LEGEND
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "20px" }}>✅</span>
                <span>
                  <strong>ELIGIBLE</strong> - All Basic Eligibility met + Total
                  Score ≥ 12 (75%)
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "20px" }}>⚠️</span>
                <span>
                  <strong>CONDITIONAL</strong> - All Basic Eligibility met but
                  Total Score &lt; 12
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "20px" }}>❌</span>
                <span>
                  <strong>NOT ELIGIBLE</strong> - Missing one or more Basic
                  Eligibility requirements
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "15px" }}>
          <motion.button
            type="button"
            className="btn-outline-custom"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (onBack) {
                onBack(); // Go back to step 1
              } else {
                window.location.href = "/register"; // Fallback
              }
            }}
            style={{ flex: 1, padding: "14px" }}
          >
            <FaArrowLeft /> Back to Step 1
          </motion.button>
          <motion.button
            type="submit"
            className="btn-primary-custom"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || !allBasicEligibilityMet}
            style={{
              flex: 2,
              padding: "14px",
              opacity: !allBasicEligibilityMet ? 0.5 : 1,
            }}
          >
            {isSubmitting ? "Processing..." : "Continue to Pledge →"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Step2ScreeningRubric;
