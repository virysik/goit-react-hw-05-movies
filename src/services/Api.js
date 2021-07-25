import axios from 'axios';
import { apiKey } from '../constants/apiKey';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export async function fetchMovies() {
  const params = `/trending/all/day?api_key=${apiKey}`;
  try {
    const { data } = await axios.get(params);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchOneMovieInfo(id) {
  const params = `/movie/${id}?api_key=${apiKey}&language=en-US`;
  try {
    const { data } = await axios.get(params);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchMovieCast(id) {
  const params = `/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
  try {
    const { data } = await axios.get(params);
    return data;
  } catch (err) {
    console.log(err);
  }
}
