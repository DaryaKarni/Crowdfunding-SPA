import { Link } from 'react-router-dom';
import './LocationsPage.css';
export default function LocationsPage() {
  return (
    <div className='locations'>
      <h1>Locations - Map + List</h1>
      <p>Here will be a list of cards and an interactive map с Leaflet.</p>
      {/* Link to test dynamic route */}
      <Link to="/projects/1">Open test project №1</Link>
    </div>
  )
}