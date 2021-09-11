import React, { useState, useEffect } from 'react';
import { notifyError } from '../../utils/notifications';
const { REACT_APP_BASE_URL } = process.env;
const SIGNUP_URL = REACT_APP_BASE_URL + '/accounts/auth/signup';
const Signup = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: '',
    };
    const [user, setUser] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleFormSubmit = () => {
        const newUser = {
            'first_name': user.firstName,
            'last_name': user.lastName,
            'email': user.email,
            'password': user.password1
        };

        if (user.password1 !== user.password2) {
            notifyError('Passwords do not match');
        }
        else {
            fetch(SIGNUP_URL, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            }).then(res => {
                if (res.status === 201) {
                    window.location = REACT_APP_BASE_URL    
                }
                else return res.json()
            }).then(data => {
                let keys = Object.keys(data);
                keys.forEach((key)=>{
                    notifyError(data[key])                    
                });
            });
        }
        event.preventDefault();
    }

    return (
        <div className="container text-light py-2">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-lg-5 d-flex justify-content-center">
                    <div className="login-wrap ">
                        <div className=" d-flex justify-content-center mb-0">
                            <img src="../../../static/images/login.png" alt="Login Logo" id="login-logo" />
                        </div>
                        <h2 className="text-center pt-3 pb-md-4 login-title">Register</h2>

                        <form className="form login-form" onSubmit={handleFormSubmit}>
                            <div className="row">
                                <div className="col form-group mb-3">
                                    <input className="form-control ps-1" type="text" name="firstName" autoComplete="given-name"
                                        placeholder="First name" required value={user.firstName} onChange={handleInputChange} />
                                </div>

                                <div className="col form-group mb-3">
                                    <input className="form-control ps-1" type="text" name="lastName" autoComplete="family-name"
                                        placeholder="Last Name" required value={user.lastName} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="icon d-flex justify-content-center align-items-center"><span
                                    className="fa fa-envelope"></span></div>
                                <input className="form-control" type="text" name="email" autoComplete="email"
                                    placeholder="Email Address" required value={user.email} onChange={handleInputChange} />
                            </div>
                            <div className="form-group mb-4">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="fa fa-lock"></span>
                                </div>
                                <input className="form-control" type="password" name="password1" placeholder="Password" minLength="8" required value={user.password1} onChange={handleInputChange} />
                            </div>
                            <div className="form-group mb-4">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="fa fa-lock"></span>
                                </div>
                                <input className=" form-control" type="password" name="password2" placeholder="Confirm Password" minLength="8" required value={user.password2} onChange={handleInputChange} />
                            </div>


                            <div className="form-group">
                                <button type="submit" value="Register"
                                    className="btn form-control btn-primary rounded submit px-3">Sign Up</button>
                            </div>

                        </form>
                        <div className="w-100 text-center mt-4 text">
                            <p className="my-0 py-1">Already have an account?</p>
                            <div>
                                <a href="/login"><button className="btn btn-secondary">Login</button></a>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>

    )
};

export default Signup;