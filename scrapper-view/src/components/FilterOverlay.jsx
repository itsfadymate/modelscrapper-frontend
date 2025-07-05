import './FilterOverlay.css';

function FilterOverlay({ onClose, onApply }) {
  

  return (
    <div className="filter-overlay-backdrop">
      <div className="filter-overlay">
        <h2>Filter Parameters</h2>
        {}
        <div className="filter-actions">
          <button onClick={onApply} className="apply-btn">Apply Filter</button>
          <button onClick={onClose} className="close-btn">Close</button>
        </div>
      </div>
    </div>
  );
}

export default FilterOverlay;