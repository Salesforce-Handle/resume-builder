import React from "react";
import EditableField from "../components/EditableField";
import './index.css';

export default function SummarySection({
  summaryTitle,
  setSummaryTitle,
  summary,
  setSummary,
  currentTheme
}) {
  return (
      <section>
        {/* Summary Title */}
        <div id="sum-title">
          <EditableField
            value={summaryTitle}
            onChange={setSummaryTitle}
            placeholder="Summary"
            className={`${currentTheme.headerBorder} ${currentTheme.headerTitles}`}
          />
        </div>

        {/* Summary Body */}
        <div id="sum-body" className="w-full">
          <EditableField
            value={summary}
            onChange={setSummary}
            placeholder="Summarize your relevant skills, experience, and achievements that align with this role."
            className={`w-full min-h-[50px] min-w-[100px] whitespace-pre-wrap text-xs text-gray-500 ${currentTheme.body}`}
          />
        </div>
      </section>
  );
}
