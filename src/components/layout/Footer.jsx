import React from "react";
import { GiDeliveryDrone } from "react-icons/gi";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-scroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Careers", to: "careers" },
    { name: "Gallery", to: "gallery" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 24px 30px",
        }}
      >
        <div className="row g-4">
          {/* Column 1 - Brand Info */}
          <div className="col-lg-4 col-md-6 col-12">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <GiDeliveryDrone size={34} style={{ color: "var(--accent)" }} />
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: 0,
                  fontSize: "24px",
                }}
                className="gradient-text"
              >
                MyDroneForce
              </h3>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "14px",
                lineHeight: "1.7",
                marginBottom: "20px",
                maxWidth: "320px",
              }}
            >
              America's leading drone training and certification provider.
              Launch your career in the fastest-growing industry.
            </p>
            <div
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <a
                href="#"
                style={{
                  color: "var(--text-secondary)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                style={{
                  color: "var(--text-secondary)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                style={{
                  color: "var(--text-secondary)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="#"
                style={{
                  color: "var(--text-secondary)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "16px",
                color: "var(--text-primary)",
              }}
            >
              Quick Links
            </h5>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {quickLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    style={{
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontSize: "14px",
                      transition: "color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="col-lg-3 col-md-6 col-12">
            <h5
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "16px",
                color: "var(--text-primary)",
              }}
            >
              Contact Info
            </h5>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <FaMapMarkerAlt
                  style={{
                    color: "var(--accent)",
                    marginTop: "3px",
                    minWidth: "16px",
                  }}
                  size={14}
                />
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  300 South Spring Street, Suite 940
                  <br />
                  Little Rock, AR 72201
                </span>
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FaPhone
                  style={{ color: "var(--accent)", minWidth: "16px" }}
                  size={14}
                />
                <span
                  style={{ color: "var(--text-secondary)", fontSize: "13px" }}
                >
                  (501) 123-4567
                </span>
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FaEnvelope
                  style={{ color: "var(--accent)", minWidth: "16px" }}
                  size={14}
                />
                <span
                  style={{ color: "var(--text-secondary)", fontSize: "13px" }}
                >
                  info@mydroneforce.com
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Office Hours */}
          <div className="col-lg-3 col-md-6 col-12">
            <h5
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "16px",
                color: "var(--text-primary)",
              }}
            >
              Office Hours
            </h5>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Monday - Friday:
                </span>
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                    display: "block",
                  }}
                >
                  9:00 AM - 6:00 PM
                </span>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Saturday:
                </span>
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                    display: "block",
                  }}
                >
                  10:00 AM - 4:00 PM
                </span>
              </li>
              <li>
                <span
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Sunday:
                </span>
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "13px",
                    display: "block",
                  }}
                >
                  Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "40px",
            marginTop: "40px",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "13px",
              marginBottom: "0",
            }}
          >
            © {currentYear} My Drone Force. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
