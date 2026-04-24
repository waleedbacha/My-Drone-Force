import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
  FaChartLine,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const OnboardingModal = ({ isOpen, onClose, user, token }) => {
  const [onboardingData, setOnboardingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [localResponses, setLocalResponses] = useState({});
  const [localScores, setLocalScores] = useState({});
  const [localDates, setLocalDates] = useState({});
  const [savingFields, setSavingFields] = useState({});
  const debounceTimerRef = useRef({});
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      Object.keys(debounceTimerRef.current).forEach((key) => {
        if (debounceTimerRef.current[key]) {
          clearTimeout(debounceTimerRef.current[key]);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (isOpen && user) {
      fetchOnboardingData();
    }
  }, [isOpen, user]);

  useEffect(() => {
    if (onboardingData?.onboarding?.accountability) {
      const responses = {};
      Object.keys(onboardingData.onboarding.accountability).forEach((key) => {
        responses[key] =
          onboardingData.onboarding.accountability[key]?.response || "";
      });
      setLocalResponses(responses);
    }
    // Initialize local scores from fetched data
    if (onboardingData?.onboarding?.phase4) {
      setLocalScores({
        practiceExam1Score:
          onboardingData.onboarding.phase4.practiceExam1Score || 0,
        practiceExam2Score:
          onboardingData.onboarding.phase4.practiceExam2Score || 0,
        practiceExam3Score:
          onboardingData.onboarding.phase4.practiceExam3Score || 0,
      });
    }
  }, [onboardingData]);

  const fetchOnboardingData = async () => {
    try {
      setLoading(true);
      const userId = user?.id || user?._id;
      if (!userId) {
        console.error("No user ID found");
        toast.error("Invalid user ID");
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/api/onboarding/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (isMountedRef.current) {
        setOnboardingData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching onboarding data:", error);
      if (isMountedRef.current) {
        toast.error("Failed to load onboarding data");
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  // Debounced update for text/date fields
  const debouncedUpdate = useCallback(
    (phase, field, value, isDateField = false) => {
      // Clear existing timer for this field
      if (debounceTimerRef.current[`${phase}_${field}`]) {
        clearTimeout(debounceTimerRef.current[`${phase}_${field}`]);
      }

      // Set new timer
      debounceTimerRef.current[`${phase}_${field}`] = setTimeout(
        async () => {
          const userId = user?.id || user?._id;
          setSavingFields((prev) => ({ ...prev, [`${phase}_${field}`]: true }));

          try {
            const updateData = {};
            updateData[field] = value;

            await axios.put(
              `http://localhost:5000/api/onboarding/${userId}/${phase}`,
              updateData,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );

            await fetchOnboardingData();
            if (isMountedRef.current) {
              toast.success("Updated successfully", { autoClose: 1500 });
            }
          } catch (error) {
            console.error("Error updating:", error);
            if (isMountedRef.current) {
              toast.error("Failed to update");
            }
          } finally {
            if (isMountedRef.current) {
              setSavingFields((prev) => ({
                ...prev,
                [`${phase}_${field}`]: false,
              }));
            }
            delete debounceTimerRef.current[`${phase}_${field}`];
          }
        },
        isDateField ? 1000 : 800,
      );
    },
    [user, token],
  );

  const updateCheckbox = async (phase, field, value) => {
    const userId = user?.id || user?._id;
    setSavingFields((prev) => ({ ...prev, [`${phase}_${field}`]: true }));

    try {
      const updateData = {};
      updateData[field] = value;

      await axios.put(
        `http://localhost:5000/api/onboarding/${userId}/${phase}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      await fetchOnboardingData();
      if (isMountedRef.current) {
        toast.success("Updated successfully", { autoClose: 1500 });
      }
    } catch (error) {
      console.error(
        "Error updating checkbox:",
        error.response?.data || error.message,
      );
      if (isMountedRef.current) {
        toast.error("Failed to update");
      }
    } finally {
      if (isMountedRef.current) {
        setSavingFields((prev) => ({ ...prev, [`${phase}_${field}`]: false }));
      }
    }
  };

  const updateScore = async (phase, field, scoreField, value) => {
    // Validate score
    const validScore = Math.min(100, Math.max(0, Number(value) || 0));

    // Update local state immediately for responsive UI
    setLocalScores((prev) => ({ ...prev, [scoreField]: validScore }));
    setSavingFields((prev) => ({ ...prev, [scoreField]: true }));

    const userId = user?.id || user?._id;
    try {
      const updateData = {};
      updateData[field] = true;
      updateData[scoreField] = validScore;

      await axios.put(
        `http://localhost:5000/api/onboarding/${userId}/${phase}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      await fetchOnboardingData();
      if (isMountedRef.current) {
        toast.success("Score updated", { autoClose: 1500 });
      }
    } catch (error) {
      console.error("Error updating score:", error);
      if (isMountedRef.current) {
        toast.error("Failed to update");
      }
    } finally {
      if (isMountedRef.current) {
        setSavingFields((prev) => ({ ...prev, [scoreField]: false }));
      }
    }
  };

  const updateAccountability = async (week, completed, response) => {
    const userId = user?.id || user?._id;
    setSavingFields((prev) => ({ ...prev, [`accountability_${week}`]: true }));

    try {
      await axios.put(
        `http://localhost:5000/api/onboarding/${userId}/accountability`,
        { week, completed, response },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      await fetchOnboardingData();
      if (isMountedRef.current) {
        toast.success("Check-in updated", { autoClose: 1500 });
      }
    } catch (error) {
      console.error("Error updating accountability:", error);
      if (isMountedRef.current) {
        toast.error("Failed to update check-in");
      }
    } finally {
      if (isMountedRef.current) {
        setSavingFields((prev) => ({
          ...prev,
          [`accountability_${week}`]: false,
        }));
      }
    }
  };

  const handleAccountabilityResponseChange = useCallback(
    (week, value) => {
      const weekKey = week === 4 ? "finalCheckin" : `week${week}Checkin`;

      // Update local state immediately
      setLocalResponses((prev) => ({ ...prev, [weekKey]: value }));

      // Clear existing timer
      if (debounceTimerRef.current[`accountability_${week}`]) {
        clearTimeout(debounceTimerRef.current[`accountability_${week}`]);
      }

      // Set new debounced timer
      debounceTimerRef.current[`accountability_${week}`] = setTimeout(
        async () => {
          const currentCompleted =
            onboardingData?.onboarding?.accountability?.[weekKey]?.completed ||
            false;
          const userId = user?.id || user?._id;

          setSavingFields((prev) => ({
            ...prev,
            [`accountability_${week}`]: true,
          }));

          try {
            await axios.put(
              `http://localhost:5000/api/onboarding/${userId}/accountability`,
              { week, completed: currentCompleted, response: value },
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
            await fetchOnboardingData();
            if (isMountedRef.current) {
              toast.success("Response saved", { autoClose: 1500 });
            }
          } catch (error) {
            console.error("Error saving response:", error);
            if (isMountedRef.current) {
              toast.error("Failed to save response");
            }
          } finally {
            if (isMountedRef.current) {
              setSavingFields((prev) => ({
                ...prev,
                [`accountability_${week}`]: false,
              }));
            }
            delete debounceTimerRef.current[`accountability_${week}`];
          }
        },
        1000,
      );
    },
    [onboardingData, user, token],
  );

  const updateFinalOutcome = async (field, value) => {
    const userId = user?.id || user?._id;
    setSavingFields((prev) => ({ ...prev, [field]: true }));

    try {
      const updateData = { [field]: value };
      await axios.put(
        `http://localhost:5000/api/onboarding/${userId}/final-outcome`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      await fetchOnboardingData();
      if (isMountedRef.current) {
        toast.success("Final outcome updated", { autoClose: 1500 });
      }
    } catch (error) {
      console.error("Error updating final outcome:", error);
      if (isMountedRef.current) {
        toast.error("Failed to update");
      }
    } finally {
      if (isMountedRef.current) {
        setSavingFields((prev) => ({ ...prev, [field]: false }));
      }
    }
  };

  const handleExamResultChange = async (value) => {
    if (value !== "PENDING") {
      const confirmMessage =
        value === "PASSED"
          ? "Are you sure you want to mark this exam as PASSED? This will mark the program as completed."
          : "Are you sure you want to mark this exam as FAILED?";

      if (!window.confirm(confirmMessage)) {
        return;
      }
    }
    await updateFinalOutcome("faaExamResult", value);
  };

  const getProgressPercentage = () => {
    if (!onboardingData) return 0;
    return onboardingData.progressPercentage || 0;
  };

  // Helper to check if a specific field is saving
  const isFieldSaving = (key) => savingFields[key] || saving;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(5px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          overflowY: "auto",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            background: "var(--card-bg)",
            borderRadius: "20px",
            maxWidth: "1200px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              position: "sticky",
              top: 0,
              background: "var(--gradient)",
              padding: "20px 30px",
              borderRadius: "20px 20px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <div>
              <h2 style={{ color: "white", margin: 0 }}>
                PARTICIPANT ONBOARDING, MONITORING, AND EVALUATION CHECKLIST
              </h2>
              <p style={{ color: "rgba(255,255,255,0.9)", margin: "5px 0 0" }}>
                Goal: Maintain a 60% pass rate on all FAA Part 107 exams
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaTimes color="white" size={20} />
            </button>
          </div>

          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              <FaSpinner
                style={{
                  animation: "spin 1s linear infinite",
                  fontSize: "40px",
                  marginBottom: "20px",
                }}
              />
              <p>Loading onboarding data...</p>
            </div>
          ) : (
            <div style={{ padding: "30px" }}>
              {/* Saving Indicator */}
              {saving && (
                <div
                  style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    background: "var(--accent)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    zIndex: 100,
                  }}
                >
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                  Saving...
                </div>
              )}

              {/* Participant Info */}
              <div
                style={{
                  background: "var(--bg-secondary)",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div>
                  <strong>Participant Name:</strong>{" "}
                  {user?.name || `${user?.firstName} ${user?.lastName}`}
                </div>
                <div>
                  <strong>Cohort Start Date:</strong>{" "}
                  <input
                    type="date"
                    value={
                      onboardingData?.onboarding?.phase1?.cohortStartDate?.split(
                        "T",
                      )[0] || ""
                    }
                    onChange={(e) => {
                      // Update local state immediately
                      setOnboardingData((prev) => ({
                        ...prev,
                        onboarding: {
                          ...prev.onboarding,
                          phase1: {
                            ...prev.onboarding.phase1,
                            cohortStartDate: e.target.value,
                          },
                        },
                      }));
                      debouncedUpdate(
                        "phase1",
                        "cohortStartDate",
                        e.target.value,
                        true,
                      );
                    }}
                    className="form-control"
                    style={{
                      display: "inline-block",
                      width: "150px",
                      marginLeft: "10px",
                    }}
                    disabled={isFieldSaving("phase1_cohortStartDate")}
                  />
                  {isFieldSaving("phase1_cohortStartDate") && (
                    <FaSpinner
                      style={{
                        marginLeft: "8px",
                        animation: "spin 1s linear infinite",
                      }}
                      size={12}
                    />
                  )}
                </div>
                <div>
                  <strong>Progress:</strong>{" "}
                  <span style={{ color: "var(--accent)" }}>
                    {getProgressPercentage()}%
                  </span>
                  <div
                    style={{
                      width: "100px",
                      height: "4px",
                      background: "var(--border-color)",
                      borderRadius: "2px",
                      marginTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: `${getProgressPercentage()}%`,
                        height: "100%",
                        background: "var(--gradient)",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* PHASE 1: PRE-ENROLLMENT */}
              <PhaseCard
                phaseName="phase1"
                title="PHASE 1: PRE-ENROLLMENT (Before Class Starts)"
                subtitle="Goal: Filter + Prepare"
                data={onboardingData?.onboarding?.phase1}
                savingFields={savingFields}
                fields={[
                  {
                    key: "applicationReceived",
                    label: "Completed application received",
                  },
                  {
                    key: "screeningCompleted",
                    label:
                      "Screening checklist completed (all Basic Eligibility requirements met)",
                  },
                  {
                    key: "pledgeSigned",
                    label: "Participant Commitment Agreement signed",
                  },
                  {
                    key: "orientationCallScheduled",
                    label: "Mandatory Orientation Call scheduled (30–45 min)",
                  },
                  {
                    key: "orientationCompleted",
                    label:
                      "Orientation completed: expectations, study requirements, exam timeline, pass strategies",
                  },
                ]}
                onUpdate={updateCheckbox}
              />

              {/* PHASE 2: WEEK 0 */}
              <PhaseCard
                phaseName="phase2"
                title="PHASE 2: WEEK 0 (Pre-Class Setup)"
                subtitle="Goal: Eliminate confusion before training starts"
                data={onboardingData?.onboarding?.phase2}
                savingFields={savingFields}
                fields={[
                  {
                    key: "studyMaterialsProvided",
                    label: "Study materials provided",
                  },
                  {
                    key: "loginInstructionsSent",
                    label: "Login instructions sent",
                  },
                  {
                    key: "classScheduleShared",
                    label: "Class schedule shared",
                  },
                  {
                    key: "examOverviewProvided",
                    label: "Exam overview provided",
                  },
                  {
                    key: "studyGuidanceProvided",
                    label: "Study guidance provided (how to study effectively)",
                  },
                  {
                    key: "day1PreWorkAssigned",
                    label: "Day 1 pre-work assigned",
                  },
                ]}
                onUpdate={updateCheckbox}
              />

              {/* PHASE 3: TRAINING PERIOD */}
              <PhaseCard
                phaseName="phase3"
                title="PHASE 3: TRAINING PERIOD (3-Day Core Program)"
                subtitle="Goal: Engagement + Clarity"
                data={onboardingData?.onboarding?.phase3}
                savingFields={savingFields}
                fields={[
                  {
                    key: "day1Completed",
                    label:
                      "Day 1 training completed – interactive sessions, real FAA-style questions",
                  },
                  {
                    key: "day2Completed",
                    label:
                      "Day 2 training completed – group problem solving, live explanations",
                  },
                  {
                    key: "day3Completed",
                    label:
                      "Day 3 training completed – daily reinforcement of key exam topics",
                  },
                  {
                    key: "engagementVerified",
                    label:
                      "Participant engagement verified (active participation throughout)",
                  },
                ]}
                onUpdate={updateCheckbox}
              />

              {/* PHASE 4: POST-TRAINING */}
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "var(--accent)",
                    borderLeft: "3px solid var(--accent)",
                    paddingLeft: "15px",
                  }}
                >
                  ⭐ PHASE 4: POST-TRAINING (14–30 Day Success Window) – MOST
                  IMPORTANT
                </h3>
                <div
                  style={{
                    background: "var(--bg-secondary)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {/* Week 1 */}
                  <div
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <h4
                      style={{
                        marginBottom: "15px",
                        color: "var(--text-primary)",
                      }}
                    >
                      Week 1
                    </h4>
                    <CheckboxField
                      label="Daily study assignments sent/confirmed"
                      checked={
                        onboardingData?.onboarding?.phase4?.dailyStudyConfirmed
                      }
                      onToggle={() =>
                        updateCheckbox(
                          "phase4",
                          "dailyStudyConfirmed",
                          !onboardingData?.onboarding?.phase4
                            ?.dailyStudyConfirmed,
                        )
                      }
                      isSaving={isFieldSaving("phase4_dailyStudyConfirmed")}
                    />
                    <div style={{ marginLeft: "30px", marginTop: "10px" }}>
                      <ScoreField
                        label="Practice Exam #1 completed"
                        score={
                          localScores.practiceExam1Score ||
                          onboardingData?.onboarding?.phase4
                            ?.practiceExam1Score ||
                          0
                        }
                        checked={
                          onboardingData?.onboarding?.phase4
                            ?.practiceExam1Completed
                        }
                        onToggle={() =>
                          updateCheckbox(
                            "phase4",
                            "practiceExam1Completed",
                            !onboardingData?.onboarding?.phase4
                              ?.practiceExam1Completed,
                          )
                        }
                        onScoreChange={(score) =>
                          updateScore(
                            "phase4",
                            "practiceExam1Completed",
                            "practiceExam1Score",
                            score,
                          )
                        }
                        isSaving={isFieldSaving("practiceExam1Score")}
                      />
                    </div>
                    <CheckboxField
                      label="Group study session attended (optional but encouraged)"
                      checked={
                        onboardingData?.onboarding?.phase4?.groupStudyAttended
                      }
                      onToggle={() =>
                        updateCheckbox(
                          "phase4",
                          "groupStudyAttended",
                          !onboardingData?.onboarding?.phase4
                            ?.groupStudyAttended,
                        )
                      }
                      isSaving={isFieldSaving("phase4_groupStudyAttended")}
                      style={{ marginLeft: "30px" }}
                    />
                  </div>

                  {/* Week 2 */}
                  <div
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <h4
                      style={{
                        marginBottom: "15px",
                        color: "var(--text-primary)",
                      }}
                    >
                      Week 2
                    </h4>
                    <div style={{ marginLeft: "30px" }}>
                      <ScoreField
                        label="Practice Exam #2 completed"
                        score={
                          localScores.practiceExam2Score ||
                          onboardingData?.onboarding?.phase4
                            ?.practiceExam2Score ||
                          0
                        }
                        checked={
                          onboardingData?.onboarding?.phase4
                            ?.practiceExam2Completed
                        }
                        onToggle={() =>
                          updateCheckbox(
                            "phase4",
                            "practiceExam2Completed",
                            !onboardingData?.onboarding?.phase4
                              ?.practiceExam2Completed,
                          )
                        }
                        onScoreChange={(score) =>
                          updateScore(
                            "phase4",
                            "practiceExam2Completed",
                            "practiceExam2Score",
                            score,
                          )
                        }
                        isSaving={isFieldSaving("practiceExam2Score")}
                      />
                    </div>
                    <CheckboxField
                      label="Weak areas identified"
                      checked={
                        onboardingData?.onboarding?.phase4?.weakAreasIdentified
                      }
                      onToggle={() =>
                        updateCheckbox(
                          "phase4",
                          "weakAreasIdentified",
                          !onboardingData?.onboarding?.phase4
                            ?.weakAreasIdentified,
                        )
                      }
                      isSaving={isFieldSaving("phase4_weakAreasIdentified")}
                      style={{ marginLeft: "30px" }}
                    />
                    <CheckboxField
                      label="Targeted review session completed"
                      checked={
                        onboardingData?.onboarding?.phase4
                          ?.targetedReviewCompleted
                      }
                      onToggle={() =>
                        updateCheckbox(
                          "phase4",
                          "targetedReviewCompleted",
                          !onboardingData?.onboarding?.phase4
                            ?.targetedReviewCompleted,
                        )
                      }
                      isSaving={isFieldSaving("phase4_targetedReviewCompleted")}
                      style={{ marginLeft: "30px" }}
                    />
                  </div>

                  {/* Week 3 */}
                  <div style={{ padding: "20px" }}>
                    <h4
                      style={{
                        marginBottom: "15px",
                        color: "var(--text-primary)",
                      }}
                    >
                      Week 3
                    </h4>
                    <div style={{ marginLeft: "30px" }}>
                      <ScoreField
                        label="Practice Exam #3 completed"
                        score={
                          localScores.practiceExam3Score ||
                          onboardingData?.onboarding?.phase4
                            ?.practiceExam3Score ||
                          0
                        }
                        checked={
                          onboardingData?.onboarding?.phase4
                            ?.practiceExam3Completed
                        }
                        onToggle={() =>
                          updateCheckbox(
                            "phase4",
                            "practiceExam3Completed",
                            !onboardingData?.onboarding?.phase4
                              ?.practiceExam3Completed,
                          )
                        }
                        onScoreChange={(score) =>
                          updateScore(
                            "phase4",
                            "practiceExam3Completed",
                            "practiceExam3Score",
                            score,
                          )
                        }
                        isSaving={isFieldSaving("practiceExam3Score")}
                      />
                    </div>
                    <CheckboxField
                      label="Required score achieved (70–80% minimum before FAA test)"
                      checked={
                        onboardingData?.onboarding?.phase4
                          ?.requiredScoreAchieved
                      }
                      onToggle={() =>
                        updateCheckbox(
                          "phase4",
                          "requiredScoreAchieved",
                          !onboardingData?.onboarding?.phase4
                            ?.requiredScoreAchieved,
                        )
                      }
                      isSaving={isFieldSaving("phase4_requiredScoreAchieved")}
                      style={{ marginLeft: "30px" }}
                    />
                    <CheckboxField
                      label="Exam Readiness Session attended (optional – high impact)"
                      checked={
                        onboardingData?.onboarding?.phase4
                          ?.examReadinessAttended
                      }
                      onToggle={() =>
                        updateCheckbox(
                          "phase4",
                          "examReadinessAttended",
                          !onboardingData?.onboarding?.phase4
                            ?.examReadinessAttended,
                        )
                      }
                      isSaving={isFieldSaving("phase4_examReadinessAttended")}
                      style={{ marginLeft: "30px" }}
                    />
                    <CheckboxField
                      label="Last-Minute Cram Session attended (optional)"
                      checked={
                        onboardingData?.onboarding?.phase4
                          ?.lastMinuteCramAttended
                      }
                      onToggle={() =>
                        updateCheckbox(
                          "phase4",
                          "lastMinuteCramAttended",
                          !onboardingData?.onboarding?.phase4
                            ?.lastMinuteCramAttended,
                        )
                      }
                      isSaving={isFieldSaving("phase4_lastMinuteCramAttended")}
                      style={{ marginLeft: "30px" }}
                    />
                    {/* NEW: Exam Scheduled Within Deadline */}
                    <CheckboxField
                      label="Exam scheduled within deadline"
                      checked={
                        onboardingData?.onboarding?.phase4
                          ?.examScheduledWithinDeadline
                      }
                      onToggle={() =>
                        updateCheckbox(
                          "phase4",
                          "examScheduledWithinDeadline",
                          !onboardingData?.onboarding?.phase4
                            ?.examScheduledWithinDeadline,
                        )
                      }
                      isSaving={isFieldSaving(
                        "phase4_examScheduledWithinDeadline",
                      )}
                      style={{ marginLeft: "30px", marginTop: "10px" }}
                    />
                  </div>
                </div>
              </div>

              {/* EXAM READINESS RULE */}
              <div
                style={{
                  background: "rgba(255, 152, 0, 0.1)",
                  borderLeft: "3px solid #ff9800",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "30px",
                }}
              >
                <h4 style={{ color: "#ff9800", marginBottom: "15px" }}>
                  ⚠️ EXAM READINESS RULE – Do NOT take FAA test until:
                </h4>
                <div style={{ marginLeft: "20px" }}>
                  <CheckboxField
                    label="Participant scores at least 80–85% on practice exams"
                    checked={
                      onboardingData?.onboarding?.phase4?.practiceScore80Percent
                    }
                    onToggle={() =>
                      updateCheckbox(
                        "phase4",
                        "practiceScore80Percent",
                        !onboardingData?.onboarding?.phase4
                          ?.practiceScore80Percent,
                      )
                    }
                    isSaving={isFieldSaving("phase4_practiceScore80Percent")}
                  />
                  <CheckboxField
                    label="Participant expresses confidence in key sections"
                    checked={
                      onboardingData?.onboarding?.phase4?.participantConfident
                    }
                    onToggle={() =>
                      updateCheckbox(
                        "phase4",
                        "participantConfident",
                        !onboardingData?.onboarding?.phase4
                          ?.participantConfident,
                      )
                    }
                    isSaving={isFieldSaving("phase4_participantConfident")}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      FAA exam scheduled within 30-day deadline or no later
                      than:
                    </label>
                    <input
                      type="date"
                      value={
                        onboardingData?.onboarding?.phase4?.examScheduledDate?.split(
                          "T",
                        )[0] || ""
                      }
                      onChange={(e) => {
                        setOnboardingData((prev) => ({
                          ...prev,
                          onboarding: {
                            ...prev.onboarding,
                            phase4: {
                              ...prev.onboarding.phase4,
                              examScheduledDate: e.target.value,
                            },
                          },
                        }));
                        debouncedUpdate(
                          "phase4",
                          "examScheduledDate",
                          e.target.value,
                          true,
                        );
                      }}
                      className="form-control"
                      style={{
                        width: "200px",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                      disabled={isFieldSaving("phase4_examScheduledDate")}
                    />
                    {isFieldSaving("phase4_examScheduledDate") && (
                      <FaSpinner
                        style={{
                          marginLeft: "8px",
                          animation: "spin 1s linear infinite",
                        }}
                        size={12}
                      />
                    )}
                    <label style={{ fontSize: "13px", marginLeft: "10px" }}>
                      Exam Date:
                    </label>
                    <input
                      type="date"
                      value={
                        onboardingData?.onboarding?.phase4?.examDate?.split(
                          "T",
                        )[0] || ""
                      }
                      onChange={(e) => {
                        setOnboardingData((prev) => ({
                          ...prev,
                          onboarding: {
                            ...prev.onboarding,
                            phase4: {
                              ...prev.onboarding.phase4,
                              examDate: e.target.value,
                            },
                          },
                        }));
                        debouncedUpdate(
                          "phase4",
                          "examDate",
                          e.target.value,
                          true,
                        );
                      }}
                      className="form-control"
                      style={{
                        width: "150px",
                        display: "inline-block",
                        marginLeft: "5px",
                      }}
                      disabled={isFieldSaving("phase4_examDate")}
                    />
                    {isFieldSaving("phase4_examDate") && (
                      <FaSpinner
                        style={{
                          marginLeft: "8px",
                          animation: "spin 1s linear infinite",
                        }}
                        size={12}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* ACCOUNTABILITY SYSTEM */}
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "var(--accent)",
                    borderLeft: "3px solid var(--accent)",
                    paddingLeft: "15px",
                  }}
                >
                  🔄 ACCOUNTABILITY SYSTEM (Game Changer)
                </h3>
                <div
                  style={{
                    background: "var(--bg-secondary)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {[1, 2, 3, 4].map((week) => {
                    const weekKey =
                      week === 4 ? "finalCheckin" : `week${week}Checkin`;
                    const checkinData =
                      onboardingData?.onboarding?.accountability?.[weekKey];

                    return (
                      <AccountabilityRow
                        key={week}
                        week={week}
                        weekKey={weekKey}
                        checkinData={checkinData}
                        localResponse={localResponses[weekKey] || ""}
                        onResponseChange={handleAccountabilityResponseChange}
                        onCompletedChange={updateAccountability}
                        isSaving={isFieldSaving(`accountability_${week}`)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* FINAL OUTCOME */}
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "var(--accent)",
                    borderLeft: "3px solid var(--accent)",
                    paddingLeft: "15px",
                  }}
                >
                  📋 FINAL OUTCOME
                </h3>
                <div
                  style={{
                    background: "var(--bg-secondary)",
                    borderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontSize: "13px",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        FAA Exam Date:
                      </label>
                      <input
                        type="date"
                        value={
                          onboardingData?.onboarding?.finalOutcome?.faaExamDate?.split(
                            "T",
                          )[0] || ""
                        }
                        onChange={(e) => {
                          setOnboardingData((prev) => ({
                            ...prev,
                            onboarding: {
                              ...prev.onboarding,
                              finalOutcome: {
                                ...prev.onboarding.finalOutcome,
                                faaExamDate: e.target.value,
                              },
                            },
                          }));
                          debouncedUpdate(
                            "final-outcome",
                            "faaExamDate",
                            e.target.value,
                            true,
                          );
                        }}
                        className="form-control"
                        disabled={isFieldSaving("faaExamDate")}
                      />
                      {isFieldSaving("faaExamDate") && (
                        <FaSpinner
                          style={{
                            marginLeft: "8px",
                            animation: "spin 1s linear infinite",
                          }}
                          size={12}
                        />
                      )}
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: "13px",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        FAA Exam Result:
                      </label>
                      <select
                        value={
                          onboardingData?.onboarding?.finalOutcome
                            ?.faaExamResult || "PENDING"
                        }
                        onChange={(e) => handleExamResultChange(e.target.value)}
                        className="form-control"
                        disabled={isFieldSaving("faaExamResult")}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PASSED">PASSED</option>
                        <option value="FAILED">FAILED</option>
                      </select>
                      {isFieldSaving("faaExamResult") && (
                        <FaSpinner
                          style={{
                            marginLeft: "8px",
                            animation: "spin 1s linear infinite",
                          }}
                          size={12}
                        />
                      )}
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: "13px",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Final Score:
                      </label>
                      <input
                        type="number"
                        value={
                          onboardingData?.onboarding?.finalOutcome
                            ?.finalScore || 0
                        }
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setOnboardingData((prev) => ({
                            ...prev,
                            onboarding: {
                              ...prev.onboarding,
                              finalOutcome: {
                                ...prev.onboarding.finalOutcome,
                                finalScore: value,
                              },
                            },
                          }));
                          debouncedUpdate(
                            "final-outcome",
                            "finalScore",
                            value,
                            true,
                          );
                        }}
                        className="form-control"
                        style={{ width: "100px", display: "inline-block" }}
                        min="0"
                        max="100"
                        disabled={isFieldSaving("finalScore")}
                      />
                      <span style={{ marginLeft: "5px" }}>%</span>
                      {isFieldSaving("finalScore") && (
                        <FaSpinner
                          style={{
                            marginLeft: "8px",
                            animation: "spin 1s linear infinite",
                          }}
                          size={12}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          fontSize: "13px",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Evaluator Signature:
                      </label>
                      <input
                        type="text"
                        value={
                          onboardingData?.onboarding?.finalOutcome
                            ?.evaluatorName || ""
                        }
                        onChange={(e) => {
                          setOnboardingData((prev) => ({
                            ...prev,
                            onboarding: {
                              ...prev.onboarding,
                              finalOutcome: {
                                ...prev.onboarding.finalOutcome,
                                evaluatorName: e.target.value,
                              },
                            },
                          }));
                          debouncedUpdate(
                            "final-outcome",
                            "evaluatorName",
                            e.target.value,
                            true,
                          );
                        }}
                        className="form-control"
                        placeholder="Enter evaluator name"
                        disabled={isFieldSaving("evaluatorName")}
                      />
                      {isFieldSaving("evaluatorName") && (
                        <FaSpinner
                          style={{
                            marginLeft: "8px",
                            animation: "spin 1s linear infinite",
                          }}
                          size={12}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          fontSize: "13px",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Evaluator Date:
                      </label>
                      <input
                        type="date"
                        value={
                          onboardingData?.onboarding?.finalOutcome?.evaluatorDate?.split(
                            "T",
                          )[0] || new Date().toISOString().split("T")[0]
                        }
                        onChange={(e) => {
                          setOnboardingData((prev) => ({
                            ...prev,
                            onboarding: {
                              ...prev.onboarding,
                              finalOutcome: {
                                ...prev.onboarding.finalOutcome,
                                evaluatorDate: e.target.value,
                              },
                            },
                          }));
                          debouncedUpdate(
                            "final-outcome",
                            "evaluatorDate",
                            e.target.value,
                            true,
                          );
                        }}
                        className="form-control"
                        disabled={isFieldSaving("evaluatorDate")}
                      />
                      {isFieldSaving("evaluatorDate") && (
                        <FaSpinner
                          style={{
                            marginLeft: "8px",
                            animation: "spin 1s linear infinite",
                          }}
                          size={12}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* STRATEGIC INSIGHT */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05))",
                  borderLeft: "3px solid #2196f3",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h4 style={{ color: "#2196f3", marginBottom: "10px" }}>
                  💡 STRATEGIC INSIGHT
                </h4>
                <p style={{ margin: 0 }}>
                  Your biggest risk is NOT your teaching—it's unqualified or
                  uncommitted participants. These three tools mitigate this
                  risk: ✓ Filter the right people ✓ Set expectations early ✓
                  Maintain accountability
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Separate component for Accountability Row
const AccountabilityRow = ({
  week,
  weekKey,
  checkinData,
  localResponse,
  onResponseChange,
  onCompletedChange,
  isSaving,
}) => {
  const [localValue, setLocalValue] = useState(localResponse);
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalValue(localResponse);
  }, [localResponse]);

  const handleResponseChange = (value) => {
    setLocalValue(value);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onResponseChange(week, value);
    }, 1000);
  };

  const handleCompletedChange = (e) => {
    onCompletedChange(week, e.target.checked, localValue);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      style={{
        padding: "15px 20px",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontWeight: "bold", minWidth: "150px" }}>
          Week {week} check-in (text/email/Zoom)
        </span>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={checkinData?.completed || false}
            onChange={handleCompletedChange}
            disabled={isSaving}
          />
          Completed
        </label>
        <input
          type="text"
          placeholder="Response/Notes"
          className="form-control"
          style={{ flex: 1, minWidth: "200px" }}
          value={localValue}
          onChange={(e) => handleResponseChange(e.target.value)}
          disabled={isSaving}
        />
        {isSaving && (
          <FaSpinner
            style={{ animation: "spin 1s linear infinite" }}
            size={14}
          />
        )}
      </div>
    </div>
  );
};

// Helper Components
const PhaseCard = ({
  title,
  subtitle,
  data,
  fields,
  onUpdate,
  phaseName,
  savingFields,
}) => (
  <div style={{ marginBottom: "30px" }}>
    <h3
      style={{
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "5px",
        color: "var(--accent)",
        borderLeft: "3px solid var(--accent)",
        paddingLeft: "15px",
      }}
    >
      {title}
    </h3>
    <p
      style={{
        fontSize: "13px",
        color: "var(--text-secondary)",
        marginBottom: "15px",
        marginLeft: "18px",
      }}
    >
      {subtitle}
    </p>
    <div
      style={{
        background: "var(--bg-secondary)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {fields.map((field) => (
        <div
          key={field.key}
          style={{
            padding: "12px 20px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                flex: 1,
              }}
            >
              <input
                type="checkbox"
                checked={data?.[field.key] === true}
                onChange={() =>
                  onUpdate(phaseName, field.key, !data?.[field.key])
                }
                disabled={savingFields?.[`${phaseName}_${field.key}`]}
              />
              <span style={{ fontSize: "14px" }}>{field.label}</span>
              {data?.[field.key] && (
                <FaCheckCircle
                  style={{
                    color: "#4caf50",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                />
              )}
            </label>
            {data?.[`${field.key}Date`] && (
              <span
                style={{ fontSize: "12px", color: "var(--text-secondary)" }}
              >
                <FaCalendarAlt style={{ marginRight: "5px" }} />
                {new Date(data[`${field.key}Date`]).toLocaleDateString()}
              </span>
            )}
            {savingFields?.[`${phaseName}_${field.key}`] && (
              <FaSpinner
                style={{ animation: "spin 1s linear infinite" }}
                size={12}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CheckboxField = ({ label, checked, onToggle, isSaving, style = {} }) => (
  <div style={{ padding: "8px 0", ...style }}>
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked === true}
        onChange={onToggle}
        disabled={isSaving}
      />
      <span style={{ fontSize: "14px" }}>{label}</span>
      {checked && (
        <FaCheckCircle style={{ color: "#4caf50", fontSize: "14px" }} />
      )}
      {isSaving && (
        <FaSpinner
          style={{ animation: "spin 1s linear infinite", marginLeft: "8px" }}
          size={12}
        />
      )}
    </label>
  </div>
);

const ScoreField = ({
  label,
  score,
  checked,
  onToggle,
  onScoreChange,
  isSaving,
}) => {
  const [localScore, setLocalScore] = useState(score);
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalScore(score);
  }, [score]);

  const handleScoreChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setLocalScore(value);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onScoreChange(value);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div style={{ padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={checked === true}
            onChange={onToggle}
            disabled={isSaving}
          />
          <span style={{ fontSize: "14px" }}>{label}</span>
        </label>
        {checked && (
          <>
            <span style={{ fontSize: "13px" }}>Score:</span>
            <input
              type="number"
              value={localScore}
              onChange={handleScoreChange}
              className="form-control"
              style={{ width: "80px", display: "inline-block" }}
              min="0"
              max="100"
              disabled={isSaving}
            />
            <span>%</span>
            {isSaving && (
              <FaSpinner
                style={{ animation: "spin 1s linear infinite" }}
                size={12}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OnboardingModal;
