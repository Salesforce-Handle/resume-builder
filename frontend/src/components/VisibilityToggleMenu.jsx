import { Eye, EyeOff } from "lucide-react";

export default function VisibilityToggleMenu({ visibility, onToggle, fields }) {
  return (
    <div className="flex flex-wrap gap-2 bg-white border border-gray-200 shadow-md rounded-md px-3 py-2 z-10 text-xs">
      {fields.map((field) => (
        <button
          key={field}
          onClick={() => onToggle(field)}
          className="flex items-center gap-1 px-2 py-1 rounded bg-gray-50 hover:bg-gray-100 border border-gray-200 transition text-gray-600"
          aria-label={`Toggle ${field}`}
        >
          <span className="capitalize truncate">{field}</span>
          {visibility[field] ? (
            <Eye size={14} className="text-green-600" />
          ) : (
            <EyeOff size={14} className="text-red-500" />
          )}
        </button>
      ))}
    </div>
  );
}
