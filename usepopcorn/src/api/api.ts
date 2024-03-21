// code for backend
// import dotenv from "dotenv";
// dotenv.config();

// const omdbKey = process.env.OMDB_KEY;

import { MovieDetailsProps } from "../model/types";

const baseOMDBURL = `http://www.omdbapi.com/?apikey=174abe19&`;

export const getMoviesAPI = async function (
  query = "ring",
  controller: AbortController
) {
  try {
    const res = await fetch(`${baseOMDBURL}s=${query}`, {
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error("OMDB connection fail");
    }

    let data = await res.json();
    if (data.Response === "False") {
      throw new Error("Movie not found");
    }

    let movies = [] as MovieDetailsProps[]
    movies = data.Search.map((movie) => {
      return (
        {
          imdbID: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          imdbRating: movie.imdbRating,
          plot: movie.Plot,
          released: movie.Released,
          actors: movie.Actors,
          director: movie.Director,
          genre: movie.Genre,
          runtime: movie.Runtime,
        })
      })
    return movies;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchMovieDetailsAPI = async function (id = "tt0167260") {
  try {
    const res = await fetch(`${baseOMDBURL}i=${id}`);
    if (!res.ok) {
      throw new Error("OMDB connection fail");
    }

    let data = await res.json();
    if (data.Response === "False") {
      throw new Error("Movie not found");
    }
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
