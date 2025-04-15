import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout/Layout.jsx';
import { Link } from 'react-router-dom';

function Home() {
    const [homeData, setHomeData] = useState({
        hero: {},
        about: {},
        works: { projects: [] },
        education: { universities: [] }
    });
    
    const heroImageRef = useRef(null);

    useEffect(() => {
        fetch('/data/homeData.json')
            .then(response => response.json())
            .then(data => setHomeData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (heroImageRef.current) {
                const scrollPosition = window.scrollY;
                const scale = 1 + (scrollPosition * 0.0001);
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
                        <h1>{homeData.hero.title || "loading..."}</h1>
                        <h2>{homeData.hero.subtitle || ""}</h2>
                        <Link to="/about" className="learn-more-btn">
                            <span>Learn More</span>
                        </Link>
                    </div>
                    <p className="location-text">{homeData.hero.location}</p>
                    <div className="hero-image-container">
                        <img 
                            ref={heroImageRef}
                            src="/images/home/hero.jpg" 
                            alt="Mahdi's photo" 
                            className="hero-image"
                        />
                    </div>
                </div>

                <div className='about'>
                    <h2>{homeData.about.title || "loading..."}</h2>
                    <div className="about-content">
                        <div className="left-column">
                            <button>
                                <a href="#works">View Works</a>
                            </button>
                        </div>
                        <div className="right-column">
                            <h3>Skills</h3>
                            <p>{homeData.about.skills}</p>

                            <h3>Hobbies</h3>
                            <p>{homeData.about.hobbies}</p>
                        </div>
                    </div>
                </div>

                <div className='work-section'>
                    <h2>{homeData.works.title || "loading..."}</h2>
                    <p>{homeData.works.explanation}</p>
                    <button>
                        <a href="/works">View Works</a>
                    </button>

                    <ul>
                        {homeData.works?.projects?.map((pro, index) => (
                            <li key={index}>
                                <img src={pro.image} alt={pro.name} className="project-image" />
                                <h3>{pro.name}</h3>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='education-section' id="education-section">
                    <h2>{homeData.education?.title || "loading..."}</h2>
                    <p>{homeData.education?.explanation || ""}</p>

                    <ul>
                        {homeData.education?.universities?.map((edu, index) => (
                            <li key={index}>
                                <h3>{edu.name}</h3>
                                <p>{edu.university}</p>
                                <p>{edu.degree}</p>
                                <p>{edu.duration}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
