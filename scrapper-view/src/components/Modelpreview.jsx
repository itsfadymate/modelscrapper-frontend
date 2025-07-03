import './Modelpreview.css';

function Modelpreview({imagelink,modelname,websitename,websitelink}){
  return (
    <div className="model-preview">
      <a href={websitelink} className="model-link">
        <img src={imagelink} alt={modelname} loading="lazy" className="model-image" />
        <h2 className="model-name">{modelname}</h2>
        {websitename}
      </a>
    </div>
  );
};

export default Modelpreview;