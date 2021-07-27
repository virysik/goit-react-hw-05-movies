import axios from 'axios';
import { apiKey } from '../constants/apiKey';
import defaulPoster from '../images/defaultPoster.jpg';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

async function fetchParams(url = '') {
  const { data } = await axios.get(url);
  return data;
}

export function fetchMovies() {
  const params = `/trending/movie/day?api_key=${apiKey}`;
  return fetchParams(params);
}

export function fetchMovieCast(id) {
  const params = `/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
  return fetchParams(params);
}

export function fetchMovieReviews(id) {
  const params = `/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`;
  return fetchParams(params);
}

export function fetchRequestedMovies(query) {
  const params = `/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${query}`;
  return fetchParams(params);
}

export async function fetchOneMovieInfo(id) {
  const params = `/movie/${id}?api_key=${apiKey}&language=en-US`;
  const { data } = await axios.get(params);
  return {
    title: data.title ? data.title : '',
    overview: data.overview ? data.overview : '',
    img: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : defaulPoster,
    year: data.release_date ? '(' + data.release_date.split('-')[0] + ')' : '',
    score: data.vote_average ? Math.round(data.vote_average) + '%' : '',
    genres: data.genres ? [...data.genres].map(genre => genre.name + ' ') : '',
  };
}
