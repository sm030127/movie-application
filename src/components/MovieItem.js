import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie, onMovieSelect }) => {
	console.log({ movie });
	return (
		<div className="item movie-item">
			<div className="content">
				<Link
					to={{
						pathname: `/movieDetails/${movie.id}/${movie.original_title ||
							movie.original_name ||
							movie.name}`,
						state: {
							movie: movie,
						},
					}}
				>
					{movie.original_title || movie.original_name || movie.name}
				</Link>
			</div>
		</div>
	);
};

export default MovieItem;
