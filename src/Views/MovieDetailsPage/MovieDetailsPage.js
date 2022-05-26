import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  Routes,
  useParams,
  useLocation,
  Link,
} from 'react-router-dom';
import * as getMmovieDetailsAPI from 'Services/Movies-api';
import s from './MovieDetailsPage.module.css';
const Cast = lazy(() => import('Views/Cast'));
const Reviews = lazy(() => import('Views/Reviews'));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();

  useEffect(() => {
    getMmovieDetailsAPI.getMmovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <div>
      <Link to={location?.state?.from ?? '/'} className={s.goBack}>
        <>&#8592; Go back</>
      </Link>
      {movie && (
        <div className={s.mainBlock}>
          <img src={movie[0].poster} alt={movie[0].tag} className={s.image} />
          <div className={s.textBlock}>
            <h2>{movie[0].movieName}</h2>
            <p>User score: {movie[0].userScore}</p>
            <h3>Overview</h3>
            <p>{movie[0].overview}</p>
            <h3>Genres</h3>
            <p>{movie[0].genres.join(' ')}</p>
          </div>
        </div>
      )}
      <hr />
      <h4>Additional information</h4>
      <div>
        <ul className={s.links}>
          <li className={s.link}>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li className={s.link}>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Routes>
          <Route
            path="cast"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cast movieId={movieId} />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Reviews movieId={movieId} />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
