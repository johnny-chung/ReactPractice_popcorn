import { useState, useEffect } from "react";
import { fetchMovieDetailsAPI } from "../api/api";
import StarRating from "../component/StarRating";
import { MovieDetailsProps } from "../model/types";

const MovieDetails = function ({
  selectedID,
  setSelectedID,
  addWatched,
}: {
  selectedID: string;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  addWatched: Function;
}) {
  const [movieDetails, setMoviesDetail] = useState<MovieDetailsProps>(
    {} as MovieDetailsProps
  );

  const [userStar, setUserStar] = useState(0);

  const callAddWatched = function () {
    if (movieDetails) {
      const newMovie = movieDetails;
      newMovie.userRating = userStar;
      addWatched(newMovie);
      onCloseMovie();
    }
  };

  const onCloseMovie = function () {
    setSelectedID("");
  };

  useEffect(
    function () {
      async function getMoviesDetail() {
        const data = await fetchMovieDetailsAPI(selectedID);
        const dataMovieDetailType: MovieDetailsProps = {
          imdbID: data.imdbID,
          title: data.Title,
          year: data.Year,
          poster: data.Poster,
          imdbRating: data.imdbRating,
          plot: data.Plot,
          released: data.Released,
          actors: data.Actors,
          director: data.Director,
          genre: data.Genre,
          runtime: data.Runtime,
        };
        setMoviesDetail(dataMovieDetailType);
      }
      getMoviesDetail();
    },
    [selectedID]
  );

  //--------------------------------------------

  // can't use hook in condition => the link list of hook must be the same
  // the tree only create once for each component, and contain a linked list of hook
  //if conditon, destory order in link list (here, one more useState hook which does not exist)

  // if (movieDetails.imdbRating > 7){
  //     [top, setTop] =useState('true')
  // }

  // same for early return, the useEffect below is not call

  // if(movieDetails.imdbRating > 7) {
  //    return <p>Top</p>
  //}

  //const[isTop, setTop] = useState(movieDetails.imdbRating>7)
  // always false
  //console.log(isTop)
  // this is because the initial value is only access by react on initial render (onComponentMount)
  // @ initial render, movieDetails is undefine -> thus always false
  // after movieDetails was given value, the isTop won't look at this inital value
  // use useEffect -> depend array [movieDetails.imdbRating] -> not good practice in this case
  // or more simple and appropriate, use derived stata => simple const isTop = imdbRating > 7

  //-------------------------

  // change doucment title
  useEffect(
    function () {
      if (!movieDetails.title) {
        return;
      }
      document.title = movieDetails.title;

      //cleanup function
      return function () {
        document.title = "usePopcorn";
      };
    },
    [movieDetails.title]
  );

  // key press function => dom manupication in react is possible
  useEffect(
    function () {
      const callBack = function (event) {
        if (event.code === "Escape") {
          onCloseMovie();
        }
      };

      document.addEventListener("keydown", callBack);

      // if no cleanup, it will attach multiple eventlistner to the same obj everytime we close it
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => onCloseMovie()}>
          &larr;
        </button>
        <img src={movieDetails.poster} alt={movieDetails.title} />
        <div className="details-overview">
          <h2>{movieDetails.title}</h2>
          <p>
            {movieDetails.released} &bull; {movieDetails.runtime}
          </p>
          <p>{movieDetails.genre}</p>
          <p>{movieDetails.imdbRating} IMDB rating</p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxStar={10} size={24} setUserRating={setUserStar} />
        </div>
        <p>
          <em>{movieDetails.plot}</em>
        </p>
        <p>Starring: {movieDetails.actors}</p>
        <p>Directer by: {movieDetails.director}</p>
      </section>
      <button className="btn-add" onClick={() => callAddWatched()}>
        Add to Watched Movies List
      </button>
    </div>
  );
};

export default MovieDetails;
