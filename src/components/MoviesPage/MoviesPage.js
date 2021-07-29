import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Status } from '../../constants/reqStatus';
import * as Api from '../../services/Api';
import SearchForm from '../SearchForm';
import MovieList from '../MovieList';

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
          alert(
            `There are no movies about ${requestedQuery}. Please try another query.`,
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
      <main>
        <SearchForm onSubmit={onFormSubmit} />
        {movies && <MovieList movies={movies} />}
      </main>
    );
  }

  if (status === Status.PENDING) {
    <main>
      <SearchForm onSubmit={onFormSubmit} />
      <h2>Loading...</h2>
    </main>;
  }

  if (status === Status.REJECTED) {
    <main>
      <SearchForm onSubmit={onFormSubmit} />
      <h2>{error.message}</h2>
    </main>;
  }
}

export default MoviesPage;
