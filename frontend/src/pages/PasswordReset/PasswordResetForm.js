import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { notifyError } from '../../utils/notifications';

const {REACT_APP_BASE_URL} = process.env;


const PasswordResetForm = () => {
    const history = useHistory()
    const initialStatePassword = {
        new_password1: '',
        new_password2: ''
    };
    const initialStatePassValid ={
        isValid: true,
        error: []
    };
    const [newPassword, setNewPassword] = useState(initialStatePassword);
    const [isPasswordValid, setIsPasswordValid] = useState(initialStatePassValid);
    const formChange = (e) => {
        const {name,value} = e.target;
        setNewPassword({
            ...newPassword,
            [name]: value,
        })
    };

    const generateErrorMsg = () => {
        const displayError = [];
        for (let index = 0; index < isPasswordValid.error.length; index++) {
            displayError.push(
                <li className="text-danger" style={{
                        fontSize: "1rem",
                        padding: "0px 5px"
                    }} key={index}>
                        {isPasswordValid.error[index]}
                </li>
            );
        }
        return displayError
    }

    const submitNewPassword = (event) => {
        setIsPasswordValid(initialStatePassValid);
        if(newPassword.new_password1 === newPassword.new_password2){
            const currentPathName = window.location.pathname.split('/');

            const data = {
                'uid': currentPathName[currentPathName.length - 2],
                'token': currentPathName[currentPathName.length -1],
                'new_password': newPassword.new_password2
            };
            fetch(REACT_APP_BASE_URL + '/accounts/auth/users/reset_password_confirm/',{
                method: 'POST',
                credentials: 'same-origin',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => {
                if(res.status === 204){
                    history.push('/reset-password-done');
                }
                else return res.json()
            }).then(data => {
                if(data){
                    const error_list= [];
                    for (const [key, value] of Object.entries(data)){
                        if(key === 'token'){
                            error_list.push('Your token is expired or has been used.');
                        }
                        else error_list.push(...value);
                    };
                    setIsPasswordValid({
                        isValid: false,
                        error: [...error_list],
                    });
                }
            }).catch(error => notifyError());
        }
        else notifyError('Passwords do not match');
        event.preventDefault();
    };

    return (
        <div className="row justify-content-center py-3">
            <div className="login-wrap py-5">
                <h3 className="text-light text-center fw-bold fs-1">Enter new password</h3>

                <p>Please enter your new password twice so we can verify you typed it in correctly.</p>

                <form method="post" onSubmit={submitNewPassword}>
                    <div className="form-group mb-4">
                        <input className="ps-2 form-control" type="password" name="new_password1" id="id_new_password1"
                            aria-autocomplete="list" placeholder="New Password" required onChange={formChange}/>
                    </div>
                    <div className="form-group mb-4">
                        <input className="form-control ps-2" type="password" name="new_password2" id="id_new_password"
                            aria-autocomplete="list" placeholder="Confirm Password" required onChange={formChange}/>
                    </div>

                    {!isPasswordValid.isValid ? 
                        (<ul className="mb-4">
                            {generateErrorMsg()}
                        </ul>)
                        : null}

                    <div className="d-flex justify-content-center">
                        <input className="btn btn-primary fw-bold" type="Submit" name="Update Password" />
                    </div>

                </form>
            </div>
        </div>
    )
};

export default PasswordResetForm;