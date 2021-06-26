import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../Navbar/Navbar";
import Movies from "../Movies/Movies";
import Modal from "../Modal/Modal";
import MovieContext from "../../MovieContext";
import axios from "axios";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const movieProvider = useMemo(() => ({ movie, setMovie }), [movie, setMovie]);

  const fetchMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=7315ec59ea2264da1fa4f4eb8d647853&language=en-US&page=1"
      )
      .then(res => {
        const movies = res.data.results;
        const addImageToMovies = movies.map(movie => {
          movie.logo = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
          return movie;
        });
        setMovies(addImageToMovies);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={movieProvider}>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
      <main className="page-container">
        <Navbar setMovies={setMovies} fetchMovies={fetchMovies} />
        <hr />
        <Movies movies={movies} setModalOpen={setModalOpen} />
      </main>
    </MovieContext.Provider>
  );
};

export default App;
