import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GlobalProvider } from './context/GlobalProvider';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import About from './components/About';
import Activities from './components/Activities';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [headerReady, setHeaderReady] = useState(false);

  // When splash completes, allow header AND solar system to animate
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Delay animation start to sync with splash exit (splash takes 2 seconds to exit)
    setTimeout(() => {
      setHeaderReady(true);
    }, 100);
  };

  // Fix scroll restoration on refresh - AGGRESSIVE FIX
  React.useEffect(() => {
    document.documentElement.style.scrollSnapType = 'none';

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);

    setTimeout(() => {
      document.documentElement.style.scrollSnapType = 'y mandatory';
    }, 200);
  }, []);

  return (
    <GlobalProvider>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <div className="app">
        <ScrollIndicator isReady={headerReady} />
        <Header isReady={headerReady} />
        <About />
        <Projects isReady={headerReady} />
        <Activities />
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default App
