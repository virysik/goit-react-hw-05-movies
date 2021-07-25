import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Api from '../../services/Api';
import Cast from '../Cast';
import Review from '../Reviews';

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const data = await Api.fetchOneMovieInfo(movieId);

        setMovie({
          ...data,
          img: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          year: data.release_date
            ? '(' + data.release_date.split('-').slice(0, 1) + ')'
            : '',
          score: data.vote_average ? Math.round(data.vote_average) + '%' : '',
          genres: [...data.genres].map(genre => genre.name + ' '),
        });
      } catch (err) {
        console.log(err);
        setError('The resource you requested could not be found.');
      }
    }

    getMovieInfo();
  }, [movieId]);

  return (
    <>
      <button type="button">⬅️Go back</button>
      {movie ? (
        <>
          <div>
            <img src={movie.img} alt="desc" />
          </div>
          <div>
            <h2>
              {movie.title} {movie.year}
            </h2>
            <p>User Score: {movie.score}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h4>Genres</h4>
            <p>{movie.genres}</p>
          </div>
          <p>Additional Information</p>
          <Cast />
          <Review />
        </>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
}

export default MovieDetailsPage;
