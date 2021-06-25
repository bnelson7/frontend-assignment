import React, { useState } from "react";
import logo from "../../images/logo.svg";
import search from "../../images/Union.png";
import axios from "axios";
import "./Navbar.css";

const Navbar = ({ setMovies, fetchMovies }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e, query) => {
    e.preventDefault();
    const queryString = query.split(" ").join("+");
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=7315ec59ea2264da1fa4f4eb8d647853&query=${queryString}`
      )
      .then(res => {
        const movies = res.data.results;
        const addImageToMovies = movies.map(movie => {
          movie.logo = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
          return movie;
        });
        setMovies(addImageToMovies);
      });
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Timescale" className="logo" onClick={fetchMovies}/>
      <form onSubmit={e => handleSearch(e, query)} className="searchbar">
        <button type="submit">
          <img
            src={search}
            onClick={e => handleSearch(e, query)}
            alt="search"
          />
        </button>
        <input
          type="search"
          placeholder="Search for a movie"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Navbar;
