import { useState } from 'react';
import './Modelpreview.css';
import ModelDetailsOverlay from './ModelDetailsOverlay';

function Modelpreview({ imageLink, modelName, websiteName, websiteLink, price, makes, files = [] }) {
  const [showDetails, setShowDetails] = useState(false);
  const cleanPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[€$£¥¢₹\s,]/g, ''));
    }
    return 0;
  };
   const parsedPrice = cleanPrice(price);
  const isFree = !parsedPrice || parsedPrice === 0;
  
  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetails(true);
  };

  return (
    <>
      <div className="model-preview">
        <a href={websiteLink} target="_blank" className="model-link">
          <div className="model-image-container">
            <img src={imageLink} alt={modelName} loading="lazy" className="model-image" />
            {!isFree && price && (
              <div className="price-tag">
                {typeof price === 'number' ? `$${price.toFixed(2)}` : price}
              </div>
            )}
            {isFree && (
              <div className="free-tag">
                FREE
              </div>
            )}
            <div className="makes-count">
                {makes} makes
            </div>
          </div>
          <div className="model-info">
            <h2 className="model-name">{modelName}</h2>
            <div className="model-meta">
              <span className="website-name">{websiteName}</span>
            </div>
          </div>
        </a>
        
        <button 
          className="view-details-btn"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>

      {showDetails && (
        <ModelDetailsOverlay
          files={files}
          modelName={modelName}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

export default Modelpreview;