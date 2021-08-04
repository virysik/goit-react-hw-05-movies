import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Status } from '../../constants/reqStatus';
import { GiLaserWarning } from 'react-icons/gi';
import { Main } from './MoviesPage.styles';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import * as Api from '../../services/Api';
import SearchForm from '../../components/SearchForm';
import MovieList from '../../components/MovieList';

function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const history = useHistory();
  const location = useLocation();
  const requestedQuery =
    new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (!requestedQuery) {
      return;
    }
    async function getRequestedMovies() {
      setStatus(Status.PENDING);
      try {
        const { results } = await Api.fetchRequestedMovies(requestedQuery);

        if (!results.length) {
          toast(
            `There are no movies about ${requestedQuery}. Please try another query.`,
            { icon: <GiLaserWarning size="40px" /> },
          );
          return setMovies(null);
        }

        setMovies(results);
        setStatus(Status.RESOLVED);
      } catch (err) {
        console.log(err);
        setStatus(Status.REJECTED);
        setError(err.message);
      }
    }

    getRequestedMovies();
  }, [requestedQuery]);

  function onFormSubmit(newQuery) {
    history.push({ ...location, search: `query=${newQuery}` });
  }

  if (status === Status.IDLE || Status.RESOLVED) {
    return (
      <Main>
        <SearchForm onSubmit={onFormSubmit} />
        {movies && <MovieList movies={movies} />}
        <Toaster />
      </Main>
    );
  }

  if (status === Status.PENDING) {
    <Main>
      <SearchForm onSubmit={onFormSubmit} />
      <Spinner />
    </Main>;
  }

  if (status === Status.REJECTED) {
    <Main>
      <SearchForm onSubmit={onFormSubmit} />
      <h2>{error.message}</h2>
    </Main>;
  }
}

export default MoviesPage;
