import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDZiYzk4YjQ0ZDVhYjdlNmRlZTU1NzA3Y2YwZWJkNCIsIm5iZiI6MTczMjI3MTc2Ny43NTQ2NjA0LCJzdWIiOiI2NjNjYmFlZDU4M2I1NGIyMGIxZWNkZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3WfTuc4_40dabypUXXC9GBTisB6kTXoPz51FhQCPNco';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
};
export const fetchTrendMovies = async () => {
  try {
    const response = await axios.get('trending/movie/week', options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
};

export const fetchQueryMovie = async query => {
  try {
    const response = await axios.get('search/movie', {
      ...options,
      params: { query },
    });
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
};

export const fetchMovieById = async movieId => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
};

export const getCast = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const getReviews = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  console.log(response.data.results);
  return response.data.results;
};

getReviews(382322);
