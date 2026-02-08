import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Research from '../components/Research';
import Publications from '../components/Publications';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

function HomePage() {


    return (
        <div className="min-h-screen text-text font-sans selection:bg-accent selection:text-primary overflow-x-hidden transition-colors duration-300 relative bg-primary">
            <SEO
                title="Tanmay Ambadkar | Reinforcement Learning"
                description="Personal portfolio of Tanmay Ambadkar, a PhD student at Penn State University specializing in Safe Reinforcement Learning, Formal Methods, and Multi-Objective RL. exploring projects like RAMPS, AutoSpec, and D3PO."
                keywords="Tanmay Ambadkar, Reinforcement Learning, Safe RL, Multi-Objective RL, Formal Methods, Robust Adaptive Multi-Step Predictive Shielding, RAMPS, AutoSpec, SpectRL, D3PO, Multi-Objective Reinforcement Learning, Preference Conditioned RL, Deep Koopman Operators, Control Barrier Functions, CBF, Sinergym, Building Control, StarCraft II Benchmark, MIXTAPE, Explainable AI, XAI, Penn State, PhD, Portfolio"
            />
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
                    className="absolute top-[-10%] right-[-5%] w-[400px] lg:w-[700px] h-[400px] lg:h-[700px] rounded-full will-change-transform"
                    style={{ background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.3) 0%, transparent 70%)' }}
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
                    className="absolute bottom-[-10%] left-[-5%] w-[400px] lg:w-[700px] h-[400px] lg:h-[700px] rounded-full will-change-transform"
                    style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)' }}
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
                    className="absolute top-[40%] left-[30%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] rounded-full will-change-transform"
                    style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)' }}
                />
            </div>

            <Sidebar />

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
