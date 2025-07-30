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
  { name: "Display", value: "15.6\" HD Touchscreen" },
  { name: "Setup Time", value: "<3 minutes" },
  { name: "Patient Throughput", value: "50+/week" }
];

const ProductExplorer = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [startTour, setStartTour] = useState(false);
  const [, setScrollingDown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const markers = document.querySelectorAll('.part-marker');
    markers.forEach((marker, index) => {
      marker.style.animation = `pulse 2s ${index * 0.2}s 3`;
    });

    // Start the tour immediately on load
    setStartTour(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closePartDetails = () => setSelectedPart(null);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleTourEnd = () => {
    setScrollingDown(true);

    // Scroll to bottom smoothly
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    const check = setInterval(() => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
        clearInterval(check);

        // Wait for 6 seconds before scrolling up and navigating home
        setTimeout(() => {
          setScrollingDown(false);
          scrollToTop();

          // Optional: wait 1 second after scrolling up before navigating
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('navigate-home'));
          }, 1000);
        }, 6000); // 6 second delay
      }
    }, 300);
  };

  return (
    <div className="product-explorer fade-in" ref={containerRef}>
      <section className="product-overview">
        <div className="product-header">
          <h2>Lambda Therapy Robot</h2>
          <p className="subtitle">Revolutionary rehabilitation technology for comprehensive recovery</p>
        </div>

        <div className="product-visualization">
          <VirtualTour onTourEnd={handleTourEnd} startTour={startTour} />

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
        <div className="specs-container">
          <div className="specs-grid">
            {technicalSpecs.map((spec, index) => (
              <div 
                key={index} 
                className="spec-item"
                style={{ animationDelay: `${4000 + index * 100}ms` }}
              >
                <div className="spec-name">{spec.name}</div>
                <div className="spec-value">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPart && <PartModal part={selectedPart} onClose={closePartDetails} />}
      {selectedFeature && <FeaturesModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />}

      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default ProductExplorer;
