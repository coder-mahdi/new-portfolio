import React, { useEffect, useState, useRef } from 'react';
import Layout from '../Layout/Layout.jsx';
import SkillIcon from '../components/SkillIcon';

function About() {
    const [aboutData, setAboutData] = useState({
        hero: {},
        mystory: "",
        hobbies: "",
        gallery: [],
        skills: [],
        experience: []
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const heroImageRef = useRef(null);
    const galleryImageRefs = useRef([]);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // Using absolute path with window.location.origin
                const baseUrl = window.location.origin;
                const response = await fetch(`${baseUrl}/data/aboutData.json`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Loaded about data:", data);
                setAboutData(data);
            } catch (error) {
                console.error("Error fetching about data:", error);
                setError("Failed to load data. Please try refreshing the page.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Hero image zoom effect
            if (heroImageRef.current) {
                const scrollPosition = window.scrollY;
                const scale = Math.min(1.5, 1 + scrollPosition * 0.0003);
                heroImageRef.current.style.transform = `scale(${scale})`;
            }
            
            // Gallery images zoom effect
            galleryImageRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    
                    // Calculate how far the image is from the center of the viewport
                    const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;
                    
                    // Apply zoom effect based on distance from center
                    // The closer to center, the more zoom
                    const zoomFactor = Math.max(0.95, 1 - Math.abs(distanceFromCenter) * 0.0005);
                    ref.style.transform = `scale(${zoomFactor})`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to render developer skills with icons
    const renderDeveloperSkills = (skillsString) => {
        if (!skillsString) return null;
        
        // Split the skills string by commas
        const skills = skillsString.split(',').map(skill => skill.trim());
        
        return (
            <div className="technical-skills-list">
                {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                        <SkillIcon skillName={skill} />
                        <span>{skill}</span>
                    </div>
                ))}
            </div>
        );
    };

    // Function to render software and tools with icons
    const renderSoftwareAndTools = (toolsString) => {
        if (!toolsString) return null;
        
        // Split the tools string by commas
        const tools = toolsString.split(',').map(tool => tool.trim());
        
        return (
            <div className="technical-skills-list">
                {tools.map((tool, index) => (
                    <div key={index} className="skill-item">
                        <SkillIcon skillName={tool} />
                        <span>{tool}</span>
                    </div>
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="about-main-content">
                    <div className="loading-container">
                        <h2>Loading...</h2>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="about-main-content">
                    <div className="error-container">
                        <h2>Error</h2>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Refresh Page</button>
                    </div>
                </div>
            </Layout>
        );
    }

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
                            <img 
                                key={index} 
                                src={item.image} 
                                alt={`Gallery ${index}`} 
                                ref={el => galleryImageRefs.current[index] = el}
                            />
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
                                {skill["Developer Skills"] && (
                                    <div className="about-skill-content">
                                        <h4>Developer Skills</h4>
                                        {renderDeveloperSkills(skill["Developer Skills"])}
                                    </div>
                                )}
                                {skill["Software & Tools"] && (
                                    <div className="about-skill-content">
                                        <h4>Software & Tools</h4>
                                        {renderSoftwareAndTools(skill["Software & Tools"])}
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
                    <div className="about-experience-header">
                        <h3>Experience</h3>
                    </div>
                    <div className="about-experience-grid">
                        {aboutData.experience.map((exp, index) => (
                            <div className="about-experience-box" key={index}>
                                <h4>{exp.title}</h4>
                                <p>{exp.year}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default About;
