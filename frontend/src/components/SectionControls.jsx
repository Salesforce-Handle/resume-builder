import React from "react";

export default function SectionControls({
  index,
  total,
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
  className,
  disableDelete = false,
}) {
  return (
    <div
      className={`flex gap-1 sm:gap-2 flex-nowrap whitespace-nowrap 
        opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto 
        pointer-events-none transition-opacity z-10 rounded-xl 
        backdrop-blur-sm bg-white/70 px-4 py-2 shadow-lg border border-gray-200
        ${className}`}
    >
      {/* Add Entry */}
      <button
        onClick={onAdd}
        className="min-w-[80px] text-xs px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 font-semibold"
        title="Add Entry"
      >
        ＋ ENTRY
      </button>

      {/* Remove Entry */}
      <button
        onClick={() => onRemove(index)}
        disabled={disableDelete || total === 1}
        className="min-w-[80px] text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50 font-semibold"
        title="Remove"
      >
        － REMOVE
      </button>

      {/* Move Up */}
      <button
        onClick={() => onMoveUp(index)}
        disabled={index === 0}
        className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        title="Move Up"
      >
        ↑
      </button>

      {/* Move Down */}
      <button
        onClick={() => onMoveDown(index)}
        disabled={index === total - 1}
        className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        title="Move Down"
      >
        ↓
      </button>
    </div>
  );
}
