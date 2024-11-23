import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
  const location = useLocation();
  console.log(location);
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movie/${movie.id}`} state={{ movie, from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
