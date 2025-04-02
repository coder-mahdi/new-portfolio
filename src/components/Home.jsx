import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';



function Home() {
    const [homeData, setHomeData] = useState({title:"", subtitle:""});

    useEffect(() => {
        fetch('/data/homeData.json') 
            .then(response => response.json())
            .then(data => setHomeData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <Layout> 
            <div className="main-content">
                <h1>{homeData.title}</h1>
                <h2>{homeData.subtitle}</h2>
                <h3>This is a test</h3>
            </div>
        </Layout>
    );
}

export default Home;
