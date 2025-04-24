import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Work({ homeData, worksData, projectItemsRef, projectImagesRef }) {
    // Get the latest 4 projects from worksData
    const latestProjects = worksData.projects.slice(0, 4);

    // Update projectItemsRef and projectImagesRef when latestProjects changes
    useEffect(() => {
        projectItemsRef.current = projectItemsRef.current.slice(0, latestProjects.length);
        projectImagesRef.current = projectImagesRef.current.slice(0, latestProjects.length);
    }, [latestProjects, projectItemsRef, projectImagesRef]);

    return (
        <div className='work-section'>
            <div className='work-content'>
                <div className='right-column'>
                    <h2>{worksData.title || "Selected Works"}</h2>
                </div>
                <div className='left-column'>
                    <p>{homeData.works.explanation || ""}</p>
                    <button>
                        <a href="/works">View Works</a>
                    </button>
                </div>
            </div>
            <ul className="projects-list">
                {latestProjects.map((pro, index) => (
                    <li 
                        key={index} 
                        className="project-item"
                        ref={el => projectItemsRef.current[index] = el}
                    >
                        <div className="image-container">
                            <img 
                                src={pro.image} 
                                alt={pro.alt || pro.name} 
                                ref={el => projectImagesRef.current[index] = el}
                            />
                        </div>
                        <h3>
                            <Link to={`/singlework/${pro.id}`}>{pro.name}</Link>
                        </h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Work; 