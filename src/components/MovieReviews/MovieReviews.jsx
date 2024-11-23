import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../movies-api';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { movieID } = useParams();

  useState(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const data = await getReviews(movieID);
        setReviews(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieID]);
  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      {loading && <p>Loading, please wait...</p>}
      {error && <p>Somethink went wrong, please reload page</p>}
      {!loading && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
