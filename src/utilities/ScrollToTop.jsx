import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";


//Helper component to ensure the screen scrolls to the top when going between pages
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop