import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Api from '../../services/Api';

function MovieList() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();

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
    <>
      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to HomePage',
                    },
                  },
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
