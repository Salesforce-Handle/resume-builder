// React Resume Builder with Editable Dynamic Fields and Modern UI Layout
import React, { useState, useEffect } from "react";     
import WelcomePopup from "./components/WelcomePopup";
import { Trophy, Award, Gem, Star, Sparkles } from "lucide-react";
import '@fontsource/inter/index.css';
import './index.css';
import { useResumeStorage } from "./components/hooks/useResumeStorage";
import { track } from '@vercel/analytics';


//sections imported
import SummarySection from "./sections/SummarySection";
import WorkExperienceSection from "./sections/WorkExperienceSection";
import EducationSection from "./sections/EducationSection";
import StrengthSection from "./sections/StrengthSection";
import SkillsSection from "./sections/SkillsSection";
import CertificationsSection from "./sections/CertificationsSection";
import LanguagesSection from "./sections/LanguagesSection";
import PersonalInfoSection from "./sections/PersonalInfoSection";


export default function App() {
  const [formData, setFormData] = useState({
    name: "Your Name",
    title: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
      visibility: {
        email: true,
        phone: true,
        linkedin: true,
        title: true,
        location: true
    },
    summaryTitle: "Summary",
    summary: "",
    workTitle: "Experience",
    EduTitle: "Education",
    strengthtitle: "Strengths",
    skillTitle: "Skills",
    certTittle: "Certifications",
    langTittle: "Languages"
  });

  // workex
  const [workExperiences, setWorkExperiences] = useState([
    { 
      company: "",
      role: "", 
      duration: { from: "", to: "" },
      project: "", 
      responsibility: ""
    }
  ]);

  // edu
  const [educations, setEducations] = useState([
    {
      institute: "",
      degree: "",
      duration: { from: "", to: "" },
      notes: "",
    },
  ]);
 
  //skill
  const [skills, setSkills] = useState([""]);

  // certs
  const [certifications, setCertifications] = useState([""]);

  // lang
  const [languages, setLanguages] = useState([""]);


  // strengths
  const strengthIcons = [Trophy, Award, Gem, Star, Sparkles];
  const [strengths, setStrengths] = useState([
  { title: 'Ownership', description: '' }
  ]);

  
  useResumeStorage({
  formData, setFormData,
  workExperiences, setWorkExperiences,
  educations, setEducations,
  skills, setSkills,
  certifications, setCertifications,
  languages, setLanguages,
  strengths, setStrengths
  });

  // themes
  const themes = {
    classicBlue: {
      header: "text-blue-700",
      headerTitles: "text-blue-700 text-xl font-bold mb-2",
      headerBorder: "border-b-2 border-blue-500",
      subheader: "text-blue-500",
      body: "text-gray-800",
    },
    elegantBlack: {
      header: "text-black",
      headerTitles: "text-gray-900 text-xl font-bold mb-2",
      headerBorder: "border-b-2 border-gray-600",
      subheader: "text-gray-700",
      body: "text-gray-900",
    },
    vibrantSunset: {
      header: "text-orange-600",
      headerTitles: "text-orange-600 text-xl font-bold mb-2",
      headerBorder: "border-b-2 border-orange-400",
      subheader: "text-pink-500",
      body: "text-gray-800",
    },
    calmTeal: {
      header: "text-teal-600",
      headerTitles: "text-teal-600 text-xl font-bold mb-2",
      headerBorder: "border-b-2 border-teal-400",
      subheader: "text-teal-400",
      body: "text-gray-800",
    },

    // Professional, fresh, subtle palettes inspired by top CV/resume trends:

    deepForest: {
      header: "text-green-900",
      headerTitles: "text-green-900 text-xl font-bold mb-2",
      headerBorder: "border-b-2 border-green-700",
      subheader: "text-green-700",
      body: "text-gray-900",
    },
  };
  const [selectedTheme, setSelectedTheme] = useState("classicBlue");
  const currentTheme = themes[selectedTheme];

  // generating pdf with motivational quotes
  const [isGenerating, setIsGenerating] = useState(false);

    const motivationalQuotes = [
    "You’re ready.",
    "Time to shine.",
    "Your story matters.",
    "Stand out. Speak loud.",
    "Next stop: success.",
    "They’ll remember this.",
    "Future. Loaded.",
    "Built to impress.",
    "One page. Big leap.",
    "Let’s get you hired.",
    "Game face: on."
  ];

  const [quote, setQuote] = useState("");

  // pdf generation 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const downloadPDF = async () => {
    const preview = document.getElementById("resume-preview");

    // Clone so you don’t mess with live DOM
    const clonedPreview = preview.cloneNode(true);
    clonedPreview.style.boxSizing = "border-box";
    clonedPreview.classList.remove("w-full", "lg:w-4/5", "shadow-xl", "p-14");

    // Remove no-print items
    clonedPreview.querySelectorAll(".no-print").forEach((el) => el.remove());

    const fullHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Resume</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          padding-bottom: 20mm;
        }
      </style>
    </head>
    <body>
      ${clonedPreview.outerHTML}
    </body>
    </html>`;

    try {
      // Show a motivational quote during generation
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setQuote(randomQuote);
      setIsGenerating(true);

      // Call backend
      const response = await fetch(`${backendUrl}/generate-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: fullHtml }),
      });

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // ✅ Create link in DOM (Safari fix)
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);

      // ✅ Special handling for iOS Safari (doesn’t support link.click())
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        window.open(url, "_blank"); // Open in new tab, user can share/save
      } else {
        link.click();
      }

      // ✅ Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setIsGenerating(false);
      track("Resume Downloaded");
    }
  }; 


  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);
  
  return (
  <>
  <WelcomePopup/>
  {isGenerating && (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4 fade-in">
        {/* Bouncing Dots */}
        <div className="flex space-x-2">
          {["😊", "😄", "🥳"].map((emoji, i) => (
            <span
              key={i}
              className="text-2xl animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
        {/* Rotating motivational quote */}
      <p className="text-gray-800 text-sm font-semibold italic">{quote}</p>
      </div>
    </div>
  )}

  <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-12 font-[Inter] bg-gradient-to-br from-gray-50 to-white">

   {/* Top panel here */}
    <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
      {/* Theme Picker */}
      <div className="flex gap-4 items-center bg-white border border-gray-200 shadow-md rounded-md px-3 py-2 text-sm">
        <label className="font-semibold">Pick a Theme</label>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="border border-gray-200 rounded px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Object.keys(themes).map((themeKey) => (
            <option key={themeKey} value={themeKey}>
              {themeKey
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {/* Support Buttons */}
      <div className="flex gap-2">
        <a
          href="https://www.buymeacoffee.com/sforcehandle"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFDD00] text-black font-semibold text-sm rounded-md shadow hover:brightness-105 transition"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
            className="w-5 h-5"
          />
          Buy me a coffee
        </a>


        {/* PDF Button */}
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded border border-blue-600 hover:bg-blue-700 hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow"
        > 
          📄 Download PDF
        </button>
      </div>
    </div>

   {/* Resume container starts here */}

   <div className="flex justify-center gap-6 ">
    <div id="resume-preview" className="w-full max-w-[940px] bg-white shadow-xl p-4 sm:p-6 md:p-10 lg:p-14">

      {/* Persons Info */}
        <PersonalInfoSection
          formData={formData}
          setFormData={setFormData}
          currentTheme={currentTheme}
        />

      <div id="resume-grid" className="grid grid-cols-1 md:grid-cols-8 gap-4">

      {/* Left Column */}
      <div id="left-sections" className="md:col-span-5 space-y-6">

        {/* Summary */}
        <div className="mb-2 px-4">
        <SummarySection
          summaryTitle={formData.summaryTitle}
          setSummaryTitle={(val) => setFormData({ ...formData, summaryTitle: val })}
          summary={formData.summary}
          setSummary={(val) => setFormData({ ...formData, summary: val })}
          currentTheme={currentTheme}
        />

        </div>

        {/* Work Experience */}
        <div className="mb-2 px-4">
        <WorkExperienceSection
          workExperiences={workExperiences}
          setWorkExperiences={setWorkExperiences}
          workTitle={formData.workTitle}
          setWorkTitle={(val) => setFormData({ ...formData, workTitle: val })}
          currentTheme={currentTheme}
        />
        </div>

        {/* Education */}
        <div className="mb-2 px-4">
        <EducationSection
          educations={educations}
          setEducations={setEducations}
          formData={formData}
          setFormData={setFormData}
          currentTheme={currentTheme}
        />
        </div>

      </div>

      {/* Right Column */}
      <div id="right-sections" className="md:col-span-3 space-y-6">
      
      {/* Strengths */}
      <StrengthSection
        strengths={strengths}
        setStrengths={setStrengths}
        strengthtitle={formData.strengthtitle}
        setStrengthtitle={(val) => setFormData({ ...formData, strengthtitle: val })}
        strengthIcons={strengthIcons}
        currentTheme={currentTheme}
      />

      {/* Skill */}
      <SkillsSection
        skills={skills}
        setSkills={setSkills}
        skillTitle={formData.skillTitle}
        setSkillTitle={(val) => setFormData({ ...formData, skillTitle: val })}
        currentTheme={currentTheme}
      />

      {/* Certifications */}
      <CertificationsSection
        certifications={certifications}
        setCertifications={setCertifications}
        certTitle={formData.certTittle}
        setCertTitle={(val) => setFormData({ ...formData, certTittle: val })}
        currentTheme={currentTheme}
      />


      {/* Languages */}
      <LanguagesSection
        languages={languages}
        setLanguages={setLanguages}
        langTitle={formData.langTittle}
        setLangTitle={(val) => setFormData({ ...formData, langTittle: val })}
        currentTheme={currentTheme}
      />
      </div>

      </div>
      </div>
   

    {/* Ad Sidebar */}
    <div className="hidden lg:block w-[300px]">
      <div className="sticky top-20">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5049593526296631"
          data-ad-slot="5498782763"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
</div>
    </div>
  </>
  );
}