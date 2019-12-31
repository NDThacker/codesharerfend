import React from 'react';
import { signUpUser } from '../utils/api';


class SignUp extends React.Component {
	state = {
		form: {
			emailId: "",
			password: "",
			name: ""
		},
		formErrors: {
			emailId: "",
			password: "",
			name: ""
		},
		formValidity: {
			emailId: false,
			password: false,
			name: false,
			buttonActive: false
		},
		validCount: 0
	}
	validateField(field, value) {
		let formMessage = "";
		switch (field) {
			case "emailId":
				formMessage = (value.match(/^\w+@[a-zA-Z]{3,6}[.](com|co.in)$/) ? "" : "Enter a valid email id");
				break;
			case "password":
				formMessage = (value.match(/^(?=.*[a-z])(?=.*\d)(?=.*[@#&!])(?=.*[A-Z])[a-zA-Z0-9!@#&]{6,16}$/) ? "" : "Enter a strong password with at least one small, one capital letters as well as one digit and one special character from this list [ ! @ # &]");
				break;
			case "name":
				formMessage = (value.length >= 3 ? "" : "Name should be at least three characters long");
				break;
		}
		let formValidityObj = this.state.formValidity;
		let formErrorObj = this.state.formErrors;
		if (formMessage === "") {
			if (!this.state.formValidity[field]) {
				formValidityObj[field] = true;
				if(this.state.validCount == 2)
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
		signUpUser(this.state.form).then(udata => {
			//save udata somewhere
		}).catch(err => {
			console.log(err.message);
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className="container-fluid" style={{ width: "70%" }}>
					<h3 className="display-5 text-center">Sign Up</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="text"
								className="form-control" onChange={this.handleChange} name="emailId" id="email" placeholder="Enter your Email Id" />
							<div className="text-danger">{this.state.formErrors.emailId}</div>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password"
								className="form-control" onChange={this.handleChange} name="password" id="password" placeholder="your password" />
							<div className="text-danger">{this.state.formErrors.password}</div>
						</div>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input type="text"
								className="form-control" onChange={this.handleChange} name="name" id="name" placeholder="Enter your name" />
							<div className="text-danger">{this.state.formErrors.name}</div>
						</div>
						<div>
							<input type="submit" value="Sign Up" disabled={!this.state.formValidity.buttonActive} />
						</div>

					</form>
				</div>
			</React.Fragment>
		)
	}
}

export default SignUp;