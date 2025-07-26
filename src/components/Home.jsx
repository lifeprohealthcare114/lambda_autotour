import React from 'react';
import Header from './Header'; // ✅ This fixes the Skip Tour button
import { productData } from '../data';
import './../styles/Home.css';

const Home = ({ navigateTo }) => {
  return (
    <div className="home">
      <Header navigateTo={navigateTo} showSkipButton={true} />
      <section className="hero-section" aria-labelledby="main-heading">
        <video 
          autoPlay 
          muted 
          loop 
          className="hero-video" 
          playsInline
          aria-hidden="true"
        >
          <source src="/assets/videos/lambda-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1 id="main-heading">{productData.name}</h1>
          <p>{productData.description}</p>
          <p>Revolutionizing the way industries operate with cutting-edge technology</p>
          <button 
            className="explore-button"
            onClick={() => navigateTo('product')}
            aria-label="Explore product features"
          >
            Explore Product Features
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
