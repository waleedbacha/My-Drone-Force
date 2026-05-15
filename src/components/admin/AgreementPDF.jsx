import jsPDF from "jspdf";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../config/api";

// Helper function to format date
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper function to format datetime
const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// // Draw a horizontal line
// const drawLine = (doc, y, xStart = 20, xEnd = 190) => {
//   doc.setDrawColor(200, 200, 200);
//   doc.line(xStart, y, xEnd, y);
// };

// Draw a section header (NO EMOJIS - clean text only)
const drawSectionHeader = (doc, title, y, color = [0, 102, 204]) => {
  doc.setFontSize(14);
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, y);

  // Add a decorative line under the header
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(0.5);
  doc.line(20, y + 3, 50, y + 3);
  doc.setLineWidth(0.2);
  doc.line(50, y + 3, 190, y + 3);
  doc.setLineWidth(0.2);

  return y + 15;
};

// Draw a field row (label: value)
const drawField = (doc, label, value, y, xLabel = 20, xValue = 80) => {
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text(label, xLabel, y);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text(value.toString(), xValue, y);
  return y + 8;
};

// Draw a checkbox item
const drawCheckbox = (doc, text, isChecked, y, xStart = 25) => {
  doc.setDrawColor(0, 0, 0);
  doc.rect(xStart, y - 5, 4, 4, isChecked ? "F" : "S");
  if (isChecked) {
    doc.setFontSize(8);
    doc.text("✓", xStart + 1, y - 2);
  }
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "normal");
  doc.text(text, xStart + 10, y);
  return y + 8;
};

