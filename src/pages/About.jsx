import React, { useEffect, useState, useRef } from 'react';
import Layout from '../Layout/Layout.jsx';

function About() {
    const [aboutData, setAboutData] = useState({
        hero: {},
        mystory: "",
        hobbies: "",
        gallery: [],
        skills: [],
        experience: []
    });
    
    const heroImageRef = useRef(null);

    useEffect(() => {
        fetch('/data/aboutData.json')
            .then(response => response.json())
            .then(data => setAboutData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (heroImageRef.current) {
                const scrollPosition = window.scrollY;
                const scale = Math.min(1.5, 1 + scrollPosition * 0.0003);
                heroImageRef.current.style.transform = `scale(${scale})`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Layout>
            <div className="main-content">
                <div className="hero-section">
                    <div className="hero-content">
                        <h1>{aboutData.hero.title || "loading..."}</h1>
                        <h2>{aboutData.hero.subtitle || "loading..."}</h2>
                    </div>
                    <p className="location-text">{aboutData.hero.location || "loading..."}</p>
                    <div className="hero-image-container">
                        <img
                            ref={heroImageRef}
                            src={aboutData.hero.image} 
                            alt="Hero" 
                            className="hero-image"
                        />
                    </div>
                </div>

                {/* My Story */}
                <section>
                    <h3>My Story</h3>
                    <p>{aboutData.myStory || "loading..."}</p>
                </section>

                {/* Hobbies */}
                <section>
                    <h3>Hobbies</h3>
                    <p>{aboutData.hobbies || "loading..."}</p>
                </section>

                {/* Gallery */}
                <section>
                    <h3>Gallery</h3>
                    <div className="gallery">
                        {aboutData.gallery.map((item, index) => (
                            <img key={index} src={item.image} alt={`Gallery ${index}`} />
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <h3>Skills</h3>
                    <ul>
                        {aboutData.skills.map((skill, index) => (
                            <li key={index}>
                                {skill.soft && <p><strong>Soft Skills:</strong> {skill.soft}</p>}
                                {skill.languages && <p><strong>Languages:</strong> {skill.languages}</p>}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Experience */}
                <section>
                    <h3>Experience</h3>
                    <ul>
                        {aboutData.experience.map((exp, index) => (
                            <li key={index}>
                                <p><strong>{exp.title}</strong> - {exp.year}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </Layout>
    );
}

export default About;
