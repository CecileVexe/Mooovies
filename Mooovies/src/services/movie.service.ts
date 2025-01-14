import axios from "axios";

const apiKey = "daecc2030d9d538a823a8e0e08110341";

export const getMoovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMoovieActors = async (movieId: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchMovie = async (search: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key?api_key=${apiKey}&query=${search}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
