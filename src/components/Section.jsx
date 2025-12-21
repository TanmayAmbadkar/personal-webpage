import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ id, title, children, className = "" }) => {
    return (
        <section id={id} className={`py-12 lg:py-24 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
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
