import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout.jsx';

function Contact() {
    const [contactData, setContactData] = useState({ hero: {} });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const baseUrl = window.location.origin;
                const response = await fetch(`${baseUrl}/data/contactData.json`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Loaded contact data:", data);
                setContactData(data);
            } catch (error) {
                console.error("Error fetching contact data:", error);
                setError("Failed to load data. Please try refreshing the page.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEmailClick = () => {
        const email = contactData.hero.email;
        if (email) {
            window.location.href = `mailto:${email}`;
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="contact">
                    <div className="loading-container">
                        <h2>Loading...</h2>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="contact">
                    <div className="error-container">
                        <h2>Error</h2>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Refresh Page</button>
                    </div>
                </div>
            </Layout>
        );
    }

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