import { useState } from 'react';
import './FilterOverlay.css';

function FilterOverlay({ onClose, onApply,onSearch,searchQuery, initialSelectedWebsites = [], initialShowFreeOnly = false }) {
  const [selectedWebsites, setSelectedWebsites] = useState(initialSelectedWebsites);
  const [showFreeOnly, setShowFreeOnly] = useState(initialShowFreeOnly);

  const [optimizedSearchWebsites, setoptimizedSearchWebsites] = useState([]);

  const availableWebsites = [
    { id: 'thingiverse', },
    {id: 'printables' },
    { id: 'sketchfab'},
    { id: 'myminifactory' },
    { id: 'cults3d'},
    { id: 'thangs' },
    { id: 'grabcad'}
  ];

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWebsiteToggle = (websiteId) => {
    setSelectedWebsites(prev => 
      prev.includes(websiteId) ? prev.filter(id => id !== websiteId) : [...prev, websiteId]
    );
  };

  const handleSelectAll = () => {
    if (selectedWebsites.length === availableWebsites.length) {
      setSelectedWebsites([]);
    } else {
      setSelectedWebsites(availableWebsites.map(site => site.id));
    }
  };

  const handleOptimizedToggle = (websiteId) => {
    setoptimizedSearchWebsites(
      prev => prev.includes(websiteId) ? prev.filter(id => id !== websiteId) : [...prev, websiteId]
    );
  };

  const handleApplyFilter = () => {
    onApply(selectedWebsites, showFreeOnly, optimizedSearchWebsites);
  };

  const handleApplyAndSearch = () => {
    handleApplyFilter();
    onSearch(searchQuery, selectedWebsites, showFreeOnly, optimizedSearchWebsites);
  };

  return (
    <div className="filter-overlay-backdrop" onClick={handleBackDropClick}>
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
              <div key={website.id} className="website-item improved-website-item">
                <label className="website-label">
                  <input
                    type="checkbox"
                    checked={selectedWebsites.includes(website.id)}
                    onChange={() => handleWebsiteToggle(website.id)}
                    className="website-checkbox"
                  />
                  <span className="website-name">{website.id}</span>
                </label>
                <div className="optimized-container">
                  <span className="optimized-label">Optimized search</span>
                  <label className="optimized-switch small-switch">
                    <input
                      type="checkbox"
                      checked={optimizedSearchWebsites.includes(website.id)}
                      onChange={() => handleOptimizedToggle(website.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-actions">
          <button onClick={handleApplyAndSearch} className="apply-btn">
            Apply and search
          </button>
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