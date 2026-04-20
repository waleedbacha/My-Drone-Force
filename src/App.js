import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import VideoIntro from "./components/common/VideoIntro"; // Add this import

function App() {
  const [theme, setTheme] = useState("dark");
  const [showIntro, setShowIntro] = useState(false); // Start with false, check after mount
  const [isLoading, setIsLoading] = useState(true);

  // Check if intro should play (only once per session)
  useEffect(() => {
    const introPlayed = sessionStorage.getItem("introPlayed");

    // If intro hasn't been played in this session, show it
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
    // Store in sessionStorage so it doesn't replay on refresh
    sessionStorage.setItem("introPlayed", "true");
  };

  // Don't render anything while checking intro state
  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* Video Intro - Only plays once per session */}
      {showIntro && <VideoIntro onComplete={handleIntroComplete} />}

      <Router>
        <ScrollToTop />
        <AnimatedBackground />
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <About />
                  <GalleryGrid />
                  <CareersSection />
                  <TestimonialCarousel />
                  <Contact />
                </>
              }
            />
            <Route path="/about-details" element={<AboutDetails />} />
            <Route path="/careers" element={<CareersPage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </Router>
    </>
  );
}

export default App;
