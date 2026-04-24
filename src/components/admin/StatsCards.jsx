import React from "react";
import { FaUsers, FaUserPlus, FaUserCheck, FaChartLine } from "react-icons/fa";

const StatsCards = ({ stats, loading }) => {
  const cards = [
    {
      title: "Total Students",
      value: stats?.totalUsers || 0,
      icon: <FaUsers size={28} />,
      color: "#3b82f6",
      bg: "rgba(59, 130, 246, 0.1)",
    },
    {
      title: "New This Month",
      value: stats?.newThisMonth || 0,
      icon: <FaUserPlus size={28} />,
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: "Active Students",
      value: stats?.activeUsers || 0,
      icon: <FaUserCheck size={28} />,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
    },
    {
      title: "Conversion Rate",
      value: stats?.totalUsers
        ? `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}%`
        : "0%",
      icon: <FaChartLine size={28} />,
      color: "#8b5cf6",
      bg: "rgba(139, 92, 246, 0.1)",
    },
  ];

  if (loading) {
    return (
      <div className="row g-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div className="glass p-4" style={{ borderRadius: "20px" }}>
              <div
                style={{
                  height: "80px",
                  background: "var(--border-color)",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row g-4">
      {cards.map((card, index) => (
        <div key={index} className="col-lg-3 col-md-6">
          <div
            className="glass"
            style={{
              padding: "20px",
              borderRadius: "20px",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    marginBottom: "8px",
                  }}
                >
                  {card.title}
                </p>
                <h3
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "var(--text-primary)",
                  }}
                >
                  {card.value.toLocaleString()}
                </h3>
              </div>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background: card.bg,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.color,
                }}
              >
                {card.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
