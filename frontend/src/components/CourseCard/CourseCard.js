import React, { Component } from 'react';
import {
    FacebookShareButton, TwitterShareButton, RedditShareButton, WhatsappShareButton,
    FacebookIcon, TwitterIcon, RedditIcon, WhatsappIcon
} from 'react-share'

const getTags = (tags) => {
    const tagList = tags.split(',');
    return tagList;
}

const ButtonInner = ({ courseID, courseURL }) => {
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
                        <div className="modal-dialog modal-dialog-centered ">
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

                <div className="text-warning ms-auto me-3 toggle-favorite" id={`course-${courseID}`}><i
                    className="fas fa-star fa-2x"></i>
                </div>

            </div>
        </div>

    )
}
const Card = ({ props }) => {
    const { id, course_name, author, thumbnail_url, url, description, tags } = props;

    return (
        <div className="course-card position-relative ">
            <a className="img-course" href={url} target="_blank">
                <img src={thumbnail_url} alt="Course Image" />
            </a>
            <div className="tag-list">
                <ul className="d-flex flex-wrap mt-1 mx-auto">
                    {getTags(tags).map((tag) => (
                        <li key={tag} >
                            <a href="">{tag}</a>
                        </li>
                    )
                    )}
                </ul>
            </div>
            <div className="course-name">{course_name}</div>
            <div className="author">by <span className="author-name">{author}</span></div>
            <div className="description">
                <p>{description}</p>
            </div>
            <ButtonInner courseID={id} courseURL={url} />
        </div>

    )
}

const CourseCard = ({ allCourses }) => (
    <div className="d-flex justify-content-center align-items-center pb-2">
        <div className="container grid-view">
            {allCourses.map((course, index) => (
                <Card key={index} props={course} />
            ))}
        </div>
    </div >
)


export default CourseCard;
