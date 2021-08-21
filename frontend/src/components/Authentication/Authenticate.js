import React, { useEffect, useState, useCallback, useContext } from "react"
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

import GoogleButton from 'react-google-button';
import Cookies from "js-cookie";
import GoogleLogin from "../../config/loginWithGoogle"
import UserContext from "../UserContext";
import getCurrentUser from "../../config/getCurrentUser";

const Login = () => {
    // getCurrentUser();
    console.log('Authenticate')
    const history = useHistory();
    // const handleLogout = () => {
    //     console.log("Logging out");
    //     fetch("http://127.0.0.1:8000/accounts/auth/logout", {
    //         method: 'POST',
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(data => {
    //             if (data.ok) console.log('Success Logout');
    //             else console.log('Logout failed');
    //         })
    // }
    const openGoogleLoginPage = useCallback(GoogleLogin, []);

    return (
        <>
            <a href="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><i
                className="fas fa-user-circle fa-2x text-white-50"></i></a>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                <li>
                    <a className="dropdown-item" href="{% provider_login_url 'google' %}">Login</a>
                    <GoogleButton
                        onClick={openGoogleLoginPage}
                        label="Sign in with Google" />

                </li>
            </ul>
        </>
    )

}

export default Login;