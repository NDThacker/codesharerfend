import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logInUser } from '../utils/api';
import NavBar from './NavBar';
// Actions
import { logInAction, initCreated, initStarred } from '../actions';


class LogIn extends React.Component {
	state = {
		form: {
			email: "",
			password: ""
		},
		formErrors: {
			email: "",
			password: ""
		},
		formValidity: {
			email: false,
			password: false,
			buttonActive: false
		},
		validCount: 0,
		formError: ""
	}
	validateField(field, value) {
		let formMessage = "";

		switch (field) {
			case "email":
				formMessage = (value.length > 0 ? "" : "Required field");
				break;
			case "password":
				formMessage = (value.length > 0 ? "" : "Required field");
				break;
		}
		let formValidityObj = this.state.formValidity;
		let formErrorObj = this.state.formErrors;
		if (formMessage === "") {
			if (!this.state.formValidity[field]) {
				formValidityObj[field] = true;
				if(this.state.validCount == 1)
					formValidityObj["buttonActive"] = true;
				this.setState({ validCount: this.state.validCount + 1 });
			}
			formErrorObj[field] = "";
			this.setState({});
		}
		else {
			formErrorObj[field] = formMessage;
			if (this.state.formValidity[field]) {
				formValidityObj["buttonActive"] = false;
				formValidityObj[field] = false;
				this.setState({ validCount: this.state.validCount - 1 });
			}
			this.setState({});
		}
	}
	handleChange = event => {
		const field = event.target.name;
		const enteredValue = event.target.value;
		const newFormObj = this.state.form;
		newFormObj[field] = enteredValue;
		this.validateField(field, enteredValue);
		this.setState({});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		logInUser(this.state.form).then(udata => {
			//save udata somewhere
			
			this.props.dispatch(initCreated(udata.created));
			this.props.dispatch(initStarred(udata.starred));
			delete udata.starred;
			delete udata.created;
			// console.log(udata);
			this.props.dispatch(logInAction(udata));
			this.props.history.push("/");
		}).catch(err => {
			this.setState({ formError: err.message });
		});
	}

	render() {
		return (
			<React.Fragment>
				<NavBar />
				<div className="container-fluid" style={{ width: "70%" }}>
					<h3 className="display-5 text-center">Log In</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="text"
								className="form-control" onChange={this.handleChange} name="email" id="email" placeholder="Enter your Email Id" />
							<div className="text-danger">{this.state.formErrors.email}</div>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password"
								className="form-control" onChange={this.handleChange} name="password" id="password" placeholder="your password" />
							<div className="text-danger">{this.state.formErrors.password}</div>
						</div>
						<div>
							<input type="submit" className="btn btn-primary" value="Log In" disabled={!this.state.formValidity.buttonActive} />
						</div>
						<span className="text-danger">{this.state.formError}</span>
					</form>
				</div>
			</React.Fragment>
		)
	}

}

export default compose(connect(), withRouter)(LogIn);