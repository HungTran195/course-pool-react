import React, { Component } from "react";
import FavoriteCoursePage from "./FavoriteCoursePage";
import SuggestCoursePage from "./SuggestCoursePage";
import NavContainer from "./Navbar";
import CourseCard from "./CourseCard"
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
		this.state = {
			allCourse: [],
			isFetching: false,
		};
		// this.fetchAllCourse = this.fetchAllCourse.bind(this);
	};

	renderHomePage = function () {
		return (
			<>
				<NavContainer />
				<div className="container">
					<CourseCard allCourses={this.state.allCourse} />
				</div>
			</>

		);
	};

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
	componentDidMount() {
		this.fetchAllCourse();
	}
	fetchAllCourse = function () {
		this.setState({ isFetching: true });
		fetch("api/view-course")
			.then(response => response.json())
			.then(data => {
				let courses = [];
				for (let i = 0; i < data.length; i++) {
					courses.push(data[i]);
				}
				this.setState({
					allCourse: courses,
					isFetching: false,
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({ isFetching: true });
			});
	};

}


