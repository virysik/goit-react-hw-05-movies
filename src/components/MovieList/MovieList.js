import MovieItem from '../MovieItem';
import PropTypes from 'prop-types';

function MovieList({ movies }) {
  return (
    <>
      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <MovieItem key={id} id={id} title={title} />
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieList;

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
