import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';



function Home() {
    const [homeData, setHomeData] = useState({
        hero: {},
        about: {},
        works: { projects: [] },
        education: { universities: [] }
    });

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
                    <a href="#works">View Works</a>
                </button>
                <h3>Skills</h3>
                <p>{homeData.about.skills}</p>

                <h3>Hobbies</h3>
                <p>{homeData.about.hobbies}</p>
                </div>

                <div className='work-section'>
                    <h2>{homeData.works.title || "loading..."}</h2>
                    <p>{homeData.works.explanation}</p>
                    <button>
                        <a href="#woks"> View Works</a>
                    </button>

                    <ul>
                        {homeData.works?.projects?.map((pro, index) => (
                            <li key={index}>
                                <img src={pro.image} alt={pro.name} className="project-image" />
                                <h3>{pro.name}</h3>
                            </li>
                        ) )}
                    </ul>
                </div>

                <div className='education-section'>
                    <h2>{homeData.education?.title || "loading..."}</h2>
                    <p>{homeData.education?.explanation || ""}</p>

                    <ul>
                        {homeData.education?.universities?.map((edu, index) => (
                            <li key={index}>
                                <h3>{edu.name}</h3>
                                <p>{edu.university}</p>
                                <p>{edu.degree}</p>
                                <p>{edu.duration}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='recomendation-section'>
                </div>

            </div>
        </Layout>
    );
}

export default Home;
