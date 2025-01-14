import axios from "axios";

const apiKey = "daecc2030d9d538a823a8e0e08110341";

export const getPopularMoovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getNowPlayingMoovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTopRatedMoovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUpcomingMoovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/up_coming?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
