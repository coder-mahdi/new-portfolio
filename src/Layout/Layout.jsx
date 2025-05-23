import React, { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useFollowPointer } from '../components/useFollowPointer';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);
    const location = useLocation(); 

    return (
        <>
            <Header />
            <motion.div 
                style={{ x, y }}
                ref={ref} 
                className="pointer"
            />
            <main>{children}</main> 
            <Footer />
        </>
    );
}

export default Layout;
