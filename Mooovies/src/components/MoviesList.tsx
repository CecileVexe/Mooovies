import React, { useEffect, useState } from "react";
import { getPopularMoovies } from "../services/moovies.service";
import { Movies } from "../types/moovies.type";
import { Link } from "react-router";
import styles from "./../style/MovieList.module.css"; // Import du fichier CSS Module

const MoviesList = () => {
  const [popularMovies, setPopularMovies] = useState<Array<Movies>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDatas = async () => {
    setIsLoading(true);
    const ListData = await getPopularMoovies();
    setPopularMovies(ListData.results);
    setIsLoading(false);
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    !isLoading && (
      <div className={styles.container}>
        <h1>Popular Movies</h1>
        <div>
          <button className={styles.button}>Now Playing</button>
          <button className={styles.button}>Popular</button>
          <button className={styles.button}>Top Rated</button>
          <button className={styles.button}>Upcoming</button>
        </div>
        <form
          className={styles.searchForm}
          onSubmit={() => console.log("coucou")}
        >
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Rechercher un film"
          />
          <button className={styles.button} type="submit">
            Rechercher
          </button>
        </form>
        {popularMovies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <img
              className={styles.movieImage}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.overview}</p>
            <Link to={`/movie/${movie.id}`}>En savoir plus</Link>
          </div>
        ))}
      </div>
    )
  );
};

export default MoviesList;
