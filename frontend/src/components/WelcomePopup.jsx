import React, { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("resumePopupDismissed");
    if (!dismissed) setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("resumePopupDismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-[2px] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-2 text-blue-700">👋 Welcome!</h2>
        <p className="text-sm text-gray-700 mb-3">
          This free resume builder was handcrafted with care and attention to detail. If you find it useful, consider showing support:
        </p>

        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mb-4">
          <li>💬 Leave a kind word on our <a href="https://salesforcehandle.com/salesforce-resume-generator/" className="text-blue-500 underline">blog</a></li>
          <li>☕ <a href="https://buymeacoffee.com/sforcehandle" target="_blank" className="text-pink-600 underline">Buy me a coffee</a></li>
        </ul>

        <p className="text-xs text-gray-400">
          Thanks for visiting — we hope it helps you land your next big opportunity 🚀
        </p>
      </div>
    </div>
  );
}
