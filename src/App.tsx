import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import DailyTimeline from './components/DailyTimeline';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CogwheelEffect from './components/ui/CogwheelEffect';
import FloatingImages from './components/ui/FloatingImages';
import AuthPopup from './components/AuthPopup';
import { useState } from 'react';
import { supabase } from './lib/supabase';

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
        <CogwheelEffect />
        <FloatingImages />

        <main>
          <Hero />
          <Skills />
          <About />
          <DailyTimeline />
          <TechStack />
          <Projects />
          <Experience />
          <Contact />
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