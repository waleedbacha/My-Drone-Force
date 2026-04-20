import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
// Import your PNG logo
import logo from "../../assests/images/drone_logo2.png";

const Navbar = ({ toggleTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Dynamic logo size based on screen width and scroll state - MUCH LARGER
  const getLogoSize = () => {
    if (windowWidth < 576) {
      // Mobile
      return scrolled ? "60px" : "75px";
    } else if (windowWidth < 992) {
      // Tablet
      return scrolled ? "75px" : "95px";
    } else {
      // Desktop
      return scrolled ? "85px" : "110px";
    }
  };

  const navItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Gallery", to: "gallery" },
    { name: "Careers", to: "careers" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact" },
  ];

  const handleLogoClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleNavClick = (sectionId) => {
    setIsOpen(false);

    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 150);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "8px 0" : "15px 0",
        backgroundColor: scrolled ? "var(--card-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo - Visible in Both Modes */}
          <div
            onClick={handleLogoClick}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              className="navbar-logo"
              src={logo}
              alt="My Drone Force Logo"
              style={{
                height: getLogoSize(),
                width: "auto",
                maxWidth: "320px",
                transition: "all 0.3s ease",
                objectFit: "contain",
                ...(theme === "dark" && {
                  filter: "brightness(0) invert(1)",
                }),
              }}
            />
          </div>

          {/* Desktop Menu */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "24px" }}
            className="desktop-menu"
          >
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item.to)}
                style={{
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  background: "none",
                  border: "none",
                  fontSize: windowWidth < 1200 ? "14px" : "16px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              style={{
                background: "var(--card-bg)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-color)",
                cursor: "pointer",
              }}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="btn-primary-custom"
              style={{
                padding: "10px 28px",
                fontSize: windowWidth < 1200 ? "13px" : "16px",
              }}
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "var(--text-primary)",
              display: "none",
            }}
            className="mobile-menu-btn"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass"
            style={{
              position: "absolute",
              top: "70px",
              left: 0,
              right: 0,
              margin: "0 16px",
              padding: "20px",
              borderRadius: "20px",
              zIndex: 999,
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.to)}
                  style={{
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    padding: "12px 0",
                    fontSize: "18px",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                    background: "none",
                    border: "none",
                    width: "100%",
                  }}
                >
                  {item.name}
                </button>
              ))}

              {/* Dark/Light Mode Toggle for Mobile */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                style={{
                  background: "var(--card-bg)",
                  borderRadius: "50px",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  border: "1px solid var(--border-color)",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  fontSize: "16px",
                  fontWeight: "500",
                  width: "100%",
                }}
              >
                {theme === "light" ? (
                  <>
                    <FaMoon /> Dark Mode
                  </>
                ) : (
                  <>
                    <FaSun /> Light Mode
                  </>
                )}
              </button>

              <button
                onClick={() => handleNavClick("contact")}
                className="btn-primary-custom"
                style={{ width: "100%" }}
              >
                Enroll Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 992px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        button {
          font-family: inherit;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
