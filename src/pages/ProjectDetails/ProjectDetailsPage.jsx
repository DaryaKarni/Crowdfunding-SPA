import { useParams, Link } from 'react-router-dom';

export default function ProjectDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <Link to="/locations">← Back to locations</Link>
      <h2>Project details #{id}</h2>
      <p>Data for ID {id} will be loaded via API.</p>
    </div>
  );
}