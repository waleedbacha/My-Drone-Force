import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaSearch,
  FaTrash,
  FaEye,
  FaFilePdf,
  FaTimesCircle,
  FaSignature,
  FaCalendarCheck,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import OnboardingModal from "../auth/OnboardingModal";
import ExportToExcel from "./ExportToExcel";

const UsersTable = ({ users, loading, fetchUsers, token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`${userName} deleted successfully`);
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const downloadAgreementPDF = async (user) => {
    try {
      const doc = new jsPDF();

      // Get IP and User Agent if available
      const response = await axios.get(
        `http://localhost:5000/api/admin/users/${user._id}/agreement`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const agreement = response.data.agreement;

      // PDF Header
      doc.setFillColor(0, 102, 204);
      doc.rect(0, 0, 210, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("My Drone Force", 105, 20, { align: "center" });
      doc.setFontSize(14);
      doc.text("Candidate Commitment Agreement", 105, 35, { align: "center" });

      // Student Information
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(`Student Name: ${user.firstName} ${user.lastName}`, 20, 60);
      doc.text(`Email: ${user.email}`, 20, 70);
      doc.text(`Phone: ${user.phone}`, 20, 80);
      doc.text(`Course: ${user.courseInterest}`, 20, 90);
      doc.text(
        `Registration Date: ${new Date(user.createdAt).toLocaleDateString()}`,
        20,
        100,
      );

      // Onboarding Verification
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text("Onboarding Verification", 20, 120);
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `✓ English Language Proficiency: ${user.englishProficiency ? "Yes" : "No"}`,
        25,
        135,
      );
      doc.text(
        `✓ Program Commitment: ${user.programCommitment ? "Yes" : "No"}`,
        25,
        145,
      );
      doc.text(
        `✓ Technology Access: ${user.techAccess ? "Yes" : "No"}`,
        25,
        155,
      );

      // Commitment Agreements
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text("Commitment Agreements", 20, 180);
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);

      const commitments = user.commitmentAgreements || [];
      let yPos = 195;
      commitments.forEach((commitment, index) => {
        doc.text(`☑ ${commitment}`, 25, yPos);
        yPos += 10;
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
      });

      // Signature Section
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      } else {
        yPos += 10;
      }

      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text("Signature & Acknowledgment", 20, yPos);
      yPos += 15;

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `Electronic Signature: ${user.electronicSignature || "N/A"}`,
        25,
        yPos,
      );
      yPos += 10;
      doc.text(
        `Signature Date: ${user.signatureDate ? new Date(user.signatureDate).toLocaleDateString() : "N/A"}`,
        25,
        yPos,
      );
      yPos += 10;
      doc.text(`Printed Name: ${user.printedName || "N/A"}`, 25, yPos);
      yPos += 10;

      if (agreement?.ipAddress) {
        doc.text(`IP Address: ${agreement.ipAddress}`, 25, yPos);
        yPos += 10;
      }

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        "This document serves as a legally binding agreement between the candidate and My Drone Force.",
        20,
        yPos + 20,
      );
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, yPos + 30);

      // Save PDF
      doc.save(`${user.firstName}_${user.lastName}_Agreement.pdf`);
      toast.success("Agreement PDF downloaded");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading users...</div>;
  }

  return (
    <>
      <div className="glass" style={{ padding: "20px", borderRadius: "20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ fontSize: "18px", color: "var(--text-primary)" }}>
            Registered Students
          </h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-secondary)",
                }}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "10px 15px 10px 40px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  width: "250px",
                }}
              />
            </div>

            {/* NEW Export Button - Replaces the old one */}
            <ExportToExcel users={filteredUsers} token={token} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Photo
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Phone
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Course
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Onboarding Checklist
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Signed
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                  <td style={{ padding: "12px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--gradient)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                            const parent = e.target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span style="color: white; font-weight: bold;">${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}</span>`;
                            }
                          }}
                        />
                      ) : (
                        <span style={{ color: "white", fontWeight: "bold" }}>
                          {user.firstName?.charAt(0)}
                          {user.lastName?.charAt(0)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "12px", color: "var(--text-primary)" }}>
                    {user.firstName} {user.lastName}
                  </td>
                  <td
                    style={{ padding: "12px", color: "var(--text-secondary)" }}
                  >
                    {user.email}
                  </td>
                  <td
                    style={{ padding: "12px", color: "var(--text-secondary)" }}
                  >
                    {user.phone}
                  </td>
                  <td
                    style={{ padding: "12px", color: "var(--text-secondary)" }}
                  >
                    {user.courseInterest}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowOnboardingModal(true);
                      }}
                      className="btn-primary-custom"
                      style={{
                        padding: "6px 12px",
                        fontSize: "12px",
                        background: "var(--gradient)",
                      }}
                    >
                      <FaChartLine style={{ marginRight: "5px" }} />
                      View Checklist
                    </button>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {user.electronicSignature ? (
                      <span
                        style={{
                          color: "#10b981",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaSignature /> Signed
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#ef4444",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaTimesCircle /> Not Signed
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent)",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => downloadAgreementPDF(user)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      title="Download Agreement PDF"
                    >
                      <FaFilePdf />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          user._id,
                          `${user.firstName} ${user.lastName}`,
                        )
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                      }}
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div
            className="text-center py-5"
            style={{ color: "var(--text-secondary)" }}
          >
            No users found
          </div>
        )}

        {/* Enhanced User Details Modal */}
        {showModal && selectedUser && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="glass"
              style={{
                maxWidth: "700px",
                width: "90%",
                maxHeight: "90vh",
                overflow: "auto",
                padding: "30px",
                borderRadius: "20px",
                background: "var(--card-bg)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  borderBottom: "1px solid var(--border-color)",
                  marginBottom: "20px",
                }}
              >
                <button
                  onClick={() => setActiveTab("basic")}
                  style={{
                    padding: "10px 20px",
                    background:
                      activeTab === "basic" ? "var(--gradient)" : "transparent",
                    border: "none",
                    borderRadius: "8px 8px 0 0",
                    color:
                      activeTab === "basic" ? "white" : "var(--text-primary)",
                    cursor: "pointer",
                  }}
                >
                  Basic Info
                </button>
                <button
                  onClick={() => setActiveTab("onboarding")}
                  style={{
                    padding: "10px 20px",
                    background:
                      activeTab === "onboarding"
                        ? "var(--gradient)"
                        : "transparent",
                    border: "none",
                    borderRadius: "8px 8px 0 0",
                    color:
                      activeTab === "onboarding"
                        ? "white"
                        : "var(--text-primary)",
                    cursor: "pointer",
                  }}
                >
                  <FaClipboardList style={{ marginRight: "5px" }} />
                  Onboarding
                </button>
                <button
                  onClick={() => setActiveTab("agreement")}
                  style={{
                    padding: "10px 20px",
                    background:
                      activeTab === "agreement"
                        ? "var(--gradient)"
                        : "transparent",
                    border: "none",
                    borderRadius: "8px 8px 0 0",
                    color:
                      activeTab === "agreement"
                        ? "white"
                        : "var(--text-primary)",
                    cursor: "pointer",
                  }}
                >
                  <FaSignature style={{ marginRight: "5px" }} />
                  Agreement
                </button>
              </div>

              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
                        overflow: "hidden",
                      }}
                    >
                      {selectedUser.profileImage ? (
                        <img
                          src={selectedUser.profileImage}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: "40px", color: "white" }}>
                          {selectedUser.firstName?.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "12px" }}>
                    <h3
                      style={{
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "10px",
                      }}
                    >
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        gap: "10px",
                      }}
                    >
                      <p>
                        <strong>Email:</strong>
                      </p>
                      <p>{selectedUser.email}</p>
                      <p>
                        <strong>Phone:</strong>
                      </p>
                      <p>{selectedUser.phone}</p>
                      <p>
                        <strong>Date of Birth:</strong>
                      </p>
                      <p>
                        {new Date(
                          selectedUser.dateOfBirth,
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Address:</strong>
                      </p>
                      <p>
                        {selectedUser.address}, {selectedUser.city},{" "}
                        {selectedUser.state} {selectedUser.zipCode}
                      </p>
                      <p>
                        <strong>Course:</strong>
                      </p>
                      <p>{selectedUser.courseInterest}</p>
                      <p>
                        <strong>Cohort Month:</strong>
                      </p>
                      <p>{selectedUser.cohortMonth || "Not assigned"}</p>
                      <p>
                        <strong>Registered:</strong>
                      </p>
                      <p>
                        {new Date(selectedUser.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Status:</strong>
                      </p>
                      <p>{selectedUser.status}</p>
                      <p>
                        <strong>Registration Status:</strong>
                      </p>
                      <p>
                        {selectedUser.registrationStatus?.replace(/_/g, " ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Onboarding Tab */}
              {activeTab === "onboarding" && (
                <div>
                  <h3 style={{ marginBottom: "20px" }}>
                    Onboarding Verification
                  </h3>
                  <div style={{ display: "grid", gap: "15px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>English Language Proficiency:</span>
                      <span
                        style={{
                          color: selectedUser.englishProficiency
                            ? "#10b981"
                            : "#ef4444",
                        }}
                      >
                        {selectedUser.englishProficiency ? "✅ Yes" : "❌ No"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>Program Commitment:</span>
                      <span
                        style={{
                          color: selectedUser.programCommitment
                            ? "#10b981"
                            : "#ef4444",
                        }}
                      >
                        {selectedUser.programCommitment ? "✅ Yes" : "❌ No"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>Technology Access:</span>
                      <span
                        style={{
                          color: selectedUser.techAccess
                            ? "#10b981"
                            : "#ef4444",
                        }}
                      >
                        {selectedUser.techAccess ? "✅ Yes" : "❌ No"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>Screening Status:</span>
                      <span
                        style={{
                          color:
                            selectedUser.screeningRubric?.eligibilityStatus ===
                            "eligible"
                              ? "#10b981"
                              : selectedUser.screeningRubric
                                    ?.eligibilityStatus === "conditional"
                                ? "#ff9800"
                                : "#ef4444",
                        }}
                      >
                        {selectedUser.screeningRubric?.eligibilityStatus ===
                          "eligible" && "✅ ELIGIBLE"}
                        {selectedUser.screeningRubric?.eligibilityStatus ===
                          "conditional" && "⚠️ CONDITIONAL"}
                        {selectedUser.screeningRubric?.eligibilityStatus ===
                          "not_eligible" && "❌ NOT ELIGIBLE"}
                        {!selectedUser.screeningRubric?.eligibilityStatus &&
                          "⏳ Pending"}
                      </span>
                    </div>
                    {selectedUser.screeningRubric?.percentage && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                          background: "var(--bg-secondary)",
                          borderRadius: "8px",
                        }}
                      >
                        <span>Screening Score:</span>
                        <span>{selectedUser.screeningRubric.percentage}%</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedUser(selectedUser);
                      setShowOnboardingModal(true);
                    }}
                    className="btn-primary-custom"
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <FaChartLine style={{ marginRight: "8px" }} />
                    Open Full Onboarding Checklist
                  </button>
                </div>
              )}

              {/* Agreement Tab */}
              {activeTab === "agreement" && (
                <div>
                  <h3 style={{ marginBottom: "20px" }}>
                    Candidate Commitment Agreement
                  </h3>
                  <div style={{ display: "grid", gap: "15px" }}>
                    <div
                      style={{
                        padding: "15px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <p>
                        <strong>Commitments:</strong>
                      </p>
                      <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                        {(selectedUser.commitmentAgreements || []).map(
                          (item, idx) => (
                            <li key={idx} style={{ marginBottom: "8px" }}>
                              ☑ {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>
                        <FaSignature /> Electronic Signature:
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {selectedUser.electronicSignature || "N/A"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>
                        <FaCalendarCheck /> Signature Date:
                      </span>
                      <span>
                        {selectedUser.signatureDate
                          ? new Date(
                              selectedUser.signatureDate,
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>Printed Name:</span>
                      <span>{selectedUser.printedName || "N/A"}</span>
                    </div>
                    {selectedUser.signatureIpAddress && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                          background: "var(--bg-secondary)",
                          borderRadius: "8px",
                        }}
                      >
                        <span>IP Address:</span>
                        <span>{selectedUser.signatureIpAddress}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => downloadAgreementPDF(selectedUser)}
                    className="btn-primary-custom"
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <FaFilePdf style={{ marginRight: "8px" }} />
                    Download Agreement PDF
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowModal(false)}
                className="btn-outline-custom"
                style={{
                  marginTop: "20px",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Onboarding Modal */}
        <OnboardingModal
          isOpen={showOnboardingModal}
          onClose={() => {
            setShowOnboardingModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          token={token}
        />
      </div>
    </>
  );
};

export default UsersTable;
