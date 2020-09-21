import axios from 'axios';
const api_key = '21dfd76ee363f31fc88ea75f5793b914';
const url = 'https://api.themoviedb.org/3/';

export const getSessionId = () => axios.get(`${url}authentication/guest_session/new?api_key=${api_key}`);

export const onTermSubmit = term => axios.get(`${url}search/multi?query=${term}&api_key=${api_key}`);

export const fetchMovieAPI = movieId => axios.get(`${url}movie/${movieId}?api_key=${api_key}`);

export const onMoviePost = (movieId, value, sessionid) =>
	axios.post(`${url}movie/${movieId}/rating?api_key=${api_key}&guest_session_id=${sessionid}`, {
		value: value,
	});
export const getMovieRating = sessionid =>
	axios.get(`${url}guest_session/${sessionid}/rated/movies?api_key=${api_key}&language=en-US&sort_by=created_at.asc`);
