import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchMovies, api, fetchMovieById } from '../api/tmdb_api';

describe('tmdb api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('search movies', () => {
    it('returns movie results from TMDb API', async () => {
      const mockData = {
        results: [
          {
            id: '4',
            title: 'Mad Max: Fury Road',
            release_date: '2015-05-13',
            poster_path: '/fake_poster_path.jpg',
            overview: 'Witness me!',
            vote_average: 7.5,
          },
        ],
      };

      // mock the get method on the api instance
      vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockData });

      const results = await searchMovies('Mad Max');

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Mad Max: Fury Road');
      expect(api.get).toHaveBeenCalledOnce();
      expect(api.get).toHaveBeenCalledWith('/search/movie', {
        params: { query: 'Mad Max' },
      });
    });
  });

  describe('fetchMovieById', () => {
    it('returns movie details from TMDb API', async () => {
      const mockData = {
        id: '4',
        title: 'Mad Max: Fury Road',
        release_date: '2015-05-13',
        poster_path: '/fake_poster_path.jpg',
        overview: 'Witness me!',
        vote_average: 7.5,
      };

      // mock the get method on the api instance
      vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockData });

      const results = await fetchMovieById('4');

      expect(results).toMatchObject(mockData);
      expect(results.title).toBe('Mad Max: Fury Road');
      expect(api.get).toHaveBeenCalledOnce();
      expect(api.get).toHaveBeenCalledWith('/movie/4');
    });
  });
});
