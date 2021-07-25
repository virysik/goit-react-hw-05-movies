import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Api from '../../services/Api';

function MovieList() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function fetchMovieList() {
      try {
        const data = await Api.fetchMovies();
        setMovies(
          [...data.results].map(movie => {
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
          {[...movies].map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieList;
