import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Api from '../../services/Api';

function Reviews() {
  const [reviews, setReviews] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    async function getReviewsInfo(movieId) {
      try {
        const { results } = await Api.fetchMovieReviews(movieId);

        if (!results.length) {
          return setReviewText(`We don't have any reviews for this movie.`);
        }

        setReviews(results);
      } catch (err) {
        console.log(err);
      }
    }

    getReviewsInfo(movieId);
  }, [movieId]);

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {reviewText && <p>{reviewText}</p>}
    </>
  );
}

export default Reviews;
