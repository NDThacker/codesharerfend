import React from 'react';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';



class Home extends React.Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<h2>Home</h2>
			</React.Fragment>);
	}
}

export default withRouter(Home);