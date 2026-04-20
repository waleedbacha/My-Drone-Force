import React from "react";
import WhoWeAre from "./WhoWeAre";
import WhatWeDo from "./WhatWeDo";
import WhoWeServe from "./WhoWeServe";

const AboutDetails = () => {
  return (
    <>
      {/* Hero Banner for About Details Page */}
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

      {/* Three Main Sections */}
      <WhoWeAre />
      <WhatWeDo />
      <WhoWeServe />
    </>
  );
};

export default AboutDetails;
