import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logOutAction, emptyStarred, emptyCreated } from '../actions';
import { updateCreatedInUser, updateStarredInUser} from '../utils/api';


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

	handleLogOut = async (event) => {
		console.log(this.props.starNCreate.starred);
		let responseStarred = await updateStarredInUser(this.props.starNCreate.starred, this.props.uData._id);
		let responseCreated = await updateCreatedInUser(this.props.starNCreate.created, this.props.uData._id);
		this.props.dispatch(logOutAction());
		this.props.dispatch(emptyCreated());
		this.props.dispatch(emptyStarred());
		if(responseCreated && responseStarred)
		{
			this.props.history.push("/")
		}
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
						</li></React.Fragment> :<React.Fragment>
						<li className="nav-link text-light">Hellow,<Link className="text-light" to="/userprofile" tooltip="Go to My profile"> {this.props.uData.name}</Link>&nbsp;&nbsp;</li>
						<li className="nav-link" onClick={this.handleLogOut}>Log out</li>
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

export default compose(connect(mapStateToProps), withRouter)(NavBar);