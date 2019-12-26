import React from 'react';

class ViewSnippet extends React.Component {


	render() {
		const { snippet } = this.props;

		return (
			<React.Fragment>
				<div className="container-fluid">
					<h2 className="display-4 text-center">{snippet.title}</h2>
					<h3 className="display-5 text-right">Author: {snippet.author}</h3>
					<p>Created: {snippet.creationTime}</p>
					<p>Modified: {snippet.modifiedTime}</p>
					<p>Expiry: {snippet.expiryTime}</p>
					<textarea defaultValue={snippet.content} disabled></textarea>
				</div>
			</React.Fragment>
		)
	}
}

export default ViewSnippet;