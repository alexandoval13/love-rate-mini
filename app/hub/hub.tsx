import Search from '~/components/search';
import { searchMovies, type MovieSummary } from '../api/tmdb_api';
import { useCallback, useState } from 'react';
import List, { type ListItem } from '~/components/list';
import { normalizeMovieResults } from '~/utils/normalizeMovieResults';

const Hub = () => {
  const [results, setResults] = useState<ListItem[]>([]);

  const handleResults = useCallback((rawResults: MovieSummary[]) => {
    setResults(normalizeMovieResults(rawResults));
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
        <div>
          <Search
            ariaLabel="Search movies"
            placeholder="Search movies..."
            handleSearch={searchMovies}
            handleResults={handleResults}
          />
          <List data={results} />
        </div>
      </div>
    </main>
  );
};

export default Hub;
