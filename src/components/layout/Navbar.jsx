import React, { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen && windowWidth < 992) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, windowWidth]);

  // Logo size
  const getLogoSize = () => {
    if (windowWidth < 576) {
      return scrolled ? "70px" : "85px";
    } else if (windowWidth < 992) {
      return scrolled ? "85px" : "110px";
    } else {
      return scrolled ? "100px" : "130px";
    }
  };

  // Navbar padding
  const getNavbarPadding = () => {
    if (windowWidth < 576) {
      return scrolled ? "5px 0" : "10px 0";
    } else if (windowWidth < 992) {
      return scrolled ? "8px 0" : "12px 0";
    } else {
      return scrolled ? "10px 0" : "15px 0";
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
    // Reset body overflow
    document.body.style.overflow = "auto";

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

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
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
        padding: getNavbarPadding(),
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
          {/* Logo */}
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
                maxWidth: "400px",
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
            aria-label="Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu - FIXED SMOOTH ANIMATION */}
      <AnimatePresence mode="wait">
        {isOpen && windowWidth < 992 && (
          <motion.div
            ref={menuRef}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
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
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavClick(item.to)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                </motion.button>
              ))}

              {/* Dark/Light Mode Toggle for Mobile */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
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
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => handleNavClick("contact")}
                className="btn-primary-custom"
                style={{ width: "100%" }}
              >
                Enroll Now
              </motion.button>
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
