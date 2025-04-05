import React, { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

import { motion } from 'framer-motion';
import { useFollowPointer } from './useFollowPointer';
import { useLocation } from 'react-router-dom';


function Layout({ children }) {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);
    const location = useLocation(); 



    return (
        <>
            <Header />
            <motion.div style={{
    x, 
    y, 
    position: 'absolute', 
    width: '20px', 
    height: '20px', 
    backgroundColor: 'red', // رنگ قرمز برای نمایش بهتر
    borderRadius: '50%', // دایره بودن پوینتر
    pointerEvents: 'none', // جلوگیری از اختلال در تعاملات دیگر
  }}  ref={ref} className="pointer"></motion.div>
            <main>{children}</main> 
            <Footer />
        </>
    );
}

export default Layout;
