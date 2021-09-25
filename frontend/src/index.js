import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import UserProvider from './components/UserContext';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(    
    <React.StrictMode>
        <Router>
            <UserProvider>
                <App />
            </UserProvider>
        </Router>                
    </React.StrictMode>,
    document.getElementById('root')
);

