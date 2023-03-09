import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToStarredAction, removeFromStarredAction } from '../actions';

class ViewSnippet extends React.Component {


	state = {
		isStarred: false
	}
	addStarred = () => {
		this.props.dispatch(addToStarredAction(this.props.snippet._id));
		this.setState({ isStarred: true });
	}

	removeStarred = () => {
		this.props.dispatch(removeFromStarredAction(this.props.snippet._id));
		this.setState({ isStarred: false });
	}

	componentWillMount()
	{
		const snippet = this.props.snippet;
		this.setState({ isStarred: this.props.starNCreate.starred.includes(snippet._id)})
	}

	componentDidUpdate() {
		const snippet = this.props.snippet;

		if(this.state.isStarred !== this.props.starNCreate.starred.includes(snippet._id))
		{
			this.setState({ isStarred: this.props.starNCreate.starred.includes(snippet._id)})
		}
	}

	render() {
		const snippet = this.props.snippet;
		return (
			<React.Fragment>
				<div className="container-fluid">
					<h2 className="display-5 text-center">{snippet.title}&nbsp;{this.state.isStarred ?
						<span><i className="fas fa-star" aria-hidden="true" onClick={this.removeStarred}></i></span> :
						<span><i className="fa fa-star-o" aria-hidden="true" onClick={this.addStarred}></i></span>}</h2>
					<h5 className="text-left">Author: {snippet.author}</h5>
					<p>Created: {new Date(snippet.creationTime).toUTCString()}</p>
					<p>Modified: {new Date(snippet.modifiedTime).toUTCString()}</p>
					<p>Expiry: {new Date(snippet.expiryTime).toUTCString()}</p>
					<textarea rows="10" cols="40" value={snippet.content} readOnly></textarea>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		starNCreate: state.starNCreateReducer
	}
}

export default compose(connect(mapStateToProps), withRouter)(ViewSnippet);