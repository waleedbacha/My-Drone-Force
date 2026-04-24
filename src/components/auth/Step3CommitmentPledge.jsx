import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaClipboardList,
  FaSignature,
  FaSpinner,
} from "react-icons/fa";

const Step3CommitmentPledge = ({
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  userInfo,
  onBack,
}) => {
  const [signature, setSignature] = useState("");

  const isFormComplete = () => {
    const required = [
      "attendVirtualSessions",
      "attendInPersonSessions",
      "understandMissedImpact",
      "activelyEngage",
      "participateDiscussions",
      "askQuestions",
      "completeStudyMaterials",
      "dedicateDailyStudy",
      "participateGroupStudy",
      "completePracticeExams",
      "reviewIncorrectAnswers",
      "scheduleExamWithin30Days",
      "understandDelayImpact",
      "understandSuccessLink",
      "acknowledgeExpectations",
    ];
    return (
      required.every((field) => formData[field] === true) &&
      signature.trim().length > 0
    );
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      setFormData({ ...formData, participantSignature: signature });
      onSubmit({ ...formData, participantSignature: signature });
    }
  };

  const getCurrentDate = () => new Date().toLocaleDateString();

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
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "10px",
              color: "var(--text-primary)",
            }}
          >
            PARTICIPANT COMMITMENT PLEDGE
          </h3>
          <p style={{ marginBottom: "20px", color: "var(--text-secondary)" }}>
            Program: FAA Part 107 Drone Pilot Prep Program
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "25px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>Participant Name:</strong> {userInfo.firstName}{" "}
              {userInfo.lastName}
            </div>
            <div>
              <strong>Cohort Month:</strong>{" "}
              <input
                type="text"
                name="cohortMonth"
                className="form-control"
                style={{ display: "inline-block", width: "150px" }}
                placeholder="e.g., April 2026"
                value={formData.cohortMonth}
                onChange={(e) =>
                  setFormData({ ...formData, cohortMonth: e.target.value })
                }
                required
              />
            </div>
          </div>

          <p style={{ marginBottom: "20px", fontStyle: "italic" }}>
            Our Collaboration team is committed to helping each participant
            successfully prepare for and pass the FAA Part 107 Remote Pilot
            Exam. Success in this program requires full participation,
            discipline, and personal accountability.
          </p>
          <p style={{ marginBottom: "20px", fontWeight: "600" }}>
            By signing below, I agree to the following commitments:
          </p>

          {/* 6 sections of commitments as per your form - condensed for brevity */}
          <div style={{ marginBottom: "20px" }}>
            <h4>1. Attendance Commitment</h4>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="attendVirtualSessions"
                checked={formData.attendVirtualSessions}
                onChange={handleCheckboxChange}
              />{" "}
              I will attend all scheduled virtual training sessions
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="attendInPersonSessions"
                checked={formData.attendInPersonSessions}
                onChange={handleCheckboxChange}
              />{" "}
              I will attend all in-person drone flight training sessions
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="understandMissedImpact"
                checked={formData.understandMissedImpact}
                onChange={handleCheckboxChange}
              />{" "}
              I understand that missed sessions may significantly impact my
              ability to pass the exam
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4>2. Active Participation</h4>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="activelyEngage"
                checked={formData.activelyEngage}
                onChange={handleCheckboxChange}
              />{" "}
              I will actively engage during training sessions
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="participateDiscussions"
                checked={formData.participateDiscussions}
                onChange={handleCheckboxChange}
              />{" "}
              I will participate in group discussions and activities
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="askQuestions"
                checked={formData.askQuestions}
                onChange={handleCheckboxChange}
              />{" "}
              I will ask questions when I need clarification
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4>3. Study Commitment</h4>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="completeStudyMaterials"
                checked={formData.completeStudyMaterials}
                onChange={handleCheckboxChange}
              />{" "}
              I will complete all assigned study materials
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="dedicateDailyStudy"
                checked={formData.dedicateDailyStudy}
                onChange={handleCheckboxChange}
              />{" "}
              I will dedicate a minimum of 1–2 hours of personal study per day
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="participateGroupStudy"
                checked={formData.participateGroupStudy}
                onChange={handleCheckboxChange}
              />{" "}
              I will participate in group study sessions when offered
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4>4. Practice Exam Requirement</h4>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="completePracticeExams"
                checked={formData.completePracticeExams}
                onChange={handleCheckboxChange}
              />{" "}
              I will complete all required practice exams
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="reviewIncorrectAnswers"
                checked={formData.reviewIncorrectAnswers}
                onChange={handleCheckboxChange}
              />{" "}
              I will review incorrect answers and improve my understanding
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4>5. FAA Part 107 Exam Commitment</h4>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="scheduleExamWithin30Days"
                checked={formData.scheduleExamWithin30Days}
                onChange={handleCheckboxChange}
              />{" "}
              I agree to schedule and take the FAA Part 107 exam within 30 days
              of completing the course
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="understandDelayImpact"
                checked={formData.understandDelayImpact}
                onChange={handleCheckboxChange}
              />{" "}
              I understand that delaying the exam may reduce my likelihood of
              passing
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4>6. Accountability Acknowledgment</h4>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="understandSuccessLink"
                checked={formData.understandSuccessLink}
                onChange={handleCheckboxChange}
              />{" "}
              I understand that my success is directly tied to my level of
              commitment
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                name="acknowledgeExpectations"
                checked={formData.acknowledgeExpectations}
                onChange={handleCheckboxChange}
              />{" "}
              I acknowledge that failure to meet these expectations may impact
              my performance
            </label>
          </div>
        </div>

        {/* Signature */}
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
            }}
          >
            <FaSignature /> PARTICIPANT SIGNATURE
          </h3>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "500",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Participant Signature *
            </label>
            <input
              type="text"
              placeholder="Type your full name as signature"
              className="form-control"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              Date:{" "}
              <input
                type="text"
                value={getCurrentDate()}
                readOnly
                style={{
                  background: "transparent",
                  border: "none",
                  fontWeight: "bold",
                }}
              />
            </label>
          </div>
        </div>

        {/* Buttons */}
        {/* Buttons */}
        <div style={{ display: "flex", gap: "15px" }}>
          <motion.button
            type="button"
            className="btn-outline-custom"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (onBack) {
                onBack(); // Go back to step 2
              }
            }}
            style={{ flex: 1, padding: "14px" }}
          >
            <FaArrowLeft /> Back to Step 2
          </motion.button>
          <motion.button
            type="submit"
            className="btn-primary-custom"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || !isFormComplete()}
            style={{
              flex: 2,
              padding: "14px",
              opacity: !isFormComplete() ? 0.5 : 1,
            }}
          >
            {isSubmitting ? (
              <>
                <FaSpinner
                  style={{
                    animation: "spin 1s linear infinite",
                    marginRight: "8px",
                  }}
                />{" "}
                Registering...
              </>
            ) : (
              "Complete Registration →"
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Step3CommitmentPledge;
