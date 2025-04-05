import React, { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

import { motion } from 'framer-motion';
import { useFollowPointer } from './useFollowPointer';
import { Link } from 'react-router-dom';

function Layout({ children }) {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);
    const location = useLocation(); 



    return (
        <>
            <Header />
            <motion.div style={{ x, y }} ref={ref} className="pointer"></motion.div>
            <main>{children}</main> 
            <Footer />
        </>
    );
}

export default Layout;
