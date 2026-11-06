import { useNavigate } from 'react-router-dom';
import './PlotCard.css';

  export default function PlotCard({ plot, isSelected = false, onSelect }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
      if (onSelect) {
        onSelect(plot.id);
      } else {
        navigate(`/projects/${plot.id}`);
      }
    };

  const handleInvest  = (e) => {
    e.stopPropagation(); 
    navigate(`/projects/${plot.id}`);
  };

  const handleReserve  = (e) => {
    e.stopPropagation();
    alert(`Plot #${plot.id} reserved!`);
  };

  return (
    <div
      className={`plot-card ${isSelected ? 'plot-card--selected' : ''}`}
      onClick={handleCardClick}
    >
      <div className="plot-card__image-box">
        <img src={plot.image} alt={plot.title} className="plot-card__img" />
      </div>

      <div className="plot-card__body">
        <h3 className="plot-card__title">{plot.title}</h3>
        <p className="plot-card__country">{plot.country}</p>

        <div className="plot-card__size-row">
          <span className="plot-card__size-label">Size:</span>
          <span className="plot-card__size-value">{plot.size}</span>
          <div className="plot-card__cubes">
            {Array.from({ length: plot.sizeBlocks || 2 }).map((_, i) => (
              <span key={i} className="plot-card__cube" />
            ))}
          </div>
        </div>

        <p className="plot-card__price-row">
          <span className="plot-card__price-label">Guide Price:</span>{' '}
          <strong className="plot-card__price-val">€{plot.price},0</strong>
        </p>

        <div className="plot-card__actions">
          <button
            type="button"
            className="plot-card__invest-btn"
            onClick={handleInvest}
          >
            Invest
          </button>
          <button
            type="button"
            className="plot-card__reserve-btn"
            onClick={handleReserve}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}