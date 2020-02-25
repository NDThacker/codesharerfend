import React from 'react';
import ViewSnippet from './ViewSnippet';
import NavBar from './NavBar';
import { getSnippetById } from '../utils/api';
import { withRouter } from 'react-router-dom';


class FetchSnippet extends React.Component {

	state = {
		snippet: {}
	};
	constructor(props) {
		super(props);
		this.id = this.props.match.params.sid;
		getSnippetById(this.id).then(sdata => {
			this.state.snippet = sdata;
			// console.log(sdata);
			this.setState({})
		}).catch(err => {
			console.log(err.message);
		})
	}

	render() {
		return (
			<React.Fragment>
				<NavBar />
				<ViewSnippet snippet={this.state.snippet}></ViewSnippet>
			</React.Fragment>
		)
	}
}

export default withRouter(FetchSnippet);