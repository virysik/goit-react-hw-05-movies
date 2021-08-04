import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { Status } from '../../constants/reqStatus';
import {
  Main,
  Btn,
  Section,
  AboutWrapper,
  Desc,
} from './MovieDetailsPage.styles';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import AdditionalInfo from '../../components/AdditionalInfo';
import Spinner from '../../components/Spinner';
import * as Api from '../../services/Api';

const Cast = lazy(() =>
  import('../../components/Cast/Cast.js' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import(
    '../../components/Reviews/Reviews.js' /* webpackChunkName: "reviews" */
  ),
);

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const { movieId } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const routerState = useRef(location?.state?.from);

  useEffect(() => {
    async function getMovieInfo() {
      setStatus(Status.PENDING);
      try {
        const data = await Api.fetchOneMovieInfo(movieId);
        setMovie(data);
        setStatus(Status.RESOLVED);
      } catch (err) {
        console.log(err);
        setStatus(Status.REJECTED);
        setError(err.message);
      }
    }

    getMovieInfo();
  }, [movieId]);

  function onGoBack() {
    history.push(routerState.current?.location ?? '/');
  }

  if (status === Status.IDLE || Status.RESOLVED) {
    return (
      <Main>
        <Btn type="Btn" onClick={onGoBack}>
          <AiOutlineDoubleLeft />
          Go back
        </Btn>
        {movie && (
          <>
            <Section>
              <div>
                <img src={movie.img} alt="desc" width="300" />
              </div>
              <AboutWrapper>
                <h2>
                  {movie.title} {movie.year}
                </h2>
                <p>User Score: {movie.score}</p>
                <h3>Overview</h3>
                <Desc>{movie.overview}</Desc>
                <h4>Genres</h4>
                <p>{movie.genres}</p>
              </AboutWrapper>
            </Section>
            <AdditionalInfo />
          </>
        )}

        <Suspense fallback={<Spinner />}>
          <Route path={`${path}/cast`}>
            <Cast />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews />
          </Route>
        </Suspense>
      </Main>
    );
  }

  if (status === Status.PENDING) {
    return <Spinner />;
  }

  if (status === Status.REJECTED) {
    return <h2>{error.message}</h2>;
  }
}

export default MovieDetailsPage;
