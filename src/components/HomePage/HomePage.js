import { useState, useEffect } from 'react';
import { Status } from '../../constants/reqStatus';
import * as Api from '../../services/Api';
import MovieList from '../MovieList';

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovieList() {
      setStatus(Status.PENDING);
      try {
        const { results } = await Api.fetchMovies();

        if (!results.length) {
          return alert('There are no movies for now. Please try again later');
        }

        setMovies(results);
        setStatus(Status.RESOLVED);
      } catch (err) {
        console.log(err);
        setStatus(Status.REJECTED);
        setError(err.message);
      }
    }

    fetchMovieList();
  }, []);

  if (status === Status.IDLE || Status.RESOLVED) {
    return (
      <main>
        <h1>Trending today</h1>
        {movies && <MovieList movies={movies} />}
      </main>
    );
  }

  if (status === Status.PENDING) {
    return (
      <main>
        <h1>Trending today</h1>
        <h2>Loader...</h2>
      </main>
    );
  }

  if (status === Status.REJECTED) {
    <main>
      <h1>Trending today</h1>
      <h2>{error.message}</h2>
    </main>;
  }
}

export default HomePage;
