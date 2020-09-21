import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/actions';

class SearchBar extends React.Component {
	state = { term: '' };

	onInputChange = event => {
		this.setState({ term: event.target.value });
	};

	onFormSubmit = event => {
		event.preventDefault();
		this.props.onTermSubmit(this.state.term);
	};

	render() {
		return (
			<div className="search-bar ui segment">
				<form className="ui form" onSubmit={this.onFormSubmit}>
					<div className="field">
						<label>Movie Database</label>
						<input
							type="text"
							placeholder="Search for a movie..."
							value={this.state.term}
							onChange={this.onInputChange}
						/>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			onTermSubmit: actionCreators.onTermSubmit,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
