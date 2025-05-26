import { useEffect, useState } from 'react';

type SearchPropsType = {
  placeholder?: string;
  timeoutDelay?: number;
  handleSearch: (value: string) => any;
  handleResults: (value: any[]) => void;
};

const Search = (props: SearchPropsType) => {
  const {
    placeholder,
    timeoutDelay = 300,
    handleSearch,
    handleResults,
  } = props;

  const [query, setQuery] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch(query).then(handleResults).catch(console.error);
    }, timeoutDelay);

    return () => clearTimeout(delay);
  }, [query, handleResults, timeoutDelay]);

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
