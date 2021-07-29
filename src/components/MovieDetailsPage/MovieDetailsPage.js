import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import AdditionalInfo from '../AdditionalInfo';
import * as Api from '../../services/Api';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "reviews" */),
);

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const routerState = useRef(location?.state?.from);

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
    history.push(routerState.current?.location ?? '/');
  }

  return (
    <main>
      <button type="button" onClick={onGoBack}>
        ⬅️Go back
      </button>
      {movie && (
        <>
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
        </>
      )}

      <Suspense fallback={<p>Loading...</p>}>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </main>
  );
}

export default MovieDetailsPage;
