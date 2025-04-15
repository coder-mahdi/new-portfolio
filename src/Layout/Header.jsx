import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    const [headerData, setHeaderData] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && 
                menuRef.current && 
                !menuRef.current.contains(event.target) && 
                buttonRef.current && 
                !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                document.body.style.overflow = 'auto';
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
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
                <button className="btn menu-toggle" onClick={toggleMenu} ref={buttonRef}>
                    <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
                </button>
                
                <nav className={`main-nav menu-box ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                    {headerData.navLink.map((link, index) => (
                        <Link 
                            key={index} 
                            to={link.link}
                            onClick={() => {
                                setIsMenuOpen(false);
                                document.body.style.overflow = 'auto';
                            }}
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
