import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <h3>
      Not found, please go <Link to="/">here</Link>
    </h3>
  );
}
