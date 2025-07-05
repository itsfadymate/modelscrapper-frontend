import { useState } from 'react';
import './Navbar.css';
import FilterOverlay from './FilterOverlay';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleApplyFilter = () => {
    
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
          Filter
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
        />
      )}
    </nav>
  );
}

export default Navbar;