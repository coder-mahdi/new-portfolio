import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Header = () => {
    const [headerData, setHeaderData] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Current path:', location.pathname);
    }, [location]);

    useEffect(() => {
        const fetchHeaderData = async () => {
            setIsLoading(true);
            try {
                // Using absolute path with window.location.origin
                const baseUrl = window.location.origin;
                const response = await fetch(`${baseUrl}/data/headerData.json`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Loaded header data:", data);
                setHeaderData(data);
            } catch (error) {
                console.error('Error loading header data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHeaderData();
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

        // Add event listener for both mousedown and touchstart
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const handleEducationClick = (e) => {
        e.preventDefault();
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
        
        if (location.pathname !== '/') {
            // When on other pages, navigate to home with state to scroll to education
            navigate('/', { 
                state: { scrollTo: 'education-section' }
            });
        } else {
            const educationSection = document.getElementById('education-section');
            if (educationSection) {
                // Force scroll to education section with offset
                window.scrollTo({
                    top: educationSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Check if we're currently on the education section
    const isOnEducationSection = () => {
        if (location.pathname === '/') {
            const educationSection = document.getElementById('education-section');
            if (educationSection) {
                const rect = educationSection.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            }
        }
        return false;
    };

    if (isLoading) {
        return (
            <header className="header">
                <div className="header-left">
                    <div className="local-time">LOCAL/{currentTime}</div>
                </div>
                <div className="header-right">
                    <button className="btn menu-toggle">
                        <span>Menu</span>
                    </button>
                </div>
            </header>
        );
    }

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
                <button 
                    className="btn menu-toggle" 
                    onClick={toggleMenu} 
                    ref={buttonRef}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
                </button>
                
                <nav 
                    className={`main-nav ${isMenuOpen ? 'active' : ''}`} 
                    ref={menuRef}
                    aria-hidden={!isMenuOpen}
                >
                    <div className="nav-links">
                        {headerData.navLink.map((link, index) => {
                            const isCurrentPage = link.name === "Education" 
                                ? isOnEducationSection() 
                                : location.pathname === link.link;
                            
                            console.log(`Link ${link.name}:`, { path: link.link, isCurrentPage });
                            
                            // Special case for Education link
                            if (link.name === "Education") {
                                return (
                                    <a 
                                        key={index} 
                                        href="#education-section"
                                        data-hover-text={isCurrentPage ? 'here' : 'open'}
                                        className={isCurrentPage ? 'active' : ''}
                                        onClick={handleEducationClick}
                                    >
                                        {link.name}
                                    </a>
                                );
                            }
                            
                            return (
                                <Link 
                                    key={index} 
                                    to={link.link}
                                    data-hover-text={isCurrentPage ? 'here' : 'open'}
                                    className={isCurrentPage ? 'active' : ''}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        document.body.style.overflow = 'auto';
                                        // Scroll to top when navigating to a new page
                                        window.scrollTo(0, 0);
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
