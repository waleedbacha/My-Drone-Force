import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaFileExcel, FaSpinner } from "react-icons/fa";

const ExportToExcel = ({ users, token, onExportStart, onExportComplete }) => {
  const [exporting, setExporting] = useState(false);

  // Fetch onboarding data for a single user
  const fetchUserOnboarding = async (user) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/onboarding/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data.data?.onboarding || {};
    } catch (error) {
      console.error(`Error fetching onboarding for ${user._id}:`, error);
      return {};
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  // Format date to readable string
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  // Get CSS class for score coloring
  const getScoreClass = (score) => {
    if (score >= 80) return "score-success";
    if (score >= 60) return "score-warning";
    return "score-danger";
  };

  // Get CSS class for row coloring based on status
  const getRowClass = (faaResult, eligibility) => {
    if (faaResult === "PASSED") return "row-passed";
    if (faaResult === "FAILED") return "row-failed";
    if (faaResult === "SCHEDULED") return "row-scheduled";
    if (eligibility === "eligible") return "row-eligible";
    if (eligibility === "not_eligible") return "row-not-eligible";
    return "";
  };

  // Build complete user data object with onboarding info
  const buildUserExportData = async (user, onboarding, index) => {
    const eligibility =
      user.screeningRubric?.eligibilityStatus || "Not completed";
    const examResult = onboarding.finalOutcome?.faaExamResult || "PENDING";

    // Calculate phase completion counts
    const phase1Completed = onboarding.phase1
      ? [
          onboarding.phase1.applicationReceived,
          onboarding.phase1.screeningCompleted,
          onboarding.phase1.pledgeSigned,
          onboarding.phase1.orientationCallScheduled,
          onboarding.phase1.orientationCompleted,
        ].filter(Boolean).length
      : 0;

    const phase2Completed = onboarding.phase2
      ? [
          onboarding.phase2.studyMaterialsProvided,
          onboarding.phase2.loginInstructionsSent,
          onboarding.phase2.classScheduleShared,
          onboarding.phase2.examOverviewProvided,
          onboarding.phase2.studyGuidanceProvided,
          onboarding.phase2.day1PreWorkAssigned,
        ].filter(Boolean).length
      : 0;

    const phase3Completed = onboarding.phase3
      ? [
          onboarding.phase3.day1Completed,
          onboarding.phase3.day2Completed,
          onboarding.phase3.day3Completed,
          onboarding.phase3.engagementVerified,
        ].filter(Boolean).length
      : 0;

    const phase4Completed = onboarding.phase4
      ? [
          onboarding.phase4.dailyStudyConfirmed,
          onboarding.phase4.practiceExam1Completed,
          onboarding.phase4.groupStudyAttended,
          onboarding.phase4.practiceExam2Completed,
          onboarding.phase4.weakAreasIdentified,
          onboarding.phase4.targetedReviewCompleted,
          onboarding.phase4.practiceExam3Completed,
          onboarding.phase4.requiredScoreAchieved,
          onboarding.phase4.examReadinessAttended,
          onboarding.phase4.lastMinuteCramAttended,
          onboarding.phase4.practiceScore80Percent,
          onboarding.phase4.participantConfident,
        ].filter(Boolean).length
      : 0;

    return {
      index: index + 1,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      age: calculateAge(user.dateOfBirth),
      dateOfBirth: formatDate(user.dateOfBirth),
      address:
        `${user.address || ""}, ${user.city || ""}, ${user.state || ""} ${user.zipCode || ""}`.trim(),
      courseInterest: user.courseInterest || "N/A",
      cohortMonth: user.cohortMonth || "N/A",
      cohortStartDate: onboarding.phase1?.cohortStartDate
        ? formatDate(onboarding.phase1.cohortStartDate)
        : "N/A",
      registrationDate: formatDate(user.createdAt),

      // Screening scores
      screeningStatus: eligibility,
      screeningPercentage: user.screeningRubric?.percentage || 0,
      section1: user.screeningRubric?.section1Score || 0,
      section2: user.screeningRubric?.section2Score || 0,
      section3: user.screeningRubric?.section3Score || 0,
      section4: user.screeningRubric?.section4Score || 0,
      totalScore: user.screeningRubric?.totalScore || 0,

      // Onboarding verification
      englishProficiency: user.englishProficiency ? "Yes" : "No",
      programCommitment: user.programCommitment ? "Yes" : "No",
      techAccess: user.techAccess ? "Yes" : "No",

      // Phase completion
      phase1Completed: `${phase1Completed}/5`,
      phase2Completed: `${phase2Completed}/6`,
      phase3Completed: `${phase3Completed}/4`,
      phase4Completed: `${phase4Completed}/12`,

      // Practice exams
      practiceExam1: onboarding.phase4?.practiceExam1Score || 0,
      practiceExam2: onboarding.phase4?.practiceExam2Score || 0,
      practiceExam3: onboarding.phase4?.practiceExam3Score || 0,

      // FAA Exam
      faaResult: examResult,
      faaDate: onboarding.finalOutcome?.faaExamDate
        ? formatDate(onboarding.finalOutcome.faaExamDate)
        : "N/A",
      faaScore: onboarding.finalOutcome?.finalScore || 0,

      // Signature
      electronicSignature: user.electronicSignature ? "Signed" : "Not signed",
      signatureDate: formatDate(user.signatureDate),
      printedName: user.printedName || "N/A",
      ipAddress: user.signatureIpAddress || "N/A",

      // Row class for styling
      rowClass: getRowClass(examResult, eligibility),
      scoreClass: getScoreClass,
    };
  };

  // Generate complete HTML for Excel export
  const generateExcelHTML = (usersData) => {
    const passedCount = usersData.filter(
      (u) => u.faaResult === "PASSED",
    ).length;
    const scheduledCount = usersData.filter(
      (u) => u.faaResult === "SCHEDULED",
    ).length;
    const pendingCount = usersData.filter(
      (u) => u.faaResult === "PENDING",
    ).length;
    const eligibleCount = usersData.filter(
      (u) => u.screeningStatus === "eligible",
    ).length;
    const highScoreCount = usersData.filter(
      (u) => u.screeningPercentage >= 80,
    ).length;

    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>My Drone Force - Complete Export</title>
      <style>
        * {
          font-family: 'Segoe UI', 'Calibri', Arial, sans-serif;
          box-sizing: border-box;
        }
        body {
          padding: 20px;
          background: #ffffff;
        }
        
        /* Header Styles */
        .header {
          text-align: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 3px solid #1e40af;
        }
        .header h1 {
          color: #1e40af;
          margin: 0;
          font-size: 24px;
          letter-spacing: 1px;
        }
        .header p {
          color: #6b7280;
          margin: 5px 0 0;
          font-size: 12px;
        }
        
        /* Summary Cards */
        .summary-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 25px;
          justify-content: space-between;
        }
        .summary-card {
          flex: 1;
          min-width: 120px;
          padding: 12px;
          border-radius: 10px;
          text-align: center;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }
        .summary-card .label {
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .summary-card .value {
          font-size: 24px;
          font-weight: 700;
          margin-top: 5px;
        }
        .card-passed .value { color: #10b981; }
        .card-scheduled .value { color: #f59e0b; }
        .card-pending .value { color: #6b7280; }
        .card-eligible .value { color: #3b82f6; }
        .card-highscore .value { color: #10b981; }
        
        /* Table Styles */
        table {
          border-collapse: collapse;
          width: 100%;
          font-size: 11px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th {
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          color: white;
          padding: 10px 6px;
          text-align: center;
          font-weight: 600;
          border: 1px solid #2563eb;
          position: sticky;
          top: 0;
          white-space: nowrap;
        }
        td {
          padding: 7px 5px;
          border: 1px solid #e2e8f0;
          text-align: center;
        }
        td:first-child, td:nth-child(2), td:nth-child(3), td:nth-child(6) {
          text-align: left;
        }
        
        /* Row Color Classes */
        .row-passed { background-color: #d4edda; }
        .row-failed { background-color: #f8d7da; }
        .row-scheduled { background-color: #fff3cd; }
        .row-eligible { background-color: #d1ecf1; }
        .row-not-eligible { background-color: #f8d7da; }
        
        /* Score Color Classes */
        .score-success { 
          background-color: #d4edda; 
          color: #155724; 
          font-weight: 600;
          border-radius: 4px;
          padding: 2px 6px;
        }
        .score-warning { 
          background-color: #fff3cd; 
          color: #856404; 
          font-weight: 600;
          border-radius: 4px;
          padding: 2px 6px;
        }
        .score-danger { 
          background-color: #f8d7da; 
          color: #721c24; 
          font-weight: 600;
          border-radius: 4px;
          padding: 2px 6px;
        }
        
        /* Status Badges */
        .badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
        }
        .badge-passed { background: #10b981; color: white; }
        .badge-failed { background: #ef4444; color: white; }
        .badge-scheduled { background: #f59e0b; color: white; }
        .badge-pending { background: #6b7280; color: white; }
        .badge-eligible { background: #3b82f6; color: white; }
        
        /* Footer */
        .footer {
          margin-top: 25px;
          padding-top: 15px;
          text-align: center;
          font-size: 10px;
          color: #9ca3af;
          border-top: 1px solid #e5e7eb;
        }
        .legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 10px;
        }
        .legend-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
        }
        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚁 MY DRONE FORCE - PARTICIPANT REPORT</h1>
        <p>Generated on: ${new Date().toLocaleString()} | Total Participants: ${usersData.length}</p>
      </div>
      
      <div class="summary-grid">
        <div class="summary-card card-passed">
          <div class="label">✅ FAA PASSED</div>
          <div class="value">${passedCount}</div>
        </div>
        <div class="summary-card card-scheduled">
          <div class="label">📅 FAA SCHEDULED</div>
          <div class="value">${scheduledCount}</div>
        </div>
        <div class="summary-card card-pending">
          <div class="label">⏳ NOT STARTED</div>
          <div class="value">${pendingCount}</div>
        </div>
        <div class="summary-card card-eligible">
          <div class="label">🔵 ELIGIBLE</div>
          <div class="value">${eligibleCount}</div>
        </div>
        <div class="summary-card card-highscore">
          <div class="label">⭐ HIGH SCORERS (80%+)</div>
          <div class="value">${highScoreCount}</div>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Course</th>
            <th>Cohort</th>
            <th>Screening</th>
            <th>Score%</th>
            <th>Sec1</th>
            <th>Sec2</th>
            <th>Sec3</th>
            <th>Sec4</th>
            <th>Total</th>
            <th>Exam1</th>
            <th>Exam2</th>
            <th>Exam3</th>
            <th>FAA Result</th>
            <th>FAA Score</th>
            <th>FAA Date</th>
            <th>Phase1</th>
            <th>Phase2</th>
            <th>Phase3</th>
            <th>Phase4</th>
            <th>Signed</th>
          </tr>
        </thead>
        <tbody>
          ${usersData
            .map(
              (user) => `
            <tr class="${user.rowClass}">
              <td>${user.index}</td>
              <td><strong>${user.name}</strong></td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.age}</td>
              <td>${user.courseInterest}</td>
              <td>${user.cohortMonth}</td>
              <td>
                <span class="badge ${
                  user.screeningStatus === "eligible"
                    ? "badge-eligible"
                    : user.screeningStatus === "conditional"
                      ? "badge-scheduled"
                      : user.screeningStatus === "not_eligible"
                        ? "badge-failed"
                        : "badge-pending"
                }">
                  ${
                    user.screeningStatus === "eligible"
                      ? "✅ ELIGIBLE"
                      : user.screeningStatus === "conditional"
                        ? "⚠️ CONDITIONAL"
                        : user.screeningStatus === "not_eligible"
                          ? "❌ NOT ELIGIBLE"
                          : "⏳ PENDING"
                  }
                </span>
              </td>
              <td><span class="${user.scoreClass(user.screeningPercentage)}">${user.screeningPercentage}%</span></td>
              <td>${user.section1}/3</td>
              <td>${user.section2}/3</td>
              <td>${user.section3}/4</td>
              <td>${user.section4}/6</td>
              <td><strong>${user.totalScore}/16</strong></td>
              <td><span class="${user.scoreClass(user.practiceExam1)}">${user.practiceExam1}%</span></td>
              <td><span class="${user.scoreClass(user.practiceExam2)}">${user.practiceExam2}%</span></td>
              <td><span class="${user.scoreClass(user.practiceExam3)}">${user.practiceExam3}%</span></td>
              <td>
                <span class="badge ${
                  user.faaResult === "PASSED"
                    ? "badge-passed"
                    : user.faaResult === "FAILED"
                      ? "badge-failed"
                      : user.faaResult === "SCHEDULED"
                        ? "badge-scheduled"
                        : "badge-pending"
                }">
                  ${
                    user.faaResult === "PASSED"
                      ? "✅ PASSED"
                      : user.faaResult === "FAILED"
                        ? "❌ FAILED"
                        : user.faaResult === "SCHEDULED"
                          ? "📅 SCHEDULED"
                          : "⏳ PENDING"
                  }
                </span>
              </td>
              <td><span class="${user.scoreClass(user.faaScore)}">${user.faaScore}%</span></td>
              <td>${user.faaDate}</td>
              <td>${user.phase1Completed}</td>
              <td>${user.phase2Completed}</td>
              <td>${user.phase3Completed}</td>
              <td>${user.phase4Completed}</td>
              <td>${user.electronicSignature === "Signed" ? "✅ Yes" : "❌ No"}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
      
      <div class="footer">
        <div class="legend">
          <div class="legend-item"><div class="legend-color" style="background:#d4edda;"></div> <span>✅ Passed</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#f8d7da;"></div> <span>❌ Failed / Not Eligible</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#fff3cd;"></div> <span>📅 Scheduled</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#d1ecf1;"></div> <span>🔵 Eligible</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#10b981;"></div> <span>⭐ High Score (≥80%)</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#f59e0b;"></div> <span>⚠️ Mid Score (60-79%)</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#ef4444;"></div> <span>🔴 Low Score (&lt;60%)</span></div>
        </div>
        <p style="margin-top: 15px;">My Drone Force - Admin Dashboard | Goal: 60% FAA Pass Rate</p>
      </div>
    </body>
    </html>`;
  };

  const handleExport = async () => {
    if (!users || users.length === 0) {
      toast.warning("No users to export");
      return;
    }

    setExporting(true);
    if (onExportStart) onExportStart();

    try {
      toast.info("Fetching user data...");

      // Fetch onboarding data for all users in parallel
      const usersWithFullData = await Promise.all(
        users.map(async (user, index) => {
          const onboarding = await fetchUserOnboarding(user);
          return buildUserExportData(user, onboarding, index);
        }),
      );

      const validUsers = usersWithFullData.filter((u) => u !== null);

      if (validUsers.length === 0) {
        toast.warning("No valid data to export");
        return;
      }

      const htmlContent = generateExcelHTML(validUsers);
      const blob = new Blob([htmlContent], {
        type: "application/vnd.ms-excel",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mydroneforce_export_${new Date().toISOString().split("T")[0]}.xls`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${validUsers.length} users successfully!`);
      if (onExportComplete) onExportComplete();
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data: " + error.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting || !users || users.length === 0}
      className="btn-primary-custom"
      style={{
        padding: "10px 20px",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: exporting || !users || users.length === 0 ? 0.6 : 1,
      }}
    >
      {exporting ? (
        <>
          <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
          Exporting...
        </>
      ) : (
        <>
          <FaFileExcel style={{ fontSize: "16px" }} />
          Export to Excel
        </>
      )}
    </button>
  );
};

export default ExportToExcel;
