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
				let cols = []
				this.state.fData[0].map((val, idx) => {
					cols.push(<div className='col-md-3' key={idx} >
						<span onClick={() =>  this.navigateToShow(idx) }><h4>{"Title: " + val.title}</h4></span>
						<h5>{"Author: " + val.author}</h5>
					</div>);
				});
				// let size = cols.length;
				// let finalJSX = null;
				// if (size >= 3) {
				// 	finalJSX = <div className='row'>
				// 		{cols[0]}
				// 		{cols[1]}
				// 		{cols[2]}
				// 	</div>;
				// 	let rem = 2;
				// 	rem++;
				// 	while (rem < size) {
				// 		finalJSX += (<div className='row'>
				// 			{rem < size ? cols[rem] : null}
				// 			{rem + 1 < size ? cols[rem + 1] : null}
				// 			{rem + 2 < size ? cols[rem + 2] : null}
				// 		</div>);
				// 		rem += 2;
				// 	}
				// }
				// else {
				// 	finalJSX = <div className='row'>
				// 		{cols[0]}
				// 		{1 < size ? cols[1] : null}
				// 		{2 < size ? cols[2] : null}
				// 	</div>
				// }
				// console.log(finalJSX);
				let finalJSX2 = <div className='row'>
					{cols}
				</div>
				return (
					<React.Fragment>
						
						<div className='container-fluid'>
							{finalJSX2}
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




