import axios from 'axios';
import { apiKey } from '../constants/apiKey';

export async function fetchMovies() {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchOneMovieInfo(id) {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
