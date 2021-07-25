import { useState, useEffect } from 'react';
import * as Api from '../../services/Api';
import defaultImg from '../../images/defaultPerson.jpg';

function Cast({ id }) {
  const [castInfo, setCastInfo] = useState(null);

  useEffect(() => {
    async function getCastInfo(id) {
      try {
        const { cast } = await Api.fetchMovieCast(id);

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
    getCastInfo(id);
  }, [id]);
  return (
    <ul>
      {castInfo &&
        castInfo.map(({ id, name, img, character }) => {
          return (
            <li key={id}>
              <img src={img} alt={name} />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
    </ul>
  );
}

export default Cast;
