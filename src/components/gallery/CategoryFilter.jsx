import React from "react";
import { motion } from "framer-motion";

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter" style={{ marginBottom: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={index}
            onClick={() => onCategoryChange(category.id)}
            className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "12px 28px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "2px solid var(--border-color)",
              background:
                activeCategory === category.id
                  ? "var(--gradient)"
                  : "var(--card-bg)",
              color:
                activeCategory === category.id
                  ? "white"
                  : "var(--text-primary)",
              backdropFilter: "blur(10px)",
            }}
          >
            {category.icon && (
              <span style={{ marginRight: "8px" }}>{category.icon}</span>
            )}
            {category.name}
            {category.count !== undefined && (
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "12px",
                  opacity: 0.8,
                }}
              >
                ({category.count})
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
