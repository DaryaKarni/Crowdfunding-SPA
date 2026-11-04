import { Link } from 'react-router-dom';
import './HomePage.css';
import { useGetProjectsQuery } from '../../api/dummyJsonApi';

export default function HomePage(){
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

  if (isLoading) {
    return <div style={{ padding: '20px' }}> Uploading projects from the API...</div>;
  }

  if (isError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Ошибка при получении данных: {JSON.stringify(error)}
      </div>
    );
  }
  return (
    <div className='home'>
      <h1>Rent your own field, invest in farming,
        and grow your own vegetables
        </h1>
      <Link to="/locations">
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Explore Locations
        </button>
      </Link>
        <ul>
        {projects?.map((plot) => (
          <li key={plot.id} style={{ marginBottom: '10px' }}>
            <strong>{plot.title}</strong> — {plot.city}, {plot.country} ({plot.size}) — €{plot.price}
          </li>
        ))}
      </ul>
    </div>
  )
}