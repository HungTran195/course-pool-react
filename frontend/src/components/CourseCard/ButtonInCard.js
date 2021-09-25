import React, { useState, useContext, useEffect} from 'react';
import {
    FacebookShareButton, TwitterShareButton, RedditShareButton, WhatsappShareButton,
    FacebookIcon, TwitterIcon, RedditIcon, WhatsappIcon
} from 'react-share'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { UserContext } from '../UserContext';
import { notifyError } from '../../utils/notifications';

const {REACT_APP_BASE_URL} = process.env
const TOGGLE_FAVORITE_URL = REACT_APP_BASE_URL + '/api/toggle-favorite'

const ButtonInCard = ({ courseID, courseURL, isFavoriteID}) => {
    const [isFavorite, setFavorite] = useState(true);
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(isFavoriteID){
            setFavorite(true);
        }
        else setFavorite(false)
    }, [isFavoriteID])
    
    const toggleFavorite= (e)=> {
        if (user.email){
            setFavorite(!isFavorite);
            fetch(TOGGLE_FAVORITE_URL,{
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'course': courseID
                })
            }).then(res => {
                if (res.status !== 200) {
                    notifyError()
            }})
            .catch(error =>{
                console.log(error)
				notifyError(); 
            })
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center my-3">
            <div className='position-absolute bottom-0 my-2 d-flex align-items-center  w-100'>
                <a className="ms-3" href={courseURL} target="_blank">
                    <button type="button" className="btn btn-info">Learn More</button>
                </a>
                <div className="ms-3">
                    {/* -- Button trigger modal -- */}
                    <button type=" button" className="btn btn-info" data-bs-toggle="modal"
                        data-bs-target={`#share-course-${courseID}`}>Share <i className="fas fa-share-alt"></i></button>

                    {/* -- Popup Share Modal -- */}
                    <div className="modal fade" id={`share-course-${courseID}`}
                        aria-labelledby="share-course-modal-label" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered justify-content-center">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title text-light" id="share-course-modal-label">Share this
                                        course</h5>
                                </div>
                                <div className="modal-body ">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <FacebookShareButton url={courseURL} quote={"Check this new Course!"} hashtag={"CoursePool"} className="mx-2">
                                            <FacebookIcon className="mr-2" side={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={courseURL} title={"Check this new Course!"} hashtag={"CoursePool"} className="mx-2">
                                            <TwitterIcon className="mr-2" side={32} round />
                                        </TwitterShareButton>
                                        <RedditShareButton url={courseURL} title={"Check this new Course!"} className="mx-2">
                                            <RedditIcon className="mr-2" side={32} round />
                                        </RedditShareButton>
                                        <WhatsappShareButton url={courseURL} title={"Check this new Course!"} className="mx-2">
                                            <WhatsappIcon className="mr-2" side={32} round />
                                        </WhatsappShareButton>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add to favorite list */}
                {user.email 
                    ? <div 
                        className="text-warning ms-auto me-3 toggle-favorite" 
                        id={`course-${courseID}`}
                        onClick={toggleFavorite}
                        >
                        {isFavorite 
                            ? <BookmarkIcon fontSize = "large"/> 
                            : <BookmarkBorderIcon fontSize = "large"/> }
                    </div>
                    : null }
            </div>
        </div>

    )
}

export default ButtonInCard;