import { useParams } from 'react-router-dom';
import { getCast } from '../../movies-api';
import css from './MovieCast.module.css';
import { useEffect, useState } from 'react';

export default function MovieCast() {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieID } = useParams();

  useEffect(() => {
    async function fetchCast() {
      try {
        setIsLoading(true);
        const cast = await getCast(movieID);
        setActors(cast);
      } catch (error) {
        setError('Failed to load cast information.');
        console.error('Error fetching cast:', error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCast();
  }, [movieID]);
  console.log(actors);

  if (isLoading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className={css.container}>
      {!isLoading && (
        <ul className={css.list}>
          {actors.map(actor => (
            <li key={actor.id}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                  width={100}
                />
              )}
              <p>{actor.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
