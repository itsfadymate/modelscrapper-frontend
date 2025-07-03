import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
          onClick={handleSearch}
          className="search-button"
        >
          Search
        </button>
      </div>
      
    </nav>
  );
}

export default Navbar;