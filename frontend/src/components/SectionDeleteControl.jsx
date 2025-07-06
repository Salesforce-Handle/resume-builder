import React from "react";
import { Minus } from "lucide-react";

export default function SectionDeleteControl({ onDelete, className = "" }) {
  return (
    <button
      onClick={onDelete}
      title="Delete Section"
      className={`
        absolute -top-3 -right-3 z-20
        opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto 
        pointer-events-none transition-opacity
        bg-white shadow-md border border-red-200 
        rounded-full p-1 hover:bg-red-100 hover:border-red-300
        ${className}
      `}
    >
      <Minus className="w-4 h-4 text-red-500" />
    </button>
  );
}
