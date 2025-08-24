import React, { useState } from "react";
import { MinusCircle, AlertTriangle } from "lucide-react";

export default function SectionDeleteControl({ onDelete, sectionName = "Section", className = "" }) {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 2500); // auto reset after 2.5s
    } else {
      onDelete();
      setConfirming(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      title={`Delete ${sectionName}`}
      className={`
        absolute -top-4 -right-4 z-20 flex items-center gap-1
        opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto 
        pointer-events-none transition-opacity
        bg-white shadow-lg border border-red-200 
        rounded-full px-2 py-1 text-xs font-medium
        hover:bg-red-50 hover:border-red-300
        ${className}
      `}
    >
      {confirming ? (
        <>
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="text-red-600">Confirm?</span>
        </>
      ) : (
        <>
          <MinusCircle className="w-4 h-4 text-red-500" />
          <span className="hidden sm:inline text-gray-700">Delete {sectionName}</span>
        </>
      )}
    </button>
  );
}
