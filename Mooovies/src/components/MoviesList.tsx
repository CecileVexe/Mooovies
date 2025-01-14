import React, { useEffect, useState } from "react";
import { getPopularMoovies } from "../services/moovies.service";
import { Movies } from "../types/moovies.type";

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

  console.log(popularMovies);

  return (
    !isLoading && (
      <div>
        <h1>Popular Movies</h1>
        <button>Now Playing</button>
        <button>Popular</button>
        <button>Top Rated</button>
        <button>Upcoming.</button>
        <form onSubmit={() => console.log("coucou")}>
          <input type="text" placeholder="Rechercher un film" />
          <button type="submit">Rechercher</button>
        </form>
        {popularMovies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width="300"
              height="450"
            />
            <p>{movie.overview}</p>
            <button>En savoir plus</button>
          </div>
        ))}
      </div>
    )
  );
};

export default MoviesList;
