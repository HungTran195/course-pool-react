import React, { useContext, useState, useEffect } from 'react';
import CustomGoogleButton from '../../components/Authentication/GoogleLogin';
import UserContext from '../../components/UserContext';
import { useHistory } from 'react-router-dom';
import { notifyError } from '../../utils/notifications';
const { REACT_APP_BASE_URL } = process.env
const LOGIN_URL = REACT_APP_BASE_URL + '/accounts/auth/login'
const SignIn = () => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [userAuth, setUserAuth] = useState({
        'email': '',
        'password': ''
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setUserAuth({
            ...userAuth,
            [event.target.name]: value
        })
    };
    
    const handleFormSubmit = (event) => {
        const data = { 'email': email, 'password': password };
        fetch(LOGIN_URL, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => {
            console.log(res)
            if (res.status === 201) {
                console.log('URL', REACT_APP_BASE_URL);
                window.location = REACT_APP_BASE_URL;
            }
            else {
                notifyError('Wrong email or password');
            }
        });
        event.preventDefault();
    };
    return (
        <div className="container text-light py-2">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-lg-4 col d-flex justify-content-center ">
                    <div className="login-wrap">
                        <div className=" d-flex justify-content-center mb-0">
                            <img src="../../../static/images/login.png" alt="Login Logo" id="login-logo" />
                        </div>
                        <h2 className="text-center login-title pt-3 pb-md-1">Welcome
                        </h2>
                        <CustomGoogleButton />
                        <form className="form login-form" method="POST" onSubmit={handleFormSubmit}>
                            {/* Username */}
                            <div className="form-group mb-3">
                                <div className="icon d-flex justify-content-center align-items-center"><span
                                    className="fa fa-envelope"></span></div>

                                <input className=" form-control" autoCapitalize="none" id="Email address" type=" text"
                                    name="email" placeholder="Email address" required value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            {/* Password */}
                            <div className="form-group mb-4">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="fa fa-lock"></span>
                                </div>
                                <input className=" form-control" id="id_password" type="password" name="password"
                                    placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            {/* <div className="form-group">
                                <div className="w-100 d-flex justify-content-end mb-3 ">
                                    <a href="{% url 'courses:password_reset' %}">Forgot Password?</a>
                                </div>
                            </div> */}
                            <div className="form-group">
                                <button type="submit" className="btn form-control btn-primary rounded submit px-3">Get
                                    Started</button>
                            </div>

                        </form>
                        <div className="w-100 text-center mt-4 text">
                            <p className="mb-0">Don't have an account?</p>
                            <div>
                                <a href="/signup"><button className="btn btn-secondary">Sign Up</button></a>

                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div >
    )
};

export default SignIn;