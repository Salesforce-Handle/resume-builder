// React Resume Builder with Editable Dynamic Fields and Modern UI Layout
import React, { useState } from "react";     
import { Briefcase, MapPin, Mail, Phone, Linkedin, Eye, EyeOff, Trophy, Award, Gem, Star, Sparkles } from "lucide-react";
import EditableDateRange from "./components/EditableDateRange";
import EditableField from "./components/EditableField";
import EditableTag from "./components/EditableTag";
import SectionControls from "./components/SectionControls";
import VisibilityToggleMenu from "./components/VisibilityToggleMenu";
import '@fontsource/inter/index.css';
import './index.css';

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
    summaryTitle: "Professional Summary",
    summary: "",
    workTitle: "Work Experience",
    EduTitle: "Education",
    strengthtitle: "Strengths",
    skillTitle: "Skills",
    certTittle: "Certifications",
    langTittle: "Languages"
  });

  const strengthIcons = [Trophy, Award, Gem, Star, Sparkles];
  const [workExperiences, setWorkExperiences] = useState([
    { 
      company: "",
      role: "", 
      duration: { from: "", to: "" },
      project: "", 
      responsibility: ""
    }
  ]);
  
  const [educations, setEducations] = useState([
    {
      institute: "",
      degree: "",
      duration: { from: "", to: "" },
      notes: "",
    },
  ]);
  
  const [languages, setLanguages] = useState([""]);
  const [certifications, setCertifications] = useState([""]);

  const handleWorkChange = (index, field, value) => {
    const newWork = [...workExperiences];
    newWork[index][field] = value;
    setWorkExperiences(newWork);
  };

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { company: '', role: '', dateRange: { from: "", to: "" }, project: '', responsibility: '' }]);
  };

  const removeWorkExperience = (index) => {
    if (workExperiences.length > 1) {
      const newWork = [...workExperiences];
      newWork.splice(index, 1);
      setWorkExperiences(newWork);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        institute: "",
        degree: "",
        duration: { from: "", to: "" },
        notes: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    if (educations.length > 1) {
      const updated = [...educations];
      updated.splice(index, 1);
      setEducations(updated);
    }
  };
 
  const [skills, setSkills] = useState([""]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  
  const handleSkillChange = (index, newVal) => {
    const updated = [...skills];
    updated[index] = newVal;
    setSkills(updated);
  };
  
  const insertSkillAt = (index) => {
    const updated = [...skills];
    updated.splice(index, 0, '');
    setSkills(updated);
    setFocusedIndex(index); // Set focus on new one
  };
  
  const removeSkill = (index) => {
    // Prevent removing the last remaining skill (even if empty)
    if (skills.length === 1) {
      return;
    }  
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  
    if (index > 0) {
      setFocusedIndex(index - 1);
    } else {
      setFocusedIndex(null);
    }
  };
  
  const handleCertificationChange = (index, e) => {
    const newCerts = [...certifications];
    newCerts[index] = e.target.value;
    setCertifications(newCerts);
  };

  const addCertification = () => {
    setCertifications([...certifications, '']);
  };

  const removeCertification = (index) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    setCertifications(updated);
  };

  const handleLanguageChange = (index, e) => {
    const newLang = [...languages];
    newLang[index] = e.target.value;
    setLanguages(newLang);
  };

  const addLanguage = () => {
    setLanguages([...languages, '']);
  };

  const removeLanguages = (index) => {
    const updated = [...languages];
    updated.splice(index, 1);
    setLanguages(updated);
  };

  const [strengths, setStrengths] = useState([
  { title: 'Ownership', description: '' }
  ]);

  const addStrength = () => setStrengths([...strengths, { title: '', description: '' }]);

  const removeStrength = (index) =>
    setStrengths(strengths.filter((_, i) => i !== index));

  const handleStrengthChange = (index, field, value) => {
    const updated = [...strengths];
    updated[index][field] = value;
    setStrengths(updated);
  };

  const moveItemUp = (index, listSetter) => {
    listSetter(prev => {
      if (index <= 0) return prev;
      const newList = [...prev];
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
      return newList;
    });
  };
  
  const moveItemDown = (index, listSetter) => {
    listSetter(prev => {
      if (index >= prev.length - 1) return prev;
      const newList = [...prev];
      [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
      return newList;
    });
  };
  
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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  
  const downloadPDF = async () => {
  const preview = document.getElementById('resume-preview');
  // Clone the preview so you can modify it without touching the live DOM
  const clonedPreview = preview.cloneNode(true);
  //clonedPreview.style.padding = '10mm';
  clonedPreview.style.boxSizing = 'border-box';
  clonedPreview.classList.remove('w-full', 'lg:w-4/5', 'shadow-xl', 'p-14');
  const eyeMenus = clonedPreview.querySelectorAll(".no-print");
  eyeMenus.forEach((el) => el.remove());

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
    #resume-preview {
      box-sizing: border-box;
    }

  </style>
</head>
<body>
  ${clonedPreview.outerHTML}
</body>
</html>`;


  try {
    const response = await fetch(`${backendUrl}/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: fullHtml }),
    });

    if (!response.ok) throw new Error('Failed to generate PDF');

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    link.click();
  } catch (err) {
    console.error('PDF download failed:', err);
  }
};
  
  return (

  <div className="min-h-screen p-6 lg:p-12 font-[Inter] bg-gradient-to-br from-gray-50 to-white">

    {/* Top panel here */}
      <div className="mb-6 flex justify-between items-center">
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
                .replace(/([A-Z])/g, ' $1')    // Add space before capital letters
                .replace(/^./, str => str.toUpperCase())}  {/* Capitalize first letter */}
            </option>
          ))}
        </select>
      </div>
      
      {/* Visibility Toggle Menu (Now always visible and horizontal) */}
      <VisibilityToggleMenu
        visibility={formData.visibility}
        onToggle={(field) =>
          setFormData((prev) => ({
            ...prev,
            visibility: {
              ...prev.visibility,
              [field]: !prev.visibility[field],
            },
          }))
        }
        fields={["title", "location", "email", "phone", "linkedin"]}
      />

      <button  onClick={downloadPDF}  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded border border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
      >📄 Download PDF</button>
    
      </div>

   {/* Resume container starts here */}

   <div className="flex justify-center ">
    <div id="resume-preview" className="w-full max-w-[940px] aspect-[47/66.5] bg-white shadow-xl p-14 lg:w-4/5 ">

      {/* Persons Info */}
        <div id="person-card" className="col-span-3 space-y-6">
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2 px-4 py-2">
              
              {/* Left Side: Info */}
              <div className="text-center sm:text-left space-y-1 text-sm relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all">

                {/* Name */}
                <EditableField
                  value={formData.name}
                  onChange={(val) => setFormData({ ...formData, name: val })}
                  placeholder="Your Full Name"
                  className={`text-5xl font-bold ${currentTheme.header}`}
                />

                {/* Role + Location */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-2">
                  {formData.visibility.title && (
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} className="text-gray-500" />
                      <EditableField
                        value={formData.title}
                        onChange={(val) => setFormData({ ...formData, title: val })}
                        placeholder="Your Role"
                        className={`text-l font-bold ${currentTheme.subheader}`}
                      />
                    </div>
                  )}
                  {formData.visibility.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-sm text-gray-500" />
                      <EditableField
                        value={formData.location}
                        onChange={(val) => setFormData({ ...formData, location: val })}
                        placeholder="Location"
                        className={`${currentTheme.body}`}
                      />
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 -mt-1 px-2">
                  {formData.visibility.email && (
                    <div className="flex items-center gap-1">
                      <Mail size={16} className="text-sm text-gray-500" />
                      <EditableField
                        value={formData.email}
                        onChange={(val) => setFormData({ ...formData, email: val })}
                        placeholder="Email"
                        className={`${currentTheme.body}`}
                      />
                    </div>
                  )}
                  {formData.visibility.phone && (
                    <div className="flex items-center gap-1">
                      <Phone size={16} className="text-sm text-gray-500" />
                      <EditableField
                        value={formData.phone}
                        onChange={(val) => setFormData({ ...formData, phone: val })}
                        placeholder="Phone"
                        className={`${currentTheme.body}`}
                      />
                    </div>
                  )}
                  {formData.visibility.linkedin && (
                    <div className="flex items-center gap-1">
                      <Linkedin size={16} className="text-sm text-gray-500" />
                      <EditableField
                        value={formData.linkedin}
                        onChange={(val) => setFormData({ ...formData, linkedin: val })}
                        placeholder="LinkedIn URL"
                        className={`${currentTheme.body}`}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Future Image Placeholder*/}
              <div className="mt-4 sm:mt-0 no-print">
              </div>
            </div>
          </section>
        </div>

        <div className=" grid grid-cols-8 gap-4">        
        {/* Left Column */}
        <div id="left-sections" className="col-span-5 space-y-6">

        {/* Summary */}
        <div  id="sum-section"  className="mb-2 px-4">
          <section>
          <div  id="sum-title" >
            <EditableField value={formData.summaryTitle}  onChange={(val) => setFormData({ ...formData, summaryTitle: val })}  
              placeholder="Summary" className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`} />
          </div>
          <div  id="sum-body" className="w-full">
            <EditableField
              value={formData.summary}
              onChange={(val) => setFormData({ ...formData, summary: val })}
              placeholder="Summarize your relevant skills, experience, and achievements that align with this role."
              className={`w-full min-h-[50px] min-w-[100px] whitespace-pre-wrap text-xs text-gray-500 ${currentTheme.body}`}
            />
          </div>
          </section>
        </div>

        {/* Work Experience */}
        <div  id="work-exp-section"  className="mb-2 px-4">
          <section>
            {/* Work title */}
          <div  id="work-title" >
            <EditableField value={formData.workTitle}  onChange={(val) => setFormData({ ...formData, workTitle: val })}  
              placeholder="Work Experience" className={`${currentTheme.headerBorder}  ${currentTheme.headerTitles}`} />
          </div>

           {workExperiences.map((exp, index) => (

              <div key={index}
              id={`work-ex-${index}`}
              className={`relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-4 ${
              index !== workExperiences.length - 1 ? 'pb-1 border-b border-dashed border-gray-300' : ''
              }`}>
          
                <SectionControls index={index} total={workExperiences.length}  onAdd={addWorkExperience} onRemove={removeWorkExperience} 
                className={'absolute -top-10 right-10'} onMoveUp={(i) => moveItemUp(i, setWorkExperiences)}  onMoveDown={(i) => moveItemDown(i, setWorkExperiences)} />

                <EditableField
                  value={exp.role}
                  onChange={(val) => handleWorkChange(index, 'role', val)}
                  placeholder="Job Title"
                  className={`font-medium ${currentTheme.body}`}
                />
                <EditableField
                  value={exp.company}
                  onChange={(val) => handleWorkChange(index, 'company', val)}
                  placeholder="Company Name"
                  className={`text-sm2 font-bold ${currentTheme.subheader}`}
                />
                <EditableDateRange
                  value={exp.dateRange}
                  onChange={(val) => handleWorkChange(index, 'dateRange', val)}
                  className={`text-x2s ${currentTheme.body}`}
                  mode="month-year"
                />
                <EditableField
                  value={exp.project}
                  onChange={(val) => handleWorkChange(index, 'project', val)}
                  placeholder="Project Description"
                  className={`text-xs text-gray-500 ${currentTheme.body}`}
                />
                <EditableField
                  value={exp.responsibility}
                  onChange={(val) => handleWorkChange(index, 'responsibility', val)}
                  placeholder="• Highlight your accomplishments"
                  className={`text-xs text-gray-700 whitespace-pre-wrap pl-2 [text-indent:-1.25rem]${currentTheme.body}`}
                  bulleted={true}
                />
             </div>            
            ))}
          </section>          
        </div>

        {/* Education */}
        <div  id="edu-section"  className="mb-2 px-4">
          <section>

          <div id="Edu-title">
            <EditableField
              value={formData.EduTitle}
              onChange={(val) => setFormData({ ...formData, EduTitle: val })}
              placeholder="Education"
              className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
            />
          </div>

          {educations.map((edu, index) => (
            
            <div key={index} id={`edu-${index}`} className={`relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-4 ${
              index !== educations.length - 1 ? 'pb-1 border-b border-dashed border-gray-300' : ''
              }`}>
              
              <SectionControls
                index={index}
                total={educations.length}
                onAdd={addEducation}
                className={'absolute -top-10 right-10'} 
                onRemove={removeEducation}
                onMoveUp={(i) => moveItemUp(i, setEducations)}
                onMoveDown={(i) => moveItemDown(i, setEducations)}
              />

              <EditableField
                value={edu.degree}
                onChange={(val) => handleEducationChange(index, 'degree', val)}
                placeholder="Degree"
                className={`text-sm2 ${currentTheme.body}`}
              />

              <EditableField
                value={edu.institute}
                onChange={(val) => handleEducationChange(index, 'institute', val)}
                placeholder="Institute Name"
                className={`text-xs text-gray-600 ${currentTheme.body}`}
              />

              <EditableDateRange
                value={edu.duration}
                onChange={(val) => handleEducationChange(index, 'duration', val)}
                className={`text-x2s ${currentTheme.body}`}
                mode="year"
              />

              <EditableField
                value={edu.notes}
                onChange={(val) => handleEducationChange(index, 'notes', val)}
                placeholder="Additional Highlights "
                className={`text-xs text-gray-500 italic ${currentTheme.body}`}
              />
            </div>
          ))}
             </section>
          </div>
        </div>

        {/* Right Column */}
        <div id="right-sections" className="col-span-3 space-y-6">
        
        {/* Strengths */}
        <div id="strength-section" className="mb-2 px-4">
          <section>
            {/* Section Title */}
            <div id="strength-title">
              <EditableField
                value={formData.strengthtitle}
                onChange={(val) => setFormData({ ...formData, strengthtitle: val })}
                placeholder="Strengths"
                className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
              />
            </div>

            {strengths.map((strength, index) => {
              const IconComponent = strengthIcons[index % strengthIcons.length];
              return (
                <div
                  key={index}
                  className={`relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-2 ${
                  index !== strengths.length - 1 ? 'pb-1 border-b border-dashed border-gray-300' : ''
                  }`}>
                  <SectionControls
                    index={index}
                    total={strengths.length}
                    onAdd={addStrength}
                    onRemove={removeStrength}
                    onMoveUp={(i) => moveItemUp(i, setStrengths)}
                    onMoveDown={(i) => moveItemDown(i, setStrengths)}
                    className="absolute -bottom-11 right"
                  />

                  <div className="flex items-start gap-1">
                    {/* Icon */}
                    <div className="h-[30px] flex items-start pt-1.5">
                      <IconComponent size={20} className={`${currentTheme.header}`} />
                    </div>

                    {/* Content: Title + Description stacked */}
                    <div className="flex-1">
                      {/* Strength Title */}
                      <EditableField
                        value={strength.title}
                        onChange={(val) => handleStrengthChange(index, 'title', val)}
                        placeholder="Your Strength"
                        className={`text-sm2 font-semibold ${currentTheme.subheader}`}
                      />

                      {/* Strength Description */}
                      <EditableField
                        value={strength.description}
                        onChange={(val) => handleStrengthChange(index, 'description', val)}
                        placeholder="Explain how it adds value"
                        className={`text-xs text-gray-700 whitespace-pre-wrap ${currentTheme.body}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

          </section>
        </div>

        {/* Skill */}
        <div  id="skill-section"  className="mb-2 px-4">
          <section>
            {/* Skill Title */}
            <div id="Skill-title">
              <EditableField
                value={formData.skillTitle}
                onChange={(val) => setFormData({ ...formData, skillTitle: val })}
                placeholder="Skills"
                className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
              />
            </div>

            {/* Skills as Tags */}
            <div className="flex flex-wrap gap-2 items-center px-2 py-1">
              
              {skills.map((skill, index) => {
                const isLast = index === skills.length - 1;

                if (skill.trim() === "" && !isLast) {
                  return null; // Skip rendering empty tags except the last one
                }

                return (
                  <span key={index}>
                    <EditableTag
                      value={skill}
                      onChange={(val) => handleSkillChange(index, val)}
                      placeholder="Skill"
                      onAddAfter={() => insertSkillAt(index + 1)}
                      onRemoveSelf={() => removeSkill(index)}
                      autoFocus={index === focusedIndex}
                    />
                  </span>
                );
              })}
            </div>
          </section>
        </div>

        {/* Certifications */}
        <div  id="cert-section"  className="mb-2 px-4">
          <section>
            {/* Certifications Title */}
          <div id="cert-title">
            <EditableField
              value={formData.certTittle}
              onChange={(val) => setFormData({ ...formData, certTittle: val })}
              placeholder="Your Certification"
              className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
            />
          </div>
            {certifications.map((cert, index) => (
              <div
                key={index}
                id={`cert-${index}`}
                className={`relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-2 ${
                index !== certifications.length - 1 ? 'pb-1 border-b border-dashed border-gray-300' : ''
                }`}>
                <SectionControls
                  index={index}
                  total={certifications.length}
                  onAdd={addCertification}
                  onRemove={removeCertification}
                  className={'absolute -bottom-10 right'} 
                  onMoveUp={(i) => moveItemUp(i, setCertifications)}
                  onMoveDown={(i) => moveItemDown(i, setCertifications)}
                />

                <EditableField
                  value={cert}
                  onChange={(val) => handleCertificationChange(index, val)}
                  placeholder="Certification"
                  className={`text-sm2 ${currentTheme.subheader}`}
                />
              </div>
            ))}

          </section>
        </div>

        {/* Languages */}
        <div  id="lang-section"  className="mb-2 px-4">
          <section>
            {/* Lang title */}
            <div  id="Lang-title" >
              <EditableField value={formData.langTittle}  onChange={(val) => setFormData({ ...formData, langTittle: val })}  
                placeholder="Languages" className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`} />
            </div>

            <div className="flex flex-wrap gap-2">

            {languages.map((lang, index) => (
              <div
                key={index}
                id={`lang-${index}`}
                className="relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-3"
              >
              <SectionControls
                index={index}
                total={languages.length}
                onAdd={addLanguage}
                className={'absolute -bottom-10 right'} 
                onRemove={removeLanguages}
                onMoveUp={(i) => moveItemUp(i, setLanguages)}
                onMoveDown={(i) => moveItemDown(i, setLanguages)}
              />

              <EditableField
              value={lang}
              onChange={(val) => handleLanguageChange(index, val)}
              placeholder="Language"
              className={`text-xs ${currentTheme.body}`}
              />
              </div>
              ))}
            </div>
          </section>
          </div>
        </div>

      </div>
      </div>
   </div>
    </div>
  );
}
