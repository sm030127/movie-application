import { combineReducers } from 'redux';
import { actions } from './actions';

const initialState = {
	movies: [],
	selectedMovie: {},
	imgUrl: null,
	myRatingsList: [],
	Sessionid: localStorage.getItem('sessionId') || '',
	ratingMessage: '',
};

const movieReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.fetchSessionId + '_FULFILLED':
			localStorage.setItem('sessionId', action.payload.data.guest_session_id);
			return Object.assign({}, state, {
				Sessionid: action.payload.data.guest_session_id,
			});
		case actions.searchMovie + '_FULFILLED':
			return Object.assign({}, state, {
				movies: action.payload.data.results,
			});
		case actions.submitRaiting + '_FULFILLED':
			return Object.assign({}, state, { ratingMessage: action.payload.data });
		case actions.fetchMovie + '_FULFILLED':
			return Object.assign({}, state, { selectedMovie: action.payload.data });
		case actions.fetchRating + '_FULFILLED':
			return Object.assign({}, state, { myRatingsList: action.payload.data.results });
		default:
			return state;
	}
};

export default combineReducers({ movieReducer });
