import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout.jsx';




function Works() {
    const [worksData, setWorksData] = useState({ title: "", explanation: "", projects: [] });

    useEffect(() => {
        fetch('/data/worksData.json') 
            .then(response => response.json())
            .then(data => {
                const shuffled = [ ...data.projects].sort(() => 5 - Math.random());
                const randomProjects = shuffled.slice(0, 4);

                setWorksData({...data, projects: randomProjects});
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <Layout> 
            <div className="main-content">
                <h1>{worksData.title || "loading..."}</h1>
                 <p>{worksData.explanation}</p>

                 <ul className='projects-list'>
                    {worksData.projects?.map((projects, index) => {
                        return ( 

                        <li key={index}>
                            <h3>{projects.name || "No name"}</h3>
                            {projects.image && (
                                <img src={projects.image} alt={projects.name} />

                                 )}

                            <p>
                                <Link to={`/singlework/${projects.id}`} className="learn-more-btn">
                                 Learn More
                                </Link>
                            </p>
                        </li>

                    )}
                    )}
                 </ul>
            </div>
        </Layout>
    );
}

export default Works;
