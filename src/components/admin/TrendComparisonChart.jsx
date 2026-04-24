import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";

const TrendComparisonChart = ({ data, title = "Registration Trends" }) => {
  // If no data or empty array, show message
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          color: "var(--text-secondary)",
        }}
      >
        No registration data available yet.
      </div>
    );
  }

  // Sort data by month order
  const monthOrder = [
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
  const sortedData = [...data].sort((a, b) => {
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  // Calculate week-over-week growth
  const dataWithGrowth = sortedData.map((item, index) => {
    if (index === 0) return { ...item, growth: 0 };
    const prevValue = sortedData[index - 1].registrations;
    const growth = prevValue
      ? ((item.registrations - prevValue) / prevValue) * 100
      : 0;
    return { ...item, growth: growth.toFixed(1) };
  });

  // Calculate moving average (3-month)
  const dataWithMA = dataWithGrowth.map((item, index) => {
    if (index < 2) return { ...item, ma3: null };
    const sum =
      dataWithGrowth[index - 2].registrations +
      dataWithGrowth[index - 1].registrations +
      item.registrations;
    return { ...item, ma3: (sum / 3).toFixed(0) };
  });

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
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color, fontSize: "12px" }}>
              {p.name}: {p.value}
              {p.name === "Growth %" && "%"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Calculate summary stats from real data
  const totalRegistrations = sortedData.reduce(
    (sum, d) => sum + d.registrations,
    0,
  );
  const averageMonthly = Math.round(totalRegistrations / sortedData.length);
  const bestMonth = Math.max(...sortedData.map((d) => d.registrations));
  const peakGrowth = Math.max(
    ...dataWithGrowth.map((d) => parseFloat(d.growth)),
  );

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          Based on actual registration data from your database
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={dataWithMA}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} />
          <YAxis yAxisId="left" stroke="var(--text-secondary)" fontSize={12} />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#f59e0b"
            fontSize={12}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="registrations"
            name="Registrations"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="ma3"
            name="3-Month Average"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="growth"
            name="Growth %"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Summary Stats from Real Data */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          padding: "15px",
          background: "var(--bg-secondary)",
          borderRadius: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Total Registrations
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "var(--accent)",
            }}
          >
            {totalRegistrations.toLocaleString()}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Average Monthly
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "var(--accent)",
            }}
          >
            {averageMonthly.toLocaleString()}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Best Month
          </p>
          <p style={{ fontSize: "24px", fontWeight: "700", color: "#10b981" }}>
            {bestMonth.toLocaleString()}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Peak Growth
          </p>
          <p style={{ fontSize: "24px", fontWeight: "700", color: "#f59e0b" }}>
            {peakGrowth > 0 ? `+${peakGrowth}%` : `${peakGrowth}%`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendComparisonChart;
