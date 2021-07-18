import React, { Component } from 'react';

export default class HeroSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroSectionForPage: this.props.props.fromPage,
            value: '',
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    };

    handleFormChange(event) {
        this.setState({ value: event.target.value });
    };

    handleFormSubmit = (event) => {
        alert("Form submited " + this.state.value);
        event.preventDeefault();
    }

    renderHeroSection = () => {
        if (this.state.heroSectionForPage === "HomePage") {
            return (
                <>
                    <div className="slogan text-light bg-dark">
                        <div className="slogan-container">
                            <h1>No Need to Pay</h1>
                            <p>We have some great free courses for you!</p>
                        </div>
                    </div>
                    <div className=" my-2 mb-3 search-bar " onSubmit={this.handleFormSubmit}>
                        <form className="input-group">
                            <input className="form-control rounded-start"
                                type="text" name="key"
                                placeholder="Python, JavaScript, Swift..."
                                onChange={this.handleFormChange} />
                            <button className="btn-outline-light bg-info text-dark rounded-end" type="submit"><i
                                className="fas fa-search px-2"></i></button>
                        </form>
                    </div>
                </>
            )
        }
        else if (this.state.heroSectionForPage === "FavoritePage") {
            return (
                <div className="slogan text-light">
                    <div className="slogan-container">
                        <h1 className="mb-3">Your Favorites</h1>
                        <p className="fs-5">Seems like you don't have any favorite Course</p>
                        <p className="fs-6">Click the <i className="fas fa-star"></i> icon below courses to set them as your favorites </p>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="hero-section">
                {this.state.heroSectionForPage ? this.renderHeroSection() : null}
            </div>
        )
    }
    componentDidMount() {
        console.log("HeroSection component loaded...", this.props);

    }

}
