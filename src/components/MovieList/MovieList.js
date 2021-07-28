import MovieItem from '../MovieItem';

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
