import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from "prop-types";

const {REACT_APP_BASE_URL} = process.env;
const SIGN_OUT_URL = REACT_APP_BASE_URL + '/accounts/auth/logout'

export const UserContext = React.createContext({
    user: {},
    setUser: () => {},
    signOutUser: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const history = useHistory();
    
    const signOutUser= ()=>{
        console.log('Logging out');
        fetch(SIGN_OUT_URL, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.ok) {
                    console.log('Success Logout');
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