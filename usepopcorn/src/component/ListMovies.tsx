import { MovieDetailsProps } from "../model/types";



//using destructuring
const MovieSummary = ({
  movie,
  setSelectedID,
}: {
  movie: MovieDetailsProps;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <li onClick={() => setSelectedID(movie.imdbID)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.year}</span>
        </p>
        {"userRating" in movie && (
          <>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </>
        )}
      </div>
    </li>
  );
};
// using React Function Component
// const ListMovies: React.FC<{ movies: MovieListProps[] }> = function ({
//   movies,
// }) {

interface ListMoviesProps {
  movies: MovieDetailsProps[];
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
}

const ListMovies = function ({ movies, setSelectedID }: ListMoviesProps) {
  return (
    <>
      <ul className="list list-movies">
        {(movies || []).map((movie) => (
          <MovieSummary
            movie={movie}
            key={movie.imdbID}
            setSelectedID={setSelectedID}
          />
        ))}
      </ul>
    </>
  );
};

export default ListMovies;
