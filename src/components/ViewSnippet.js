import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToStarredAction } from '../actions';

class ViewSnippet extends React.Component {

	addStarred = () => {
		this.props.dispatch(addToStarredAction(this.state.snippet));
		this.setState({});
	}

	render() {
		const snippet = this.props.snippet;
		console.log(snippet);
		let isStarred = false;
		for (let snips of this.props.starNCreate.starred) {
			if (snips._id == snippet._id) {
				isStarred = true;
				break;
			}
		}
		return (
			<React.Fragment>
				<div className="container-fluid">
					<h2 className="display-5 text-center">{snippet.title}</h2>{isStarred ?
						<span><i className="fa fa-star" aria-hidden="true"></i></span> :
						<span>$<i className="fa fa-star-o" aria-hidden="true" onClick={this.addStarred}></i></span>}
					<h5 className="text-right">Author: {snippet.author}</h5>
					<p>Created: {new Date(snippet.creationTime).toUTCString()}</p>
					<p>Modified: {new Date(snippet.modifiedTime).toUTCString()}</p>
					<p>Expiry: {new Date(snippet.expiryTime).toUTCString()}</p>
					<textarea value={snippet.content}></textarea>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		uData: state.loggingReducer,
		starNCreate: state.starNCreateReducer
	}
}

export default compose(connect(mapStateToProps), withRouter)(ViewSnippet);