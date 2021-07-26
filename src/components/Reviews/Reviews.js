import { useState, useEffect } from 'react';
import * as Api from '../../services/Api';

function Reviews({ id }) {
  const [reviews, setReviews] = useState(null);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    async function getReviewsInfo(id) {
      try {
        const { results } = await Api.fetchMovieReviews(id);
        console.log(results);
        if (!results.length) {
          return setReviewText(`We don't have any reviews for this movie.`);
        }

        setReviews(results);
      } catch (err) {
        console.log(err);
      }
    }

    getReviewsInfo(id);
  }, [id]);

  return (
    <>
      <ul>
        {reviews &&
          reviews.map(review => {
            return (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
      </ul>

      {reviewText && <p>{reviewText}</p>}
    </>
  );
}

export default Reviews;
