import React, { useState } from "react";
import EditableField from "../components/EditableField";
import SectionControls from "../components/SectionControls";
import SectionDeleteControl from "../components/SectionDeleteControl";
import { useReorderList } from "../components/hooks/useReorderList"; // ✅ External reorder hook

export default function LanguagesSection({
  languages,
  setLanguages,
  langTitle,
  setLangTitle,
  currentTheme,
}) {
  const [visible, setVisible] = useState(true);
  const { moveItemUp, moveItemDown } = useReorderList(setLanguages); // ✅ Hook used here

  const handleLanguageChange = (index, newVal) => {
    const updated = [...languages];
    updated[index] = newVal;
    setLanguages(updated);
  };

  const addLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const removeLanguage = (index) => {
    if (languages.length === 1) return;
    const updated = [...languages];
    updated.splice(index, 1);
    setLanguages(updated);
  };

  const handleDeleteSection = () => {
    if (confirm("Remove entire Languages section?")) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <section id="lang-section" className="mb-2 px-4">
      {/* Section Title */}
      <div className="relative group">
        <EditableField
          value={langTitle}
          onChange={setLangTitle}
          placeholder="Languages"
          className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
        />
        <SectionDeleteControl onDelete={handleDeleteSection} />
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
              onRemove={() => removeLanguage(index)}
              onMoveUp={() => moveItemUp(index)}
              onMoveDown={() => moveItemDown(index)}
              className="absolute -bottom-10 right"
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
  );
}
