import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout/Layout.jsx';
import { Link, useLocation } from 'react-router-dom'

function Home() {
    const [homeData, setHomeData] = useState({
        hero: {},
        about: {},
        works: { projects: [] },
        education: { universities: [] }
    });
    
    const [worksData, setWorksData] = useState({
        projects: []
    });
    
    const heroImageRef = useRef(null);
    const graduationIconRef = useRef(null);
    const educationContentRef = useRef(null);
    const educationSectionRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        fetch('/data/homeData.json')
            .then(response => response.json())
            .then(data => setHomeData(data))
            .catch(error => console.error("Error fetching data:", error));
            
        fetch('/data/worksData.json')
            .then(response => response.json())
            .then(data => setWorksData(data))
            .catch(error => console.error("Error fetching works data:", error));
    }, []);

    // Handle scrolling to education section when navigating from another page
    useEffect(() => {
        if (location.state?.scrollTo === 'education-section') {
            const educationSection = document.getElementById('education-section');
            if (educationSection) {
                setTimeout(() => {
                    window.scrollTo({
                        top: educationSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            if (heroImageRef.current) {
                const scrollPosition = window.scrollY;
                const scale = Math.min(1.5, 1 + scrollPosition * 0.0003);
                heroImageRef.current.style.transform = `scale(${scale})`;
            }

            if (graduationIconRef.current) {
                const educationSection = document.getElementById('education-section');
                if (educationSection) {
                    const rect = educationSection.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        graduationIconRef.current.classList.add('visible');
                        
                        const educationList = educationSection.querySelector('.education-list');
                        const listHeight = educationList.offsetHeight;
                        
                        const isPastSection = rect.bottom < 0;
                        
                        if (isPastSection) {
                            graduationIconRef.current.style.top = `${listHeight}px`;
                        } else {
                            const scrollProgress = Math.min(4, Math.max(0, 
                                (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
                            ));
                            
                            const iconPosition = scrollProgress * listHeight;
                            graduationIconRef.current.style.top = `${iconPosition}px`;
                        }
                    } else {
                        graduationIconRef.current.classList.remove('visible');
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get the latest 4 projects from worksData
    const latestProjects = worksData.projects.slice(0, 4);

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

                <div className="about">
                    <h2>{homeData.about.title || "loading..."}</h2>
                    <div className="about-content">
                        <div className="left-column">
                            <button>
                                <a href="#works">Read More</a>
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

                <div className='work-section'>
                    <div className='work-content'>
                        <div className='right-column'>
                        <h2>{worksData.title || "Selected Works"}</h2>
                        </div>
                        <div className='left-column'>
                        <p>{worksData.explanation || ""}</p>
                        <button>
                        <a href="/works">View Works</a>
                        </button>
                        </div>
                         </div>
                     <ul>
                        {latestProjects.map((pro, index) => (
                            <li key={index}>
                                <img src={pro.image} alt={pro.alt || pro.name} className="project-image" />
                                <h3>
                                    <Link to={`/singlework/${pro.id}`}>{pro.name}</Link>
                                </h3>
                            </li>
                        ))}
                     </ul>
                </div>

                <div className='education-section' id="education-section" ref={educationSectionRef}>
                    <div className='education-content' ref={educationContentRef}>
                        <h2>{homeData.education?.title || "loading..."}</h2>
                        <p>{homeData.education?.explanation || ""}</p>
                    </div>

                    <div className='education-list'>
                        <div className='education-container'>
                            <i className="fas fa-graduation-cap graduation-icon" ref={graduationIconRef}></i>
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
                </div>
            </div>
        </Layout>
    );
}

export default Home;
