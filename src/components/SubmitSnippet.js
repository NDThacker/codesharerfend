import React from 'react';
import { submitSnippet } from '../utils/api';


class SubmitSnippet extends React.Component {

	state = {
		form: {
			expiryTime: null,
			author: "",
			title: "",
			content: ""
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
		validCount: 0,
		errorMessage: "",
		successMessage: ""
	}

	handleChange = event => {
		const field = event.target.name;
		const enteredValue = event.target.value;
		const newFormObj = this.state.form;
		newFormObj[field] = enteredValue;
		this.validateField(field, enteredValue);
		this.setState({});
	}
	validateField = (field, value) => {
		let formMessage = "";
		switch (field) {
			case "author":
				value.length >= 3 ? formMessage = "" : formMessage = "Author's name must be 3 characters long";
				break;
			case "title":
				value.length >= 4 ? formMessage = "" : formMessage = "title should be at least 4 characters long";
				break;
			case "content":
				value.length >= 5 ? formMessage = "" : formMessage = "content should be at least 5 characters long";
				break;
			default:
				break;
		}
		if (formMessage = "") {
			if (!this.state.formValidity[field]) {
				this.setState({ validCount: this.state.validCount + 1 });
			}
			if (this.state.validCount == 3) {
				let formValidityObj = this.state.formValidity;
				formValidityObj["buttonActive"] = true;
				this.setState({});
			}
		}
		else {
			let formErrorObj = this.state.formErrors;
			formErrorObj[field] = formMessage;
			if(this.state.formValidity[field])
			{
				let formValidityObj = this.state.formValidity;
				formValidityObj["buttonActive"] = false;
				this.setState({ validCount: this.state.validCount - 1 });
			}
		}

	}
	handleSubmit = (event) => {
		event.preventDefault();
		submitSnippet(this.state.form).then(sid => {
			//navigate to show snippet with generated id
		}).catch(err => {

		});
	}
	render() {
		return (
			<React.Fragment>
				<div className="container-fluid">
					<form onSubmit={this.handleSubmit}>
						<h2 className="display-4 text-center">Add a New Snippet</h2>
						<div class="form-group">
						  <label for="author">Author</label>
						  <input type="text" class="form-control" name="author" id="author" onChange={this.handleChange} placeholder="Author e.g Brendan Eich" />
						  <div class="text-danger">{this.state.formErrors.author}</div>
						</div>
						<div class="form-group">
						  <label for="title">Title</label>
						  <input type="text" class="form-control" name="title" id="title" onChange={this.handleChange} placeholder="Title for the snippet" />
						  <div class="text-danger">{this.state.formErrors.title}</div>
						</div>
						<div class="form-group">
						  <label for="expdate">Expiry Date</label>
						  <input type="date" class="form-control" name="expiryTime" id="expdate" onChange={this.handleChange} />
						</div>
						<div class="form-group">
						  <label for="content">Content</label>
						  <textarea cols="50" rows="30" class="form-control" name="content" id="content" onChange={this.handleChange} placeholder="Write your content you want to share" />
						  <div class="text-danger">{this.state.formErrors.content}</div>
						</div>
					</form>
				</div>
			</React.Fragment>
		)
	}

}