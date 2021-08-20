import React, { Component } from "react";
import HomePage from "./pages/Home/HomePage";
import FavoriteCoursePage from "./pages/Favorite/FavoriteCoursePage";
import SuggestCoursePage from "./pages/SuggestCourse/SuggestCoursePage";
import AboutPage from "./pages/About/AboutPage";
import NavContainer from "./components/Navbar/Navbar";
import NotFoundPage from "./pages/not-found/NotFoundPage"
import Footer from "./components/Footer/Footer"
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
                        <Route exact path="/about" component={AboutPage} />
                        {/* <Route exact path="/login" />
                        <Route exact path="/register" /> */}
                        <Router component={NotFoundPage} />

                    </Switch>
                </Router>
                <Footer />
            </>
        );
    }
}

