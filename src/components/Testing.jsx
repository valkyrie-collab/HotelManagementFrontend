import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

function Testing() {
  const [showSecond, setShowSecond] = useState(false);
  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);

  // Initialize positions
  useEffect(() => {
    gsap.set(firstBoxRef.current, { x: 0 });
    gsap.set(secondBoxRef.current, { x: "100%" });
  }, []);

  // Animate slide on toggle
  useEffect(() => {
    if (showSecond) {
      gsap.to(firstBoxRef.current, { x: "-100%", duration: 0.5, ease: "power2.out" });
      gsap.to(secondBoxRef.current, { x: "0%", duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(firstBoxRef.current, { x: "0%", duration: 0.5, ease: "power2.out" });
      gsap.to(secondBoxRef.current, { x: "100%", duration: 0.5, ease: "power2.out" });
    }
  }, [showSecond]);

  return (
    <div style={{ position: "relative", width: "300px", height: "200px", overflow: "hidden", border: "1px solid #ccc" }}>
      <div
        ref={firstBoxRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#4caf50",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        First Box
      </div>

      <div
        ref={secondBoxRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#2196f3",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        Second Box
      </div>

      <button
        onClick={() => setShowSecond(!showSecond)}
        style={{ marginTop: "220px", padding: "10px 20px", fontSize: "16px" }}
      >
        Toggle Slide
      </button>
    </div>
  );
}

export default Testing;
