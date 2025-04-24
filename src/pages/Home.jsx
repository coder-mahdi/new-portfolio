import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout/Layout.jsx';
import { Link, useLocation } from 'react-router-dom';
import About from '../components/About';
import Worksection from '../components/Worksection';
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

            // Check if project items are in view
            projectItemsRef.current.forEach((item, index) => {
                if (item) {
                    const rect = item.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
                    
                    if (isVisible) {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200); // Add delay based on index
                    }
                }
            });
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

                <About homeData={homeData} />
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
