import { useRef, useEffect, useState } from 'react';
import './Kiri3DOverlay.css';

function Kiri3DOverlay({ files, modelName, onClose }) {
  const iframeRef = useRef(null);
  const [loadFailed, setLoadFailed] = useState(false);
  
  const kiriUrl = import.meta.env.VITE_KIRI_MOTO_URL || 'https://grid.space/kiri/';
  
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    const handleIframeLoad = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow.postMessage({ mode: "FDM" }, '*');
          console.log('Set mode to FDM');

          iframe.contentWindow.postMessage({ clear: true }, '*');
          console.log('Cleared workspace');

          for (const file of files) {
            iframe.contentWindow.postMessage({ load: file.downloadUrl }, '*');
            console.log(`Requested ${file.name} model load`);
          }
        
          console.log('All commands sent to Kiri iframe');
        } catch (error) {
          console.error('Error sending message to iframe:', error);
          setLoadFailed(true);
        }
      }, 1000); 
    };
    
    iframe.addEventListener('load', handleIframeLoad);

    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
    };
  }, []);

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
          <button className="close-btn-x" onClick={onClose}>×</button>
        </div>
        
        <div className="kiri-overlay-content">
          <iframe
            ref={iframeRef}
            src={kiriUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Kiri:Moto 3D Viewer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups"
          />
        </div>

        <div className="kiri-overlay-instructions">
          {!loadFailed && <p><strong>Please wait while all {files.length} files load</strong></p>}
          {loadFailed && <p><strong>Automatic load failed</strong></p>}
        </div>
      </div>
    </div>
  );
}

export default Kiri3DOverlay;