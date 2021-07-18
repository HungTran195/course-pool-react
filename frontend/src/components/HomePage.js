import React, { Component, useEffect } from "react";
import FavoriteCoursePage from "./FavoriteCoursePage";
import SuggestCoursePage from "./SuggestCoursePage";
import NavContainer from "./Navbar";
import CourseCard from "./CourseCard";
import HeroSection from "./HeroSection";

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
			fromPage: "HomePage",
			isFetching: false,
		};
		// this.fetchAllCourse = this.fetchAllCourse.bind(this);
	};

	render() {
		return (
			<>
				<HeroSection props={{ fromPage: "HomePage" }} />
				<div className="container">
					<CourseCard allCourses={this.state.allCourse} />
				</div>
			</>

		)
	}
	componentDidMount() {
		document.title = "Course Pool | Home Page"
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


