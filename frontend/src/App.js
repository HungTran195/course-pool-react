import React, { Component, useState, useEffect, useContext } from "react";
import HomePage from "./pages/Home/HomePage";
import FavoriteCoursePage from "./pages/Favorite/FavoriteCoursePage";
import SuggestCoursePage from "./pages/SuggestCourse/SuggestCoursePage";
import AboutPage from "./pages/About/AboutPage";
import NavContainer from "./components/Navbar/Navbar";
import SignIn from './pages/Signin/SignIn';
import Signup from "./pages/Signup/Signup";
import Footer from "./components/Footer/Footer"
import { UserContext } from "./components/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import PasswordResetForm from "./pages/PasswordReset/PasswordResetForm";
import PasswordResetDone from "./pages/PasswordReset/PasswordResetDone";

const {REACT_APP_BASE_URL} = process.env;

const App = () => {
    const { user, setUser } = useContext(UserContext);
    
    useEffect(() => {

        if (!user.email) {
            fetch(REACT_APP_BASE_URL + '/accounts/auth/get-current-user')
                .then(response => {
                    if (response.status === 204) {
                        return;
                    }
                    return response.json()
                })
                .then(data => {
                    if (data) {
                        const new_user = {
                            name: data.name,
                            email: data.email,
                            profilePicture: data.profile_picture,
                        }
                        setUser(new_user);
                    }
                });
        }
    }, [])
    
    return (
        <>
            <NavContainer />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/favorite">
                    <FavoriteCoursePage />
                </Route>
                <Route exact path="/suggest-course" component={SuggestCoursePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/reset-password" component={PasswordReset} />
                <Route
                    exact path="/reset-password/:uid/:token"
                    component={PasswordResetForm}
                />
                 <Route
                    exact path="/reset-password-done"
                    component={PasswordResetDone}
                />

            </Switch>
            <Footer />
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