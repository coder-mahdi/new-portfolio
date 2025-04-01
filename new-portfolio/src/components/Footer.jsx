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
            <h2>{footerData.title}</h2>
            <h3>{footerData.subtitle}</h3>
            <nav>
                {footerData.navLink.map((link, index) => (
                    <a key={index} href={link.link}>
                        {link.name}
                    </a>
                ))}
            </nav>
            <p>&copy;{new Date().getFullYear()} Mahdi Roozbahani</p>
            <button 
            onClick={scrollToTop}>↑Back to top</button>
        </footer>
    );
}

export default Footer;
