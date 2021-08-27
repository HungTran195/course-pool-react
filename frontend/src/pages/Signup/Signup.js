import React from 'react';

const Signup = () => {
    return (
        <div className="container text-light py-2">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-lg-5 d-flex justify-content-center">
                    <div className="login-wrap ">
                        <div className=" d-flex justify-content-center mb-0">
                            <img src="../../../static/images/login.png" alt="Login Logo" id="login-logo" />
                        </div>
                        <h2 className="text-center pt-3 pb-md-4 login-title">Register</h2>

                        <form className="form login-form" method="POST">
                            <div className="row">
                                <div className="col form-group mb-3">
                                    <input className="form-control ps-1" id="id_first_name" type="text" name="first_name"
                                        placeholder="First name" />
                                </div>

                                <div className="col form-group mb-3">
                                    <input className="form-control ps-1" id="id_last_name" type="text" name="last_name"
                                        placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="icon d-flex justify-content-center align-items-center"><span
                                    className="fa fa-envelope"></span></div>
                                <input className="form-control" id="id_email_address" type="text" name="email"
                                    placeholder="Email Address" required />
                            </div>
                            <div className="form-group mb-4">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="fa fa-lock"></span>
                                </div>
                                <input className="form-control" autoComplete="new-password" id="id_password1" type="password"
                                    name="password1" placeholder="Password" aria-autocomplete="list" required />
                            </div>
                            <div className="form-group mb-4">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="fa fa-lock"></span>
                                </div>
                                <input className=" form-control" autoComplete="new-password" id="id_password2" type="password"
                                    name="password2" placeholder="Confirm Password" required />
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