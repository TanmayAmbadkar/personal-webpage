import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext({
    lenis: null,
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
            setLenis(null);
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ lenis }}>
            {children}
        </ScrollContext.Provider>
    );
};
