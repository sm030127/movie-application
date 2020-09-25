import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './css/MovieDetails.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/actions';

const movie_url = 'https://image.tmdb.org/t/p/w185';

class MovieDetails extends React.Component {
	state = { rating: '', movie: '', error: false, casts: [] };
	async componentDidMount() {
		console.log(this.props, 'props of movie details');
		this.props.fetchMovie(this.props.match.params.movieId);
		const api_key = '21dfd76ee363f31fc88ea75f5793b914';
		const url = 'https://api.themoviedb.org/3/';
		const data = await axios.get(`${url}movie/${this.props.match.params.movieId}/credits?api_key=${api_key}`);
		const credits = data.data.cast;
		const TopThreeActors = credits.slice(0, 3);
		this.setState({ casts: TopThreeActors }, () => console.log('casts of state', this.state));
		console.log(TopThreeActors);
	}
	onInputChange = event => {
		this.setState({
			rating: event.target.value,
			movie: this.props.movie.original_title || this.props.movie.original_name,
		});
	};
	onFormSubmit = event => {
		event.preventDefault();
		const sessionId = localStorage.getItem('sessionId');
		if (
			[...this.state.rating].length >= 3 &&
			(this.state.rating.slice(2) !== '5' || this.state.rating.slice(2) !== '0')
		) {
			this.setState({
				error: true,
			});
		} else if ([...this.state.rating].length === 1) {
			this.setState({
				error: false,
			});
			this.props.onMoviePost(this.props.movie.id, this.state.rating, sessionId);
		}
	};
	renderCredits = () => {
		return this.state.casts.map(cast => (
			<div>
				<Link>{cast.character}</Link>
			</div>
		));
	};
	render() {
		return (
			<div className="Movie-detail-container">
				<div className="image-container">
					<img
						alt={this.props.movie.original_title || this.props.movie.original_name}
						src={`${movie_url}${this.props.movie.poster_path}`}
					/>
				</div>
				<div class="content-container">
					<div className="header">{this.props.movie.original_title || this.props.movie.original_name}</div>
					<div className="content">{this.props.movie.overview}</div>
					<div className="average-rating">Rating : {this.props.movie.vote_average}</div>
					<div className="total-reviews">Reviews : {this.props.movie.vote_count}</div>
					<form onSubmit={this.onFormSubmit}>
						<input type="text" placeholder="Rating" onChange={this.onInputChange}></input>
						{this.state.error && (
							<div className="error-msg">Please enter ratings in increments of 1 or .5</div>
						)}
						<div className="links-container">
							<div className="ratings-link">
								<Link
									to={{
										pathname: '/Ratings',
									}}
								>
									Ratings Page{' '}
								</Link>
							</div>
							<div className="home-link">
								<Link
									to={{
										pathname: '/',
									}}
								>
									Back to home{' '}
								</Link>
							</div>
						</div>
					</form>
					<div>
						Credits
						{this.renderCredits()}
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => ({ movie: state.movieReducer.selectedMovie, credits: state.movieReducer.credits });

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchMovie: actionCreators.fetchMovie,
			onMoviePost: actionCreators.onMoviePost,
			fetchCredits: actionCreators.fetchCredits,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieDetails));
