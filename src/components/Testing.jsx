import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Testing() {
  const [isSecondVisible, setIsSecondVisible] = useState(false);
  const firstPanelRef = useRef(null);
  const secondPanelRef = useRef(null);

  // Set initial positions on mount
  useEffect(() => {
    gsap.set(firstPanelRef.current, { x: 0 });
    gsap.set(secondPanelRef.current, { x: "100%" });
  }, []);

  // Animate sliding between panels on toggle
  useEffect(() => {
    if (isSecondVisible) {
      gsap.to(firstPanelRef.current, { x: "-100%", duration: 0.6, ease: "power2.out" });
      gsap.to(secondPanelRef.current, { x: "0%", duration: 0.6, ease: "power2.out" });
    } else {
      gsap.to(firstPanelRef.current, { x: "0%", duration: 0.6, ease: "power2.out" });
      gsap.to(secondPanelRef.current, { x: "100%", duration: 0.6, ease: "power2.out" });
    }
  }, [isSecondVisible]);

  return (
    <div style={{ width: "400px", height: "250px", position: "relative", overflow: "hidden", border: "2px solid #444", borderRadius: "10px" }}>
      <div
        ref={firstPanelRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#007acc",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          userSelect: "none",
          borderRadius: "10px",
          boxSizing: "border-box",
          padding: "20px"
        }}
      >
        Panel One
      </div>

      <div
        ref={secondPanelRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#e94e77",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          userSelect: "none",
          borderRadius: "10px",
          boxSizing: "border-box",
          padding: "20px"
        }}
      >
        Panel Two
      </div>

      <button
        onClick={() => setIsSecondVisible(!isSecondVisible)}
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "#333",
          border: "none",
          color: "white",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        Toggle Panel
      </button>
    </div>
  );
}

export default Testing;
