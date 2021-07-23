import React, { Component } from 'react';

export default class HeroSectionForHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            darkMode: true,
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    };

    handleFormChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleFormSubmit = (event) => {
        // TODO : Implement a search function for courses
        alert("Form submited " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="hero-section">
                <div className="slogan text-light bg-dark">
                    <div className="slogan-container">
                        <h1>No Need to Pay</h1>
                        <p>We have some great free courses for you!</p>
                    </div>
                </div>
                <div className=" my-2 mb-3 search-bar " >
                    <form className="input-group" onSubmit={this.handleFormSubmit}>
                        <input className="form-control rounded-start"
                            type="text" name="key"
                            placeholder="Python, JavaScript, Swift..."
                            onChange={this.handleFormChange} />
                        <button className="btn-outline-light bg-info text-dark rounded-end" type="submit"><i
                            className="fas fa-search px-2"></i></button>
                    </form>
                </div>
            </div>
        )
    }

}
