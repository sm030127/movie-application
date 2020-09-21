import { getSessionId, onTermSubmit, fetchMovieAPI, onMoviePost, getMovieRating } from '../apis';

const fetchSessionId = 'FETCH_SESSIONID';
const submitRaiting = 'SUBMIT_RAITING';
const searchMovie = 'SEARCH_MOVIE';
const fetchMovie = 'FETCH_MOVIE';
const selectMovie = 'SELECT_MOVIE';
const fetchRating = 'FETCH_RAITING';

export const actions = {
	fetchSessionId,
	submitRaiting,
	searchMovie,
	fetchMovie,
	selectMovie,
	fetchRating,
};

export const actionCreators = {
	getSessionID: () => ({
		type: actions.fetchSessionId,
		payload: getSessionId(),
	}),
	onTermSubmit: term => ({
		type: actions.searchMovie,
		payload: onTermSubmit(term),
	}),
	fetchMovie: movieId => ({
		type: actions.fetchMovie,
		payload: fetchMovieAPI(movieId),
	}),

	onMoviePost: (movieId, value, sessionid) => ({
		type: actions.submitRaiting,
		payload: onMoviePost(movieId, value, sessionid),
	}),
	MovieRating: sessionid => ({
		type: actions.fetchRating,
		payload: getMovieRating(sessionid),
	}),
};
