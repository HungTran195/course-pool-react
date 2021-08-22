import { useEffect, useContext } from 'react';

import UserContext from '../components/UserContext';

const getCurrentUser = () => {
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/accounts/auth/get-current-user')
            .then(response => {
                console.log("GET Current USER", response)

                if (response.status === 401) {
                    console.log("not authorised");
                    throw new Error('Unauthorised')
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    const new_user = {
                        name: data.name,
                        email: data.email,
                        profilePicture: data.profile_picture,
                    }
                    setUser(new_user);
                }
                console.log('Success:', data);
            })
    }, [])
};

export default getCurrentUser;