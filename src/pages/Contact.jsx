import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout.jsx';

function Contact() {
    const [contactData, setContactData] = useState({ hero: {},});
    
    useEffect(() => {
        fetch('/data/contactData.json')
            .then(response => response.json())
            .then(data => setContactData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleEmailClick = () => {
        const email = contactData.hero.email;
        if (email) {
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <Layout>
            <div className="main-content">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-content">
                        <h1>{contactData.hero.title || "loading..."}</h1>
                        <h2>{contactData.hero.subtitle || "loading..."}</h2>
                        <p>{contactData.hero.location || "loading..."}</p>
                        <button className="contact-button" onClick={handleEmailClick}>Send me a message</button>
                    </div>
                    <img src={contactData.hero.image} alt="Hero" />
                </div>
            </div>
        </Layout>
    );
}

export default Contact;