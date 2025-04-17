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
            <div className="contact">
                <div className="contact-content">
                    <h1>{contactData.hero.title || "loading..."}</h1>
                    <p>{contactData.hero.explanation || "loading..."}</p>
                    <button className="contact-btn" onClick={handleEmailClick}>
                        <span>Send me a message</span>
                    </button>
                </div>
                <div className="contact-image">
                    <img src={contactData.hero.image} alt="Hero" />
                </div>
            </div>
        </Layout>
    );
}

export default Contact;