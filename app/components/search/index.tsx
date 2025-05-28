import { useEffect, useState } from 'react';

type SearchPropsType = {
  ariaLabel?: string;
  placeholder?: string;
  timeoutDelay?: number;
  handleSearch: (value: string) => any;
  handleResults: (value: any[]) => void;
};

const Search = (props: SearchPropsType) => {
  const {
    ariaLabel,
    placeholder,
    timeoutDelay = 300,
    handleSearch,
    handleResults,
  } = props;

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) {
      handleResults([]);
      return;
    }

    const delay = setTimeout(() => {
      handleSearch(query).then(handleResults).catch(console.error);
    }, timeoutDelay);

    return () => clearTimeout(delay);
  }, [query, handleResults, timeoutDelay]);

  return (
    <div>
      <input
        type="text"
        aria-label={ariaLabel || 'Search'}
        placeholder={placeholder || 'Search...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
