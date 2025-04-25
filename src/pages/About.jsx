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
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

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
            <div className="about-main-content">
                <div className="about-hero-section">
                    <div className="about-hero-content">
                        <h1>{aboutData.hero.title || "loading..."}</h1>
                        <h2>{aboutData.hero.subtitle || "loading..."}</h2>
                    </div>
                    {/* <p className="about-location-text">{aboutData.hero.location || "loading..."}</p> */}
                    <div className="about-hero-image-container">
                        <img
                            ref={heroImageRef}
                            src={aboutData.hero.image} 
                            alt="Hero" 
                            className="about-hero-image"
                        />
                    </div>
                </div>

               
                <section className="about-story">
                    <h3>My Story</h3>
                    <p>{aboutData.myStory || "loading..."}</p>
                </section>

               
                <section className="about-hobbies">
                    <h3>Hobbies</h3>
                    <p>{aboutData.hobbies || "loading..."}</p>
                </section>

           
   
    
                    <div className="about-gallery">
                        {aboutData.gallery.map((item, index) => (
                            <img key={index} src={item.image} alt={`Gallery ${index}`} />
                        ))}
                    </div>


                {/* Skills */}
                <section className="about-skills">
                    <h3>Skills</h3>
                    <div className="about-skills-grid">
                        {aboutData.skills.map((skill, index) => (
                            <div className="about-skill-box" key={index}>
                                {skill.soft && (
                                    <div className="about-skill-content">
                                        <h4>Soft Skills</h4>
                                        <p>{skill.soft}</p>
                                    </div>
                                )}
                                {skill.languages && (
                                    <div className="about-skill-content">
                                        <h4>Languages</h4>
                                        <p>{skill.languages}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section className="about-experience">
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
