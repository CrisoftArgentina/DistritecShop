// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Arrow from '../assets/arrowTop.svg'

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div onClick={scrollToTop} className={isVisible ? "scroll-top" : "scroll-top oculto"}>
            <img src={Arrow} width={30} alt="arrow" />
        </div>
    );
};

export default ScrollTop;