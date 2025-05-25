// components/AuthPopup.tsx
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

export default function AuthPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const checkForAuth = async () => {
      const hash = window.location.hash;
      const redirectedFromOAuth = hash.includes('access_token');

      if (redirectedFromOAuth) {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          setShowPopup(true);
          // Clean up URL
          router.replace(router.pathname, undefined, { shallow: true });
          setTimeout(() => setShowPopup(false), 3000);
        }
      }
    };

    checkForAuth();
  }, []);

  return (
    <>
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow-lg z-50 animate-fade-in">
          ✅ You’re verified!
        </div>
      )}
    </>
  );
}
