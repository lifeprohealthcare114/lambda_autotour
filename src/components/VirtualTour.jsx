import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/VirtualTour.css';
import Loader from '../components/Loader';

import { useInView } from 'react-intersection-observer';

const deviceComponents = [
  {
    id: 'display',
    name: 'Interactive Display',
    position: { top: '40%', left: '36%' },
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
    name: 'Visualization Screen',
    position: { top: '34%', left: '60%' },
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
    name: 'Pedals',
    position: { top: '66%', left: '57%' },
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
    name: '360° Seat',
    position: { top: '60%', left: '69%' },
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
    name: 'Sensors',
    position: { top: '55%', left: '58%' },
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

const VirtualTour = ({ onTourEnd, startTour, isStopped }) => {
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
  const [imageLoading, setImageLoading] = useState(true);
  const [modalMediaLoading, setModalMediaLoading] = useState(true);

  const [userScrolling, setUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const deviceImageRef = useRef(null);
  const deviceViewRef = useRef(null);
  const modalRef = useRef(null);
  const tourTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const autoZoomIntervalRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());

  const [refInView, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (isStopped) return;

    const resetTimer = () => {
      lastInteractionRef.current = Date.now();
    };
    const checkInactivity = () => {
      if (isTourPaused && Date.now() - lastInteractionRef.current > 2 * 60 * 1000) {
        setIsTourPaused(false);
        setUserScrolling(false);
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
  }, [isTourPaused, isStopped]);

  useEffect(() => {
    autoZoomIntervalRef.current = setInterval(() => {
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
    }, 100);

    return () => clearInterval(autoZoomIntervalRef.current);
  }, [autoZoomDirection]);

  useEffect(() => {
    if (isStopped) {
      clearTimeout(tourTimerRef.current);
      setIsTourActive(false);
      setIsTourPaused(false);
      setActiveLabel(null);
      setPosition({ x: 0, y: 0 });
      setTourIndex(0);
      setUserScrolling(false);
    }
  }, [isStopped]);

  useEffect(() => {
    if (isStopped) {
      setIsTourActive(false);
      setActiveLabel(null);
      return;
    }
    if (startTour) {
      setIsTourActive(true);
      setTourIndex(0);
    }
  }, [startTour, isStopped]);

  // Estimate reading time of modal content to calculate tour step delay
  const estimateReadingTime = useCallback(() => {
    if (!modalRef.current) return 3000;
    const text = modalRef.current.innerText || '';
    const wordCount = text.split(/\s+/).length;
    const readingTime = (wordCount / 3) * 100 + 2000;
    const visibleHeight = modalRef.current.clientHeight;
    const scrollHeight = modalRef.current.scrollHeight;
    const scrollTime = scrollHeight > visibleHeight ? (scrollHeight - visibleHeight) * 15 : 0;
    return Math.min(30000, Math.max(5000, readingTime + scrollTime));
  }, []);

  const waitForVideoEnd = useCallback(element => {
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

  // Handle modal scroll: set userScrolling true temporarily to pause auto-scroll only
  const handleModalScroll = useCallback(() => {
    setUserScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setUserScrolling(false);
    }, 2000);
  }, []);

  // Add/remove scroll event listener on modal
  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.addEventListener('scroll', handleModalScroll);
      return () => {
        modal.removeEventListener('scroll', handleModalScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }
  }, [handleModalScroll]);

  // Auto-scroll modal content unless user is scrolling
  const autoScrollModal = useCallback(() => {
    return new Promise(resolve => {
      if (!modalRef.current || modalRef.current.scrollHeight <= modalRef.current.clientHeight)
        return resolve();

      if (userScrolling) return resolve(); // skip auto-scroll if user is scrolling

      const totalScroll = modalRef.current.scrollHeight - modalRef.current.clientHeight;
      const step = 1;
      let scrolled = 0;
      const interval = setInterval(() => {
        if (!modalRef.current || scrolled >= totalScroll || userScrolling) {
          clearInterval(interval);
          resolve();
        } else {
          modalRef.current.scrollTop += step;
          scrolled += step;
        }
      }, 15);
    });
  }, [userScrolling]);

  const handleSkipStep = useCallback(() => {
    clearTimeout(tourTimerRef.current);
    setActiveLabel(null);

    const isLastStep = tourIndex === deviceComponents.length - 1;

    if (!isLastStep) {
      setTimeout(() => {
        if (!isTourPaused && !isStopped) {
          setTourIndex(i => i + 1);
        }
      }, 500);
    } else {
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
      setTimeout(() => {
        setIsTourActive(false);
        if (typeof onTourEnd === 'function') {
          setTimeout(onTourEnd, 500);
        }
      }, 1000);
    }
  }, [tourIndex, isTourPaused, isStopped, onTourEnd]);

  // Run each tour step, showing hotspot modal and controls timing
  const runTourStep = useCallback(async () => {
    if (!isTourActive || isTourPaused || isStopped) return;

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
      if (modalRef.current && !isStopped) {
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
        if (isTourPaused || isStopped) return;

        setActiveLabel(null);

        if (!isLastStep) {
          await new Promise(r => setTimeout(r, 3000));
          if (!isTourPaused && !isStopped) {
            setTourIndex(i => i + 1);
          }
        } else {
          if (!isTourPaused && !isStopped) {
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
  }, [tourIndex, isTourActive, isTourPaused, isStopped, waitForVideoEnd, autoScrollModal, estimateReadingTime, onTourEnd]);

  useEffect(() => {
    clearTimeout(tourTimerRef.current);
    if (isStopped || !isTourActive || isTourPaused) {
      return;
    }
    runTourStep();
  }, [tourIndex, isTourActive, isTourPaused, isStopped, runTourStep]);

  useEffect(() => {
    return () => {
      clearTimeout(tourTimerRef.current);
      clearInterval(autoZoomIntervalRef.current);
      clearInterval(inactivityTimerRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

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
        role="region"
        aria-label="Virtual tour device view"
      >
        <motion.div
          className="lambda-zoom-wrapper"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        >
          <div
            className="zoom-container"
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
              transition: 'transform 1.2s ease-in-out',
              transformOrigin: 'center center',
            }}
          >
            {imageLoading && <Loader />}
            <img
              ref={deviceImageRef}
              src="/assets/images/lambda_health_system2.webp"
              alt="Lambda Therapy Robot"
              className="device-image"
              onLoad={() => setImageLoading(false)}
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
                  if (!isTourPaused) {
                    setIsTourPaused(true);
                  }
                  // do NOT set any scroll override here, allow manual scrolling always
                  setActiveLabel(h.id);
                  setModalMediaLoading(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label={`Show details for ${h.name}`}
              >
                <span className="marker" />
                <span className="hotspot-tooltip">{h.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {clickPosition && (
        <div
          className="fake-click"
          style={{ left: `${clickPosition.x}px`, top: `${clickPosition.y}px` }}
          aria-hidden="true"
        />
      )}

      {activeLabel && (
        <div className="modal-overlay" onClick={() => setActiveLabel(null)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content" ref={modalRef} onClick={e => e.stopPropagation()} tabIndex={-1}>
            <button className="modal-close" onClick={() => setActiveLabel(null)} aria-label="Close modal">✕</button>

            {/* Skip Button - Only show during active tour */}
            {isTourActive && !isTourPaused && (
              <button
                className="skip-button"
                onClick={e => {
                  e.stopPropagation();
                  handleSkipStep();
                }}
                aria-label="Skip this step"
              >
                Skip ▶
              </button>
            )}

            <div className="modal-header">
              <h3 id="modal-title">{deviceComponents.find(h => h.id === activeLabel)?.name}</h3>
              <p>{deviceComponents.find(h => h.id === activeLabel)?.description}</p>
            </div>
            <div ref={refInView}>
              {modalMediaLoading && <Loader />}
              {inView && (
                <div
                  onLoad={() => setModalMediaLoading(false)}
                  onLoadedData={() => setModalMediaLoading(false)}
                >
                  {deviceComponents.find(h => h.id === activeLabel)?.details}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VirtualTour;