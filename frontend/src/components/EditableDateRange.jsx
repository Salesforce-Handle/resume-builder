import { useState, useRef, useEffect } from "react";
import { CalendarDays } from "lucide-react";

export default function EditableDateRange({
  value,
  onChange,
  className = "",
  mode = "month-year",
}) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

  const [showPicker, setShowPicker] = useState(false);
  const [tab, setTab] = useState("from");
  const [fromYear, setFromYear] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [isPresent, setIsPresent] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (value?.from) {
      if (mode === "year") {
        setFromYear(value.from || "");
      } else {
        const [fm, fy] = value.from.split(" ");
        setFromMonth(fm || "");
        setFromYear(fy || "");
      }
    }
    if (value?.to === "Present") {
      setIsPresent(true);
    } else if (value?.to) {
      if (mode === "year") {
        setToYear(value.to || "");
      } else {
        const [tm, ty] = value.to.split(" ");
        setToMonth(tm || "");
        setToYear(ty || "");
      }
    }
  }, [value, mode]);

  const handleChange = () => {
    const newValue = {
      from:
        mode === "year"
          ? fromYear
          : fromMonth && fromYear
          ? `${fromMonth} ${fromYear}`
          : "",
      to:
        isPresent
          ? "Present"
          : mode === "year"
          ? toYear
          : toMonth && toYear
          ? `${toMonth} ${toYear}`
          : "",
    };
    onChange(newValue);
    setShowPicker(false);
  };

  const displayValue =
    value?.from && value?.to ? `${value.from} - ${value.to}` : "Select Period";

  return (
    <div className="relative w-fit">
      <div
        ref={ref}
        className={`flex items-center gap-1 cursor-pointer px-2 py-1 bg-white ${className}`}
        onClick={() => setShowPicker((prev) => !prev)}
      >
        <CalendarDays className="w-3.5 h-3.5 text-gray-500" />
        <span className={`text-gray-600 truncate max-w-[130px] ${className}`}>{displayValue}</span>
      </div>

      {showPicker && (
        <div className="absolute z-20 mt-2 p-3 min-w-[220px] rounded-xl 
        backdrop-blur-sm bg-white px-4 py-2 shadow-lg border border-gray-200">
          <div className="flex justify-between border-b mb-2">
            <button
              onClick={() => setTab("from")}
              className={`flex-1 text-xs py-1 ${tab === "from" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
            >
              From
            </button>
            <button
              onClick={() => setTab("to")}
              className={`flex-1 text-xs py-1 ${tab === "to" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
            >
              To
            </button>
          </div>

          <div className="flex gap-2 mb-3">
            {mode === "month-year" && (
              <select
                className="text-xs border px-2 py-1 rounded w-1/2"
                value={tab === "from" ? fromMonth : toMonth}
                onChange={(e) =>
                  tab === "from" ? setFromMonth(e.target.value) : setToMonth(e.target.value)
                }
                disabled={tab === "to" && isPresent}
              >
                <option value="">Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            )}

            <select
              className="text-xs border px-2 py-1 rounded w-full"
              value={tab === "from" ? fromYear : toYear}
              onChange={(e) =>
                tab === "from" ? setFromYear(e.target.value) : setToYear(e.target.value)
              }
              disabled={tab === "to" && isPresent}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="present"
              checked={isPresent}
              onChange={(e) => setIsPresent(e.target.checked)}
            />
            <label htmlFor="present" className={`text-xs ${className}`}>
              Currently working here
            </label>
          </div>

          <button
            onClick={handleChange}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded w-full"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
  