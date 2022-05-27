import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHeading from 'components/PageHeading';
import * as homePageAPI from 'Services/Movies-api';

export default function HomePage() {
  const [movies, setMovies] = useState();

  const location = useLocation();

  useEffect(() => {
    homePageAPI.getTrending().then(setMovies);
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />

      {movies && (
        <>
          <ul>
            {movies.map(e => (
              <li key={e.id}>
                <Link
                  to={{ pathname: `/movies/${e.id}` }}
                  state={{ from: location.pathname }}
                >
                  {e.movieName}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
