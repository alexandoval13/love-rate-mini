import type { ListItem } from '~/components/list';
import type { MovieDetails, MovieSummary } from '../api/tmdb_api';

export const normalizeMovieResults = (results: MovieSummary[]) => {
  const normalizedResults: ListItem[] = results.map((item: MovieSummary) => ({
    id: item.id.toString(),
    label: item.title,
    date: item.release_date ?? 'Unknown',
    image: item.poster_path, // todo: add default fallback
  }));

  return normalizedResults;
};

export const normalizeMovieSelection = (selection: MovieDetails) => {
  return {
    id: selection.id,
    label: selection.title,
    date: selection.release_date ?? 'Unknown',
    image: selection.poster_path, // todo: add default fallback
  };
};
