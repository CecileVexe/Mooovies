import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiURL = "https://api.themoviedb.org/3/movie/";

export const getMoviesList = async (request: string, page: string = "1") => {
  try {
    const response = await axios.get(
      `${apiURL}${request}?api_key=${apiKey}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
