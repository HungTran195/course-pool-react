import React, { Component } from 'react';

export default class HeroSectionForFavorite extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div className="hero-section">
                <div className={`slogan text-light ${this.props.pageState ? "bg-dark" : null}`}>
                    <div className="slogan-container">
                        <h1 className="mb-3">Your Favorites</h1>
                        <p className="fs-5">Seems like you don't have any favorite Course</p>
                        <p className="fs-6">Click the <i className="fas fa-star"></i> icon below courses to set them as your favorites </p>
                    </div>
                </div>
            </div>
        )
    }

}
