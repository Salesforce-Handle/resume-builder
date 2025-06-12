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
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-2 text-blue-700">👋 Welcome!</h2>

        <p className="text-sm text-gray-700 mb-2">
          <strong>Built with </strong>❤️ by a Salesforce dev who's reviewed 100+ resumes.
        </p>

        <div className="text-sm text-gray-600 mb-2">
          <p className="mb-1 text-center">🔒 <strong>No data is ever sent to a server.</strong></p>
          <p>Everything is stored locally in your browser unless you clear cache.</p>
        </div>

        <p className="text-sm text-gray-700 mt-3">
          Pause anytime and come back — your progress stays safe on your device.
        </p>

        <p className="text-xs text-gray-400 mt-3">
          We hope this helps you land your next big opportunity 🚀
        </p>

        {/* Do not show again checkbox */}
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
