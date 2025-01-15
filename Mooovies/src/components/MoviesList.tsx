import React, { useCallback, useEffect, useState } from "react";
import { getMoviesList } from "../services/moovies.service";
import { Movies } from "../types/moovies.type";
import { Link } from "react-router";
import styles from "./../style/MovieList.module.css";
import { searchMovie } from "../services/movie.service";

const MoviesList = () => {
  const [movies, setMovies] = useState<Array<Movies>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("popular");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const totalPages = 500;

  const loadMovies = useCallback(async (category: string, page: number) => {
    setIsLoading(true);
    let data;
    try {
      data = await getMoviesList(category, String(page));
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadMovies(category, currentPage);
  }, [category, currentPage, loadMovies]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        const data = await searchMovie(searchQuery);
        setMovies(data.results);
        setCurrentPage(1);
        setIsLoading(false);
      } else {
        loadMovies(category, currentPage);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, category, currentPage, loadMovies]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
      <div className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un film"
        />
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className={styles.pageNumber}>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          className={styles.paginationButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>

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
