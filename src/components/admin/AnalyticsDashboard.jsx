import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaChartLine,
  FaAward,
  FaSpinner,
  FaClipboardList,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsDashboard = ({ token }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setDashboardData(response.data.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <FaSpinner
          style={{
            animation: "spin 1s linear infinite",
            fontSize: "40px",
            marginBottom: "20px",
          }}
        />
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <p>Failed to load analytics data. Please try again.</p>
        <button onClick={handleRefresh} className="btn-primary-custom">
          Retry
        </button>
      </div>
    );
  }

  const {
    kpi,
    screeningAnalysis,
    practiceExams,
    phaseCompletion,
    demographics,
    cohortSummary,
    examResults,
    goal,
  } = dashboardData;

  // Prepare pie chart data for exam results
  const examPieData = [
    { name: "PASSED", value: examResults.passed, color: "#10b981" },
    { name: "SCHEDULED", value: examResults.scheduled, color: "#f59e0b" },
    { name: "NOT YET", value: examResults.notYet, color: "#6b7280" },
    { name: "FAILED", value: examResults.failed, color: "#ef4444" },
  ].filter((item) => item.value > 0);

  // Prepare practice exam data for chart
  const practiceExamChartData = [
    {
      exam: "Exam 1",
      avg: practiceExams.exam1.avg,
      highest: practiceExams.exam1.highest,
      lowest: practiceExams.exam1.lowest,
    },
    {
      exam: "Exam 2",
      avg: practiceExams.exam2.avg,
      highest: practiceExams.exam2.highest,
      lowest: practiceExams.exam2.lowest,
    },
    {
      exam: "Exam 3",
      avg: practiceExams.exam3.avg,
      highest: practiceExams.exam3.highest,
      lowest: practiceExams.exam3.lowest,
    },
  ];

  // Prepare phase completion data
  const phaseChartData = [
    { phase: "Phase 1", percentage: phaseCompletion.phase1.percentage },
    { phase: "Phase 2", percentage: phaseCompletion.phase2.percentage },
    { phase: "Phase 3", percentage: phaseCompletion.phase3.percentage },
    { phase: "Phase 4", percentage: phaseCompletion.phase4.percentage },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with Refresh */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={handleRefresh}
          className="btn-outline-custom"
          style={{ padding: "8px 20px" }}
          disabled={refreshing}
        >
          {refreshing ? (
            <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
          ) : (
            "🔄 Refresh"
          )}
        </button>
      </div>

      {/* KPI Cards - Row 1 */}
      <div className="row g-4 mb-4">
        <div className="col-lg-2 col-md-4 col-6">
          <KPICard
            title="Total Participants"
            value={kpi.totalParticipants}
            icon={<FaUsers />}
            color="#3b82f6"
            bg="rgba(59, 130, 246, 0.1)"
          />
        </div>
        <div className="col-lg-2 col-md-4 col-6">
          <KPICard
            title="Eligible"
            value={kpi.eligible}
            icon={<FaUserCheck />}
            color="#10b981"
            bg="rgba(16, 185, 129, 0.1)"
          />
        </div>
        <div className="col-lg-2 col-md-4 col-6">
          <KPICard
            title="Conditional"
            value={kpi.conditional}
            icon={<FaUserClock />}
            color="#f59e0b"
            bg="rgba(245, 158, 11, 0.1)"
          />
        </div>
        <div className="col-lg-2 col-md-4 col-6">
          <KPICard
            title="Not Eligible"
            value={kpi.notEligible}
            icon={<FaUserTimes />}
            color="#ef4444"
            bg="rgba(239, 68, 68, 0.1)"
          />
        </div>
        <div className="col-lg-2 col-md-4 col-6">
          <KPICard
            title="FAA Passed"
            value={kpi.faaPassed}
            icon={<FaAward />}
            color="#8b5cf6"
            bg="rgba(139, 92, 246, 0.1)"
          />
        </div>
        <div className="col-lg-2 col-md-4 col-6">
          <KPICard
            title="Pass Rate"
            value={`${kpi.passRate}%`}
            icon={<FaChartLine />}
            color="#06b6d4"
            bg="rgba(6, 182, 212, 0.1)"
          />
        </div>
      </div>

      {/* Row 2: Screening Score Analysis & FAA Exam Results */}
      <div className="row g-4 mb-4">
        <div className="col-lg-7">
          <div
            className="glass"
            style={{ padding: "20px", borderRadius: "20px", height: "100%" }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "var(--accent)",
              }}
            >
              <FaClipboardList style={{ marginRight: "8px" }} />
              SCREENING SCORE ANALYSIS
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>
                      Metric
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Average
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Highest
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Lowest
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Median
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ScoreRow
                    label="Total Score (/16)"
                    data={screeningAnalysis.totalScore}
                  />
                  <ScoreRow
                    label="Score Percentage"
                    data={screeningAnalysis.percentage}
                    suffix="%"
                  />
                  <ScoreRow
                    label="Sec 1: Basic (/3)"
                    data={screeningAnalysis.section1}
                  />
                  <ScoreRow
                    label="Sec 2: Tech (/3)"
                    data={screeningAnalysis.section2}
                  />
                  <ScoreRow
                    label="Sec 3: Avail (/4)"
                    data={screeningAnalysis.section3}
                  />
                  <ScoreRow
                    label="Sec 4: Motiv (/6)"
                    data={screeningAnalysis.section4}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div
            className="glass"
            style={{ padding: "20px", borderRadius: "20px", height: "100%" }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "var(--accent)",
              }}
            >
              🎯 FAA EXAM RESULTS
            </h3>
            {examPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={examPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    dataKey="value"
                  >
                    {examPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "var(--text-secondary)",
                }}
              >
                No exam data available
              </div>
            )}
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {examPieData.map((item, idx) => (
                <div
                  key={idx}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "2px",
                      background: item.color,
                    }}
                  />
                  <span style={{ fontSize: "12px" }}>
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Practice Exam Performance */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div
            className="glass"
            style={{ padding: "20px", borderRadius: "20px" }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "var(--accent)",
              }}
            >
              📝 PRACTICE EXAM PERFORMANCE
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: "20px",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Exam</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Avg Score
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Highest
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Lowest
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      # Completed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px" }}>Practice Exam 1</td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam1.avg}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam1.highest}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam1.lowest}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam1.completed}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "10px" }}>Practice Exam 2</td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam2.avg}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam2.highest}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam2.lowest}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam2.completed}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px" }}>Practice Exam 3</td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam3.avg}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam3.highest}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam3.lowest}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {practiceExams.exam3.completed}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={practiceExamChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border-color)"
                />
                <XAxis dataKey="exam" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="avg"
                  name="Average Score"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="highest"
                  name="Highest Score"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="lowest"
                  name="Lowest Score"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Phase Completion & Age Demographics */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div
            className="glass"
            style={{ padding: "20px", borderRadius: "20px", height: "100%" }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "var(--accent)",
              }}
            >
              ✅ PHASE COMPLETION TRACKING
            </h3>
            {phaseChartData.map((phase, idx) => (
              <div key={idx} style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{phase.phase}</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "var(--accent)",
                    }}
                  >
                    {phase.percentage}%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "var(--border-color)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${phase.percentage}%`,
                      height: "100%",
                      background: "var(--gradient)",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            ))}
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                background: "var(--bg-secondary)",
                borderRadius: "12px",
              }}
            >
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Phase 1: {phaseCompletion.phase1.completed} /{" "}
                {phaseCompletion.phase1.total} tasks
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Phase 2: {phaseCompletion.phase2.completed} /{" "}
                {phaseCompletion.phase2.total} tasks
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Phase 3: {phaseCompletion.phase3.completed} /{" "}
                {phaseCompletion.phase3.total} tasks
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Phase 4: {phaseCompletion.phase4.completed} /{" "}
                {phaseCompletion.phase4.total} tasks
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div
            className="glass"
            style={{ padding: "20px", borderRadius: "20px", height: "100%" }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "var(--accent)",
              }}
            >
              👥 PARTICIPANT AGE DEMOGRAPHICS
            </h3>
            <div style={{ display: "grid", gap: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  background: "var(--bg-secondary)",
                  borderRadius: "10px",
                }}
              >
                <span>Average Age</span>
                <span style={{ fontWeight: "bold", color: "var(--accent)" }}>
                  {demographics.averageAge}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  background: "var(--bg-secondary)",
                  borderRadius: "10px",
                }}
              >
                <span>Youngest</span>
                <span style={{ fontWeight: "bold", color: "#10b981" }}>
                  {demographics.youngest}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  background: "var(--bg-secondary)",
                  borderRadius: "10px",
                }}
              >
                <span>Oldest</span>
                <span style={{ fontWeight: "bold", color: "#f59e0b" }}>
                  {demographics.oldest}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  background: "var(--bg-secondary)",
                  borderRadius: "10px",
                }}
              >
                <span>Age 16-24 (Opportunity Youth)</span>
                <span style={{ fontWeight: "bold", color: "#8b5cf6" }}>
                  {demographics.opportunityYouth}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  background: "var(--bg-secondary)",
                  borderRadius: "10px",
                }}
              >
                <span>Age 25+</span>
                <span style={{ fontWeight: "bold", color: "#06b6d4" }}>
                  {demographics.age25Plus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Cohort Summary */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div
            className="glass"
            style={{ padding: "20px", borderRadius: "20px" }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "var(--accent)",
              }}
            >
              📅 COHORT SUMMARY
            </h3>
            {cohortSummary.length > 0 ? (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid var(--border-color)" }}
                    >
                      <th style={{ padding: "12px", textAlign: "left" }}>
                        Cohort
                      </th>
                      <th style={{ padding: "12px", textAlign: "center" }}>
                        Participants
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortSummary.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: "10px" }}>{item.cohort}</td>
                        <td style={{ textAlign: "center" }}>{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "var(--text-secondary)",
                }}
              >
                No cohort data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 6: Goal Tracker */}
      <div className="row g-4">
        <div className="col-12">
          <div
            className="glass"
            style={{
              padding: "20px",
              borderRadius: "20px",
              background: `linear-gradient(135deg, ${goal.color}10, transparent)`,
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "var(--accent)",
              }}
            >
              🎯 PROGRAM GOAL: 60% FAA PASS RATE
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>Current Pass Rate:</span>
                  <span style={{ fontWeight: "bold", color: goal.color }}>
                    {goal.current}%
                  </span>
                </div>
                <div
                  style={{
                    height: "10px",
                    background: "var(--border-color)",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(goal.current, 100)}%`,
                      height: "100%",
                      background: goal.color,
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <span>Goal: 60%</span>
                  <span style={{ fontWeight: "bold", color: goal.color }}>
                    Status: {goal.status}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: `${goal.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: goal.color,
                  }}
                >
                  {goal.current}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper Components
const KPICard = ({ title, value, icon, color, bg }) => (
  <div
    className="glass"
    style={{
      padding: "20px",
      borderRadius: "16px",
      textAlign: "center",
      transition: "transform 0.3s ease",
      cursor: "pointer",
      background: bg,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <div style={{ fontSize: "28px", color: color, marginBottom: "10px" }}>
      {icon}
    </div>
    <div
      style={{
        fontSize: "24px",
        fontWeight: "700",
        color: "var(--text-primary)",
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
      {title}
    </div>
  </div>
);

const ScoreRow = ({ label, data, suffix = "" }) => (
  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
    <td style={{ padding: "10px" }}>{label}</td>
    <td style={{ textAlign: "center" }}>
      {data.avg}
      {suffix}
    </td>
    <td style={{ textAlign: "center" }}>
      {data.max}
      {suffix}
    </td>
    <td style={{ textAlign: "center" }}>
      {data.min}
      {suffix}
    </td>
    <td style={{ textAlign: "center" }}>
      {data.median}
      {suffix}
    </td>
  </tr>
);

export default AnalyticsDashboard;
