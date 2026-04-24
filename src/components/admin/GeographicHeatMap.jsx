import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const GeographicHeatMap = ({ userData = [] }) => {
  // State full names mapping
  const stateNames = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };

  // Count users by state
  const stateCounts = userData.reduce((acc, user) => {
    const state = user.state;
    if (state && stateNames[state]) {
      acc[state] = (acc[state] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert to array for chart
  const chartData = Object.entries(stateCounts)
    .map(([code, count]) => ({
      state: stateNames[code],
      code: code,
      students: count,
    }))
    .sort((a, b) => b.students - a.students)
    .slice(0, 15); // Top 15 states

  const maxCount = Math.max(...chartData.map((d) => d.students), 1);

  // Color scale based on count
  const getBarColor = (count) => {
    if (count > maxCount * 0.7) return "#1e40af";
    if (count > maxCount * 0.4) return "#3b82f6";
    if (count > maxCount * 0.2) return "#60a5fa";
    return "#93c5fd";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{label}</p>
          <p style={{ color: "#3b82f6" }}>Students: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          color: "var(--text-secondary)",
        }}
      >
        No student location data available yet.
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Top 15 states by student count
        </p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis type="number" stroke="var(--text-secondary)" fontSize={12} />
          <YAxis
            dataKey="state"
            type="category"
            stroke="var(--text-secondary)"
            fontSize={12}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="students" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.students)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "var(--bg-secondary)",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Total States
          </p>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "var(--accent)",
            }}
          >
            {Object.keys(stateCounts).length}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Top State
          </p>
          <p style={{ fontSize: "20px", fontWeight: "700", color: "#10b981" }}>
            {chartData[0]?.state} ({chartData[0]?.students})
          </p>
        </div>
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Average per State
          </p>
          <p style={{ fontSize: "20px", fontWeight: "700", color: "#f59e0b" }}>
            {Math.round(
              Object.values(stateCounts).reduce((a, b) => a + b, 0) /
                Object.keys(stateCounts).length,
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatMap;
