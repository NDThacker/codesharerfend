import React from 'react';
import NavBar from './NavBar';
import { submitSnippet, submitSnippetToUser } from '../utils/api';
import { withRouter } from 'react-router-dom';


class SubmitSnippet extends React.Component {

	state = {
		form: {
			expiryTime: null,
			author: "",
			title: "",
			content: "",
			visibility: "Public"
		},
		formErrors: {
			author: "",
			title: "",
			content: ""
		},
		formValidity: {
			author: false,
			title: false,
			content: false,
			buttonActive: false
		},
		isLoggedIn: false,
		logInEmail: "",
		validCount: 0
	}

	handleChange = event => {
		const field = event.target.name;
		const enteredValue = event.target.value;
		const newFormObj = this.state.form;
		newFormObj[field] = enteredValue;
		field != 'visibility' ? this.validateField(field, enteredValue) : null;
		this.setState({});
	}
	validateField = (field, value) => {
		let formMessage = "";
		switch (field) {
			case "author":
				value.length >= 3 ? formMessage = "" : formMessage = "Author's name must be 3 characters long";
				break;
			case "title":
				value.length >= 4 ? formMessage = "" : formMessage = "Title should be at least 4 characters long";
				break;
			case "content":
				value.length >= 5 ? formMessage = "" : formMessage = "Content should be at least 5 characters long";
				break;
			default:
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
	handleSubmit = (event) => {
		event.preventDefault();
		submitSnippet(this.state.form).then(sid => {
			//navigate to show snippet with generated id
			if (this.state.isLoggedIn) {
				submitSnippetToUser(this.state.form, sid, this.state.logInEmail).then(status => {
					this.props.history.push('/fetchsnippet/' + sid.url);	
				}).catch(err => {
					console.log(err.message);
				})
			}
			else {
				this.props.history.push('/fetchsnippet/' + sid.url);
			}
		}).catch(err => {
			console.log(err.message);
		});
	}
	minDate = () => {
		document.getElementById("expdate").setAttribute("min", new Date().toISOString().replace(/\//g, "-").substring(0, 10));
	}
	render() {

		return (
			<React.Fragment>
				<NavBar />
				<div className="container-fluid" style={{ width: "70%" }}>
					<form onSubmit={this.handleSubmit}>
						<h2 className="display-4 text-center">Add a New Snippet</h2>
						<div className="form-group">
							<label htmlFor="author">Author</label>
							<input type="text" className="form-control" name="author" id="author" onChange={this.handleChange} placeholder="Author e.g Brendan Eich" />
							<div className="text-danger">{this.state.formErrors.author}</div>
						</div>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="form-control" name="title" id="title" onChange={this.handleChange} placeholder="Title for the snippet" />
							<div className="text-danger">{this.state.formErrors.title}</div>
						</div>
						<div className="form-group">
							<label htmlFor="expdate">Expiry Date</label>
							<input type="date" onFocus={this.minDate} className="form-control" name="expiryTime" id="expdate" onChange={this.handleChange} />
						</div>
						<div className="form-group">
							<label htmlFor="content">Content</label>
							<textarea cols="40" rows="15" className="form-control" name="content" id="content" onChange={this.handleChange} placeholder="Write your content you want to share" />
							<div className="text-danger">{this.state.formErrors.content}</div>
						</div>
						<div className="form-check form-check-inline">
							<label className="form-check-label">
								<input className="form-check-input" onChange={this.handleChange} type="radio" name="visibility" id="vpub" value="Public" checked={this.state.form.visibility == "Private"} />Public</label>
							<label className="form-check-label">
								<input disabled={!this.state.isLoggedIn} onChange={this.handleChange} checked={this.state.form.visibility == "Private"} className="form-check-input" type="radio" name="visibility" id="vpriv" value="Private" />Private</label>
							&nbsp;<span><small>Usable only if you are a logged in user</small></span>
						</div>
						<div>
							<input type="submit" className="btn btn-primary" value="Submit Snippet" disabled={!this.state.formValidity.buttonActive} />
						</div>
					</form>
				</div>
			</React.Fragment>
		)
	}

}

export default withRouter(SubmitSnippet);