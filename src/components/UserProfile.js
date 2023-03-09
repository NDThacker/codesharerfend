import React from 'react';
import NavBar from './NavBar';
import {withRouter, Link} from 'react-router-dom';
import { compose } from 'redux';
import {connect} from 'react-redux';

class UserProfile extends React.Component {

	
	render()
	{
		let createdSnips = []
		this.props.starNCreate.created.forEach((sid) => {
			createdSnips.push(<li key={sid} className="nav-item"><Link className="nav-link" to={"/fetchsnippet/"+sid}>
			{sid}</Link></li>)});
		
		let starredSnips = []
		this.props.starNCreate.starred.forEach((sid) => {
			starredSnips.push(<li key={sid} className="nav-item"><Link className="nav-link" to={"/fetchsnippet/"+sid}>
			{sid}</Link></li>)});

		return (
			<React.Fragment>
				<NavBar />
				<div className="container-fluid">
					<h3 className="display-4 text-center">Your Profile</h3>
					<h5>Email: </h5><p>{this.props.uData._id}</p>
					<h5>Name: </h5><p>{this.props.uData.name}</p>
					<div>
						<h3>Created Snippets: </h3><p>{this.props.starNCreate.created.length}</p>
						<ul>{createdSnips}</ul>
					</div>
					<div>
						<h3>Starred Snippets: </h3><p>{this.props.starNCreate.starred.length}</p>
						<ul>{starredSnips}</ul>
					</div>


				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		uData: state.loggingReducer,
		starNCreate: state.starNCreateReducer
	}
}

export default compose(connect(mapStateToProps), withRouter)(UserProfile);
