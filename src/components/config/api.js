// src/config/api.js

// Use Railway backend in production, localhost in development
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.mydroneforce.com"
    : "http://localhost:5000";

// API endpoints for easy reference
const API_ENDPOINTS = {
  // Auth endpoints
  CHECK_EMAIL: `${API_URL}/api/auth/check-email`,
  REGISTER_STEP1: `${API_URL}/api/auth/register/step1`,
  REGISTER_STEP2: `${API_URL}/api/auth/register/step2`,
  REGISTER_STEP3: `${API_URL}/api/auth/register/step3`,
  REGISTRATION_PROGRESS: (userId) => `${API_URL}/api/auth/progress/${userId}`,

  // Payment endpoints
  CREATE_PAYMENT_INTENT: `${API_URL}/api/payment/create-intent`,
  CONFIRM_PAYMENT: `${API_URL}/api/payment/confirm`,
  PAYMENT_STATUS: (userId) => `${API_URL}/api/payment/status/${userId}`,

  // Admin endpoints
  ADMIN_LOGIN: `${API_URL}/api/admin/login`,
  ADMIN_USERS: `${API_URL}/api/admin/users`,
  ADMIN_DASHBOARD: `${API_URL}/api/admin/dashboard`,
  ADMIN_STATS: `${API_URL}/api/admin/stats`,

  // Onboarding endpoints
  ONBOARDING_PROGRESS: (userId) => `${API_URL}/api/onboarding/${userId}`,
};

export { API_URL, API_ENDPOINTS };
export default API_URL;
