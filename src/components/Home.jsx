import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';


function Home() {
    const [homeData, setHomeData] = useState({ title: "", subtitle: "", });

    useEffect(() => {
        fetch('/data/homeData.json') 
            .then(response => response.json())
            .then(data => setFooterData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);


    return (
        <header>
        </header>
    );
}

export default Footer;
