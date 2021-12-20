import React, {useState} from 'react';
import { notifyError } from '../../utils/notifications';


const {REACT_APP_BASE_BACKEND_URL} = process.env;
const RESET_PASSWORD_URL = REACT_APP_BASE_BACKEND_URL + '/accounts/auth/users/reset_password/';

const PasswordReset = () =>  {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const request_reset_password = (event) => {
        
        fetch(RESET_PASSWORD_URL, {
            method: 'POST',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email}),

        }).then(res => {
            if(res.status === 204){
                setEmailSent(true);
            }
            else notifyError();
        })
        .catch(error => notifyError());

        event.preventDefault();
    };

    return (
        <div className="row justify-content-center py-3">
            <div className="login-wrap py-5">
                <h2 className="text-light text-center fw-bold fs-2">Forgot your password?</h2>
                { emailSent ? (
                    <>
                    <p>We’ve sent an email to <span className='text-info fst-italic'> {email}</span> including instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.</p>
                    <p>If you don’t receive an email, please make sure you’ve entered the address you registered with, and check
                        your spam folder.</p>
                    </>
                )
                    : ( <>
                        <p className="text-center">Enter your email address below, we'll email instructions for setting a new one.</p>
                    
                        <form onSubmit={request_reset_password}>
                            <input className="mb-3 form-control" type="email" name="email" id="id_email" required
                                placeholder="Email Address" autoComplete="email" onChange={e => setEmail(e.target.value)}/>

                            <div className="w-100 d-flex justify-content-center">
                                <input className="btn btn-primary" type="submit" value="Send me instructions!"/>
                            </div>
                        </form>
                    </>)
                }
            </div>
        </div>
        
    )
};

export default PasswordReset;