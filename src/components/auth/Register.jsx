import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Step1IntakeForm from "./Step1IntakeForm";
import Step2ScreeningRubric from "./Step2ScreeningRubric";
import Step3CommitmentPledge from "./Step3CommitmentPledge";
import API_URL from "../config/api";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [screeningResult, setScreeningResult] = useState(null);

  // Step 1 Form Data
  const [step1Data, setStep1Data] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    courseInterest: "",
    hearAboutUs: "",
    profileImage: null,
    englishProficiency: false,
    programCommitment: false,
    techAccess: false,
    commitmentAgreements: [],
    electronicSignature: "",
    signatureDate: "",
    printedName: "",
  });

  // Step 2 Screening Data
  const [step2Data, setStep2Data] = useState({
    userId: null,
    ageRequirement: false,
    validId: false,
    englishReadWrite: false,
    hasComputerTablet: false,
    hasInternet: false,
    comfortableZoom: false,
    availableTraining: false,
    canAttendInPerson: false,
    canStudyDaily: false,
    canTakeExamWithin30Days: false,
    clearReasonForCert: false,
    careerInterest: false,
    willingSignPledge: false,
    notes: "",
  });

  // Step 3 Pledge Data
  const [step3Data, setStep3Data] = useState({
    userId: null,
    cohortMonth: "",
    attendVirtualSessions: false,
    attendInPersonSessions: false,
    understandMissedImpact: false,
    activelyEngage: false,
    participateDiscussions: false,
    askQuestions: false,
    completeStudyMaterials: false,
    dedicateDailyStudy: false,
    participateGroupStudy: false,
    completePracticeExams: false,
    reviewIncorrectAnswers: false,
    scheduleExamWithin30Days: false,
    understandDelayImpact: false,
    understandSuccessLink: false,
    acknowledgeExpectations: false,
    participantSignature: "",
  });

  // Check if user has existing progress on load
  useEffect(() => {
    const savedStep = localStorage.getItem("registrationStep");
    const savedUserId = localStorage.getItem("registrationUserId");
    if (savedStep && savedUserId) {
      setCurrentStep(parseInt(savedStep));
      setUserId(savedUserId);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (step, userId = null) => {
    localStorage.setItem("registrationStep", step);
    if (userId) {
      localStorage.setItem("registrationUserId", userId);
      setUserId(userId);
    }
  };

  // Step 1: Submit Intake Form
  const handleStep1Submit = async (formData) => {
    setIsSubmitting(true);
    try {
      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === "profileImage" && formData[key] instanceof File) {
            submitData.append(key, formData[key]);
          } else if (
            key === "commitmentAgreements" &&
            Array.isArray(formData[key])
          ) {
            submitData.append(key, JSON.stringify(formData[key]));
          } else if (typeof formData[key] === "boolean") {
            submitData.append(key, formData[key].toString());
          } else {
            submitData.append(key, formData[key]);
          }
        }
      });

      const response = await axios.post(
        `${API_URL}/api/auth/register/step1`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.success) {
        toast.success("Step 1 completed! Proceeding to screening...");
        saveProgress(2, response.data.data.userId);
        setStep2Data((prev) => ({
          ...prev,
          userId: response.data.data.userId,
        }));
        setCurrentStep(2);
      }
    } catch (error) {
      console.error("Step 1 error:", error.response?.data);
      const errors = error.response?.data?.errors;
      if (errors && errors.length > 0) {
        const errorMessages = errors.map((e) => e.msg).join(", ");
        toast.error(errorMessages);
      } else {
        const message =
          error.response?.data?.message || "Step 1 failed. Please try again.";
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Submit Screening Rubric
  const handleStep2Submit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/register/step2`, {
        ...data,
        userId,
      });

      if (response.data.success) {
        setScreeningResult(response.data.data);

        if (response.data.data.canProceed) {
          toast.success(response.data.data.eligibilityMessage);
          saveProgress(3);
          setStep3Data((prev) => ({ ...prev, userId }));
          setCurrentStep(3);
        } else {
          toast.warning(response.data.data.eligibilityMessage);
        }
      }
    } catch (error) {
      console.error("Step 2 error:", error.response?.data);
      const message =
        error.response?.data?.message || "Screening failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Submit Pledge
  const handleStep3Submit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/register/step3`, {
        ...data,
        userId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.removeItem("registrationStep");
        localStorage.removeItem("registrationUserId");
        localStorage.setItem("isEnrolled", "true");
        localStorage.setItem("userEmail", step1Data.email);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Step 3 error:", error.response?.data);
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="dark" />
      <div
        className="register-page"
        style={{
          minHeight: "100vh",
          background: "var(--bg-primary)",
          padding: "40px 20px",
        }}
      >
        <div className="container-custom">
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {/* Progress Steps Indicator */}
            <div style={{ marginBottom: "40px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "30px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        currentStep >= 1
                          ? "var(--gradient)"
                          : "var(--border-color)",
                      color:
                        currentStep >= 1 ? "white" : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color:
                        currentStep >= 1
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                    }}
                  >
                    Candidate Intake
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        currentStep >= 2
                          ? "var(--gradient)"
                          : "var(--border-color)",
                      color:
                        currentStep >= 2 ? "white" : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                      fontWeight: "bold",
                    }}
                  >
                    2
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color:
                        currentStep >= 2
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                    }}
                  >
                    Screening Rubric
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        currentStep >= 3
                          ? "var(--gradient)"
                          : "var(--border-color)",
                      color:
                        currentStep >= 3 ? "white" : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                      fontWeight: "bold",
                    }}
                  >
                    3
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color:
                        currentStep >= 3
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                    }}
                  >
                    Commitment Pledge
                  </span>
                </div>
              </div>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <Step1IntakeForm
                formData={step1Data}
                setFormData={setStep1Data}
                isSubmitting={isSubmitting}
                onSubmit={handleStep1Submit}
              />
            )}

            {currentStep === 2 && (
              <Step2ScreeningRubric
                formData={step2Data}
                setFormData={setStep2Data}
                isSubmitting={isSubmitting}
                onSubmit={handleStep2Submit}
                screeningResult={screeningResult}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <Step3CommitmentPledge
                formData={step3Data}
                setFormData={setStep3Data}
                isSubmitting={isSubmitting}
                onSubmit={handleStep3Submit}
                userInfo={step1Data}
                onBack={() => setCurrentStep(2)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
