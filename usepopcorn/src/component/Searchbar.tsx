import { useEffect, useRef } from "react";

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = function ({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(function () {
    // not the react way to select use DOM
    //const el = document.querySelector(".search");
    // if (el) {
    //   el.focus();
    // }
    inputEl.current.focus();
  }, []);
  // adding query to dependence also not good it select the same element evey render -> slow

  useEffect(function () {
    // create callback function so that we can clean up
    function callback(e) {
      // check which elem is focus/ active/ selected
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    // don't exist -> use DOM directly
    document.addEventListener("keydown", callback);
    // clean
    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default SearchBar;
