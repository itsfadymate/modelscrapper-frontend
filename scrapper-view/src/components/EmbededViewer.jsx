import './Kiri3DOverlay.css';

function EmbededViewer({ url, modelName, onClose }) {
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
            src={url}
            title={`${modelName} 3D Viewer`}
            className="embedded-3d-viewer"
            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; camera; microphone"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default EmbededViewer;