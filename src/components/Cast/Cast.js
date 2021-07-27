import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Api from '../../services/Api';
import defaultImg from '../../images/defaultPerson.jpg';

function Cast() {
  const [castInfo, setCastInfo] = useState(null);
  const [castText, setCastText] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    async function getCastInfo(movieId) {
      try {
        const { cast } = await Api.fetchMovieCast(movieId);

        if (!cast.length) {
          return setCastText(
            `We don't have any cast information for this movie.`,
          );
        }

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
      {castInfo ? (
        <ul>
          {castInfo.map(({ credit_id, name, img, character }) => (
            <li key={credit_id}>
              <img src={img} alt={name} />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{castText}</p>
      )}
    </>
  );
}

export default Cast;
