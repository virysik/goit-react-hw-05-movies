import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import AdditionalInfo from '../AdditionalInfo';
import * as Api from '../../services/Api';

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const data = await Api.fetchOneMovieInfo(movieId);
        setMovie(data);
      } catch (err) {
        console.log(err);
      }
    }

    getMovieInfo();
  }, [movieId]);

  function onGoBack() {
    history.push(location?.state?.from?.location ?? '/');
  }

  return (
    <>
      <button type="button" onClick={onGoBack}>
        ⬅️Go back
      </button>
      {movie && (
        <>
          <main>
            <section>
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
            </section>
            <AdditionalInfo />
          </main>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
