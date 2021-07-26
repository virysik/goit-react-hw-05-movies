import { useState } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Cast from '../Cast';
import Review from '../Reviews';

function AdditionalInfo() {
  const [showCast, setShowCast] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const { path, url } = useRouteMatch();

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
        <Route path={`${path}/cast`}>{showCast && <Cast />}</Route>
        <Route path={`${path}/reviews`}>{showReview && <Review />}</Route>
      </Switch>
    </>
  );
}

export default AdditionalInfo;
