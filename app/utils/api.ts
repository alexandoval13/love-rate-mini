import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
  timeout: 5000,
});

export interface MovieSummary {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  vote_average?: number;
}

export async function searchMovies(query: string): Promise<MovieSummary[]> {
  const res = await api.get('/search/movie', {
    params: { query },
  });
  return res.data.results as MovieSummary[];
}
