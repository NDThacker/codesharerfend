import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';


class NavBar extends React.Component {
	render() {
		console.log(this.props);
		let isLoggedIn = Object.entries(this.props.uData).length > 0 ? true : false;

		return (
				<nav className="navbar navbar-expand-md bg-dark navbar-dark">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">Code Sharer</Link>
					</div>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/submitsnippet">Submit-A-Snippet</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/searchsnippet">Search-A-Snippet</Link>
						</li>
						{!isLoggedIn ? <React.Fragment><li className="nav-item ml-auto">
							<Link className="nav-link" to="/login">Log in</Link>
						</li>
							<li className="nav-item ml-auto">
								<Link className="nav-link" to="/signup">Sign up</Link>
							</li></React.Fragment> :
							<li className="nav-item ml-auto">Hellow, {this.props.uData.name}</li>}

					</ul>
				</nav>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		uData: state.loggingReducer
	}
}

export default compose(connect(mapStateToProps))(NavBar);