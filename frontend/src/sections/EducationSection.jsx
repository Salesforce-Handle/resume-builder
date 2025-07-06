import React,  { useState } from "react";
import EditableField from "../components/EditableField";
import EditableDateRange from "../components/EditableDateRange";
import SectionControls from "../components/SectionControls";
import SectionDeleteControl from "../components/SectionDeleteControl";
import { useReorderList } from "../components/hooks/useReorderList";

export default function EducationSection({
  educations,
  setEducations,
  formData,
  setFormData,
  currentTheme,
}) {
  const { moveItemUp, moveItemDown } = useReorderList(setEducations);

  const handleChange = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        degree: "",
        institute: "",
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


  const [visible, setVisible] = useState(true); // 👈 local state to toggle visibility

  const handleDeleteSection = () => {
    if (confirm("Remove entire Education section?")) {
      setVisible(false);
    }
  };

  if (!visible) return null; // 👈 hide if deleted

  return (
      <section>
      <div  id="edu-title" className="relative group">
        <SectionDeleteControl onDelete={handleDeleteSection} />
        <EditableField
          value={formData.EduTitle}
          onChange={(val) => setFormData({ ...formData, EduTitle: val })}
          placeholder="Education"
          className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
        />
      </div>

        {educations.map((edu, index) => (
          <div
            key={index}
            className={`relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-4 ${
              index !== educations.length - 1
                ? "pb-1 border-b border-dashed border-gray-300"
                : ""
            }`}
          >
            <SectionControls
              index={index}
              total={educations.length}
              onAdd={addEducation}
              onRemove={() => removeEducation(index)}
              onMoveUp={() => moveItemUp(index)}
              onMoveDown={() => moveItemDown(index)}
              className="absolute -top-10 right-10"
            />

            <EditableField
              value={edu.degree}
              onChange={(val) => handleChange(index, "degree", val)}
              placeholder="Degree"
              className={`text-sm2 ${currentTheme.body}`}
            />

            <EditableField
              value={edu.institute}
              onChange={(val) => handleChange(index, "institute", val)}
              placeholder="Institute Name"
              className={`text-sm text-gray-600 ${currentTheme.body}`}
            />

            <EditableDateRange
              value={edu.duration}
              onChange={(val) => handleChange(index, "duration", val)}
              className={`text-xs ${currentTheme.body}`}
              mode="year"
            />

            <EditableField
              value={edu.notes}
              onChange={(val) => handleChange(index, "notes", val)}
              placeholder="Additional Highlights"
              className={`text-xs text-gray-500 italic ${currentTheme.body}`}
            />
          </div>
        ))}
      </section>
  );
}
