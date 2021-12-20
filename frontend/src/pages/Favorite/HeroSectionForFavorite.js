import React, { useState,useEffect } from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Button } from '@material-ui/core';

const HeroSectionForFavorite = ({hasUser, hasFavoriteCourse}) => {    
    const [isLogIn, setIsLogIn] = useState(false);
       
    useEffect(() => {
        if(hasUser){
            setIsLogIn(true);   
        }
        else setIsLogIn(false);
        
    }, [hasUser]);
    
    return (
        <div className="hero-section">
            <div className={`slogan text-light ${hasFavoriteCourse ? "bg-dark" : null}`}>
                <div className="slogan-container">
                    <h1 className="mb-3">Your Favorites</h1>
                {isLogIn ? (
                    <>
                        {hasFavoriteCourse ? null
                            : ( <p className="fs-5">Seems like you don't have any favorite Course</p> )
                        }
                        <p className="fs-6">Click the <BookmarkIcon/> icon below courses to set them as your favorites </p>
                    </>)
                    : (
                        <div>
                            <h1 className="fs-5 pb-2">You need to log in first</h1>
                            <Button  color="primary" variant="contained" size='large' href="/login">Log In</Button>
                        </div>)
                }
                </div>
            </div>
        </div>
    )
}
export default HeroSectionForFavorite;
