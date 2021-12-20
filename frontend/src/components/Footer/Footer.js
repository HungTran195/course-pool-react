import React from "react";

const Footer = () => {
    return (
        <>
            <div className="text-center text-light py-2 bg-dark">
                <p>Made with <span className="fas fa-heart px-1"></span> & <span className="fa fa-coffee px-1"></span>
                    by <span className="text-name-footter">Hung Tran</span></p>
                <p className="mb-2">Want to see more projects like this? </p>
                <a className="text-light" href="https://github.com/QuocHung52" target="_blank"><i
                    className="fab fa-github fa-2x"></i></a>

            </div>
            <div className="seperate-line"></div>
            <div className="text-light text-center pt-2  bg-dark">
                <p> &copy; 2021 All Right Reserved</p>
            </div>
        </>
    )

}

export default Footer;