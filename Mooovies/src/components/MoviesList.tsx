import React, { useEffect, useState } from "react";
import {
  getPopularMoovies,
  getTopRatedMoovies,
  getNowPlayingMoovies,
  getUpcomingMoovies,
} from "../services/moovies.service";
import { Movies } from "../types/moovies.type";
import { Link } from "react-router";
import styles from "./../style/MovieList.module.css"; // Import du fichier CSS Module
import { searchMovie } from "../services/movie.service";

const MoviesList = () => {
  const [movies, setMovies] = useState<Array<Movies>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("popular"); // Etat pour stocker la catégorie sélectionnée

  const loadMovies = async (category: string) => {
    setIsLoading(true);
    let data;
    try {
      if (category === "popular") {
        data = await getPopularMoovies();
      } else if (category === "top_rated") {
        data = await getTopRatedMoovies();
      } else if (category === "now_playing") {
        data = await getNowPlayingMoovies();
      } else if (category === "upcoming") {
        data = await getUpcomingMoovies();
      }
      setMovies(data.results); // Mise à jour de la liste des films
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setIsLoading(false);
  };

  // Chargement des films au chargement initial (par défaut, les films populaires)
  useEffect(() => {
    loadMovies(category);
  }, [category]); // Recharger les films chaque fois que la catégorie change

  const handleReseach = async (e: any) => {
    e.preventDefault();
    const reserch = e.target.movieSearchInput.value;
    const data = await searchMovie(reserch);
    setMovies(data.results);
  };

  return (
    <div className={styles.container}>
      <h1>Movies</h1>
      <div>
        <button
          className={`${styles.button} ${
            category === "popular" ? styles.active : ""
          }`}
          onClick={() => setCategory("popular")}
        >
          Popular
        </button>
        <button
          className={`${styles.button} ${
            category === "now_playing" ? styles.active : ""
          }`}
          onClick={() => setCategory("now_playing")}
        >
          Now Playing
        </button>
        <button
          className={`${styles.button} ${
            category === "top_rated" ? styles.active : ""
          }`}
          onClick={() => setCategory("top_rated")}
        >
          Top Rated
        </button>
        <button
          className={`${styles.button} ${
            category === "upcoming" ? styles.active : ""
          }`}
          onClick={() => setCategory("upcoming")}
        >
          Upcoming
        </button>
      </div>
      <form className={styles.searchForm} onSubmit={handleReseach}>
        <input
          className={styles.searchInput}
          type="text"
          id="movieSearchInput"
          placeholder="Rechercher un film"
        />
        <button className={styles.button} type="submit">
          Rechercher
        </button>
      </form>

      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        movies.map((movie) => (
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
        ))
      )}
    </div>
  );
};

export default MoviesList;
