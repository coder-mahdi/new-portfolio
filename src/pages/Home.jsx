import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout/Layout.jsx';
import { Link, useLocation } from 'react-router-dom';
import Aboutsection from '../components/Aboutsection';
import Worksection from '../components/Worksection.jsx';
import Education from '../components/Education';

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
    const projectItemsRef = useRef([]);
    const projectImagesRef = useRef([]);
    const location = useLocation();

    useEffect(() => {
        fetch('/data/homeData.json')
            .then(response => response.json())
            .then(data => {
                console.log("Loaded homeData:", data);
                setHomeData(data);
            })
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

            projectImagesRef.current.forEach((img, index) => {
                if (img) {
                    const rect = img.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        const scrollProgress = Math.min(1, Math.max(0, 
                            (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
                        ));
                        
                        const scale = 1 + (scrollProgress * 0.1);
                        img.style.transform = `scale(${scale})`;
                    } else {
                        // Reset scale when not visible
                        img.style.transform = 'scale(1)';
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        
        // Log the hero image element after it's rendered
        console.log("Hero image element:", heroImageRef.current);
        console.log("Hero image src:", heroImageRef.current?.src);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Layout>
            <div className="main-content">
                <div className="hero-section">
                    <div className="hero-container">
                        <div className="hero-content">
                            <h1>{homeData.hero?.title || "loading..."}</h1>
                            <h2>{homeData.hero?.subtitle || ""}</h2>
                            <Link to="/about" className="learn-more-btn">
                                <span>Learn More</span>
                            </Link>
                        </div>
                        <div className="location-text">{homeData.hero?.location || ""}</div>
                    </div>

                    <div className="hero-image-container">
                        {console.log("Image path in render:", homeData.hero?.image)}
                        <img 
                            ref={heroImageRef}
                            src={homeData.hero?.image || ""} 
                            alt="Hero" 
                            className="hero-image"
                        />
                    </div>
                </div>

                <Aboutsection homeData={homeData} />
                
                <Worksection 
                    homeData={homeData}
                    worksData={worksData}
                    projectItemsRef={projectItemsRef}
                    projectImagesRef={projectImagesRef}
                />
                
                <Education 
                    homeData={homeData}
                    graduationIconRef={graduationIconRef}
                    educationSectionRef={educationSectionRef}
                    educationContentRef={educationContentRef}
                />
            </div>
        </Layout>
    );
}

export default Home;
