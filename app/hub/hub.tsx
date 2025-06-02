import { useCallback, useEffect, useState } from 'react';
import Search from '~/components/search';
import List, { type ListItem } from '~/components/list';
import {
  fetchMovieById,
  fetchMoviesByIdList,
  searchMovies,
  type MovieSummary,
} from '../api/tmdb_api';
import { normalizeMovieResults } from '~/utils/normalizeMovieResults';
import { lsMovieListKey } from '~/utils/consts';

const Hub = () => {
  const [searchResults, setSearchResults] = useState<ListItem[]>([]);
  const [storedMovieIds, setStoredMovieIds] = useState<string[]>([]);
  const [savedMovies, setSavedMovies] = useState<ListItem[]>([]);

  // Normalize search results and update state
  const handleSearchResults = useCallback((rawResults: MovieSummary[]) => {
    setSearchResults(normalizeMovieResults(rawResults));
  }, []);

  const handleSelectMovie = async (movieId: string) => {
    // prevent duplicate adds
    if (storedMovieIds.includes(movieId)) return;

    try {
      const movie = await fetchMovieById(movieId);
      const normalizedMovie = normalizeMovieResults([movie])[0];

      const alreadySaved = savedMovies.some((m) => m.id === normalizedMovie.id);
      if (alreadySaved) return;

      const updatedIds = [...storedMovieIds, movieId];
      const updatedMovies = [...savedMovies, normalizedMovie];

      // update state and local storage with the same data
      setStoredMovieIds(updatedIds);
      setSavedMovies(updatedMovies);
      localStorage.setItem(lsMovieListKey, JSON.stringify(updatedIds));
    } catch (err) {
      console.error('Failed to fetch and add movie:', err);
    }
  };

  // Load stored movie IDs on mount
  useEffect(() => {
    const loadStoredMovies = async () => {
      try {
        const raw = localStorage.getItem(lsMovieListKey);
        if (!raw) return;

        const ids: string[] = JSON.parse(raw);
        if (!Array.isArray(ids) || ids.length === 0) return;

        const movies = await fetchMoviesByIdList(ids);
        const normalized = normalizeMovieResults(movies);

        setStoredMovieIds(ids);
        setSavedMovies(normalized);
      } catch (err) {
        console.error('Error loading saved movies:', err);
        setStoredMovieIds([]);
        setSavedMovies([]);
      }
    };

    loadStoredMovies();
  }, []);

  // When storedMovieIds updates, fetch movie details
  useEffect(() => {
    if (!storedMovieIds.length) return;

    fetchMoviesByIdList(storedMovieIds)
      .then(updateSavedMovies)
      .catch((err) => console.error('Failed to fetch movie list:', err));
  }, []);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <p>Love/Rate</p>
            <p className="text-xs">Mini</p>
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <p>Hold your horses, amigo.</p>
        </div>
        <section>
          <p className="font-medium">My Movies</p>
          {savedMovies.length ? (
            <List data={savedMovies} />
          ) : (
            <p>No movies yet...</p>
          )}
        </section>
        <section>
          <Search
            ariaLabel="Search movies"
            placeholder="Search movies..."
            handleSearch={searchMovies}
            handleResults={handleSearchResults}
          />
          <List data={searchResults} handleSelect={handleSelectMovie} />
        </section>
      </div>
    </main>
  );
};

export default Hub;
