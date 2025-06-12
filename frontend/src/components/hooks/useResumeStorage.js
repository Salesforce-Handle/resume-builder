// hooks/useResumeStorage.js
import { useEffect } from "react";

export function useResumeStorage({
  formData,
  setFormData,
  workExperiences,
  setWorkExperiences,
  educations,
  setEducations,
  skills,
  setSkills,
  certifications,
  setCertifications,
  languages,
  setLanguages,
  strengths,
  setStrengths,
}) {
  // Load from localStorage once on mount
useEffect(() => {
  const saved = (key) => JSON.parse(localStorage.getItem(key) || "null");
  const trySet = (val, setter) => val && setter(val);

  trySet(saved("resumeFormData"), setFormData);
  trySet(saved("resumeWork"), setWorkExperiences);
  trySet(saved("resumeEdu"), setEducations);
  trySet(saved("resumeSkills"), setSkills);
  trySet(saved("resumeCerts"), setCertifications);
  trySet(saved("resumeLangs"), setLanguages);
  trySet(saved("resumeStrengths"), setStrengths);
}, [
  setFormData,
  setWorkExperiences,
  setEducations,
  setSkills,
  setCertifications,
  setLanguages,
  setStrengths
]);


  // Save to localStorage on any change
  useEffect(() => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("resumeWork", JSON.stringify(workExperiences));
  }, [workExperiences]);

  useEffect(() => {
    localStorage.setItem("resumeEdu", JSON.stringify(educations));
  }, [educations]);

  useEffect(() => {
    localStorage.setItem("resumeSkills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem("resumeCerts", JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem("resumeLangs", JSON.stringify(languages));
  }, [languages]);

  useEffect(() => {
    localStorage.setItem("resumeStrengths", JSON.stringify(strengths));
  }, [strengths]);
}
