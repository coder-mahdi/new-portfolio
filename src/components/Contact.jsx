import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';



    function Contact() {
        const [contactData, setContactData] = useState({ hero: {},});
    
        useEffect(() => {
            fetch('/data/contactData.json')
                .then(response => response.json())
                .then(data => setContactData(data))
                .catch(error => console.error("Error fetching data:", error));
        }, []);


        return (
            <Layout>
                <div className="main-content">
                    {/* Hero Section */}
                    <h1>{contactData.hero.title || "loading..."}</h1>
                    <h2>{contactData.hero.subtitle || "loading..."}</h2>
                    <p>{contactData.hero.location || "loading..."}</p>
                    <img src={contactData.hero.image} alt="Hero" />
                    
                </div>
            </Layout>
        );



} 
export default Contact;