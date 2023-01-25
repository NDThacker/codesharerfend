import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';


class NavBar extends React.Component {

	render() {
		// console.log(this.props);
		let isLoggedIn = Object.entries(this.props.uData).length > 0 ? true : false;
		console.debug(this.props);

		return (
			<nav className="navbar navbar-expand-md bg-dark navbar-dark">
				<div className="navbar-header">
					<Link className="navbar-brand" to="/home">Code Sharer</Link>
				</div>
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" to="/submitsnippet">Submit-A-Snippet</Link>
					</li>
					<li className="nav-item" id="searchLink">
						<Link className="nav-link" to="/searchsnippet">Search-A-Snippet</Link>
					</li>
				</ul>
				<ul className="navbar-nav ml-auto">
					{!isLoggedIn ? <React.Fragment><li className="nav-item ml-auto">
						<Link className="nav-link" to="/login">Log in</Link>
					</li>
						<li className="nav-item">
							<Link className="nav-link" to="/signup">Sign up</Link>
						</li></React.Fragment> :<React.Fragment>
						<li className="nav-item text-light">Hellow, {this.props.uData.name}</li>
						<li className="nav-item ml-auto">
						<Link className="nav-link" to="/logout">Log out</Link>
					</li>
						</React.Fragment>}

				</ul>
			</nav>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		uData: state.loggingReducer,
		starNCreate: state.starNCreateReducer
	}
}

export default compose(connect(mapStateToProps))(NavBar);