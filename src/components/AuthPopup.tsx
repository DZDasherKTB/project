// src/components/AuthPopup.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // 👈 correct import path for your setup

export default function AuthPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const isOAuthRedirect = hash.includes('access_token');

    if (isOAuthRedirect) {
      setShowPopup(true);
      window.history.replaceState(null, '', window.location.pathname);
      setTimeout(() => setShowPopup(false), 3000);
    }

    // Optional: auth listener for debugging
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-xl shadow-xl z-50">
      ✅ You’re verified!
    </div>
  );
}
