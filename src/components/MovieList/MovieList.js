import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Api from '../../services/Api';

function MovieList() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function fetchMovieList() {
      try {
        const { results } = await Api.fetchMovies();

        setMovies(
          results.map(movie => {
            return {
              ...movie,
              title: movie.title ? movie.title : movie.name,
            };
          }),
        );
      } catch (err) {
        console.log(err);
      }
    }

    fetchMovieList();
  }, []);

  return (
    <>
      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieList;
