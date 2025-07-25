import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Modelpreview from './components/Modelpreview'
import HomePage from './components/HomePage';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrapingSlowWebsite,setIsScrapingSlowWebsite] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);
  const resultsPerPage = 20;
  const slowWebsites = [];

  const handleSearch = async (query, selectedWebsites = [], showFreeOnly = false, optimizedSearchWebsites = []) => {
    for (let website of selectedWebsites){
      if (slowWebsites.includes(website)){
        setIsScrapingSlowWebsite(true);
        break;
      }
    }
    setShowHomePage(false);
    setIsLoading(true);
    setCurrentPage(1); 
    
    try {
    
      const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/models/search';
      const params = new URLSearchParams({
        searchTerm: query
      });
      
      if (selectedWebsites.length > 0) {
        params.append('sources', selectedWebsites.join(','));
      }
      
      if (showFreeOnly) {
        params.append('showFreeOnly', 'true');
      }

      if (optimizedSearchWebsites.length > 0) {
        params.append('sourcesToGoogle', optimizedSearchWebsites.join(','));
      }

      const apiUrl = `${baseUrl}?${params.toString()}`;
      console.log('API URL:', apiUrl);
      
      const results = await fetch(apiUrl)
        .then(response => response.json())
        .catch(() => []);

     
      //console.log('Search results:', results);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
      setIsScrapingSlowWebsite(false);
    }
  };

  
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = searchResults.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} setShowHomePage={setShowHomePage}/>
      {showHomePage && (<HomePage/>)}
      {!showHomePage && (
      <div className="search-results">
        {isLoading && (
          <div className="loading-container">
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
            {!isScrapingSlowWebsite && <p>Searching for models...</p>}
            {isScrapingSlowWebsite && <p>hold on this might take a minute or two...</p>}
          </div>
        )}
        
        {!isLoading && searchResults.length > 0 && (
          <>
            <div className="results-info">
              <p>Page {currentPage} of {totalPages}</p>
            </div>
            
            <div className="results-container">
              {currentResults.map((result, index) => (
                <Modelpreview
                
                  key={startIndex + index}
                  result={result}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        
        {!isLoading && searchResults.length === 0 && (
          <div className="no-results">No results found. Try searching for something!</div>
        )}
      </div>)}
    </div>
  );
}

export default App
