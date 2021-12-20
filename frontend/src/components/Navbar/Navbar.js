import React, { useContext } from 'react';
import {NavLink } from 'react-router-dom';
import {UserContext} from '../UserContext';
import { Button, Avatar } from '@material-ui/core';
import { LoginButton } from '../Button/Button';
import "./navbar.css"
import logo from "../../static/images/logo1.png";
const NavContainer = () => {
    const { user, signOutUser } = useContext(UserContext);

    const showAvatar = () => {
        return (
            <>
                <Avatar alt={user.name} src={user.profilePicture} id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" />
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end account-dropdown-min-width" aria-labelledby="dropdownMenuLink">
                    <li className="d-flex justify-content-center py-1 account-name">
                        {user.name}
                    </li>
                    <li className="d-flex justify-content-center">

                        <Button color="primary" variant="contained" onClick={signOutUser}>Log out</Button>
                    </li>
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
                        src={logo} alt="1`23" />
                </a>

                {/* Button toggle navbar menu in mobile window size */}
                <button className="navbar-toggler ms-auto order-md-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Avatar of user */}
                <div className="order-md-4 mx-2 dropdown fs-5">
                    {user.email ? 
                        showAvatar() 
                        : <LoginButton variant="contained" color="primary" disableRipple href="/login" >Login</LoginButton>}
                    
                </div>


                {/* Main Menu */}
                <div className="collapse navbar-collapse order-md-2 ms-2" id="navbarNav">
                    <ul className="navbar-nav">
                        <NavLink to="/" className=" nav-link navbar-text px-3">
                           Home
                        </NavLink>
                        {user.email ?  (
                            <NavLink to="/favorite" className=" nav-link navbar-text px-3">
                                Favorite
                            </NavLink> )
                            : (null)
                        }
                        
                        <NavLink to="/suggest-course" className=" nav-link navbar-text px-3">
                            Suggest a Course
                        </NavLink>
                        <NavLink to="/about" className=" nav-link navbar-text px-3">
                        About
                        </NavLink>
                        
                    </ul>
                </div>
            </div>
        </nav >
    )
}
export default NavContainer;