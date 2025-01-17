import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiURL = "https://api.themoviedb.org/3/movie/";

export const getMoovieDetails = async (movieId: string) => {
  try {
    const response = await axios.get(`${apiURL}${movieId}?api_key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMoovieActors = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${apiURL}${movieId}/credits?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchMovie = async (search: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSimilarMovie = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${apiURL}${movieId}/similar?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
