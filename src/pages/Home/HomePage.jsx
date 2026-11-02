import { Link } from 'react-router-dom';

export default function HomePage(){
  return (
    <div>
      <h1>Home Page </h1>
      <p>Here will be Hero-section Featured Projects.</p>
      <Link to="/locations">
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Explore Locations
        </button>
      </Link>
    </div>
  )
}