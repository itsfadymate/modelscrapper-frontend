import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Modelpreview from './components/Modelpreview'

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    setIsLoading(true);
    
    try {
      const results = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/models/search?searchTerm=' + encodeURIComponent(query))
        .then(response => response.json())
        .catch(() => []);

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      
      <div className="search-results">
        {isLoading && (
          <div className="loading-container">
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
            <p>Searching for models...</p>
          </div>
        )}
        
        {!isLoading && searchResults.length > 0 && (
          <div className="results-container">
            {searchResults.map((result, index) => (
              <Modelpreview
                key={index}
                imageLink={result.imageLink}
                modelName={result.modelName}
                websiteName={result.websiteName}
                websiteLink={result.websiteLink}
              />
            ))}
          </div>
        )}
        
        {!isLoading && searchResults.length === 0 && (
          <div className="no-results">No results found. Try searching for something!</div>
        )}
      </div>
    </div>
  );
}

export default App
