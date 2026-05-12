import { useEffect } from "react";
import clarity from "@microsoft/clarity";

const ClarityInit = () => {
  useEffect(() => {
    const clarityId = process.env.REACT_APP_CLARITY_ID;

    if (!clarityId) {
      console.warn(
        "⚠️ Clarity Project ID missing. Add REACT_APP_CLARITY_ID to .env",
      );
      return;
    }

    try {
      clarity.init(clarityId);
      console.log("✅ Microsoft Clarity initialized with ID:", clarityId);

      // Optional: Set user properties
      clarity.setTag("app_version", "1.0.0");
      clarity.setTag("environment", process.env.NODE_ENV);
    } catch (error) {
      console.error("❌ Clarity initialization failed:", error);
    }
  }, []);

  return null;
};

export default ClarityInit;
