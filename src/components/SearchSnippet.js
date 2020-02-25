import React from 'react';
import NavSearchBar from './NavSearchBar';
import { withRouter } from 'react-router-dom';
import { getSnippetById, searchSnippetByTitle } from '../utils/api';



class SearchSnippet extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchPhrase: "",
			sBy: "Title",
			fData: null
		};
	}
	getSearchPhrase = (sPhrase) => {
		this.setState({ searchPhrase: sPhrase });
		this.startSearch();
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	startSearch = () => {

		switch (this.state.sBy) {
			case "Title":
				searchSnippetByTitle(this.state.searchPhrase).then(data => {
					this.setState({ fData: data });
				}).catch(err => {
					console.log(err.message);
				})
			case "Id":
				getSnippetById(this.state.searchPhrase).then(data => {
					this.setState({ fData: data });
				}).catch(err => {
					console.log(err.message);
				})
		}
	}

	render() {
		return (
			<React.Fragment>
				<NavSearchBar />
				<h2>Searching</h2>
				<div className="container-fluid">
					<form>
						<div class="form-check form-check-inline">
							<label class="form-check-label">
								<input className="form-check-input" type="radio" name="sBy" value="Title" /> By Title
							</label>
							<label class="form-check-label">
								<input className="form-check-input" type="radio" name="sBy" value="Id" /> By ID
							</label>
						</div>
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(SearchSnippet);