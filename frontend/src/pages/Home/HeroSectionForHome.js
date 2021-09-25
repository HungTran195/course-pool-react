import React, {  useState } from 'react';
// import { Grid, Button, ButtonGroup, Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Button, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
const {REACT_APP_BASE_URL} = process.env;


const HeroSectionForHome = () => {

    const [keywords, setKeywords] = useState('');

    const getSearchQuery = (e) => {
        console.log(JSON.stringify(keywords));
        const queryParams='?keywords=' + keywords.toString();
        fetch(REACT_APP_BASE_URL + '/api/view-course/' +queryParams)
            .then(res => res.json())
            .then(data => console.log(data));
        e.preventDefault();
    };

    return (
        <div className="hero-section">
            <div className="slogan text-light bg-dark">
                <div className="slogan-container">
                    <h1>No Need to Pay</h1>
                    <p>We have some great free courses for you!</p>
                </div>
            </div>
            <div className="my-2 mb-3 search-bar">
                <form className="input-group" onSubmit ={getSearchQuery}>
                    <Input className="form-control " variant="outlined"
                        type="text" name="keywords"
                        placeholder="Python, JavaScript, Swift..."
                        onChange ={e => setKeywords(e.target.value)}
                        />
                    <Button color="primary" variant="contained" type="submit" ><SearchIcon/></Button>
                </form>
            </div>
        </div>
    )
};

export default HeroSectionForHome;
// export default class HeroSectionForHome extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: '',
//             darkMode: true,
//         }
//         this.handleFormChange = this.handleFormChange.bind(this);
//         this.handleFormSubmit = this.handleFormSubmit.bind(this);

//     };

//     handleFormChange = (event) => {
//         this.setState({ value: event.target.value });
//     };

//     handleFormSubmit = (event) => {
//         // TODO : Implement a search function for courses
//         alert("Form submited " + this.state.value);
//         event.preventDefault();
//     }

//     render() {
        
//     }

// }
