import React from 'react';
import { GlobalProvider } from './context/GlobalProvider';
import Header from './components/Header';
import About from './components/About';
import Activities from './components/Activities';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import './App.css';

function App() {
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
      <div className="app">
        <ScrollIndicator />
        <Header />
        <About />
        <Projects />
        <Activities />
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default App
