import React, { useState } from "react";
import GitHubIcon from '@material-ui/icons/GitHub';


const AboutPage = () => {
    
    return (
        <>
            <div className="container my-4">
                <div className="mb-3">
                    <h1 className="text-light slogan  fw-bold"> About Course Pool</h1>
                </div>
                <div className="align-items-center">
                    <div className="d-flex justify-content-center align-items-center mb-3" >
                        <img src="../../static/images/logo.png" 
                            className="w-100 mb-3 px-2  justify-content-center align-items-center" 
                            style={{maxWidth: "600px"}}/>                       
                    </div>
                    <div className="row mx-2">
                        <div className="col-md-4 col-12 d-flex justify-content-center">
                            <img src="../../static/images/study.jpg" 
                                style={{
                                    maxWidth: "400px",
                                    width: "100%",
                                    objectFit: "cover",
                                    transition: "width 0.2s ease-in",
                                }} />
                        </div>
                        <div  className=" col-md-8 col-12">
                            <div className=" " 
                                style={{ fontSize: "1.2rem"}}>
                                <p>Nowadays, people can learn anything from anywhere with the help of Internet. Some courses are fee-required, some are free.</p>
                                <p>Unfortunately, a great number of people just don't think the free courses are worth it or don't know those courses exists.  </p>
                                <p> Course Pool is a web application built to help solve this problem. It provides free courses with the best quality to extend programming knowledge</p>
                                <p>All courses are organized in the library with tags for easy-to-find desired skills.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="mb-3">
                        <h2 className="text-light slogan fw-bold"> About Me</h2>
                    </div>
                    <div className="row mx-2 flex-row-reverse">
                        <div className="col-md-6 col-12 d-flex justify-content-center">
                            <img src="../../static/images/working.png" 
                                style={{
                                    maxWidth: "350px",
                                    width: "100%",
                                    objectFit: "cover",
                                    transition: "width 0.2s ease-in",
                                }} />
                        </div>
                        <div  className=" col-md-6 col-12">
                            <div className=" " 
                                style={{ fontSize: "1.2rem"}}>
                                <p>My name is Quoc Hung Tran. I am a Software Engineer with a huge passion for building things and solving problems.</p>
                                <p> Check out more about what I am working on at my Github
                                    <span className="ps-3">
                                        <a href="https://github.com/QuocHung52">
                                            <GitHubIcon style={{ 
                                                fontSize: "2.6rem",
                                                color:"#bcdeff"
                                            }}/></a>
                                    </span>
                                </p>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
    
};

export default AboutPage;
