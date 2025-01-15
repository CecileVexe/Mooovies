import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  getMoovieActors,
  getMoovieDetails,
  getSimilarMovie,
} from "../services/movie.service";
import { Movie } from "../types/movie.type";
import { MovieActorDetails } from "../types/actor.type";
import { useWishlist } from "../context/WishListContext";
import styles from "./../style/MovieDetails.module.css";
import { Movies } from "../types/moovies.type";

const MoviesDetails = () => {
  const [movie, setMovie] = useState<Movie | undefined>();
  const [similarMovie, setSimilarMovie] = useState<Movies[]>();
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
      const similarMovieData = await getSimilarMovie(params.movieId);
      setMovie(movieData);
      setMovieActors(actorData);
      setSimilarMovie(similarMovieData.results);
      setIsLoading(false);
    }
  }, [params.movieId]);

  useEffect(() => {
    getDatas();
  }, [getDatas]);

  const handleAddToWishlist = () => {
    if (movie) {
      addToWishlist(movie);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    movie && (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{movie.title}</h2>
          <button className={styles.button} onClick={handleAddToWishlist}>
            Ajouter à la WishList
          </button>
        </div>
        <div className={styles.infos}>
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={styles.detailsContainer}>
            <p className={styles.details}>{movie.overview}</p>
            <p className={styles.details}>
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </p>
            <p className={styles.details}>Popularity: {movie.popularity}</p>
            <p className={styles.details}>Vote Average: {movie.vote_average}</p>
            <p className={styles.details}>Vote Count: {movie.vote_count}</p>
            <p className={styles.details}>
              Genre: {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className={styles.details}>
              Production Companies:{" "}
              {movie.production_companies
                .map((company) => company.name)
                .join(", ")}
            </p>
          </div>
        </div>

        {movieActors?.cast && (
          <div className={styles.actorSection}>
            <h3>Actors</h3>
            <div className={styles.actorList}>
              {movieActors?.cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className={styles.actorCard}>
                  <img
                    className={styles.actorImage}
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <p className={styles.actorName}>{actor.name}</p>
                  <p className={styles.actorCharacter}>
                    Character: {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {similarMovie && (
          <>
            <h3>Similar Movies</h3>
            <div className={styles.movieList}>
              {similarMovie.map((movie) => (
                <Link to={`/movie/${movie.id}`}>
                  <div key={movie.id} className={styles.movieCard}>
                    <img
                      className={styles.movieImage}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <p className={styles.movieTitle}>{movie.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    )
  );
};

export default MoviesDetails;
