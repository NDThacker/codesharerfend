import React from 'react';
import ViewSnippet from './ViewSnippet';
import { withRouter } from 'react-router-dom';



class DisplaySnippets extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fData: this.props.fData,
			isArr: Array.isArray(this.props.fData),
			navigateToView: -1
		};
	}
	componentDidUpdate(prevProps)
	{
		if(prevProps !== this.props)
		this.setState({
			fData: this.props.fData,
			isArr: Array.isArray(this.props.fData),
			navigateToView: -1
		});
	}
	navigateToShow = (idx) => {
		this.setState({ navigateToView: idx })
	}
	render() {
		// console.log(this.state);
		if (this.state.navigateToView !== -1) {
			return (
				<React.Fragment>
					<ViewSnippet snippet={this.state.fData[0][this.state.navigateToView]} />
				</React.Fragment>
			);
		}
		if(this.state.isArr)
		{
			if (this.state.fData[0].length === 0)
				return (<React.Fragment><h4>No Search Results</h4></React.Fragment>);
			else if (this.state.fData[0].length > 0) {

				let size = this.state.fData[0].length;
				console.debug(this.state.fData);
				let colsNrow = [];
				
				for(let idx = 0; idx < size; idx = idx + 3)
				{
					let cols2 = []
					cols2.push(<div className='col-md-3' key={idx} >
						<span onClick={() =>  this.navigateToShow(idx) }><h4>{"Title: " + this.state.fData[0][idx].title}</h4></span>
						<h5>{"Author: " + this.state.fData[0][idx].author}</h5>
						</div>);

					if(idx + 1 < size)
					{
						cols2.push(<div className='col-md-3' key={idx+1} >
							<span onClick={() =>  this.navigateToShow(idx+1) }><h4>{"Title: " + this.state.fData[0][idx+1].title}</h4></span>
							<h5>{"Author: " + this.state.fData[0][idx+1].author}</h5>
							</div>);
					}
					if(idx + 2 < size)
					{
						cols2.push(<div className='col-md-3' key={idx+2} >
							<span onClick={() =>  this.navigateToShow(idx+2) }><h4>{"Title: " + this.state.fData[0][idx+2].title}</h4></span>
							<h5>{"Author: " + this.state.fData[0][idx+2].author}</h5>
							</div>);
					}

					console.debug(cols2)
					colsNrow.push(<div key={idx} className="row">
						{cols2}
					</div>);

				}
				return (
					<React.Fragment>
						
						<div className='container-fluid'>
							{colsNrow}
						</div>
					</React.Fragment>
				);
				
			}
		}
		
		else if(this.state.fData)
		{
			return (
				<React.Fragment>
					<ViewSnippet snippet={this.state.fData}></ViewSnippet>
				</React.Fragment>
			);
		}
		else return (<React.Fragment><h4>No Search Results</h4></React.Fragment>);
	}

}

export default withRouter(DisplaySnippets);




