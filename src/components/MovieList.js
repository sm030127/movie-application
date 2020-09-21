import React from 'react';

import MovieItem from './MovieItem';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const MovieList = ({ movies }) => {
	const renderList = movies.map(movie => {
		return <MovieItem key={movie.id} movie={movie} />;
	});
	return <div className="ui relaxed divided list">{renderList}</div>;
};
const mapStateToProps = state => ({ movies: state.movieReducer.movies });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
