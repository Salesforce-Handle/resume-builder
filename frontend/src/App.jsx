import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import ResumeBuilder from "./ResumeBuilder";
import { Analytics } from "@vercel/analytics/react"; // ✅ Correct import for React
import { SpeedInsights } from "@vercel/speed-insights/react"; // ✅ React version


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<ResumeBuilder />} />
        </Routes>
      </Router>

      {/* ✅ Add analytics at the root so it tracks all pages */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
