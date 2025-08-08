import React, { useState, useEffect, useRef } from 'react';
import PartModal from './PartModal';
import VirtualTour from './VirtualTour';
import FeaturesModal from './FeaturesModal';
import '../styles/ProductExplorer.css';

const technicalSpecs = [
  { name: "Dimensions", value: "150 × 90 × 120 cm" },
  { name: "Power Requirements", value: "100-240V AC, 50/60Hz" },
  { name: "Therapy Modes", value: "50+" },
  { name: "Patient Weight Capacity", value: "150 kg" },
  { name: "Warranty", value: "2 years" },
  { name: "Data Connectivity", value: "Wi-Fi, Bluetooth, USB" },
  { name: "Display", value: '15.6" HD Touchscreen' },
  { name: "Setup Time", value: "<3 minutes" },
  { name: "Patient Throughput", value: "50+/week" }
];

const ProductExplorer = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [startTour, setStartTour] = useState(false);
  const [tourStopped, setTourStopped] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const markers = document.querySelectorAll('.part-marker');
    markers.forEach((marker, index) => {
      marker.style.animation = `pulse 2s ${index * 0.2}s 3`;
    });

    if (!tourStopped) {
      const timer = setTimeout(() => {
        setStartTour(true);
      }, 6000);

      return () => clearTimeout(timer);
    } else {
      setStartTour(false);
    }
  }, [tourStopped]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closePartDetails = () => setSelectedPart(null);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleTourEnd = async () => {
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    let currentScroll = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    while (currentScroll < maxScroll) {
      window.scrollBy(0, 5);
      currentScroll += 5;
      await delay(10);
    }

    const isMobileOrTablet = window.innerWidth <= 1024;
    if (isMobileOrTablet) {
      const horizontalContainer = document.querySelector('.scrollable-horizontal');

      if (horizontalContainer && horizontalContainer.scrollWidth > horizontalContainer.clientWidth) {
        let scrollLeft = horizontalContainer.scrollLeft;
        const maxScrollLeft = horizontalContainer.scrollWidth - horizontalContainer.clientWidth;

        while (scrollLeft < maxScrollLeft) {
          horizontalContainer.scrollBy({ left: 2, behavior: 'auto' });
          scrollLeft += 2;
          await delay(15);
        }

        await delay(1000);
      }
    }

    await delay(6000);
    scrollToTop();

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('navigate-home'));
    }, 1000);
  };

  const stopTour = () => {
    setStartTour(false);
    setTourStopped(true);
  };

  const restartTour = () => {
    setTourStopped(false);
    setStartTour(false);
    setTimeout(() => setStartTour(true), 100);
  };

  return (
    <div className="product-explorer fade-in" ref={containerRef}>

      {/* Tour Control Buttons - Fixed top right */}
      <div
        className="tour-controls-permanent"
        style={{
          position: 'fixed',
          top: 64,
          right: 38,
          zIndex: 10000,
          background: 'rgba(0,0,0,0.85)',
          padding: '4px 6px',
          borderRadius: 8,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <button
          onClick={stopTour}
          disabled={!startTour}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: 5,
            cursor: startTour ? 'pointer' : 'not-allowed',
            opacity: startTour ? 1 : 0.6,
          }}
          aria-label="Stop Tour"
        >
          ■ Stop Tour
        </button>

        <button
          onClick={restartTour}
          style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: 5,
            cursor: 'pointer',
          }}
          aria-label="Restart Tour"
        >
          🔄 Restart Tour
        </button>
      </div>

      <section className="product-overview">
        <div className="product-header">
          <h2>Lambda Therapy Robot</h2>
          <p className="subtitle">Revolutionary rehabilitation technology for comprehensive recovery</p>
        </div>

        <div className="product-visualization">
          <VirtualTour onTourEnd={handleTourEnd} startTour={startTour && !tourStopped} isStopped={tourStopped} />

          <div className="product-info">
            <h3>Advanced Rehabilitation Technology</h3>
            <p>The Lambda system combines robotics, real-time biofeedback, and adaptive algorithms to deliver personalized therapy.</p>
            <div className="info-highlights">
              <div className="info-item"><span className="info-icon">🏥</span><span>Clinical Proven</span></div>
              <div className="info-item"><span className="info-icon">🧑‍⚕️</span><span>Therapist Approved</span></div>
              <div className="info-item"><span className="info-icon">📈</span><span>Data Driven</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="technical-specs">
        <h2 className="section-title">Technical Specifications</h2>
        <p className="subtitle">Precision engineering for clinical environments</p>
        <div className="specs-container scrollable-horizontal">
          <div className="specs-grid">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="spec-item" style={{ animationDelay: `${4000 + index * 100}ms` }}>
                <div className="spec-name">{spec.name}</div>
                <div className="spec-value">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPart && <PartModal part={selectedPart} onClose={closePartDetails} />}
      {selectedFeature && <FeaturesModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />}

      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Back to top">
        ↑
      </button>

    </div>
  );
};

export default ProductExplorer;
