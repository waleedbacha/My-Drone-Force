import React, { useEffect } from "react";
import WhoWeAre from "./WhoWeAre";
import WhatWeDo from "./WhatWeDo";
import WhoWeServe from "./WhoWeServe";

const AboutDetails = () => {
  // Scroll to top only when entering this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section
        style={{
          padding: "120px 0 60px",
          background: "var(--gradient)",
          color: "white",
        }}
      >
        <div className="container-custom text-center">
          <h1 className="display-3 fw-bold mb-3">About My Drone Force</h1>
          <p
            className="lead"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              opacity: 0.9,
            }}
          >
            Discover our mission, services, and the communities we serve
          </p>
        </div>
      </section>

      <WhoWeAre />
      <WhatWeDo />
      <WhoWeServe />
    </>
  );
};

export default AboutDetails;
