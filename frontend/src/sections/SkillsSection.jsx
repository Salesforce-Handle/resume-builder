import React, { useState } from "react";
import EditableField from "../components/EditableField";
import EditableTag from "../components/EditableTag";
import SectionDeleteControl from "../components/SectionDeleteControl";

export default function SkillsSection({
  skills,
  setSkills,
  skillTitle,
  setSkillTitle,
  currentTheme,
}) {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [visible, setVisible] = useState(true);

  const handleSkillChange = (index, newVal) => {
    const updated = [...skills];
    updated[index] = newVal;
    setSkills(updated);
  };

  const insertSkillAt = (index) => {
    const updated = [...skills];
    updated.splice(index, 0, "");
    setSkills(updated);
    setFocusedIndex(index); // Set focus on new one
  };

  const removeSkill = (index) => {
    if (skills.length === 1) return;

    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);

    if (index > 0) {
      setFocusedIndex(index - 1);
    } else {
      setFocusedIndex(null);
    }
  };

  const handleDeleteSection = () => {
    if (confirm("Remove entire Skills section?")) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <section id="skill-section" className="mb-2 px-4">
      {/* Title */}
      <div className="relative group">
        <EditableField
          value={skillTitle}
          onChange={setSkillTitle}
          placeholder="Skills"
          className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
        />
        <SectionDeleteControl onDelete={handleDeleteSection} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 items-center px-2 py-1">
        {skills.map((skill, index) => {
          const isLast = index === skills.length - 1;

          if (skill.trim() === "" && !isLast) return null;

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
  );
}
