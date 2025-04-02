import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';



function Home() {
    const [homeData, setHomeData] = useState({});

    useEffect(() => {
        fetch('/data/homeData.json') 
            .then(response => response.json())
            .then(data => setHomeData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <Layout> 
            <div className="main-content">
                <h1>{homeData.title || "loading..."}</h1>
                <h2>{homeData.subtitle || ""}</h2>
                <button>{homeData.buttonText || "Click me"}
                <a href="#about"></a>
                </button>
            </div>
        </Layout>
    );
}

export default Home;
