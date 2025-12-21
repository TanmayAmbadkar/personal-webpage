import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Research from '../components/Research';
import Publications from '../components/Publications';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import { motion } from 'framer-motion';

function HomePage() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check system preference or saved theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.add('light');
        } else if (savedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.remove('light');
        } else {
            setIsDark(prefersDark);
            if (!prefersDark) document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (isDark) {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <div className="min-h-screen text-text font-sans selection:bg-accent selection:text-primary overflow-x-hidden transition-colors duration-300 relative bg-primary">
            {/* Background Gradients & Animation */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[-10%] right-[-5%] w-[400px] lg:w-[700px] h-[400px] lg:h-[700px] bg-accent/30 rounded-full blur-[80px] lg:blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-[-10%] left-[-5%] w-[400px] lg:w-[700px] h-[400px] lg:h-[700px] bg-purple-500/30 rounded-full blur-[80px] lg:blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute top-[40%] left-[30%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-blue-500/30 rounded-full blur-[100px]"
                />
            </div>

            <Sidebar isDark={isDark} toggleTheme={toggleTheme} />

            <main className="lg:ml-64 relative z-10 pt-16 lg:pt-0 transition-all duration-300">
                <div className="relative">
                    <Hero />
                    <Research />
                    <Publications />
                    <Education />
                    <Experience />
                    <Projects />
                </div>

                <footer className="py-8 text-center text-muted text-sm mt-12 px-4 relative">
                    <p>Designed & Built by Tanmay Ambadkar</p>
                    <p className="mt-2 text-xs opacity-50">© {new Date().getFullYear()} All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
}

export default HomePage;
