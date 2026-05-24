import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import About from "./components/about/About";
import AboutDetails from "./components/about/AboutDetails";
import { GalleryGrid } from "./components/gallery";
import { TestimonialCarousel } from "./components/testimonials";
import CareersSection from "./components/careers/CareersSection";
import CareersPage from "./components/careers/CareersPage";
import Contact from "./components/contact";
import AnimatedBackground from "./components/common/AnimatedBackground";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import VideoIntro from "./components/common/VideoIntro";
import Register from "./components/auth/Register";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import MidSouthAdvantage from "./components/home/MidSouthAdvantage";
import SegmentedCTASection from "./components/home/SegmentedCTASection";
import EventsPage from "./components/events/EventsPage";
import PricingSection from "./components/pricing/PricingSection";
import PricingPage from "./components/pricing/PricingPage";
import ClarityInit from "./components/microsoft-clarity/ClarityInit";
import WebinarPopup from "./components/common/WebinarPopup"; // ADD THIS

// Component to conditionally show Navbar and Footer
const Layout = ({ children, toggleTheme, theme }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isRegisterRoute = location.pathname === "/register";

  // Hide navbar on admin and register pages
  const hideNavbar = isAdminRoute || isRegisterRoute;
  const hideFooter = isAdminRoute || isRegisterRoute;

  return (
    <>
      <ClarityInit />
      {!hideNavbar && <Navbar toggleTheme={toggleTheme} theme={theme} />}
      <AnimatedBackground />
      <main>{children}</main>
      {!hideFooter && <Footer />}
      <ScrollToTopButton />
    </>
  );
};

function App() {
  const [theme, setTheme] = useState("dark");
  const [showIntro, setShowIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWebinarPopup, setShowWebinarPopup] = useState(false); // ADD THIS

  // Zoom Webinar Link
  const webinarZoomLink =
    "https://us06web.zoom.us/meeting/register/nTqIJnRYTpy__B-bgSktkw";

  // Check if intro should play (only once per session)
  useEffect(() => {
    const introPlayed = sessionStorage.getItem("introPlayed");
    if (!introPlayed) {
      setShowIntro(true);
    }
    setIsLoading(false);
  }, []);

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("introPlayed", "true");
  };

  // Handler for when video ends - shows webinar popup
  const handleVideoEnd = () => {
    // Check if user already saw popup this session
    const hasSeenPopup = sessionStorage.getItem("webinarPopupSeen");

    if (!hasSeenPopup) {
      // Small delay for smooth transition
      setTimeout(() => {
        setShowWebinarPopup(true);
        sessionStorage.setItem("webinarPopupSeen", "true");
      }, 500);
    }
  };

  // Handler to close popup
  const handleClosePopup = () => {
    setShowWebinarPopup(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {showIntro && (
        <VideoIntro
          onComplete={handleIntroComplete}
          onVideoEnd={handleVideoEnd}
        />
      )}

      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Layout toggleTheme={toggleTheme} theme={theme}>
                <HeroSection />
                <About />
                <MidSouthAdvantage />
                {/* <SuccessPipeline /> */}
                <GalleryGrid />
                <CareersSection />
                <PricingSection />
                <TestimonialCarousel />
                <SegmentedCTASection />
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/about-details"
            element={
              <Layout toggleTheme={toggleTheme} theme={theme}>
                <AboutDetails />
              </Layout>
            }
          />
          <Route
            path="/careers"
            element={
              <Layout toggleTheme={toggleTheme} theme={theme}>
                <CareersPage />
              </Layout>
            }
          />
          <Route
            path="/pricing"
            element={
              <Layout toggleTheme={toggleTheme} theme={theme}>
                <PricingPage />
              </Layout>
            }
          />
          <Route
            path="/upcoming-events"
            element={
              <Layout toggleTheme={toggleTheme} theme={theme}>
                <EventsPage />
              </Layout>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>

      {/* Webinar Registration Popup */}
      <WebinarPopup
        isOpen={showWebinarPopup}
        onClose={handleClosePopup}
        zoomLink={webinarZoomLink}
      />
    </>
  );
}

export default App;
