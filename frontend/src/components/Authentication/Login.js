import React, { useEffect, useState, useCallback, useContext } from "react"
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

import GoogleButton from 'react-google-button';
import Cookies from "js-cookie";
import GoogleLogin from "../../config/loginWithGoogle"
import UserContext from "../UserContext";
import getCurrentUser from "../../config/getCurrentUser";

const Login = () => {
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