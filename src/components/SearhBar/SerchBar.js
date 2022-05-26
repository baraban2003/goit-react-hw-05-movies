import { useState } from 'react';
import s from './SearchBar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Searchbar({ handleMoviesSubmit }) {
  const [movie, setMovie] = useState('');

  const handleSearchRequest = event => {
    setMovie(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (movie.trim() === '') {
      toast.error('Please enter a search request');
      return;
    }

    handleMoviesSubmit(movie);
    setMovie('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={movie}
        onChange={handleSearchRequest}
      />
      <button className={s.button} type="submit">
        <span className={s.buttonLabel}>Search</span>
      </button>
    </form>
  );
}

Searchbar.propTypes = {
  handleMoviesSubmit: PropTypes.func.isRequired,
};
