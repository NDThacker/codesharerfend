import React from 'react';
import { loginUser } from '../utils/api';


class SignUp extends React.Component {
	state = {
		form: {
			emailId: "",
			password: ""
		},
		formErrors: {
			emailId: "",
			password: ""
		},
		formValid: {
			emailId: false,
			password: false,
			buttonActive: false
		},
		validCount: 0
	}
	validateField(field, value) {
		let formMessage = "";

		switch (field) {
			case "emailId":
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
				this.setState({ validCount: this.state.validCount + 1 });
			}
			if (this.state.validCount === 2) {
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
						<div>
							<input type="submit" value="Log In" disabled={!this.state.formValid.buttonActive} />
						</div>
					</form>
				</div>
			</React.Fragment>
		)
	}

}