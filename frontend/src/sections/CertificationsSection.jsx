import React, { useState } from "react";
import EditableField from "../components/EditableField";
import SectionControls from "../components/SectionControls";
import SectionDeleteControl from "../components/SectionDeleteControl";
import { useReorderList } from "../components/hooks/useReorderList"; // ✅ using external hook

export default function CertificationsSection({
  certifications,
  setCertifications,
  certTitle,
  setCertTitle,
  currentTheme,
}) {
  const [visible, setVisible] = useState(true);
  const { moveItemUp, moveItemDown } = useReorderList(setCertifications); // ✅ reused hook

  const handleCertificationChange = (index, newVal) => {
    const updated = [...certifications];
    updated[index] = newVal;
    setCertifications(updated);
  };

  const addCertification = () => {
    setCertifications([...certifications, ""]);
  };

  const removeCertification = (index) => {
    if (certifications.length === 1) return;
    const updated = [...certifications];
    updated.splice(index, 1);
    setCertifications(updated);
  };

  const handleDeleteSection = () => {
    if (confirm("Remove entire Certifications section?")) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <section id="cert-section" className="mb-2 px-4">
      {/* Title */}
      <div className="relative group">
        <EditableField
          value={certTitle}
          onChange={setCertTitle}
          placeholder="Certifications"
          className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
        />
        <SectionDeleteControl onDelete={handleDeleteSection} />
      </div>

      {/* Certifications */}
      {certifications.map((cert, index) => (
        <div
          key={index}
          className={`relative group rounded hover:shadow hover:border-2 hover:border-blue-200 transition-all mb-2 ${
            index !== certifications.length - 1
              ? "pb-1 border-b border-dashed border-gray-300"
              : ""
          }`}
        >
          <SectionControls
            index={index}
            total={certifications.length}
            onAdd={addCertification}
            onRemove={() => removeCertification(index)}
            onMoveUp={() => moveItemUp(index)}
            onMoveDown={() => moveItemDown(index)}
            className="absolute -bottom-10 right"
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
  );
}
