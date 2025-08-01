import { useState } from 'react';
import { Heart, MessageCircle, Eye, Box } from 'lucide-react';
import './Modelpreview.css';
import ModelDetailsOverlay from './ModelDetailsOverlay';
import Kiri3DOverlay from './Kiri3DOverlay';
import EmbededViewer from './EmbededViewer';

function Modelpreview({ result }) {

  const {
    id,
    imageLink,
    modelName,
    websiteName,
    websiteLink,
    price,
    makesCount,
    description,
    license,
    files,
    likesCount,
    commentsCount,
    featured,
    embeddedViewerUrl
  } = result;

  const [showDetails, setShowDetails] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [modelDetails, setModelDetails] = useState({ license, description, files });
  const [kiriMotoFiles, setKiriMotoFiles] = useState(files);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoading3D, setIsLoading3D] = useState(false);

  const corsEnforcingWebsites = new Set(['cults3d', 'grabcad', 'myminifactory']);
  const noDirectDownloadWebsites = new Set(['grabcad', 'sketchfab', 'thangs']);
  const no3DViewerWebsites = new Set(['grabcad', 'thangs']);


  const cleanPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      if (price === 'paid' || price === 'could be paid') return 1;
      return parseFloat(price.replace(/[€$£¥¢₹\s,]/g, ''));
    }
    return 0;
  };
  const parsedPrice = cleanPrice(price);
  const isFree = !parsedPrice || parsedPrice === 0;

  const handleView3D = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading3D(true);
    let filesToLoad = kiriMotoFiles;

    if (!noDirectDownloadWebsites.has(websiteName) && corsEnforcingWebsites.has(websiteName.toLowerCase())) {
      try {
        console.log('Fetching files for 3D viewer using localHostedLinks');
        const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/models/download/localhostedlinks';
        const params = new URLSearchParams({
          sourceName: websiteName,
          id: id,
          downloadPageUrl: websiteLink
        });

        const response = await fetch(`${baseUrl}?${params.toString()}`);
        filesToLoad = await response.json();
        setKiriMotoFiles(filesToLoad);
      } catch (error) {
        console.error('Error fetching files:', error);
        filesToLoad = [];
      }  
    //fetch the already fetched files if available
    }else if(!noDirectDownloadWebsites.has(websiteName) && modelDetails.files && modelDetails.files.some(file => file.downloadUrl && file.downloadUrl.startsWith('http'))) {
      console.log('Using already fetched files for 3D viewer');
      setKiriMotoFiles(modelDetails.files);
    } else if (!noDirectDownloadWebsites.has(websiteName) && (!kiriMotoFiles || kiriMotoFiles.length === 0)) {
      try {
        console.log('Fetching files for 3D viewer using downloadPageUrl');
        const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/models/download';
        const params = new URLSearchParams({
          sourceName: websiteName,
          id: id,
          downloadPageUrl: websiteLink
        });

        const response = await fetch(`${baseUrl}?${params.toString()}`);
        filesToLoad = await response.json();
        setKiriMotoFiles(filesToLoad);
      } catch (error) {
        console.error('Error fetching files:', error);
        filesToLoad = [];
      }
    }

    setIsLoading3D(false);
    setShow3DViewer(true);
  };

  const handleViewDetails = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowDetails(true);

    setIsLoadingDetails(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/models/details';
      const params = new URLSearchParams({
        sourceName: websiteName,
        id: id,
        downloadPageUrl: websiteLink
      });

      const response = await fetch(`${baseUrl}?${params.toString()}`);
      const fetchedDetails = await response.json();

      setModelDetails(fetchedDetails);
    } catch (error) {
      console.error('Error fetching files:', error);
      setKiriMotoFiles([]);
    } finally {
      setIsLoadingDetails(false);
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
            {featured && (
              <div className="award-tag">
                🏆 Featured
              </div>
            )}
            <div className="makes-count">
              {makesCount} makes
            </div>

            <div className="stats-badges">
              <div className="stat-badge like-badge">
                <Heart className="stat-icon" size={17} />
                <div className="stat-count">{likesCount}</div>
              </div>
              <div className="stat-badge comment-badge">
                <MessageCircle className="stat-icon" size={17} />
                <div className="stat-count">{commentsCount}</div>
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
            disabled={noDirectDownloadWebsites.has(websiteName.toLowerCase())}
          >
            <Eye size={16} />
            Details
          </button>

          <button
            className="view-3d-btn"
            onClick={handleView3D}
            disabled={isLoading3D || no3DViewerWebsites.has(websiteName.toLowerCase())}
          >
            <Box size={16} />
            {noDirectDownloadWebsites.has(websiteName.toLowerCase()) ? '3D view' : isLoading3D ? 'Loading...' : 'View in slicer'}
          </button>
        </div>
      </div>

      {showDetails && (
        <ModelDetailsOverlay
          files={modelDetails.files || kiriMotoFiles}
          modelName={modelName}
          isLoading={isLoadingDetails}
          onClose={() => setShowDetails(false)}
          license={modelDetails.license}
          description={modelDetails.description}
        />
      )}

      {show3DViewer && !noDirectDownloadWebsites.has(websiteName.toLowerCase()) && (
        <Kiri3DOverlay
          files={kiriMotoFiles}
          modelName={modelName}
          onClose={() => setShow3DViewer(false)}
        />
      )}

      {show3DViewer && embeddedViewerUrl && noDirectDownloadWebsites.has(websiteName.toLowerCase()) && (
        <EmbededViewer
          url={embeddedViewerUrl}
          modelName={modelName}
          onClose={() => setShow3DViewer(false)}
        />
      )}
    </>
  );
}

export default Modelpreview;