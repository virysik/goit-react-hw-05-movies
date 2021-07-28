import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function MovieItem({ id, title }) {
  const location = useLocation();

  return (
    <li>
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
  );
}

export default MovieItem;
