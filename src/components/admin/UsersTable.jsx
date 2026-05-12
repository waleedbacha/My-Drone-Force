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
  FaChevronLeft,
  FaChevronRight,
  FaDollarSign,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
  FaUndo,
} from "react-icons/fa";
import "jspdf-autotable";
import OnboardingModal from "../auth/OnboardingModal";
import ExportToExcel from "./ExportToExcel";
import API_URL from "../config/api";
import generateAgreementPDF from "./AgreementPDF";

const UsersTable = ({ users, loading, fetchUsers, token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination calculations
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Reset to page 1 when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  // Helper function to get payment status badge
  const getPaymentStatusBadge = (paymentStatus) => {
    switch (paymentStatus) {
      case "completed":
        return {
          text: "Paid",
          icon: <FaCheckCircle size={12} style={{ marginRight: "4px" }} />,
          color: "#10b981",
          bg: "rgba(16, 185, 129, 0.15)",
        };
      case "pending":
        return {
          text: "Pending",
          icon: <FaHourglassHalf size={12} style={{ marginRight: "4px" }} />,
          color: "#f59e0b",
          bg: "rgba(245, 158, 11, 0.15)",
        };
      case "failed":
        return {
          text: "Failed",
          icon: (
            <FaExclamationTriangle size={12} style={{ marginRight: "4px" }} />
          ),
          color: "#ef4444",
          bg: "rgba(239, 68, 68, 0.15)",
        };
      case "refunded":
        return {
          text: "Refunded",
          icon: <FaUndo size={12} style={{ marginRight: "4px" }} />,
          color: "#6b7280",
          bg: "rgba(107, 114, 128, 0.15)",
        };
      default:
        return {
          text: "Not Started",
          icon: <FaDollarSign size={12} style={{ marginRight: "4px" }} />,
          color: "#6b7280",
          bg: "rgba(107, 114, 128, 0.1)",
        };
    }
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    if (!amount) return "$0";
    return `$${amount.toLocaleString()}`;
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await axios.delete(`${API_URL}/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`${userName} deleted successfully`);
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
      }
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

            {/* Export Button */}
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
                {/* NEW: Payment Column */}
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                  }}
                >
                  Payment
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
              {currentUsers.map((user) => {
                const paymentBadge = getPaymentStatusBadge(user.paymentStatus);
                return (
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
                    <td
                      style={{ padding: "12px", color: "var(--text-primary)" }}
                    >
                      {user.firstName} {user.lastName}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {user.email}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {user.phone}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "var(--text-secondary)",
                      }}
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
                    {/* NEW: Payment Status Column */}
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "500",
                          color: paymentBadge.color,
                          background: paymentBadge.bg,
                        }}
                      >
                        {paymentBadge.icon}
                        {paymentBadge.text}
                        {user.paymentStatus === "completed" && (
                          <span
                            style={{ marginLeft: "4px", fontWeight: "bold" }}
                          >
                            ({formatCurrency(user.paymentAmount)})
                          </span>
                        )}
                      </span>
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
                        onClick={() => generateAgreementPDF(user, token)}
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--card-bg)",
                color:
                  currentPage === 1
                    ? "var(--text-secondary)"
                    : "var(--text-primary)",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              <FaChevronLeft /> Previous
            </button>

            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  background:
                    currentPage === pageNum
                      ? "var(--gradient)"
                      : "var(--card-bg)",
                  color:
                    currentPage === pageNum ? "white" : "var(--text-primary)",
                  cursor: "pointer",
                  fontWeight: currentPage === pageNum ? "bold" : "normal",
                }}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--card-bg)",
                color:
                  currentPage === totalPages
                    ? "var(--text-secondary)"
                    : "var(--text-primary)",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next <FaChevronRight />
            </button>
          </div>
        )}

        {/* Showing info */}
        {totalUsers > 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "12px",
              color: "var(--text-secondary)",
            }}
          >
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, totalUsers)} of {totalUsers} users
          </div>
        )}

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
                  flexWrap: "wrap",
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
                  onClick={() => setActiveTab("payment")}
                  style={{
                    padding: "10px 20px",
                    background:
                      activeTab === "payment"
                        ? "var(--gradient)"
                        : "transparent",
                    border: "none",
                    borderRadius: "8px 8px 0 0",
                    color:
                      activeTab === "payment" ? "white" : "var(--text-primary)",
                    cursor: "pointer",
                  }}
                >
                  <FaDollarSign style={{ marginRight: "5px" }} />
                  Payment
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

              {/* NEW: Payment Tab */}
              {activeTab === "payment" && (
                <div>
                  <h3 style={{ marginBottom: "20px" }}>
                    <FaDollarSign style={{ marginRight: "8px" }} />
                    Payment Information
                  </h3>
                  <div style={{ display: "grid", gap: "15px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>
                        <strong>Payment Status:</strong>
                      </span>
                      <span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: getPaymentStatusBadge(
                              selectedUser.paymentStatus,
                            ).color,
                            background: getPaymentStatusBadge(
                              selectedUser.paymentStatus,
                            ).bg,
                          }}
                        >
                          {
                            getPaymentStatusBadge(selectedUser.paymentStatus)
                              .icon
                          }
                          {
                            getPaymentStatusBadge(selectedUser.paymentStatus)
                              .text
                          }
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>
                        <strong>Payment Amount:</strong>
                      </span>
                      <span
                        style={{ fontWeight: "bold", color: "var(--accent)" }}
                      >
                        {formatCurrency(selectedUser.paymentAmount)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>
                        <strong>Payment Date:</strong>
                      </span>
                      <span>
                        {selectedUser.paymentCompletedAt
                          ? new Date(
                              selectedUser.paymentCompletedAt,
                            ).toLocaleString()
                          : "Not paid yet"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                      }}
                    >
                      <span>
                        <strong>Stripe Payment ID:</strong>
                      </span>
                      <span
                        style={{ fontSize: "12px", wordBreak: "break-all" }}
                      >
                        {selectedUser.stripePaymentIntentId || "N/A"}
                      </span>
                    </div>
                    {selectedUser.paymentStatus === "completed" && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "12px",
                          background: "rgba(16, 185, 129, 0.1)",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <FaCheckCircle
                          style={{ color: "#10b981", marginRight: "8px" }}
                        />
                        <span style={{ fontSize: "13px", color: "#10b981" }}>
                          Payment confirmed and verified
                        </span>
                      </div>
                    )}
                    {selectedUser.paymentStatus === "pending" && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "12px",
                          background: "rgba(245, 158, 11, 0.1)",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <FaHourglassHalf
                          style={{ color: "#f59e0b", marginRight: "8px" }}
                        />
                        <span style={{ fontSize: "13px", color: "#f59e0b" }}>
                          Payment pending. Awaiting confirmation.
                        </span>
                      </div>
                    )}
                    {selectedUser.paymentStatus === "failed" && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "12px",
                          background: "rgba(239, 68, 68, 0.1)",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <FaExclamationTriangle
                          style={{ color: "#ef4444", marginRight: "8px" }}
                        />
                        <span style={{ fontSize: "13px", color: "#ef4444" }}>
                          Payment failed. Please check with the student.
                        </span>
                      </div>
                    )}
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
                    onClick={() => generateAgreementPDF(selectedUser, token)}
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
