import React from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SubmitSnippet from './components/SubmitSnippet';
import FetchSnippet from './components/FetchSnippet';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';


class App extends React.Component {
	render() {

		return (
			<Router>
				<nav className="navbar navbar-expand-md bg-dark navbar-dark">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">Code Sharer</Link>
					</div>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/login">Log in</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/signup">Sign up</Link>
						</li>
						{/* <li className="nav-item">
							<Link className="nav-link" to="/viewsnippet">View Snippet</Link>
						</li> */}
						<li className="nav-item">
							<Link className="nav-link" to="/submitsnippet">Submit Snippet</Link>
						</li>
					</ul>
				</nav>
				<br />
				<Switch>
					<Route exact path="/login" component={LogIn} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/submitsnippet" component={SubmitSnippet} />
					{/* <Route exact path="/viewsnippet" component={ViewSnippet} /> */}
					<Route exact path="/fetchsnippet/:sid" component={FetchSnippet} />
				</Switch>
			</Router>

		)
	}
}

export default App;