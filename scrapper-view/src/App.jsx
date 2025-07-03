import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Modelpreview from './components/Modelpreview'

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    setIsLoading(true);
    // Simulate API call for now
    try {
      const mockResults = [
        {
          id: 1,
          imagelink: "https://cdn.thingiverse.com/renders/2f/93/ac/61/61/photo_preview_card.jpg",
          modelname: `Elliptical Gear with no center pivot`,
          websitename: "Thingiverse",
          websitelink: "https://www.thingiverse.com/thing:1082508"
        },
        {
          id: 2,
          imagelink: "https://cdn.thingiverse.com/renders/2f/93/ac/61/61/photo_preview_card.jpg",
          modelname: `Elliptical Gear with no center pivot`,
          websitename: "Thingiverse",
          websitelink: "https://www.thingiverse.com/thing:1082508"
        },
        {
          id: 3,
          imagelink: "https://cdn.thingiverse.com/renders/2f/93/ac/61/61/photo_preview_card.jpg",
          modelname: `Elliptical Gear with no center pivot`,
          websitename: "Thingiverse",
          websitelink: "https://www.thingiverse.com/thing:1082508"
        },
        {
          id: 4,
          imagelink: "https://cdn.thingiverse.com/renders/2f/93/ac/61/61/photo_preview_card.jpg",
          modelname: `Elliptical Gear Set with connecting links.`,
          websitename: "Thingiverse",
          websitelink: "https://www.thingiverse.com//thing:37659"
        },
        {
          id: 5,
          imagelink: "https://cdn.thingiverse.com/renders/2f/93/ac/61/61/photo_preview_card.jpg",
          modelname: `Elliptical Gear with no center pivot`,
          websitename: "Thingiverse",
          websitelink: "https://www.thingiverse.com/thing:1082508"
        },
        {
          id: 6,
          imagelink: "https://cdn.thingiverse.com/renders/2f/93/ac/61/61/photo_preview_card.jpg",
          modelname: `Elliptical Gear Set with connecting links.`,
          websitename: "Thingiverse",
          websitelink: "https://www.thingiverse.com//thing:37659"
        },{
          id: 7,
          imagelink: "https://cdn.thingiverse.com/renders/2f/93/ac/61/61/photo_preview_card.jpg",
          modelname: `Elliptical Gear with no center pivot`,
          websitename: "Thingiverse",
          websitelink: "https://www.thingiverse.com/thing:1082508"
        },
        {
          id: 8,
          imagelink: "https://cdn.thingiverse.com/renders/2f/93/ac/61/61/photo_preview_card.jpg",
          modelname: `Elliptical Gear Set with connecting links.`,
          websitename: "Thingiverse",
          websitelink: "https://www.thingiverse.com//thing:37659"
        }
      ];
      
      setSearchResults(mockResults);
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
        {isLoading && <div className="loading">Loading...</div>}
        
        {!isLoading && searchResults.length > 0 && (
          <div className="results-container">
            {searchResults.map((result) => (
              <Modelpreview
                key={result.id}
                imagelink={result.imagelink}
                modelname={result.modelname}
                websitename={result.websitename}
                websitelink={result.websitelink}
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
