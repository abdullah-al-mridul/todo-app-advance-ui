import { useEffect } from "react";

export const useWindowDimensions = () => {
  const updateDimensions = () => {
    // Get dimensions including scroll bars
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    // Set CSS variables
    document.documentElement.style.setProperty("--vw", `${vw}px`);
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--app-height", `${vh}px`);
    document.documentElement.style.setProperty("--app-width", `${vw}px`);

    // Console log the dimensions
    console.log("Window Dimensions Updated:", {
      width: vw,
      height: vh,
      cssVariables: {
        "--vw": `${vw}px`,
        "--vh": `${vh}px`,
        "--app-height": `${vh}px`,
        "--app-width": `${vw}px`,
      },
      screen: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        clientWidth: document.documentElement.clientWidth,
        clientHeight: document.documentElement.clientHeight,
      },
    });
  };

  useEffect(() => {
    // Initial update
    updateDimensions();

    // Debounce the resize event
    let timeoutId = null;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", updateDimensions);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
};
