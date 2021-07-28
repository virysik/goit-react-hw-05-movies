import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Api from '../../services/Api';
import SearchForm from '../SearchForm';
import MovieList from '../MovieList';

function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const requestedQuery =
    new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (!requestedQuery) {
      return;
    }
    async function getRequestedMovies() {
      try {
        const { results } = await Api.fetchRequestedMovies(requestedQuery);

        if (!results.length) {
          return;
        }

        setMovies(results);
      } catch (err) {
        console.log(err);
      }
    }

    getRequestedMovies();
  }, [requestedQuery]);

  function onFormSubmit(newQuery) {
    history.push({ ...location, search: `query=${newQuery}` });
  }

  return (
    <main>
      <SearchForm onSubmit={onFormSubmit} />
      {movies && <MovieList movies={movies} />}
    </main>
  );
}

export default MoviesPage;
