import React from 'react';
import ViewSnippet from './ViewSnippet';
import { getSnippetById } from '../utils/api';
import { withRouter } from 'react-router-dom';


class FetchSnippet extends React.Component {
	
	state = {
		snippet : {}
	};
	constructor(props) {
		super(props);
		this.id = this.props.match.params.sid;
		getSnippetById(this.id).then(sdata => {
			this.state.snippet = sdata;
			this.setState({})
		}).catch(err => {
			console.log(err.message);
		})
	}

	render() {
		return (
			<ViewSnippet snippet={this.state.snippet}></ViewSnippet>
		)
	}
}

export default withRouter(FetchSnippet);