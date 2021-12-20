import React, { useState } from 'react';
import PropTypes from "prop-types";

const {REACT_APP_BASE_URL, REACT_APP_BASE_BACKEND_URL} = process.env;
const SIGN_OUT_URL = REACT_APP_BASE_BACKEND_URL + '/accounts/auth/logout'

export const UserContext = React.createContext({
    user: {},
    setUser: () => {},
    signOutUser: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    
    const signOutUser= ()=>{
        console.log('Logging out');
        localStorage.removeItem('session_id');
        fetch(SIGN_OUT_URL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',            
            },
            body : JSON.stringify({})
        }).then(data => {
                if (data.ok) {
                    setUser({});
                    window.location = REACT_APP_BASE_URL + '/login';
                }
                else console.log('Logout failed');
            })
    };

    return (
        <UserContext.Provider value = {{user, setUser, signOutUser}}>
            {children}
        </UserContext.Provider>
    )
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserProvider;