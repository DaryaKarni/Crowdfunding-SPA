import { Link } from 'react-router-dom';

export default function ShopPage() {
  return (
    <div>
      <h1>Shop Page (Catalog Grid)</h1>
      <p>Here will be a directory of grid cards and filters.</p>
      <Link to="/projects/2">Open test project №2</Link>
    </div>
  );
}