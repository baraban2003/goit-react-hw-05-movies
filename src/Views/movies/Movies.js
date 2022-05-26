import { useState, useEffect } from 'react';
import * as searchMuviesAPI from 'Services/Movies-api';
import { ToastContainer } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import Searchbar from 'components/SearhBar/SerchBar';

export default function Movie() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);

  const [movie, setMovie] = useState(queryParam.get('search') ?? '');
  const [moviesGallary, setMoviesGallary] = useState([]);

  const handleMoviesSubmit = movie => {
    setMovie(movie);
    setMoviesGallary([]);
  };

  useEffect(() => {
    if (!movie) {
      return;
    }
    searchMuviesAPI.searchMovies(movie).then(setMoviesGallary);
  }, [movie]);

  return (
    <>
      <Searchbar handleMoviesSubmit={handleMoviesSubmit} />
      <>
        {moviesGallary && (
          <>
            <ul>
              {moviesGallary.map(e => (
                <li key={e.id}>
                  <Link
                    to={{ pathname: `/movies/${e.id}?search=${movie}` }}
                    state={{ from: `${location.pathname}?search=${movie}` }}
                  >
                    {e.movieName}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  );
}
