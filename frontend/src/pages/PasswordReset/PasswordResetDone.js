import React from 'react';
import { LoginButton } from '../../components/Button/Button';

const PasswordResetDone = () => {
    return (
        <div className="row justify-content-center py-3 mx-3 py-md-5">
            <div className="login-wrap py-3">

                <h3 className="text-light fw-bold fs-2 text-center">Password reset is completed! </h3>

                <p>Your new password has been set. You may go ahead and log in now.</p>

                <div className="row text-center">
                    <LoginButton variant="contained" color="primary"  href="/login"> Log in</LoginButton>

                </div>



            </div>

        </div>

    )
};

export default PasswordResetDone;

