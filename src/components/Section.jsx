import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Section = ({ id, title, children, className = "" }) => {
    const reduceMotion = useReducedMotion();

    return (
        <section id={id} className={`py-12 lg:py-24 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto ${className}`}>
            <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            >
                {title && (
                    <h2 className="text-2xl lg:text-4xl font-bold text-text mb-8 lg:mb-12 border-b border-accent/10 pb-4 inline-block">
                        {title}
                    </h2>
                )}
                {children}
            </motion.div>
        </section>
    );
};

export default Section;
