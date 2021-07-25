import { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Cast from '../Cast';
import Review from '../Reviews';

function AdditionalInfo({ url, path, id }) {
  const [showCast, setShowCast] = useState(false);
  const [showReview, setShowReview] = useState(false);
  return (
    <>
      <section>
        <p>Additional Information</p>
        <ul>
          <li onClick={() => setShowCast(true)}>
            <Link to={`${url}/cast`}>Cast</Link>
          </li>
          <li onClick={() => setShowReview(true)}>
            <Link to={`${url}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </section>
      <Switch>
        <Route path={`${path}/cast`}>{showCast && <Cast id={id} />}</Route>
        <Route path={`${path}/reviews`}>{showReview && <Review />}</Route>
      </Switch>
    </>
  );
}

export default AdditionalInfo;
