import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import NavBar from './NavBar';

//Import Actions
import { logOutAction } from '../actions';

class LogOut extends React.Component
{
	render()
	{
		return '';
	}
}

export default LogOut;