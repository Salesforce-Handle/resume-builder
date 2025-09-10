import React, { useState } from "react";
import { Eye, EyeOff, Settings2 } from "lucide-react";

export default function FieldVisibilityControls({
  visibility,
  onToggle,
  fieldLabels,
  className = "",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`absolute top-0 left-0 z-20 group ${className}`}>
      {/* Trigger button styled pill/glass */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-1
          opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto 
          pointer-events-none transition-opacity
          bg-white/70 backdrop-blur-md shadow-lg border border-gray-200 
          rounded-full px-3 py-1 text-xs font-medium
          hover:bg-gray-50 hover:border-gray-300
        `}
      >
        {open ? (
          <>
            <EyeOff className="w-4 h-4 text-gray-600" />
            Hide Controls
          </>
        ) : (
          <>
            <Settings2 className="w-4 h-4 text-gray-600" />
            Control Details
          </>
        )}
      </button>

      {/* Controls Panel */}
      {open && (
        <div
          className={`
            mt-2 flex flex-wrap gap-2 whitespace-nowrap
            rounded-2xl backdrop-blur-md bg-white/80 px-3 py-2
            shadow-lg border border-gray-200
          `}
        >
          {Object.keys(fieldLabels).map((field) => (
            <button
              key={field}
              onClick={() => onToggle(field)}
              className={`text-xs px-2 py-1 rounded-full font-semibold transition
                ${
                  visibility[field]
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
            >
              {visibility[field] ? `－ ${fieldLabels[field]}` : `＋ ${fieldLabels[field]}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
