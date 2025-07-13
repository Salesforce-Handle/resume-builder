import React, { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const [doNotShow, setDoNotShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("resumePopupDismissed");
    if (!dismissed) setShow(true);
  }, []);

  const handleClose = () => {
    if (doNotShow) {
      localStorage.setItem("resumePopupDismissed", "true");
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-[2px] flex items-center justify-center px-4">
      <div className="bg-white border border-blue-200 shadow-2xl rounded-2xl p-6 max-w-md w-full text-gray-700 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-xl font-bold"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">👋 Welcome!</h2>

        {/* Message */}
        <p className="text-base mb-3">
          <strong>Built with ❤️</strong> by a Salesforce dev who’s reviewed 100+ resumes.
        </p>

        {/* Security Note */}
        <div className="text-sm text-gray-600 mb-4">
          <p className="mb-1">🔒 <strong>No data is ever sent to a server.</strong></p>
          <p>
            Everything is stored locally in your browser. Close the tab or come back later — your work stays safe.
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400">
          We hope this helps you land your next big opportunity 🚀
        </p>

        {/* Checkbox */}
        <div className="mt-4 flex items-center text-sm">
          <input
            type="checkbox"
            id="doNotShow"
            className="mr-2 accent-blue-600"
            checked={doNotShow}
            onChange={(e) => setDoNotShow(e.target.checked)}
          />
          <label htmlFor="doNotShow" className="text-gray-600">Do not show again</label>
        </div>
      </div>
    </div>
  );
}
