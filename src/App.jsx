import React from 'react';
import { GlobalProvider } from './context/GlobalProvider';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <Header />
        <About />
        <Projects />
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default App
