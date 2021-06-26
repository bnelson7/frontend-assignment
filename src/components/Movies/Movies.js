import React, { useContext } from "react";
import MovieContext from "../../MovieContext";
import "./Movies.css";

const Movies = ({ movies, setModalOpen }) => {
  const { setMovie } = useContext(MovieContext);

  const handleModal = (e, movie) => {
    e.preventDefault();
    setMovie(movie);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <section className="grid-container">
      <h3>Most Recent Movies</h3>
      <ul className="movies-grid">
        {movies.map(movie => {
          return (
            <li
              className="movies-grid-item"
              key={movie.id}
              onClick={e => handleModal(e, movie)}
            >
              <span className="rating">{movie.vote_average}</span>
              <img src={movie.logo} alt="poster" />
              <footer className="card-footer">
                <h4>{movie.original_title}</h4>
              </footer>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Movies;
