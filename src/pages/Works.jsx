import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout.jsx';

function Works() {
    const [worksData, setWorksData] = useState({ title: "", explanation: "", projects: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const projectImagesRef = useRef([]);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const baseUrl = window.location.origin;
            const response = await fetch(`${baseUrl}/data/worksData.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            const shuffled = [ ...data.projects].sort(() => 0.99 - Math.random());
            const randomProjects = shuffled.slice(0, 4);

            setWorksData({...data, projects: randomProjects});
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try refreshing the page.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Remove the interval to prevent unnecessary data fetching
        // const intervalId = setInterval(fetchData, 5000);
        // return () => clearInterval(intervalId);
    }, []); 

    useEffect(() => {
        const handleScroll = () => {
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
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Split title into two lines
    const splitTitle = (title) => {
        if (!title) return { firstLine: "loading...", secondLine: "" };
        const words = title.split(' ');
        const midPoint = Math.ceil(words.length / 2);
        return {
            firstLine: words.slice(0, midPoint).join(' '),
            secondLine: words.slice(midPoint).join(' ')
        };
    };

    const { firstLine, secondLine } = splitTitle(worksData.title);

    if (isLoading) {
        return (
            <Layout>
                <div className="main-content">
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
                <div className="main-content">
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
            <div className="main-content">
                <div className='works-content'>
                    <div className='works-title'> 
                        <h1>
                            {firstLine} {secondLine}
                        </h1>
                    </div>
                    <p className='works-explanation'>{worksData.explanation}</p>
                </div>

                <ul className='projects-list'>
                    {worksData.projects?.map((projects, index) => (
                        <li key={index}>
                            <h3>{projects.name || "No name"}</h3>
                            {projects.image && (
                                <div className="image-container">
                                    <img 
                                        src={projects.image} 
                                        alt={projects.name}
                                        ref={el => projectImagesRef.current[index] = el}
                                    />
                                </div>
                            )}
                            <p>
                                <Link to={`/singlework/${projects.id}`} className="learn-more-btn">
                                    Learn More
                                </Link>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default Works;
