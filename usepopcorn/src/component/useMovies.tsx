import { useState, useEffect } from "react";

import { getMoviesAPI } from "../api/api";
import { MovieDetailsProps } from "../model/types";

// custom hook
export function useMovies(query: string) {
  const [movies, setMovies] = useState<MovieDetailsProps[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
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

  return {movies, isLoading, error}
}
