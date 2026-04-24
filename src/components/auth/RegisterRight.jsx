import React, { useState } from "react";
// import { motion } from "framer-motion";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2AddressCourse from "./Step2AddressCourse";
import Step3CommitmentSignature from "./Step3CommitmentSignature";

const RegisterRight = ({ formData, setFormData, isSubmitting, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [signatureData, setSignatureData] = useState(null);

  const courses = [
    "Part 107 Certification",
    "Hands-On Flight Training",
    "Career Placement Assistance",
    "Workforce Development",
    "Youth Program",
    "Corporate Training",
  ];

  const hearAboutOptions = [
    "Google",
    "Social Media",
    "Friend/Family",
    "Email",
    "Other",
  ];

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        if (value.length > 50) return "First name cannot exceed 50 characters";
        return "";
      case "lastName":
        if (!value) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        if (value.length > 50) return "Last name cannot exceed 50 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        const phoneRegex = /^[\d\s()-]{10,}$/;
        if (!phoneRegex.test(value))
          return "Please enter a valid phone number (min 10 digits)";
        return "";
      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        if (age < 16) return "You must be at least 16 years old";
        if (age > 100) return "Please enter a valid date of birth";
        return "";
      case "address":
        if (!value) return "Address is required";
        if (value.length < 5) return "Please enter a complete address";
        return "";
      case "city":
        if (!value) return "City is required";
        return "";
      case "state":
        if (!value) return "State is required";
        return "";
      case "zipCode":
        if (!value) return "ZIP code is required";
        const zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(value))
          return "Please enter a valid ZIP code (5 digits or 5+4)";
        return "";
      case "courseInterest":
        if (!value) return "Course interest is required";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          profileImage: "Image size must be less than 5MB",
        });
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          profileImage: "Only JPG, PNG, and WEBP images are allowed",
        });
        return;
      }
      setFormData({ ...formData, profileImage: file });
      setErrors({ ...errors, profileImage: "" });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    const step1Fields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
    ];
    let hasError = false;
    const newErrors = { ...errors };

    step1Fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      newErrors[field] = error;
      if (error) hasError = true;
    });

    setErrors(newErrors);

    if (!hasError && isStep1Valid()) {
      setCurrentStep(2);
    }
  };

  const goToStep3 = () => {
    if (isStep2Valid()) {
      setCurrentStep(3);
    } else {
      const step2Fields = [
        "address",
        "city",
        "state",
        "zipCode",
        "courseInterest",
      ];
      const newErrors = { ...errors };
      step2Fields.forEach((field) => {
        const error = validateField(field, formData[field]);
        newErrors[field] = error;
      });
      setErrors(newErrors);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignatureSave = (signature) => {
    setSignatureData(signature);
    setFormData({ ...formData, signature: signature });
  };

  const isStep1Valid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.dateOfBirth &&
      !validateField("firstName", formData.firstName) &&
      !validateField("lastName", formData.lastName) &&
      !validateField("email", formData.email) &&
      !validateField("phone", formData.phone) &&
      !validateField("dateOfBirth", formData.dateOfBirth)
    );
  };

  const isStep2Valid = () => {
    return (
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zipCode &&
      formData.courseInterest &&
      !validateField("address", formData.address) &&
      !validateField("city", formData.city) &&
      !validateField("state", formData.state) &&
      !validateField("zipCode", formData.zipCode) &&
      !validateField("courseInterest", formData.courseInterest)
    );
  };

  const getFieldStatus = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) return "error";
    if (touched[fieldName] && formData[fieldName] && !errors[fieldName])
      return "success";
    return "default";
  };

  return (
    <div
      className="register-right"
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        className="glass"
        style={{
          width: "100%",
          maxWidth: "650px",
          margin: "0 auto",
          padding: "40px",
          borderRadius: "30px",
          background: "var(--card-bg)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div className="text-center mb-4">
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "var(--text-primary)",
            }}
          >
            Student Registration
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            {currentStep === 1 && "Step 1 of 3: Personal Information"}
            {currentStep === 2 && "Step 2 of 3: Address & Course Details"}
            {currentStep === 3 && "Step 3 of 3: Verification & Commitment"}
          </p>
          <div
            style={{
              width: "100%",
              height: "4px",
              background: "var(--border-color)",
              borderRadius: "2px",
              marginTop: "15px",
              display: "flex",
            }}
          >
            <div
              style={{
                width:
                  currentStep === 1
                    ? "33.33%"
                    : currentStep === 2
                      ? "66.66%"
                      : "100%",
                height: "100%",
                background: "var(--gradient)",
                borderRadius: "2px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color:
                  currentStep >= 1 ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              Personal Info
            </span>
            <span
              style={{
                fontSize: "11px",
                color:
                  currentStep >= 2 ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              Course Details
            </span>
            <span
              style={{
                fontSize: "11px",
                color:
                  currentStep >= 3 ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              Verification & Commitment
            </span>
          </div>
        </div>

        {currentStep === 1 && (
          <Step1PersonalInfo
            formData={formData}
            errors={errors}
            touched={touched}
            imagePreview={imagePreview}
            getFieldStatus={getFieldStatus}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleImageChange={handleImageChange}
            nextStep={nextStep}
            isStep1Valid={isStep1Valid}
          />
        )}

        {currentStep === 2 && (
          <Step2AddressCourse
            formData={formData}
            errors={errors}
            touched={touched}
            getFieldStatus={getFieldStatus}
            handleChange={handleChange}
            handleBlur={handleBlur}
            prevStep={prevStep}
            goToStep3={goToStep3}
            isStep2Valid={isStep2Valid}
            courses={courses}
            hearAboutOptions={hearAboutOptions}
            states={states}
          />
        )}

        {currentStep === 3 && (
          <Step3CommitmentSignature
            formData={formData}
            isSubmitting={isSubmitting}
            onSignatureSave={handleSignatureSave}
            prevStep={prevStep}
            onSubmit={onSubmit}
          />
        )}

        <div className="text-center mt-4">
          <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
            Back to home?{" "}
            <a
              href="/"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterRight;
