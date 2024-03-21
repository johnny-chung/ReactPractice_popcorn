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

import { getMoviesAPI } from "./api/api";

import { MovieDetailsProps } from "./model/types";

const NumOfResults: React.FC<{ movies: MovieDetailsProps[] }> = function ({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default function App() {



  const [movies, setMovies] = useState<MovieDetailsProps[]>([]);
  const [query, setQuery] = useState<string>("ring");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedID, setSelectedID] = useState<string>("");

  // lazy initial state => pass a callback function
  const [watched, setWatched] = useState<MovieDetailsProps[]>(function() {
    const storedValue = localStorage.getItem('watched')
    return (storedValue? JSON.parse(storedValue) : [])
  });

  //useState(localStorage.getItem('watched'))
  // this will call localStorage function on every render => not GOOD
  // pass it as a callback function in the initial render is better



  // fetch movie function to be used in useEffect
  const fetchMovies = async function (controller: AbortController) {
    try {
      setIsLoading(true);
      setError("");
      const data = await getMoviesAPI(query, controller);
      setMovies(data);

      // console.log(movies) 
      // will not get the latest movies
      // as react update state async (also in batch)
      // need to use callback function if want the latest state
      // e.g. setMovies((movies) => do something)
      // this will ensure to get the latest state

      console.log(data);
      setIsLoading(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
      console.error("Error fetching movies:", err);
    }
  };


  const addWatched = function (newMovie: MovieDetailsProps) {
    setWatched((watched) => [...watched, newMovie])
  }


  // fetch movie data with abort function, depend on query input
  useEffect(
    function () {
      // fetch cleanup -> avoid race condition
      const controller = new AbortController();

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies(controller);
      //cleanup fetch request
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  
  // store the watched to local storage
  useEffect(
    function() {
      localStorage.setItem("watched", JSON.stringify(watched))
    },
    [watched]
  )

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
