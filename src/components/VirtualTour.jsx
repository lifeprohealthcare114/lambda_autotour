import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/VirtualTour.css';
import Loader from '../components/Loader';
const deviceComponents = [
  {
    id: 'display',
    name: 'Interactive Display',
    position: { top: '40%', left: '34%' },
    details: (
      <div className="detail-content">
        <div className="media-container">
          <img src="/assets/images/display-detail.jpg" alt="Interactive Display" />
        </div>
        <div className="text-content">
          <h4>Features:</h4>
          <ul>
            <li>Intuitive therapist interface</li>
            <li>50+ preloaded therapy programs</li>
            <li>Patient progress tracking</li>
            <li>Multi-language support</li>
          </ul>
          <div className="metrics-section">
            <h4>Clinical Analytics:</h4>
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-value">100g</div>
                <div className="metric-label">Strength resolution</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">50+</div>
                <div className="metric-label">Parameters tracked</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">0.5°</div>
                <div className="metric-label">Angular precision</div>
              </div>
            </div>
          </div>
          <div className="efficiency-section">
            <h4>Clinical Efficiency:</h4>
            <div className="efficiency-stats">
              <div className="stat-item">
                <div className="stat-value">3 min</div>
                <div className="stat-label">Setup time</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">30 min</div>
                <div className="stat-label">Per patient</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">50+/week</div>
                <div className="stat-label">Patient capacity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'visualization',
    name: 'Patient Visualization Screen',
    position: { top: '35%', left: '60%' },
    details: (
      <div className="detail-content">
        <div className="media-container">
          <video src="/assets/videos/visualization.mp4" controls autoPlay muted loop playsInline />
        </div>
        <div className="text-content">
          <h4>Therapy Visualization Features:</h4>
          <ul>
            <li>Real-time movement tracking with avatar feedback</li>
            <li>10+ gamified therapy modes</li>
            <li>Progress indicators and achievement rewards</li>
            <li>Adjustable difficulty levels</li>
          </ul>
          <div className="feature-columns">
            <div className="feature-column">
              <h4>Exercise Types:</h4>
              <ul>
                <li>Range of motion guidance</li>
                <li>Strength training games</li>
                <li>Coordination challenges</li>
                <li>Functional movement patterns</li>
              </ul>
            </div>
            <div className="feature-column">
              <h4>Visual Feedback:</h4>
              <ul>
                <li>3D limb position tracking</li>
                <li>Force/effort visualization</li>
                <li>Correct vs. actual movement comparison</li>
                <li>Therapy progress metrics</li>
              </ul>
            </div>
          </div>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-value">10+</div>
              <div className="metric-label">Game modes</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">5</div>
              <div className="metric-label">Difficulty levels</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">100%</div>
              <div className="metric-label">Patient engagement</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'pedals',
    name: 'Adjustable Pedals',
    description: 'Ergonomic foot positioning system',
    position: { top: '65%', left: '58%' },
    details: (
      <div className="detail-content">
        <div className="media-container">
          <video
            controls
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/pedals-poster.jpg"
          >
            <source src="/assets/videos/pendal.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="text-content">
          <h4>Features:</h4>
          <ul>
            <li>6-position height adjustment</li>
            <li>360° rotation capability</li>
            <li>Quick-release mechanism</li>
            <li>Anti-slip surface</li>
          </ul>
          <div className="specs-grid">
            <div className="spec-item">
              <div className="spec-value">40-80cm</div>
              <div className="spec-label">Height range</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">150kg</div>
              <div className="spec-label">Weight capacity</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'seat',
    name: '360° Rotating Seat',
    description: 'Patient transfer system',
    position: { top: '55%', left: '74%' },
    details: (
      <div className="detail-content">
        <div className="media-container">
          <video src="/assets/videos/seat-rotation.mp4" controls autoPlay muted loop playsInline />
        </div>
        <div className="text-content">
          <h4>Features:</h4>
          <ul>
            <li>Smooth 360° rotation</li>
            <li>Height adjustable (40-60cm)</li>
            <li>Retractable armrests</li>
            <li>150kg weight capacity</li>
          </ul>
          <div className="feature-highlight">
            <div className="highlight-icon">🔄</div>
            <div className="highlight-text">
              Full rotation in just 2 seconds with smooth motion control
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'sensors',
    name: 'Precision Sensors',
    position: { top: '58%', left: '61%' },
    details: (
      <div className="detail-content">
        <div className="media-container">
          <video
            src="/assets/videos/sensors.mp4"
            controls
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/sensors-poster.jpg"
          />
        </div>
        <div className="text-content">
          <h4>Biomechanical Measurement System</h4>
          <ul>
            <li>Detects 100g strength changes</li>
            <li>200Hz sampling rate</li>
            <li>EMG compatible</li>
            <li>Real-time force vector analysis</li>
          </ul>
          <div className="tech-specs">
            <div className="tech-item">
              <h5>Accuracy</h5>
              <p>±0.5% of reading</p>
            </div>
            <div className="tech-item">
              <h5>Range</h5>
              <p>0-500N</p>
            </div>
            <div className="tech-item">
              <h5>Response Time</h5>
              <p>&lt;5ms</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];


const VirtualTour = ({ onTourEnd, startTour }) => {
  const [activeLabel, setActiveLabel] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [autoZoomDirection, setAutoZoomDirection] = useState('in');
  const [isTourActive, setIsTourActive] = useState(false);
  const [isTourPaused, setIsTourPaused] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [clickPosition, setClickPosition] = useState(null);
  const [manualScrollOverride, setManualScrollOverride] = useState(false);
    const [imageLoading, setImageLoading] = useState(true); // ✅ For main image
  const [modalMediaLoading, setModalMediaLoading] = useState(true); // ✅ For modal media

  const deviceImageRef = useRef(null);
  const deviceViewRef = useRef(null);
  const modalRef = useRef(null);
  const tourTimerRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());
  const inactivityTimerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      lastInteractionRef.current = Date.now();
    };

    const checkInactivity = () => {
      if (isTourPaused && Date.now() - lastInteractionRef.current > 2 * 60 * 1000) {
        setIsTourPaused(false);
        setManualScrollOverride(false);
      }
    };

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('touchstart', resetTimer);
    inactivityTimerRef.current = setInterval(checkInactivity, 10000);

    return () => {
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
      document.removeEventListener('touchstart', resetTimer);
      clearInterval(inactivityTimerRef.current);
    };
  }, [isTourPaused]);

  useEffect(() => {
    if (startTour) {
      const timer = setTimeout(() => {
        setIsTourActive(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [startTour]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTourPaused && (!isTourActive || (isTourActive && !activeLabel))) {
        setZoomLevel(prev => {
          let next = autoZoomDirection === 'in' ? prev + 0.01 : prev - 0.01;
          if (next >= 1.5) {
            setAutoZoomDirection('out');
            next = 1.5;
          } else if (next <= 1) {
            setAutoZoomDirection('in');
            next = 1;
          }
          return parseFloat(next.toFixed(2));
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [autoZoomDirection, isTourActive, isTourPaused, activeLabel]);

  const estimateReadingTime = useCallback(() => {
    if (!modalRef.current) return 3000;
    const text = modalRef.current.innerText || '';
    const wordCount = text.split(/\s+/).length;
    const readingTime = (wordCount / 3) * 100 + 2000;
    const visibleHeight = modalRef.current.clientHeight;
    const scrollHeight = modalRef.current.scrollHeight;
    const scrollTime = scrollHeight > visibleHeight
      ? (scrollHeight - visibleHeight) * 15
      : 0;
    return Math.min(30000, Math.max(5000, readingTime + scrollTime));
  }, []);

  const waitForVideoEnd = useCallback((element) => {
    return new Promise(resolve => {
      const video = element?.querySelector('video');
      if (video) {
        video.loop = false;
        if (video.ended) return resolve();
        const onEnd = () => {
          video.removeEventListener('ended', onEnd);
          resolve();
        };
        video.addEventListener('ended', onEnd);
        video.play().catch(() => resolve());
      } else {
        resolve();
      }
    });
  }, []);

  const autoScrollModal = useCallback(() => {
    return new Promise(resolve => {
      if (!modalRef.current || modalRef.current.scrollHeight <= modalRef.current.clientHeight || manualScrollOverride)
        return resolve();
      const totalScroll = modalRef.current.scrollHeight - modalRef.current.clientHeight;
      const step = 1;
      let scrolled = 0;
      const interval = setInterval(() => {
        if (!modalRef.current || scrolled >= totalScroll) {
          clearInterval(interval);
          resolve();
        } else {
          modalRef.current.scrollTop += step;
          scrolled += step;
        }
      }, 15);
    });
  }, [manualScrollOverride]);

  const runTourStep = useCallback(async () => {
    if (!isTourActive || isTourPaused) return;

    const hotspot = deviceComponents[tourIndex];
    if (hotspot) {
      const el = document.querySelector(`.hotspot[data-id="${hotspot.id}"]`);
      if (el) {
        const rect = el.getBoundingClientRect();
        setClickPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setTimeout(() => setClickPosition(null), 800);
      }

      setActiveLabel(hotspot.id);
      setZoomLevel(1.4);
      setPosition({ x: 0, y: 0 });

      await new Promise(r => setTimeout(r, 300));
      if (modalRef.current) {
        modalRef.current.scrollTo({ top: 0 });

        const video = modalRef.current.querySelector('video');
        if (video) {
          try {
            video.currentTime = 0;
            await video.play();
          } catch (err) {}
        }

        await waitForVideoEnd(modalRef.current);

        if (tourIndex === 0) {
          await new Promise(r => setTimeout(r, 5000));
        }

        await autoScrollModal();
      }

      const isLastStep = tourIndex === deviceComponents.length - 1;
      const delay = isLastStep ? 1000 : estimateReadingTime();

      tourTimerRef.current = setTimeout(async () => {
        if (!isTourPaused) {
          setActiveLabel(null);
        }

        if (!isLastStep) {
          await new Promise(r => setTimeout(r, 3000));
          if (!isTourPaused) {
            setTourIndex(i => i + 1);
          }
        } else {
          if (!isTourPaused) {
            setZoomLevel(1);
            setPosition({ x: 0, y: 0 });
            setTimeout(() => {
              setIsTourActive(false);
              if (typeof onTourEnd === 'function') {
                setTimeout(onTourEnd, 500);
              }
            }, 3000);
          }
        }
      }, delay);
    }
  }, [tourIndex, isTourActive, isTourPaused, waitForVideoEnd, autoScrollModal, estimateReadingTime, onTourEnd]);

  useEffect(() => {
    clearTimeout(tourTimerRef.current);
    if (isTourActive && !isTourPaused) {
      runTourStep();
    }
  }, [tourIndex, isTourActive, isTourPaused, runTourStep]);

   const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      const container = deviceViewRef.current;
      const image = deviceImageRef.current;
      if (container && image) {
        const maxX = (image.clientWidth * zoomLevel - container.clientWidth) / 2;
        const maxY = (image.clientHeight * zoomLevel - container.clientHeight) / 2;
        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY))
        });
      }
    }
  };

  return (
    <section className="virtual-tour">
      <div className="tour-header">
        <h2>Interactive Virtual Tour</h2>
        <p className="subtitle">Exploring Lambda Therapy Robot Features</p>
      </div>

      <div
        className="device-view"
        ref={deviceViewRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        style={{ cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default' }}
      >
        <div
          className="zoom-container"
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            transition: 'transform 1.2s ease-in-out',
            transformOrigin: 'center center',
          }}
        >
          {imageLoading && <Loader />} {/* ✅ Loader for main image */}
          <img
            ref={deviceImageRef}
            src="/assets/images/lambda_health_system2.webp"
            alt="Lambda Therapy Robot"
            className="device-image"
            onLoad={() => setImageLoading(false)} // ✅ hide loader on load
          />

          {deviceComponents.map(h => (
            <button
              key={h.id}
              data-id={h.id}
              className={`hotspot ${activeLabel === h.id ? 'active' : ''}`}
              style={{
                top: h.position.top,
                left: h.position.left,
                opacity: activeLabel && activeLabel !== h.id ? 0.5 : 1,
              }}
              onClick={() => {
                setIsTourPaused(true);
                setManualScrollOverride(true);
                setActiveLabel(h.id === activeLabel ? null : h.id);
                setModalMediaLoading(true); // ✅ reset modal media loading
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="marker"></span>
           
              <span className="hotspot-tooltip">{h.name}</span>
            </button>
          ))}
        </div>
      </div>

      {clickPosition && (
        <div
          className="fake-click"
          style={{ left: `${clickPosition.x}px`, top: `${clickPosition.y}px` }}
        />
      )}

      {activeLabel && (
        <div className="modal-overlay" onClick={() => setActiveLabel(null)}>
          {isTourActive && (
            <div className="tour-controls">
              {isTourPaused ? (
                <button
                  className="resume-tour"
                  onClick={() => {
                    setIsTourPaused(false);
                    setManualScrollOverride(false);
                  }}
                >▶ Resume Tour</button>
              ) : (
                <button
                  className="pause-tour"
                  onClick={() => {
                    clearTimeout(tourTimerRef.current);
                    setIsTourPaused(true);
                  }}
                >⏸ Pause Tour</button>
              )}
              <button
                className="skip-tour"
                onClick={() => {
                  clearTimeout(tourTimerRef.current);
                  setTourIndex(i => Math.min(i + 1, deviceComponents.length - 1));
                  setManualScrollOverride(false);
                }}
              >⏭ Skip Step</button>
              <button
                className="restart-tour"
                onClick={() => {
                  clearTimeout(tourTimerRef.current);
                  setTourIndex(0);
                  setManualScrollOverride(false);
                }}
              >🔁 Restart Tour</button>
            </div>
          )}

          <div className="modal-content" ref={modalRef} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveLabel(null)}>✕</button>
            <div className="modal-header">
              <h3>{deviceComponents.find(h => h.id === activeLabel)?.name}</h3>
              <p>{deviceComponents.find(h => h.id === activeLabel)?.description}</p>
            </div>
            {modalMediaLoading && <Loader />} {/* ✅ Loader for modal media */}
            <div onLoad={() => setModalMediaLoading(false)} onLoadedData={() => setModalMediaLoading(false)}>
              {deviceComponents.find(h => h.id === activeLabel)?.details}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VirtualTour;