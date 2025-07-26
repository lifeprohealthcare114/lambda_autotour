import '../styles/FeaturesModal.css';

const FeaturesModal = ({ feature, onClose }) => {
  if (!feature) return null;  // Add this safety check

  return (
    <div className="features-modal-overlay">
      <div className="features-modal-container">
        <div className="features-modal-content">
          <button className="modal-close-button" onClick={onClose}>&times;</button>
          <div className="modal-header">
            <h2>{feature.title}</h2>
            <div className="feature-icon-large">{feature.icon}</div>
          </div>
          
          <div className="modal-body">
            {feature.details}  
          </div>

          {feature.quote && (
            <div className="feature-quote">
              <p>"{feature.quote.text}"</p>
              <p className="quote-author">- {feature.quote.author}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesModal;