import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

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
              label: 'Back to previous page',
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

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
