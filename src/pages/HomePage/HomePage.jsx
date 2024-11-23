import { fetchTrendMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getTrendMovies() {
      try {
        setIsLoading(true);
        const data = await fetchTrendMovies();
        setMovies(data);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getTrendMovies();
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <p>Please try later</p>}
      <MovieList movies={movies} />
    </div>
  );
}
