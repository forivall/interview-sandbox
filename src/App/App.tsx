/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { apiKey } from '../config';
import { useDebounce } from 'use-debounce';
// import AppRouting from './AppRouting';

import styles from './App.module.css';

interface GiphyResults {
  data: GifObject[];
}

interface GifObject {
  id: string;
  url: string;
  embed_url: string;
  images: {
    preview_gif: {
      height: number;
      width: number;
      url: string;
    };
  };
}

// NOTE: a library should be used in a real-world scenario
const useGiphySearch = (term: string): [GiphyResults?, Error?] => {
  const [data, setData] = React.useState<GiphyResults>();
  const [err, setErr] = React.useState<Error>();

  React.useEffect(() => {
    async function fetchData() {
      console.log('searching for?', term);
      if (!term) return;

      const results = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${term}`
      );
      const json = await results.json();

      setData(json);
    }
    fetchData().catch((err) => {
      setErr(err);
    });
  }, [term]);

  return [data, err];
};

interface SearchBoxProps {
  onSearch?: (value: string) => void;
  onSearchInputChange?: (value: string) => void;
}

const SearchBox: React.VFC<SearchBoxProps> = (props) => {
  const { onSearch, onSearchInputChange } = props;
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.(searchInputRef.current?.value ?? '');
      }}
    >
      Search!{' '}
      <input
        type="search"
        ref={searchInputRef}
        onChange={(event) => {
          onSearchInputChange?.(event.currentTarget.value);
        }}
      />
      {/* <input type="submit" value="Search!" /> */}
    </form>
  );
};

const SearchResults: React.VFC<{ data: GifObject[] }> = (props) => {
  const { data } = props;
  return (
    <div className={styles.gifContainer}>
      {data.map((gifObject) => {
        return (
          <div className={styles.gifPreview} key={gifObject.id}>
            <img src={gifObject.images.preview_gif.url} />
          </div>
        );
      })}
    </div>
  );
};

const App: React.VFC = () => {
  const [searchTermInstant, setSearchTerm] = React.useState('');
  const [searchTerm] = useDebounce(searchTermInstant, 150);
  const [results, err] = useGiphySearch(searchTerm);

  const searchBoxEl = (
    <SearchBox
      onSearch={(term) => {
        setSearchTerm(term);
      }}
    />
  );

  if (!results) {
    return <div>{searchBoxEl}</div>;
  }

  if (err) {
    return (
      <div>
        {searchBoxEl}
        <span style={{ background: 'red' }}>ERROR:</span>
        {err.message}
      </div>
    );
  }

  return (
    <div>
      {searchBoxEl}
      <SearchResults data={results.data} />
    </div>
  );

  // return <AppRouting />;
};

export default App;
