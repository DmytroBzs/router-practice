import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { fetchMovieById } from '../../movies-api';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieID } = useParams();
  const location = useLocation();
  const backLinkUrlRef = useRef(location.state?.from ?? '/movie');

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await fetchMovieById(movieID);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error.message);
      }
    }
    fetchDetails();
  }, [movieID]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className={css.container}>
      <Link to={backLinkUrlRef.current}>Go back</Link>
      <img
        width={400}
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w400/${movie.backdrop_path}`
            : 'https://via.placeholder.com/400x600?text=No+Image+Available'
        }
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <p>Release Year: {movie.release_date.slice(0, 4)}</p>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
      <Link to="credits">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
