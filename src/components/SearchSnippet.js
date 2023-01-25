import React from 'react';
import NavSearchBar from './NavSearchBar';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import { getSnippetById, searchSnippetByTitle } from '../utils/api';
import DisplaySnippets from './DisplaySnippets';



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
		this.startSearch(sPhrase);
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	startSearch = (sPhrase) => {

		switch (this.state.sBy) {
			case "Title":
				searchSnippetByTitle(sPhrase).then(data => {
					this.setState({ fData: data });
				}).catch(err => {
					console.log(err.message);
				})
				break;
			case "Id":
				getSnippetById(sPhrase).then(data => {
					this.setState({ fData: data });
				}).catch(err => {
					this.setState({ fData: null })
					console.log(err.message);
				})
		}
	}

	render() {
		let res = null;
		if (this.state.fData !== null) {
			res = <DisplaySnippets fData={this.state.fData} />
		}
		return (
			<React.Fragment>
				<NavSearchBar cback={this.startSearch} />
				<div className="container-fluid">
					<form>
						<div className="form-check form-check-inline">
							<label className="form-check-label">
								<input className="form-check-input" type="radio" name="sBy" value="Title" checked={this.state.sBy == "Title"} onChange={this.handleChange} /> By Title
							</label>
							<label className="form-check-label">
								<input className="form-check-input" type="radio" name="sBy" value="Id" checked={this.state.sBy == "Id"} onChange={this.handleChange} /> By ID
							</label>
						</div>
					</form>
				</div>
				<div>{res}</div>
			</React.Fragment>
		);
	}
}

export default withRouter(SearchSnippet);