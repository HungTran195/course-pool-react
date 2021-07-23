import React, { Component } from "react";
import HeroSection from "./HeroSection"
export default class SuggestCoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: "SuggestCoursePage",
        };
    }
    renderSuggestCoursePage = () => {

    }
    render() {
        return (
            <>
                <HeroSection pageName={this.state.pageName} />
                <div className="container"> {this.renderSuggestCoursePage()}</div>
            </>
        )
    }
}