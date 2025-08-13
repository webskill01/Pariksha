    import { useEffect } from "react";
    import { useLocation } from "react-router-dom"; // Assuming React Router is used

    const ScrollToTop = () => {
      const { pathname } = useLocation(); // Get the current path

      useEffect(() => {
        // Scroll to the top of the page (0,0 coordinates)
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' // Optional: for a smooth scrolling effect
        });
      }, [pathname]); // Re-run the effect whenever the pathname changes

      return null; // This component doesn't render any UI
    };

    export default ScrollToTop;