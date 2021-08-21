import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import getCurrentUser from '../../config/getCurrentUser';
import Login from '../Authentication/Authenticate';
import UserContext from '../UserContext';
import { Button } from '@material-ui/core';
const { REACT_APP_BASE_URL } = process.env;

const NavContainer = () => {
    getCurrentUser();
    const history = useHistory();

    const { user, setUser } = useContext(UserContext);
    if (user) {
        console.log("user authenticated");
        console.log('picture ', user.profilePicture);
    }
    const signoutUser = () => {

        console.log("Logging out");
        fetch("http://127.0.0.1:8000/accounts/auth/logout", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.ok) {
                    console.log('Success Logout', data);
                    window.location = REACT_APP_BASE_URL;

                }
                else console.log('Logout failed');
            })
    }
    const userLoggedInView = () => {
        return (
            <>
                <a href="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">

                    <img src={user.profilePicture} style={{ maxWidth: "40px" }} />
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                    <Button onClick={signoutUser}>Log out</Button>
                </ul>
            </>
        )
    }
    return (
        <nav id="navbar">
            <div className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand flex-shrink-0 order-md-1 ms-2 me-1 d-flex justify-content-center align-items-center"
                    href="/">
                    <img className="logo"
                        src="../../static/images/logo.png" alt="" />
                </a>

                <button className="navbar-toggler ms-auto order-md-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="order-md-4 mx-2 dropdown fs-5">
                    {user ? userLoggedInView() : <Login />}
                </div>


                {/* Main Menu */}
                <div className="collapse navbar-collapse order-md-2 ms-2" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className=" nav-item px-sm-2">
                            <a className=" nav-link navbar-text" id="home" href="/">Home</a>
                        </li>
                        <li className="nav-item px-sm-2">
                            <a className="nav-link navbar-text " id='favorite' href="/favorite">Favorite</a>
                        </li>

                        <li className="nav-item px-sm-2">
                            <a className="nav-link navbar-text " id="suggest" href="/suggest-course">Suggest
                                a
                                Course</a>
                        </li>
                        <li className="nav-item px-sm-2">
                            <a className="nav-link navbar-text " id="about" href="/about">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}
export default NavContainer;