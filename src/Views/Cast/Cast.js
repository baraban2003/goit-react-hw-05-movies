import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as getCastAPI from 'Services/Movies-api';
import s from './Cast.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getCastAPI.getMovieCredits(movieId).then(setCast);
  }, [movieId]);

  return (
    <>
      {!cast ||
        (cast.length === 0 ? (
          <p>We dont't have casts for this movie</p>
        ) : (
          cast.map(e => {
            return (
              <div key={e.castId}>
                <hr />
                {e.photo.includes('w500/null') ? (
                  <div></div>
                ) : (
                  <img src={e.photo} alt={e.name} className={s.image} />
                )}
                <h5 className={s.actorName}>{e.name}</h5>
                <p className={s.character}> {e.character} </p>
              </div>
            );
          })
        ))}
    </>
  );
}
Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
