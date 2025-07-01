import React, { useEffect, useState, lazy, Suspense } from 'react';
import { supabase } from './lib/supabase';
import AuthPopup from './components/AuthPopup';
import Preloader from './components/ui/Preloader';
import SectionLoader from './components/ui/SectionLoader';
import GlobalSkeleton from './components/ui/GlobalSkeleton';

import Hero from './components/Hero';
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));

const Skills = lazy(() => import('./components/Skills'));
const About = lazy(() => import('./components/About'));
const DailyTimeline = lazy(() => import('./components/DailyTimeline'));
const Projects = lazy(() => import('./components/Projects'));
const MiniProjects = lazy(() => import('./components/MiniProjects'));
const TechStack = lazy(() => import('./components/TechStack'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const CogwheelEffect = lazy(() => import('./components/ui/CogwheelEffect'));
const FloatingImages = lazy(() => import('./components/ui/FloatingImages'));

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [deferLoad, setDeferLoad] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    document.title = "Dashpreet Singh | Portfolio";

    const preloadTimer = setTimeout(() => setShowPreloader(false), 1500);
    const delayTimer = setTimeout(() => setDeferLoad(true), 800);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    });

    return () => {
      clearTimeout(preloadTimer);
      clearTimeout(delayTimer);
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPreloader ? 'hidden' : '';
  }, [showPreloader]);

  if (showPreloader) return <Preloader />;

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden">
      <Suspense fallback={<GlobalSkeleton />}>
        <Navbar />
      </Suspense>

      <AuthPopup show={showPopup} />

      <main>
        <Hero />

        <SectionLoader><Skills /></SectionLoader>
        <SectionLoader><About /></SectionLoader>
        <SectionLoader><DailyTimeline /></SectionLoader>
        <SectionLoader><TechStack /></SectionLoader>
        <SectionLoader><Projects /></SectionLoader>
        <SectionLoader><MiniProjects /></SectionLoader>
        <SectionLoader><Experience /></SectionLoader>
        <SectionLoader><Contact /></SectionLoader>
      </main>

      {deferLoad && (
        <SectionLoader>
          <Suspense fallback={null}>
            <CogwheelEffect />
            <FloatingImages />
          </Suspense>
        </SectionLoader>
      )}

      <Suspense fallback={<GlobalSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
