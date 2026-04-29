// src/config/api.js

// Use Railway backend in production, localhost in development
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.mydroneforce.com"
    : "http://localhost:5000";

export default API_URL;
