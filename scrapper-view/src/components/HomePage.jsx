import { useState, useRef } from 'react';
import './HomePage.css';

function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const faqRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToFaq = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqData = [
    {
      question: "What is the 3D Model Scrapper App?",
      answer: "The 3D Model Scrapper App is a comprehensive tool that searches across multiple 3D model websites to find models related to your search terms. It aggregates results from popular platforms like Thingiverse, Printables, Thangs, MyMiniFactory, and Cults3D in one convenient location."
    },
    {
      question: "Which websites does the app scrape?",
      answer: "Currently, the app scrapes models from Thingiverse, Printables, Thangs, MyMiniFactory, Cults3D, GrabCad and Sketchfab. You can filter your search to include or exclude specific websites based on your preferences."
    },
    {
      question: "How does the optimized search work?",
      answer: "The app uses a custom search engine that optimizes queries for each website."
    },
    {
      question: "What do I need to know about optimized search?",
      answer: "It is more likely to fetch relevant results than the normal search. However for the following websites:\n"+
      " - GrabCad\n"+
      " - Printables\n"+
      " - Thangs\n"+
      "It significantly cuts down search time, however it leaves out data about likes, comments, make count and wether the model is featured or not. \n"+
      "For the other websites search time is slower but all data is fetched as traditional search.\n\n"+
      "N.B.: If the optimized search failed this means the API quota for the day has been reached, you can try again tomorrow or use the normal search." 
    },
    {
      question: "Can I download models directly through the app?",
      answer: "Only Free Models. Currently direct downloads are supported for Thingiverse, Printables, Cults3D, and MyMiniFactory."
    },
    {
      question: "How do I use the 3D viewer?",
      answer: "Click the '3D View' button on any model.\n"+
      "For websites for which direct download is implemented, kirimoto slicer is opened and loads the STL files directly if they exist.\n"+
      "For other websites, if a 3D view option is available it is loaded."
    },
    {
      question: "Why are some buttons disabled?",
      answer: "The '3D View' button is disabled for websites that do not support direct downloads or do not have a 3D viewer available. This is to ensure that you only attempt to view models in a compatible format.\n"+
      "The view details button is disabled for websites for which detail fetching is not implemented."
    },
    {
      question: "Can I use the app on mobile devices?",
      answer: "Yes, the 3D Model Scrapper App is designed to be responsive and works on most mobile devices. However, for the best experience, it is recommended to use a tablet or desktop."
    }
  ];

  return (
    <div className="homepage">
      <button className="faq-scroll-btn" onClick={scrollToFaq}>
        FAQ
      </button>

      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Welcome to <span className="app-name">3D Model Scrapper</span>
          </h1>
          
          <p className="welcome-subtitle">
            Your one-stop destination for discovering 3D models across the web
          </p>
          
          <div className="description">
            <p>
              The 3D Model Scrapper App is designed to streamline your search for 3D models 
              by aggregating results from multiple popular websites. Instead of visiting each 
              platform individually. You can now search for models across various sites in one go.
            </p>
            
            <div className="getting-started">
              <h3>Getting Started:</h3>
              <ol>
                <li>Enter your search term in the search bar above</li>
                <li>Use the filter button to customize your search preferences</li>
                <li>Click on a model to visit it's product page</li>
                <li>Download files or use the 3D viewer to explore models</li>
                
              </ol>
            </div>

            <div className="getting-started">
              <h3>Features:</h3>
              <ol>
                <li><strong>Unified Search:</strong> Search for 3D models across the major 3D printing websites at once.</li>
                <li><strong>Filtering:</strong> Filter results by website and free/paid models.</li>
                <li><strong>Sorting:</strong> Sort the results according to likes, make count, and other criteria.</li>
                <li><strong>Search Engine:</strong> Choose the default website's search engine or a custom Google search engine.</li>
                <li><strong>Model Details:</strong> View model information, including images, price, makes, likes, comments, and featured status.</li>
                <li><strong>Direct Download:</strong> Download model files directly (where supported).</li>
                <li><strong>Volume calculation:</strong> Check out the calculated volume of STL files.</li>
                <li><strong>3D Viewer:</strong> Preview models in the browser using an integrated 3D viewer or embedded viewer (where available).</li>
                <li><strong>Responsive Design:</strong> Works on desktop and mobile devices.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-section" ref={faqRef}>
        <div className="faq-content">
          <h2 className="faq-title">FAQ</h2>
          
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${openFaqIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {openFaqIndex === index ? '−' : '+'}
                  </span>
                </button>
                
                {openFaqIndex === index && (
                  <div className="faq-answer">
                    <p>
                      {faq.answer.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;