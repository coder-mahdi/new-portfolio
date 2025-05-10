import React, { useState, useEffect } from 'react';

function Footer() {
    const [footerData, setFooterData] = useState({ title: "", subtitle: "", navLink: [] });

    useEffect(() => {
        fetch('/data/footerData.json') 
            .then(response => response.json())
            .then(data => setFooterData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const scrollToTop = () => {
        window.scrollTo({top:0, behavior: "smooth"});
    };

    return (
        <footer>
            <div className="social-links">
                <a href="https://www.instagram.com/roozbahani.mahdi/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.linkedin.com/in/mahdi-roozbahani/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <h2>{footerData.title}</h2>
            <h3>{footerData.subtitle}</h3>
            <div className='footer-bottom'>
                <p>&copy;{new Date().getFullYear()} Mahdi Roozbahani</p>
                <button onClick={scrollToTop}>↑Back to top</button>
            </div>
        </footer>
    );
}

export default Footer;
