import './../styles/PartModal.css';

const PartModal = ({ part, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h3>{part.name}</h3>
        <p className="part-description">{part.description}</p>
        
        <div className="specs-section">
          <h4>Specifications</h4>
          <ul>
            {part.specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
        
        <div className="features-section">
          <h4>Key Features</h4>
          <ul>
            {part.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartModal;