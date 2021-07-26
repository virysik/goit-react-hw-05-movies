import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Api from '../../services/Api';
import defaultImg from '../../images/defaultPerson.jpg';

function Cast({ id }) {
  const [castInfo, setCastInfo] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function getCastInfo(movieId) {
      try {
        const { cast } = await Api.fetchMovieCast(movieId);

        setCastInfo(
          cast.map(castElem => {
            return {
              ...castElem,
              img: castElem.profile_path
                ? `https://image.tmdb.org/t/p/w500${castElem.profile_path}`
                : defaultImg,
            };
          }),
        );
      } catch (err) {
        console.log(err);
      }
    }
    getCastInfo(movieId);
  }, [movieId]);

  return (
    <>
      {castInfo && (
        <ul>
          {castInfo.map(({ id, name, img, character }) => (
            <li key={id}>
              <img src={img} alt={name} />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;
