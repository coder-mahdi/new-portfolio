import React, { useEffect, useState } from 'react';
import '../styles/education.scss';

const Education = () => {
    const [educationData, setEducationData] = useState(null);

    useEffect(() => {
        fetch('/data/educationData.json')
            .then(response => response.json())
            .then(data => setEducationData(data))
            .catch(error => console.error('Error loading education data:', error));
    }, []);

    if (!educationData) return <div>Loading...</div>;

    return (
        <section className="education-section">
            <div className="container">
                <h1 className="section-title">Education</h1>
                <div className="education-grid">
                    {educationData.education.map(item => (
                        <div key={item.id} className="education-card">
                            <h2>{item.title}</h2>
                            <h3>{item.school}</h3>
                            <p className="period">{item.period}</p>
                            <p className="description">{item.description}</p>
                            <div className="skills">
                                {item.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education; 