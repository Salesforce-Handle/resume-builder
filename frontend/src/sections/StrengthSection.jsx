import React, { useState } from "react";
import EditableField from "../components/EditableField";
import SectionControls from "../components/SectionControls";
import SectionDeleteControl from "../components/SectionDeleteControl";
import { useReorderList } from "../components/hooks/useReorderList";

export default function StrengthSection({
  strengths,
  setStrengths,
  strengthtitle,
  setStrengthtitle,
  strengthIcons,
  currentTheme,
}) {
  const [visible, setVisible] = useState(true);
  const { moveItemUp, moveItemDown } = useReorderList(setStrengths);

  const handleStrengthChange = (index, field, value) => {
    const updated = [...strengths];
    updated[index][field] = value;
    setStrengths(updated);
  };

  const addStrength = () => {
    setStrengths([
      ...strengths,
      { title: "", description: "" },
    ]);
  };

  const removeStrength = (index) => {
    if (strengths.length > 1) {
      const updated = [...strengths];
      updated.splice(index, 1);
      setStrengths(updated);
    }
  };

  const handleDeleteSection = () => {
    if (confirm("Remove entire Strengths section?")) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <section className="mb-2 px-4" id="strength-section">
      {/* Title */}
      <div id="strength-title" className="relative group">
        <EditableField
          value={strengthtitle}
          onChange={setStrengthtitle}
          placeholder="Strengths"
          className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
        />
        <SectionDeleteControl onDelete={handleDeleteSection} />
      </div>

      {strengths.map((strength, index) => {
        const IconComponent = strengthIcons[index % strengthIcons.length];
        return (
          <div
            key={index}
            className={`relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-2 ${
              index !== strengths.length - 1
                ? "pb-1 border-b border-dashed border-gray-300"
                : ""
            }`}
          >
            <SectionControls
              index={index}
              total={strengths.length}
              onAdd={addStrength}
              onRemove={() => removeStrength(index)}
              onMoveUp={() => moveItemUp(index)}
              onMoveDown={() => moveItemDown(index)}
              className="absolute -bottom-11 right"
            />

            <div className="flex items-start gap-1">
              <div className="h-[30px] flex items-start pt-1.5">
                <IconComponent size={20} className={`${currentTheme.header}`} />
              </div>

              <div className="flex-1">
                <EditableField
                  value={strength.title}
                  onChange={(val) => handleStrengthChange(index, "title", val)}
                  placeholder="Your Strength"
                  className={`text-sm2 font-semibold ${currentTheme.subheader}`}
                />

                <EditableField
                  value={strength.description}
                  onChange={(val) =>
                    handleStrengthChange(index, "description", val)
                  }
                  placeholder="Explain how it adds value"
                  className={`text-xs text-gray-700 whitespace-pre-wrap ${currentTheme.body}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
