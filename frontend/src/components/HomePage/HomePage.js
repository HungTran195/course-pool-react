import React, { Component, useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";
import HeroSectionForHome from "./HeroSectionForHome";
import Spinner from "../Spinner/Spinner"
import { Grid, Button, ButtonGroup, Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";


export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCourse: [],
			pageName: "HomePage",
			isFetching: false,
		};
		this.fetchAllCourse = this.fetchAllCourse.bind(this);
	};

	fetchAllCourse() {
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

	render() {
		return (
			<>
				<HeroSectionForHome />
				<div className="container">
					<div>
						{this.state.isFetching ? <Spinner /> : null}
					</div>
					<CourseCard allCourses={this.state.allCourse} />
				</div>
			</>

		)
	}

	componentDidMount() {
		document.title = "Course Pool | Home Page"
		this.fetchAllCourse();
	}


}


