import React, { useCallback } from "react"
import GoogleLogin from "../../config/loginWithGoogle"
import './customGoogleButton.css';

const Login = () => {
    const openGoogleLoginPage = useCallback(GoogleLogin, []);

    const customGoogleButton = () => {
        return (
            <>
                <div id="gSignInWrapper" onClick={openGoogleLoginPage}>

                    <div id="customBtn" className="customGPlusSignIn">
                        <span className="icon"></span>
                        <span className="buttonText">Sign in with Google</span>
                    </div>
                </div>
                <div id="name"></div>
            </>
        )
    }
    return (
        <>
            <a href="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><i
                className="fas fa-user-circle fa-2x text-white-50"></i></a>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                <li>{customGoogleButton()}</li>

            </ul>
        </>
    )

}

export default Login;