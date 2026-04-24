import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCity,
  FaFlagUsa,
  FaRegAddressCard,
  FaGraduationCap,
  FaUserFriends,
  FaUpload,
  FaLanguage,
  FaCalendarCheck,
  FaLaptopCode,
} from "react-icons/fa";

const Step1IntakeForm = ({ formData, setFormData, isSubmitting, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

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

  // Local state for checkboxes
  const [verificationChecklist, setVerificationChecklist] = useState({
    englishProficiency: false,
    programCommitment: false,
    techAccess: false,
  });

  const [agreementChecklist, setAgreementChecklist] = useState({
    attendance: false,
    activeParticipation: false,
    practiceExams: false,
    faaExamCommitment: false,
  });

  const [signatureData, setSignatureData] = useState("");

  // Sync verification state with formData
  useEffect(() => {
    setVerificationChecklist({
      englishProficiency: formData.englishProficiency === true,
      programCommitment: formData.programCommitment === true,
      techAccess: formData.techAccess === true,
    });
  }, [
    formData.englishProficiency,
    formData.programCommitment,
    formData.techAccess,
  ]);

  // Update formData when agreement checklist changes
  useEffect(() => {
    const commitments = [];
    if (agreementChecklist.attendance) commitments.push("attendance");
    if (agreementChecklist.activeParticipation)
      commitments.push("activeParticipation");
    if (agreementChecklist.practiceExams) commitments.push("practiceExams");
    if (agreementChecklist.faaExamCommitment)
      commitments.push("faaExamCommitment");

    setFormData((prev) => ({
      ...prev,
      commitmentAgreements: commitments,
    }));
  }, [agreementChecklist, setFormData]);

  // Auto-populate signature fields
  useEffect(() => {
    if (signatureData && signatureData.trim().length > 0) {
      setFormData((prev) => ({
        ...prev,
        electronicSignature: signatureData,
        printedName: `${prev.firstName || ""} ${prev.lastName || ""}`.trim(),
        signatureDate: new Date().toISOString(),
      }));
    }
  }, [signatureData, formData.firstName, formData.lastName, setFormData]);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value) return "First name is required";
        if (value.length < 2) return "Must be at least 2 characters";
        return "";
      case "lastName":
        if (!value) return "Last name is required";
        if (value.length < 2) return "Must be at least 2 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(value)) return "Enter a valid email";
        return "";
      case "phone":
        if (!value) return "Phone is required";
        const phoneRegex = /^[\d\s()-]{10,}$/;
        if (!phoneRegex.test(value)) return "Enter valid phone (min 10 digits)";
        return "";
      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
        )
          age--;
        if (age < 16) return "Must be at least 16 years old";
        return "";
      case "address":
        if (!value) return "Address is required";
        if (value.length < 5) return "Enter complete address";
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
        if (!zipRegex.test(value)) return "Enter valid ZIP code";
        return "";
      case "courseInterest":
        if (!value) return "Course is required";
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
        setErrors({ ...errors, profileImage: "Image must be less than 5MB" });
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, profileImage: "Only JPG, PNG, WEBP allowed" });
        return;
      }
      setFormData({ ...formData, profileImage: file });
      setErrors({ ...errors, profileImage: "" });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVerificationChange = (key) => {
    const newValue = !verificationChecklist[key];
    setVerificationChecklist({ ...verificationChecklist, [key]: newValue });
    setFormData((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleAgreementChange = (key) => {
    setAgreementChecklist({
      ...agreementChecklist,
      [key]: !agreementChecklist[key],
    });
  };

  const isVerificationComplete = () =>
    verificationChecklist.englishProficiency === true &&
    verificationChecklist.programCommitment === true &&
    verificationChecklist.techAccess === true;

  const isAgreementComplete = () =>
    agreementChecklist.attendance === true &&
    agreementChecklist.activeParticipation === true &&
    agreementChecklist.practiceExams === true &&
    agreementChecklist.faaExamCommitment === true;

  const isSignatureValid = signatureData && signatureData.trim().length > 0;

  const isStep1Complete = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "address",
      "city",
      "state",
      "zipCode",
      "courseInterest",
    ];
    const allFieldsFilled = required.every(
      (field) => formData[field] && formData[field].toString().trim(),
    );
    const noErrors = required.every((field) => !errors[field]);

    return (
      allFieldsFilled &&
      noErrors &&
      isVerificationComplete() &&
      isAgreementComplete() &&
      isSignatureValid
    );
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (isStep1Complete()) {
      // Create a regular object (not FormData) for the API call
      // The parent Register component will handle FormData conversion
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        courseInterest: formData.courseInterest,
        hearAboutUs: formData.hearAboutUs || "Other",
        profileImage: formData.profileImage,
        // Send as actual booleans, not strings
        englishProficiency: verificationChecklist.englishProficiency === true,
        programCommitment: verificationChecklist.programCommitment === true,
        techAccess: verificationChecklist.techAccess === true,
        commitmentAgreements: JSON.stringify(formData.commitmentAgreements),
        electronicSignature: signatureData,
        printedName: `${formData.firstName} ${formData.lastName}`.trim(),
        signatureDate: new Date().toISOString(),
      };

      console.log("Submitting with values:", {
        englishProficiency: submitData.englishProficiency,
        programCommitment: submitData.programCommitment,
        techAccess: submitData.techAccess,
      });

      onSubmit(submitData);
    } else {
      const missingFields = [];
      const required = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "dateOfBirth",
        "address",
        "city",
        "state",
        "zipCode",
        "courseInterest",
      ];
      required.forEach((field) => {
        if (!formData[field]) missingFields.push(field);
      });
      if (!isVerificationComplete())
        missingFields.push("All verification checkboxes");
      if (!isAgreementComplete())
        missingFields.push("All agreement checkboxes");
      if (!isSignatureValid) missingFields.push("Signature");

      if (missingFields.length > 0) {
        toast.error(`Please complete: ${missingFields.join(", ")}`);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleFinalSubmit}>
        {/* Section 1: Candidate Contact Information */}
        <div
          className="glass"
          style={{
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "var(--text-primary)",
            }}
          >
            Section 1: Candidate Contact Information
          </h3>

          {/* Profile Image Upload */}
          <div className="text-center mb-4">
            <div
              style={{
                width: "100px",
                height: "100px",
                margin: "0 auto",
                borderRadius: "50%",
                background: "var(--gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => document.getElementById("profileImage").click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <FaUpload size={30} color="white" />
              )}
            </div>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {errors.profileImage && (
              <p
                style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}
              >
                {errors.profileImage}
              </p>
            )}
          </div>

          {/* Form Fields */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaUser /> First Name *
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.firstName && errors.firstName && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.firstName}
                </p>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaUser /> Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.lastName && errors.lastName && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaPhone /> Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.phone && errors.phone && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.phone}
                </p>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaEnvelope /> Email Address *
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.email && errors.email && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "5px",
                display: "block",
              }}
            >
              <FaMapMarkerAlt /> Residential Address *
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.address && errors.address && (
              <p
                style={{ fontSize: "11px", color: "#f44336", marginTop: "5px" }}
              >
                {errors.address}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaCity /> City *
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.city && errors.city && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.city}
                </p>
              )}
            </div>
            <div style={{ flex: 0.7 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaFlagUsa /> State *
              </label>
              <select
                name="state"
                className="form-control"
                value={formData.state || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {touched.state && errors.state && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.state}
                </p>
              )}
            </div>
            <div style={{ flex: 0.5 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaRegAddressCard /> ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                className="form-control"
                value={formData.zipCode || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.zipCode && errors.zipCode && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.zipCode}
                </p>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaCalendarAlt /> Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.dateOfBirth && errors.dateOfBirth && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                <FaGraduationCap /> Course Interested In *
              </label>
              <select
                name="courseInterest"
                className="form-control"
                value={formData.courseInterest || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {touched.courseInterest && errors.courseInterest && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#f44336",
                    marginTop: "5px",
                  }}
                >
                  {errors.courseInterest}
                </p>
              )}
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "5px",
                display: "block",
              }}
            >
              <FaUserFriends /> How did you hear about us?
            </label>
            <select
              name="hearAboutUs"
              className="form-control"
              value={formData.hearAboutUs || ""}
              onChange={handleChange}
            >
              <option value="">Select Option</option>
              {hearAboutOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 2: Verification Checklist */}
        <div
          className="glass"
          style={{
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "var(--text-primary)",
            }}
          >
            Section 2: Onboarding Verification Checklist
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={verificationChecklist.englishProficiency}
                onChange={() => handleVerificationChange("englishProficiency")}
                style={{ width: "18px", height: "18px" }}
              />
              <FaLanguage style={{ color: "var(--accent)" }} />
              <span>
                English Language Proficiency: Ability to read, write, and speak
                English (FAA requirement) *
              </span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={verificationChecklist.programCommitment}
                onChange={() => handleVerificationChange("programCommitment")}
                style={{ width: "18px", height: "18px" }}
              />
              <FaCalendarCheck style={{ color: "var(--accent)" }} />
              <span>
                Program Commitment: Availability for scheduled in-person and
                virtual sessions *
              </span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={verificationChecklist.techAccess}
                onChange={() => handleVerificationChange("techAccess")}
                style={{ width: "18px", height: "18px" }}
              />
              <FaLaptopCode style={{ color: "var(--accent)" }} />
              <span>
                Tech Access: Access to a computer and reliable internet for
                course materials *
              </span>
            </label>
          </div>
        </div>

        {/* Section 3: Commitment Agreement */}
        <div
          className="glass"
          style={{
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "var(--text-primary)",
            }}
          >
            Section 3: Candidate Commitment Agreement
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agreementChecklist.attendance}
                onChange={() => handleAgreementChange("attendance")}
                style={{ width: "18px", height: "18px" }}
              />
              ☑ Obligation to attend all training sessions and labs. *
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agreementChecklist.activeParticipation}
                onChange={() => handleAgreementChange("activeParticipation")}
                style={{ width: "18px", height: "18px" }}
              />
              ☑ Active participation in all curriculum activities and group
              discussions. *
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agreementChecklist.practiceExams}
                onChange={() => handleAgreementChange("practiceExams")}
                style={{ width: "18px", height: "18px" }}
              />
              ☑ Utilization of all provided practice exams to ensure readiness.
              *
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agreementChecklist.faaExamCommitment}
                onChange={() => handleAgreementChange("faaExamCommitment")}
                style={{ width: "18px", height: "18px" }}
              />
              ☑ Commitment to schedule and take the FAA Part 107 exam within
              thirty (30) days of program completion. *
            </label>
          </div>
        </div>

        {/* Signature Section */}
        <div
          className="glass"
          style={{
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "var(--text-primary)",
            }}
          >
            Candidate Acknowledgment
          </h3>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "500",
                display: "block",
                marginBottom: "8px",
              }}
            >
              ✍️ Electronic Signature *
            </label>
            <input
              type="text"
              placeholder="Type your full name as signature"
              className="form-control"
              value={signatureData}
              onChange={(e) => setSignatureData(e.target.value)}
              required
            />
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-secondary)",
                marginTop: "5px",
              }}
            >
              Typing your name constitutes a legal signature
            </p>
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Date Signed *
              </label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="form-control"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Print Name *
              </label>
              <input
                type="text"
                value={`${formData.firstName || ""} ${formData.lastName || ""}`.trim()}
                readOnly
                className="form-control"
              />
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div
          className="glass"
          style={{
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "25px",
            background: "rgba(59, 130, 246, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <span>
              <strong>Verification:</strong>{" "}
              {isVerificationComplete() ? "✅ Complete" : "⏳ Pending"}
            </span>
            <span>
              <strong>Commitments:</strong>{" "}
              {isAgreementComplete() ? "✅ Accepted" : "⏳ Pending"}
            </span>
            <span>
              <strong>Signature:</strong>{" "}
              {isSignatureValid ? "✅ Signed" : "⏳ Required"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn-primary-custom"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting || !isStep1Complete()}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "600",
            opacity: !isStep1Complete() ? 0.5 : 1,
            cursor: !isStep1Complete() ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Processing..." : "Continue to Screening →"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Step1IntakeForm;
