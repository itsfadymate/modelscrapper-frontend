import { useState } from 'react';
import './FilterOverlay.css';

function FilterOverlay({ onClose, onApply, initialSelectedWebsites = [], initialShowFreeOnly = false }) {
  const [selectedWebsites, setSelectedWebsites] = useState(initialSelectedWebsites);
  const [showFreeOnly, setShowFreeOnly] = useState(initialShowFreeOnly);


  const availableWebsites = [
    { id: 'thingiverse', },
    { id: 'thangs' },
    { id: 'myminifactory' },
    { id: 'cults3d'},
    { id: 'grabcad'},
    { id: 'sketchfab'}
  ];

  const handleWebsiteToggle = (websiteId) => {
    setSelectedWebsites(prev => 
      prev.includes(websiteId) 
        ? prev.filter(id => id !== websiteId)
        : [...prev, websiteId]
    );
  };

  const handleSelectAll = () => {
    if (selectedWebsites.length === availableWebsites.length) {
      setSelectedWebsites([]);
    } else {
      setSelectedWebsites(availableWebsites.map(site => site.id));
    }
  };

  const handleApplyFilter = () => {
    onApply(selectedWebsites, showFreeOnly);
  };

  return (
    <div className="filter-overlay-backdrop">
      <div className="filter-overlay">
        <h2>Filter Parameters</h2>
        
        <div className="filter-section">
            <label className="filter-checkbox">
                <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={() => setShowFreeOnly(!showFreeOnly)}
                />
                Show Free Only
            </label>
          <h3>Select Websites to Scrape</h3>
          
          <div className="select-all-container">
            <button 
              onClick={handleSelectAll}
              className="select-all-btn"
            >
              {selectedWebsites.length === availableWebsites.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          
          <div className="website-list">
            {availableWebsites.map(website => (
              <div key={website.id} className="website-item">
                <label className="website-label">
                  <input
                    type="checkbox"
                    checked={selectedWebsites.includes(website.id)}
                    onChange={() => handleWebsiteToggle(website.id)}
                    className="website-checkbox"
                  />
                  <span className="website-name">{website.id}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-actions">
          <button onClick={handleApplyFilter} className="apply-btn">
            Apply Filter
          </button>
          <button onClick={onClose} className="close-btn">Close</button>
        </div>
      </div>
    </div>
  );
}

export default FilterOverlay;