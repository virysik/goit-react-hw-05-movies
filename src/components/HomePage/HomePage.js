import { useState, useEffect } from 'react';
import * as Api from '../../services/Api';
import MovieList from '../MovieList';

function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function fetchMovieList() {
      try {
        const { results } = await Api.fetchMovies();

        if (!results.length) {
          return alert('There is no movies for today');
        }
        setMovies(results);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMovieList();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      {movies && <MovieList movies={movies} />}
    </main>
  );
}

export default HomePage;
