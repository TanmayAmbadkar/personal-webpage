import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScroll } from '../context/ScrollContext';
import profileData from '../data/profile.json';

const Hero = () => {
    const { about } = profileData;
    const { lenis } = useScroll();

    return (
        <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-16 lg:pt-0">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
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
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-text mb-4 lg:mb-6 tracking-tight leading-tight text-center lg:text-left">
                        {about.name}
                    </h1>
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-muted mb-6 lg:mb-8 leading-tight text-center lg:text-left">
                        {about.tagline}
                    </h2>
                    <p className="text-base sm:text-lg text-muted max-w-2xl mb-8 lg:mb-12 leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                        {about.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => lenis?.scrollTo('#research', { offset: -50, duration: 1.2 })}
                            className="w-full sm:w-auto px-8 py-4 bg-accent/10 text-accent border border-accent/20 rounded-lg font-medium hover:bg-accent/20 transition-all flex items-center justify-center gap-2 group"
                        >
                            View Research
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => lenis?.scrollTo('#publications', { offset: -50, duration: 1.2 })}
                            className="w-full sm:w-auto px-8 py-4 bg-secondary text-text border border-accent/10 rounded-lg font-medium hover:bg-accent/5 transition-all"
                        >
                            Publications
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
