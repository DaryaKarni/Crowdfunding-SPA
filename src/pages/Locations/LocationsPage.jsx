import { Link } from 'react-router-dom';
import './LocationsPage.css';
import { useGetProjectsQuery } from '../../api/dummyJsonApi'; 
import { useRef, useState, createRef } from 'react';
import FilterModal from'../../components/FilterModal/FilterModal';
import LocationCard from '../Locations/LocationCard'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { defaultMarkerIcon, selectedMarkerIcon } from './mapIcons';
import MapRecenter from './MapRecenter';
import 'leaflet/dist/leaflet.css';
import SortSelect from '../../components/SortSelect/SortSelect';
import FilterButton from '../../components/FilterButton/FilterButton';

export default function LocationsPage() {

  const {data: projects = [], isLoading, isError} = useGetProjectsQuery();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const isFilterActive = selectedCategory !== 'All' || selectedCountry !== 'All';

  const [selectedId, setSelectedId] = useState(null);

  const cardRefs = useRef({});

  const list = new Set(projects.map((p) => p.category).filter(Boolean));
  const categories = ['All', ...Array.from(list)];

  let filteredProjects = [...projects];

  if(searchQuery.trim()){
    const q = searchQuery.toLocaleLowerCase().trim();
    filteredProjects = filteredProjects.filter((p) => 
      p.title?.toLocaleLowerCase().includes(q) ||
      p.country?.toLocaleLowerCase().includes(q) ||
      p.region?.toLocaleLowerCase().includes(q) ||
      p.city?.toLocaleLowerCase().includes(q) 
    );
  }
  if (selectedCategory !== 'All') {
    filteredProjects = filteredProjects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (selectedCountry !== 'All') {
    filteredProjects = filteredProjects.filter(
      (p) => p.country?.toLowerCase() === selectedCountry.toLowerCase()
    );
  }

  if (sortOption === 'price_asc') {
    filteredProjects.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price_desc') {
    filteredProjects.sort((a, b) => b.price - a.price);
  }
 
  const selectedPlot = filteredProjects.find((p) => 
    String(p.id) === String(selectedId) 
  )

  const handleSelectPlot = (id) => {
    setSelectedId(id);

    if(cardRefs.current[id]?.current)   {
      cardRefs.current[id]?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCountry('All');
    setSortOption('all');
    setSelectedId(null);
  };

  return (
    <div className='locations-screen'>
      <div className="locations-screen__container">
        <h1 className="locations-screen__title">Locations</h1>
         <form onSubmit={handleSearchSubmit} className="locations-search-bar">
          <div className="locations-search-bar__icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            className="locations-search-bar__input"
            placeholder="Search by city, country, village places"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="locations-search-bar__btn">
            Search
          </button>
        </form>
        <div className="locations-controls">
          <SortSelect
            id="locations-sort-select"
            value={sortOption}
            onChange={setSortOption} 
          />
          <FilterButton 
            isActive = {isFilterActive}
            onClick={() => setIsFilterModalOpen(true)}
          />
        </div>
        {isLoading && (
          <div className="locations-state-message">
            <div className="locations-spinner" />
            <p>Loading interactive map and plots...</p>
          </div>
        )}

        {isError && (
          <div className="locations-state-message locations-state-message--error">
            Failed to load locations. Please try again.
          </div>
        )}
       {!isLoading && !isError && (
          <div className="locations-workspace">
            <div className="locations-list">
              {filteredProjects.length === 0 ? (
                <div className="locations-empty">
                  <p>No locations match your search or filters.</p>
                  <button
                    type="button"
                    className="locations-empty__btn"
                    onClick={handleResetFilters}
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                 filteredProjects.map((plot) => {
                  if (!cardRefs.current[plot.id]) {
                    cardRefs.current[plot.id] = createRef();
                  }

                  return (
                    <LocationCard
                      key={plot.id}
                      ref={cardRefs.current[plot.id]}
                      plot={plot}
                      isSelected={String(plot.id) === String(selectedId)}
                      onSelect={handleSelectPlot}
                    />
                  );
                })
           )}
      </div>
      <div className="locations-map-container">
              <MapContainer
                center={[51.8, 7.8]} // Центр между Дортмундом, Мюнстером и Билефельдом
                zoom={7}
                scrollWheelZoom={true}
                className="locations-leaflet-map"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Центрирование карты при клике на карточку */}
                <MapRecenter selectedPlot={selectedPlot} />

                {/* Маркеры для каждого проекта */}
                {filteredProjects.map((plot) => (
                  <Marker
                    key={plot.id}
                    position={[plot.lat, plot.lng]}
                    icon={
                      String(plot.id) === String(selectedId)
                        ? selectedMarkerIcon
                        : defaultMarkerIcon
                    }
                    eventHandlers={{
                      click: () => handleSelectPlot(plot.id),
                    }}
                  >
                    <Popup>
                      <div className="map-popup-card">
                        <img
                          src={plot.image}
                          alt={plot.title}
                          className="map-popup-img"
                        />
                        <h4 className="map-popup-title">{plot.title}</h4>
                        <p className="map-popup-meta">
                          {plot.city}, {plot.country} • <strong>€{plot.price}</strong>
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        )}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
        onReset={handleResetFilters}
      />
    </div>
  )
}