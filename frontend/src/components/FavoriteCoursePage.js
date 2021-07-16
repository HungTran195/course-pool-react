import React, { Component } from "react";

export default class FavoriteCoursePage extends Component {
    constructor(props) {
        super(props);

    }
    // get room from api server
    getAllCourse() {
        fetch("/api/view-course")
            .then((response) => response.json())
            .then((data) => {

            })
    }


    render() {
        return <p> This is FavoriteCoursePage</p>
    }
}