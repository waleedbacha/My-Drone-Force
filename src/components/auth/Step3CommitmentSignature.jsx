import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaSignature,
  FaClipboardList,
  FaSpinner,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationCircle,
  FaLanguage,
  FaCalendarCheck,
  FaLaptopCode,
} from "react-icons/fa";
import SignaturePad from "./SignaturePad";

const Step3CommitmentSignature = ({
  formData,
  isSubmitting,
  onSignatureSave,
  prevStep,
  onSubmit,
}) => {
  const [verificationChecklist, setVerificationChecklist] = useState({
    englishProficiency: false,
    programCommitment: false,
    techAccess: false,
  });

  const [agreementChecklist, setAgreementChecklist] = useState({
    attendance: false,
    activeParticipation: false,
    practiceExams: false,
    faaExamCommitment: false,
  });

  const [signatureData, setSignatureData] = useState(null);
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false);

  const handleVerificationChange = (key) => {
    setVerificationChecklist({
      ...verificationChecklist,
      [key]: !verificationChecklist[key],
    });
  };

  const handleAgreementChange = (key) => {
    setAgreementChecklist({
      ...agreementChecklist,
      [key]: !agreementChecklist[key],
    });
  };

  const handleSignatureSave = (signature) => {
    setSignatureData(signature);
    onSignatureSave(signature);
  };

  const isVerificationComplete = () => {
    return (
      verificationChecklist.englishProficiency &&
      verificationChecklist.programCommitment &&
      verificationChecklist.techAccess
    );
  };

  const isAgreementComplete = () => {
    return (
      agreementChecklist.attendance &&
      agreementChecklist.activeParticipation &&
      agreementChecklist.practiceExams &&
      agreementChecklist.faaExamCommitment
    );
  };

  const isStep3Complete = () => {
    return (
      isVerificationComplete() &&
      isAgreementComplete() &&
      signatureData !== null
    );
  };

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (isStep3Complete()) {
      setIsLocalSubmitting(true);

      // Create FormData object
      const submitFormData = new FormData();

      // Personal Information
      submitFormData.append("firstName", formData.firstName || "");
      submitFormData.append("lastName", formData.lastName || "");
      submitFormData.append("email", formData.email || "");
      submitFormData.append("phone", formData.phone || "");
      submitFormData.append("dateOfBirth", formData.dateOfBirth || "");

      // Address Information
      submitFormData.append("address", formData.address || "");
      submitFormData.append("city", formData.city || "");
      submitFormData.append("state", formData.state || "");
      submitFormData.append("zipCode", formData.zipCode || "");

      // Course Information
      submitFormData.append("courseInterest", formData.courseInterest || "");
      submitFormData.append("hearAboutUs", formData.hearAboutUs || "");

      // Profile Image
      if (formData.profileImage instanceof File) {
        submitFormData.append("profileImage", formData.profileImage);
      }

      // Section 2: Onboarding Verification
      submitFormData.append(
        "englishProficiency",
        verificationChecklist.englishProficiency,
      );
      submitFormData.append(
        "programCommitment",
        verificationChecklist.programCommitment,
      );
      submitFormData.append("techAccess", verificationChecklist.techAccess);

      // Create commitment agreements array
      const commitmentAgreementsArray = [];
      if (agreementChecklist.attendance)
        commitmentAgreementsArray.push(
          "Obligation to attend all training sessions and labs",
        );
      if (agreementChecklist.activeParticipation)
        commitmentAgreementsArray.push(
          "Active participation in all curriculum activities and group discussions",
        );
      if (agreementChecklist.practiceExams)
        commitmentAgreementsArray.push(
          "Utilization of all provided practice exams to ensure readiness",
        );
      if (agreementChecklist.faaExamCommitment)
        commitmentAgreementsArray.push(
          "Commitment to schedule and take the FAA Part 107 exam within thirty (30) days of program completion",
        );

      submitFormData.append(
        "commitmentAgreements",
        JSON.stringify(commitmentAgreementsArray),
      );

      // Section 3: Candidate Commitment
      submitFormData.append("electronicSignature", signatureData || "");
      submitFormData.append(
        "printedName",
        `${formData.firstName || ""} ${formData.lastName || ""}`,
      );
      submitFormData.append("signatureDate", new Date().toISOString());

      // Call parent onSubmit
      await onSubmit(submitFormData);
      setIsLocalSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleFinalSubmit}>
        {/* Section 2: Onboarding Verification Checklist */}
        <div
          className="verification-section mb-4"
          style={{
            background: "var(--bg-primary)",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid var(--border-color)",
          }}
        >
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaClipboardList style={{ color: "var(--accent)" }} /> Section 2:
            Onboarding Verification Checklist
          </h4>

          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--gradient)", color: "white" }}>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      width: "80px",
                      fontSize: "13px",
                    }}
                  >
                    Yes/No
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontSize: "13px",
                    }}
                  >
                    Requirement
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.englishProficiency}
                      onChange={() =>
                        handleVerificationChange("englishProficiency")
                      }
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontSize: "13px",
                      color: "var(--text-primary)",
                    }}
                  >
                    <FaLanguage
                      style={{ marginRight: "8px", color: "var(--accent)" }}
                    />
                    English Language Proficiency: Ability to read, write, and
                    speak English (FAA requirement)
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.programCommitment}
                      onChange={() =>
                        handleVerificationChange("programCommitment")
                      }
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontSize: "13px",
                      color: "var(--text-primary)",
                    }}
                  >
                    <FaCalendarCheck
                      style={{ marginRight: "8px", color: "var(--accent)" }}
                    />
                    Program Commitment: Availability for scheduled in-person and
                    virtual sessions
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.techAccess}
                      onChange={() => handleVerificationChange("techAccess")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontSize: "13px",
                      color: "var(--text-primary)",
                    }}
                  >
                    <FaLaptopCode
                      style={{ marginRight: "8px", color: "var(--accent)" }}
                    />
                    Tech Access: Access to a computer and reliable internet for
                    course materials
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {!isVerificationComplete() && (
            <p
              style={{
                fontSize: "11px",
                color: "#f44336",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <FaExclamationCircle /> Please check all verification requirements
              to continue
            </p>
          )}
          {isVerificationComplete() && (
            <p
              style={{
                fontSize: "11px",
                color: "#4caf50",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <FaCheckCircle /> All verification requirements confirmed
            </p>
          )}
        </div>

        {/* Section 3: Candidate Commitment Agreement */}
        <div
          className="commitment-section mb-4"
          style={{
            background: "var(--bg-primary)",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid var(--border-color)",
          }}
        >
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaHandshake style={{ color: "var(--accent)" }} /> Section 3:
            Candidate Commitment Agreement
          </h4>

          <p
            style={{
              fontSize: "13px",
              color: "var(--text-primary)",
              marginBottom: "15px",
            }}
          >
            By signing below, I agree to the following commitments:
          </p>

          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: "12px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreementChecklist.attendance}
                  onChange={() => handleAgreementChange("attendance")}
                  style={{
                    marginTop: "2px",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{ fontSize: "13px", color: "var(--text-primary)" }}
                >
                  ☑ Obligation to attend all training sessions and labs.
                </span>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreementChecklist.activeParticipation}
                  onChange={() => handleAgreementChange("activeParticipation")}
                  style={{
                    marginTop: "2px",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{ fontSize: "13px", color: "var(--text-primary)" }}
                >
                  ☑ Active participation in all curriculum activities and group
                  discussions.
                </span>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreementChecklist.practiceExams}
                  onChange={() => handleAgreementChange("practiceExams")}
                  style={{
                    marginTop: "2px",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{ fontSize: "13px", color: "var(--text-primary)" }}
                >
                  ☑ Utilization of all provided practice exams to ensure
                  readiness.
                </span>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreementChecklist.faaExamCommitment}
                  onChange={() => handleAgreementChange("faaExamCommitment")}
                  style={{
                    marginTop: "2px",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{ fontSize: "13px", color: "var(--text-primary)" }}
                >
                  ☑ Commitment to schedule and take the FAA Part 107 exam within
                  thirty (30) days of program completion.
                </span>
              </label>
            </div>
          </div>

          {!isAgreementComplete() && (
            <p
              style={{
                fontSize: "11px",
                color: "#f44336",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <FaExclamationCircle /> Please check all commitment agreements to
              continue
            </p>
          )}
          {isAgreementComplete() && (
            <p
              style={{
                fontSize: "11px",
                color: "#4caf50",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <FaCheckCircle /> All commitment agreements confirmed
            </p>
          )}
        </div>

        {/* Candidate Acknowledgment with Signature */}
        <div
          className="signature-section mb-4"
          style={{
            background: "var(--bg-primary)",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid var(--border-color)",
          }}
        >
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaSignature style={{ color: "var(--accent)" }} /> Candidate
            Acknowledgment
          </h4>

          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "var(--text-primary)",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                ✍️ Electronic Signature:
              </label>
              <SignaturePad
                onSave={handleSignatureSave}
                initialSignature={signatureData}
              />
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Print Name:
                </label>
                <input
                  type="text"
                  value={`${formData.firstName || ""} ${formData.lastName || ""}`}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Date Signed:
                </label>
                <input
                  type="text"
                  value={getCurrentDate()}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div
          className="summary-section mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(var(--accent-rgb), 0.1) 0%, rgba(var(--accent-rgb), 0.05) 100%)",
            borderRadius: "16px",
            padding: "15px",
            border: "1px solid var(--border-color)",
          }}
        >
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaClipboardList /> Registration Summary
          </h4>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            <div>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </div>
            <div>
              <strong>Email:</strong> {formData.email}
            </div>
            <div>
              <strong>Course:</strong> {formData.courseInterest}
            </div>
            <div>
              <strong>Location:</strong> {formData.city}, {formData.state}
            </div>
            <div>
              <strong>Verification:</strong>{" "}
              {isVerificationComplete() ? "✅ Complete" : "⚠️ Pending"}
            </div>
            <div>
              <strong>Commitments:</strong>{" "}
              {isAgreementComplete() ? "✅ Accepted" : "⚠️ Pending"}
            </div>
            <div>
              <strong>Signature:</strong>{" "}
              {signatureData ? "✅ Signed" : "⚠️ Required"}
            </div>
          </div>
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
            <FaArrowLeft style={{ marginRight: "8px" }} /> Back
          </motion.button>
          <motion.button
            type="submit"
            disabled={isSubmitting || isLocalSubmitting || !isStep3Complete()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 2,
              justifyContent: "center",
              padding: "14px",
              background: "var(--gradient)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontWeight: "600",
              opacity: !isStep3Complete() ? 0.5 : 1,
              cursor: !isStep3Complete() ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting || isLocalSubmitting ? (
              <>
                <FaSpinner
                  style={{
                    animation: "spin 1s linear infinite",
                    marginRight: "8px",
                  }}
                />
                Registering...
              </>
            ) : (
              "Complete Registration"
            )}
          </motion.button>
        </div>
      </form>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default Step3CommitmentSignature;
