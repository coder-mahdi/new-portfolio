import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useFollowPointer } from '../components/useFollowPointer';

function Layout() {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);

    return (
        <>
            <Header />
            <motion.div 
                style={{ x, y }}
                ref={ref} 
                className="pointer"
            />
            <main><Outlet /></main> 
            <Footer />
        </>
    );
}

export default Layout;
