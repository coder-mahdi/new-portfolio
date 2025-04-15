import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    const [headerData, setHeaderData] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetch('/data/headerData.json')
            .then(response => response.json())
            .then(data => setHeaderData(data))
            .catch(error => console.error('Error loading header data:', error));
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            setCurrentTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (!headerData) return null;

    return (
        <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="header-left">
                <div className="local-time">{currentTime}</div>
                <a href="tel:+1234567890" className="phone-icon">
                    <i className="fas fa-phone"></i>
                </a>
            </div>

            <div className="header-right">
                <button className="menu-toggle" onClick={toggleMenu}>
                    <span className="hamburger"></span>
                </button>
                
                <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
                    {headerData.navLink.map((link, index) => (
                        <Link 
                            key={index} 
                            to={link.link}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
