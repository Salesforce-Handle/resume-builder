import React from "react";
import EditableField from "../components/EditableField";
import EditableDateRange from "../components/EditableDateRange";
import SectionControls from "../components/SectionControls";
import { useReorderList } from "../components/hooks/useReorderList";

export default function WorkExperienceSection({
  workExperiences,
  setWorkExperiences,
  workTitle,
  setWorkTitle,
  currentTheme,
}) {
  const { moveItemUp, moveItemDown } = useReorderList(setWorkExperiences);

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

  return (
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
              className={`text-xs ${currentTheme.body}`}
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
  );
}
