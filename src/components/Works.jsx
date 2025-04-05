import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';
import { li } from 'framer-motion/client';



function Works() {
    const [worksData, setWorksData] = useState({ title: "", explanation: "", projects: [] });

    useEffect(() => {
        fetch('/data/worksData.json') 
            .then(response => response.json())
            .then(data => setWorksData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <Layout> 
            <div className="main-content">
                <h1>{worksData.title || "loading..."}</h1>
                 <p>{worksData.title}</p>

                 <ul>
                    {worksData.projects?.map((projects, index) => {
                        return ( 

                        <li key={index}>
                            <h3>{projects.name || "No name"}</h3>
                            {projects.image && (
                                <img src={projects.image} alt={projects.name} />

                                 )}
                        </li>

                    )}
                    )}
                 </ul>
            </div>
        </Layout>
    );
}

export default Works;
