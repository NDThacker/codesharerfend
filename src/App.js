import React from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SubmitSnippet from './components/SubmitSnippet';
import FetchSnippet from './components/FetchSnippet';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';


class App extends React.Component {
	render() {

		return (
			<React.Fragment>
				<Router>
				<Navbar/>
				
					<Switch>
						<Route exact path="/login" component={LogIn} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/submitsnippet" component={SubmitSnippet} />
						<Route exact path="/fetchsnippet/:sid" component={FetchSnippet} />
					</Switch>
				</Router>
			</React.Fragment>

		)
	}
}

export default App;