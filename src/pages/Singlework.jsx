import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout.jsx';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function SingleWork() {
    const { id } = useParams(); 
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch('/data/worksData.json')
            .then(response => response.json())
            .then(data => {
                const foundProject = data.projects.find(p => p.id === Number(id));
                setProject(foundProject);
            })
            .catch(error => console.error('Error fetching project data:', error));
    }, [id]);

    if (!project) {
        return (
            <Layout>
                <div className="main-content">
                    <p>Loading project...</p>
                </div>
            </Layout>
        );
    }

    const details = project.details || project.detailedDescription || {};
    const sections = details.sections || project.sections || {};

    return (
        <Layout>
            <div className="main-content">
                <div className="single-work">
                    <div className="single-work__container">
                        <div className="single-work__content">
                            <div className="single-work__text-content">
                                <h1>{project.name}</h1>
                                <p>{details.overview || project.overview || 'No overview available'}</p>
                            </div>

                            {project.details && (
                                <div className="single-work__details">
                                    <div className="single-work__details-labels">
                                        {["Client", "Year", "Category", "ProjectLink", "Live Project"].map((key) => (
                                            <div key={key} className="single-work__details-label">
                                                {key}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="single-work__details-values">
                                        {["Client", "Year", "Category", "ProjectLink", "Live Project"].map((key) => (
                                            <div key={key} className="single-work__details-value">
                                                {project.details[key]?.toString().startsWith("http") ? (
                                                    <a href={project.details[key]} target="_blank" rel="noopener noreferrer">
                                                        {project.details[key]}
                                                    </a>
                                                ) : (
                                                    project.details[key]
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {project.image && (
                            <div className="single-work__image-container">
                                <picture>
                                    <source 
                                        media="(min-width: 1024px)" 
                                        srcSet={project.desktopImage || project.image} 
                                    />
                                    <source 
                                        media="(min-width: 768px)" 
                                        srcSet={project.tabletImage || project.image} 
                                    />
                                    <img 
                                        src={project.mobileImage || project.image} 
                                        alt={project.alt || project.name} 
                                        className="single-work__image" 
                                    />
                                </picture>
                            </div>
                        )}

                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 0.6, repeat: 3, repeatDelay: 0.5 }}
                            className="see-more-container"
                        >
                            <Link to="/works" className="see-more-works">
                                see more works
                            </Link>
                        </motion.div>

                        {Object.entries(sections).map(([sectionTitle, items], index) => (
                            <div key={index} className="section-container">
                                <h2 className="section-title">{sectionTitle}</h2>
                                <ul className="section-list">
                                    {items.map((item, idx) => (
                                        <li key={idx} className="section-item">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SingleWork;
