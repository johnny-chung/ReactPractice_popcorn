import { useState, useEffect } from "react";
import "./App.css";

import SearchBar from "./component/Searchbar";
import Navbar from "./component/Navbar";

import ListBox from "./component/ListBox";
import Summary from "./component/Summary";
import ListMovies from "./component/ListMovies";
import Loader from "./component/Loader";
import ErrorMsg from "./component/ErrorMsg";
import MovieDetails from "./component/MovieDetails";
import { useMovies } from "./component/useMovies";
import { MovieDetailsProps } from "./model/types";

const NumOfResults: React.FC<{ movies: MovieDetailsProps[] }> = function ({
  movies,
}) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default function App() {
  const [query, setQuery] = useState<string>("ring");
  const [selectedID, setSelectedID] = useState<string>("");

  // lazy initial state => pass a callback function
  const [watched, setWatched] = useState<MovieDetailsProps[]>(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  //useState(localStorage.getItem('watched'))
  // this will call localStorage function on every render => not GOOD
  // pass it as a callback function in the initial render is better

  const addWatched = function (newMovie: MovieDetailsProps) {
    setWatched((watched) => [...watched, newMovie]);
  };

  // store the watched to local storage
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  // useing custom hook
  const { movies, isLoading, error } = useMovies(query);

  return (
    <>
      {/* method 1 using element
      <Navbar
        element={
          <>
            <SearchBar />
            <NumOfResults movies={movies} />
          </>
        }
      /> */}
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumOfResults movies={movies} />
      </Navbar>
      <main className="main">
        <ListBox>
          {/* {isLoading ? <Loader /> : <ListMovies movies={movies} />} */}
          {isLoading && !error && <Loader />}
          {!isLoading && !error && (
            <ListMovies movies={movies} setSelectedID={setSelectedID} />
          )}
          {error && <ErrorMsg message={error} />}
        </ListBox>

        <ListBox>
          {selectedID.length ? (
            <MovieDetails
              selectedID={selectedID}
              setSelectedID={setSelectedID}
              addWatched={addWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <ListMovies movies={watched} setSelectedID={setSelectedID} />
            </>
          )}
        </ListBox>
      </main>
    </>
  );
}
