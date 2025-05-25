import React from "react";

interface AuthPopupProps {
  show: boolean;
}

export default function AuthPopup({ show }: AuthPopupProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-xl shadow-xl z-50">
      ✅ You’re verified!
    </div>
  );
}
