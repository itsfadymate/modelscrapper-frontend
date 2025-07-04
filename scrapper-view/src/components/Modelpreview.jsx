import './Modelpreview.css';

function Modelpreview({imageLink,modelName,websiteName,websiteLink}){
  return (
    <div className="model-preview">
      <a href={websiteLink} target="_blank" className="model-link">
        <img src={imageLink} alt={modelName} loading="lazy" className="model-image" />
        <h2 className="model-name">{modelName}</h2>
        {websiteName}
      </a>
    </div>
  );
};

export default Modelpreview;