import React from "react";

/**
 * Reusable field visibility toggle bar
 * 
 * @param {object} props
 * @param {object} props.visibility - visibility state object (field: boolean)
 * @param {function} props.onToggle - function(field) => void
 * @param {object} props.fieldLabels - mapping of field keys -> labels
 * @param {string} [props.className] - extra classes for wrapper
 */
export default function FieldVisibilityControls({ visibility, onToggle, fieldLabels, className = "" }) {
  return (
    <div
      className={`
        flex flex-wrap gap-2 flex-nowrap whitespace-nowrap 
        opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto 
        pointer-events-none transition-opacity z-10 rounded-xl 
        backdrop-blur-sm bg-white/80 px-3 py-2 shadow-lg border border-gray-200
        absolute -top-6 left-0
        ${className}
      `}
    >
      {Object.keys(fieldLabels).map((field) => (
        <button
          key={field}
          onClick={() => onToggle(field)}
          className={`text-xs px-2 py-1 rounded font-semibold transition
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
  );
}
