import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaMapMarkerAlt } from "react-icons/fa";
import API_URL from "../config/api";

const RegionDistributionChart = ({ token, refreshTrigger }) => {
  const [regionData, setRegionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);

  // Wrap fetchRegionData in useCallback to prevent unnecessary re-renders
  const fetchRegionData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const regionChartData = response.data.data.regionChartData || [];
      setRegionData(regionChartData);

      // Calculate total students from region data
      const total = regionChartData.reduce((sum, item) => sum + item.count, 0);
      setTotalStudents(total);
    } catch (error) {
      console.error("Error fetching region data:", error);
    } finally {
      setLoading(false);
    }
  }, [token]); // token as dependency

  useEffect(() => {
    fetchRegionData();
  }, [fetchRegionData, refreshTrigger]);

  // Colors for each region
  const getBarColor = (region) => {
    switch (region) {
      case "Core Mid-South":
        return "#3b82f6"; // Blue
      case "Deep South":
        return "#10b981"; // Green
      case "Other":
        return "#6b7280"; // Gray
      default:
        return "#3b82f6";
    }
  };

  if (loading) {
    return (
      <div
        className="glass"
        style={{
          padding: "20px",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-secondary)" }}>Loading region data...</p>
      </div>
    );
  }

  if (regionData.length === 0) {
    return (
      <div
        className="glass"
        style={{
          padding: "20px",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-secondary)" }}>
          No region data available
        </p>
      </div>
    );
  }

  return (
    <div
      className="glass"
      style={{
        padding: "20px",
        borderRadius: "20px",
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
        Student Distribution by Region
      </h3>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis
            dataKey="region"
            stroke="var(--text-secondary)"
            fontSize={12}
            angle={0}
            textAnchor="middle"
          />
          <YAxis stroke="var(--text-secondary)" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
            }}
            formatter={(value, name) => [value, "Students"]}
          />
          <Bar dataKey="count" name="Number of Students" radius={[8, 8, 0, 0]}>
            {regionData.map((entry, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey="count"
                fill={getBarColor(entry.region)}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Region Summary Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {regionData.map((region, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              minWidth: "120px",
              textAlign: "center",
              padding: "15px",
              background: "var(--bg-secondary)",
              borderRadius: "12px",
              borderTop: `3px solid ${getBarColor(region.region)}`,
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: getBarColor(region.region),
              }}
            >
              {region.count}
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--text-primary)",
              }}
            >
              {region.region}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
              }}
            >
              {region.percentage}% of total
            </div>
          </div>
        ))}
      </div>

      {/* Total Students */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          textAlign: "center",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Total Students:{" "}
          <strong style={{ color: "var(--accent)" }}>{totalStudents}</strong>
        </span>
      </div>
    </div>
  );
};

export default RegionDistributionChart;
