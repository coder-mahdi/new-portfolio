import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';
import { useParams } from 'react-router-dom';

function Singlework() {
    const { projectId } = useParams(); 
    const [project, setProject] = useState(null);
    // const [buttonsData, setButtonsData] = useState([]);
  
    useEffect(() => {
      fetch('/data/worksData.json')
        .then((response) => response.json())
        .then((data) => {
          const foundProject = data.projects.find((proj) => proj.id === parseInt(projectId));
          setProject(foundProject);
        })
        .catch((error) => console.error('Error loading project data:', error));
    }, [projectId]);

  
    if (!project) {
      return <div>Loading...</div>;
    }

  return (
    <Layout>
      <div className="main-content">
        {worksData ? (
          <>
            <h1>{worksData.title}</h1>
            <p>{worksData.projects[0].overview}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
  
}

export default Singlework;
