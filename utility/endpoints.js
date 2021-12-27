const apiKey = process.env.API_SECRET;
export const IMAGE_URL = 'https://image.tmdb.org/t/p/'
export const MOVIE_LIST = `discover/movie?api_key=${apiKey}`
export const GENRE_LIST = `genre/movie/list?api_key=${apiKey}`
export const MOVIE_DETAIL = (movieId) => `movie/${movieId}?api_key=${apiKey}`
export const MOVIE_CREDIT = (movieId) => `movie/${movieId}/credits?api_key=${apiKey}`
