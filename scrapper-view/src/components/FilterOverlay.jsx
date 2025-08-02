import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import './FilterOverlay.css';

function FilterOverlay({ onClose, onApply,onSearch,searchQuery, initialSelectedWebsites = [], initialShowFreeOnly = false }) {
  const [selectedWebsites, setSelectedWebsites] = useState(initialSelectedWebsites);
  const [showFreeOnly, setShowFreeOnly] = useState(initialShowFreeOnly);
  const [sortOption, setSortOption] = useState('default');
  const [descriptionSearchTerm, setDescriptionSearchTerm] = useState('');
  const [licenseSearchTerm, setLicenseSearchTerm] = useState('');

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

  const noAdvancedSearchWebsites = ['printables', 'thangs', 'grabcad'];

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


 
  const isAdvancedSearchActive = descriptionSearchTerm.trim() !== '' || licenseSearchTerm.trim() !== '';


  useEffect(() => {
    if (isAdvancedSearchActive) {
      setSelectedWebsites(prev => prev.filter(id => !noAdvancedSearchWebsites.includes(id)));
      setoptimizedSearchWebsites(prev => prev.includes('thingiverse') ? prev : [...prev, 'thingiverse']);
    }
  }, [descriptionSearchTerm, licenseSearchTerm]);

  const handleWebsiteToggle = (websiteId) => {
    if (isAdvancedSearchActive && noAdvancedSearchWebsites.includes(websiteId)) return;
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
    if (isAdvancedSearchActive && websiteId === 'thingiverse') return; 
    setoptimizedSearchWebsites(
      prev => prev.includes(websiteId) ? prev.filter(id => id !== websiteId) : [...prev, websiteId]
    );
  };

  const handleApplyFilter = () => {
    onApply(
      selectedWebsites,
      showFreeOnly,
      optimizedSearchWebsites,
      sortOption,
      descriptionSearchTerm,
      licenseSearchTerm
    );
  };

  const handleApplyAndSearch = () => {
    handleApplyFilter();
    onSearch(
      searchQuery,
      selectedWebsites,
      showFreeOnly,
      optimizedSearchWebsites,
      sortOption,
      descriptionSearchTerm,
      licenseSearchTerm
    );
  };

  const getWebsiteInfo = (name) => {
    const fasterSearch = 'Optimized search speeds up search time but fetches less data about a model.';
    const slowerSearch = 'Optimized search slows down search time but improves results.';
    const noAdvancedSearch=' Cannot search in description or license';
    switch (name) {
      case 'thingiverse': return slowerSearch + ' search in description and license available for optimized search only';
      case 'printables': return fasterSearch + noAdvancedSearch;
      case 'sketchfab': return slowerSearch;
      case 'myminifactory': return slowerSearch;
      case 'cults3d': return slowerSearch;
      case 'thangs': return fasterSearch + noAdvancedSearch;
      case 'grabcad': return fasterSearch + noAdvancedSearch;
      default: return '';
    }
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

          <div className="input-group">
            <label htmlFor="description-search" className="input-label">Description Search</label>
            <input
              id="description-search"
              type="text"
              className="theme-input"
              placeholder="Search in description (supports java regex)"
              value={descriptionSearchTerm}
              onChange={e => setDescriptionSearchTerm(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="license-search" className="input-label">License Search</label>
            <input
              id="license-search"
              type="text"
              className="theme-input"
              placeholder="Search for license (supports java regex)"
              value={licenseSearchTerm}
              onChange={e => setLicenseSearchTerm(e.target.value)}
            />
          </div>

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
            {availableWebsites.map(website => {
              const isNotAdvanced = noAdvancedSearchWebsites.includes(website.id);
              const disableCheckbox = isAdvancedSearchActive && isNotAdvanced;
              const isThingiverse = website.id === 'thingiverse';
              const optimizedChecked = isThingiverse && isAdvancedSearchActive
                ? true
                : optimizedSearchWebsites.includes(website.id);
              const disableOptimized = isThingiverse && isAdvancedSearchActive;
              return (
                <div key={website.id} className="website-item improved-website-item">
                  <label className="website-label">
                    <span>
                      <input
                        type="checkbox"
                        checked={selectedWebsites.includes(website.id)}
                        onChange={() => handleWebsiteToggle(website.id)}
                        className="website-checkbox"
                        disabled={disableCheckbox}
                      />
                      <span className="website-name">{website.id}</span>
                    </span>
                    <span className="website-info-icon">
                      <Info size={16} />
                      <span className="website-tooltip">
                        {getWebsiteInfo(website.id)}
                      </span>
                    </span>
                  </label>
                  <div className="optimized-container">
                    <span className="optimized-label">Optimized search</span>
                    <label className="optimized-switch small-switch">
                      <input
                        type="checkbox"
                        checked={optimizedChecked}
                        onChange={() => handleOptimizedToggle(website.id)}
                        disabled={disableOptimized}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="filter-section">
          <label htmlFor="sort-select">Sort By:</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="likes">Like Count</option>
            <option value="make count">Make Count</option>
            <option value="featured">Featured First</option>
          </select>
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