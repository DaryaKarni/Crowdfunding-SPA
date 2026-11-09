import { useNavigate } from "react-router-dom";
import './LocationCard.css';

export default function LocationCard({plot, isSelected, onSelect, ref}) {
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className={`location-card ${isSelected ? 'location-card--selected' : ''}`}
      onClick={() => onSelect(plot.id)}
    >
      <div className='location-card__image-container'>
        <img src={plot.image} alt={plot.title} className='location-card__image' />
      </div>
      <div className='location-card__footer'>
        <div className='location-card__info'>
          <h4 className='location-card__title'>{plot.title}</h4>
          <p className='location-card__country'>{plot.country}</p>
        </div>
        <button
          type='button'
          className='location-card__shop-btn'
          onClick={(e) => {
            e.stopPropagation();
            navigate('/shop');
          }}
          >
          Shop
        </button>
      </div>
    </div>
  )
}

