import type { ListItem } from '~/components/list';
import type { MovieSummary } from '../api/tmdb_api';

export const normalizeMovieResults = (results: MovieSummary[]) => {
  const normalizedResults: ListItem[] = results.map((item: MovieSummary) => ({
    id: item.id,
    label: item.title,
    date: item.release_date ?? 'Unknown',
    image: item.poster_path, // todo: add default fallback
  }));

  return normalizedResults;
};
