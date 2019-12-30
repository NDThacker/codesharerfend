import React from 'react';
import { signUp } from '../utils/api';


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
		formValid: {
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
				this.setState({ validCount: this.state.validCount + 1 });
			}
			if (this.state.validCount === 3) {
				formValidityObj["buttonActive"] = true;
			}
			formErrorObj[field] = "";
			this.setState({});
		}
		else {
			formErrorObj[field] = formMessage;
			if (this.state.formValidity[field]) {
				formValidityObj["buttonActive"] = false;
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
		signUp(this.state.form).then(udata => {
			//save udata somewhere
		}).catch(err => {
			console.log(err.message);
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className="container-fluid" style={{ width: "70%" }}>
					<form onSubmit={this.handleSubmit}>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="text"
								class="form-control" onChange={this.handleChange} name="email" id="email" placeholder="Enter your EmailId" />
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input type="password"
								class="form-control" onChange={this.handleChange} name="password" id="password" placeholder="Enter a strong password having one capital, one small alphabet as well as one digit and one special character [!, @, #, &]" />
						</div>
						<div class="form-group">
							<label for="name">Name</label>
							<input type="text"
								class="form-control" onChange={this.handleChange} name="name" id="name" placeholder="Enter your name" />
						</div>
						<div>
							<input type="submit" value="Log In" disabled={!this.state.formValid.buttonActive} />
						</div>

					</form>
				</div>
			</React.Fragment>
		)
	}

}