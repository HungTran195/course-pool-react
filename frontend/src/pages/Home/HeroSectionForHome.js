import React, {  useContext, useState } from 'react';
import { Button, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { CourseContext } from '../../components/CourseContext';
import { notifyError } from '../../utils/notifications';
// import { Grid, Button, ButtonGroup, Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";


const {REACT_APP_BASE_URL} = process.env;


const HeroSectionForHome = () => {
    const {
        searchKeywords,
        setSearchKeywords,
        searchResults,
        setSearchResults,
        isLoading,
        setIsLoading,
    } = useContext(CourseContext);

    const getSearchQuery = (e) => {
        if(searchKeywords){
            setIsLoading(true);
            const queryParamsURL='?keywords=' + searchKeywords.toString();
            
            fetch(REACT_APP_BASE_URL + '/api/view-course/' + queryParamsURL)
                .then(res => {
                    console.log('res', res);
                    if(res.status === 200){
                        return res.json()
                    }
                    notifyError('Cannot get data from server');
                }).then(data => {
                    console.log(data)
                    let courses = [];
                    for(let i=0; i< data.length; i++){
                        courses.push(data[i]);
                    }
                    setSearchResults(courses);
                    setIsLoading(false);

                }).catch(e =>{
                    notifyError();
                });
            }
        else setSearchResults(undefined);

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
                        onChange ={e => setSearchKeywords(e.target.value)}
                        />
                    <Button color="primary" variant="contained" type="submit" ><SearchIcon/></Button>
                </form>
            </div>
        </div>
    )
};

export default HeroSectionForHome;