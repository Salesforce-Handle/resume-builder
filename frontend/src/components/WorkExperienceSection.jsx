import React from "react";
import EditableField from "./EditableField";
import EditableDateRange from "./EditableDateRange";
import SectionControls from "./SectionControls";

export default function WorkExperienceSection({
  workExperiences,
  setWorkExperiences,
  workTitle,
  setWorkTitle,
  currentTheme,
}) {
  const handleWorkChange = (index, field, value) => {
    const newWork = [...workExperiences];
    newWork[index][field] = value;
    setWorkExperiences(newWork);
  };

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        company: "",
        role: "",
        dateRange: { from: "", to: "" },
        project: "",
        responsibility: "",
      },
    ]);
  };

  const removeWorkExperience = (index) => {
    if (workExperiences.length > 1) {
      const newWork = [...workExperiences];
      newWork.splice(index, 1);
      setWorkExperiences(newWork);
    }
  };

  const moveItemUp = (index) => {
    if (index <= 0) return;
    const newWork = [...workExperiences];
    [newWork[index], newWork[index - 1]] = [newWork[index - 1], newWork[index]];
    setWorkExperiences(newWork);
  };

  const moveItemDown = (index) => {
    if (index >= workExperiences.length - 1) return;
    const newWork = [...workExperiences];
    [newWork[index], newWork[index + 1]] = [newWork[index + 1], newWork[index]];
    setWorkExperiences(newWork);
  };

  return (
    <div id="work-exp-section" className="mb-2 px-4">
      <section>
        {/* Work Title */}
        <div id="work-title">
          <EditableField
            value={workTitle}
            onChange={(val) => setWorkTitle(val)}
            placeholder="Work Experience"
            className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
          />
        </div>

        {workExperiences.map((exp, index) => (
          <div
            key={index}
            id={`work-ex-${index}`}
            className={`relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-4 ${
              index !== workExperiences.length - 1
                ? "pb-1 border-b border-dashed border-gray-300"
                : ""
            }`}
          >
            <SectionControls
              index={index}
              total={workExperiences.length}
              onAdd={addWorkExperience}
              onRemove={() => removeWorkExperience(index)}
              onMoveUp={() => moveItemUp(index)}
              onMoveDown={() => moveItemDown(index)}
              className={"absolute -top-10 right-10"}
            />

            <EditableField
              value={exp.role}
              onChange={(val) => handleWorkChange(index, "role", val)}
              placeholder="Job Title"
              className={`font-medium ${currentTheme.body}`}
            />
            <EditableField
              value={exp.company}
              onChange={(val) => handleWorkChange(index, "company", val)}
              placeholder="Company Name"
              className={`text-sm2 font-bold ${currentTheme.subheader}`}
            />
            <EditableDateRange
              value={exp.dateRange}
              onChange={(val) => handleWorkChange(index, "dateRange", val)}
              className={`text-x2s ${currentTheme.body}`}
              mode="month-year"
            />
            <EditableField
              value={exp.project}
              onChange={(val) => handleWorkChange(index, "project", val)}
              placeholder="Project Description"
              className={`text-xs text-gray-500 ${currentTheme.body}`}
            />
            <EditableField
              value={exp.responsibility}
              onChange={(val) => handleWorkChange(index, "responsibility", val)}
              placeholder="• Highlight your accomplishments"
              className={`text-xs text-gray-700 whitespace-pre-wrap pl-2  ${currentTheme.body}`}
              bulleted={true}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
