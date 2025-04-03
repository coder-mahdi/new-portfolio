import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';



function Home() {
    const [homeData, setHomeData] = useState({hero: {}, about: {} });

    useEffect(() => {
        fetch('/data/homeData.json') 
            .then(response => response.json())
            .then(data => setHomeData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <Layout> 
            <div className="main-content">
                <h1>{homeData.hero.title || "loading..."}</h1>
                  <h2>{homeData.hero.subtitle || ""}</h2>
                <button>
                <a href="#about">{homeData.hero.buttonText || "Click me"}</a>
                </button>
                 <p>{homeData.hero.location}</p>
                < img src="/images/home/hero.jpg" alt="Mahdi's photo" />



                <div className='about'>
                <h2>{homeData.about.title || "loading..."}</h2>
                <button>
                    <a href="#works">View works</a>
                </button>
                <h3>Skills</h3>
                <p>{homeData.about.skills}</p>

                <h3>Hobbies</h3>
                <p>{homeData.about.hobbies}</p>
                </div>

                <div className='work-section'>
                </div>

                <div className='education-section'>
                </div>

                <div className='recomendation-section'>
                </div>

            </div>
        </Layout>
    );
}

export default Home;
