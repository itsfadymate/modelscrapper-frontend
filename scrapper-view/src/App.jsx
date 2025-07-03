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
          imagelink: "https://videos.cults3d.com/dgtQk4mNy5oa-C0lKCXOWmogUQ8=/246x246/filters:no_upscale()/https://fbi.cults3d.com/uploaders/17407681/illustration-file/89d83981-1a5b-4fa9-99bd-c7dc7b4e21f2/20220618_145209.gif",
          modelname: `Random Dragon`,
          websitename: "Cults3D",
          websitelink: "https://cults3d.com/en/3d-model/art/dragon-canvas3digital"
        },
        {
          id: 6,
          imagelink: "https://cdn.thingiverse.com/renders/93/de/40/de/31/6af47985fd58a3938d7615f77249a8d4_preview_card.jpg",
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
          imagelink: "https://cdn.thingiverse.com/renders/b0/f5/a6/01/ab/IMAG4155_preview_card.jpg",
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
