import React from 'react';
import NavBar from './NavBar';
import DisplaySnippets from './DisplaySnippets';
import { withRouter } from 'react-router-dom';
import { getRecentSnippets} from '../utils/api'



class Home extends React.Component {

	 constructor(props)
	{
		super(props);
		this.state =  {
			sData: null,
			apiCalled: false
		}
	}
	handleSnippetData = () => {
		getRecentSnippets().then(sdata => {
			this.setState({sData: sdata, apiCalled: true});
		}).catch(err => {
			console.log(err.message);
		})
	}



	render() {
		if(!this.state.apiCalled)
		{
			this.handleSnippetData();
			return "Loading...";
		}
		return (
			<React.Fragment>
				<NavBar />
				<DisplaySnippets fData={this.state.sData} />
			</React.Fragment>);
	}
}

export default withRouter(Home);