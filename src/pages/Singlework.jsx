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
                <h1>{project.name}</h1>
                {project.image && (
                    <img src={project.image} alt={project.alt || project.name} />
                )}
                <p>{details.overview || project.overview || 'No overview available'}</p>

          

                {project.details && (
  <div className="project-details mt-6">
    <h2 className="text-xl font-semibold mb-4">Project Details</h2>
    <ul className="space-y-2 text-base">
      {["Client", "Year", "Category", "ProjectLink", "Live Project"].map((key) => (
        <li key={key}>
          <strong>{key}:</strong>{" "}
          {project.details[key]?.toString().startsWith("http") ? (
            <a href={project.details[key]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
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

<motion.div
  animate={{ rotate: [0, 15, -15, 0] }}
  transition={{ duration: 0.6, repeat: 3, repeatDelay: 0.5 }}
>
  <Link to={`/works`} className="see-more-works">
    see more works
  </Link>
</motion.div>



                {Object.entries(sections).map(([sectionTitle, items], index) => (
                    <div key={index}>
                        <h2>{sectionTitle}</h2>
                        <ul>
                            {items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}


            </div>
        </Layout>
    );
}

export default SingleWork;
