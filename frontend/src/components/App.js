import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage/HomePage";
import FavoriteCoursePage from "./FavoritePage/FavoriteCoursePage";
import SuggestCoursePage from "./SuggestCoursePage/SuggestCoursePage";
import NavContainer from "./Navbar/Navbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <NavContainer />

                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/favorite" component={FavoriteCoursePage} />
                        <Route exact path="/suggest-course" component={SuggestCoursePage} />

                    </Switch>
                </Router>
            </>
        );
    }
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);
