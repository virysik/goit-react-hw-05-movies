import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Api from '../../services/Api';
import SearchForm from '../SearchForm';

function MoviesPage() {
  const [requestedQuery, setRequestedQuery] = useState('');
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (!requestedQuery) {
      return;
    }
    async function getRequestedMovies() {
      try {
        const { results } = await Api.fetchRequestedMovies(requestedQuery);

        if (!results.length) {
          return alert('Please enter a new query');
        }

        setMovies(results);
      } catch (err) {
        console.log(err);
      }
    }

    getRequestedMovies();
  }, [requestedQuery]);

  function onFormSubmit(newQuery) {
    setRequestedQuery(newQuery);
  }

  return (
    <main>
      <SearchForm onSubmit={onFormSubmit} />
      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MoviesPage;
