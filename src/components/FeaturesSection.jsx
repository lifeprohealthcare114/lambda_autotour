import '../styles/FeaturesSection.css';

const features = [
  {
    title: "Versatile Therapy Modes",
    description: "50+ customizable therapy modes with quick 3-minute setup",
    icon: "🔄"
  },
  {
    title: "Comprehensive Feedback",
    description: "Real-time monitoring of symmetry, strength, ROM and more",
    icon: "📊"
  },
  {
    title: "Engaging Exergames",
    description: "Motivating games for improved patient engagement",
    icon: "🎮"
  },
  {
    title: "Cost Efficient",
    description: "Handles a patient every 30 minutes with fast ROI",
    icon: "💰"
  }
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2 className="section-title">Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;