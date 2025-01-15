import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMoovieActors, getMoovieDetails } from "../services/movie.service";
import { Movie } from "../types/movie.type";
import { MovieActorDetails } from "../types/actor.type";
import { useWishlist } from "../context/WishListContext";
import styles from "./../style/MovieDetails.module.css";

const MoviesDetails = () => {
  const [movie, setMovie] = useState<Movie | undefined>();
  const [movieActors, setMovieActors] = useState<
    MovieActorDetails | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { addToWishlist } = useWishlist();

  const getDatas = useCallback(async () => {
    setIsLoading(true);
    if (params.movieId) {
      const movieData = await getMoovieDetails(params.movieId);
      const actorData = await getMoovieActors(params.movieId);
      setMovie(movieData);
      setMovieActors(actorData);
      setIsLoading(false);
    }
  }, [params.movieId]);

  useEffect(() => {
    getDatas();
  }, [getDatas]);

  const handleAddToWishlist = () => {
    if (movie) {
      addToWishlist(movie);
      alert(`${movie.title} ajouté à votre wishlist !`);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    movie && (
      <div className={styles.container}>
        <h2 className={styles.title}>{movie.title}</h2>
        <button className={styles.button} onClick={handleAddToWishlist}>
          Ajouter à la WishList
        </button>
        <img
          className={styles.img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <p className={styles.overview}>{movie.overview}</p>
        <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
        <p>Popularity: {movie.popularity}</p>
        <p>Vote Average: {movie.vote_average}</p>
        <p>Vote Count: {movie.vote_count}</p>
        <p>Genre: {movie.genres.map((genre) => genre.name).join(", ")}</p>
      </div>
    )
  );
};

export default MoviesDetails;
