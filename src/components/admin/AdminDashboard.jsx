import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaClipboardList,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UsersTable from "./UsersTable";
import StatsCards from "./StatsCards";
import GeographicHeatMap from "./GeographicHeatMap";
import TrendComparisonChart from "./TrendComparisonChart";
import AnalyticsDashboard from "./AnalyticsDashboard";
import droneLogo from "../../assests/images/white.png";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLocationData, setUserLocationData] = useState([]);
  const [registrationTrendData, setRegistrationTrendData] = useState([]);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const admin = localStorage.getItem("adminInfo");

    if (!token) {
      navigate("/admin");
    } else {
      setAdminInfo(JSON.parse(admin));
      fetchStats();
      fetchUsers();
      fetchUsersForMap();
      fetchRegistrationTrends();
    }
  }, [navigate]);

  // Close sidebar on window resize (desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersForMap = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserLocationData(response.data.users);
    } catch (error) {
      console.error("Error fetching users for map:", error);
    }
  };

  const fetchRegistrationTrends = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Convert registrationsByMonth from API to chart format
      if (
        response.data.stats?.registrationsByMonth &&
        response.data.stats.registrationsByMonth.length > 0
      ) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const chartData = response.data.stats.registrationsByMonth.map(
          (item) => ({
            month: monthNames[item._id.month - 1],
            registrations: item.count,
            year: item._id.year,
          }),
        );
        setRegistrationTrendData(chartData);
      } else {
        // Fallback to demo data if no real data exists
        setRegistrationTrendData([
          { month: "Jan", registrations: 45 },
          { month: "Feb", registrations: 52 },
          { month: "Mar", registrations: 68 },
          { month: "Apr", registrations: 74 },
          { month: "May", registrations: 89 },
          { month: "Jun", registrations: 95 },
        ]);
      }
    } catch (error) {
      console.error("Error fetching registration trends:", error);
      // Fallback data on error
      setRegistrationTrendData([
        { month: "Jan", registrations: 45 },
        { month: "Feb", registrations: 52 },
        { month: "Mar", registrations: 68 },
        { month: "Apr", registrations: 74 },
        { month: "May", registrations: 89 },
        { month: "Jun", registrations: 95 },
      ]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin");
  };

  const courseDistributionData =
    stats?.courseDistribution?.map((item) => ({
      name: item.course?.split(" ").slice(0, 2).join(" ") || "Other",
      value: item.count,
    })) || [];

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "analytics", label: "Analytics", icon: <FaChartLine /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "reports", label: "Reports", icon: <FaClipboardList /> },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-secondary)",
      }}
    >
      <ToastContainer position="top-right" theme="dark" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1001,
          background: "var(--gradient)",
          border: "none",
          width: "45px",
          height: "45px",
          borderRadius: "12px",
          color: "white",
          cursor: "pointer",
          display: window.innerWidth < 992 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        <FaBars />
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && window.innerWidth < 992 && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          width: "280px",
          background: "var(--card-bg)",
          borderRight: "1px solid var(--border-color)",
          padding: "30px 20px",
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          zIndex: 1000,
          transition: "transform 0.3s ease",
          transform:
            window.innerWidth < 992
              ? sidebarOpen
                ? "translateX(0)"
                : "translateX(-100%)"
              : "translateX(0)",
        }}
      >
        {/* Close button for mobile */}
        {window.innerWidth < 992 && (
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            <FaTimes />
          </button>
        )}

        {/* Logo */}
        <div className="text-center mb-5">
          <div
            style={{
              width: "90px",
              height: "90px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={droneLogo}
              alt="My Drone Force Logo"
              style={{
                width: "200%",
                height: "200%",
                objectFit: "contain",
              }}
            />
          </div>
          {/* <h3
            style={{
              marginTop: "12px",
              fontSize: "18px",
              color: "var(--text-primary)",
            }}
          >
            My Drone Force
          </h3> */}
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Admin Panel
          </p>
        </div>

        {/* Admin Info */}
        <div
          style={{
            padding: "15px",
            background: "rgba(var(--accent-rgb), 0.1)",
            borderRadius: "12px",
            marginBottom: "25px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "var(--gradient)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {adminInfo?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                }}
              >
                {adminInfo?.name || "Admin"}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                {adminInfo?.role || "Administrator"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 992) setSidebarOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 15px",
                marginBottom: "8px",
                background:
                  activeTab === item.id ? "var(--gradient)" : "transparent",
                border: "none",
                borderRadius: "12px",
                color: activeTab === item.id ? "white" : "var(--text-primary)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 15px",
            marginTop: "30px",
            background: "transparent",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            color: "var(--text-secondary)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <FaSignOutAlt />
          <span style={{ fontSize: "14px", fontWeight: "500" }}>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: window.innerWidth < 768 ? "20px 15px" : "30px",
          marginLeft: window.innerWidth < 992 ? "0" : "280px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h1
            style={{
              fontSize: window.innerWidth < 768 ? "22px" : "28px",
              fontWeight: "700",
              color: "var(--text-primary)",
            }}
          >
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "analytics" && "Analytics Dashboard"}
            {activeTab === "users" && "Users Management"}
            {activeTab === "reports" && "Reports"}
          </h1>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StatsCards stats={stats} loading={loading} />

            {/* Charts Row - Responsive */}
            <div
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 992 ? "column" : "row",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {/* Registration Trend */}
              <div
                className="glass"
                style={{
                  padding: "20px",
                  borderRadius: "20px",
                  flex: window.innerWidth < 992 ? "auto" : 2,
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    color: "var(--text-primary)",
                  }}
                >
                  <FaChartLine style={{ marginRight: "8px" }} />
                  Registration Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={registrationTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border-color)"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="var(--text-secondary)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="registrations"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Course Distribution */}
              <div
                className="glass"
                style={{
                  padding: "20px",
                  borderRadius: "20px",
                  flex: window.innerWidth < 992 ? "auto" : 1,
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    color: "var(--text-primary)",
                  }}
                >
                  <FaGraduationCap style={{ marginRight: "8px" }} />
                  Course Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={courseDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      dataKey="value"
                    >
                      {courseDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Geographic Heat Map */}
            <div
              className="glass"
              style={{
                padding: "20px",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "20px",
                  color: "var(--text-primary)",
                }}
              >
                <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                Student Distribution by State
              </h3>
              <GeographicHeatMap userData={userLocationData} />
            </div>

            {/* Trend Comparison Chart - Using Real Data */}
            <div
              className="glass"
              style={{
                padding: "20px",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            >
              <TrendComparisonChart
                data={registrationTrendData}
                title="Registration Trends with Growth Analysis"
              />
            </div>
          </motion.div>
        )}
        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <AnalyticsDashboard token={localStorage.getItem("adminToken")} />
        )}
        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UsersTable
              users={users}
              loading={loading}
              fetchUsers={fetchUsers}
              token={localStorage.getItem("adminToken")}
            />
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="glass"
              style={{ padding: "20px", borderRadius: "20px" }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  marginBottom: "20px",
                  color: "var(--text-primary)",
                }}
              >
                Reports Overview
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    background: "var(--bg-secondary)",
                    borderRadius: "16px",
                  }}
                >
                  <h4 style={{ fontSize: "14px" }}>Total Registrations</h4>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "var(--accent)",
                    }}
                  >
                    {stats?.totalUsers || 0}
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px",
                    background: "var(--bg-secondary)",
                    borderRadius: "16px",
                  }}
                >
                  <h4 style={{ fontSize: "14px" }}>Active Students</h4>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "var(--accent)",
                    }}
                  >
                    {stats?.activeUsers || 0}
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px",
                    background: "var(--bg-secondary)",
                    borderRadius: "16px",
                  }}
                >
                  <h4 style={{ fontSize: "14px" }}>New This Month</h4>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "var(--accent)",
                    }}
                  >
                    {stats?.newThisMonth || 0}
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px",
                    background: "var(--bg-secondary)",
                    borderRadius: "16px",
                  }}
                >
                  <h4 style={{ fontSize: "14px" }}>Inactive Students</h4>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "var(--accent)",
                    }}
                  >
                    {stats?.inactiveUsers || 0}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
