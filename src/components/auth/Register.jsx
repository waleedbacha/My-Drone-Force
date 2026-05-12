/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Step1IntakeForm from "./Step1IntakeForm";
import Step2ScreeningRubric from "./Step2ScreeningRubric";
import Step3Payment from "./Step4Payment"; // File name Step4Payment, export named Step3Payment
import Step3CommitmentPledge from "./Step3CommitmentPledge";
import AlreadyRegisteredModal from "./AlreadyRegisteredModal";
import { API_ENDPOINTS } from "../config/api";
import {
  getWelcomeMessage,
  getWelcomeBackMessage,
  isCohortApproaching,
  getDaysLeft,
} from "../utils/cohortHelper";
import AnimatedBanner from "../common/AnimatedBanner";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeUserId = searchParams.get("resume");

  // State Management
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [screeningResult, setScreeningResult] = useState(null);
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [resumeCheckComplete, setResumeCheckComplete] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registeredUserInfo, setRegisteredUserInfo] = useState({});
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
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

  // Step 4 Pledge Data (renamed from step3)
  const [step4Data, setStep4Data] = useState({
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

  // Resume Registration Logic & Returning User Detection (Combined)
  useEffect(() => {
    const checkResumeRegistration = async () => {
      const savedUserId =
        localStorage.getItem("registrationUserId") || resumeUserId;

      if (!savedUserId) {
        setResumeCheckComplete(true);
        return;
      }

      try {
        const response = await axios.get(
          API_ENDPOINTS.PAYMENT_STATUS(savedUserId),
        );

        if (response.data.success) {
          const { paymentStatus, registrationStatus, isFullyRegistered } =
            response.data.data;

          // Set returning user flag for welcome message
          if (
            paymentStatus === "pending" ||
            (paymentStatus === "completed" &&
              registrationStatus !== "registration_completed")
          ) {
            setIsReturningUser(true);
            setShowBanner(true);
          } else {
            setIsReturningUser(false);
            setShowBanner(true);
          }

          // Case 1: User is fully registered
          if (
            registrationStatus === "registration_completed" ||
            isFullyRegistered
          ) {
            setRegisteredUserInfo({
              name: `${step1Data.firstName} ${step1Data.lastName}`,
              email: step1Data.email,
            });
            setAlreadyRegistered(true);
            setResumeCheckComplete(true);
            return;
          }

          // Case 2: User paid but didn't complete pledge
          if (
            paymentStatus === "completed" &&
            registrationStatus !== "registration_completed"
          ) {
            setUserId(savedUserId);
            setCurrentStep(4);
            setStep4Data((prev) => ({ ...prev, userId: savedUserId }));
            toast.info(
              "Payment confirmed! Please complete your commitment pledge.",
            );
            setResumeCheckComplete(true);
            return;
          }

          // Case 3: User completed screening but didn't pay
          if (
            registrationStatus === "step2_screening_completed" &&
            paymentStatus !== "completed"
          ) {
            setUserId(savedUserId);
            setShowPaymentStep(true);
            toast.info("Please complete your payment to continue.");
            setResumeCheckComplete(true);
            return;
          }

          // Case 4: User completed step 1 only
          if (registrationStatus === "step1_intake_completed") {
            setUserId(savedUserId);
            setCurrentStep(2);
            toast.info("Welcome back! Please complete the screening rubric.");
            setResumeCheckComplete(true);
            return;
          }
        }
      } catch (error) {
        console.error("Resume check error:", error);
      }

      setResumeCheckComplete(true);
    };

    checkResumeRegistration();
  }, [resumeUserId, step1Data.firstName, step1Data.lastName, step1Data.email]); // ← FIXED dependency array

  // Save progress to localStorage
  const saveProgress = (step, userId = null) => {
    if (userId) {
      localStorage.setItem("registrationUserId", userId);
      setUserId(userId);
    }
    if (step) {
      localStorage.setItem("registrationStep", step);
    }
  };

  // Clear progress on successful completion
  const clearProgress = () => {
    localStorage.removeItem("registrationUserId");
    localStorage.removeItem("registrationStep");
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
        API_ENDPOINTS.REGISTER_STEP1,
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
        toast.error(errors.map((e) => e.msg).join(", "));
      } else {
        toast.error(
          error.response?.data?.message || "Step 1 failed. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Submit Screening Rubric
  const handleStep2Submit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER_STEP2, {
        ...data,
        userId,
      });

      if (response.data.success) {
        setScreeningResult(response.data.data);
        saveProgress(2.5, userId);

        if (response.data.data.canProceed) {
          toast.success(response.data.data.eligibilityMessage);
          // Show payment step
          setShowPaymentStep(true);
        } else {
          toast.warning(response.data.data.eligibilityMessage);
        }
      }
    } catch (error) {
      console.error("Step 2 error:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Screening failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Payment Success Handler
  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    setShowPaymentStep(false);
    saveProgress(4, userId);
    setStep4Data((prev) => ({ ...prev, userId }));
    setCurrentStep(4);
    toast.success(
      "Payment successful! Please complete your commitment pledge.",
    );
  };

  // Step 4: Submit Pledge (renamed from step3)
  const handleStep4Submit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER_STEP3, {
        ...data,
        userId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        clearProgress();
        localStorage.setItem("isEnrolled", "true");
        localStorage.setItem("userEmail", step1Data.email);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Step 4 error:", error.response?.data);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler to go directly to pledge (for users who already paid)
  const handleGoToPledge = () => {
    setShowPaymentStep(false);
    setCurrentStep(4);
    setStep4Data((prev) => ({ ...prev, userId }));
    toast.info(
      "Resuming your registration. Please complete your commitment pledge.",
    );
  };
  // Handler to go back from payment to screening
  const handleBackFromPayment = () => {
    setShowPaymentStep(false);
    setCurrentStep(2);
  };

  // Handler to go back from pledge to payment (if needed)
  const handleBackFromPledge = () => {
    setCurrentStep(3);
    setShowPaymentStep(true);
  };

  if (!resumeCheckComplete) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--accent)",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p>Loading your registration...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" theme="dark" />
      <AlreadyRegisteredModal
        isOpen={alreadyRegistered}
        onClose={() => setAlreadyRegistered(false)}
        userEmail={registeredUserInfo.email}
        userName={registeredUserInfo.name}
      />

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
                  gap: "clamp(15px, 4vw, 30px)",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "clamp(35px, 8vw, 40px)",
                      height: "clamp(35px, 8vw, 40px)",
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
                      fontSize: "clamp(10px, 3vw, 12px)",
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
                      width: "clamp(35px, 8vw, 40px)",
                      height: "clamp(35px, 8vw, 40px)",
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
                      fontSize: "clamp(10px, 3vw, 12px)",
                      color:
                        currentStep >= 2
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                    }}
                  >
                    Screening
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "clamp(35px, 8vw, 40px)",
                      height: "clamp(35px, 8vw, 40px)",
                      borderRadius: "50%",
                      background:
                        showPaymentStep || currentStep === 3
                          ? "var(--gradient)"
                          : "var(--border-color)",
                      color:
                        showPaymentStep || currentStep === 3
                          ? "white"
                          : "var(--text-secondary)",
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
                      fontSize: "clamp(10px, 3vw, 12px)",
                      color:
                        showPaymentStep || currentStep === 3
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                    }}
                  >
                    Payment
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "clamp(35px, 8vw, 40px)",
                      height: "clamp(35px, 8vw, 40px)",
                      borderRadius: "50%",
                      background:
                        currentStep >= 4
                          ? "var(--gradient)"
                          : "var(--border-color)",
                      color:
                        currentStep >= 4 ? "white" : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                      fontWeight: "bold",
                    }}
                  >
                    4
                  </div>
                  <span
                    style={{
                      fontSize: "clamp(10px, 3vw, 12px)",
                      color:
                        currentStep >= 4
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                    }}
                  >
                    Pledge
                  </span>
                </div>
              </div>
            </div>
            {/* Animated Welcome Banner - Shows for 5 seconds then disappears */}
            {showBanner && (
              <AnimatedBanner
                message={
                  isReturningUser
                    ? getWelcomeBackMessage()
                    : getWelcomeMessage()
                }
                subMessage={
                  isCohortApproaching() && !isReturningUser
                    ? `⚡ Only ${getDaysLeft()} days left until cohort starts!`
                    : ""
                }
                duration={5000}
                onClose={() => setShowBanner(false)}
              />
            )}
            {/* Step Content */}
            {currentStep === 1 && (
              <Step1IntakeForm
                formData={step1Data}
                setFormData={setStep1Data}
                isSubmitting={isSubmitting}
                onSubmit={handleStep1Submit}
              />
            )}

            {currentStep === 2 && !showPaymentStep && (
              <Step2ScreeningRubric
                formData={step2Data}
                setFormData={setStep2Data}
                isSubmitting={isSubmitting}
                onSubmit={handleStep2Submit}
                screeningResult={screeningResult}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {showPaymentStep && (
              <Step3Payment
                userId={userId}
                userEmail={step1Data.email}
                userName={`${step1Data.firstName} ${step1Data.lastName}`}
                onPaymentSuccess={handlePaymentSuccess}
                onBack={handleBackFromPayment}
                onGoToPledge={handleGoToPledge}
              />
            )}

            {currentStep === 4 && !showPaymentStep && (
              <Step3CommitmentPledge
                formData={step4Data}
                setFormData={setStep4Data}
                isSubmitting={isSubmitting}
                onSubmit={handleStep4Submit}
                userInfo={step1Data}
                onBack={handleBackFromPledge}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Register;
