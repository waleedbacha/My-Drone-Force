import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    // Try to restore scroll position from sessionStorage
    const savedPosition = sessionStorage.getItem(`scroll_${pathname}`);

    if (savedPosition && key !== undefined) {
      // If coming back to this page, restore position
      window.scrollTo(0, parseInt(savedPosition, 10));
    } else {
      // New page navigation, scroll to top
      window.scrollTo(0, 0);
    }

    // Save current scroll position when leaving
    const saveScrollPosition = () => {
      sessionStorage.setItem(`scroll_${pathname}`, window.scrollY.toString());
    };

    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      saveScrollPosition();
    };
  }, [pathname, key]);

  return null;
};

export default ScrollToTop;
