import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/VirtualTour.css';

const deviceComponents = [
  {
    id: 'display',
    name: 'Interactive Display',
    position: { top: '41%', left: '28%' },
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
    position: { top: '30%', left: '65%' },
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
    position: { top: '68%', left: '60%' },
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
    position: { top: '48%', left: '86%' },
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
    position: { top: '57%', left: '62%' },
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
  const [tourIndex, setTourIndex] = useState(0);
  const [isAutoZooming, setIsAutoZooming] = useState(true);
  const [clickPosition, setClickPosition] = useState(null);

  const deviceImageRef = useRef(null);
  const deviceViewRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (startTour) {
      const tourStartTimer = setTimeout(() => {
        setIsTourActive(true);
        setIsAutoZooming(false);
      }, 5000);
      return () => clearTimeout(tourStartTimer);
    }
  }, [startTour]);

  useEffect(() => {
    if (!isTourActive && isAutoZooming) {
      const interval = setInterval(() => {
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
      return () => clearInterval(interval);
    }
  }, [autoZoomDirection, isTourActive, isAutoZooming]);

  const estimateReadingTime = useCallback(() => {
    if (!modalRef.current) return 3000;
    const wordCount = (modalRef.current.innerText || '').split(/\s+/).length;
    const readingTime = (wordCount / 3) * 100 + 2000;
    const scrollTime = modalRef.current.scrollHeight > modalRef.current.clientHeight
      ? (modalRef.current.scrollHeight - modalRef.current.clientHeight) * 20
      : 0;
    return Math.min(25000, Math.max(5000, readingTime + scrollTime));
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
      if (!modalRef.current || modalRef.current.scrollHeight <= modalRef.current.clientHeight)
        return resolve();
      let scrolled = 0;
      const totalScroll = modalRef.current.scrollHeight - modalRef.current.clientHeight;
      const step = 2;
      const interval = setInterval(() => {
        if (!modalRef.current || scrolled >= totalScroll) {
          clearInterval(interval);
          resolve();
        } else {
          modalRef.current.scrollTop += step;
          scrolled += step;
        }
      }, 20);
    });
  }, []);

  useEffect(() => {
    let tourTimer;
    if (isTourActive) {
      const runTourStep = async () => {
        const hotspot = deviceComponents[tourIndex];
        if (hotspot) {
          const hotspotElement = document.querySelector(`.hotspot[data-id="${hotspot.id}"]`);
          if (hotspotElement) {
            const rect = hotspotElement.getBoundingClientRect();
            setClickPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            setTimeout(() => setClickPosition(null), 800);
          }

          setActiveLabel(hotspot.id);
          setZoomLevel(1.4);
          setPosition({ x: 0, y: 0 });

          await new Promise(r => setTimeout(r, 300));

          if (modalRef.current) {
            modalRef.current.scrollTo({ top: 0 });
            await waitForVideoEnd(modalRef.current);
            await autoScrollModal();
          }

          const delay = estimateReadingTime();
          tourTimer = setTimeout(async () => {
            setActiveLabel(null);
            await new Promise(r => setTimeout(r, 3000)); // 3-second gap before next

            if (tourIndex + 1 < deviceComponents.length) {
              setTourIndex(prev => prev + 1);
            } else {
              setIsTourActive(false);
              setIsAutoZooming(true);
              if (typeof onTourEnd === 'function') {
                setTimeout(onTourEnd, 500);
              }
            }
          }, delay);
        }
      };
      runTourStep();
    }
    return () => clearTimeout(tourTimer);
  }, [tourIndex, isTourActive, onTourEnd, waitForVideoEnd, autoScrollModal, estimateReadingTime]);

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

      <div className="zoom-controls">
        <button onClick={() => setZoomLevel(z => Math.min(z + 0.1, 2))}>+</button>
        <button onClick={() => setZoomLevel(z => Math.max(z - 0.1, 1))}>-</button>
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
        <img
          ref={deviceImageRef}
          src="/assets/images/lambda_health_system2.webp"
          alt="Lambda Therapy Robot"
          className="device-image"
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            transition: 'transform 1.2s ease-in-out',
          }}
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
              transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`,
              transformOrigin: 'center center'
            }}
            onClick={() => {
              setActiveLabel(h.id === activeLabel ? null : h.id);
              setIsAutoZooming(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="marker"></span>
            <span className="hotspot-pulse"></span>
            <span className="hotspot-tooltip">{h.name}</span>
          </button>
        ))}
      </div>

      {clickPosition && (
        <div
          className="fake-click"
          style={{ left: `${clickPosition.x}px`, top: `${clickPosition.y}px` }}
        />
      )}

      {activeLabel && (
        <div className="modal-overlay" onClick={() => setActiveLabel(null)}>
          <div className="modal-content" ref={modalRef} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveLabel(null)}>✕</button>
            <div className="modal-header">
              <h3>{deviceComponents.find(h => h.id === activeLabel)?.name}</h3>
              <p>{deviceComponents.find(h => h.id === activeLabel)?.description}</p>
            </div>
            {deviceComponents.find(h => h.id === activeLabel)?.details}
          </div>
        </div>
      )}
    </section>
  );
};

export default VirtualTour;
