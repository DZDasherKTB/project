import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthPopup from './components/AuthPopup';
import Footer from './components/Footer';
import { supabase } from './lib/supabase';
import GlobalSkeleton from './components/ui/GlobalSkeleton';

// Lazy-loaded components
const Skills = lazy(() => import('./components/Skills'));
const About = lazy(() => import('./components/About'));
const DailyTimeline = lazy(() => import('./components/DailyTimeline'));
const Projects = lazy(() => import('./components/Projects'));
const TechStack = lazy(() => import('./components/TechStack'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const CogwheelEffect = lazy(() => import('./components/ui/CogwheelEffect'));
const FloatingImages = lazy(() => import('./components/ui/FloatingImages'));

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.title = "Dashpreet Singh | Portfolio";

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      if (event === "SIGNED_IN") {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        console.log("User signed in:", session?.user?.email);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  try {
    return (
      <div className="min-h-screen bg-background text-text-primary overflow-x-hidden">
        <Navbar />
        <AuthPopup show={showPopup} />

        {/* Defer visual effects */}
        <Suspense fallback={null}>
          <CogwheelEffect />
          <FloatingImages />
        </Suspense>

        <main>
          <Hero />

          {/* Skeleton loader until components load */}
          <Suspense fallback={<GlobalSkeleton />}>
            <Skills />
            <About />
            <DailyTimeline />
            <TechStack />
            <Projects />
            <Experience />
            <Contact />
          </Suspense>
        </main>

        <Footer />
      </div>
    );
  } catch (e) {
    console.error("App crash:", e);
    return <div style={{ color: 'red', padding: '2rem' }}>App crashed — check console</div>;
  }
}

export default App;
