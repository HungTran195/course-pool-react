import React, { Component } from "react";
import HeroSectionForFavorite from "./HeroSectionForFavorite"
import CourseCard from "../../components/CourseCard/CourseCard";
import Spinner from "../../components/Spinner/Spinner";

export default class FavoriteCoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: "FavoritePage",
            isFetching: false,
            hasFavorites: false,
            allCourse: [],

        };
        this.fetchAllCourse = this.fetchAllCourse.bind(this);
    }

    fetchAllCourse = () => {
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
                    hasFavorites: courses.length > 0,
                    isFetching: false,
                });


            })
            .catch(error => {
                console.log(error);
                this.setState({ isFetching: true });
            });
    }


    render() {
        return (
            <>
                <HeroSectionForFavorite pageState={this.state.hasFavorites} />
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
        document.title = "Course Pool | Favorite Courses";
        this.fetchAllCourse();
    }
}