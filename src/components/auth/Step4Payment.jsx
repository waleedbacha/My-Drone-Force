import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  FaSpinner,
  FaArrowLeft,
  FaLock,
  FaCreditCard,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Internal payment form component
const PaymentForm = ({
  userId,
  userEmail,
  userName,
  onPaymentSuccess,
  onBack,
  onGoToPledge,
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not initialized. Please refresh the page.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/register`,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setErrorMessage(confirmError.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        const confirmResponse = await axios.post(
          API_ENDPOINTS.CONFIRM_PAYMENT,
          {
            paymentIntentId: paymentIntent.id,
            userId: userId,
          },
        );

        if (confirmResponse.data.success) {
          setPaymentSuccess(true);
          setTimeout(() => {
            onPaymentSuccess();
          }, 1500);
        } else {
          setErrorMessage(confirmResponse.data.message);
        }
      } catch (err) {
        setErrorMessage(
          err.response?.data?.message || "Failed to confirm payment",
        );
      }
      setIsProcessing(false);
    } else {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div
        className="glass"
        style={{ padding: "60px", borderRadius: "20px", textAlign: "center" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
          <h3 style={{ marginBottom: "10px", color: "var(--text-primary)" }}>
            Payment Successful!
          </h3>
          <p style={{ color: "var(--text-secondary)" }}>
            Redirecting to complete your registration...
          </p>
          <FaSpinner
            style={{
              animation: "spin 1s linear infinite",
              marginTop: "20px",
              fontSize: "24px",
              color: "var(--accent)",
            }}
          />
        </motion.div>
      </div>
    );
  }

  // Check if error indicates payment already completed
  const isPaymentCompleted =
    errorMessage && errorMessage.includes("Payment already completed");

  if (errorMessage) {
    return (
      <div
        className="glass"
        style={{
          padding: "clamp(30px, 5vw, 40px)",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: isPaymentCompleted ? "#f59e0b" : "#ef4444",
            marginBottom: "20px",
            fontSize: "clamp(40px, 8vw, 48px)",
          }}
        >
          {isPaymentCompleted ? "⚠️" : "❌"}
        </div>
        <h3
          style={{ marginBottom: "15px", fontSize: "clamp(18px, 4vw, 22px)" }}
        >
          {isPaymentCompleted
            ? "Payment Already Completed"
            : "Cannot Process Payment"}
        </h3>
        <p style={{ marginBottom: "25px", color: "var(--text-secondary)" }}>
          {errorMessage}
        </p>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onBack}
            className="btn-outline-custom"
            style={{ padding: "12px 24px" }}
          >
            <FaArrowLeft /> Return to Screening
          </button>
          {isPaymentCompleted && onGoToPledge && (
            <button
              onClick={onGoToPledge}
              className="btn-primary-custom"
              style={{ padding: "12px 24px" }}
            >
              Go to Pledge <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="glass"
        style={{
          padding: "clamp(20px, 5vw, 30px)",
          borderRadius: "24px",
          marginBottom: "25px",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(18px, 4vw, 20px)",
            fontWeight: "600",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaCreditCard style={{ color: "var(--accent)" }} />
          Complete Your Payment
        </h3>

        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "20px",
            fontSize: "clamp(14px, 3.5vw, 16px)",
          }}
        >
          Program Fee:{" "}
          <strong
            style={{
              fontSize: "clamp(20px, 5vw, 24px)",
              color: "var(--accent)",
            }}
          >
            $1,500
          </strong>{" "}
          (one-time payment)
        </p>

        <div
          style={{
            background: "rgba(59, 130, 246, 0.1)",
            padding: "clamp(12px, 3vw, 15px)",
            borderRadius: "12px",
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <FaLock style={{ color: "var(--accent)" }} />
          <span style={{ fontSize: "13px" }}>
            Secure payment powered by Stripe
          </span>
          <FaShieldAlt style={{ color: "var(--accent)", marginLeft: "auto" }} />
        </div>

        <div style={{ marginBottom: "20px", width: "100%" }}>
          <PaymentElement />
        </div>

        {errorMessage && !isPaymentCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              color: "#ef4444",
              fontSize: "13px",
            }}
          >
            {errorMessage}
          </motion.div>
        )}

        <p
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          By completing this payment, you agree to our terms and conditions.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid #f59e0b",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "11px", color: "#f59e0b", marginBottom: 0 }}>
              💳 TEST MODE: Use card 4242 4242 4242 4242 (any future expiry, any
              CVC)
            </p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={onBack}
          className="btn-outline-custom"
          style={{
            flex: 1,
            padding: "14px",
            justifyContent: "center",
            minWidth: "120px",
          }}
          disabled={isProcessing}
        >
          <FaArrowLeft /> Back
        </button>
        <button
          type="submit"
          className="btn-primary-custom"
          style={{
            flex: 2,
            padding: "14px",
            justifyContent: "center",
            minWidth: "160px",
          }}
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <>
              <FaSpinner
                style={{
                  animation: "spin 1s linear infinite",
                  marginRight: "8px",
                }}
              />
              Processing...
            </>
          ) : (
            "Pay $1,500 →"
          )}
        </button>
      </div>
    </form>
  );
};

// Main component (exported as Step3Payment for use in Register.jsx)
const Step3Payment = ({
  userId,
  userEmail,
  userName,
  onPaymentSuccess,
  onBack,
  onGoToPledge,
}) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(API_ENDPOINTS.CREATE_PAYMENT_INTENT, {
          userId: userId,
          email: userEmail,
          name: userName,
        });

        if (response.data.success) {
          setClientSecret(response.data.clientSecret);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Create payment intent error:", err);
        setError(err.response?.data?.message || "Failed to initialize payment");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      createPaymentIntent();
    }
  }, [userId, userEmail, userName]);

  if (isLoading) {
    return (
      <div
        className="glass"
        style={{ padding: "60px", borderRadius: "20px", textAlign: "center" }}
      >
        <FaSpinner
          style={{
            animation: "spin 1s linear infinite",
            fontSize: "40px",
            marginBottom: "20px",
            color: "var(--accent)",
          }}
        />
        <p style={{ color: "var(--text-secondary)" }}>
          Preparing secure payment...
        </p>
      </div>
    );
  }

  if (error) {
    const isPaymentCompleted = error.includes("Payment already completed");

    return (
      <div
        className="glass"
        style={{
          padding: "clamp(30px, 5vw, 40px)",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: isPaymentCompleted ? "#f59e0b" : "#ef4444",
            marginBottom: "20px",
            fontSize: "clamp(40px, 8vw, 48px)",
          }}
        >
          {isPaymentCompleted ? "⚠️" : "❌"}
        </div>
        <h3
          style={{ marginBottom: "15px", fontSize: "clamp(18px, 4vw, 22px)" }}
        >
          {isPaymentCompleted
            ? "Payment Already Completed"
            : "Cannot Process Payment"}
        </h3>
        <p style={{ marginBottom: "25px", color: "var(--text-secondary)" }}>
          {error}
        </p>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onBack}
            className="btn-outline-custom"
            style={{ padding: "12px 24px" }}
          >
            <FaArrowLeft /> Return to Screening
          </button>
          {isPaymentCompleted && onGoToPledge && (
            <button
              onClick={onGoToPledge}
              className="btn-primary-custom"
              style={{ padding: "12px 24px" }}
            >
              Go to Pledge <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm
        userId={userId}
        userEmail={userEmail}
        userName={userName}
        onPaymentSuccess={onPaymentSuccess}
        onBack={onBack}
        onGoToPledge={onGoToPledge}
        clientSecret={clientSecret}
      />
    </Elements>
  );
};

export default Step3Payment;
