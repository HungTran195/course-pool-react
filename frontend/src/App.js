import React, { Component, useState } from "react";
import HomePage from "./pages/Home/HomePage";
import FavoriteCoursePage from "./pages/Favorite/FavoriteCoursePage";
import SuggestCoursePage from "./pages/SuggestCourse/SuggestCoursePage";
import AboutPage from "./pages/About/AboutPage";
import NavContainer from "./components/Navbar/Navbar";
import SignIn from './pages/Signin/SignIn';
import Signup from "./pages/Signup/Signup";
import NotFoundPage from "./pages/Not-found/NotFoundPage"
import Footer from "./components/Footer/Footer"
import UserContext from "./components/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [user, setUser] = useState(null);
    return (
        <>
        <Router>
            <UserContext.Provider value={{ user, setUser }}>

                <NavContainer />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/favorite" component={FavoriteCoursePage} />
                    <Route exact path="/suggest-course" component={SuggestCoursePage} />
                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/signup" component={Signup} />
                    <Router component={NotFoundPage} />

                </Switch>
                <Footer />
            </UserContext.Provider>
           
        </Router>
        <ToastContainer
                position="top-center"
                autoClose={3000}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </>
    );
}


export default App;