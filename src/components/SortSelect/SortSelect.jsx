import './SortSelect.css';
import { useState, useRef, useEffect } from 'react';

const ArrowUpIcon = ({ isBold }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={isBold ? "3.2" : "2"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

const ArrowDownIcon = ({ isBold }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={isBold ? "3.2" : "2"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

const SORT_OPTIONS = [
  { value: 'all', label: 'All', icon: null },
  { value: 'price_asc', label: 'Price', icon: 'up' },
  { value: 'price_desc', label: 'Price', icon: 'down' },
];

export default function SortSelect({
  value,
  onChange,
  label = 'Sort by',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === value) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };
  return (
    <div className="custom-sort" ref={dropdownRef}>
      <span className="custom-sort__label">{label}</span>

      <button
        type="button"
        className={`custom-sort__button ${isOpen ? 'custom-sort__button--open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="custom-sort__current-text">{currentOption.label}</span>
        
        {currentOption.icon === 'up' && <ArrowUpIcon isBold={true} />}
        {currentOption.icon === 'down' && <ArrowDownIcon isBold={true} />}

        <svg
          className={`custom-sort__chevron ${isOpen ? 'custom-sort__chevron--rotated' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <ul className="custom-sort__dropdown">
          {SORT_OPTIONS.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                className={`custom-sort__item ${isSelected ? 'custom-sort__item--selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                <span>{opt.label}</span>
                {opt.icon === 'up' && <ArrowUpIcon isBold={isSelected} />}
                {opt.icon === 'down' && <ArrowDownIcon isBold={isSelected} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}