import React from 'react';
//import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SubmitSnippet from './components/SubmitSnippet';
import FetchSnippet from './components/FetchSnippet';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import SearchSnippet from './components/SearchSnippet';
import Home from './components/Home';


class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Router>
					<Switch>
						<Route exact path="/login" component={LogIn} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/submitsnippet" component={SubmitSnippet} />
						<Route exact path="/fetchsnippet/:sid" component={FetchSnippet} />
						<Route exact path="/searchsnippet" component={SearchSnippet} />
						<Route path="/*" component={Home} />
					</Switch>
				</Router>
			</React.Fragment>

		)
	}
}

export default App;