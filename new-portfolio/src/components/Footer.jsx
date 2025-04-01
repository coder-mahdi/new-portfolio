import React, { useState, useEffect } from 'react';

function Header() {
    const [headerData, setHeaderData] = useState({ title: "", navLink: [], logo: "" });

    useEffect(() => {
        fetch('/data/headerData.json') 
            .then(response => response.json())
            .then(data => setHeaderData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <header>
            {headerData.logo && (
               <img src={'/data/' + headerData.logo} alt="logo" />

            )}
            <nav>
                {headerData.navLink.map((link, index) => (
                    <a key={index} href={link.link}>
                        {link.name}
                    </a>
                ))}
            </nav>
        </header>
    );
}

export default Header;
