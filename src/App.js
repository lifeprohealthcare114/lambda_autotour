import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductExplorer from './components/ProductExplorer';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPart, setSelectedPart] = useState(null);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [tourTrigger, setTourTrigger] = useState(false);

  const baseNavigateTo = (page, options = {}) => {
    setFadeClass('fade-out');
    setTimeout(() => {
      if (page === 'product' && options.startTour) {
        setTourTrigger(true);
      } else {
        setTourTrigger(false);
      }
      setCurrentPage(page);
      window.scrollTo(0, 0);
      setFadeClass('fade-in');
    }, 800);
  };

  const openPartDetails = (part) => {
    setSelectedPart(part);
  };

  const closePartDetails = () => {
    setSelectedPart(null);
  };

  useEffect(() => {
    const handleNavigateHome = () => baseNavigateTo('home');
    window.addEventListener('navigate-home', handleNavigateHome);
    return () => window.removeEventListener('navigate-home', handleNavigateHome);
  }, []);

  return (
    <div className="app">
      {/* ✅ Pass dual behavior navigateTo to Header */}
      <Header 
        navigateTo={() => {
          if (currentPage === 'home') {
            baseNavigateTo('product', { startTour: true });
          } else if (currentPage === 'product') {
            baseNavigateTo('home');
          }
        }}
        currentPage={currentPage}
        showSkipButton={currentPage === 'home' || currentPage === 'product'}
      />

      <div className={fadeClass}>
        <main>
          {currentPage === 'home' ? (
            <HeroSection navigateTo={baseNavigateTo} />
          ) : (
            <ProductExplorer 
              openPartDetails={openPartDetails}
              selectedPart={selectedPart}
              closePartDetails={closePartDetails}
              startTourOnLoad={tourTrigger}
              navigateTo={baseNavigateTo}
              showSkipButton={true}
            />
          )}
        </main>    <AudioPlayer />
        <Footer />
      </div>
    </div>
  );
}

export default App;
