import React from 'react';
import { Link } from 'react-router-dom';

function About({ homeData }) {
    return (
        <div className="about">
            <h2>{homeData.about.title || "loading..."}</h2>
            <div className="about-content">
                <div className="left-column">
                    <button>
                        <Link to="/about">Read More</Link>
                    </button>
                </div>
                <div className="right-column">
                    <h3>More THan Just Code</h3>
                    <p>{homeData.about["More Than Just Code"]}</p>

                    <h3>What Drives Me</h3>
                    <p>{homeData.about["What Drives Me"]}</p>
                </div>
            </div>
        </div>
    );
}

export default About; 