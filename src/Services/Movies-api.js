import axios from 'axios';

const KEY = 'd3cefc83be12e2f78adc124a4a97fa4a';
const BASE_URL = 'https://api.themoviedb.org/3/';

export async function getTrending() {
  try {
    const request = await axios.get(
      `${BASE_URL}trending/movie/day?api_key=${KEY}`
    );

    const clearRequest = request.data.results.map(e => {
      return {
        id: e.id,
        movieName: e.original_title,
      };
    });
    return clearRequest;
  } catch (error) {
    console.error(error);
  }
}
export async function searchMovies(query) {
  try {
    const request = await axios.get(
      `${BASE_URL}search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=true`
    );
    const clearRequest = request.data.results.map(e => {
      return {
        id: e.id,
        movieName: e.original_title,
      };
    });
    return clearRequest;
  } catch (error) {
    console.error(error);
  }
}

export async function getMmovieDetails(movieId) {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/${movieId}?api_key=${KEY}&language=en-US`
    );
    const clearRequest = [request.data].map(e => {
      return {
        poster: `https://image.tmdb.org/t/p/w500/${e.poster_path}`,
        tag: e.tagline,
        movieName: e.original_title,
        userScore: e.vote_average * 10,
        overview: e.overview,
        genres: e.genres.map(el => el.name),
      };
    });
    return clearRequest;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieCredits(movieId) {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/${movieId}/credits?api_key=${KEY}&language=en-US`
    );

    const clearRequest = request.data.cast.map(e => {
      return {
        castId: e.cast_id,
        name: e.original_name,
        character: e.character,
        photo: `https://image.tmdb.org/t/p/w500/${e.profile_path}`,
      };
    });
    return clearRequest;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieReviews(movieId) {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`
    );
    const clearRequest = request.data.results.map(e => {
      return {
        revId: e.id,
        author: e.author,
        review: e.content,
      };
    });
    return clearRequest;
  } catch (error) {
    console.error(error);
  }
}
