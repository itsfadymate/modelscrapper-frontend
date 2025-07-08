import { useState } from 'react';
import { Heart, MessageCircle, Eye, Box } from 'lucide-react';
import './Modelpreview.css';
import ModelDetailsOverlay from './ModelDetailsOverlay';

function Modelpreview({id, imageLink, modelName, websiteName, websiteLink, price, makes, files = [], likeCount = 0, commentCount = 0, isAwardWinning = false }) {
  const [showDetails, setShowDetails] = useState(false);
  const [modelFiles, setModelFiles] = useState(files); 
  const [isLoadingFiles, setIsLoadingFiles] = useState(false); 
  
  const cleanPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      if (price==='paid')return 1;
      return parseFloat(price.replace(/[€$£¥¢₹\s,]/g, ''));
    }
    return 0;
  };
   const parsedPrice = cleanPrice(price);
  const isFree = !parsedPrice || parsedPrice === 0;
  
  const handleView3D = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    
    let filesToLoad = modelFiles;
    
    if (!filesToLoad || filesToLoad.length === 0) {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/models/download';
        const params = new URLSearchParams({
          sourceName: websiteName,
          id: id
        });
        
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        filesToLoad = await response.json();
      } catch (error) {
        console.error('Error fetching files:', error);
        filesToLoad = [];
      }
    }
    
    const supportedFiles = filesToLoad.filter(file => {
      const ext = file.name.toLowerCase();
      return ext.endsWith('.stl') || ext.endsWith('.obj') || ext.endsWith('.3mf');
    });
    
    if (supportedFiles.length > 0) {
      const fileUrls = supportedFiles.map(file => file.downloadUrl);
      const kiriUrl = `https://grid.space/kiri/?load=${encodeURIComponent(fileUrls.join(','))}`;
      window.open(kiriUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open('https://grid.space/kiri/', '_blank', 'noopener,noreferrer');
      alert('No 3D files found. You can manually load files in Kiri:Moto.');
    }
  };

  const handleViewDetails = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowDetails(true); 
    
    if (!modelFiles || modelFiles.length === 0) {
      setIsLoadingFiles(true);
      
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/models/download';
        const params = new URLSearchParams({
          sourceName: websiteName,
          id: id
        });
        
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        const fetchedFiles = await response.json();
        
        setModelFiles(fetchedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
        setModelFiles([]);
      } finally {
        setIsLoadingFiles(false);
      }
    }
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
        
        <div className="model-actions">
          <button 
            className="view-details-btn"
            onClick={handleViewDetails}
          >
            <Eye size={16} />
              Details
          </button>
          
          <button 
            className="view-3d-btn"
            onClick={handleView3D}
          >
            <Box size={16} />
            3D View
          </button>
        </div>
      </div>

      {showDetails && (
        <ModelDetailsOverlay
          files={modelFiles}
          modelName={modelName}
          isLoading={isLoadingFiles}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

export default Modelpreview;