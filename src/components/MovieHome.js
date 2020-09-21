import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

const MovieHome = () => {
	return (
		<div className="ui container">
			<SearchBar />
			<div className="ui grid">
				<div className="ten wide column">
					<MovieList />
				</div>
			</div>
		</div>
	);
};
export default MovieHome;
