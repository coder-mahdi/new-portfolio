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
                <div className="singlework-content">
                    <div className="singlework-header">
                        <h1 className="singlework-title">{project.name}</h1>
                        <p className="singlework-overview">{details.overview || project.overview || 'No overview available'}</p>
                    </div>

                    {project.details && (
                        <div className="project-details">
                            <h2 className="details-title">Project Details</h2>
                            <ul className="details-list">
                                {["Client", "Year", "Category", "ProjectLink", "Live Project"].map((key) => (
                                    <li key={key} className="details-item">
                                        <strong>{key}:</strong>{" "}
                                        {project.details[key]?.toString().startsWith("http") ? (
                                            <a href={project.details[key]} target="_blank" rel="noopener noreferrer" className="details-link">
                                                {project.details[key]}
                                            </a>
                                        ) : (
                                            project.details[key]
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.image && (
                        <div className="singlework-hero">
                            <img src={project.image} alt={project.alt || project.name} className="hero-image" />
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
        </Layout>
    );
}

export default SingleWork;
