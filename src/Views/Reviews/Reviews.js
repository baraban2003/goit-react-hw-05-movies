import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as getReviewAPI from 'Services/Movies-api';
import s from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [review, setReview] = useState(null);

  useEffect(() => {
    getReviewAPI.getMovieReviews(movieId).then(setReview);
  }, [movieId]);

  return (
    <>
      <hr />
      {!review || review.length === 0 ? (
        <p>We dont't have any reviews for this movie</p>
      ) : (
        review.map(e => {
          return (
            <div key={e.revId}>
              <h5 className={s.authorName}>{e.author}</h5>
              <p className={s.review}> {e.review} </p>
            </div>
          );
        })
      )}
    </>
  );
}
Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
