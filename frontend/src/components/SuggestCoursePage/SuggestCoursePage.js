import React, { Component } from "react";
import HeroSectionForSuggest from "./HeroSectionForSuggest"
export default class SuggestCoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            courseName: "",
            courseURL: "",
            description: "",
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }
    handleFormChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        console.log(name, value);
        this.setState({ [name]: value });
    }

    handleFormSubmit(event) {
        // TODO: send sugegstion to server 
        alert("Form submitted!" + this.state.name + this.state.email);
        event.preventDefault();
    }

    renderSuggestCoursePage = () => {
        return (
            <div id="forms" className="pb-3 pt-3 pb-5">
                <form className="form mx-auto" onSubmit={this.handleFormSubmit}>
                    <div className="input-group row">
                        <label
                            className="col-lg-2 col-md-1 col-form-label form-control-label text-light justify-content-end align-items-center d-lg-flex ">Name</label>
                        <div className="col-md-5 col-lg-4">
                            <input className="form-control mb-2" id="id_name" type="text" name="name"
                                placeholder="James" value={this.name} onChange={this.handleFormChange} />
                        </div>
                        <label
                            className="col-lg-2 col-md-1 col-form-label form-control-label text-light justify-content-end align-items-center d-lg-flex">Email</label>
                        <div className="col-md-5 col-lg-4">
                            <input className="form-control mb-lg-2" id="id_email" type="text" name="email"
                                value={this.email} placeholder="email@gmail.com" onChange={this.handleFormChange} />
                        </div>
                    </div>


                    <div className="input-group row mt-2 mt-lg-4">
                        <label className="col-lg-2 col-form-label form-control-label justify-content-end align-items-center d-lg-flex text-light ">Course
                            Name</label>
                        <div className="col-lg">
                            <input className="form-control" id="id_course_name" type="text" name="course_name"
                                placeholder="Django from zero to hero" value={this.courseName} onChange={this.handleFormChange} required />
                        </div>
                    </div>
                    <div className="input-group row mt-2 mt-lg-4">
                        <label
                            className="col-lg-2 col-form-label form-control-label text-light justify-content-end align-items-center d-lg-flex">Course
                            URL</label>
                        <div className="col-lg-10">
                            <input className="form-control" id="id_course_url" name="course_url" type="text" placeholder=""
                                value={this.courseURL} onChange={this.handleFormChange} required />
                        </div>
                    </div>

                    <div className="input-group row mt-2 mt-lg-4">
                        <label
                            className="col-lg-2 col-form-label form-control-label text-light justify-content-end align-items-center d-lg-flex">Description</label>
                        <div className="col-lg-10">
                            <textarea className="form-control" id="id_description" type="text" name="description" required
                                placeholder="This course will give you a full introduction into all of the core concepts in python."
                                value={this.description} onChange={this.handleFormChange} />
                        </div>
                    </div>

                    <div className="input-group row mt-2 mt-lg-3">
                        <label className="col-lg-2"></label>
                        <div className="col-lg-10">
                            <input type="reset" className="btn btn-outline-secondary mr-2" value="Cancel" />
                            <input type="submit" className="btn btn-primary mr-2" name="submit" value="Submit" />
                        </div>
                    </div>
                </form>

            </div>

        )

    }
    render() {
        return (
            <>
                <HeroSectionForSuggest pageName={this.state.pageName} />
                <div className="container">
                    {this.renderSuggestCoursePage()}
                </div>
            </>
        )
    }

    componentDidMount() {
        document.title = "Course Pool | Suggest Your Favorite Course";
    }
}