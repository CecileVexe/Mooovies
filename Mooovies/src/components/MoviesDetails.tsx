import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMoovieActors, getMoovieDetails } from "../services/movie.service";
import { Movie } from "../types/movie.type";
import { MovieActorDetails } from "../types/actor.type";

const MoviesDetails = () => {
  const [movie, setMovie] = useState<Movie>();
  const [movieActors, setMovieActors] = useState<MovieActorDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const getDatas = useCallback(async () => {
    setIsLoading(true);
    if (params.movieId) {
      const movieData = await getMoovieDetails(params.movieId);
      const actorData = await getMoovieActors(params.movieId);
      console.log(movieData);
      setMovie(movieData);
      setMovieActors(actorData);
      setIsLoading(false);
    }
  }, [params.movieId]);

  useEffect(() => {
    getDatas();
  }, [getDatas]);

  console.log("actors", JSON.stringify(movieActors));

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    movie && (
      <>
        <div>
          <h2>{movie.title}</h2>
          <button>Ajouter à la WishList</button>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.overview}</p>
          <p>
            Release Date: {new Date(movie.release_date).toLocaleDateString()}
          </p>
          <p>Popularity: {movie.popularity}</p>
          <p>Vote Average: {movie.vote_average}</p>
          <p>Vote Count: {movie.vote_count}</p>
          <p>Genre: {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p>
            Production Companies:{" "}
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}
          </p>
        </div>
        <div>
          {movieActors?.cast && (
            <>
              <h3>Actors</h3>
              {movieActors?.cast.map((actor, index) => {
                for (index; index < 10; index++) {
                  return (
                    <div key={actor.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                      />
                      <p>{actor.name}</p>
                      <p>Character: {actor.character}</p>
                    </div>
                  );
                }
              })}
            </>
          )}
        </div>
      </>
    )
  );
};

export default MoviesDetails;
