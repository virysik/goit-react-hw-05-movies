import axios from 'axios';
import { apiKey } from '../constants/apiKey';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

async function fetchParams(url = '') {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchMovies() {
  const params = `/trending/movie/day?api_key=${apiKey}`;
  return fetchParams(params);
}

export async function fetchOneMovieInfo(id) {
  const params = `/movie/${id}?api_key=${apiKey}&language=en-US`;
  return fetchParams(params);
}

export async function fetchMovieCast(id) {
  const params = `/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
  return fetchParams(params);
}

export async function fetchMovieReviews(id) {
  const params = `/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`;
  return fetchParams(params);
}
