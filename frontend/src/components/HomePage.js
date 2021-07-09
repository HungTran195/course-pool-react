import React, { Component } from "react";
import FavoriteCoursePage from "./FavoriteCoursePage";
import SuggestCoursePage from "./SuggestCoursePage";
import NavContainer from "./Navbar";
import { Grid, Button, ButtonGroup, Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";


export default class HomePage extends Component {
	constructor(props) {
		super(props);
	}

	renderHomePage() {
		return (
			<NavContainer />
		);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route
						exact path="/"
						render={() => {
							return this.renderHomePage();
						}}
					/>
					<Route path="/favorite" component={FavoriteCoursePage} />
					<Route path="/suggest-course" component={SuggestCoursePage} />
				</Switch>
			</Router>
		);
	}
}


