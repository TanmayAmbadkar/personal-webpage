import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import profileData from '../data/profile.json';
import TerminalReveal from './TerminalReveal';

export const LiquidBackdrop = () => {
    const interactiveRef = useRef(null);

    useEffect(() => {
        const interactive = interactiveRef.current;
        if (!interactive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let animationFrame = 0;

        const move = () => {
            currentX += (targetX - currentX) * 0.07;
            currentY += (targetY - currentY) * 0.07;
            interactive.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0)`;

            // Keep the visual easing after pointer input, but do not keep a
            // requestAnimationFrame loop running while the page is idle.
            if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
                animationFrame = window.requestAnimationFrame(move);
            } else {
                animationFrame = 0;
            }
        };

        const handlePointerMove = (event) => {
            targetX = event.clientX - (window.innerWidth / 2);
            targetY = event.clientY - (window.innerHeight / 2);
            if (!animationFrame) animationFrame = window.requestAnimationFrame(move);
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <div className="liquid-backdrop" aria-hidden="true">
            <svg className="liquid-filter" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="hero-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="liquid-backdrop__field">
                <span className="liquid-blob liquid-blob--one" />
                <span className="liquid-blob liquid-blob--two" />
                <span className="liquid-blob liquid-blob--three" />
                <span className="liquid-blob liquid-blob--four" />
                <span className="liquid-blob liquid-blob--five" />
                <span ref={interactiveRef} className="liquid-blob liquid-blob--interactive" />
            </div>
        </div>
    );
};

const Hero = () => {
    const { about } = profileData;
    const reduceMotion = useReducedMotion();

    return (
        <section id="about" className="relative min-h-[calc(100svh-4rem)] lg:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24 lg:py-20">
            <div className="max-w-3xl w-full relative isolate">
                <motion.div
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10"
                >
                    {/* Mobile Profile Picture */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-accent shadow-lg shadow-accent/20">
                            <img
                                src="/files/profile.jpg"
                                alt={profileData.name}
                                className="w-full h-full object-cover"
                                width="128"
                                height="128"
                                fetchPriority="high"
                            />
                        </div>
                    </div>
                    <TerminalReveal as="h2" className="text-accent font-medium text-base lg:text-lg mb-3 lg:mb-4 text-center lg:text-left">{about.greeting}</TerminalReveal>
                    <TerminalReveal as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-4 lg:mb-5 leading-tight text-center lg:text-left">{about.name}</TerminalReveal>
                    <TerminalReveal as="h2" className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted mb-6 lg:mb-7 leading-snug text-center lg:text-left">{about.tagline}</TerminalReveal>
                    <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                        {about.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
