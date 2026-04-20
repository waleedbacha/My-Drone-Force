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

function App() {
  const [theme, setTheme] = useState("dark");

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

  return (
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
  );
}

export default App;
