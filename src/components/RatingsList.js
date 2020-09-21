import React, { useEffect } from 'react';
import './css/RatingList.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/actions';

const RatingList = ({ sessionId, MovieRating, myRatingsList }) => {
	useEffect(() => {
		MovieRating(sessionId);
	}, [sessionId]);
	const renderRatingsList = myRatingsList.map(rating => {
		return (
			<div className="ratings-items" key={rating.title}>
				<div className="">Movie:{rating.title || rating.original_title}</div>
				<div className="">Rating:{rating.rating}</div>
			</div>
		);
	});
	return (
		<div className="ratings-container">
			<div className="ratings-header">
				<div className="">Movie</div>
				<div className="">Rating</div>
			</div>
			{renderRatingsList}
		</div>
	);
};
const mapStateToProps = state => ({
	myRatingsList: state.movieReducer.myRatingsList,
	sessionId: state.movieReducer.Sessionid,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			MovieRating: actionCreators.MovieRating,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(RatingList);
