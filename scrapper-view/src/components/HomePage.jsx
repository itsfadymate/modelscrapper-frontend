import { useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the 3D Model Scrapper App?",
      answer: "The 3D Model Scrapper App is a comprehensive tool that searches across multiple 3D model websites to find models related to your search terms. It aggregates results from popular platforms like Thingiverse, Thangs, MyMiniFactory, and Cults3D in one convenient location."
    },
    {
      question: "Which websites does the app scrape?",
      answer: "Currently, the app scrapes models from Thingiverse, Thangs, MyMiniFactory,Cults3D,GrabCad and Sketchfab. You can filter your search to include or exclude specific websites based on your preferences."
    },
    {
      question: "Can I download models directly through the app?",
      answer: "Currently direct downloads are supported only for Thingiverse"
    },
    {
      question: "How do I use the 3D viewer?",
      answer: "Click the '3D View' button on any model to open kirimoto's integrated viewer. If a direct download is available for the model, the viewer loads the files automatically, otherwise you will have to manually download the files and import them into the viewer."
    }
  ];

  return (
    <div className="homepage">
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
                <li>Browse results and click on models to view details</li>
                <li>Click on a model to visit it's product page</li>
                <li>Download files or use the 3D viewer to explore models</li>
                
              </ol>
            </div>
          </div>
        </div>
      </div>

    
      <div className="faq-section">
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
                    <p>{faq.answer}</p>
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