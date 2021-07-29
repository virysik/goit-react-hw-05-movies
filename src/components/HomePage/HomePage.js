import { useState, useEffect } from 'react';
import { Status } from '../../constants/reqStatus';
import toast, { Toaster } from 'react-hot-toast';
import { GiLaserWarning } from 'react-icons/gi';
import Spinner from '../Spinner';
import * as Api from '../../services/Api';
import MovieList from '../MovieList';

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');

  useEffect(() => {
    setStatus(Status.PENDING);
    async function fetchMovieList() {
      try {
        const { results } = await Api.fetchMovies();

        if (!results.length) {
          return toast('There are no movies for now. Please try again later', {
            icon: <GiLaserWarning />,
          });
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
        <Toaster />
      </main>
    );
  }

  if (status === Status.PENDING) {
    return (
      <main>
        <h1>Trending today</h1>
        <Spinner />
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
