import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import profileData from '../data/profile.json';

const ConstraintField = () => {
    const reduceMotion = useReducedMotion();
    const lineTransition = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.23, 1, 0.32, 1] };

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 760 270"
            className="constraint-field pointer-events-none absolute -right-20 top-1/2 hidden h-56 w-[44rem] -translate-y-1/2 opacity-70 lg:block"
            fill="none"
        >
            <motion.path d="M25 181C111 150 135 64 223 90s105 121 194 88 107-108 191-66 72 80 128 50" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={lineTransition} />
            <motion.path d="M34 81c75 7 121 82 206 68s100-112 181-93 102 92 182 77 82-79 139-73" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ ...lineTransition, delay: reduceMotion ? 0 : 0.08 }} />
            <motion.path d="M132 225c38-46 68-49 112-24s76 22 115-12 79-30 119-8 78 24 139-8" stroke="currentColor" strokeWidth="1" initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ ...lineTransition, delay: reduceMotion ? 0 : 0.14 }} />
            <motion.circle className="constraint-node" cx="223" cy="90" r="4" initial={{ scale: reduceMotion ? 1 : 0.85, opacity: reduceMotion ? 1 : 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...lineTransition, delay: reduceMotion ? 0 : 0.22 }} />
            <motion.circle className="constraint-node" cx="417" cy="178" r="4" initial={{ scale: reduceMotion ? 1 : 0.85, opacity: reduceMotion ? 1 : 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...lineTransition, delay: reduceMotion ? 0 : 0.28 }} />
            <motion.circle className="constraint-node" cx="603" cy="133" r="4" initial={{ scale: reduceMotion ? 1 : 0.85, opacity: reduceMotion ? 1 : 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...lineTransition, delay: reduceMotion ? 0 : 0.34 }} />
        </svg>
    );
};

const Hero = () => {
    const { about } = profileData;
    const reduceMotion = useReducedMotion();

    return (
        <section id="about" className="min-h-[72vh] lg:min-h-[78vh] flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24 lg:py-20">
            <div className="max-w-3xl w-full relative isolate">
                <ConstraintField />
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
                    <h2 className="text-accent font-medium text-base lg:text-lg mb-3 lg:mb-4 text-center lg:text-left">{about.greeting}</h2>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-4 lg:mb-5 leading-tight text-center lg:text-left">
                        {about.name}
                    </h1>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted mb-6 lg:mb-7 leading-snug text-center lg:text-left">
                        {about.tagline}
                    </h2>
                    <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                        {about.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
