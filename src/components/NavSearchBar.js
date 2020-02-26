import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';


class NavBar extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			sPhrase: ""
		}
	}
	startSearch = () => {
		this.props.cback(this.state.sPhrase);
	}
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {

		let isLoggedIn = Object.entries(this.props.uData).length > 0 ? true : false;

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
					<input type="text" placeholder="Enter your keywords" name="sPhrase" value={this.state.sPhrase} onChange={this.handleChange} id="searchBar" /><button onClick={this.startSearch} id="searchButton"><i className="fa fa-search"></i></button>
					</li>
				</ul>
				<ul className="navbar-nav ml-auto">
					{!isLoggedIn ? <React.Fragment><li className="nav-item ml-auto">
						<Link className="nav-link" to="/login">Log in</Link>
					</li>
						<li className="nav-item">
							<Link className="nav-link" to="/signup">Sign up</Link>
						</li></React.Fragment> :
						<li className="nav-item text-light">Hellow, {this.props.uData.name}</li>}

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