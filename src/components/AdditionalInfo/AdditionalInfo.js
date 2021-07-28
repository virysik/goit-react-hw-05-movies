import { useRouteMatch, Link } from 'react-router-dom';

function AdditionalInfo() {
  const { url } = useRouteMatch();

  return (
    <>
      <section>
        <p>Additional Information</p>
        <ul>
          <li>
            <Link to={`${url}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`${url}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </section>
    </>
  );
}

export default AdditionalInfo;
