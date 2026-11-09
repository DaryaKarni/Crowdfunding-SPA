import { useState, useMemo } from 'react';
import { useGetProjectsQuery } from '../../api/dummyJsonApi';
import PlotCard from '../../components/PlotCard/PlotCard';
import './ShopPage.css';
import FilterModal from '../../components/FilterModal/FilterModal';
import { useNavigate } from 'react-router-dom';
import SortSelect from '../../components/SortSelect/SortSelect';
import FilterButton from '../../components/FilterButton/FilterButton';

export default function ShopPage() {
  const navigate = useNavigate();
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  const [sortOption, setSortOption] = useState('all'); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const isFilterActive = selectedCategory !== 'All' || selectedCountry !== 'All';

  const categories = useMemo(() => {
    const list = new Set(projects.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(list)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== 'All') {
      result = result.filter(
        (plot) => plot.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedCountry !== 'All') {
      result = result.filter(
        (p) => p.country?.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    if (sortOption === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [projects, selectedCategory, selectedCountry, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedCountry('All');
    setSortOption('all');
  };

  return (
    <div className="shop-screen">
      <div className="shop-screen__container">
        <div className="shop-screen__top-bar">
          <div className="shop-screen__tab-group">
            <span className="shop-screen__tab-title">Invest</span>
          </div>

          <div className="shop-screen__controls">
            <SortSelect
              id="shop-sort-select"
              value={sortOption}
              onChange={setSortOption}
            />
            <FilterButton
              isActive = {isFilterActive}
              onClick={() => setIsFilterModalOpen(true)}
            />

            <button
              type="button"
              className="shop-map-btn"
              onClick={() => navigate('/locations')}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Map</span>
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="shop-state-message">
            <div className="shop-spinner" />
            <p>Loading investment parcels...</p>
          </div>
        )}

        {isError && (
          <div className="shop-state-message shop-state-message--error">
            Failed to load projects. Please try again.
          </div>
        )}

        {!isLoading && !isError && filteredProjects.length === 0 && (
          <div className="shop-empty">
            <p className="shop-empty__text">No plots match your filter criteria</p>
            <button
              type="button"
              className="shop-empty__btn"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}

        {!isLoading && !isError && filteredProjects.length > 0 && (
          <div className="shop-cards-grid">
            {filteredProjects.map((plot) => (
              <PlotCard key={plot.id} plot={plot} />
            ))}
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
  );
}