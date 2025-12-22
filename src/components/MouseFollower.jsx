import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MouseFollower = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 24); // Center the 48px cursor
            mouseY.set(e.clientY - 24);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-12 h-12 rounded-full bg-accent/50 pointer-events-none z-[100] hidden lg:block filter blur-[8px]"
            style={{ x, y }}
            animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

export default MouseFollower;
