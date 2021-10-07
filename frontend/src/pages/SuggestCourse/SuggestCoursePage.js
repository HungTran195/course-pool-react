import React, { useState, useEffect } from "react";
import HeroSectionForSuggest from "./HeroSectionForSuggest";

const {REACT_APP_BASE_URL} = process.env;

const SuggestCoursePage = () => {
    document.title = "Course Pool | Suggest Your Favorite Course";
    
    const initialState = {
        name: '',
        email: '',
        course_name: '',
        course_url: '',
        description: ''
    };
    const [suggestCourse, setSuggestCourse] = useState(initialState);
    const [submitStatus, setSubmitStatus] = useState({
        isSuccess: false,
        msg: initialState
    });

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setSuggestCourse({
            ...suggestCourse,
            [name]: value,
        });
    };

    const handleFormSubmit = (event) => {
        setSubmitStatus({
            isSuccess: false,
            msg: initialState
        });
        const FETCH_URL = REACT_APP_BASE_URL + '/api/add-course';
        fetch(FETCH_URL, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(suggestCourse),
        }).then(res => {
            if(res.status === 201){
                setSubmitStatus(prevStatus => ({
                    ...prevStatus,                    
                    isSuccess: true
                }));
                return;
            }
            else return res.json()
        }).then(data => {
            if(data) {
                for(const [name,  msg ] of Object.entries(data)){
                    setSubmitStatus(prevStatus => ({
                        ...prevStatus,
                        isSuccess: false,
                        msg:{
                            ...prevStatus.msg,
                            [name]: msg,
                        }
                    }));
                };
            }
        }).catch(e => console.log('error', e));


        event.preventDefault();
    };

    return (
        <>
            <HeroSectionForSuggest />
            <div className="container">
            <div id="forms" className="pb-3 pt-3 pb-5">
                <form className="form mx-auto" onSubmit={handleFormSubmit}>
                    <div className="input-group row">
                        <label
                            className="col-lg-2 col-md-1 col-form-label form-control-label text-light justify-content-end align-items-start d-lg-flex ">Name</label>
                        <div className="col-md-5 col-lg-4">
                            <input className="form-control mb-2" id="id_name" type="text" name="name"
                                placeholder="James" value={suggestCourse.name} onChange={handleFormChange} />
                            {submitStatus.msg.name ? (
                                <label className="text-danger">{submitStatus.msg.name}</label>
                                ): null}
                        </div>
                        <label
                            className="col-lg-2 col-md-1 col-form-label form-control-label text-light justify-content-end align-items-start d-lg-flex">Email</label>
                        <div className="col-md-5 col-lg-4">
                            <input className="form-control mb-lg-2" id="id_email" type="text" name="email"
                                value={suggestCourse.email} placeholder="email@gmail.com" onChange={handleFormChange} />
                            {submitStatus.msg.email ? (
                                <label className="text-danger">{submitStatus.msg.email}</label>
                                ): null}
                            
                        </div>
                    </div>


                    <div className="input-group row mt-2 mt-lg-4">
                        <label className="col-lg-2 col-form-label form-control-label justify-content-end align-items-center d-lg-flex text-light ">Course
                            Name</label>
                        <div className="col-lg">
                            <input className="form-control" id="id_course_name" type="text" name="course_name"
                                placeholder="Django from zero to hero" value={suggestCourse.course_name} onChange={handleFormChange} required />
                            {submitStatus.msg.course_name ? (
                                <label className="text-danger">{submitStatus.msg.course_name}</label>
                                ): null}
                        </div>
                    </div>
                    <div className="input-group row mt-2 mt-lg-4">
                        <label
                            className="col-lg-2 col-form-label form-control-label text-light justify-content-end align-items-center d-lg-flex">Course
                            URL</label>
                        <div className="col-lg-10">
                            <input className="form-control" id="id_course_url" name="course_url" type="text" placeholder=""
                                value={suggestCourse.course_url} onChange={handleFormChange} required />
                            {submitStatus.msg.course_url ? (
                                <label className="text-danger">{submitStatus.msg.course_url}</label>
                                ): null}
                        </div>
                    </div>

                    <div className="input-group row mt-2 mt-lg-4">
                        <label
                            className="col-lg-2 col-form-label form-control-label text-light justify-content-end align-items-center d-lg-flex">Description</label>
                        <div className="col-lg-10">
                            <textarea className="form-control" id="id_description" type="text" name="description" required
                                placeholder="This course will give you a full introduction into all of the core concepts in python."
                                value={suggestCourse.description} onChange={handleFormChange} />
                            {submitStatus.msg.description ? (
                                <label className="text-danger">{submitStatus.msg.description}</label>
                                ): null}
                        </div>
                    </div>

                    <div className="input-group row mt-2 mt-lg-3">
                        <label className="col-lg-2"></label>
                        <div className="col-lg-10">
                            {submitStatus.isSuccess ?(
                                <div>
                                <label style= {{
                                    // fontSize: "1.2rem",
                                    fontWeight: "600",
                                    color: "#1fb075",
                                    }} className ="pb-3">Thank you for your sharing!</label>
                                </div>
                                ): null}
                            <input type="reset" className="btn btn-outline-secondary mr-2" value="Cancel" />
                            <input type="submit" className="btn btn-primary mr-2" name="submit" value="Submit" />
                        </div>

                    </div>
                </form>

            </div>
            </div>
        </>
    )

};

export default SuggestCoursePage;