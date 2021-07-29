import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Status } from '../../constants/reqStatus';
import { Ul, P, Wrapper } from './Reviews.styles';
import Spinner from '../Spinner';
import * as Api from '../../services/Api';

function Reviews() {
  const [reviews, setReviews] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    async function getReviewsInfo(movieId) {
      setStatus(Status.PENDING);
      try {
        const { results } = await Api.fetchMovieReviews(movieId);

        if (!results.length) {
          return setReviewText(`We don't have any reviews for this movie.`);
        }

        setReviews(results);
        setStatus(Status.RESOLVED);
      } catch (err) {
        console.log(err);
        setStatus(Status.REJECTED);
        setError(err.message);
      }
    }

    getReviewsInfo(movieId);
  }, [movieId]);

  if (status === Status.IDLE || Status.RESOLVED) {
    return (
      <Wrapper>
        {reviews ? (
          <Ul>
            {reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <P>{review.content}</P>
              </li>
            ))}
          </Ul>
        ) : (
          <p>{reviewText}</p>
        )}
      </Wrapper>
    );
  }

  if (status === Status.PENDING) {
    return <Spinner />;
  }

  if (status === Status.REJECTED) {
    return <h2>{error.message}</h2>;
  }
}

export default Reviews;
