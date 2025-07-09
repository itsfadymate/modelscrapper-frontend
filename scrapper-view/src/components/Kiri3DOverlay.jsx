import { useRef } from 'react';
import './Kiri3DOverlay.css';

function Kiri3DOverlay({ files, modelName, onClose }) {
  const iframeRef = useRef(null);
  
  const getKiriUrlWithFiles = () => {
    let kiriUrl = import.meta.env.VITE_KIRI_MOTO_URL || 'https://grid.space/kiri/';
    
    if (files && files.length > 0) {
      const stlFiles = files.filter(file => 
        file.name.toLowerCase().endsWith('.stl') ||
        file.name.toLowerCase().endsWith('.obj')
      );
      
      if (stlFiles.length > 0) {
        const fileUrls = stlFiles.map(file => file.downloadUrl);
        kiriUrl += `?load=${encodeURIComponent(fileUrls[0])}`;
        console.log('Loading Kiri with files url:', kiriUrl);
      }
    }
    
    return kiriUrl;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="kiri-overlay-backdrop" onClick={handleBackdropClick}>
      <div className="kiri-overlay">
        <div className="kiri-overlay-header">
          <h3>3D Viewer - {modelName}</h3>
          <button onClick={onClose} className="close-btn-x">×</button>
        </div>
        
        <div className="kiri-overlay-content">
          <iframe
            ref={iframeRef}
            src={getKiriUrlWithFiles()}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Kiri:Moto 3D Viewer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups"
            allowFullScreen
          />
        </div>

        <div className="kiri-overlay-instructions">
          <p><strong>Instructions:</strong> Files should load automatically. If not please load them manually</p>
        </div>
      </div>
    </div>
  );
}

export default Kiri3DOverlay;