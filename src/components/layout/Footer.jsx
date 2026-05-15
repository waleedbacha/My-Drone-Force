import React from "react";
import { useNavigate } from "react-router-dom";
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
// import { Link } from "react-scroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Home", to: "home", isRoute: false },
    { name: "About", to: "about", isRoute: false },
    { name: "Gallery", to: "gallery", isRoute: false },
    { name: "Careers", to: "careers", isRoute: false },
    { name: "Pricing", to: "/pricing", isRoute: true },
    { name: "Events", to: "/upcoming-events", isRoute: true },
    { name: "Testimonials", to: "testimonials", isRoute: false },
    { name: "Contact", to: "contact", isRoute: false },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook size={18} />,
      url: "https://www.facebook.com/profile.php?id=61589419281113",
      label: "Facebook",
    },
    {
      icon: <FaTwitter size={18} />,
      url: "https://twitter.com/mydroneforce",
      label: "Twitter",
    },
    {
      icon: <FaLinkedin size={18} />,
      url: "https://www.linkedin.com/company/my-drone-force/",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram size={18} />,
      url: "https://instagram.com/mydroneforce",
      label: "Instagram",
    },
  ];

  const handleNavigation = (link) => {
    if (link.isRoute) {
      navigate(link.to);
    } else {
      // Handle scroll to section
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(link.to);
          if (element) {
            const offset = 70;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }, 150);
      } else {
        const element = document.getElementById(link.to);
        if (element) {
          const offset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  };

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
              Mid-South Delta's leading drone training and certification
              provider. Launch your career in the fastest-growing industry.
            </p>
            <div
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
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
                  {social.icon}
                </a>
              ))}
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
                  <button
                    onClick={() => handleNavigation(link)}
                    style={{
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontSize: "14px",
                      transition: "color 0.3s ease",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: 0,
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    {link.name}
                  </button>
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
                  (501) 859-4672
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
                  mydroneforce@gmail.com
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
