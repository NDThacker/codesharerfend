import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ViewSnippet extends React.Component {


	render() {
		const { snippet } = this.props;
		let isStarred = false;
		for(let snips of this.props.uData.starred)
		{
			if(snips._id == snippet._id)
			{
				isStarred = true;
				break;
			}
		}
		return (
			<React.Fragment>
				<div className="container-fluid">
					<h2 className="display-5 text-center">{snippet.title}</h2>{isStarred && <span><i class="fa fa-star" aria-hidden="true"></i></span>}
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
		uData: state.loggingReducer
	}	
}

export default compose(connect(mapStateToProps), withRouter)(ViewSnippet);