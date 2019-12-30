import React from 'react';
import { withRouter } from 'react-router-dom';

class ViewSnippet extends React.Component {


	render() {
		const { snippet } = this.props;
		return (
			<React.Fragment>
				<div className="container-fluid">
					<h2 className="display-4 text-center">{snippet.title}</h2>
					<h5 className="text-right">Author: {snippet.author}</h5>
					<p>Created: { new Date(snippet.creationTime).toUTCString() }</p>
					<p>Modified: { new Date(snippet.modifiedTime).toUTCString() }</p>
					<p>Expiry: { new Date(snippet.expiryTime).toUTCString() }</p>
					<textarea value={snippet.content} ></textarea>
				</div>
			</React.Fragment>
		)
	}
}

export default withRouter(ViewSnippet);