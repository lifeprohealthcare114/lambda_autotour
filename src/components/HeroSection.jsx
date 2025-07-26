import { useEffect, useState, useRef } from 'react';
import '../styles/HeroSection.css';

const HeroSection = ({ navigateTo }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [showTechSpecs, setShowTechSpecs] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const checkViewport = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    const handleScroll = () => {
      if (isMobileView) {
        const videoHeight = document.querySelector('.video-container').offsetHeight;
        setShowTechSpecs(window.scrollY > videoHeight * 0.8);
      }
    };

    checkViewport();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkViewport);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkViewport);
    };
  }, [isMobileView]);

  const handleVideoEnd = () => {
    // Trigger fade-out animation
    setFadeOut(true);

    // Wait for animation to finish before navigating
    setTimeout(() => {
      navigateTo('product', { startTour: true });
    }, 1000); // match the CSS transition duration
  };

  return (
    <section className={`hero ${fadeOut ? 'fade-out' : ''}`}>
      <div className="video-container">
        <video
          autoPlay
          muted
          className="hero-video"
          onEnded={handleVideoEnd}
          ref={videoRef}
        >
          <source src="/assets/videos/lambda-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="hero-content">
        <h1>Lambda Therapy Robot</h1>
        <p>Revolutionizing lower limb rehabilitation</p>

        <div className="highlights">
          <div className="highlight">
            <span className="number">50+</span>
            <span className="text">Therapy Modes</span>
          </div>
          <div className="highlight">
            <span className="number">3</span>
            <span className="text">Minute Setup</span>
          </div>
          <div className="highlight">
            <span className="number">360°</span>
            <span className="text">Access</span>
          </div>
        </div>
      </div>

      {isMobileView && (
        <div className={`tech-specs ${showTechSpecs ? 'visible' : ''}`}>
          <h3>Technical Specifications</h3>
          <div className="specs-grid">
            <div className="spec"><span>Weight</span><span>45 kg</span></div>
            <div className="spec"><span>Dimensions</span><span>1200 × 800 × 600 mm</span></div>
            <div className="spec"><span>Power</span><span>220V AC, 50Hz</span></div>
            <div className="spec"><span>Therapy Range</span><span>0-300° rotation</span></div>
            <div className="spec"><span>Max Speed</span><span>60 RPM</span></div>
            <div className="spec"><span>Safety</span><span>Emergency stop, overload protection</span></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
