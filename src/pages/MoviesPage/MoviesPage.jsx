import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchQueryMovie } from '../../movies-api';
import css from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const queryParam = params.get('query') ?? '';

  useEffect(() => {
    if (!queryParam) {
      return;
    }

    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const data = await fetchQueryMovie(queryParam);
        setMovies(data);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [queryParam]);
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const query = form.search.value.trim();
    if (query === queryParam) return;
    setParams({ query });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className={css.input} type="text" name="search" required />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!isLoading && !error && movies.length === 0 && queryParam && (
        <p>No movies found.</p>
      )}
    </div>
  );
}
