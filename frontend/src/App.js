import React, { useEffect, useContext } from "react";
import HomePage from "./pages/Home/HomePage";
import FavoriteCoursePage from "./pages/Favorite/FavoriteCoursePage";
import SuggestCoursePage from "./pages/SuggestCourse/SuggestCoursePage";
import AboutPage from "./pages/About/AboutPage";
import NavContainer from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Footer from "./components/Footer/Footer"
import { UserContext } from "./components/UserContext";
import { BrowserRouter as Switch, Route,Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import PasswordResetForm from "./pages/PasswordReset/PasswordResetForm";
import PasswordResetDone from "./pages/PasswordReset/PasswordResetDone";
import { notifyError } from "./utils/notifications";

const {REACT_APP_BASE_BACKEND_URL} = process.env;

const App = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const sessionID = localStorage.getItem('session_id');
        if (sessionID){
            try {
                const user_info = JSON.parse(sessionID);
                const new_user = {
                    name: user_info.name,
                    email: user_info.email,
                    profilePicture: user_info.profilePicture,
                };
                setUser(new_user);
            }
            catch(error) {
                notifyError('Something went wrong, please login again');
                localStorage.removeItem('session_id');
                setTimeout(() => {
                    navigate('/login')
                }, (1000));
            }
            
        }
        else if (!user.email) {
            fetch(REACT_APP_BASE_BACKEND_URL + '/accounts/auth/get-current-user', {
                method: 'GET',
                credentials: 'include',
                })
                .then(response => {
                    if (response.status === 204) {
                        localStorage.removeItem('session_id');
                        return;
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
                        localStorage.setItem('session_id', JSON.stringify(new_user));
                    }
                });
        }
    }, [])
    
    return (
        <>
            <NavContainer />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/favorite" element={<FavoriteCoursePage />} />
                    
                <Route path="/suggest-course" element={<SuggestCoursePage/>} />
                <Route path="/about" element={<AboutPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/reset-password" element={<PasswordReset/>} />
                <Route
                     path="/reset-password/:uid/:token"
                    element={<PasswordResetForm/>}
                />
                 <Route
                     path="/reset-password-done"
                    element={<PasswordResetDone/>}
                />
            </Routes>
            <Footer />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </>
    );
}


export default App;