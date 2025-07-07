import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import './Modelpreview.css';
import ModelDetailsOverlay from './ModelDetailsOverlay';

function Modelpreview({ imageLink, modelName, websiteName, websiteLink, price, makes, files = [], likeCount = 0, commentCount = 0, isAwardWinning = false }) {
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
            {isAwardWinning && (
              <div className="award-tag">
                🏆 Featured
              </div>
            )}
            <div className="makes-count">
                {makes} makes
            </div>
            
            <div className="stats-badges">
              <div className="stat-badge like-badge">
                <Heart className="stat-icon" size={17} />
                <div className="stat-count">{likeCount}</div>
              </div>
              <div className="stat-badge comment-badge">
                <MessageCircle className="stat-icon" size={17} />
                <div className="stat-count">{commentCount}</div>
              </div>
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