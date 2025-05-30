import { describe, expect, it } from 'vitest';
import type { MovieSummary } from '~/api/tmdb_api';
import { normalizeMovieResults } from '~/utils/normalizeMovieResults';

describe('Utility functions', () => {
  describe('normalize movie search results', () => {
    it('handles an empty array', () => {
      expect(normalizeMovieResults([])).toEqual([]);
    });

    it('returns a list', () => {
      const mockRawData: MovieSummary[] = [
        {
          id: 1,
          title: 'Barbie',
          release_date: '04-20-2020',
          poster_path: '/barbie.jpg',
          overview: 'Barbie takeover.',
          vote_average: 7.8,
        },
        {
          id: 2,
          title: 'Oppenheimer',
          release_date: '04-21-2020',
          poster_path: 'oppenheimer.jpg',
          overview: 'Cillian Murphy wows.',
          vote_average: 7.9,
        },
      ];
      expect(Array.isArray(normalizeMovieResults(mockRawData))).toBe(true);
    });

    it('transforms movie data correctly', () => {
      const mockRawData: MovieSummary[] = [
        {
          id: 2,
          title: 'Oppenheimer',
          release_date: '04-21-2020',
          poster_path: 'oppenheimer.jpg',
          overview: 'Cillian Murphy wows.',
          vote_average: 7.9,
        },
      ];
      const expected = [
        {
          id: '2',
          label: 'Oppenheimer',
          date: '04-21-2020',
          image: 'oppenheimer.jpg',
        },
      ];
      expect(normalizeMovieResults(mockRawData)).toEqual(expected);
    });

    it('handles missing release date and poster path', () => {
      const mockRawData: MovieSummary[] = [
        {
          id: 2,
          title: 'Oppenheimer',
          overview: 'Cillian Murphy wows.',
          vote_average: 7.9,
        },
      ];
      const expected = [
        {
          id: '2',
          label: 'Oppenheimer',
          date: 'Unknown',
          image: undefined,
        },
      ];

      expect(normalizeMovieResults(mockRawData)).toEqual(expected);
    });
  });
});
