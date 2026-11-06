import { Link, useNavigate,  } from 'react-router-dom';
import './HomePage.css';
import { useGetProjectsQuery } from '../../api/dummyJsonApi';

export default function HomePage(){
  // const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  // const featuredProjects = projects.slice(0, 3);
  const navigate = useNavigate();
  const defaultCards = [
    {
      description: 'Rent your own piece of farmland and watch your vegetables grow.', 
      image: '/assets/home_image1.jpg'
    },
    {
      description: 'Enjoy, year after year, the wonders of nature with your rented vegetable farmland (60 sqm / 30 sqm).', 
      image: '/assets/home_image2.jpg',
    },
    {
      description: 'Grow your own piece of land, from planting seeds in the lush soil to harvesting your own vegetables.', 
      image: '/assets/home_image3.jpg',
    },
  ];

  return (
     <div className="home-screen">
      <div className="home-screen__container">
        <header className="home-screen__header">
          <h1 className="home-screen__title">
            Rent your own field, invest in farming,<br />
            and grow your own vegetables
          </h1>

          <button
            type="button"
            className="home-screen__start-btn"
            onClick={() => navigate('/locations')}
          >
            Let's start
          </button>
        </header>
         <section className="home-screen__cards-grid">
            {defaultCards.map((obj, index) => (
              <div
                key={index}
                className="home-card"
              >
                <img
                  src={obj.image}
                  alt={`home intro card image ${index + 1}`}
                  className="home-card__image"
                />

                <div className="home-card__badge">
                  <p className="home-card__text">
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </section>
      </div>
    </div>
  )
}