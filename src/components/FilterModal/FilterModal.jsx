import './FilterModal.css';

export default function FilterModal({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  selectedCountry,
  onSelectCountry,
  onReset,
}) {
  if (!isOpen) return null;

  return (
    <div className="filter-modal-backdrop" onClick={onClose}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal__header">
          <h3>Filter Projects</h3>
          <button type="button" className="filter-modal__close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="filter-modal__body">
          <div className="filter-group">
            <label className="filter-group__title">Category</label>
            <div className="filter-group__options">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-option-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => onSelectCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-group__title">Country</label>
            <div className="filter-group__options">
              {['All', 'UK', 'Germany'].map((country) => (
                <button
                  key={country}
                  type="button"
                  className={`filter-option-btn ${selectedCountry === country ? 'active' : ''}`}
                  onClick={() => onSelectCountry(country)}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-modal__footer">
          <button type="button" className="filter-modal__reset-btn" onClick={onReset}>
            Reset All
          </button>
          <button type="button" className="filter-modal__apply-btn" onClick={onClose}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}