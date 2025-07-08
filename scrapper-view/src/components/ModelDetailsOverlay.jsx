import { useState } from 'react';
import JSZip from 'jszip';
import './ModelDetailsOverlay.css';

function ModelDetailsOverlay({ files = [], modelName, onClose }) {
  const [downloadingFiles, setDownloadingFiles] = useState(new Set());
  const [downloadingAll, setDownloadingAll] = useState(false);

  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownloadFile = async (file) => {
    if (!file.downloadUrl) return;
    
    setDownloadingFiles(prev => new Set(prev).add(file.id || file.name));
    
    try {
      const link = document.createElement('a');
      link.href = file.downloadUrl;
      link.download = file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(file.id || file.name);
        return newSet;
      });
    }
  };

  const handleDownloadAll = async () => {
    if (files.length === 0) return;
    
    setDownloadingAll(true);
    
    try {
      const zip = new JSZip();
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.downloadUrl) {
          console.log(`Fetching file ${i + 1}/${files.length}: ${file.name}`);
          
          try {
            const response = await fetch(file.downloadUrl);
            if (response.ok) {
              const blob = await response.blob();
              zip.file(file.name, blob);
            } else {
              console.error(`Failed to fetch ${file.name}: ${response.status}`);
            }
          } catch (error) {
            console.error(`Error fetching ${file.name}:`, error);
          }
        }
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `${modelName || 'model-files'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
      
      console.log('Zip download completed');
    } catch (error) {
      console.error('Zip creation failed:', error);
    } finally {
      setDownloadingAll(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="model-details-backdrop" onClick={handleBackdropClick}>
      <div className="model-details-overlay">
        <div className="model-details-header">
          <h2>Model Files</h2>
          <button onClick={onClose} className="close-btn-x">×</button>
        </div>
        
        {modelName && (
          <div className="model-title">
            <h3>{modelName}</h3>
          </div>
        )}

        <div className="model-details-content">
          {files.length > 0 ? (
            <>
              <div className="download-all-container">
                <button 
                  onClick={handleDownloadAll}
                  disabled={downloadingAll}
                  className="download-all-btn"
                >
                  {downloadingAll ? 'Downloading...' : `Download All (${files.length} files)`}
                </button>
              </div>

              <div className="files-list">
                {files.map((file, index) => (
                  <div key={file.id || index} className="file-item">
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      {file.size && (
                        <span className="file-size">({formatFileSize(file.size)})</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDownloadFile(file)}
                      disabled={downloadingFiles.has(file.id || file.name) || !file.downloadUrl}
                      className="download-btn"
                    >
                      {downloadingFiles.has(file.id || file.name) ? (
                        <span className="downloading">↓</span>
                      ) : (
                        '↓'
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-files">
              <p>No files available for this model.</p>
            </div>
          )}
        </div>

        <div className="model-details-actions">
          <button onClick={onClose} className="close-btn">Close</button>
        </div>
      </div>
    </div>
  );
}

export default ModelDetailsOverlay;