// Main PDF generation function
const generateAgreementPDF = async (user, token) => {
  try {
    // Fetch agreement data from backend
    const response = await axios.get(
      `${API_URL}/api/admin/users/${user._id}/agreement`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const agreement = response.data.agreement;

    // Create PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // ========== PAGE 1: HEADER & STUDENT INFO ==========

    // Header with gradient effect
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 210, 45, "F");

    // Header text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("MY DRONE FORCE", 105, 22, { align: "center" });

    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text("Candidate Commitment Agreement", 105, 35, { align: "center" });

    let yPos = 65;

    // Student Information Section (no emoji)
    yPos = drawSectionHeader(doc, "STUDENT INFORMATION", yPos);
    yPos = drawField(
      doc,
      "Full Name:",
      `${user.firstName} ${user.lastName}`,
      yPos,
    );
    yPos = drawField(doc, "Email Address:", user.email, yPos);
    yPos = drawField(doc, "Phone Number:", user.phone, yPos);
    yPos = drawField(doc, "Course:", user.courseInterest, yPos);
    yPos = drawField(
      doc,
      "Registration Date:",
      formatDate(user.createdAt),
      yPos,
    );
    yPos = drawField(
      doc,
      "Registration Status:",
      user.registrationStatus?.replace(/_/g, " ") || "Pending",
      yPos,
    );

    yPos += 5;

    // Onboarding Verification Section (no emoji)
    yPos = drawSectionHeader(doc, "ONBOARDING VERIFICATION", yPos);
    yPos = drawCheckbox(
      doc,
      "English Language Proficiency (FAA Requirement)",
      user.englishProficiency,
      yPos,
    );
    yPos = drawCheckbox(
      doc,
      "Program Commitment (Availability for sessions)",
      user.programCommitment,
      yPos,
    );
    yPos = drawCheckbox(
      doc,
      "Technology Access (Computer & Internet)",
      user.techAccess,
      yPos,
    );

    yPos += 5;

    // Commitment Agreements Section (no emoji)
    yPos = drawSectionHeader(doc, "COMMITMENT AGREEMENTS", yPos);

    const commitments = user.commitmentAgreements || [];
    if (commitments.length > 0) {
      commitments.forEach((commitment) => {
        let displayText = commitment;
        // Format commitment text for better readability
        switch (commitment) {
          case "attendance":
            displayText = "Obligation to attend all training sessions and labs";
            break;
          case "activeParticipation":
            displayText =
              "Active participation in all curriculum activities and group discussions";
            break;
          case "practiceExams":
            displayText =
              "Utilization of all provided practice exams to ensure readiness";
            break;
          case "faaExamCommitment":
            displayText =
              "Commitment to schedule and take the FAA Part 107 exam within thirty (30) days of program completion";
            break;
          default:
            displayText = commitment;
        }
        yPos = drawCheckbox(doc, displayText, true, yPos);
      });
    } else {
      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text("No commitments recorded", 25, yPos);
      yPos += 10;
    }

    yPos += 10;

    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 30;
    }

    // Signature Section (no emoji)
    yPos = drawSectionHeader(doc, "SIGNATURE & ACKNOWLEDGMENT", yPos);
    yPos = drawField(
      doc,
      "Electronic Signature:",
      user.electronicSignature || "Not signed",
      yPos,
    );
    yPos = drawField(
      doc,
      "Signature Date:",
      formatDate(user.signatureDate),
      yPos,
    );
    yPos = drawField(doc, "Printed Name:", user.printedName || "N/A", yPos);

    if (agreement?.ipAddress) {
      yPos = drawField(doc, "IP Address:", agreement.ipAddress, yPos);
    }

    if (agreement?.userAgent) {
      yPos += 5;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "italic");
      doc.text("Browser/Device:", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const userAgentText =
        agreement.userAgent.length > 70
          ? agreement.userAgent.substring(0, 70) + "..."
          : agreement.userAgent;
      doc.text(userAgentText, 60, yPos);
      yPos += 10;
    }

    yPos += 10;

    // Legal Statement
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "italic");
    doc.text(
      "This document serves as a legally binding agreement between the candidate",
      20,
      yPos,
    );
    doc.text(
      "and My Drone Force. The electronic signature above confirms the candidate's",
      20,
      yPos + 6,
    );
    doc.text(
      "acceptance of all terms, conditions, and commitments outlined in this agreement.",
      20,
      yPos + 12,
    );

    yPos += 25;

    // Footer
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos, 190, yPos);
    yPos += 5;

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    doc.text(
      "My Drone Force | 300 South Spring Street, Suite 940, Little Rock, AR 72201",
      105,
      yPos,
      { align: "center" },
    );
    doc.text(
      `Document Generated: ${formatDateTime(new Date())}`,
      105,
      yPos + 6,
      { align: "center" },
    );
    doc.text(
      "This is an electronically generated document - valid without signature",
      105,
      yPos + 12,
      { align: "center" },
    );

    // ========== PAGE 2: DETAILED TERMS ==========
    doc.addPage();

    let page2Y = 30;

    // Terms & Conditions Header (no emoji)
    page2Y = drawSectionHeader(doc, "TERMS & CONDITIONS", page2Y);

    const terms = [
      "1. The candidate agrees to complete all training requirements as outlined in the program curriculum.",
      "2. The candidate understands that FAA Part 107 certification requires passing a federal exam.",
      "3. My Drone Force provides training and preparation but does not guarantee exam results.",
      "4. The candidate agrees to abide by all safety protocols during hands-on training sessions.",
      "5. Program fees are non-refundable after the first week of training.",
      "6. My Drone Force reserves the right to update training materials as technology evolves.",
      "7. The candidate grants permission for My Drone Force to use their success story for marketing.",
      "8. All flight operations must comply with federal, state, and local regulations.",
      "9. The candidate is responsible for maintaining their certification through FAA renewal.",
      "10. My Drone Force offers job placement assistance but does not guarantee employment.",
    ];

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "normal");

    terms.forEach((term) => {
      const lines = doc.splitTextToSize(term, 170);
      doc.text(lines, 20, page2Y);
      page2Y += lines.length * 5 + 3;
    });

    page2Y += 10;

    // Contact Information Header (no emoji)
    page2Y = drawSectionHeader(doc, "CONTACT INFORMATION", page2Y);
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(
      "For questions or concerns regarding this agreement, please contact:",
      20,
      page2Y,
    );

    page2Y += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Email: mydroneforce@gmail.com", 25, page2Y);
    page2Y += 7;
    doc.text("Phone: (501) 859-4672", 25, page2Y);
    page2Y += 7;
    doc.text(
      "Address: 300 South Spring Street, Suite 940, Little Rock, AR 72201",
      25,
      page2Y,
    );

    // Footer on page 2
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 280, 190, 280);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Page 2 of 2 | My Drone Force Candidate Agreement", 105, 288, {
      align: "center",
    });

    // Save the PDF
    doc.save(`${user.firstName}_${user.lastName}_Agreement.pdf`);
    toast.success("Agreement PDF downloaded successfully");
  } catch (error) {
    console.error("PDF generation error:", error);
    toast.error("Failed to generate PDF");
  }
};

export default generateAgreementPDF;
