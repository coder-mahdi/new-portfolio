import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Header = () => {
    const [headerData, setHeaderData] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        console.log('Current path:', location.pathname);
    }, [location]);

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
                <div className="local-time">LOCAL/{currentTime}</div>
                <Link to="/contact" className="phone-icon">
                    <i className="fas fa-phone"></i>
                </Link>
            </div>

            <div className="header-right">
                <button className="btn menu-toggle" onClick={toggleMenu} ref={buttonRef}>
                    <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
                </button>
                
                <nav className={`main-nav menu-box ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                    <div className="nav-links">
                        {headerData.navLink.map((link, index) => {
                            const isCurrentPage = location.pathname === link.link;
                            console.log(`Link ${link.name}:`, { path: link.link, isCurrentPage });
                            return (
                                <Link 
                                    key={index} 
                                    to={link.link}
                                    data-hover-text={isCurrentPage ? 'here' : 'open'}
                                    className={isCurrentPage ? 'active' : ''}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        document.body.style.overflow = 'auto';
                                    }}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="social-links">
                        <a 
                            href="#" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                        <a 
                            href="#" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
