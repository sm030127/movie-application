import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/actions';

const MovieHome = lazy(() => import('./MovieHome'));
const MovieDetails = lazy(() => import('./MovieDetails'));
const RatingsList = lazy(() => import('./RatingsList'));

class App extends React.Component {
	state = { movies: [], selectedMovie: {}, imgUrl: null, myRatingsList: [], Sessionid: '' };
	async componentDidMount() {
		const sessionId = localStorage.getItem('sessionId');
		if (!sessionId) {
			await this.props.getSessionID();
		}
	}
	onMovieSelect = movie => {
		this.setState({ selectedMovie: movie });
		this.fetchMoviePoster(movie);
	};
	addRatingToList = ratingObj => {
		let newRatingList = this.state.myRatingsList;
		newRatingList.push(ratingObj);
		this.setState({ myRatingsList: newRatingList });
	};
	render() {
		return (
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Route path="/" exact render={props => <MovieHome {...props} />} />
					<Route path="/movieDetails/:movieId/:movieName" render={props => <MovieDetails {...props} />} />
					<Route path="/Ratings" render={props => <RatingsList {...props} />} />
				</Suspense>
			</BrowserRouter>
		);
	}
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getSessionID: actionCreators.getSessionID,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(App);
