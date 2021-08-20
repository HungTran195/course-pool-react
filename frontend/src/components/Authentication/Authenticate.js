import React, { useEffect, useState, useCallback } from "react"
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

import GoogleButton from 'react-google-button';
import Cookies from "js-cookie";

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Login = () => {
    const history = useHistory();
    const [isLogin, setLogin] = useState(false)
    const handleLogout = () => {
        console.log("Logging out");
        fetch("http://127.0.0.1:8000/accounts/auth/logout", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.ok) console.log('Success Logout');
                else console.log('Logout failed');
            })
    }
    // Handle google login authentication using server-side flow
    // Ref: https://developers.google.com/identity/protocols/oauth2/web-server#obtainingaccesstokens
    const openGoogleLoginPage = useCallback(() => {
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const redirectUri = 'http://127.0.0.1:8000/accounts/auth/login/google/';

        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ');

        const params = {
            response_type: 'code',
            client_id: REACT_APP_GOOGLE_CLIENT_ID,
            redirect_uri: `${redirectUri}`,
            prompt: 'select_account',
            access_type: 'offline',
            scope
        };

        const urlParams = new URLSearchParams(params).toString();
        window.location = `${googleAuthUrl}?${urlParams}`;
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/accounts/auth/get-current-user')
            .then(response => {
                console.log(response)

                if (response.status === 401) {
                    setLogin(false);
                    console.log("not authorised");
                    throw new Error('Unauthorised')
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    setLogin(true)
                }
                console.log('Success:', data);
            })
    }, []);

    return (

        <div className="order-md-4 mx-2 dropdown fs-5">
            <a href="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><i
                className="fas fa-user-circle fa-2x text-white-50"></i></a>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                <li>
                    <a className="dropdown-item" href="{% provider_login_url 'google' %}">Login</a>
                    <GoogleButton
                        onClick={openGoogleLoginPage}
                        label="Sign in with Google" />

                </li>
                <li>{isLogin ? <Button onClick={handleLogout}>Log out</Button> : ""}</li>

            </ul>
        </div>
    )

}

export default Login;