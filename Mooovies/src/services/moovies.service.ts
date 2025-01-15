import axios from "axios";

const apiKey = "daecc2030d9d538a823a8e0e08110341";
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
