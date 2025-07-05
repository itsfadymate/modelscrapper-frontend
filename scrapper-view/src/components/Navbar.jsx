import { useState } from 'react';
import './Navbar.css';
import FilterOverlay from './FilterOverlay';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedWebsites, setSelectedWebsites] = useState([
    'thingiverse', 
    'MakerWorld', 
    'myminifactory', 
    'cults3d', 
  ]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    console.log('Selected websites:', selectedWebsites);
    console.log('Show free only:', showFreeOnly);
    
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim(), selectedWebsites, showFreeOnly);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleApplyFilter = (websites, freeOnly) => {
    setSelectedWebsites(websites);
    setShowFreeOnly(freeOnly);
    setShowFilter(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo2.png" alt="Logo" />
      </div>
      
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="filter-button"
        >
          Filter {(selectedWebsites.length > 0 || showFreeOnly) && `(${selectedWebsites.length} websites ${showFreeOnly ? ', Free Only' : ''})`}
        </button>

        <button 
          onClick={handleSearch}
          className="search-button"
        >
          Search
        </button>
      </div>
      {showFilter && (
        <FilterOverlay
          onClose={() => setShowFilter(false)}
          onApply={handleApplyFilter}
          initialSelectedWebsites={selectedWebsites}
          initialShowFreeOnly={showFreeOnly}
        />
      )}
    </nav>
  );
}

export default Navbar;